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
      workflowExecutionId
      workflowExecution {
        id
        entityType
        tenantId
        ownerId
        createdAt
        updatedAt
        deletedAt
        workflowId
        status
        startedAt
        completedAt
        cancelledAt
        triggerEvent
        inputData
        outputData
        errorMessage
        stepFunctionExecutionArn
        stepFunctionStateMachineArn
      }
      nodeId
      nodeName
      nodeType
      status
      startedAt
      completedAt
      inputData
      outputData
      errorMessage
      errorDetails
      stepFunctionTaskToken
      stepFunctionExecutionArn
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
        workflowExecutionId
        nodeId
        nodeName
        nodeType
        status
        startedAt
        completedAt
        inputData
        outputData
        errorMessage
        errorDetails
        stepFunctionTaskToken
        stepFunctionExecutionArn
      }
      nextToken
    }
  }
`;
