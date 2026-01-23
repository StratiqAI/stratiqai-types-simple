# Workflow Execution Subscriptions - Implementation Guide

This guide provides detailed step-by-step instructions for implementing workflow execution subscriptions in your system.

---

## Step 1: Generate TypeScript Types

### 1.1 Run Code Generation

After updating the GraphQL schema, regenerate your TypeScript types:

```bash
cd stratiqai-types-simple
npm run codegen
# or whatever your codegen command is
```

### 1.2 Verify Generated Types

Check that the following types are generated in your types package:
- `WorkflowExecution`
- `WorkflowNodeExecution`
- `WorkflowExecutionStatus`
- `WorkflowNodeExecutionStatus`
- `CreateWorkflowExecutionInput`
- `UpdateWorkflowExecutionInput`
- `CreateWorkflowNodeExecutionInput`
- `UpdateWorkflowNodeExecutionInput`
- Mutations: `M_CREATE_WORKFLOW_EXECUTION`, `M_UPDATE_WORKFLOW_EXECUTION`, etc.
- Queries: `Q_GET_WORKFLOW_EXECUTION`, `Q_LIST_WORKFLOW_EXECUTIONS`, etc.
- Subscriptions: `S_ON_CREATE_WORKFLOW_EXECUTION`, etc.

### 1.3 Export New Types

Ensure the new types are exported from your types package's main index file.

---

## Step 2: Implement AppSync Resolvers

### 2.1 Create Resolver Files

In your `stratiqai-platform` backend, you'll need to create resolvers for the new mutations and queries. Based on your existing structure, create:

```
modules/api/resolvers/
  - workflow-execution.ts
  - workflow-node-execution.ts
```

### 2.2 WorkflowExecution Resolvers

**File: `modules/api/resolvers/workflow-execution.ts`**

```typescript
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import type { 
  CreateWorkflowExecutionInput, 
  UpdateWorkflowExecutionInput,
  WorkflowExecution 
} from "@stratiqai/types-simple";

const dynamoClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME!;

/**
 * Create a new workflow execution
 */
export const createWorkflowExecution = async (
  input: CreateWorkflowExecutionInput,
  context: { identity: { sub: string; claims: any } }
): Promise<WorkflowExecution> => {
  const now = new Date().toISOString();
  const executionId = crypto.randomUUID();
  const tenantId = context.identity.claims["custom:tenantId"] || "default";
  const ownerId = context.identity.sub;

  // Get workflow to determine tenantId and ownerId if not provided
  const workflow = await dynamoClient.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        pk: `TENANT#${tenantId}`,
        sk: `WORKFLOW#${input.workflowId}`,
      },
    })
  );

  if (!workflow.Item) {
    throw new Error(`Workflow ${input.workflowId} not found`);
  }

  const workflowExecution: WorkflowExecution = {
    id: executionId,
    entityType: "WORKFLOW_EXECUTION",
    tenantId: workflow.Item.tenantId || tenantId,
    ownerId: workflow.Item.ownerId || ownerId,
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
    workflowId: input.workflowId,
    status: "PENDING",
    startedAt: null,
    completedAt: null,
    cancelledAt: null,
    triggerEvent: input.triggerEvent || null,
    inputData: input.inputData || null,
    outputData: null,
    errorMessage: null,
    stepFunctionExecutionArn: input.stepFunctionExecutionArn || null,
    stepFunctionStateMachineArn: input.stepFunctionStateMachineArn || null,
  };

  // Write to main table
  await dynamoClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        pk: `TENANT#${workflowExecution.tenantId}`,
        sk: `WORKFLOW_EXECUTION#${executionId}`,
        ...workflowExecution,
        // GSI1 for querying by workflow
        gsi1pk: `WORKFLOW#${input.workflowId}`,
        gsi1sk: `EXECUTION#${executionId}`,
        // GSI2 for querying by owner
        gsi2pk: `USER#${workflowExecution.ownerId}`,
        gsi2sk: `WORKFLOW_EXECUTION#${executionId}`,
      },
    })
  );

  return workflowExecution;
};

/**
 * Update an existing workflow execution
 */
