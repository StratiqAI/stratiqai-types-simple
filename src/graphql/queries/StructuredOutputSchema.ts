import { gql } from 'graphql-tag';

/**
 * GraphQL Queries for AI Studio StructuredOutputSchema (tenant-scoped)
 */

export const Q_GET_STRUCTURED_OUTPUT_SCHEMA = gql`
  query GetStructuredOutputSchema($id: ID!) {
    getStructuredOutputSchema(id: $id) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      name
      description
      schemaDefinition
    }
  }
`;

export const Q_LIST_STRUCTURED_OUTPUT_SCHEMAS = gql`
  query ListStructuredOutputSchemas($limit: Int, $nextToken: String) {
    listStructuredOutputSchemas(limit: $limit, nextToken: $nextToken) {
      items {
        id
        entityType
        tenantId
        ownerId
        createdAt
        updatedAt
        deletedAt
        name
        description
        schemaDefinition
      }
      nextToken
    }
  }
`;
