import { gql } from 'graphql-tag';

/**
 * GraphQL Queries for AI Studio AIQueryExecution (standard Node: get + list)
 */

const AI_QUERY_EXECUTION_FIELDS = `
  id
  entityType
  tenantId
  ownerId
  createdAt
  updatedAt
  executedAt
  durationMs
  inputValues
  rawOutput
  promptTokenCount
  candidatesTokenCount
  totalTokenCount
  status
  errorMessage
  prompt {
    id
    name
    version
    sourcePromptId
  }
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
 * List execution history (optionally by promptId). Alias for listAIQueryExecutions.
 */
export const Q_GET_EXECUTION_HISTORY = gql`
  query GetExecutionHistory($promptId: ID, $limit: Int, $nextToken: String) {
    getExecutionHistory(promptId: $promptId, limit: $limit, nextToken: $nextToken) {
      items {
        ${AI_QUERY_EXECUTION_FIELDS}
      }
      nextToken
    }
  }
`;
