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
  mutation UpdateWorkflowNodeExecution($key: CompositeKeyInput!, $input: UpdateWorkflowNodeExecutionInput!) {
    updateWorkflowNodeExecution(key: $key, input: $input) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      parentId
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

export const M_START_WORKFLOW_NODE_EXECUTION = gql`
  mutation StartWorkflowNodeExecution($key: CompositeKeyInput!) {
    startWorkflowNodeExecution(key: $key) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      parentId
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

export const M_COMPLETE_WORKFLOW_NODE_EXECUTION = gql`
  mutation CompleteWorkflowNodeExecution($key: CompositeKeyInput!, $outputData: AWSJSON) {
    completeWorkflowNodeExecution(key: $key, outputData: $outputData) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      parentId
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

export const M_FAIL_WORKFLOW_NODE_EXECUTION = gql`
  mutation FailWorkflowNodeExecution($key: CompositeKeyInput!, $errorMessage: String!, $errorDetails: AWSJSON) {
    failWorkflowNodeExecution(key: $key, errorMessage: $errorMessage, errorDetails: $errorDetails) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      parentId
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

export const M_RETRY_WORKFLOW_NODE_EXECUTION = gql`
  mutation RetryWorkflowNodeExecution($key: CompositeKeyInput!) {
    retryWorkflowNodeExecution(key: $key) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      parentId
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
  mutation DeleteWorkflowNodeExecution($key: CompositeKeyInput!) {
    deleteWorkflowNodeExecution(key: $key) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      parentId
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
