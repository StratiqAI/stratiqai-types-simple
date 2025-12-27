import { gql } from 'graphql-tag';

/**
 * GraphQL Queries for Text
 */

export const Q_GET_TEXT = gql`
  query GetText($key: CompositeKeyInput!) {
    getText(key: $key) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      parentId
      pageNum
      text
    }
  }
`;

export const Q_LIST_TEXTS = gql`
  query ListTexts(
    $parentId: ID!
    $limit: Int
    $nextToken: String
  ) {
    listTexts(parentId: $parentId, limit: $limit, nextToken: $nextToken) {
      items {
        id
        entityType
        tenantId
        ownerId
        createdAt
        updatedAt
        deletedAt
        parentId
        pageNum
        text
      }
      nextToken
    }
  }
`;

