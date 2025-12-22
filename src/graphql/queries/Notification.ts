import { gql } from 'graphql-tag';

/**
 * GraphQL Queries for Notification
 */

export const Q_GET_NOTIFICATION = gql`
  query GetNotification($key: CompositeKeyInput!) {
    getNotification(key: $key) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      parentId
      message
      timestamp
      properties
    }
  }
`;

export const Q_LIST_NOTIFICATIONS = gql`
  query ListNotifications(
    $parentId: ID!
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(parentId: $parentId, limit: $limit, nextToken: $nextToken) {
      items {
        id
        entityType
        tenantId
        ownerId
        createdAt
        updatedAt
        deletedAt
        parentId
                message
        timestamp
        properties
      }
      nextToken
    }
  }
`;

