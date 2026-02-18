import { gql } from 'graphql-tag';

/**
 * GraphQL Subscriptions for AI Studio Prompt
 */

export const S_ON_CREATE_PROMPT = gql`
  subscription OnCreatePrompt($parentId: ID) {
    onCreatePrompt(parentId: $parentId) {
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
      description
      templateText
      inputVariables
      model
      config {
        temperature
        topP
        topK
        maxOutputTokens
        stopSequences
      }
      version
      isActive
      outputSchema {
        id
        name
      }
    }
  }
`;

export const S_ON_UPDATE_PROMPT = gql`
  subscription OnUpdatePrompt($id: ID!) {
    onUpdatePrompt(id: $id) {
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
      description
      templateText
      inputVariables
      model
      config {
        temperature
        topP
        topK
        maxOutputTokens
        stopSequences
      }
      version
      isActive
      outputSchema {
        id
        name
      }
    }
  }
`;

export const S_ON_DELETE_PROMPT = gql`
  subscription OnDeletePrompt($id: ID!) {
    onDeletePrompt(id: $id) {
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
      description
      templateText
      version
      isActive
    }
  }
`;
