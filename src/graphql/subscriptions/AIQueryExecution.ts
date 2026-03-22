import { gql } from 'graphql-tag';

import { AI_QUERY_EXECUTION_FIELDS } from '../queries/AIQueryExecution.js';

/**
 * GraphQL Subscriptions for AI Studio AIQueryExecution (standard Node: onCreate, onUpdate, onDelete)
 * Use onUpdateAIQueryExecution(id) with id from create/submit to receive PROCESSING / SUCCESS / ERROR.
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
