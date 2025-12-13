import { gql } from 'graphql-tag';

/**
 * GraphQL Subscriptions for Project
 */

export const S_ON_CREATE_PROJECT = gql`
  subscription OnCreateProject($tenantId: ID) {
    onCreateProject(tenantId: $tenantId) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      sharingMode
      name
      description
      status
    }
  }
`;

export const S_ON_UPDATE_PROJECT = gql`
  subscription OnUpdateProject($id: ID!) {
    onUpdateProject(id: $id) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      sharingMode
      name
      description
      status
    }
  }
`;

export const S_ON_DELETE_PROJECT = gql`
  subscription OnDeleteProject($id: ID!) {
    onDeleteProject(id: $id) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      sharingMode
      name
      description
      status
    }
  }
`;
