# Workflow Execution Subscriptions - GraphQL Schema Proposal

## Overview
This document proposes GraphQL schema additions to enable real-time subscriptions for workflow execution progress. As workflows execute (via Step Functions or Lambda), each node completion will trigger GraphQL mutations that automatically publish to subscribed clients via AppSync.

## Architecture Pattern
- **Step Functions/Lambda handlers** → Call GraphQL mutations (`createWorkflowExecution`, `updateWorkflowNodeExecution`, etc.)
- **AppSync `@aws_subscribe` directive** → Automatically publishes to subscribers when mutations are called
- **Browser clients** → Subscribe to workflow/node execution updates in real-time

---

## 1. EntityType Enum Addition

Add to the `EntityType` enum:
```graphql
enum EntityType {
  # ... existing values ...
  WORKFLOW
  WORKFLOW_EXECUTION      # NEW
  WORKFLOW_NODE_EXECUTION # NEW
}
```

---

## 2. New Status Enums

```graphql
enum WorkflowExecutionStatus {
  PENDING      # Execution created but not started
  RUNNING      # Currently executing
  COMPLETED    # All nodes completed successfully
  FAILED       # Execution failed (one or more nodes failed)
  CANCELLED    # Execution was cancelled
}

enum WorkflowNodeExecutionStatus {
  PENDING      # Node queued, waiting for dependencies
  RUNNING      # Node currently executing
  COMPLETED    # Node completed successfully
  FAILED       # Node execution failed
  SKIPPED      # Node was skipped (e.g., conditional branch)
}
```

---

## 3. WorkflowExecution Type

Tracks a single execution instance of a workflow:

```graphql
type WorkflowExecution implements Node & Metadata
  @aws_iam
  @aws_cognito_user_pools {
  # Metadata Fields
  id: ID!
  entityType: EntityType!
  tenantId: ID!
  ownerId: ID!
  createdAt: AWSDateTime!
  updatedAt: AWSDateTime!
  deletedAt: AWSDateTime

  # Workflow Execution Fields
  workflowId: ID!                    # Reference to the Workflow definition
  workflow: Workflow                  # Resolved workflow (optional query)
  status: WorkflowExecutionStatus!
  startedAt: AWSDateTime
  completedAt: AWSDateTime
  cancelledAt: AWSDateTime
  
  # Execution Context
  triggerEvent: AWSJSON              # The event that triggered this execution
  inputData: AWSJSON                 # Input data passed to the workflow
  outputData: AWSJSON                # Final output data (when completed)
  errorMessage: String               # Error message if failed
  
  # Step Functions Integration
  stepFunctionExecutionArn: String   # ARN of the Step Functions execution
  stepFunctionStateMachineArn: String # ARN of the state machine
  
  # Node Executions
  nodeExecutions(limit: Int, nextToken: String): WorkflowNodeExecutionConnection
}

type WorkflowExecutionConnection
  @aws_iam
  @aws_cognito_user_pools(
    cognito_groups: ["SystemAdmins", "TenantAdmins", "Users"]
  ) {
  items: [WorkflowExecution!]!
  nextToken: String
}
```

---

## 4. WorkflowNodeExecution Type

Tracks the execution of a single node within a workflow execution:

```graphql
type WorkflowNodeExecution implements Node & Metadata
  @aws_iam
  @aws_cognito_user_pools {
  # Metadata Fields
  id: ID!
  entityType: EntityType!
  tenantId: ID!
  ownerId: ID!
  createdAt: AWSDateTime!
  updatedAt: AWSDateTime!
  deletedAt: AWSDateTime

  # Node Execution Fields
  workflowExecutionId: ID!           # Parent execution
  workflowExecution: WorkflowExecution # Resolved execution (optional query)
  nodeId: String!                    # ID of the node in the workflow definition
  nodeName: String                   # Human-readable node name
  nodeType: String                   # Type of node (e.g., "input", "ai", "output")
  status: WorkflowNodeExecutionStatus!
  
  # Timing
  startedAt: AWSDateTime
  completedAt: AWSDateTime
  
  # Execution Data
  inputData: AWSJSON                 # Input data for this node
  outputData: AWSJSON                # Output data from this node
  errorMessage: String               # Error message if failed
  errorDetails: AWSJSON              # Detailed error information
  
  # Step Functions Integration
  stepFunctionTaskToken: String      # Task token for Step Functions callback
  stepFunctionExecutionArn: String   # ARN of the Step Functions execution
}

type WorkflowNodeExecutionConnection
  @aws_iam
  @aws_cognito_user_pools(
    cognito_groups: ["SystemAdmins", "TenantAdmins", "Users"]
  ) {
  items: [WorkflowNodeExecution!]!
  nextToken: String
}
```

---

## 5. Input Types for Mutations