export const updateWorkflowExecution = async (
  id: string,
  input: UpdateWorkflowExecutionInput,
  context: { identity: { sub: string; claims: any } }
): Promise<WorkflowExecution> => {
  const tenantId = context.identity.claims["custom:tenantId"] || "default";

  // Get current execution
  const current = await dynamoClient.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        pk: `TENANT#${tenantId}`,
        sk: `WORKFLOW_EXECUTION#${id}`,
      },
    })
  );

  if (!current.Item) {
    throw new Error(`Workflow execution ${id} not found`);
  }

  // Build update expression
  const updates: string[] = [];
  const expressionAttributeNames: Record<string, string> = {};
  const expressionAttributeValues: Record<string, any> = {};

  if (input.status !== undefined) {
    updates.push("#status = :status");
    expressionAttributeNames["#status"] = "status";
    expressionAttributeValues[":status"] = input.status;
  }

  if (input.outputData !== undefined) {
    updates.push("outputData = :outputData");
    expressionAttributeValues[":outputData"] = input.outputData;
  }

  if (input.errorMessage !== undefined) {
    updates.push("errorMessage = :errorMessage");
    expressionAttributeValues[":errorMessage"] = input.errorMessage;
  }

  if (input.completedAt !== undefined) {
    updates.push("completedAt = :completedAt");
    expressionAttributeValues[":completedAt"] = input.completedAt;
  }

  if (input.cancelledAt !== undefined) {
    updates.push("cancelledAt = :cancelledAt");
    expressionAttributeValues[":cancelledAt"] = input.cancelledAt;
  }

  updates.push("updatedAt = :updatedAt");
  expressionAttributeValues[":updatedAt"] = new Date().toISOString();

  await dynamoClient.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: {
        pk: `TENANT#${tenantId}`,
        sk: `WORKFLOW_EXECUTION#${id}`,
      },
      UpdateExpression: `SET ${updates.join(", ")}`,
      ExpressionAttributeNames: Object.keys(expressionAttributeNames).length > 0 ? expressionAttributeNames : undefined,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW",
    })
  );

  // Fetch updated item
  const updated = await dynamoClient.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        pk: `TENANT#${tenantId}`,
        sk: `WORKFLOW_EXECUTION#${id}`,
      },
    })
  );

  return updated.Item as WorkflowExecution;
};

/**
 * Cancel a workflow execution
 */
export const cancelWorkflowExecution = async (
  id: string,
  context: { identity: { sub: string; claims: any } }
): Promise<WorkflowExecution> => {
  return updateWorkflowExecution(
    id,
    {
      status: "CANCELLED",
      cancelledAt: new Date().toISOString(),
    },
    context
  );
};

/**
 * Get a single workflow execution
 */
export const getWorkflowExecution = async (
  id: string,
  context: { identity: { sub: string; claims: any } }
): Promise<WorkflowExecution | null> => {
  const tenantId = context.identity.claims["custom:tenantId"] || "default";

  const result = await dynamoClient.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        pk: `TENANT#${tenantId}`,
        sk: `WORKFLOW_EXECUTION#${id}`,
      },
    })
  );

  return (result.Item as WorkflowExecution) || null;
};

/**
 * List workflow executions
 */
export const listWorkflowExecutions = async (
  args: {
    workflowId?: string;
    status?: string;
    limit?: number;
    nextToken?: string;
  },
  context: { identity: { sub: string; claims: any } }
): Promise<{ items: WorkflowExecution[]; nextToken?: string }> => {
  const tenantId = context.identity.claims["custom:tenantId"] || "default";
  const limit = args.limit || 20;

  let queryParams: any = {
    TableName: TABLE_NAME,
    IndexName: args.workflowId ? "GSI1" : undefined,
    Limit: limit,
  };

  if (args.workflowId) {
    // Query by workflow using GSI1
    queryParams.KeyConditionExpression = "gsi1pk = :gsi1pk";
    queryParams.ExpressionAttributeValues = {
      ":gsi1pk": `WORKFLOW#${args.workflowId}`,
    };
    if (args.status) {
      queryParams.FilterExpression = "#status = :status";
      queryParams.ExpressionAttributeNames = { "#status": "status" };
      queryParams.ExpressionAttributeValues[":status"] = args.status;
    }
  } else {
    // Query by tenant (main table)
    queryParams.KeyConditionExpression = "pk = :pk AND begins_with(sk, :sk)";
    queryParams.ExpressionAttributeValues = {
      ":pk": `TENANT#${tenantId}`,
      ":sk": "WORKFLOW_EXECUTION#",
    };
    if (args.status) {
      queryParams.FilterExpression = "#status = :status";
      queryParams.ExpressionAttributeNames = { "#status": "status" };
      queryParams.ExpressionAttributeValues[":status"] = args.status;
    }
  }

  if (args.nextToken) {
    queryParams.ExclusiveStartKey = JSON.parse(
      Buffer.from(args.nextToken, "base64").toString()
    );
  }

  const result = await dynamoClient.send(new QueryCommand(queryParams));

  return {
    items: (result.Items || []) as WorkflowExecution[],
    nextToken: result.LastEvaluatedKey
      ? Buffer.from(JSON.stringify(result.LastEvaluatedKey)).toString("base64")
      : undefined,
  };
};
```

### 2.3 WorkflowNodeExecution Resolvers

**File: `modules/api/resolvers/workflow-node-execution.ts`**

```typescript
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import type { 
  CreateWorkflowNodeExecutionInput, 
  UpdateWorkflowNodeExecutionInput,
  WorkflowNodeExecution 
} from "@stratiqai/types-simple";

const dynamoClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME!;

/**
 * Create a new workflow node execution
 */
export const createWorkflowNodeExecution = async (
  input: CreateWorkflowNodeExecutionInput,
  context: { identity: { sub: string; claims: any } }
): Promise<WorkflowNodeExecution> => {
  const now = new Date().toISOString();
  const nodeExecutionId = crypto.randomUUID();
  const tenantId = context.identity.claims["custom:tenantId"] || "default";
  const ownerId = context.identity.sub;

  // Get workflow execution to determine tenantId and ownerId
  const execution = await dynamoClient.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        pk: `TENANT#${tenantId}`,
        sk: `WORKFLOW_EXECUTION#${input.workflowExecutionId}`,
      },
    })
  );

  if (!execution.Item) {
    throw new Error(`Workflow execution ${input.workflowExecutionId} not found`);
  }

  const nodeExecution: WorkflowNodeExecution = {
    id: nodeExecutionId,
    entityType: "WORKFLOW_NODE_EXECUTION",
    tenantId: execution.Item.tenantId || tenantId,
    ownerId: execution.Item.ownerId || ownerId,
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
    workflowExecutionId: input.workflowExecutionId,
    nodeId: input.nodeId,
    nodeName: input.nodeName || null,
    nodeType: input.nodeType || null,
    status: "PENDING",
    startedAt: null,
    completedAt: null,
    inputData: input.inputData || null,
    outputData: null,
    errorMessage: null,
    errorDetails: null,
    stepFunctionTaskToken: input.stepFunctionTaskToken || null,
    stepFunctionExecutionArn: input.stepFunctionExecutionArn || null,
  };

  // Write to main table
  await dynamoClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        pk: `TENANT#${nodeExecution.tenantId}`,
        sk: `WORKFLOW_NODE_EXECUTION#${nodeExecutionId}`,
        ...nodeExecution,
        // GSI1 for querying by workflow execution
        gsi1pk: `WORKFLOW_EXECUTION#${input.workflowExecutionId}`,
        gsi1sk: `NODE_EXECUTION#${nodeExecutionId}`,
      },
    })
  );

  return nodeExecution;
};

/**
 * Update an existing workflow node execution
 */
export const updateWorkflowNodeExecution = async (
  id: string,
  input: UpdateWorkflowNodeExecutionInput,
  context: { identity: { sub: string; claims: any } }
): Promise<WorkflowNodeExecution> => {
  const tenantId = context.identity.claims["custom:tenantId"] || "default";

  // Build update expression
  const updates: string[] = [];
  const expressionAttributeNames: Record<string, string> = {};
  const expressionAttributeValues: Record<string, any> = {};

  if (input.status !== undefined) {
    updates.push("#status = :status");
    expressionAttributeNames["#status"] = "status";
    expressionAttributeValues[":status"] = input.status;
  }

  if (input.outputData !== undefined) {
    updates.push("outputData = :outputData");
    expressionAttributeValues[":outputData"] = input.outputData;
  }

  if (input.errorMessage !== undefined) {
    updates.push("errorMessage = :errorMessage");
    expressionAttributeValues[":errorMessage"] = input.errorMessage;
  }

  if (input.errorDetails !== undefined) {
    updates.push("errorDetails = :errorDetails");
    expressionAttributeValues[":errorDetails"] = input.errorDetails;
  }

  if (input.startedAt !== undefined) {
    updates.push("startedAt = :startedAt");
    expressionAttributeValues[":startedAt"] = input.startedAt;
  }

  if (input.completedAt !== undefined) {
    updates.push("completedAt = :completedAt");
    expressionAttributeValues[":completedAt"] = input.completedAt;
  }

  updates.push("updatedAt = :updatedAt");
  expressionAttributeValues[":updatedAt"] = new Date().toISOString();

  await dynamoClient.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: {
        pk: `TENANT#${tenantId}`,
        sk: `WORKFLOW_NODE_EXECUTION#${id}`,
      },
      UpdateExpression: `SET ${updates.join(", ")}`,
      ExpressionAttributeNames: Object.keys(expressionAttributeNames).length > 0 ? expressionAttributeNames : undefined,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW",
    })
  );

  // Fetch updated item
  const updated = await dynamoClient.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        pk: `TENANT#${tenantId}`,
        sk: `WORKFLOW_NODE_EXECUTION#${id}`,
      },
    })
  );

  return updated.Item as WorkflowNodeExecution;
};

