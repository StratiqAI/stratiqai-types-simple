import { gql } from 'graphql-tag';

/**
 * GraphQL Mutations for Text
 */

export const M_CREATE_TEXT = gql`
  mutation CreateText($input: CreateTextInput!) {
    createText(input: $input) {
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

export const M_UPDATE_TEXT = gql`
  mutation UpdateText($key: CompositeKeyInput!, $input: UpdateTextInput!) {
    updateText(key: $key, input: $input) {
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

export const M_DELETE_TEXT = gql`
  mutation DeleteText($key: CompositeKeyInput!) {
    deleteText(key: $key) {
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

