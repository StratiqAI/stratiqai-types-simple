import { gql } from 'graphql-tag';
import { PROMPT_FIELDS } from '../queries/Prompt.js';

/**
 * GraphQL Mutations for AI Studio Prompt (root entity)
 * Create/Update use input.outputSchema (PromptOutputSchemaInput); no outputSchemaId.
 */

export const M_CREATE_PROMPT = gql`
  mutation CreatePrompt($input: CreatePromptInput!) {
    createPrompt(input: $input) {
      ...PromptFields
    }
  }
  ${PROMPT_FIELDS}
`;

export const M_UPDATE_PROMPT = gql`
  mutation UpdatePrompt($id: ID!, $input: UpdatePromptInput!) {
    updatePrompt(id: $id, input: $input) {
      ...PromptFields
    }
  }
  ${PROMPT_FIELDS}
`;

export const M_DELETE_PROMPT = gql`
  mutation DeletePrompt($id: ID!) {
    deletePrompt(id: $id) {
      ...PromptFields
    }
  }
  ${PROMPT_FIELDS}
`;

export const M_SUBMIT_AI_QUERY = gql`
  mutation SubmitAIQuery($input: CreateAIQueryExecutionInput!) {
    submitAIQuery(input: $input) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      executedAt
      durationMs
      inputValues
      rawOutput
      promptId
      promptTokenCount
      candidatesTokenCount
      totalTokenCount
      status
      errorMessage
    }
  }
`;
