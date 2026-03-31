import { gql } from 'graphql-tag';

export const JSON_SCHEMA_FIELDS = gql`
  fragment JsonSchemaFields on JsonSchema {
    id
    entityType
    tenantId
    ownerId
    createdAt
    updatedAt
    deletedAt
    sharingMode
    sourceJsonSchemaId
    name
    description
    schemaDefinition
  }
`;

export const Q_GET_JSON_SCHEMA = gql`
  query GetJsonSchema($id: ID!) {
    getJsonSchema(id: $id) {
      ...JsonSchemaFields
    }
  }
  ${JSON_SCHEMA_FIELDS}
`;

export const Q_LIST_JSON_SCHEMAS = gql`
  query ListJsonSchemas($scope: ListScope, $limit: Int, $nextToken: String) {
    listJsonSchemas(scope: $scope, limit: $limit, nextToken: $nextToken) {
      items {
        ...JsonSchemaFields
      }
      nextToken
    }
  }
  ${JSON_SCHEMA_FIELDS}
`;
