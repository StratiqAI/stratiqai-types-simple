import { gql } from 'graphql-tag';

/**
 * GraphQL Subscriptions for Notification
 */

export const S_ON_CREATE_NOTIFICATION = gql`
  subscription OnCreateNotification($parentId: ID) {
    onCreateNotification(parentId: $parentId) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      parentId
      message
      properties
      agent
      displayInAgentActivityFeed
    }
  }
`;

export const S_ON_UPDATE_NOTIFICATION = gql`
  subscription OnUpdateNotification($id: ID!) {
    onUpdateNotification(id: $id) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      parentId
      message
      properties
      agent
      displayInAgentActivityFeed
    }
  }
`;

export const S_ON_DELETE_NOTIFICATION = gql`
  subscription OnDeleteNotification($id: ID!) {
    onDeleteNotification(id: $id) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      parentId
      message
      properties
      agent
      displayInAgentActivityFeed
    }
  }
`;

