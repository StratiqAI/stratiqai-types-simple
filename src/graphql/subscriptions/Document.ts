import { gql } from 'graphql-tag';

/**
 * GraphQL Subscriptions for Document
 */

export const S_ON_CREATE_DOCUMENT = gql`
  subscription OnCreateDocument($ownerId: ID, $tenantId: ID) {
    onCreateDocument(ownerId: $ownerId, tenantId: $tenantId) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      s3Bucket
      s3Key
      mimeType
      sizeBytes
    }
  }
`;

export const S_ON_UPDATE_DOCUMENT = gql`
  subscription OnUpdateDocument($id: ID!) {
    onUpdateDocument(id: $id) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      s3Bucket
      s3Key
      mimeType
      sizeBytes
    }
  }
`;

export const S_ON_DELETE_DOCUMENT = gql`
  subscription OnDeleteDocument($id: ID!) {
    onDeleteDocument(id: $id) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      s3Bucket
      s3Key
      mimeType
      sizeBytes
    }
  }
`;

