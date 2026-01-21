import { gql } from 'graphql-tag';

/**
 * GraphQL Mutations for WorkflowNodeExecution
 */

export const M_CREATE_WORKFLOW_NODE_EXECUTION = gql`
  mutation CreateWorkflowNodeExecution($input: CreateWorkflowNodeExecutionInput!) {
    createWorkflowNodeExecution(input: $input) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      parentId
      workflowExecutionId
      nodeId
      nodeCategory
      nodeName
      nodeType
      status
      startedAt
      completedAt
      inputData
      outputData
      errorMessage
      errorDetails
    }
  }
`;

export const M_UPDATE_WORKFLOW_NODE_EXECUTION = gql`
  mutation UpdateWorkflowNodeExecution($id: ID!, $input: UpdateWorkflowNodeExecutionInput!) {
    updateWorkflowNodeExecution(id: $id, input: $input) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      parentId
      workflowExecutionId
      nodeId
      nodeCategory
      nodeName
      nodeType
      status
      startedAt
      completedAt
      inputData
      outputData
      errorMessage
      errorDetails
    }
  }
`;

export const M_DELETE_WORKFLOW_NODE_EXECUTION = gql`
  mutation DeleteWorkflowNodeExecution($id: ID!) {
    deleteWorkflowNodeExecution(id: $id) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      parentId
      workflowExecutionId
      nodeId
      nodeCategory
      nodeName
      nodeType
      status
      startedAt
      completedAt
      inputData
      outputData
      errorMessage
      errorDetails
    }
  }
`;
