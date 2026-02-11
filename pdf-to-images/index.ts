/**
 * Document Upsert Lambda
 *
 * Triggered when a PDF is uploaded to S3 (EventBridge S3 Object Created). For each page we:
 * render it as an image, compute a multimodal embedding (Vertex AI), and upsert the vector
 * into Pinecone so the document can be queried by text or image later.
 *
 * --- Philosophy ---
 *
 * - Single responsibility: this function only does "PDF → page images → embeddings → Pinecone".
 *   It does not upload page images to S3 or call other document pipelines; those stay in
 *   separate Lambdas. Keeping one job per function makes tuning, retries, and event routing simple.
 *
 * - Observable outcomes: every run ends with exactly one EventBridge event—either Complete
 *   (with pageCount and imageIds) or Error (with error message). Downstream rules can react
 *   without parsing Lambda response or logs. We emit before returning so success/error is
 *   always visible on the bus.
 *
 * - Bounded parallelism: pages are processed in chunks of PARALLEL_PAGES (env) to avoid
 *   overwhelming Vertex and to stay within Lambda concurrency and memory. We trade throughput
 *   for predictability and cost control.
 *
 * - Fail-fast on config: missing bucket/key, non-PDF keys, or missing env (project, Pinecone,
 *   API key) result in an Error event and a thrown error so the invocation is marked failed
 *   and optional retries/DLQ behave as expected.
 *
 * --- Workflow ---
 *
 * 1. Validate event (bucket, key, .pdf suffix) and env; emit Error and return if invalid.
 * 2. Download the PDF from S3 into /tmp (single file; no streaming needed for typical sizes).
 * 3. Render each page to an image buffer via pdf-to-img (same vector space as Vertex multimodal).
 * 4. For each chunk of PARALLEL_PAGES pages: call Vertex for image embeddings, build
 *    Pinecone records (id = key_p0, key_p1, …; metadata = bucket, key, pageIndex, model).
 * 5. Upsert all records to Pinecone in batches of 100.
 * 6. Emit EventBridge Complete with bucket, key, pageCount, imageIds; then return result.
 * On any exception: emit EventBridge Error with bucket, key, error message; rethrow.
 *
 * --- Event & env ---
 *
 * Event: S3ObjectCreatedDetailData (bucket.name, object.key).
 * Env:   GOOGLE_PROJECT_ID or GOOGLE_CLOUD_PROJECT, PINECONE_API_KEY, PINECONE_INDEX or
 *        PINECONE_INDEX_NAME; optional: EVENT_BUS_NAME, PARALLEL_PAGES, PINECONE_NAMESPACE,
 *        GOOGLE_LOCATION, PDF_SCALE.
 * Auth:  GOOGLE_APPLICATION_CREDENTIALS or Lambda role with Vertex + Pinecone access.
 */
import { Context } from "aws-lambda";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";
import { Readable } from "stream";
import { writeFile, mkdir, rm } from "fs/promises";
import { join } from "path";
import { pdf } from "pdf-to-img";
import { PredictionServiceClient, helpers } from "@google-cloud/aiplatform";
import { Pinecone, type PineconeRecord } from "@pinecone-database/pinecone";
import type { S3ObjectCreatedDetailData } from "@stratiqai/types-simple";

// --- AWS clients and temp paths ---
const s3 = new S3Client({});
const eventBridge = new EventBridgeClient({});
const TMP = "/tmp";
const PDF_PATH = join(TMP, "input.pdf");

// Vertex AI multimodal embedding model (image → 1408-dim vector; same space as text for hybrid search).
const MODEL_ID = "multimodalembedding@001";
const DEFAULT_SCALE = 2;          // PDF render scale (higher = sharper, larger buffers).
const DEFAULT_PARALLEL_PAGES = 5; // How many pages to embed in parallel (throughput vs memory/Vertex limits).

// EventBridge: one source, two detail-types so rules can route on success vs failure.
const EVENT_SOURCE = "com.stratiqai.pdf_to_images";
const DETAIL_TYPE_COMPLETE = "Complete";
const DETAIL_TYPE_ERROR = "Error";

/** Read env with optional default; avoids undefined in config. */
function getEnv(name: string, defaultValue: string): string {
  const v = process.env[name]?.trim();
  return v ?? defaultValue;
}

/** Turn S3 key into a safe Pinecone id prefix (no extension, no spaces/special chars). */
function sanitizeId(key: string): string {
  return key.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9-_./]/g, "_").toLowerCase();
}

/**
 * Get a single image embedding from Vertex AI multimodal model.
 * Expects base64 image bytes; returns 1408-dim float vector for Pinecone.
 */
async function getImageEmbedding(vertexClient: PredictionServiceClient, endpointPath: string, imageBase64: string): Promise<number[]> {
  const instance = { image: { bytesBase64Encoded: imageBase64 } };
  const instanceValue = helpers.toValue(instance);
  const [response] = await vertexClient.predict({
    endpoint: endpointPath,
    instances: [instanceValue!],
  });
  if (!response.predictions?.length) throw new Error("No prediction from Vertex AI");
  const prediction = response.predictions[0];
  const values = prediction.structValue?.fields?.imageEmbedding?.listValue?.values;
  if (!values?.length) throw new Error("No imageEmbedding in response");
  return values.map((v: { numberValue?: number }) => v.numberValue ?? 0);
}

/** Returned on success; also reflected in EventBridge Complete event detail. */
export interface PdfToImagesResult {
  pageCount: number;
  bucket: string;
  key: string;
  imageIds: string[];
}

