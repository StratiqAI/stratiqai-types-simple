import { gql } from 'graphql-tag';

import { AI_QUERY_EXECUTION_FIELDS } from '../queries/AIQueryExecution.js';

/**
 * GraphQL Mutations for AI Studio AIQueryExecution (standard Node: create, update, delete)
 *
 * `CreateAIQueryExecutionInput` (schema): `projectId`, `executionId`, `promptId`, `inputValues` required;
 * optional `documentIds`, `topK`, `topKPerNs`, `tenantId`, `ownerId` (IAM callers).
 */

/**
 * Creates an AIQueryExecution (status PENDING).
 * Variables: { input: CreateAIQueryExecutionInput! }
 */
export const M_CREATE_AI_QUERY_EXECUTION = gql`
  mutation CreateAIQueryExecution($input: CreateAIQueryExecutionInput!) {
    createAIQueryExecution(input: $input) {
      ${AI_QUERY_EXECUTION_FIELDS}
    }
  }
`;

export const M_UPDATE_AI_QUERY_EXECUTION = gql`
  mutation UpdateAIQueryExecution($id: ID!, $input: UpdateAIQueryExecutionInput!) {
    updateAIQueryExecution(id: $id, input: $input) {
      ${AI_QUERY_EXECUTION_FIELDS}
    }
  }
`;

export const M_DELETE_AI_QUERY_EXECUTION = gql`
  mutation DeleteAIQueryExecution($id: ID!) {
    deleteAIQueryExecution(id: $id) {
      ${AI_QUERY_EXECUTION_FIELDS}
    }
  }
`;
