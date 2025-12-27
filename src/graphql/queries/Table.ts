import { gql } from 'graphql-tag';

/**
 * GraphQL Queries for Table
 */

export const Q_GET_TABLE = gql`
  query GetTable($key: CompositeKeyInput!) {
    getTable(key: $key) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      parentId
      pageNum
      description
    }
  }
`;

export const Q_LIST_TABLES = gql`
  query ListTables(
    $parentId: ID!
    $limit: Int
    $nextToken: String
  ) {
    listTables(parentId: $parentId, limit: $limit, nextToken: $nextToken) {
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
        description
      }
      nextToken
    }
  }
`;