export const handler = async (
  eventDetail: S3ObjectCreatedDetailData,
  context: Context
): Promise<PdfToImagesResult> => {
  // --- 1. Validate event: must be a PDF in S3 ---
  const bucket = eventDetail.bucket?.name;
  const key = eventDetail.object?.key ? decodeURIComponent(eventDetail.object.key) : "";
  if (!bucket || !key || !key.toLowerCase().endsWith(".pdf")) {
    await emitError(eventDetail, "Missing or invalid bucket/key or not a PDF");
    return { pageCount: 0, bucket: bucket ?? "", key, imageIds: [] };
  }

  // --- 2. Resolve config from env (parallelism, scale, Vertex, Pinecone, EventBridge) ---
  const eventBusName = getEnv("EVENT_BUS_NAME", "default");
  const parallelPages = Math.max(1, Math.min(20, Number(getEnv("PARALLEL_PAGES", String(DEFAULT_PARALLEL_PAGES))) || DEFAULT_PARALLEL_PAGES));
  const scale = Number(getEnv("PDF_SCALE", String(DEFAULT_SCALE))) || DEFAULT_SCALE;
  const projectId = getEnv("GOOGLE_PROJECT_ID", "") || getEnv("GOOGLE_CLOUD_PROJECT", "");
  const location = getEnv("GOOGLE_LOCATION", "us-central1");
  const pineconeIndexName = getEnv("PINECONE_INDEX", "") || getEnv("PINECONE_INDEX_NAME", "");
  const pineconeNamespace = getEnv("PINECONE_NAMESPACE", "image_ns");

  if (!projectId || !process.env.PINECONE_API_KEY || !pineconeIndexName) {
    await emitError(eventDetail, "Missing GOOGLE_PROJECT_ID, PINECONE_API_KEY, or PINECONE_INDEX");
    throw new Error("Missing required env");
  }

  const endpointPath = `projects/${projectId}/locations/${location}/publishers/google/models/${MODEL_ID}`;
  const vertexClient = new PredictionServiceClient({ apiEndpoint: `${location}-aiplatform.googleapis.com` });
  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
  const index = pinecone.index(pineconeIndexName).namespace(pineconeNamespace);
  const baseId = sanitizeId(key);

  try {
    // --- 3. Download PDF from S3 into /tmp ---
    const getCmd = new GetObjectCommand({ Bucket: bucket, Key: key });
    const response = await s3.send(getCmd);
    const body = response.Body as Readable;
    if (!body) throw new Error("Empty S3 object");
    const chunks: Uint8Array[] = [];
    for await (const chunk of body) chunks.push(chunk);
    const buffer = Buffer.concat(chunks);
    await mkdir(TMP, { recursive: true });
    await writeFile(PDF_PATH, buffer);

    try {
      // --- 4. Render each PDF page to an image buffer (pdf-to-img) ---
      const document = await pdf(PDF_PATH, { scale });
      const pageBuffers: Buffer[] = [];
      for await (const pageBuffer of document) {
        pageBuffers.push(Buffer.from(pageBuffer));
      }

      if (pageBuffers.length === 0) {
        await emitError(eventDetail, "PDF produced no pages");
        return { pageCount: 0, bucket, key, imageIds: [] };
      }

      // --- 5. Embed and build Pinecone records in parallel (chunks of PARALLEL_PAGES) ---
      const imageIds: string[] = [];
      const records: PineconeRecord[] = [];

      for (let start = 0; start < pageBuffers.length; start += parallelPages) {
        const slice = pageBuffers.slice(start, start + parallelPages);
        const results = await Promise.all(
          slice.map(async (pageBuffer, i) => {
            const pageIndex = start + i;
            const id = `${baseId}_p${pageIndex}`;
            const imageBase64 = pageBuffer.toString("base64");
            const embedding = await getImageEmbedding(vertexClient, endpointPath, imageBase64);
            return {
              id,
              values: embedding,
              metadata: {
                type: "image",
                source: "pdf",
                bucket,
                key,
                pageIndex,
                source_model: MODEL_ID,
              },
            } as PineconeRecord;
          })
        );
        records.push(...results);
        imageIds.push(...results.map((r: PineconeRecord) => r.id));
      }

      // --- 6. Upsert all records to Pinecone (batches of 100 for API limits) ---
      const batchSize = 100;
      for (let i = 0; i < records.length; i += batchSize) {
        await index.upsert(records.slice(i, i + batchSize));
      }

      // --- 7. Emit success event so downstream can react without polling ---
      await eventBridge.send(
        new PutEventsCommand({
          Entries: [
            {
              Source: EVENT_SOURCE,
              DetailType: DETAIL_TYPE_COMPLETE,
              EventBusName: eventBusName,
              Detail: JSON.stringify({
                bucket,
                key,
                pageCount: pageBuffers.length,
                imageIds,
                requestId: context.awsRequestId,
              }),
            },
          ],
        })
      );

      return { pageCount: pageBuffers.length, bucket, key, imageIds };
    } finally {
      await rm(PDF_PATH, { force: true }).catch(() => {});
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    await emitError(eventDetail, message);
    throw err;
  }
};

/** Emit an Error event to EventBridge so failures are visible and routable. */
async function emitError(eventDetail: S3ObjectCreatedDetailData, errorMessage: string): Promise<void> {
  const eventBusName = getEnv("EVENT_BUS_NAME", "default");
  await eventBridge.send(
    new PutEventsCommand({
      Entries: [
        {
          Source: EVENT_SOURCE,
          DetailType: DETAIL_TYPE_ERROR,
          EventBusName: eventBusName,
          Detail: JSON.stringify({
            bucket: eventDetail.bucket?.name ?? "",
            key: eventDetail.object?.key ?? "",
            error: errorMessage,
          }),
        },
      ],
    })
  );
}