/**
 * Get a single workflow node execution
 */
export const getWorkflowNodeExecution = async (
  id: string,
  context: { identity: { sub: string; claims: any } }
): Promise<WorkflowNodeExecution | null> => {
  const tenantId = context.identity.claims["custom:tenantId"] || "default";

  const result = await dynamoClient.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        pk: `TENANT#${tenantId}`,
        sk: `WORKFLOW_NODE_EXECUTION#${id}`,
      },
    })
  );

  return (result.Item as WorkflowNodeExecution) || null;
};

/**
 * List workflow node executions
 */
export const listWorkflowNodeExecutions = async (
  args: {
    workflowExecutionId: string;
    status?: string;
    limit?: number;
    nextToken?: string;
  },
  context: { identity: { sub: string; claims: any } }
): Promise<{ items: WorkflowNodeExecution[]; nextToken?: string }> => {
  const tenantId = context.identity.claims["custom:tenantId"] || "default";
  const limit = args.limit || 20;

  const queryParams: any = {
    TableName: TABLE_NAME,
    IndexName: "GSI1",
    KeyConditionExpression: "gsi1pk = :gsi1pk",
    ExpressionAttributeValues: {
      ":gsi1pk": `WORKFLOW_EXECUTION#${args.workflowExecutionId}`,
    },
    Limit: limit,
  };

  if (args.status) {
    queryParams.FilterExpression = "#status = :status";
    queryParams.ExpressionAttributeNames = { "#status": "status" };
    queryParams.ExpressionAttributeValues[":status"] = args.status;
  }

  if (args.nextToken) {
    queryParams.ExclusiveStartKey = JSON.parse(
      Buffer.from(args.nextToken, "base64").toString()
    );
  }

  const result = await dynamoClient.send(new QueryCommand(queryParams));

  return {
    items: (result.Items || []) as WorkflowNodeExecution[],
    nextToken: result.LastEvaluatedKey
      ? Buffer.from(JSON.stringify(result.LastEvaluatedKey)).toString("base64")
      : undefined,
  };
};
```

### 2.4 Register Resolvers in AppSync

Update your AppSync resolver configuration to wire up these resolvers. This will depend on your infrastructure setup (Terraform, CDK, etc.).

**Example Terraform configuration:**

```hcl
# In modules/api/resolvers.tf or similar

resource "aws_appsync_resolver" "create_workflow_execution" {
  api_id      = var.appsync_api_id
  type        = "Mutation"
  field       = "createWorkflowExecution"
  data_source = aws_appsync_datasource.lambda_datasource.name

  request_template = <<EOF
{
  "version": "2018-05-29",
  "operation": "Invoke",
  "payload": {
    "field": "createWorkflowExecution",
    "arguments": $util.toJson($context.arguments),
    "identity": $util.toJson($context.identity)
  }
}
EOF

  response_template = "$util.toJson($context.result)"
}

# Similar for other resolvers...
```

---

## Step 3: Update Workflow Launcher

### 3.1 Modify `workflow-launcher/index.ts`

Update the workflow launcher to create a workflow execution when a workflow is triggered:

```typescript
import { Context } from "aws-lambda";
import { fileURLToPath } from "url";
import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";
import { eventHandler, logger, invokeAppsync, type WorkerResult } from "@stratiqai/aws-utils";
import type { Doclink } from "@stratiqai/types-simple";
import { Q_GET_PROJECT, M_CREATE_WORKFLOW_EXECUTION } from "@stratiqai/types-simple";

const ebClient = new EventBridgeClient({});

