import { gql } from 'graphql-tag';

/**
 * GraphQL Mutations for DashboardLayout
 */

export const M_CREATE_DASHBOARD_LAYOUT = gql`
  mutation CreateDashboardLayout($input: CreateDashboardLayoutInput!) {
    createDashboardLayout(input: $input) {
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

export const M_UPDATE_DASHBOARD_LAYOUT = gql`
  mutation UpdateDashboardLayout($key: CompositeKeyInput!, $input: UpdateDashboardLayoutInput!) {
    updateDashboardLayout(key: $key, input: $input) {
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
