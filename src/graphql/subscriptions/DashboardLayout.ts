import { gql } from 'graphql-tag';

/**
 * GraphQL Subscriptions for DashboardLayout
 */

export const S_ON_CREATE_DASHBOARD_LAYOUT = gql`
  subscription OnCreateDashboardLayout($parentId: ID) {
    onCreateDashboardLayout(parentId: $parentId) {
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

export const S_ON_UPDATE_DASHBOARD_LAYOUT = gql`
  subscription OnUpdateDashboardLayout($id: ID!) {
    onUpdateDashboardLayout(id: $id) {
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
