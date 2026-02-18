import { gql } from 'graphql-tag';

/**
 * GraphQL Mutations for AI Studio StructuredOutputSchema
 */

export const M_CREATE_STRUCTURED_OUTPUT_SCHEMA = gql`
  mutation CreateStructuredOutputSchema($input: CreateStructuredOutputSchemaInput!) {
    createStructuredOutputSchema(input: $input) {
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

export const M_UPDATE_STRUCTURED_OUTPUT_SCHEMA = gql`
  mutation UpdateStructuredOutputSchema($id: ID!, $input: CreateStructuredOutputSchemaInput!) {
    updateStructuredOutputSchema(id: $id, input: $input) {
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
