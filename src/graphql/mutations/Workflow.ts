import { gql } from 'graphql-tag';

/**
 * GraphQL Mutations for Workflow
 */

export const M_CREATE_WORKFLOW = gql`
  mutation CreateWorkflow($input: CreateWorkflowInput!) {
    createWorkflow(input: $input) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      sharingMode
      name
      definitionJSON
    }
  }
`;

export const M_UPDATE_WORKFLOW = gql`
  mutation UpdateWorkflow($id: ID!, $input: UpdateWorkflowInput!) {
    updateWorkflow(id: $id, input: $input) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      sharingMode
      name
      definitionJSON
    }
  }
`;

export const M_DELETE_WORKFLOW = gql`
  mutation DeleteWorkflow($id: ID!) {
    deleteWorkflow(id: $id) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      sharingMode
      name
      definitionJSON
    }
  }
`;
