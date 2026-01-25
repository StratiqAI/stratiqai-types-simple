import { gql } from 'graphql-tag';

/**
 * GraphQL Subscriptions for Project
 */

export const S_ON_CREATE_PROJECT = gql`
  subscription OnCreateProject($ownerId: ID, $tenantId: ID) {
    onCreateProject(ownerId: $ownerId, tenantId: $tenantId) {
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

export const S_ON_RESTORE_PROJECT = gql`
  subscription OnRestoreProject($id: ID!) {
    onRestoreProject(id: $id) {
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
