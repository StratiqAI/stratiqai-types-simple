import { gql } from 'graphql-tag';
import { PROMPT_FIELDS } from '../queries/Prompt.js';

/**
 * GraphQL Subscriptions for AI Studio Prompt (root entity)
 */

export const S_ON_CREATE_PROMPT = gql`
  subscription OnCreatePrompt {
    onCreatePrompt {
      ...PromptFields
    }
  }
  ${PROMPT_FIELDS}
`;

export const S_ON_UPDATE_PROMPT = gql`
  subscription OnUpdatePrompt($id: ID!) {
    onUpdatePrompt(id: $id) {
      ...PromptFields
    }
  }
  ${PROMPT_FIELDS}
`;

export const S_ON_DELETE_PROMPT = gql`
  subscription OnDeletePrompt($id: ID!) {
    onDeletePrompt(id: $id) {
      ...PromptFields
    }
  }
  ${PROMPT_FIELDS}
`;
