import { gql } from 'graphql-tag';

const TENANT_QUOTA_FIELDS = `
  id
  entityType
  tenantId
  ownerId
  createdAt
  updatedAt
  deletedAt
  monthlyTokenLimit
  currentMonthTokens
  enforcementPolicy
  resetDay
`;

/**
 * Get a TenantQuota by id (id = tenantId).
 * Variables: { id: ID! }
 */
export const Q_GET_TENANT_QUOTA = gql`
  query GetTenantQuota($id: ID!) {
    getTenantQuota(id: $id) {
      ${TENANT_QUOTA_FIELDS}
    }
  }
`;
