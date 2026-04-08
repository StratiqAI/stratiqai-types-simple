# Ontology CRUD Walkthrough — AppSync Console

A step-by-step guide to creating, querying, updating, and deleting ontology items.
Each step has **two code blocks**: paste the first into the **query editor** and the second into the **Query Variables** panel.

> **Before you start:** replace `test-project-1` with a real project ID if needed.
> All other IDs are self-contained — the walkthrough creates the data it needs.

> **Schema Fingerprinting:** `structuralHash` and `normalizedJsonSchema` are now
> computed **server-side** by a Lambda pipeline function. You do **not** supply
> `structuralHash` in the input — it is returned in the response.

> **JsonSchema Auto-Sync:** When you save an EntityDefinition, the pipeline
> automatically creates a matching `JsonSchema` record in the app table (if one
> doesn't already exist for that structural hash). The `jsonSchemaId` returned
> in the response is the ID of that linked JsonSchema. This lets Prompts and
> EntityDefinitions share the same underlying schema.
>
> **`jsonSchemaId` is not an input field.** `SaveEntityDefinitionInput` only
> accepts `projectId`, `id`, `name`, `description`, `jsonSchema`, and
> `properties`. Do **not** add `jsonSchemaId` (or `structuralHash`) to the JSON
> variables — AppSync will reject unknown fields, and the resolver overwrites
> the link from the computed hash anyway.

---

## Step 1 — Create the first Entity Definition (InsurancePolicy)

This creates a definition that describes insurance policies with two properties.
The server computes `structuralHash` (SHA-256 of the normalized schema) and
`normalizedJsonSchema` automatically.

**Query editor:**

```graphql
mutation SaveEntityDefinition($input: SaveEntityDefinitionInput!) {
  saveEntityDefinition(input: $input) {
    projectId
    id
    jsonSchemaId
    name
    description
    jsonSchema
    structuralHash
    normalizedJsonSchema
    properties {
      name
      description
      dataType
      path
      isList
    }
  }
}
```

**Variables:**

```json
{
  "input": {
    "projectId": "test-project-1",
    "id": "def-insurance-policy",
    "name": "InsurancePolicy",
    "description": "An insurance policy with a policy number and premium amount",
    "jsonSchema": "{\"type\":\"object\",\"properties\":{\"policyNumber\":{\"type\":\"string\"},\"premium\":{\"type\":\"number\"}}}",
    "properties": [
      {
        "name": "policyNumber",
        "description": "The unique policy identifier",
        "dataType": "STRING",
        "path": "$.policyNumber",
        "isList": false
      },
      {
        "name": "premium",
        "description": "Annual premium in dollars",
        "dataType": "NUMBER",
        "path": "$.premium",
        "isList": false
      }
    ]
  }
}
```

**Expected:** returns the full definition with both properties. `structuralHash` is a 64-char hex SHA-256 digest. `normalizedJsonSchema` is the canonicalized form of the schema. `jsonSchemaId` is the ID of the auto-synced JsonSchema in the app table (equal to the `structuralHash` value). **Copy the `structuralHash` value — you will use it in Step 3b.**

---

## Step 2 — Create a second Entity Definition (Policyholder)

A second definition to demonstrate multi-definition projects and list queries.

**Query editor:** *(same mutation as Step 1)*

```graphql
mutation SaveEntityDefinition($input: SaveEntityDefinitionInput!) {
  saveEntityDefinition(input: $input) {
    projectId
    id
    jsonSchemaId
    name
    description
    jsonSchema
    structuralHash
    normalizedJsonSchema
    properties {
      name
      description
      dataType
      path
      isList
    }
  }
}
```

**Variables:**

```json
{
  "input": {
    "projectId": "test-project-1",
    "id": "def-policyholder",
    "name": "Policyholder",
    "description": "A person or entity that holds one or more insurance policies",
    "jsonSchema": "{\"type\":\"object\",\"properties\":{\"fullName\":{\"type\":\"string\"},\"dateOfBirth\":{\"type\":\"string\",\"format\":\"date\"},\"isActive\":{\"type\":\"boolean\"}}}",
    "properties": [
      {
        "name": "fullName",
        "description": "Full legal name",
        "dataType": "STRING",
        "path": "$.fullName",
        "isList": false
      },
      {
        "name": "dateOfBirth",
        "description": "Date of birth",
        "dataType": "DATE",
        "path": "$.dateOfBirth",
        "isList": false
      },
      {
        "name": "isActive",
        "description": "Whether the policyholder account is active",
        "dataType": "BOOLEAN",
        "path": "$.isActive",
        "isList": false
      }
    ]
  }
}
```

---

## Step 3 — Get a single definition back

Verify the InsurancePolicy definition was stored correctly.

**Query editor:**

```graphql
query GetEntityDefinition($projectId: ID!, $id: ID!) {
  getEntityDefinition(projectId: $projectId, id: $id) {
    projectId
    id
    jsonSchemaId
    name
    description
    jsonSchema
    structuralHash
    normalizedJsonSchema
    properties {
      name
      dataType
      path
    }
  }
}
```

**Variables:**

```json
{
  "projectId": "test-project-1",
  "id": "def-insurance-policy"
}
```

---

## Step 3b — Look up a definition by structural hash (GSI2)

Use the `structuralHash` value from Step 1's response to look up the definition via GSI2. This is the primary use case for schema fingerprinting — deduplication and routing by schema shape.

**Query editor:**

```graphql
query GetEntityDefinitionByHash($projectId: ID!, $structuralHash: String!) {
  getEntityDefinitionByHash(projectId: $projectId, structuralHash: $structuralHash) {
    projectId
    id
    jsonSchemaId
    name
    description
    jsonSchema
    structuralHash
    normalizedJsonSchema
    properties {
      name
      dataType
      path
    }
  }
}
```

**Variables:** *(replace the hash with the actual value from Step 1)*

```json
{
  "projectId": "test-project-1",
  "structuralHash": "PASTE_HASH_FROM_STEP_1_HERE"
}
```

**Expected:** returns the InsurancePolicy definition — same result as Step 3 but looked up by hash instead of by id.

---

## Step 4 — List all definitions in the project

Should return both InsurancePolicy and Policyholder.

**Query editor:**

```graphql
query ListEntityDefinitions($projectId: ID!) {
  listEntityDefinitions(projectId: $projectId) {
    projectId
    id
    jsonSchemaId
    name
    description
    structuralHash
    normalizedJsonSchema
    properties {
      name
      dataType
    }
  }
}
```

**Variables:**

```json
{
  "projectId": "test-project-1"
}
```

**Expected:** array with 2 definitions, each with a unique `structuralHash` and `jsonSchemaId`.

---

## Step 5 — Create an InsurancePolicy instance

This creates an instance linked to `def-insurance-policy` with property values.

**Query editor:**

```graphql
mutation SaveEntityInstance($input: SaveInstanceInput!) {
  saveEntityInstance(input: $input) {
    projectId
    id
    definitionId
    label
    updatedAt
    values {
      propertyName
      stringValue
      numberValue
    }
    children {
      relationName
      targetInstanceId
    }
  }
}
```

**Variables:**

```json
{
  "input": {
    "projectId": "test-project-1",
    "id": "inst-policy-001",
    "definitionId": "def-insurance-policy",
    "label": "Policy #A-12345",
    "senderId": "appsync-console-walkthrough",
    "values": [
      { "propertyName": "policyNumber", "stringValue": "A-12345" },
      { "propertyName": "premium", "numberValue": 1200.00 }
    ],
    "children": [],
    "emitCompletionEvent": false
  }
}
```

---

## Step 6 — Create a Policyholder instance

This creates an instance linked to `def-policyholder` with a child relationship to the policy.

**Query editor:** *(same mutation as Step 5)*

```graphql
mutation SaveEntityInstance($input: SaveInstanceInput!) {
  saveEntityInstance(input: $input) {
    projectId
    id
    definitionId
    label
    updatedAt
    values {
      propertyName
      stringValue
      booleanValue
      dateValue
    }
    children {
      relationName
      targetInstanceId
    }
  }
}
```

**Variables:**

```json
{
  "input": {
    "projectId": "test-project-1",
    "id": "inst-holder-001",
    "definitionId": "def-policyholder",
    "label": "Jane Doe",
    "senderId": "appsync-console-walkthrough",
    "values": [
      { "propertyName": "fullName", "stringValue": "Jane Doe" },
      { "propertyName": "dateOfBirth", "dateValue": "1985-03-15" },
      { "propertyName": "isActive", "booleanValue": true }
    ],
    "children": [
      { "relationName": "holds_policy", "targetInstanceId": "inst-policy-001" }
    ],
    "emitCompletionEvent": false
  }
}
```

**Expected:** the policyholder instance with a `children` array containing the relationship to `inst-policy-001`.

---

## Step 7 — Get a single instance

Retrieve the policy instance and verify the values came back correctly.

**Query editor:**

```graphql
query GetEntityInstance($projectId: ID!, $id: ID!) {
  getEntityInstance(projectId: $projectId, id: $id) {
    projectId
    id
    definitionId
    label
    updatedAt
    values {
      propertyName
      stringValue
      numberValue
      booleanValue
      dateValue
      extractedByAI
      confidenceScore
      sourceEvidence
    }
    children {
      relationName
      targetInstanceId
    }
  }
}
```

**Variables:**

```json
{
  "projectId": "test-project-1",
  "id": "inst-policy-001"
}
```

---

## Step 8 — List all instances in the project

Should return both the policy and the policyholder.

**Query editor:**

```graphql
query ListEntityInstances($projectId: ID!) {
  listEntityInstances(projectId: $projectId) {
    projectId
    id
    definitionId
    label
    updatedAt
    values {
      propertyName
      stringValue
      numberValue
      booleanValue
      dateValue
    }
  }
}
```

**Variables:**

```json
{
  "projectId": "test-project-1"
}
```

**Expected:** array with 2 instances.

---

## Step 9 — List instances filtered by definition

Retrieve only InsurancePolicy instances (not Policyholder). Uses GSI1.

**Query editor:**

```graphql
query ListEntityInstancesByDefinition($projectId: ID!, $definitionId: ID!) {
  listEntityInstancesByDefinition(projectId: $projectId, definitionId: $definitionId) {
    projectId
    id
    definitionId
    label
    updatedAt
    values {
      propertyName
      stringValue
      numberValue
    }
  }
}
```

**Variables:**

```json
{
  "projectId": "test-project-1",
  "definitionId": "def-insurance-policy"
}
```

**Expected:** array with only `inst-policy-001`.

---

## Step 10 — Partial update an instance

Update just the premium on the policy. The existing `policyNumber` value is preserved because `saveEntityInstance` does a partial merge on `valuesMap`.

**Query editor:** *(same mutation as Steps 5/6)*

```graphql
mutation SaveEntityInstance($input: SaveInstanceInput!) {
  saveEntityInstance(input: $input) {
    projectId
    id
    definitionId
    label
    updatedAt
    values {
      propertyName
      stringValue
      numberValue
    }
  }
}
```

**Variables:**

```json
{
  "input": {
    "projectId": "test-project-1",
    "id": "inst-policy-001",
    "definitionId": "def-insurance-policy",
    "label": "Policy #A-12345 (updated)",
    "senderId": "appsync-console-walkthrough",
    "values": [
      { "propertyName": "premium", "numberValue": 1350.00 }
    ],
    "emitCompletionEvent": false
  }
}
```

**Expected:** response shows `premium = 1350` AND `policyNumber = A-12345` (preserved from Step 5).

---

## Step 11 — Update a definition (full replace)

Update the InsurancePolicy definition to add a third property. Unlike instances, definitions use PutItem (full replace), so you must include all fields. The `structuralHash` will be **recomputed** because the `jsonSchema` changed.

**Query editor:**

```graphql
mutation SaveEntityDefinition($input: SaveEntityDefinitionInput!) {
  saveEntityDefinition(input: $input) {
    projectId
    id
    jsonSchemaId
    name
    structuralHash
    normalizedJsonSchema
    properties {
      name
      dataType
      path
    }
  }
}
```

**Variables:**

```json
{
  "input": {
    "projectId": "test-project-1",
    "id": "def-insurance-policy",
    "name": "InsurancePolicy",
    "description": "An insurance policy — now with coverage type",
    "jsonSchema": "{\"type\":\"object\",\"properties\":{\"policyNumber\":{\"type\":\"string\"},\"premium\":{\"type\":\"number\"},\"coverageType\":{\"type\":\"string\"}}}",
    "properties": [
      {
        "name": "policyNumber",
        "description": "The unique policy identifier",
        "dataType": "STRING",
        "path": "$.policyNumber",
        "isList": false
      },
      {
        "name": "premium",
        "description": "Annual premium in dollars",
        "dataType": "NUMBER",
        "path": "$.premium",
        "isList": false
      },
      {
        "name": "coverageType",
        "description": "Type of coverage (e.g. comprehensive, liability)",
        "dataType": "STRING",
        "path": "$.coverageType",
        "isList": false
      }
    ]
  }
}
```

**Expected:** `structuralHash` is now a **different** 64-char hex value (the schema shape changed), `jsonSchemaId` also changes (it equals the new hash), and properties array has 3 items. A new JsonSchema record was auto-created in the app table for the updated schema. You can verify the old hash from Step 1 no longer matches by running Step 3b with the old hash — it should return `null`.

---

## Step 12 — Subscribe to instance updates (open in Tab 1)

Open this in one browser tab and leave it running. Then run Step 10 again in a second tab to see the subscription fire.

**Query editor:**

```graphql
subscription OnInstanceUpdated($projectId: ID!, $id: ID!) {
  onInstanceUpdated(projectId: $projectId, id: $id) {
    projectId
    id
    definitionId
    label
    updatedAt
    values {
      propertyName
      stringValue
      numberValue
    }
  }
}
```

**Variables:**

```json
{
  "projectId": "test-project-1",
  "id": "inst-policy-001"
}
```

**Then:** in a second tab, re-run Step 10 (or Step 5 with modified values). The subscription tab should display the updated instance.

---

## Step 13 — Subscribe to ALL instance changes in a project (open in Tab 1)

Unlike Step 12 which watches a single instance by `id`, this subscription fires for **every** instance create or update in the project — any definition, any instance.

**Query editor:**

```graphql
subscription OnProjectInstancesChanged($projectId: ID!) {
  onProjectInstancesChanged(projectId: $projectId) {
    projectId
    id
    definitionId
    label
    updatedAt
    values {
      propertyName
      stringValue
      numberValue
      booleanValue
      dateValue
    }
  }
}
```

**Variables:**

```json
{
  "projectId": "test-project-1"
}
```

**Then:** in a second tab, run any of these and watch the subscription fire each time:
- Step 5 (save a policy instance)
- Step 6 (save a policyholder instance)
- Step 10 (partial update the policy's premium)

Each mutation triggers a notification with the full saved instance. This is useful for a UI that displays a live list of all instances in a project.

---

## Step 14 — Subscribe to definition changes (open in Tab 1)

Monitors all definition saves in the project. The subscription response now includes the server-computed `structuralHash`.

**Query editor:**

```graphql
subscription OnDefinitionSaved($projectId: ID!) {
  onDefinitionSaved(projectId: $projectId) {
    projectId
    id
    jsonSchemaId
    name
    structuralHash
    normalizedJsonSchema
  }
}
```

**Variables:**

```json
{
  "projectId": "test-project-1"
}
```

**Then:** in a second tab, re-run Step 11 to see the subscription fire with the new hash.

---

## Step 15 — Delete an instance

Deletes the policy instance. Returns the old item.

**Query editor:**

```graphql
mutation DeleteEntityInstance($projectId: ID!, $id: ID!) {
  deleteEntityInstance(projectId: $projectId, id: $id) {
    projectId
    id
    definitionId
    label
  }
}
```

**Variables:**

```json
{
  "projectId": "test-project-1",
  "id": "inst-policy-001"
}
```

**Expected:** returns the deleted policy instance. Running `getEntityInstance` for this id afterwards returns `null`.

---

## Step 16 — Delete the policyholder instance

**Query editor:** *(same mutation as Step 15)*

```graphql
mutation DeleteEntityInstance($projectId: ID!, $id: ID!) {
  deleteEntityInstance(projectId: $projectId, id: $id) {
    projectId
    id
    definitionId
    label
  }
}
```

**Variables:**

```json
{
  "projectId": "test-project-1",
  "id": "inst-holder-001"
}
```

---

## Step 17 — Verify instances are gone

**Query editor:**

```graphql
query ListEntityInstances($projectId: ID!) {
  listEntityInstances(projectId: $projectId) {
    id
    label
  }
}
```

**Variables:**

```json
{
  "projectId": "test-project-1"
}
```

**Expected:** empty array `[]`.

---

## Step 18 — Delete a definition

**Query editor:**

```graphql
mutation DeleteEntityDefinition($projectId: ID!, $id: ID!) {
  deleteEntityDefinition(projectId: $projectId, id: $id) {
    projectId
    id
    name
  }
}
```

**Variables:**

```json
{
  "projectId": "test-project-1",
  "id": "def-insurance-policy"
}
```

---

## Step 19 — Delete the second definition and verify clean state

**Query editor:** *(same mutation as Step 18)*

```graphql
mutation DeleteEntityDefinition($projectId: ID!, $id: ID!) {
  deleteEntityDefinition(projectId: $projectId, id: $id) {
    projectId
    id
    name
  }
}
```

**Variables:**

```json
{
  "projectId": "test-project-1",
  "id": "def-policyholder"
}
```

Then verify with:

**Query editor:**

```graphql
query ListEntityDefinitions($projectId: ID!) {
  listEntityDefinitions(projectId: $projectId) {
    id
    name
  }
}
```

**Variables:**

```json
{
  "projectId": "test-project-1"
}
```

**Expected:** empty array `[]`. The project is clean.
