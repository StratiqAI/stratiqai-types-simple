import { gql } from 'graphql-tag';

/**
 * GraphQL Queries for AI Studio AIQueryExecution (standard Node: get + list)
 *
 * Selection set matches GraphQL type `AIQueryExecution` in `schema.graphql`.
 */
export const AI_QUERY_EXECUTION_FIELDS = `
  id
  entityType
  tenantId
  ownerId
  createdAt
  updatedAt
  deletedAt
  projectId
  executionId
  promptId
  inputValues
  documentIds
  topK
  topKPerNs
  executedAt
  durationMs
  rawOutput
  promptTokenCount
  candidatesTokenCount
  totalTokenCount
  status
  errorMessage
`;

export const Q_GET_AI_QUERY_EXECUTION = gql`
  query GetAIQueryExecution($id: ID!) {
    getAIQueryExecution(id: $id) {
      ${AI_QUERY_EXECUTION_FIELDS}
    }
  }
`;

export const Q_LIST_AI_QUERY_EXECUTIONS = gql`
  query ListAIQueryExecutions($promptId: ID, $limit: Int, $nextToken: String) {
    listAIQueryExecutions(promptId: $promptId, limit: $limit, nextToken: $nextToken) {
      items {
        ${AI_QUERY_EXECUTION_FIELDS}
      }
      nextToken
    }
  }
`;

/**
 * Same data as {@link Q_LIST_AI_QUERY_EXECUTIONS}; schema exposes history via `listAIQueryExecutions` only.
 */
export const Q_GET_EXECUTION_HISTORY = gql`
  query GetExecutionHistory($promptId: ID, $limit: Int, $nextToken: String) {
    listAIQueryExecutions(promptId: $promptId, limit: $limit, nextToken: $nextToken) {
      items {
        ${AI_QUERY_EXECUTION_FIELDS}
      }
      nextToken
    }
  }
`;
