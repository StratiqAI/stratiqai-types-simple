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

export const M_START_WORKFLOW_EXECUTION = gql`
  mutation StartWorkflowExecution($key: CompositeKeyInput!) {
    startWorkflowExecution(key: $key) {
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

export const M_COMPLETE_WORKFLOW_EXECUTION = gql`
  mutation CompleteWorkflowExecution($key: CompositeKeyInput!, $outputData: AWSJSON) {
    completeWorkflowExecution(key: $key, outputData: $outputData) {
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

export const M_FAIL_WORKFLOW_EXECUTION = gql`
  mutation FailWorkflowExecution($key: CompositeKeyInput!, $errorMessage: String!, $errorDetails: AWSJSON) {
    failWorkflowExecution(key: $key, errorMessage: $errorMessage, errorDetails: $errorDetails) {
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

export const M_RETRY_WORKFLOW_EXECUTION = gql`
  mutation RetryWorkflowExecution($key: CompositeKeyInput!) {
    retryWorkflowExecution(key: $key) {
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

export const M_DELETE_WORKFLOW_EXECUTION = gql`
  mutation DeleteWorkflowExecution($key: CompositeKeyInput!) {
    deleteWorkflowExecution(key: $key) {
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
