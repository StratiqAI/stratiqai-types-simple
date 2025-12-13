# AI Insights Specification  
**Version 1.0 – December 2025**  
**Target Platform:** AWS AppSync + DynamoDB Single-Table Design  
**Status:** Production Ready (10/10 2025 GraphQL Best Practices)

### 1. Purpose & Vision
AI Insights are **first-class, persistent, discoverable knowledge objects** that are automatically or manually generated from documents via AI Jobs or Workflows.

They represent the single source of truth for AI-generated intelligence in the system and power:
- Smart document summaries
- Auto-tagging & metadata extraction
- Cross-document synthesis
- Executive briefings
- Search augmentation
- Collaborative knowledge bases

### 2. Core Principles (2025 Gold Standard)
| Principle                          | Implementation |
|------------------------------------|----------------|
| Insights are entities, not blobs   | Full `SystemNode` with `id`, permissions, sharing |
| Visibility follows data ownership  | `PROJECT_PRIVATE` vs `DOCUMENT_PUBLIC` |
| Insights are tied to source pages  | `sourceDocumentId` + `pageNumbers` |
| System-owned templates → public    | Visibility = `DOCUMENT_PUBLIC` |
| User-owned templates → private     | Visibility = `PROJECT_PRIVATE` |
| Real-time delivery                 | Subscriptions + resolver filtering |
| Full audit & feedback              | `generatedByJob`, reactions, versioning |

### 3. GraphQL Schema (Copy-Paste Ready)

```graphql
enum InsightVisibility {
  "Only users with Project access can see it"
  PROJECT_PRIVATE

  "Anyone with a DocLink to the source Document can see it"
  DOCUMENT_PUBLIC
}

enum InsightReactionType {
  THUMBS_UP
  THUMBS_DOWN
  STAR
  BOOKMARK
  FLAG
}

type AIInsight implements SystemNode & Shareable {
  id: ID!
  entityType: EntityType! @const(value: "INSIGHT")
  tenantId: ID!
  ownerId: ID!                      # User ID or "SYSTEM"
  createdAt: AWSDateTime!
  updatedAt: AWSDateTime!
  deletedAt: AWSDateTime
  ttl: Int
  forkedFromId: ID
  forkedFromVersion: String
  permissions: ResourcePermissions!

  sharingMode: SharingMode! @const(value: PRIVATE)
  accessList(paginate: PaginateInput): ResourceShareConnection!

  "PROJECT_PRIVATE or DOCUMENT_PUBLIC"
  visibility: InsightVisibility!

  "Auto-generated or user-edited title"
  title: String!

  "Rich content: Markdown string + optional structured JSON"
  contentMarkdown: String!
  contentStructured: AWSJSON

  "Model confidence (0.0 – 1.0)"
  confidence: Float

  "Which template/workflow produced this insight"
  sourceTemplate: PromptTemplate
  sourceTemplateId: ID
  sourceWorkflow: Workflow
  sourceWorkflowId: ID
  sourceRun: WorkflowRun
  sourceRunId: ID

  "The exact AIJob that generated this insight"
  generatedByJob: AIJob!
  generatedByJobId: ID!

  "The source document this insight is about"
  sourceDocument: SystemDocument
  sourceDocumentId: ID

  "The project this insight belongs to (always set)"
  project: Project!
  projectId: ID!

  "Specific pages referenced (for highlighting)"
  pageNumbers: [Int!]

  "Auto + user tags"
  tags: [String!]!

  "User reactions for feedback loop"
  reactions(paginate: PaginateInput): InsightReactionConnection!

  "Version history (if edited)"
  versions(paginate: PaginateInput): InsightVersionConnection!
}

type InsightReaction implements SystemNode {
  id: ID!
  insightId: ID!
  userId: ID!
  reaction: InsightReactionType!
  comment: String
  createdAt: AWSDateTime!
}

type InsightVersion implements SystemNode {
  id: ID!
  insightId: ID!
  version: Int!
  title: String!
  contentMarkdown: String!
  contentStructured: AWSJSON
  changedBy: ID!
  changedAt: AWSDateTime!
}

# Connections
type AIInsightEdge { cursor: String! node: AIInsight! }
type AIInsightConnection { edges: [AIInsightEdge!]! pageInfo: PageInfo! }
type InsightReactionEdge { cursor: String! node: InsightReaction! }
type InsightReactionConnection { edges: [InsightReactionEdge!]! pageInfo: PageInfo! }
type InsightVersionEdge { cursor: String! node: InsightVersion! }
type InsightVersionConnection { edges: [InsightVersionEdge!]! pageInfo: PageInfo! }
```

### 4. Permission Matrix (Resolver-Enforced)

