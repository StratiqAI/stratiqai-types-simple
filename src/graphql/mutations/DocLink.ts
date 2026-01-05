import { gql } from 'graphql-tag';

/**
 * GraphQL Mutations for Doclink
 */

export const M_CREATE_DOCLINK = gql`
  mutation CreateDoclink($input: CreateDoclinkInput!) {
    createDoclink(input: $input) {
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

export const M_UPDATE_DOCLINK = gql`
  mutation UpdateDoclink($key: CompositeKeyInput!, $input: UpdateDoclinkInput!) {
    updateDoclink(key: $key, input: $input) {
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

export const M_DELETE_DOCLINK = gql`
  mutation DeleteDoclink($key: CompositeKeyInput!) {
    deleteDoclink(key: $key) {
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
