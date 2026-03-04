import { gql } from 'graphql-tag';

/**
 * GraphQL Queries for AI Studio Prompt (root entity)
 */

export const Q_GET_PROMPT = gql`
  query GetPrompt($id: ID!) {
    getPrompt(id: $id) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      sharingMode
      sourcePromptId
      name
      description
      templateText
      inputVariables
      model
      config {
        temperature
        topP
        topK
        maxOutputTokens
        stopSequences
      }
      version
      isActive
      outputSchema {
        id
        name
        description
        schemaDefinition
      }
    }
  }
`;

export const Q_LIST_PROMPTS = gql`
  query ListPrompts($scope: ListScope, $limit: Int, $nextToken: String) {
    listPrompts(scope: $scope, limit: $limit, nextToken: $nextToken) {
      items {
        id
        entityType
        tenantId
        ownerId
        createdAt
        updatedAt
        deletedAt
        sharingMode
        sourcePromptId
        name
        description
        templateText
        inputVariables
        model
        config {
          temperature
          topP
          topK
          maxOutputTokens
          stopSequences
        }
        version
        isActive
        outputSchema {
          id
          name
          description
          schemaDefinition
        }
      }
      nextToken
    }
  }
`;
