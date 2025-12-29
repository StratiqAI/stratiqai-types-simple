import { gql } from 'graphql-tag';

/**
 * GraphQL Subscriptions for Scan
 */

export const S_ON_CREATE_SCAN = gql`
  subscription OnCreateScan($parentId: ID) {
    onCreateScan(parentId: $parentId) {
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

export const S_ON_UPDATE_SCAN = gql`
  subscription OnUpdateScan($id: ID!) {
    onUpdateScan(id: $id) {
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

export const S_ON_DELETE_SCAN = gql`
  subscription OnDeleteScan($id: ID!) {
    onDeleteScan(id: $id) {
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