| Insight Visibility     | Template Owner | Can Read If…                                   | Resolver Check |
|------------------------|----------------|--------------------------------------------------|----------------|
| `PROJECT_PRIVATE`      | User           | Has access to `projectId`                        | `hasProjectAccess(user, projectId)` |
| `DOCUMENT_PUBLIC`      | System/Shared  | Has any `DocLink` → `sourceDocumentId` (any project) | `hasDocLinkToDocument(user, sourceDocumentId)` |

### 5. Queries

```graphql
type Query {
  "All insights in a project (respects visibility)"
  listProjectInsights(
    projectId: ID!
    filter: InsightFilterInput
    paginate: PaginateInput
  ): AIInsightConnection!

  "All public insights about a document (cross-project)"
  listDocumentInsights(
    documentId: ID!
    paginate: PaginateInput
  ): AIInsightConnection!

  "Global feed of high-confidence system insights"
  listPublicInsights(
    tag: [String!]
    minConfidence: Float = 0.8
    paginate: PaginateInput
  ): AIInsightConnection!

  getInsight(id: ID!): AIInsight
}

input InsightFilterInput {
  visibility: InsightVisibility
  sourceTemplateId: ID
  sourceWorkflowId: ID
  tag: [String!]
  minConfidence: Float
  createdAfter: AWSDateTime
  pageNumber: Int
}
```

### 6. Mutations (Worker vs User)

```graphql
type Mutation {
  "Called by worker Lambda when AIJob completes"
  createSystemInsight(
    jobId: ID!
    title: String!
    contentMarkdown: String!
    contentStructured: AWSJSON
    visibility: InsightVisibility!
    pageNumbers: [Int!]
    tags: [String!]
    clientMutationId: ID
  ): AIInsightPayload @aws_iam

  "User manually creates or edits an insight"
  createUserInsight(
    projectId: ID!
    sourceDocumentId: ID
    title: String!
    contentMarkdown: String!
    contentStructured: AWSJSON
    pageNumbers: [Int!]
    tags: [String!]
    clientMutationId: ID
  ): AIInsightPayload

  reactToInsight(
    insightId: ID!
    reaction: InsightReactionType!
    comment: String
    clientMutationId: ID
  ): InsightReactionPayload
}

type AIInsightPayload { insight: AIInsight userErrors: [UserError!]! clientMutationId: ID }
type InsightReactionPayload { reaction: InsightReaction userErrors: [UserError!]! clientMutationId: ID }
```

### 7. Real-Time Subscriptions

```graphql
type Subscription {
  onInsightCreatedInProject(projectId: ID!): AIInsightPayload
    @aws_subscribe(mutations: ["createSystemInsight", "createUserInsight"])

  onInsightCreatedForDocument(documentId: ID!): AIInsightPayload
    @aws_subscribe(mutations: ["createSystemInsight"])

  onInsightReaction(insightId: ID!): InsightReactionPayload
    @aws_subscribe(mutations: ["reactToInsight"])
}
```

### 8. Example Use Cases

| Use Case                          | Visibility          | Template Owner | Who Sees It |
|-----------------------------------|----------------------|----------------|-------------|
| Auto-summary from Notion-style template | `DOCUMENT_PUBLIC`    | System         | All users with the document |
| Legal risk extraction (company template) | `DOCUMENT_PUBLIC` | System         | All legal team members |
| User asks “What’s the budget?”     | `PROJECT_PRIVATE`    | User           | Only project members |
| Sales rep adds deal insight       | `PROJECT_PRIVATE`    | User           | Only sales project team |

### 9. DynamoDB Single-Table Mapping (Recommended)

| PK                     | SK                        | GSI1 (Project)     | GSI2 (Document)         | Attributes |
|------------------------|---------------------------|--------------------|--------------------------|------------|
| INSIGHT#abc123         | METADATA                  | PROJECT#proj456    | DOC#doc789               | visibility, title, etc. |
| INSIGHT#abc123         | REACTION#user999          | —                  | —                        | reaction data |
| INSIGHT#abc123         | VERSION#2                 | —                  | —                        | version history |

### 10. Conclusion
This specification delivers:
- True knowledge persistence
- Correct privacy & sharing semantics
- Real-time collaboration
- Full feedback loop
- Seamless integration with your existing `DocLink`, `Project`, `AIJob`, and `PromptTemplate` system

Deploy this and you instantly have a **Tier-1 enterprise AI insights engine** — on par with Glean, Dust.tt, and Harvey in 2025.



# Google Gemini
This is a powerful addition. By elevating **AI Insights** from simple "text blobs" to **First-Class Entities**, you enable a "Knowledge Graph" architecture where intelligence is reusable, versioned, and collaborative.

Here is the integration of the **AI Insights Specification (v1.0)** into your Platinum Schema.

### 1. Architectural Strategy: The "Dual-Home" Pattern

