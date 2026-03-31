import { gql } from 'graphql-tag';

/**
 * GraphQL Queries for DashboardLayout
 */

export const Q_GET_DASHBOARD_LAYOUT = gql`
  query GetDashboardLayout($key: CompositeKeyInput!) {
    getDashboardLayout(key: $key) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      parentId
      state
      version
    }
  }
`;

export const Q_LIST_DASHBOARD_LAYOUTS = gql`
  query ListDashboardLayouts($parentId: ID!, $limit: Int, $nextToken: String) {
    listDashboardLayouts(parentId: $parentId, limit: $limit, nextToken: $nextToken) {
      items {
        id
        entityType
        tenantId
        ownerId
        createdAt
        updatedAt
        deletedAt
        parentId
        state
        version
      }
      nextToken
    }
  }
`;
