import { gql } from 'graphql-tag';

/**
 * GraphQL Queries for AI Studio Prompt (root entity)
 */

export const PROMPT_FIELDS = gql`
  fragment PromptFields on Prompt {
    id
    entityType
    tenantId
    ownerId
    createdAt
    updatedAt
    deletedAt
    sharingMode
    name
    description
    prompt
    systemInstruction
    inputVariables
    model
    version
    isActive
    jsonSchemaId
    schema
  }
`;

export const Q_GET_PROMPT = gql`
  query GetPrompt($id: ID!) {
    getPrompt(id: $id) {
      ...PromptFields
    }
  }
  ${PROMPT_FIELDS}
`;

export const Q_LIST_PROMPTS = gql`
  query ListPrompts($scope: ListScope, $limit: Int, $nextToken: String) {
    listPrompts(scope: $scope, limit: $limit, nextToken: $nextToken) {
      items {
        ...PromptFields
      }
      nextToken
    }
  }
  ${PROMPT_FIELDS}
`;
