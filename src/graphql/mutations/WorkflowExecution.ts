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
  }
`;

export const M_UPDATE_WORKFLOW_EXECUTION = gql`
  mutation UpdateWorkflowExecution($id: ID!, $input: UpdateWorkflowExecutionInput!) {
    updateWorkflowExecution(id: $id, input: $input) {
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
  }
`;

export const M_CANCEL_WORKFLOW_EXECUTION = gql`
  mutation CancelWorkflowExecution($id: ID!) {
    cancelWorkflowExecution(id: $id) {
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
  }
`;
