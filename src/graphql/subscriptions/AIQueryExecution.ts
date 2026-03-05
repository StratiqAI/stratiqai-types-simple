import { gql } from 'graphql-tag';

/**
 * GraphQL Subscriptions for AI Studio AIQueryExecution (standard Node: onCreate, onUpdate, onDelete)
 * Use onUpdateAIQueryExecution(id) with id from runAIQuery to receive PROCESSING / SUCCESS / ERROR.
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

export const S_ON_CREATE_AI_QUERY_EXECUTION = gql`
  subscription OnCreateAIQueryExecution($promptId: ID) {
    onCreateAIQueryExecution(promptId: $promptId) {
      ${AI_QUERY_EXECUTION_FIELDS}
    }
  }
`;

export const S_ON_UPDATE_AI_QUERY_EXECUTION = gql`
  subscription OnUpdateAIQueryExecution($id: ID!) {
    onUpdateAIQueryExecution(id: $id) {
      ${AI_QUERY_EXECUTION_FIELDS}
    }
  }
`;

export const S_ON_DELETE_AI_QUERY_EXECUTION = gql`
  subscription OnDeleteAIQueryExecution($id: ID!) {
    onDeleteAIQueryExecution(id: $id) {
      id
      status
      deletedAt
    }
  }
`;
