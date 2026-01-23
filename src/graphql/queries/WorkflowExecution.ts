import { gql } from 'graphql-tag';

/**
 * GraphQL Queries for WorkflowExecution
 */

export const Q_GET_WORKFLOW_EXECUTION = gql`
  query GetWorkflowExecution($key: CompositeKeyInput!) {
    getWorkflowExecution(key: $key) {
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
        ui {
          elements {
            id
            type
            category
            typeLabel
            x
            y
            width
            height
          }
          connections {
            id
            from
            to
            fromSide
            toSide
          }
        }
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
      workflownodeexecutions(limit: 100) {
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
    $parentId: ID!
    $status: WorkflowExecutionStatus
    $limit: Int
    $nextToken: String
  ) {
    listWorkflowExecutions(
      parentId: $parentId
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
