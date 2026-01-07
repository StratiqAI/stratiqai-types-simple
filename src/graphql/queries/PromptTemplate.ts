import { gql } from 'graphql-tag';

/**
 * GraphQL Queries for PromptTemplate
 */

export const Q_GET_PROMPT_TEMPLATE = gql`
  query GetPromptTemplate($key: CompositeKeyInput!) {
    getPromptTemplate(key: $key) {
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
      template
      description
    }
  }
`;

export const Q_LIST_PROMPT_TEMPLATES = gql`
  query ListPromptTemplates(
    $parentId: ID!
    $limit: Int
    $nextToken: String
  ) {
    listPromptTemplates(parentId: $parentId, limit: $limit, nextToken: $nextToken) {
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
        template
        description
      }
      nextToken
    }
  }
`;
