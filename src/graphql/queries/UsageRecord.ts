import { gql } from 'graphql-tag';

const USAGE_RECORD_FIELDS = `
  id
  tenantId
  ownerId
  reportableObjectId
  quantity
  unit
  metadata
  timestamp
  createdAt
`;

/**
 * Lists UsageRecords for a tenant (billing / usage dashboard).
 * Variables: { tenantId: ID!, limit: Int, nextToken: String }
 */
export const Q_LIST_USAGE_RECORDS = gql`
  query ListUsageRecords($tenantId: ID!, $limit: Int, $nextToken: String) {
    listUsageRecords(tenantId: $tenantId, limit: $limit, nextToken: $nextToken) {
      items {
        ${USAGE_RECORD_FIELDS}
      }
      nextToken
    }
  }
`;