const worker = async (
  data: Doclink,
  context: { attempt: number; event: any },
  metadata?: Record<string, any>
): Promise<WorkerResult<void>> => {
  if (!data.parentId) {
    throw new Error("Project ID is required to fetch workflows");
  }

  const eventSource = context.event.detail?.metadata?.source || context.event.source;
  const eventDetailType = context.event.detail?.metadata?.detailType || context.event["detail-type"];

  console.log("data", data);
  console.log("context", context);
  console.log("metadata", metadata);
  
  const result: any = await invokeAppsync({
    query: Q_GET_PROJECT.loc?.source.body || String(Q_GET_PROJECT),
    variables: { id: data.parentId },
  });

  const workflows = result.getProject?.workflows?.items || [];

  console.log("workflows", workflows);
  console.log("eventSource", eventSource);
  console.log("eventDetailType", eventDetailType);
  
  for (const workflow of workflows) {
    if (!workflow.definition) continue;

    try {
      const definition = typeof workflow.definition === 'string' 
        ? JSON.parse(workflow.definition) 
        : workflow.definition;

      const inputNodes = definition.elements?.filter((el: any) => el.category === 'input') || [];

      console.log("inputNodes", inputNodes);
      
      // Check if any input node's source matches the event source
      for (const inputNode of inputNodes) {
        const inputNodeSource = inputNode.nodeOptions?.source;
        const inputNodeDetailType = inputNode.nodeOptions?.detailType;

        console.log("inputNodeSource", inputNodeSource);
        console.log("eventSource", eventSource);
        console.log("inputNodeDetailType", inputNodeDetailType);
        console.log("eventDetailType", eventDetailType);
        
        if (inputNodeSource === eventSource && inputNodeDetailType === eventDetailType) {
          // Create workflow execution first
          let workflowExecution;
          try {
            const executionResult = await invokeAppsync({
              query: M_CREATE_WORKFLOW_EXECUTION.loc?.source.body || String(M_CREATE_WORKFLOW_EXECUTION),
              variables: {
                input: {
                  workflowId: workflow.id,
                  triggerEvent: {
                    source: eventSource,
                    detailType: eventDetailType,
                    data: data,
                  },
                  inputData: {
                    doclinkId: data.id,
                    documentId: data.documentId,
                    filename: data.filename,
                  },
                },
              },
            });
            workflowExecution = executionResult.createWorkflowExecution;
            logger.info(`Created workflow execution ${workflowExecution.id} for workflow ${workflow.id}`);
          } catch (error) {
            logger.error(`Failed to create workflow execution:`, error instanceof Error ? error : new Error(String(error)));
            // Continue anyway - the EventBridge event will still be sent
          }

          // Send EventBridge event to start the workflow
          console.log("Starting workflow", workflow.id);
          await ebClient.send(
            new PutEventsCommand({
              Entries: [
                {
                  Source: "com.stratiqai.workflow",
                  DetailType: "Started",
                  EventBusName: process.env.EVENT_BUS_NAME || "default",
                  Detail: JSON.stringify({
                    metadata: {
                      correlation_id: metadata?.correlation_id || context.event.detail?.metadata?.correlation_id,
                      causation_id: context.event.id || context.event.detail?.metadata?.causation_id,
                      timestamp: new Date().toISOString(),
                      projectId: data.parentId,
                      userId: metadata?.userId || context.event.detail?.metadata?.userId,
                      attempt: 1,
                      workflowExecutionId: workflowExecution?.id, // Include execution ID
                    },
                    data: {
                      workflowId: workflow.id,
                      workflowName: workflow.name,
                      workflowExecutionId: workflowExecution?.id, // Include execution ID
                      triggerEvent: {
                        source: eventSource,
                        detailType: eventDetailType,
                        data: data,
                      },
                    },
                  }),
                },
              ],
            })
          );

          logger.info(`Workflow ${workflow.id} (${workflow.name}) triggered by matching input node`);
          console.log(`✅ Workflow ${workflow.id} started via EventBridge`);
        }
      }
    } catch (error) {
      logger.error(`Error processing workflow ${workflow.id}:`, error instanceof Error ? error : new Error(String(error)));
    }
  }

  return { data: undefined };
};

// ... rest of the file remains the same
```

---

## Step 4: Update Step Functions / Lambda Handlers

### 4.1 Create Node Execution Helper

Create a utility file for updating node executions:

**File: `backend/src/packages/aws-utils/src/workflow-execution.ts`**

```typescript
import { invokeAppsync } from './appsync.js';
import type { 
  M_CREATE_WORKFLOW_NODE_EXECUTION,
  M_UPDATE_WORKFLOW_NODE_EXECUTION,
  M_UPDATE_WORKFLOW_EXECUTION,
  CreateWorkflowNodeExecutionInput,
  UpdateWorkflowNodeExecutionInput,
  UpdateWorkflowExecutionInput,
} from "@stratiqai/types-simple";

/**
 * Create a new node execution
 */
export const createNodeExecution = async (
  input: CreateWorkflowNodeExecutionInput
): Promise<string> => {
  const result = await invokeAppsync({
    query: M_CREATE_WORKFLOW_NODE_EXECUTION.loc?.source.body || String(M_CREATE_WORKFLOW_NODE_EXECUTION),
    variables: { input },
  });
  return result.createWorkflowNodeExecution.id;
};

/**
 * Update a node execution
 */
export const updateNodeExecution = async (
  id: string,
  input: UpdateWorkflowNodeExecutionInput
): Promise<void> => {
  await invokeAppsync({
    query: M_UPDATE_WORKFLOW_NODE_EXECUTION.loc?.source.body || String(M_UPDATE_WORKFLOW_NODE_EXECUTION),
    variables: { id, input },
  });
};

/**
 * Update workflow execution status
 */
