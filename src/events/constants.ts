/**
 * EventBridge event sources and detail-types for StratiqAI platform.
 * Aligns with naming-schema-proposal: com.stratiqai.{entity}.{subdomain?}
 *
 * Use these constants in Lambda handlers and Terraform instead of hardcoding strings.
 */

export const EVENT_SOURCES = {
  DOCUMENT: 'com.stratiqai.document',
  DOCUMENT_PDF_TO_IMAGES: 'com.stratiqai.document.pdf_to_images',
  DOCUMENT_TEXT_UPSERT: 'com.stratiqai.document.text_upsert',
  DOCUMENT_EMBEDDINGS: 'com.stratiqai.document.embeddings',
  DOCUMENT_PROCESSING: 'com.stratiqai.document.processing',
  DOCLINK: 'com.stratiqai.doclink',
  SCAN: 'com.stratiqai.scan',
  AI_QUERY: 'com.stratiqai.ai_query',
} as const;

export const EVENT_DETAIL_TYPES = {
  CREATED: 'Created',
  ALREADY_EXISTS: 'AlreadyExists',
  COMPLETE: 'Complete',
  ERROR: 'Error',
  COUNT_COMPLETE: 'CountComplete',
  ANALYSIS_STARTED: 'AnalysisStarted',
  RUN: 'Run',
} as const;
