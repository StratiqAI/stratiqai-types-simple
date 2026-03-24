import { gql } from 'graphql-tag';

import { AI_QUERY_EXECUTION_FIELDS } from '../queries/AIQueryExecution.js';

/**
 * GraphQL Subscriptions for AI Studio AIQueryExecution (standard Node: onCreate, onUpdate, onDelete)
 * Use onUpdateAIQueryExecution(id) with id from create/submit to receive PROCESSING / SUCCESS / ERROR.
 * Use *ByExecutionId variants when you only have the client executionId.
 */

export const S_ON_CREATE_AI_QUERY_EXECUTION = gql`
  subscription OnCreateAIQueryExecution($promptId: ID) {
    onCreateAIQueryExecution(promptId: $promptId) {
      ${AI_QUERY_EXECUTION_FIELDS}
    }
  }
`;

export const S_ON_UPDATE_AI_QUERY_EXECUTION = gql`
  subscription OnUpdateAIQueryExecution($id: ID!) {
    onUpdateAIQueryExecution(id: $id) {
      ${AI_QUERY_EXECUTION_FIELDS}
    }
  }
`;

export const S_ON_DELETE_AI_QUERY_EXECUTION = gql`
  subscription OnDeleteAIQueryExecution($id: ID!) {
    onDeleteAIQueryExecution(id: $id) {
      ${AI_QUERY_EXECUTION_FIELDS}
    }
  }
`;

export const S_ON_CREATE_AI_QUERY_EXECUTION_BY_EXECUTION_ID = gql`
  subscription OnCreateAIQueryExecutionByExecutionId($executionId: ID!) {
    onCreateAIQueryExecutionByExecutionId(executionId: $executionId) {
      ${AI_QUERY_EXECUTION_FIELDS}
    }
  }
`;

export const S_ON_UPDATE_AI_QUERY_EXECUTION_BY_EXECUTION_ID = gql`
  subscription OnUpdateAIQueryExecutionByExecutionId($executionId: ID!) {
    onUpdateAIQueryExecutionByExecutionId(executionId: $executionId) {
      ${AI_QUERY_EXECUTION_FIELDS}
    }
  }
`;

export const S_ON_DELETE_AI_QUERY_EXECUTION_BY_EXECUTION_ID = gql`
  subscription OnDeleteAIQueryExecutionByExecutionId($executionId: ID!) {
    onDeleteAIQueryExecutionByExecutionId(executionId: $executionId) {
      ${AI_QUERY_EXECUTION_FIELDS}
    }
  }
`;