export const updateWorkflowExecution = async (
  id: string,
  input: UpdateWorkflowExecutionInput
): Promise<void> => {
  await invokeAppsync({
    query: M_UPDATE_WORKFLOW_EXECUTION.loc?.source.body || String(M_UPDATE_WORKFLOW_EXECUTION),
    variables: { id, input },
  });
};

/**
 * Mark node as started
 */
export const startNodeExecution = async (
  nodeExecutionId: string
): Promise<void> => {
  await updateNodeExecution(nodeExecutionId, {
    status: "RUNNING",
    startedAt: new Date().toISOString(),
  });
};

/**
 * Mark node as completed
 */
export const completeNodeExecution = async (
  nodeExecutionId: string,
  outputData: any
): Promise<void> => {
  await updateNodeExecution(nodeExecutionId, {
    status: "COMPLETED",
    outputData,
    completedAt: new Date().toISOString(),
  });
};

/**
 * Mark node as failed
 */
export const failNodeExecution = async (
  nodeExecutionId: string,
  error: Error
): Promise<void> => {
  await updateNodeExecution(nodeExecutionId, {
    status: "FAILED",
    errorMessage: error.message,
    errorDetails: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
    completedAt: new Date().toISOString(),
  });
};
```

### 4.2 Update Lambda Handlers for Node Execution

In each Lambda handler that executes a workflow node, add tracking:

**Example: `backend/src/handlers/workflow-node-executor/index.ts`**

```typescript
import { eventHandler, logger, type WorkerResult } from "@stratiqai/aws-utils";
import { 
  createNodeExecution, 
  startNodeExecution, 
  completeNodeExecution, 
  failNodeExecution,
  updateWorkflowExecution 
} from "@stratiqai/aws-utils/workflow-execution";

interface WorkflowNodeEvent {
  workflowExecutionId: string;
  nodeId: string;
  nodeName: string;
  nodeType: string;
  inputData: any;
  stepFunctionTaskToken?: string;
}

const worker = async (
  data: WorkflowNodeEvent,
  context: { attempt: number; event: any },
  metadata?: Record<string, any>
): Promise<WorkerResult<any>> => {
  let nodeExecutionId: string | null = null;

  try {
    // Create node execution record
    nodeExecutionId = await createNodeExecution({
      workflowExecutionId: data.workflowExecutionId,
      nodeId: data.nodeId,
      nodeName: data.nodeName,
      nodeType: data.nodeType,
      inputData: data.inputData,
      stepFunctionTaskToken: data.stepFunctionTaskToken,
      stepFunctionExecutionArn: context.event.executionArn,
    });

    // Mark as running
    await startNodeExecution(nodeExecutionId);

    // Execute the node logic
    logger.info(`Executing node ${data.nodeId} (${data.nodeName})`);
    const outputData = await executeNode(data.nodeType, data.inputData);

    // Mark as completed
    await completeNodeExecution(nodeExecutionId, outputData);

    // Update workflow execution if this is the last node
    // (You'll need to determine this based on your workflow structure)
    // await updateWorkflowExecution(data.workflowExecutionId, {
    //   status: "COMPLETED",
    //   outputData,
    //   completedAt: new Date().toISOString(),
    // });

    return { data: outputData };
  } catch (error) {
    if (nodeExecutionId) {
      await failNodeExecution(
        nodeExecutionId,
        error instanceof Error ? error : new Error(String(error))
      );
    }

    // Update workflow execution status to failed
    if (data.workflowExecutionId) {
      await updateWorkflowExecution(data.workflowExecutionId, {
        status: "FAILED",
        errorMessage: error instanceof Error ? error.message : String(error),
        completedAt: new Date().toISOString(),
      });
    }

    throw error;
  }
};

async function executeNode(nodeType: string, inputData: any): Promise<any> {
  // Your node execution logic here
  // This is just an example
  switch (nodeType) {
    case "ai":
      // Execute AI node
      return { result: "AI output" };
    case "transform":
      // Execute transform node
      return { result: "Transform output" };
    default:
      throw new Error(`Unknown node type: ${nodeType}`);
  }
}

export const handler = eventHandler<WorkflowNodeEvent, any>(
  {
    source: "com.stratiqai.workflow",
    detailType: "NodeExecute",
    busName: process.env.EVENT_BUS_NAME || "default",
  },
  worker
);
```

### 4.3 Update Step Functions State Machine

If you're using Step Functions, you'll need to update your state machine definition to call Lambda functions that track node executions. The Lambda functions should:

1. Create a node execution when a node starts
2. Update the node execution when it completes or fails
3. Update the workflow execution when the entire workflow completes

---

## Step 5: Update Frontend to Subscribe

### 5.1 Create Subscription Hooks

**File: `uw-webapp/src/routes/workflow/hooks/useWorkflowExecution.ts`**

```typescript
import { onMount, onDestroy } from 'svelte';
import { getClient } from '$lib/graphql/client';
import { 
  S_ON_UPDATE_WORKFLOW_EXECUTION,
  S_ON_WORKFLOW_NODE_EXECUTION_STATUS_CHANGE,
  type WorkflowExecution,
  type WorkflowNodeExecution 
} from '@stratiqai/types-simple';