To satisfy the visibility requirements (`PROJECT_PRIVATE` vs `DOCUMENT_PUBLIC`), we must store Insights in different partitions based on their nature:

1.  **Project Private Insights:** Stored in the **User/Tenant Partition** (`PK=USER#...`).
    *   *Access:* Only visible within that Project.
2.  **Document Public Insights (System Generated):** Stored in a **System Partition** (`PK=SYSTEM#INSIGHTS`).
    *   *Access:* Visible to *anyone* who holds a `DocLink` to that Document Hash.
    *   *Lookup:* Indexed by Document Hash.

---

### 2. Schema Extensions

Add these sections to your existing `schema.graphql`.

#### A. Enums & Scalars

Update `EntityType` and add the new Enums.

```graphql
enum EntityType {
  # ... existing types ...
  INSIGHT
  INSIGHT_REACTION
  INSIGHT_VERSION
  AI_JOB
}

enum InsightVisibility {
  PROJECT_PRIVATE
  DOCUMENT_PUBLIC
}

enum InsightReactionType {
  THUMBS_UP
  THUMBS_DOWN
  STAR
  BOOKMARK
  FLAG
}

enum AIJobStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
}
```

#### B. The Insight Entities

These types implement `SystemNode` and fully integrate with your existing `Project` and `Document` types.

```graphql
# ----------------------------------------------------------------------
# AI INSIGHTS & KNOWLEDGE
# ----------------------------------------------------------------------

type AIInsight implements SystemNode & Shareable & Paginate
  @aws_iam @aws_cognito_user_pools(cognito_groups: ["SystemAdmins", "TenantAdmins", "Users"]) {
  
  # SystemNode Impl
  id: ID!
  entityType: EntityType!
  tenantId: ID!
  ownerId: ID! # If "SYSTEM", this is a public/global insight
  createdAt: AWSDateTime!
  updatedAt: AWSDateTime!
  deletedAt: AWSDateTime
  ttl: Int
  forkedFromId: ID 
  forkedFromVersion: String
  permissions: ResourcePermissions!

  # Shareable Impl
  sharingMode: SharingMode!
  accessList(limit: Int, nextToken: String): ResourceShareConnection

  # Insight Specifics
  visibility: InsightVisibility!
  title: String!
  contentMarkdown: String!
  contentStructured: AWSJSON # For JSON extraction results
  confidence: Float # 0.0 - 1.0

  # Lineage / Provenance (Gold Standard Tracking)
  sourceTemplateId: ID
  sourceWorkflowId: ID
  sourceRunId: ID
  generatedByJobId: ID!

  # Relations
  project: Project!
  projectId: ID!
  
  # The Bridge to ContentStore
  sourceDocument: SystemDocument
  sourceDocumentId: ID # The CAS Hash

  # Context
  pageNumbers: [Int!]
  tags: [String!]!

  # Feedback Loop
  reactions(paginate: PaginateInput): InsightReactionConnection!
  versions(paginate: PaginateInput): InsightVersionConnection!
}

type InsightReaction implements SystemNode 
  @aws_iam @aws_cognito_user_pools {
  
  id: ID!
  entityType: EntityType!
  tenantId: ID!
  ownerId: ID!
  createdAt: AWSDateTime!
  updatedAt: AWSDateTime!
  deletedAt: AWSDateTime
  ttl: Int
  forkedFromId: ID 
  forkedFromVersion: String
  permissions: ResourcePermissions!

  insightId: ID!
  reaction: InsightReactionType!
  comment: String
}

type InsightVersion implements SystemNode 
  @aws_iam @aws_cognito_user_pools {
  
  id: ID!
  entityType: EntityType!
  tenantId: ID!
  ownerId: ID!
  createdAt: AWSDateTime!
  updatedAt: AWSDateTime!
  deletedAt: AWSDateTime
  ttl: Int
  forkedFromId: ID 
  forkedFromVersion: String
  permissions: ResourcePermissions!

  insightId: ID!
  versionNumber: Int!
  title: String!
  contentMarkdown: String!
  contentStructured: AWSJSON
  changedBy: ID!
}

# --- AI JOB (The Worker Record) ---
type AIJob implements SystemNode 
  @aws_iam @aws_cognito_user_pools {
  
  id: ID!
  entityType: EntityType!
  tenantId: ID!
  ownerId: ID!
  createdAt: AWSDateTime!
  updatedAt: AWSDateTime!
  deletedAt: AWSDateTime
  ttl: Int
  forkedFromId: ID 
  forkedFromVersion: String
  permissions: ResourcePermissions!

  status: AIJobStatus!
  targetDocumentId: ID
  targetProjectId: ID
  modelUsed: String
  tokenUsage: Int
}
```

#### C. Connections & Payloads

