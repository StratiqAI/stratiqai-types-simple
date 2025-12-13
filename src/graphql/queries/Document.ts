import { gql } from 'graphql-tag';

/**
 * GraphQL Queries for Document
 */

export const Q_GET_DOCUMENT = gql`
  query GetDocument($id: ID!) {
    getDocument(id: $id) {
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

export const Q_LIST_DOCUMENTS = gql`
  query ListDocuments($limit: Int, $nextToken: String) {
    listDocuments(limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;