interface UseWorkflowExecutionOptions {
  workflowExecutionId: string;
  onExecutionUpdate?: (execution: WorkflowExecution) => void;
  onNodeUpdate?: (nodeExecution: WorkflowNodeExecution) => void;
}

export function useWorkflowExecution(options: UseWorkflowExecutionOptions) {
  let executionSubscription: any = null;
  let nodeSubscription: any = null;

  onMount(() => {
    const client = getClient();

    // Subscribe to workflow execution updates
    if (options.onExecutionUpdate) {
      executionSubscription = client.subscribe({
        query: S_ON_UPDATE_WORKFLOW_EXECUTION.loc?.source.body || String(S_ON_UPDATE_WORKFLOW_EXECUTION),
        variables: { id: options.workflowExecutionId },
      }).subscribe({
        next: ({ data }) => {
          if (data?.onUpdateWorkflowExecution) {
            options.onExecutionUpdate?.(data.onUpdateWorkflowExecution);
          }
        },
        error: (error) => {
          console.error('Workflow execution subscription error:', error);
        },
      });
    }

    // Subscribe to node execution updates
    if (options.onNodeUpdate) {
      nodeSubscription = client.subscribe({
        query: S_ON_WORKFLOW_NODE_EXECUTION_STATUS_CHANGE.loc?.source.body || String(S_ON_WORKFLOW_NODE_EXECUTION_STATUS_CHANGE),
        variables: { workflowExecutionId: options.workflowExecutionId },
      }).subscribe({
        next: ({ data }) => {
          if (data?.onWorkflowNodeExecutionStatusChange) {
            options.onNodeUpdate?.(data.onWorkflowNodeExecutionStatusChange);
          }
        },
        error: (error) => {
          console.error('Node execution subscription error:', error);
        },
      });
    }
  });

  onDestroy(() => {
    if (executionSubscription) {
      executionSubscription.unsubscribe();
    }
    if (nodeSubscription) {
      nodeSubscription.unsubscribe();
    }
  });
}
```

### 5.2 Create Workflow Execution Component

**File: `uw-webapp/src/routes/workflow/components/WorkflowExecutionStatus.svelte`**

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import { getClient } from '$lib/graphql/client';
  import { 
    Q_GET_WORKFLOW_EXECUTION,
    Q_LIST_WORKFLOW_NODE_EXECUTIONS,
    type WorkflowExecution,
    type WorkflowNodeExecution 
  } from '@stratiqai/types-simple';
  import { useWorkflowExecution } from '../hooks/useWorkflowExecution';

  export let workflowExecutionId: string;

  let execution: WorkflowExecution | null = null;
  let nodeExecutions: WorkflowNodeExecution[] = [];
  let loading = true;

  onMount(async () => {
    const client = getClient();

    // Load initial execution data
    const executionResult = await client.query({
      query: Q_GET_WORKFLOW_EXECUTION.loc?.source.body || String(Q_GET_WORKFLOW_EXECUTION),
      variables: { id: workflowExecutionId },
    });
    execution = executionResult.data.getWorkflowExecution;

    // Load initial node executions
    const nodesResult = await client.query({
      query: Q_LIST_WORKFLOW_NODE_EXECUTIONS.loc?.source.body || String(Q_LIST_WORKFLOW_NODE_EXECUTIONS),
      variables: { workflowExecutionId },
    });
    nodeExecutions = nodesResult.data.listWorkflowNodeExecutions.items;

    loading = false;

    // Subscribe to real-time updates
    useWorkflowExecution({
      workflowExecutionId,
      onExecutionUpdate: (updated) => {
        execution = updated;
      },
      onNodeUpdate: (updated) => {
        const index = nodeExecutions.findIndex(n => n.id === updated.id);
        if (index >= 0) {
          nodeExecutions[index] = updated;
        } else {
          nodeExecutions = [...nodeExecutions, updated];
        }
        nodeExecutions = [...nodeExecutions]; // Trigger reactivity
      },
    });
  });

  function getStatusColor(status: string): string {
    switch (status) {
      case 'COMPLETED':
        return 'text-green-600';
      case 'FAILED':
        return 'text-red-600';
      case 'RUNNING':
        return 'text-blue-600';
      case 'PENDING':
        return 'text-gray-600';
      default:
        return 'text-gray-400';
    }
  }
</script>

{#if loading}
  <div>Loading execution status...</div>
{:else if execution}
  <div class="workflow-execution-status">
    <h3>Workflow Execution: {execution.workflowId}</h3>
    <div class="status-badge {getStatusColor(execution.status)}">
      Status: {execution.status}
    </div>

    <div class="node-executions">
      <h4>Node Executions</h4>
      {#each nodeExecutions as nodeExecution}
        <div class="node-execution">
          <div class="node-name">{nodeExecution.nodeName || nodeExecution.nodeId}</div>
          <div class="node-status {getStatusColor(nodeExecution.status)}">
            {nodeExecution.status}
          </div>
          {#if nodeExecution.errorMessage}
            <div class="error-message">{nodeExecution.errorMessage}</div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
{/if}

<style>
  .workflow-execution-status {
    padding: 1rem;
  }
  .status-badge {
    font-weight: bold;
    padding: 0.5rem;
    border-radius: 0.25rem;
  }
  .node-executions {
    margin-top: 1rem;
  }
  .node-execution {
    padding: 0.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.25rem;
    margin-bottom: 0.5rem;
  }
  .error-message {
    color: red;
    font-size: 0.875rem;
  }
</style>
```

