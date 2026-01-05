import { gql } from 'graphql-tag';

/**
 * GraphQL Subscriptions for DocLink
 */

export const S_ON_CREATE_DOCLINK = gql`
  subscription OnCreateDoclink($parentId: ID) {
    onCreateDoclink(parentId: $parentId) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      parentId
      filename
      vectorStoreId
      openAIFileId
      status
      documentId
    }
  }
`;

export const S_ON_UPDATE_DOCLINK = gql`
  subscription OnUpdateDoclink($id: ID!) {
    onUpdateDoclink(id: $id) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      parentId
      filename
      vectorStoreId
      openAIFileId
      status
      documentId
    }
  }
`;

export const S_ON_DELETE_DOCLINK = gql`
  subscription OnDeleteDoclink($id: ID!) {
    onDeleteDoclink(id: $id) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      parentId
      filename
      vectorStoreId
      openAIFileId
      status
      documentId
    }
  }
`;
