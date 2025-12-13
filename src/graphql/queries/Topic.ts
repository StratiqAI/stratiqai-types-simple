import { gql } from 'graphql-tag';

/**
 * GraphQL Queries for Topic
 * NOTE: Topic queries are not yet implemented in the schema.
 * These operations are commented out until Topic queries are added.
 */

/*
export const Q_GET_TOPIC = gql`
  query GetTopic($id: ID!) {
    getTopic(id: $id) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      sharingMode
      accessList(limit: 10) {
        items {
          id
          entityType
          tenantId
          ownerId
          createdAt
          updatedAt
          recipientUserId
          permission
          resourceTitle
          resourceType
        }
        nextToken
      }
      parentId
      name
    }
  }
`;

export const Q_LIST_TOPICS = gql`
  query ListTopics(
    $parentId: ID
    $limit: Int
    $nextToken: String
  ) {
    listTopics(parentId: $parentId, limit: $limit, nextToken: $nextToken) {
      items {
        id
        entityType
        tenantId
        ownerId
        createdAt
        updatedAt
        sharingMode
        parentId
        name
      }
      nextToken
    }
  }
`;
*/
