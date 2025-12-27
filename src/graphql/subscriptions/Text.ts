import { gql } from 'graphql-tag';

/**
 * GraphQL Subscriptions for Text
 */

export const S_ON_CREATE_TEXT = gql`
  subscription OnCreateText($parentId: ID) {
    onCreateText(parentId: $parentId) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      parentId
      pageNum
      text
    }
  }
`;

export const S_ON_UPDATE_TEXT = gql`
  subscription OnUpdateText($id: ID!) {
    onUpdateText(id: $id) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      parentId
      pageNum
      text
    }
  }
`;

export const S_ON_DELETE_TEXT = gql`
  subscription OnDeleteText($id: ID!) {
    onDeleteText(id: $id) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      parentId
      pageNum
      text
    }
  }
`;

