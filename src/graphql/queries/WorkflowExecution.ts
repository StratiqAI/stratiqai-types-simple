import { gql } from 'graphql-tag';

/**
 * GraphQL Queries for WorkflowExecution
 */

export const Q_GET_WORKFLOW_EXECUTION = gql`
  query GetWorkflowExecution($id: ID!) {
    getWorkflowExecution(id: $id) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      parentId
      workflowId
      workflow {
        id
        entityType
        tenantId
        ownerId
        createdAt
        updatedAt
        deletedAt
        sharingMode
        name
        definition
      }
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
      nodeExecutions(limit: 100) {
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
  }
`;

export const Q_LIST_WORKFLOW_EXECUTIONS = gql`
  query ListWorkflowExecutions(
    $workflowId: ID
    $status: WorkflowExecutionStatus
    $limit: Int
    $nextToken: String
  ) {
    listWorkflowExecutions(
      workflowId: $workflowId
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
        workflowId
        workflow {
          id
          name
          definition
        }
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
      nextToken
    }
  }
`;
