// Define the detail structure that the worker receives
interface S3ObjectCreatedDetailData {
  version?: string;
  bucket: {
    name: string;
  };
  object: {
    key: string;
    size?: number;
    etag?: string;
    "version-id"?: string;
    sequencer?: string;
  };
  "request-id"?: string;
  requester?: string;
  "source-ip-address"?: string;
  reason?: string;
  "deletion-type"?: string;
}

// Define the full EventBridge event structure for testing
interface S3ObjectCreatedDetail {
  version: string;
  id: string;
  "detail-type": string;
  source: string;
  account: string;
  time: string;
  region: string;
  resources: string[];
  detail: S3ObjectCreatedDetailData;
}
export type { S3ObjectCreatedDetailData, S3ObjectCreatedDetail };
