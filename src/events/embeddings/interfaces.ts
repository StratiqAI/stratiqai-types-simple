export type PdfImagesCompletePayload = {
    documentId: string;
    pageCount: number;
    bucket: string;
    key: string;
    imageUrls: string[];
    imageKeys: string[];
  };
  
  export interface EmbeddingResultPayload {
    documentId: string;
    status: "success" | "already_exists";
    upserted?: number;
    recordCount?: number;
    namespace?: string;
    index?: string;
  }