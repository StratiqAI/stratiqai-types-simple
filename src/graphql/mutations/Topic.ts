import { gql } from 'graphql-tag';

/**
 * GraphQL Mutations for Topic
 * NOTE: Topic mutations are not yet implemented in the schema.
 * These operations are commented out until Topic CRUD operations are added.
 */

/*
export const M_CREATE_TOPIC = gql`
  mutation CreateTopic($input: CreateTopicInput!) {
    createTopic(input: $input) {
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

export const M_UPDATE_TOPIC = gql`
  mutation UpdateTopic($id: ID!, $input: UpdateTopicInput!) {
    updateTopic(id: $id, input: $input) {
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

export const M_DELETE_TOPIC = gql`
  mutation DeleteTopic($id: ID!) {
    deleteTopic(id: $id) {
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
