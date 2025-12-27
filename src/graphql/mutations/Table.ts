import { gql } from 'graphql-tag';

/**
 * GraphQL Mutations for Table
 */

export const M_CREATE_TABLE = gql`
  mutation CreateTable($input: CreateTableInput!) {
    createTable(input: $input) {
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

export const M_UPDATE_TABLE = gql`
  mutation UpdateTable($key: CompositeKeyInput!, $input: UpdateTableInput!) {
    updateTable(key: $key, input: $input) {
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

export const M_DELETE_TABLE = gql`
  mutation DeleteTable($key: CompositeKeyInput!) {
    deleteTable(key: $key) {
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

