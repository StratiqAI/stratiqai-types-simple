import { gql } from 'graphql-tag';

/** Fields returned by `createUsageRecord` for billing / reconciliation. */
const USAGE_RECORD_FIELDS = `
  id
  entityType
  tenantId
  ownerId
  createdAt
  updatedAt
  reportableObjectId
  quantity
  unit
  metadata
  timestamp
`;

/**
 * Creates a UsageRecord (e.g. token usage for an AIQueryExecution).
 * Variables: { input: CreateUsageRecordInput! }
 */
export const M_CREATE_USAGE_RECORD = gql`
  mutation CreateUsageRecord($input: CreateUsageRecordInput!) {
    createUsageRecord(input: $input) {
      ${USAGE_RECORD_FIELDS}
    }
  }
`;
