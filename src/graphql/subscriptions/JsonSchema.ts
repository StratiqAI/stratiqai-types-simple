import { gql } from 'graphql-tag';
import { JSON_SCHEMA_FIELDS } from '../queries/JsonSchema.js';

export const S_ON_CREATE_JSON_SCHEMA = gql`
  subscription OnCreateJsonSchema {
    onCreateJsonSchema {
      ...JsonSchemaFields
    }
  }
  ${JSON_SCHEMA_FIELDS}
`;

export const S_ON_UPDATE_JSON_SCHEMA = gql`
  subscription OnUpdateJsonSchema($id: ID!) {
    onUpdateJsonSchema(id: $id) {
      ...JsonSchemaFields
    }
  }
  ${JSON_SCHEMA_FIELDS}
`;

export const S_ON_DELETE_JSON_SCHEMA = gql`
  subscription OnDeleteJsonSchema($id: ID!) {
    onDeleteJsonSchema(id: $id) {
      ...JsonSchemaFields
    }
  }
  ${JSON_SCHEMA_FIELDS}
`;
