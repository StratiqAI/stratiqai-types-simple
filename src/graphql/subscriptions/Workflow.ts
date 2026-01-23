import { gql } from 'graphql-tag';

/**
 * GraphQL Subscriptions for Workflow
 */

export const S_ON_CREATE_WORKFLOW = gql`
  subscription OnCreateWorkflow($parentId: ID) {
    onCreateWorkflow(parentId: $parentId) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      sharingMode
      name
      definition
      parentId
      ui {
        elements {
          id
          type
          category
          typeLabel
          x
          y
          width
          height
        }
        connections {
          id
          from
          to
          fromSide
          toSide
        }
      }
    }
  }
`;

export const S_ON_UPDATE_WORKFLOW = gql`
  subscription OnUpdateWorkflow($id: ID!) {
    onUpdateWorkflow(id: $id) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      sharingMode
      name
      definition
      parentId
      ui {
        elements {
          id
          type
          category
          typeLabel
          x
          y
          width
          height
        }
        connections {
          id
          from
          to
          fromSide
          toSide
        }
      }
    }
  }
`;

export const S_ON_DELETE_WORKFLOW = gql`
  subscription OnDeleteWorkflow($id: ID!) {
    onDeleteWorkflow(id: $id) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      sharingMode
      name
      definition
      parentId
      ui {
        elements {
          id
          type
          category
          typeLabel
          x
          y
          width
          height
        }
        connections {
          id
          from
          to
          fromSide
          toSide
        }
      }
    }
  }
`;
