import { gql } from 'graphql-tag';

/**
 * GraphQL Mutations for AI Studio AIQueryExecution (worker updates)
 */

export const M_UPDATE_AI_QUERY_EXECUTION = gql`
  mutation UpdateAIQueryExecution($id: ID!, $input: UpdateAIQueryExecutionInput!) {
    updateAIQueryExecution(id: $id, input: $input) {
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
