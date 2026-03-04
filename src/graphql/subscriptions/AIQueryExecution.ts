import { gql } from 'graphql-tag';

/**
 * GraphQL Subscriptions for AI Studio AIQueryExecution
 * Subscribe with id from runAIQuery response to receive PROCESSING / SUCCESS / ERROR updates.
 */

export const S_ON_UPDATE_AI_QUERY_EXECUTION = gql`
  subscription OnUpdateAIQueryExecution($id: ID!) {
    onUpdateAIQueryExecution(id: $id) {
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
      structuredOutput
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
    }
  }
`;
