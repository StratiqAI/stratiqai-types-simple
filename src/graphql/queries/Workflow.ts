import { gql } from 'graphql-tag';

/**
 * GraphQL Queries for Workflow
 */

export const Q_GET_WORKFLOW = gql`
  query GetWorkflow($key: CompositeKeyInput!) {
    getWorkflow(key: $key) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
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

export const Q_LIST_WORKFLOWS = gql`
  query ListWorkflows($parentId: ID!, $limit: Int, $nextToken: String) {
    listWorkflows(parentId: $parentId, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
