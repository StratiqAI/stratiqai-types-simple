import { gql } from 'graphql-tag';

/**
 * GraphQL Subscriptions for WorkflowExecution
 * 
 * These subscriptions enable real-time updates in the web application
 * as workflow executions progress through their nodes.
 */

/**
 * Subscribe to new workflow executions for a specific workflow
 */
export const S_ON_CREATE_WORKFLOW_EXECUTION = gql`
  subscription OnCreateWorkflowExecution($workflowId: ID!) {
    onCreateWorkflowExecution(workflowId: $workflowId) {
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

/**
 * Subscribe to updates for a specific workflow execution
 * Use this to track progress of a single execution
 */
export const S_ON_UPDATE_WORKFLOW_EXECUTION = gql`
  subscription OnUpdateWorkflowExecution($id: ID!) {
    onUpdateWorkflowExecution(id: $id) {
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

/**
 * Subscribe to all workflow execution status changes
 * Can filter by workflowId and/or status
 * Use this for dashboard views showing multiple executions
 */
export const S_ON_WORKFLOW_EXECUTION_STATUS_CHANGE = gql`
  subscription OnWorkflowExecutionStatusChange(
    $workflowId: ID
    $status: WorkflowExecutionStatus
  ) {
    onWorkflowExecutionStatusChange(workflowId: $workflowId, status: $status) {
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
