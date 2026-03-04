import { gql } from 'graphql-tag';

/**
 * GraphQL Queries for AI Studio execution history
 */

export const Q_GET_EXECUTION_HISTORY = gql`
  query GetExecutionHistory($promptId: ID, $limit: Int, $nextToken: String) {
    getExecutionHistory(promptId: $promptId, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
