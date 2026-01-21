import { gql } from 'graphql-tag';

/**
 * GraphQL Mutations for WorkflowExecution
 */

export const M_CREATE_WORKFLOW_EXECUTION = gql`
  mutation CreateWorkflowExecution($input: CreateWorkflowExecutionInput!) {
    createWorkflowExecution(input: $input) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      parentId
      workflowId
      status
      startedAt
      completedAt
      cancelledAt
      triggerEvent
      inputData
      outputData
      errorMessage
      totalNodes
      completedNodes
      currentNodeId
    }
  }
`;

export const M_UPDATE_WORKFLOW_EXECUTION = gql`
  mutation UpdateWorkflowExecution($key: CompositeKeyInput!, $input: UpdateWorkflowExecutionInput!) {
    updateWorkflowExecution(key: $key, input: $input) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      parentId
      workflowId
      status
      startedAt
      completedAt
      cancelledAt
      triggerEvent
      inputData
      outputData
      errorMessage
      totalNodes
      completedNodes
      currentNodeId
    }
  }
`;

export const M_CANCEL_WORKFLOW_EXECUTION = gql`
  mutation CancelWorkflowExecution($key: CompositeKeyInput!) {
    cancelWorkflowExecution(key: $key) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      parentId
      workflowId
      status
      startedAt
      completedAt
      cancelledAt
      triggerEvent
      inputData
      outputData
      errorMessage
      totalNodes
      completedNodes
      currentNodeId
    }
  }
`;
