import { gql } from 'graphql-tag';

/**
 * GraphQL Queries for Workflow
 */

export const Q_GET_WORKFLOW = gql`
  query GetWorkflow($id: ID!) {
    getWorkflow(id: $id) {
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
      definitionJSON
    }
  }
`;

export const Q_LIST_WORKFLOWS = gql`
  query ListWorkflows($limit: Int, $nextToken: String) {
    listWorkflows(limit: $limit, nextToken: $nextToken) {
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
        definitionJSON
      }
      nextToken
    }
  }
`;
