import { gql } from 'graphql-tag';

/**
 * GraphQL Subscriptions for Topic
 * NOTE: Topic subscriptions are not yet implemented in the schema.
 * These operations are commented out until Topic subscriptions are added.
 */

/*
export const S_ON_CREATE_TOPIC = gql`
  subscription OnCreateTopic($parentId: ID) {
    onCreateTopic(parentId: $parentId) {
      topic {
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
      userErrors {
        message
        code
        field
      }
    }
  }
`;

export const S_ON_UPDATE_TOPIC = gql`
  subscription OnUpdateTopic($id: ID!) {
    onUpdateTopic(id: $id) {
      topic {
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
      userErrors {
        message
        code
        field
      }
    }
  }
`;

export const S_ON_DELETE_TOPIC = gql`
  subscription OnDeleteTopic($id: ID!) {
    onDeleteTopic(id: $id) {
      topic {
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
      userErrors {
        message
        code
        field
      }
    }
  }
`;
*/
