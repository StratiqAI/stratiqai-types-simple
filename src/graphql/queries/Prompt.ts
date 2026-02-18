import { gql } from 'graphql-tag';

/**
 * GraphQL Queries for AI Studio Prompt
 */

export const Q_GET_PROMPT = gql`
  query GetPrompt($key: CompositeKeyInput!) {
    getPrompt(key: $key) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      sharingMode
      parentId
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
  query ListPrompts($parentId: ID!, $limit: Int, $nextToken: String) {
    listPrompts(parentId: $parentId, limit: $limit, nextToken: $nextToken) {
      items {
        id
        entityType
        tenantId
        ownerId
        createdAt
        updatedAt
        deletedAt
        sharingMode
        parentId
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
