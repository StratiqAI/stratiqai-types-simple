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
 * Update a TenantQuota (admin only; id = tenantId).
 * Variables: { id: ID!, input: UpdateTenantQuotaInput! }
 */
export const M_UPDATE_TENANT_QUOTA = gql`
  mutation UpdateTenantQuota($id: ID!, $input: UpdateTenantQuotaInput!) {
    updateTenantQuota(id: $id, input: $input) {
      ${TENANT_QUOTA_FIELDS}
    }
  }
`;
