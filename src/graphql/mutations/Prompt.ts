import { gql } from 'graphql-tag';

/**
 * GraphQL Mutations for AI Studio Prompt (root entity)
 */

export const M_CREATE_PROMPT = gql`
  mutation CreatePrompt($input: CreatePromptInput!) {
    createPrompt(input: $input) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      sharingMode
      sourcePromptId
      name
      description
      content {
        body
        systemInstruction
        inputVariables
      }
      inputVariables
      model
      config {
        temperature
        topP
        topK
        maxOutputTokens
        stopSequences
      }
      version
      isActive
      outputSchema {
        id
        name
        description
        schemaDefinition
      }
    }
  }
`;

export const M_UPDATE_PROMPT = gql`
  mutation UpdatePrompt($id: ID!, $input: UpdatePromptInput!) {
    updatePrompt(id: $id, input: $input) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      sharingMode
      sourcePromptId
      name
      description
      content {
        body
        systemInstruction
        inputVariables
      }
      inputVariables
      model
      config {
        temperature
        topP
        topK
        maxOutputTokens
        stopSequences
      }
      version
      isActive
      outputSchema {
        id
        name
        description
        schemaDefinition
      }
    }
  }
`;

export const M_DELETE_PROMPT = gql`
  mutation DeletePrompt($id: ID!) {
    deletePrompt(id: $id) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      sharingMode
      sourcePromptId
      name
      description
      content {
        body
        systemInstruction
        inputVariables
      }
      inputVariables
      model
      version
      isActive
    }
  }
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
