import { gql } from 'graphql-tag';

/**
 * GraphQL Queries for WorkflowNodeExecution
 */

export const Q_GET_WORKFLOW_NODE_EXECUTION = gql`
  query GetWorkflowNodeExecution($id: ID!) {
    getWorkflowNodeExecution(id: $id) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      parentId
      workflowExecutionId
      workflowExecution {
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

export const Q_LIST_WORKFLOW_NODE_EXECUTIONS = gql`
  query ListWorkflowNodeExecutions(
    $workflowExecutionId: ID!
    $status: WorkflowNodeExecutionStatus
    $limit: Int
    $nextToken: String
  ) {
    listWorkflowNodeExecutions(
      workflowExecutionId: $workflowExecutionId
      status: $status
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
