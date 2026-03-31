import { gql } from 'graphql-tag';
import { JSON_SCHEMA_FIELDS } from '../queries/JsonSchema.js';

export const M_CREATE_JSON_SCHEMA = gql`
  mutation CreateJsonSchema($input: CreateJsonSchemaInput!) {
    createJsonSchema(input: $input) {
      ...JsonSchemaFields
    }
  }
  ${JSON_SCHEMA_FIELDS}
`;

export const M_UPDATE_JSON_SCHEMA = gql`
  mutation UpdateJsonSchema($id: ID!, $input: UpdateJsonSchemaInput!) {
    updateJsonSchema(id: $id, input: $input) {
      ...JsonSchemaFields
    }
  }
  ${JSON_SCHEMA_FIELDS}
`;

export const M_DELETE_JSON_SCHEMA = gql`
  mutation DeleteJsonSchema($id: ID!) {
    deleteJsonSchema(id: $id) {
      id
    }
  }
`;