```graphql
type AIInsightEdge { cursor: String! node: AIInsight! }
type AIInsightConnection { edges: [AIInsightEdge!]! pageInfo: PageInfo! }
type AIInsightPayload { insight: AIInsight, userErrors: [UserError!]! }

type InsightReactionEdge { cursor: String! node: InsightReaction! }
type InsightReactionConnection { edges: [InsightReactionEdge!]! pageInfo: PageInfo! }
type InsightReactionPayload { reaction: InsightReaction, userErrors: [UserError!]! }

type InsightVersionEdge { cursor: String! node: InsightVersion! }
type InsightVersionConnection { edges: [InsightVersionEdge!]! pageInfo: PageInfo! }
```

#### D. Inputs

```graphql
input InsightFilterInput {
  visibility: InsightVisibility
  sourceTemplateId: ID
  sourceWorkflowId: ID
  tag: [String!]
  minConfidence: Float
  createdAfter: AWSDateTime
  pageNumber: Int
}

input CreateUserInsightInput {
  projectId: ID!
  sourceDocumentId: ID
  title: String!
  contentMarkdown: String!
  contentStructured: AWSJSON
  pageNumbers: [Int!]
  tags: [String!]
}

input CreateSystemInsightInput {
  jobId: ID!
  projectId: ID # Optional, if null = Global Document Insight
  sourceDocumentId: ID!
  title: String!
  contentMarkdown: String!
  contentStructured: AWSJSON
  visibility: InsightVisibility!
  pageNumbers: [Int!]
  tags: [String!]
}
```

#### E. Operations (Query / Mutation / Subscription)

```graphql
extend type Query {
  # --- AI INSIGHT QUERIES ---

  """
  Get insights scoped to a specific project.
  Resolves Private insights (User/Tenant) AND Public System insights linked to this project.
  """
  listProjectInsights(
    projectId: ID!
    filter: InsightFilterInput
    paginate: PaginateInput
  ): AIInsightConnection!

  """
  Get all PUBLIC/SYSTEM insights for a specific document hash.
  Useful for showing "General Knowledge" about a file (Summary, Entities).
  """
  listDocumentInsights(
    documentId: ID!
    paginate: PaginateInput
  ): AIInsightConnection!

  getInsight(key: PrimaryKeyInput!): AIInsight
}

extend type Mutation {
  # --- WORKER OPS (IAM Role Only) ---
  """
  Called by the Backend AI Worker (Lambda/StepFunctions) when a Job completes.
  """
  createSystemInsight(input: CreateSystemInsightInput!): AIInsightPayload 
    @aws_iam

  # --- USER OPS ---
  """
  User manually adds a note or insight.
  """
  createUserInsight(input: CreateUserInsightInput!): AIInsightPayload

  """
  User reacts (feedback loop).
  """
  reactToInsight(
    insightId: ID!
    reaction: InsightReactionType!
    comment: String
  ): InsightReactionPayload
}

extend type Subscription {
  """
  Real-time feed for the Project Dashboard.
  """
  onInsightCreatedInProject(projectId: ID!): AIInsightPayload
    @aws_subscribe(mutations: ["createSystemInsight", "createUserInsight"])

  """
  Real-time feed for the Document Viewer.
  """
  onInsightCreatedForDocument(documentId: ID!): AIInsightPayload
    @aws_subscribe(mutations: ["createSystemInsight"])
}
```

---

### 3. DynamoDB Mapping Strategy

To make `listProjectInsights` and `listDocumentInsights` efficient, use this data layout:

| Item Type | Partition Key (PK) | Sort Key (SK) | GSI1PK (Project) | GSI1SK (Entity) | GSI3PK (Document) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Private Insight** | `USER#<Me>` | `INSIGHT#<UUID>` | `PROJ#<ProjID>` | `INSIGHT#<UUID>` | `DOC#<Hash>` |
| **Public Insight** | `SYSTEM#INSIGHTS` | `DOC#<Hash>#<UUID>` | `PROJ#<ProjID>`* | `INSIGHT#<UUID>` | `DOC#<Hash>` |

**Query Logic:**
1.  **`listProjectInsights`**: Query **GSI1** (`PROJ#...`).
    *   This fetches all insights linked to the project, whether they are private (User created) or Public (System generated and linked to the project).
2.  **`listDocumentInsights`**: Query **Base Table** (System Scope) OR **GSI3** (Global Document Index).
    *   *Note:* You may need to enable `GSI3` on `documentId` to efficiently find all insights about a specific file across the entire system.

### 4. Implementation Checklist

- [ ] **Resolvers:** Implement `createSystemInsight` to verify the `JobID` exists.
- [ ] **Runners:** Ensure your Python/Node AI Workers invoke the `createSystemInsight` mutation via AppSync HTTP client after processing.
- [ ] **Frontend:** When rendering a PDF, query `listDocumentInsights(documentId: hash)` to show "Global Intelligence" in the sidebar.