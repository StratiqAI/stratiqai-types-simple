import { gql } from 'graphql-tag';

/**
 * GraphQL Mutations for Document
 */

export const M_CREATE_DOCUMENT = gql`
  mutation CreateDocument($input: CreateDocumentInput!) {
    createDocument(input: $input) {
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

export const M_UPDATE_DOCUMENT = gql`
  mutation UpdateDocument($id: ID!, $input: UpdateDocumentInput!) {
    updateDocument(id: $id, input: $input) {
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

export const M_DELETE_DOCUMENT = gql`
  mutation DeleteDocument($id: ID!) {
    deleteDocument(id: $id) {
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

