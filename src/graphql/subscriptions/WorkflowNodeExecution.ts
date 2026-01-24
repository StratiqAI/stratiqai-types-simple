import { gql } from 'graphql-tag';

/**
 * GraphQL Subscriptions for WorkflowNodeExecution
 * 
 * These subscriptions enable real-time updates in the web application
 * as individual nodes within a workflow execution are processed.
 */

/**
 * Subscribe to new node executions for a specific workflow execution
 * Use this to see when new nodes start executing
 */
export const S_ON_CREATE_WORKFLOW_NODE_EXECUTION = gql`
  subscription OnCreateWorkflowNodeExecution($parentId: ID!) {
    onCreateWorkflowNodeExecution(parentId: $parentId) {
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

/**
 * Subscribe to updates for a specific node execution
 * Use this to track progress of a single node
 */
export const S_ON_UPDATE_WORKFLOW_NODE_EXECUTION = gql`
  subscription OnUpdateWorkflowNodeExecution($id: ID!) {
    onUpdateWorkflowNodeExecution(id: $id) {
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

/**
 * Subscribe to all node execution status changes for a workflow execution
 * Use this to track all nodes in a workflow execution in real-time
 */
export const S_ON_WORKFLOW_NODE_EXECUTION_STATUS_CHANGE = gql`
  subscription OnWorkflowNodeExecutionStatusChange($parentId: ID!) {
    onWorkflowNodeExecutionStatusChange(parentId: $parentId) {
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
