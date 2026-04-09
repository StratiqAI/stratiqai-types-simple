import { gql } from 'graphql-tag';

/**
 * GraphQL Queries for Extraction (simplified widget data pipeline).
 *
 * Selection set matches GraphQL type `Extraction` in `schema.graphql`.
 */
export const EXTRACTION_FIELDS = `
  id
  entityType
  tenantId
  ownerId
  createdAt
  updatedAt
  deletedAt
  projectId
  name
  prompt
  systemInstruction
  schema
  model
  documentIds
  topK
  topKPerNs
  promptId
  status
  statusMessage
  errorMessage
  errorCode
  result
  rawAnswer
  startedAt
  executedAt
  durationMs
  promptTokenCount
  candidatesTokenCount
  totalTokenCount
`;

export const Q_GET_EXTRACTION = gql`
  query GetExtraction($id: ID!) {
    getExtraction(id: $id) {
      ${EXTRACTION_FIELDS}
    }
  }
`;

export const Q_LIST_EXTRACTIONS = gql`
  query ListExtractions($projectId: ID!, $limit: Int, $nextToken: String) {
    listExtractions(projectId: $projectId, limit: $limit, nextToken: $nextToken) {
      items {
        ${EXTRACTION_FIELDS}
      }
      nextToken
    }
  }
`;
