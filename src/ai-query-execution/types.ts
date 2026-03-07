/**
 * Shared types for AI query execution flow: submit-ai-query → SQS → ai-query-execution-worker.
 * Used to create the SQS message payload and to parse/process it from the queue.
 */

/**
 * Inputs for the vision RAG flow (query-multimodal-pinecone-then-gemini).
 * Mirrors the inputs consumed by the script; env vars (PINECONE_INDEX, API keys) are runtime config.
 */
export interface VisionRagInputs {
  /** The question to answer using retrieved images. */
  question: string;
  /** Document IDs (Pinecone namespaces) for multi-namespace query. When present, uses multi-ns mode. */
  pineconeNamespaces?: string[];
  /** Single Pinecone namespace (documentId) when not using multi-ns. Default: "document". */
  pineconeNamespace?: string;
  /** Top K matches to retrieve (1–20). Default: 5. */
  topK?: number;
  /** Top K per namespace for multi-ns (1–20). Default: 5. */
  topKPerNs?: number;
  /** Gemini model ID (e.g. gemini-3-flash-preview). */
  geminiModel?: string;
}

/**
 * Full SQS payload for AI query execution.
 * Created by submit-ai-query and consumed by ai-query-execution-worker.
 * Combines AIQueryExecution record fields with per-flow inputs (e.g. VisionRagInputs).
 */
export interface AIQueryExecutionSqsPayload {
  /** Execution ID (from createAIQueryExecution). */
  id: string;
  /** Status (e.g. PENDING). */
  status: string;
  /** Prompt ID for the execution. */
  promptId: string;
  /** JSON string of variable values (e.g. { text: "..." } or VisionRagInputs). */
  inputValues: string;
  /** Tenant ID. */
  tenantId: string;
  /** Owner ID. */
  ownerId: string;
  /** Created-at timestamp. */
  createdAt: string;
  /** For backward compatibility: executionId alias. */
  executionId?: string;
  /** Optional: vision RAG question (can also be in inputValues). */
  question?: string;
  /** Optional: Pinecone namespaces for multi-ns vision RAG. */
  pineconeNamespaces?: string[];
  /** Optional: single Pinecone namespace. */
  pineconeNamespace?: string;
  /** Optional: top K for Pinecone. */
  topK?: number;
  /** Optional: top K per namespace. */
  topKPerNs?: number;
  /** Optional: Gemini model. */
  geminiModel?: string;
}