```graphql
input CreateWorkflowExecutionInput {
  workflowId: ID!
  triggerEvent: AWSJSON
  inputData: AWSJSON
  stepFunctionExecutionArn: String
  stepFunctionStateMachineArn: String
}

input UpdateWorkflowExecutionInput {
  status: WorkflowExecutionStatus
  outputData: AWSJSON
  errorMessage: String
  completedAt: AWSDateTime
  cancelledAt: AWSDateTime
}

input CreateWorkflowNodeExecutionInput {
  workflowExecutionId: ID!
  nodeId: String!
  nodeName: String
  nodeType: String
  inputData: AWSJSON
  stepFunctionTaskToken: String
  stepFunctionExecutionArn: String
}

input UpdateWorkflowNodeExecutionInput {
  status: WorkflowNodeExecutionStatus
  outputData: AWSJSON
  errorMessage: String
  errorDetails: AWSJSON
  startedAt: AWSDateTime
  completedAt: AWSDateTime
}
```

---

## 6. Mutations

```graphql
type Mutation {
  # ... existing mutations ...

  # WORKFLOW EXECUTION OPERATIONS
  createWorkflowExecution(input: CreateWorkflowExecutionInput!): WorkflowExecution
    @aws_iam
    @aws_cognito_user_pools(
      cognito_groups: ["SystemAdmins", "TenantAdmins", "Users"]
    )

  updateWorkflowExecution(
    id: ID!
    input: UpdateWorkflowExecutionInput!
  ): WorkflowExecution
    @aws_iam
    @aws_cognito_user_pools(
      cognito_groups: ["SystemAdmins", "TenantAdmins", "Users"]
    )

  cancelWorkflowExecution(id: ID!): WorkflowExecution
    @aws_iam
    @aws_cognito_user_pools(
      cognito_groups: ["SystemAdmins", "TenantAdmins", "Users"]
    )

  # WORKFLOW NODE EXECUTION OPERATIONS
  createWorkflowNodeExecution(input: CreateWorkflowNodeExecutionInput!): WorkflowNodeExecution
    @aws_iam
    @aws_cognito_user_pools(
      cognito_groups: ["SystemAdmins", "TenantAdmins", "Users"]
    )

  updateWorkflowNodeExecution(
    id: ID!
    input: UpdateWorkflowNodeExecutionInput!
  ): WorkflowNodeExecution
    @aws_iam
    @aws_cognito_user_pools(
      cognito_groups: ["SystemAdmins", "TenantAdmins", "Users"]
    )
}
```

---

## 7. Queries

```graphql
type Query {
  # ... existing queries ...

  # WORKFLOW EXECUTION QUERIES
  getWorkflowExecution(id: ID!): WorkflowExecution
    @aws_iam
    @aws_cognito_user_pools(
      cognito_groups: ["SystemAdmins", "TenantAdmins", "Users"]
    )

  listWorkflowExecutions(
    workflowId: ID
    status: WorkflowExecutionStatus
    limit: Int
    nextToken: String
  ): WorkflowExecutionConnection!
    @aws_iam
    @aws_cognito_user_pools(
      cognito_groups: ["SystemAdmins", "TenantAdmins", "Users"]
    )

  # WORKFLOW NODE EXECUTION QUERIES
  getWorkflowNodeExecution(id: ID!): WorkflowNodeExecution
    @aws_iam
    @aws_cognito_user_pools(
      cognito_groups: ["SystemAdmins", "TenantAdmins", "Users"]
    )

  listWorkflowNodeExecutions(
    workflowExecutionId: ID!
    status: WorkflowNodeExecutionStatus
    limit: Int
    nextToken: String
  ): WorkflowNodeExecutionConnection!
    @aws_iam
    @aws_cognito_user_pools(
      cognito_groups: ["SystemAdmins", "TenantAdmins", "Users"]
    )
}
```

---

## 8. Subscriptions

```graphql
type Subscription {
  # ... existing subscriptions ...

  """
  WORKFLOW EXECUTION SUBSCRIPTIONS
  """
  # Subscribe to new workflow executions for a specific workflow
  onCreateWorkflowExecution(workflowId: ID!): WorkflowExecution
    @aws_subscribe(mutations: ["createWorkflowExecution"])

  # Subscribe to updates for a specific workflow execution
  onUpdateWorkflowExecution(id: ID!): WorkflowExecution
    @aws_subscribe(mutations: ["updateWorkflowExecution", "cancelWorkflowExecution"])

  # Subscribe to all workflow executions for a project (via workflowId filter)
  onWorkflowExecutionStatusChange(
    workflowId: ID
    status: WorkflowExecutionStatus
  ): WorkflowExecution
    @aws_subscribe(mutations: ["createWorkflowExecution", "updateWorkflowExecution", "cancelWorkflowExecution"])

  """
  WORKFLOW NODE EXECUTION SUBSCRIPTIONS
  """
  # Subscribe to new node executions for a specific workflow execution
  onCreateWorkflowNodeExecution(workflowExecutionId: ID!): WorkflowNodeExecution
    @aws_subscribe(mutations: ["createWorkflowNodeExecution"])

  # Subscribe to updates for a specific node execution
  onUpdateWorkflowNodeExecution(id: ID!): WorkflowNodeExecution
    @aws_subscribe(mutations: ["updateWorkflowNodeExecution"])

  # Subscribe to all node execution updates for a workflow execution
  onWorkflowNodeExecutionStatusChange(workflowExecutionId: ID!): WorkflowNodeExecution
    @aws_subscribe(mutations: ["createWorkflowNodeExecution", "updateWorkflowNodeExecution"])
}
```

