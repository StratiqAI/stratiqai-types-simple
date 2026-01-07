import { gql } from 'graphql-tag';

/**
 * GraphQL Subscriptions for PromptTemplate
 */

export const S_ON_CREATE_PROMPT_TEMPLATE = gql`
  subscription OnCreatePromptTemplate($parentId: ID) {
    onCreatePromptTemplate(parentId: $parentId) {
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

export const S_ON_UPDATE_PROMPT_TEMPLATE = gql`
  subscription OnUpdatePromptTemplate($id: ID!) {
    onUpdatePromptTemplate(id: $id) {
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

export const S_ON_DELETE_PROMPT_TEMPLATE = gql`
  subscription OnDeletePromptTemplate($id: ID!) {
    onDeletePromptTemplate(id: $id) {
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
