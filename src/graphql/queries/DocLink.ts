import { gql } from 'graphql-tag';

/**
 * GraphQL Queries for DocLink
 */

export const Q_GET_DOCLINK = gql`
  query GetDoclink($key: CompositeKeyInput!) {
    getDoclink(key: $key) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      parentId
      filename
      status
      linkType
      documentId
    }
  }
`;

export const Q_LIST_DOCLINKS = gql`
  query ListDoclinks(
    $parentId: ID!
    $limit: Int
    $nextToken: String
  ) {
    listDoclinks(parentId: $parentId, limit: $limit, nextToken: $nextToken) {
      items {
        id
        entityType
        tenantId
        ownerId
        createdAt
        updatedAt
        deletedAt
        parentId
        filename
        status
        linkType
        documentId
      }
      nextToken
    }
  }
`;
