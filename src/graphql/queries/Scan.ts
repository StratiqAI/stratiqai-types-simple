import { gql } from 'graphql-tag';

/**
 * GraphQL Queries for Scan
 */

export const Q_GET_SCAN = gql`
  query GetScan($key: CompositeKeyInput!) {
    getScan(key: $key) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      s3Bucket
      s3Key
      parentId
    }
  }
`;

export const Q_LIST_SCANS = gql`
  query ListScans(
    $parentId: ID!
    $limit: Int
    $nextToken: String
  ) {
    listScans(parentId: $parentId, limit: $limit, nextToken: $nextToken) {
      items {
        id
        entityType
        tenantId
        ownerId
        createdAt
        updatedAt
        deletedAt
        s3Bucket
        s3Key
        parentId
      }
      nextToken
    }
  }
`;