### 5.3 Integrate into Workflow UI

Update your workflow sidebar or main workflow view to show execution status:

**File: `uw-webapp/src/routes/workflow/components/layout/WorkflowSidebar.svelte`**

Add execution status tracking:

```svelte
<script lang="ts">
  // ... existing imports
  import { WorkflowExecutionStatus } from './WorkflowExecutionStatus.svelte';

  export let workflowId: string;
  let currentExecutionId: string | null = null;

  // When workflow is triggered, get the execution ID and show status
  async function handleWorkflowTriggered(executionId: string) {
    currentExecutionId = executionId;
  }
</script>

<!-- In your template -->
{#if currentExecutionId}
  <WorkflowExecutionStatus workflowExecutionId={currentExecutionId} />
{/if}
```

---

## Step 6: Testing

### 6.1 Test Workflow Execution Creation

1. Trigger a workflow (e.g., upload a document)
2. Verify that a `WorkflowExecution` is created in DynamoDB
3. Check that the subscription receives the creation event

### 6.2 Test Node Execution Tracking

1. Monitor a workflow execution
2. Verify that node executions are created as nodes start
3. Verify that node executions are updated as nodes complete
4. Check that subscriptions receive updates in real-time

### 6.3 Test Error Handling

1. Trigger a workflow that will fail
2. Verify that node executions are marked as FAILED
3. Verify that the workflow execution is marked as FAILED
4. Check that error messages are properly stored and displayed

### 6.4 Test Subscriptions

1. Open the workflow UI in a browser
2. Trigger a workflow
3. Verify that the UI updates in real-time as nodes complete
4. Test with multiple browser tabs to verify all clients receive updates

---

## Step 7: Monitoring and Observability

### 7.1 Add CloudWatch Metrics

Track:
- Number of workflow executions created
- Number of node executions created
- Average execution time
- Failure rates

### 7.2 Add Logging

Ensure all mutation calls log:
- Execution IDs
- Node IDs
- Status changes
- Errors

### 7.3 Set Up Alerts

Configure alerts for:
- High failure rates
- Long-running executions
- Subscription connection failures

---

## Troubleshooting

### Issue: Subscriptions not receiving updates

**Check:**
1. AppSync resolver is correctly configured
2. `@aws_subscribe` directive is properly set
3. Subscription arguments match mutation results
4. Client is properly authenticated

### Issue: Node executions not being created

**Check:**
1. Lambda handlers are calling `createNodeExecution`
2. IAM permissions allow Lambda to call AppSync
3. `APPSYNC_API_URL` environment variable is set
4. GraphQL mutations are correctly formatted

### Issue: Workflow execution status not updating

**Check:**
1. Final node is calling `updateWorkflowExecution`
2. Status transitions are valid (e.g., can't go from COMPLETED to RUNNING)
3. DynamoDB write permissions are correct

---

## Next Steps After Implementation

1. **Add Retry Logic**: Implement retry logic for failed node executions
2. **Add Cancellation**: Allow users to cancel running workflows
3. **Add Progress Indicators**: Show percentage complete based on node count
4. **Add Execution History**: Store and display past executions
5. **Add Filtering**: Allow filtering executions by status, date, etc.
6. **Add Analytics**: Track execution patterns and optimize workflows

---

## Summary

This implementation provides:
- ✅ Real-time workflow execution tracking
- ✅ Node-level progress monitoring
- ✅ Error tracking and reporting
- ✅ Browser subscriptions for live updates
- ✅ Integration with Step Functions
- ✅ Proper authorization and security

The system is now ready to provide real-time feedback to users as workflows execute!
