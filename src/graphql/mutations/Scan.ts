import { gql } from 'graphql-tag';

/**
 * GraphQL Mutations for Scan
 */

export const M_CREATE_SCAN = gql`
  mutation CreateScan($input: CreateScanInput!) {
    createScan(input: $input) {
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

export const M_UPDATE_SCAN = gql`
  mutation UpdateScan($key: CompositeKeyInput!, $input: UpdateScanInput!) {
    updateScan(key: $key, input: $input) {
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

export const M_DELETE_SCAN = gql`
  mutation DeleteScan($key: CompositeKeyInput!) {
    deleteScan(key: $key) {
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

