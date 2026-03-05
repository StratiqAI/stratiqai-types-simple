import { gql } from 'graphql-tag';

/**
 * GraphQL Mutations for AI Studio AIQueryExecution (standard Node: create, update, delete)
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
      id
      status
      deletedAt
    }
  }
`;
