import { gql } from 'graphql-tag';

/**
 * GraphQL Subscriptions for Table
 */

export const S_ON_CREATE_TABLE = gql`
  subscription OnCreateTable($parentId: ID) {
    onCreateTable(parentId: $parentId) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      parentId
      pageNum
      description
    }
  }
`;

export const S_ON_UPDATE_TABLE = gql`
  subscription OnUpdateTable($id: ID!) {
    onUpdateTable(id: $id) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      parentId
      pageNum
      description
    }
  }
`;

export const S_ON_DELETE_TABLE = gql`
  subscription OnDeleteTable($id: ID!) {
    onDeleteTable(id: $id) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      parentId
      pageNum
      description
    }
  }
`;

