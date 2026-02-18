import { gql } from 'graphql-tag';

/**
 * GraphQL Mutations for AI Studio Prompt
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
      parentId
      name
      description
      templateText
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
  mutation UpdatePrompt($key: CompositeKeyInput!, $input: UpdatePromptInput!) {
    updatePrompt(key: $key, input: $input) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      sharingMode
      parentId
      name
      description
      templateText
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
  mutation DeletePrompt($key: CompositeKeyInput!) {
    deletePrompt(key: $key) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      sharingMode
      parentId
      name
      description
      templateText
      inputVariables
      model
      version
      isActive
    }
  }
`;

export const M_RUN_AI_QUERY = gql`
  mutation RunAIQuery($input: RunAIQueryInput!) {
    runAIQuery(input: $input) {
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
      structuredOutput
      promptTokenCount
      candidatesTokenCount
      totalTokenCount
      status
      errorMessage
      prompt {
        id
        name
        version
        parentId
      }
    }
  }
`;
