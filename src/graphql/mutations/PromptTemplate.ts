import { gql } from 'graphql-tag';

/**
 * GraphQL Mutations for PromptTemplate
 */

export const M_CREATE_PROMPT_TEMPLATE = gql`
  mutation CreatePromptTemplate($input: CreatePromptTemplateInput!) {
    createPromptTemplate(input: $input) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      sharingMode
      parentId
      name
      template
      description
    }
  }
`;

export const M_UPDATE_PROMPT_TEMPLATE = gql`
  mutation UpdatePromptTemplate($key: CompositeKeyInput!, $input: UpdatePromptTemplateInput!) {
    updatePromptTemplate(key: $key, input: $input) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      sharingMode
      parentId
      name
      template
      description
    }
  }
`;

export const M_DELETE_PROMPT_TEMPLATE = gql`
  mutation DeletePromptTemplate($key: CompositeKeyInput!) {
    deletePromptTemplate(key: $key) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      sharingMode
      parentId
      name
      template
      description
    }
  }
`;
