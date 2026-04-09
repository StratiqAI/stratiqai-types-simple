import { gql } from 'graphql-tag';

/**
 * GraphQL Mutations for Notification
 */

export const M_CREATE_NOTIFICATION = gql`
  mutation CreateNotification($input: CreateNotificationInput!) {
    createNotification(input: $input) {
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

export const M_UPDATE_NOTIFICATION = gql`
  mutation UpdateNotification($key: CompositeKeyInput!, $input: UpdateNotificationInput!) {
    updateNotification(key: $key, input: $input) {
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

export const M_DELETE_NOTIFICATION = gql`
  mutation DeleteNotification($key: CompositeKeyInput!) {
    deleteNotification(key: $key) {
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