---

## 9. Implementation Flow

### Step 1: Workflow Launcher Creates Execution
When a workflow is triggered (in `workflow-launcher/index.ts`):
```typescript
// After sending EventBridge event to start workflow
await invokeAppsync({
  query: M_CREATE_WORKFLOW_EXECUTION,
  variables: {
    input: {
      workflowId: workflow.id,
      triggerEvent: { source: eventSource, detailType: eventDetailType, data },
      stepFunctionExecutionArn: stepFunctionExecutionArn, // if available
    }
  }
});
```

### Step 2: Step Functions/Lambda Updates Node Executions
As each node executes (in Step Functions state machine or Lambda handlers):
```typescript
// When node starts
await invokeAppsync({
  query: M_CREATE_WORKFLOW_NODE_EXECUTION,
  variables: {
    input: {
      workflowExecutionId: executionId,
      nodeId: nodeId,
      nodeName: nodeName,
      nodeType: nodeType,
      status: "PENDING",
      stepFunctionTaskToken: taskToken, // if using Step Functions callbacks
    }
  }
});

// When node completes
await invokeAppsync({
  query: M_UPDATE_WORKFLOW_NODE_EXECUTION,
  variables: {
    id: nodeExecutionId,
    input: {
      status: "COMPLETED",
      outputData: result,
      completedAt: new Date().toISOString(),
    }
  }
});

// When node fails
await invokeAppsync({
  query: M_UPDATE_WORKFLOW_NODE_EXECUTION,
  variables: {
    id: nodeExecutionId,
    input: {
      status: "FAILED",
      errorMessage: error.message,
      errorDetails: { stack: error.stack, ... },
      completedAt: new Date().toISOString(),
    }
  }
});
```

### Step 3: Browser Subscribes
```graphql
subscription OnWorkflowExecution($workflowId: ID!) {
  onUpdateWorkflowExecution(id: $workflowId) {
    id
    status
    startedAt
    completedAt
    errorMessage
    nodeExecutions {
      items {
        id
        nodeName
        status
        outputData
        errorMessage
      }
    }
  }
}

subscription OnNodeExecution($workflowExecutionId: ID!) {
  onWorkflowNodeExecutionStatusChange(workflowExecutionId: $workflowExecutionId) {
    id
    nodeName
    status
    outputData
    errorMessage
    completedAt
  }
}
```

---

## 10. Considerations

### Filtering & Authorization
- Subscriptions should respect tenant/owner boundaries
- Consider adding filters to subscriptions (e.g., `onWorkflowExecutionStatusChange(workflowId: ID, status: WorkflowExecutionStatus)`)
- AppSync automatically filters based on subscription arguments

### Performance
- Node executions can be numerous for complex workflows
- Consider pagination for `nodeExecutions` connection
- May want to batch node execution updates for high-frequency workflows

### Data Retention
- Consider TTL fields for old executions
- May want to archive completed executions after a period

### Error Handling
- Ensure mutations are idempotent (retry-safe)
- Handle partial failures gracefully
- Consider dead-letter queues for failed subscription publishes

---

## 11. Alternative: Simplified Approach

If you want to start simpler, you could:

1. **Just track WorkflowExecution** (skip node-level tracking initially)
   - Add `currentStep: String` and `completedSteps: [String!]` fields
   - Update these as workflow progresses

2. **Use a single subscription** for all workflow updates
   ```graphql
   onWorkflowExecutionUpdate(id: ID!): WorkflowExecution
     @aws_subscribe(mutations: ["createWorkflowExecution", "updateWorkflowExecution"])
   ```

3. **Add later** node-level tracking when needed

---

## Next Steps

1. Review and refine this proposal
2. Add these types to `schema.graphql`
3. Generate TypeScript types (via codegen)
4. Implement resolvers in AppSync
5. Update `workflow-launcher` to create executions
6. Update Step Functions/Lambda handlers to update node executions
7. Update frontend to subscribe to execution updates
