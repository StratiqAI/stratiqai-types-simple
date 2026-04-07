export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  AWSDate: { input: string; output: string; }
  AWSDateTime: { input: string; output: string; }
  AWSJSON: { input: any; output: any; }
  AWSTimestamp: { input: any; output: any; }
};

/**
 * LLM provider model keys. Backend maps each enum value to the provider API model id:
 * - Gemini (Google Generative AI): e.g. GEMINI_2_5_FLASH -> "gemini-2.5-flash"
 * - GEMINI_3_1_FLASH_PREVIEW -> "gemini-3.1-flash-lite-preview"
 * - Anthropic (Claude API, Vercel AI SDK @ai-sdk/anthropic): e.g. CLAUDE_SONNET_4_6 -> "claude-sonnet-4-6"
 *
 * Use snapshot ids where listed for stable behavior across environments.
 */
export type AiModel =
  | 'CLAUDE_3_5_HAIKU_20241022'
  | 'CLAUDE_3_5_SONNET_20241022'
  | 'CLAUDE_3_HAIKU_20240307'
  | 'CLAUDE_3_OPUS_20240229'
  | 'CLAUDE_HAIKU_4_5'
  | 'CLAUDE_HAIKU_4_5_20251001'
  | 'CLAUDE_OPUS_4_1_20250805'
  | 'CLAUDE_OPUS_4_5'
  | 'CLAUDE_OPUS_4_5_20251101'
  | 'CLAUDE_OPUS_4_6'
  | 'CLAUDE_OPUS_4_20250514'
  | 'CLAUDE_SONNET_4_5'
  | 'CLAUDE_SONNET_4_5_20250929'
  | 'CLAUDE_SONNET_4_6'
  | 'CLAUDE_SONNET_4_20250514'
  | 'GEMINI_2_5_FLASH'
  | 'GEMINI_2_5_FLASH_LITE'
  | 'GEMINI_2_5_PRO'
  | 'GEMINI_3_1_FLASH_PREVIEW'
  | 'GEMINI_3_1_PRO_PREVIEW'
  | 'GEMINI_3_FLASH_PREVIEW'
  | 'GEMINI_3_PRO_PREVIEW';

export type AiNodeConfig = {
  __typename?: 'AINodeConfig';
  /** Reference to a persisted JsonSchema entity for structured output. */
  jsonSchemaId?: Maybe<Scalars['ID']['output']>;
  model?: Maybe<Scalars['String']['output']>;
  prompt?: Maybe<Scalars['String']['output']>;
  systemPrompt?: Maybe<Scalars['String']['output']>;
  topK?: Maybe<Scalars['Int']['output']>;
};

export type AiNodeConfigInput = {
  /** Reference to a persisted JsonSchema entity for structured output. */
  jsonSchemaId?: InputMaybe<Scalars['ID']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  prompt?: InputMaybe<Scalars['String']['input']>;
  systemPrompt?: InputMaybe<Scalars['String']['input']>;
  topK?: InputMaybe<Scalars['Int']['input']>;
};

/** Immutable record of an AI prompt run and its result. */
export type AiQueryExecution = Metadata & Node & {
  __typename?: 'AIQueryExecution';
  candidatesTokenCount?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['AWSDateTime']['output'];
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  documentIds?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
  durationMs?: Maybe<Scalars['Int']['output']>;
  entityType: EntityType;
  errorCode?: Maybe<Scalars['String']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  executedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  /** AI Query fields */
  executionId: Scalars['ID']['output'];
  /** Node & Metadata fields */
  id: Scalars['ID']['output'];
  /** Prompt input fields */
  inputValues: Scalars['AWSJSON']['output'];
  model?: Maybe<Scalars['String']['output']>;
  ownerId: Scalars['ID']['output'];
  priority?: Maybe<Scalars['String']['output']>;
  /** Project fields */
  projectId: Scalars['ID']['output'];
  promptId: Scalars['ID']['output'];
  promptTokenCount?: Maybe<Scalars['Int']['output']>;
  /** Timing fields */
  queuedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  /** AI output and token auditing */
  rawOutput?: Maybe<Scalars['String']['output']>;
  retryCount?: Maybe<Scalars['Int']['output']>;
  startedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  /** Execution lifecycle fields */
  status: ExecutionStatus;
  statusMessage?: Maybe<Scalars['String']['output']>;
  tenantId: Scalars['ID']['output'];
  topK?: Maybe<Scalars['Int']['output']>;
  topKPerNs?: Maybe<Scalars['Int']['output']>;
  totalTokenCount?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type AiQueryExecutionConnection = {
  __typename?: 'AIQueryExecutionConnection';
  items: Array<AiQueryExecution>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type AiQueryStatus =
  | 'COMPLETED'
  | 'FAILED'
  | 'PENDING'
  | 'PROCESSING';

export type AccountCredits = Metadata & Node & {
  __typename?: 'AccountCredits';
  balance: Scalars['Int']['output'];
  createdAt: Scalars['AWSDateTime']['output'];
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  entityType: EntityType;
  id: Scalars['ID']['output'];
  ownerId: Scalars['ID']['output'];
  stripeCustomerId?: Maybe<Scalars['String']['output']>;
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type Announcement = Metadata & Node & {
  __typename?: 'Announcement';
  body: Scalars['String']['output'];
  createdAt: Scalars['AWSDateTime']['output'];
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  entityType: EntityType;
  id: Scalars['ID']['output'];
  ownerId: Scalars['ID']['output'];
  parentId: Scalars['ID']['output'];
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type AnnouncementConnection = {
  __typename?: 'AnnouncementConnection';
  items: Array<Announcement>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type AuditLogAction =
  | 'DOWNLOAD'
  | 'LIST_DOCUMENTS'
  | 'LOGIN'
  | 'OTHER'
  | 'PRINT'
  | 'VIEW_DOCUMENT';

export type AuditLogEntry = Metadata & Node & {
  __typename?: 'AuditLogEntry';
  action: AuditLogAction;
  createdAt: Scalars['AWSDateTime']['output'];
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  entityType: EntityType;
  id: Scalars['ID']['output'];
  ip?: Maybe<Scalars['String']['output']>;
  ownerId: Scalars['ID']['output'];
  parentId: Scalars['ID']['output'];
  resourceId?: Maybe<Scalars['ID']['output']>;
  resourceType?: Maybe<EntityType>;
  tenantId: Scalars['ID']['output'];
  ttlExpiration?: Maybe<Scalars['AWSTimestamp']['output']>;
  updatedAt: Scalars['AWSDateTime']['output'];
  userAgent?: Maybe<Scalars['String']['output']>;
};

export type AuditLogEntryConnection = {
  __typename?: 'AuditLogEntryConnection';
  items: Array<AuditLogEntry>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type BillingInvoice = Metadata & Node & {
  __typename?: 'BillingInvoice';
  amountDue: Scalars['Float']['output'];
  amountPaid: Scalars['Float']['output'];
  createdAt: Scalars['AWSDateTime']['output'];
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  entityType: EntityType;
  id: Scalars['ID']['output'];
  lineItems?: Maybe<Scalars['AWSJSON']['output']>;
  ownerId: Scalars['ID']['output'];
  period: BillingPeriod;
  periodEnd: Scalars['AWSDateTime']['output'];
  periodStart: Scalars['AWSDateTime']['output'];
  status: InvoiceStatus;
  stripeInvoiceId?: Maybe<Scalars['String']['output']>;
  subscriptionId?: Maybe<Scalars['ID']['output']>;
  summary: BillingSummary;
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type BillingInvoiceConnection = {
  __typename?: 'BillingInvoiceConnection';
  items: Array<BillingInvoice>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type BillingInvoicePayload = {
  __typename?: 'BillingInvoicePayload';
  billingInvoice?: Maybe<BillingInvoice>;
  userErrors: Array<UserError>;
};

export type BillingPeriod =
  | 'ANNUAL'
  | 'MONTHLY'
  | 'QUARTERLY';

export type BillingSummary = {
  __typename?: 'BillingSummary';
  adjustments: Scalars['Float']['output'];
  baseAmount: Scalars['Float']['output'];
  periodEnd: Scalars['AWSDateTime']['output'];
  periodStart: Scalars['AWSDateTime']['output'];
  projectedNextPeriod?: Maybe<Scalars['Float']['output']>;
  totalAmount: Scalars['Float']['output'];
  totalQuantity: Scalars['Int']['output'];
  totalUnit: UsageUnit;
  usageAmount: Scalars['Float']['output'];
};

export type BillingSummaryInput = {
  adjustments: Scalars['Float']['input'];
  baseAmount: Scalars['Float']['input'];
  periodEnd: Scalars['AWSDateTime']['input'];
  periodStart: Scalars['AWSDateTime']['input'];
  projectedNextPeriod?: InputMaybe<Scalars['Float']['input']>;
  totalAmount: Scalars['Float']['input'];
  totalQuantity: Scalars['Int']['input'];
  totalUnit: UsageUnit;
  usageAmount: Scalars['Float']['input'];
};

export type BuyerEngagement = {
  __typename?: 'BuyerEngagement';
  dealId: Scalars['ID']['output'];
  documentViewCount?: Maybe<Scalars['Int']['output']>;
  downloadCount?: Maybe<Scalars['Int']['output']>;
  lastActiveAt?: Maybe<Scalars['AWSDateTime']['output']>;
  totalTimeSeconds?: Maybe<Scalars['Int']['output']>;
  userId: Scalars['ID']['output'];
};

/**
 * Composite Key for accessing Child Entities (Doclink, Topic, Image, Table, Text, Scan).
 * Required because we do not have a Global Lookup GSI for children;
 * we must know the parentId to locate the item in the Main Table.
 */
export type CompositeKeyInput = {
  id: Scalars['ID']['input'];
  parentId: Scalars['ID']['input'];
};

export type CreateAiQueryExecutionInput = {
  documentIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** AI Query fields */
  executionId: Scalars['ID']['input'];
  /** Visual RAG fields */
  inputValues: Scalars['AWSJSON']['input'];
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  /** Queue priority: HIGH, MEDIUM, or LOW. Defaults to MEDIUM when omitted. */
  priority?: InputMaybe<Scalars['String']['input']>;
  /** Project fields */
  projectId: Scalars['ID']['input'];
  promptId: Scalars['ID']['input'];
  queuedAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  statusMessage?: InputMaybe<Scalars['String']['input']>;
  /** Optional: when provided (e.g. by submitAIQuery Lambda using IAM), used as tenant/owner; otherwise from identity. */
  tenantId?: InputMaybe<Scalars['ID']['input']>;
  topK?: InputMaybe<Scalars['Int']['input']>;
  topKPerNs?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateAnnouncementInput = {
  body: Scalars['String']['input'];
  parentId: Scalars['ID']['input'];
};

export type CreateAuditLogEntryInput = {
  action: AuditLogAction;
  ip?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  parentId: Scalars['ID']['input'];
  resourceId?: InputMaybe<Scalars['ID']['input']>;
  resourceType?: InputMaybe<EntityType>;
  ttlExpiration?: InputMaybe<Scalars['Int']['input']>;
  userAgent?: InputMaybe<Scalars['String']['input']>;
};

export type CreateBillingInvoiceInput = {
  amountDue: Scalars['Float']['input'];
  amountPaid: Scalars['Float']['input'];
  lineItems?: InputMaybe<Scalars['AWSJSON']['input']>;
  ownerId: Scalars['ID']['input'];
  period: BillingPeriod;
  periodEnd: Scalars['AWSDateTime']['input'];
  periodStart: Scalars['AWSDateTime']['input'];
  status: InvoiceStatus;
  stripeInvoiceId?: InputMaybe<Scalars['String']['input']>;
  subscriptionId?: InputMaybe<Scalars['ID']['input']>;
  summary: BillingSummaryInput;
  tenantId: Scalars['ID']['input'];
};

export type CreateDashboardLayoutInput = {
  parentId: Scalars['ID']['input'];
  state: Scalars['AWSJSON']['input'];
  version: Scalars['String']['input'];
};

export type CreateDealRoomMemberInput = {
  parentId: Scalars['ID']['input'];
  permissionSetIds?: InputMaybe<Array<Scalars['String']['input']>>;
  role: DealRole;
  userId: Scalars['ID']['input'];
};

export type CreateDealTemplateInput = {
  name: Scalars['String']['input'];
  structure?: InputMaybe<Scalars['AWSJSON']['input']>;
};

export type CreateDoclinkInput = {
  displayOrder?: InputMaybe<Scalars['String']['input']>;
  documentId: Scalars['ID']['input'];
  filename: Scalars['String']['input'];
  folderPath?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  linkType?: InputMaybe<DoclinkLinkType>;
  parentId: Scalars['ID']['input'];
  permissionSetIds?: InputMaybe<Array<Scalars['String']['input']>>;
  status?: InputMaybe<DoclinkStatus>;
};

export type CreateDocumentInput = {
  fileHash: Scalars['String']['input'];
  mimeType?: InputMaybe<Scalars['String']['input']>;
  s3Bucket: Scalars['String']['input'];
  s3Key: Scalars['String']['input'];
  sizeBytes?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateImageInput = {
  bottomRightX: Scalars['Int']['input'];
  bottomRightY: Scalars['Int']['input'];
  imageAnnotation?: InputMaybe<Scalars['AWSJSON']['input']>;
  imageId: Scalars['String']['input'];
  mimeType?: InputMaybe<Scalars['String']['input']>;
  pageNum: Scalars['Int']['input'];
  parentId: Scalars['ID']['input'];
  s3Bucket: Scalars['String']['input'];
  s3Key: Scalars['String']['input'];
  sizeBytes?: InputMaybe<Scalars['Int']['input']>;
  topLeftX: Scalars['Int']['input'];
  topLeftY: Scalars['Int']['input'];
};

export type CreateInvestorProfileInput = {
  explicitCriteria?: InputMaybe<Scalars['AWSJSON']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateInvitationInput = {
  email: Scalars['String']['input'];
  parentId: Scalars['ID']['input'];
  role?: InputMaybe<DealRole>;
  status?: InputMaybe<InvitationStatus>;
};

export type CreateInvoiceInput = {
  period?: InputMaybe<BillingPeriod>;
  periodEnd: Scalars['AWSDateTime']['input'];
  periodStart: Scalars['AWSDateTime']['input'];
  subscriptionId?: InputMaybe<Scalars['ID']['input']>;
  tenantId: Scalars['ID']['input'];
};

export type CreateJsonSchemaInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  /** JSON Schema definition (OpenAPI 3.0 / JSON Schema draft-07 compatible). Stored as AWSJSON. */
  schemaDefinition: Scalars['AWSJSON']['input'];
  sharingMode?: InputMaybe<SharingMode>;
  /** Set when copying a shared schema: ID of the schema this copy was created from. */
  sourceJsonSchemaId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateMatchScoreInput = {
  parentId: Scalars['ID']['input'];
  rationaleText?: InputMaybe<Scalars['String']['input']>;
  score: Scalars['Float']['input'];
  suggestedAction?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
};

export type CreateMicroInterviewInput = {
  parentId: Scalars['ID']['input'];
  questionId?: InputMaybe<Scalars['String']['input']>;
  questionText: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type CreateNdaAgreementInput = {
  parentId: Scalars['ID']['input'];
  status?: InputMaybe<NdaStatus>;
  userId: Scalars['ID']['input'];
};

export type CreateNotificationInput = {
  message: Scalars['String']['input'];
  parentId: Scalars['ID']['input'];
  properties?: InputMaybe<Scalars['AWSJSON']['input']>;
};

export type CreateProjectInput = {
  brokerContactEmail?: InputMaybe<Scalars['String']['input']>;
  brokerContactName?: InputMaybe<Scalars['String']['input']>;
  brokerContactPhone?: InputMaybe<Scalars['String']['input']>;
  dealTags?: InputMaybe<Scalars['AWSJSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  headline?: InputMaybe<Scalars['String']['input']>;
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  mapEmbedUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  photoUrls?: InputMaybe<Array<Scalars['String']['input']>>;
  primaryColor?: InputMaybe<Scalars['String']['input']>;
  secondaryColor?: InputMaybe<Scalars['String']['input']>;
  sharingMode?: InputMaybe<SharingMode>;
  status?: InputMaybe<ProjectStatus>;
  summary?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePromptInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  /** Variable names; optional on create (derived from prompt when not provided). */
  inputVariables?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Reference to a persisted JsonSchema entity defining the structured output schema for this prompt. */
  jsonSchemaId?: InputMaybe<Scalars['ID']['input']>;
  model?: InputMaybe<AiModel>;
  name: Scalars['String']['input'];
  /** Main user prompt text; may contain {{ variableName }} placeholders. */
  prompt: Scalars['String']['input'];
  sharingMode?: InputMaybe<SharingMode>;
  /** Set when copying a shared prompt: ID of the prompt this copy was created from. */
  sourcePromptId?: InputMaybe<Scalars['ID']['input']>;
  /** Optional system instruction for the model. */
  systemInstruction?: InputMaybe<Scalars['String']['input']>;
};

export type CreateQuestionInput = {
  authorId?: InputMaybe<Scalars['ID']['input']>;
  documentId?: InputMaybe<Scalars['ID']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  parentId: Scalars['ID']['input'];
  questionText: Scalars['String']['input'];
};

export type CreateScanInput = {
  parentId: Scalars['ID']['input'];
  s3Bucket: Scalars['String']['input'];
  s3Key: Scalars['String']['input'];
};

export type CreateTableInput = {
  description: Scalars['String']['input'];
  pageNum: Scalars['Int']['input'];
  parentId: Scalars['ID']['input'];
};

export type CreateTextInput = {
  pageNum: Scalars['Int']['input'];
  parentId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};

export type CreateUsageRecordInput = {
  metadata?: InputMaybe<Scalars['AWSJSON']['input']>;
  ownerId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
  reportableObjectId: Scalars['ID']['input'];
  subscriptionId?: InputMaybe<Scalars['ID']['input']>;
  tenantId: Scalars['ID']['input'];
  timestamp: Scalars['AWSDateTime']['input'];
  unit: UsageUnit;
};

export type CreateWorkflowExecutionInput = {
  inputData?: InputMaybe<Scalars['AWSJSON']['input']>;
  parentId: Scalars['ID']['input'];
  triggerEvent?: InputMaybe<Scalars['AWSJSON']['input']>;
};

export type CreateWorkflowInput = {
  definition: WorkflowDefinitionInput;
  jsonSchemaId?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  parentId: Scalars['ID']['input'];
  ui?: InputMaybe<WorkflowUiInput>;
};

export type CreateWorkflowNodeExecutionInput = {
  inputData?: InputMaybe<Scalars['AWSJSON']['input']>;
  nodeCategory?: InputMaybe<Scalars['String']['input']>;
  nodeId: Scalars['String']['input'];
  nodeName?: InputMaybe<Scalars['String']['input']>;
  nodeType?: InputMaybe<Scalars['String']['input']>;
  parentId: Scalars['ID']['input'];
};

/**
 * Persisted dashboard layout for a project. Stores the full multi-tab widget
 * layout as a JSON blob (MultiTabDashboardState).
 */
export type DashboardLayout = Metadata & Node & {
  __typename?: 'DashboardLayout';
  createdAt: Scalars['AWSDateTime']['output'];
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  entityType: EntityType;
  id: Scalars['ID']['output'];
  ownerId: Scalars['ID']['output'];
  parentId: Scalars['ID']['output'];
  /** Full MultiTabDashboardState (tabs, widgets, config, widgetData). */
  state: Scalars['AWSJSON']['output'];
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
  /** Storage format version (e.g. '5.0.0'). */
  version: Scalars['String']['output'];
};

export type DashboardLayoutConnection = {
  __typename?: 'DashboardLayoutConnection';
  items: Array<DashboardLayout>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type DealRole =
  | 'BROKER_ADMIN'
  | 'BUYER_ENVIRONMENTAL'
  | 'BUYER_LENDER'
  | 'BUYER_OTHER'
  | 'BUYER_PRINCIPAL';

export type DealRoomMember = Metadata & Node & {
  __typename?: 'DealRoomMember';
  createdAt: Scalars['AWSDateTime']['output'];
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  entityType: EntityType;
  id: Scalars['ID']['output'];
  ownerId: Scalars['ID']['output'];
  parentId: Scalars['ID']['output'];
  permissionSetIds?: Maybe<Array<Scalars['String']['output']>>;
  role: DealRole;
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
  userId: Scalars['ID']['output'];
};

export type DealRoomMemberConnection = {
  __typename?: 'DealRoomMemberConnection';
  items: Array<DealRoomMember>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type DealTemplate = Metadata & Node & {
  __typename?: 'DealTemplate';
  createdAt: Scalars['AWSDateTime']['output'];
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  entityType: EntityType;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  ownerId: Scalars['ID']['output'];
  structure?: Maybe<Scalars['AWSJSON']['output']>;
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type DealTemplateConnection = {
  __typename?: 'DealTemplateConnection';
  items: Array<DealTemplate>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type DeleteDocumentInput = {
  id: Scalars['ID']['input'];
};

export type Doclink = Metadata & Node & {
  __typename?: 'Doclink';
  createdAt: Scalars['AWSDateTime']['output'];
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  displayOrder?: Maybe<Scalars['String']['output']>;
  documentId: Scalars['ID']['output'];
  entityType: EntityType;
  filename: Scalars['String']['output'];
  folderPath?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  linkType: DoclinkLinkType;
  ownerId: Scalars['ID']['output'];
  parentId: Scalars['ID']['output'];
  permissionSetIds?: Maybe<Array<Scalars['String']['output']>>;
  status: DoclinkStatus;
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type DoclinkConnection = {
  __typename?: 'DoclinkConnection';
  items: Array<Doclink>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type DoclinkLinkType =
  | 'IMAGE_EMBEDDINGS'
  | 'NONE'
  | 'TEXT_EMBEDDINGS';

export type DoclinkStatus =
  | 'FAILED'
  | 'NOT_STARTED'
  | 'PROCESSING'
  | 'READY';

export type Document = Metadata & Node & Storable & {
  __typename?: 'Document';
  createdAt: Scalars['AWSDateTime']['output'];
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  entityType: EntityType;
  fileHash: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  images?: Maybe<ImageConnection>;
  mimeType: Scalars['String']['output'];
  ownerId: Scalars['ID']['output'];
  s3Bucket: Scalars['String']['output'];
  s3Key: Scalars['String']['output'];
  scans?: Maybe<ScanConnection>;
  sizeBytes?: Maybe<Scalars['Int']['output']>;
  tables?: Maybe<TableConnection>;
  tenantId: Scalars['ID']['output'];
  texts?: Maybe<TextConnection>;
  updatedAt: Scalars['AWSDateTime']['output'];
};


export type DocumentImagesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type DocumentScansArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type DocumentTablesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type DocumentTextsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentAnalytics = {
  __typename?: 'DocumentAnalytics';
  dealId: Scalars['ID']['output'];
  documentId: Scalars['ID']['output'];
  downloadCount: Scalars['Int']['output'];
  uniqueViewerCount?: Maybe<Scalars['Int']['output']>;
  viewCount: Scalars['Int']['output'];
};

export type DocumentConnection = {
  __typename?: 'DocumentConnection';
  items: Array<Document>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type DocumentSearchResult = {
  __typename?: 'DocumentSearchResult';
  documentId: Scalars['ID']['output'];
  pageNum: Scalars['Int']['output'];
  snippet: Scalars['String']['output'];
};

export type EmptyNodeConfig = {
  __typename?: 'EmptyNodeConfig';
  _empty?: Maybe<Scalars['Boolean']['output']>;
};

export type EntityDefinition = {
  __typename?: 'EntityDefinition';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  jsonSchema: Scalars['AWSJSON']['output'];
  name: Scalars['String']['output'];
  normalizedJsonSchema?: Maybe<Scalars['AWSJSON']['output']>;
  projectId: Scalars['ID']['output'];
  properties?: Maybe<Array<Maybe<PropertyDefinition>>>;
  structuralHash: Scalars['String']['output'];
};

export type EntityInstance = {
  __typename?: 'EntityInstance';
  children?: Maybe<Array<Maybe<Relationship>>>;
  definitionId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  label?: Maybe<Scalars['String']['output']>;
  projectId: Scalars['ID']['output'];
  senderId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  values?: Maybe<Array<Maybe<PropertyValue>>>;
};

export type EntityType =
  | 'ACCOUNT_CREDITS'
  | 'AI_QUERY'
  | 'AI_QUERY_EXECUTION'
  | 'ANNOUNCEMENT'
  | 'AUDIT_LOG_ENTRY'
  | 'BILLING_INVOICE'
  | 'DASHBOARD_LAYOUT'
  | 'DEAL_ROOM_MEMBER'
  | 'DEAL_TEMPLATE'
  | 'DOCLINK'
  | 'DOCUMENT'
  | 'IMAGE'
  | 'INVESTOR_PROFILE'
  | 'INVITATION'
  | 'JSON_SCHEMA'
  | 'MATCH_SCORE'
  | 'MICRO_INTERVIEW'
  | 'NDA_AGREEMENT'
  | 'NOTIFICATION'
  | 'PROJECT'
  | 'PROMPT'
  | 'QUESTION'
  | 'RESOURCE_SHARE'
  | 'SCAN'
  | 'STRUCTURED_OUTPUT_SCHEMA'
  | 'TABLE'
  | 'TENANT_QUOTA'
  | 'TEXT'
  | 'TOPIC'
  | 'USAGE_RECORD'
  | 'WORKFLOW'
  | 'WORKFLOW_EXECUTION'
  | 'WORKFLOW_NODE_EXECUTION';

/**
 * Execution lifecycle for AIQueryExecution.
 * PENDING -> QUEUED -> PROCESSING -> SUCCESS | ERROR
 */
export type ExecutionStatus =
  | 'CANCELLED'
  | 'ERROR'
  | 'PENDING'
  | 'PROCESSING'
  | 'QUEUED'
  | 'SUCCESS';

/** Configuration for Google Gemini generation. */
export type GeminiConfig = {
  __typename?: 'GeminiConfig';
  maxOutputTokens?: Maybe<Scalars['Int']['output']>;
  stopSequences?: Maybe<Array<Scalars['String']['output']>>;
  temperature?: Maybe<Scalars['Float']['output']>;
  topK?: Maybe<Scalars['Int']['output']>;
  topP?: Maybe<Scalars['Float']['output']>;
};

export type GeminiConfigInput = {
  maxOutputTokens?: InputMaybe<Scalars['Int']['input']>;
  stopSequences?: InputMaybe<Array<Scalars['String']['input']>>;
  temperature?: InputMaybe<Scalars['Float']['input']>;
  topK?: InputMaybe<Scalars['Int']['input']>;
  topP?: InputMaybe<Scalars['Float']['input']>;
};

export type GeneratePromptDraftInput = {
  /** Plain-English description of what the user wants the prompt to do. */
  description: Scalars['String']['input'];
};

export type GeneratePromptDraftOutput = {
  __typename?: 'GeneratePromptDraftOutput';
  /** Suggested JSON Schema definition (draft-07). Returned as AWSJSON so the client can parse and load into the schema builder. */
  jsonSchema?: Maybe<Scalars['AWSJSON']['output']>;
  prompt: Scalars['String']['output'];
  suggestedName?: Maybe<Scalars['String']['output']>;
  systemInstruction?: Maybe<Scalars['String']['output']>;
};

export type Image = Metadata & Node & Storable & {
  __typename?: 'Image';
  bottomRightX: Scalars['Int']['output'];
  bottomRightY: Scalars['Int']['output'];
  createdAt: Scalars['AWSDateTime']['output'];
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  entityType: EntityType;
  id: Scalars['ID']['output'];
  imageAnnotation?: Maybe<Scalars['AWSJSON']['output']>;
  imageId: Scalars['String']['output'];
  mimeType?: Maybe<Scalars['String']['output']>;
  ownerId: Scalars['ID']['output'];
  pageNum: Scalars['Int']['output'];
  parentId: Scalars['ID']['output'];
  s3Bucket: Scalars['String']['output'];
  s3Key: Scalars['String']['output'];
  sizeBytes?: Maybe<Scalars['Int']['output']>;
  tenantId: Scalars['ID']['output'];
  topLeftX: Scalars['Int']['output'];
  topLeftY: Scalars['Int']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type ImageConnection = {
  __typename?: 'ImageConnection';
  items: Array<Image>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

/** Trigger event for input nodes (e.g. EventBridge source/detailType). */
export type InputNodeConfig = {
  __typename?: 'InputNodeConfig';
  detailType: Scalars['String']['output'];
  source: Scalars['String']['output'];
};

export type InvestorProfile = Metadata & Node & {
  __typename?: 'InvestorProfile';
  averageDealSizeViewed?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['AWSDateTime']['output'];
  dealsDeclined?: Maybe<Scalars['AWSJSON']['output']>;
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  entityType: EntityType;
  explicitCriteria?: Maybe<Scalars['AWSJSON']['output']>;
  id: Scalars['ID']['output'];
  lastUpdated?: Maybe<Scalars['AWSDateTime']['output']>;
  ownerId: Scalars['ID']['output'];
  pastDealsViewed?: Maybe<Scalars['AWSJSON']['output']>;
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type Invitation = Metadata & Node & {
  __typename?: 'Invitation';
  createdAt: Scalars['AWSDateTime']['output'];
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  email: Scalars['String']['output'];
  entityType: EntityType;
  id: Scalars['ID']['output'];
  openedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  ownerId: Scalars['ID']['output'];
  parentId: Scalars['ID']['output'];
  role?: Maybe<DealRole>;
  sentAt?: Maybe<Scalars['AWSDateTime']['output']>;
  status: InvitationStatus;
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type InvitationConnection = {
  __typename?: 'InvitationConnection';
  items: Array<Invitation>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type InvitationStatus =
  | 'BOUNCED'
  | 'OPENED'
  | 'REGISTERED'
  | 'SENT';

export type InvoiceLineItem = {
  __typename?: 'InvoiceLineItem';
  description: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  total: Scalars['Float']['output'];
  unitAmount: Scalars['Float']['output'];
};

export type InvoiceLineItemInput = {
  description: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
  total: Scalars['Float']['input'];
  unitAmount: Scalars['Float']['input'];
};

export type InvoiceStatus =
  | 'DRAFT'
  | 'OPEN'
  | 'PAID'
  | 'UNCOLLECTIBLE'
  | 'VOID';

/**
 * Persistable JSON Schema definition for structured AI output.
 * Root entity with Shareable ownership: system-owned schemas are shared;
 * user copies are PRIVATE (copy-on-write via sourceJsonSchemaId).
 */
export type JsonSchema = Metadata & Node & Shareable & {
  __typename?: 'JsonSchema';
  accessList?: Maybe<ResourceShareConnection>;
  createdAt: Scalars['AWSDateTime']['output'];
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  entityType: EntityType;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  ownerId: Scalars['ID']['output'];
  /** JSON Schema definition (OpenAPI 3.0 / JSON Schema draft-07 compatible). Stored as AWSJSON. */
  schemaDefinition: Scalars['AWSJSON']['output'];
  sharingMode: SharingMode;
  /** When set, this schema is a user-owned copy forked from another (the original remains shared). */
  sourceJsonSchemaId?: Maybe<Scalars['ID']['output']>;
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};


/**
 * Persistable JSON Schema definition for structured AI output.
 * Root entity with Shareable ownership: system-owned schemas are shared;
 * user copies are PRIVATE (copy-on-write via sourceJsonSchemaId).
 */
export type JsonSchemaAccessListArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};

export type JsonSchemaConnection = {
  __typename?: 'JsonSchemaConnection';
  items: Array<JsonSchema>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type ListScope =
  | 'ALL_TENANT'
  | 'OWNED_BY_ME'
  | 'SHARED_WITH_ME';

export type MatchScore = Metadata & Node & {
  __typename?: 'MatchScore';
  computedAt: Scalars['AWSDateTime']['output'];
  createdAt: Scalars['AWSDateTime']['output'];
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  entityType: EntityType;
  id: Scalars['ID']['output'];
  ownerId: Scalars['ID']['output'];
  parentId: Scalars['ID']['output'];
  rationaleText?: Maybe<Scalars['String']['output']>;
  score: Scalars['Float']['output'];
  suggestedAction?: Maybe<Scalars['String']['output']>;
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
  userId: Scalars['ID']['output'];
};

export type MatchScoreConnection = {
  __typename?: 'MatchScoreConnection';
  items: Array<MatchScore>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type Metadata = {
  createdAt: Scalars['AWSDateTime']['output'];
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  entityType: EntityType;
  id: Scalars['ID']['output'];
  ownerId: Scalars['ID']['output'];
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type MicroInterview = Metadata & Node & {
  __typename?: 'MicroInterview';
  createdAt: Scalars['AWSDateTime']['output'];
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  entityType: EntityType;
  id: Scalars['ID']['output'];
  ownerId: Scalars['ID']['output'];
  parentId: Scalars['ID']['output'];
  questionId?: Maybe<Scalars['String']['output']>;
  questionText: Scalars['String']['output'];
  respondedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  response?: Maybe<Scalars['String']['output']>;
  shownAt?: Maybe<Scalars['AWSDateTime']['output']>;
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
  userId: Scalars['ID']['output'];
};

export type MicroInterviewConnection = {
  __typename?: 'MicroInterviewConnection';
  items: Array<MicroInterview>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  cancelWorkflowExecution?: Maybe<WorkflowExecution>;
  completeWorkflowExecution?: Maybe<WorkflowExecution>;
  completeWorkflowNodeExecution?: Maybe<WorkflowNodeExecution>;
  createAIQueryExecution: AiQueryExecution;
  createAnnouncement?: Maybe<Announcement>;
  createAuditLogEntry?: Maybe<AuditLogEntry>;
  createBillingInvoice?: Maybe<BillingInvoice>;
  createDashboardLayout?: Maybe<DashboardLayout>;
  createDealRoomMember?: Maybe<DealRoomMember>;
  createDealTemplate?: Maybe<DealTemplate>;
  createDoclink?: Maybe<Doclink>;
  createDocument?: Maybe<Document>;
  createImage?: Maybe<Image>;
  createInvestorProfile?: Maybe<InvestorProfile>;
  createInvitation?: Maybe<Invitation>;
  createInvoice?: Maybe<BillingInvoicePayload>;
  createJsonSchema?: Maybe<JsonSchema>;
  createMatchScore?: Maybe<MatchScore>;
  createMicroInterview?: Maybe<MicroInterview>;
  createNDAAgreement?: Maybe<NdaAgreement>;
  createNotification?: Maybe<Notification>;
  createProject?: Maybe<Project>;
  createPrompt?: Maybe<Prompt>;
  createQuestion?: Maybe<Question>;
  createScan?: Maybe<Scan>;
  createTable?: Maybe<Table>;
  createText?: Maybe<Text>;
  createUsageRecord?: Maybe<UsageRecord>;
  createWorkflow?: Maybe<Workflow>;
  createWorkflowExecution?: Maybe<WorkflowExecution>;
  createWorkflowNodeExecution?: Maybe<WorkflowNodeExecution>;
  deleteAIQueryExecution?: Maybe<AiQueryExecution>;
  deleteAnnouncement?: Maybe<Announcement>;
  deleteDealRoomMember?: Maybe<DealRoomMember>;
  deleteDealTemplate?: Maybe<DealTemplate>;
  deleteDoclink?: Maybe<Doclink>;
  deleteDocument?: Maybe<Document>;
  deleteEntityDefinition?: Maybe<EntityDefinition>;
  deleteEntityInstance?: Maybe<EntityInstance>;
  deleteImage?: Maybe<Image>;
  deleteInvitation?: Maybe<Invitation>;
  deleteJsonSchema?: Maybe<JsonSchema>;
  deleteNDAAgreement?: Maybe<NdaAgreement>;
  deleteNotification?: Maybe<Notification>;
  deleteProject?: Maybe<Project>;
  deletePrompt?: Maybe<Prompt>;
  deleteQuestion?: Maybe<Question>;
  deleteScan?: Maybe<Scan>;
  deleteTable?: Maybe<Table>;
  deleteText?: Maybe<Text>;
  deleteWorkflow?: Maybe<Workflow>;
  deleteWorkflowExecution?: Maybe<WorkflowExecution>;
  deleteWorkflowNodeExecution?: Maybe<WorkflowNodeExecution>;
  failWorkflowExecution?: Maybe<WorkflowExecution>;
  failWorkflowNodeExecution?: Maybe<WorkflowNodeExecution>;
  /** Uses AI to generate a production-quality prompt and JSON schema from a plain-English description. Returns synchronously. */
  generatePromptDraft?: Maybe<GeneratePromptDraftOutput>;
  restoreProject?: Maybe<Project>;
  retryWorkflowExecution?: Maybe<WorkflowExecution>;
  retryWorkflowNodeExecution?: Maybe<WorkflowNodeExecution>;
  saveEntityDefinition?: Maybe<EntityDefinition>;
  saveEntityInstance?: Maybe<EntityInstance>;
  startWorkflowExecution?: Maybe<WorkflowExecution>;
  startWorkflowNodeExecution?: Maybe<WorkflowNodeExecution>;
  /** Submits the prompt for execution (creates AIQueryExecution PENDING, enqueues SQS). Worker runs Gemini and updates execution; subscribe to onUpdateAIQueryExecution(id) for result. */
  submitAIQuery: AiQueryExecution;
  /** Updates an AIQueryExecution (used by worker after Gemini completes). Returns immediately with status PENDING; subscribe to onUpdateAIQueryExecution(id) for result. */
  updateAIQueryExecution?: Maybe<AiQueryExecution>;
  updateAccountCredits?: Maybe<AccountCredits>;
  updateAnnouncement?: Maybe<Announcement>;
  updateDashboardLayout?: Maybe<DashboardLayout>;
  updateDealRoomMember?: Maybe<DealRoomMember>;
  updateDealTemplate?: Maybe<DealTemplate>;
  updateDoclink?: Maybe<Doclink>;
  updateDocument?: Maybe<Document>;
  updateImage?: Maybe<Image>;
  updateInvestorProfile?: Maybe<InvestorProfile>;
  updateInvitation?: Maybe<Invitation>;
  updateJsonSchema?: Maybe<JsonSchema>;
  updateMicroInterview?: Maybe<MicroInterview>;
  updateNDAAgreement?: Maybe<NdaAgreement>;
  updateNotification?: Maybe<Notification>;
  updateProject?: Maybe<Project>;
  updatePrompt?: Maybe<Prompt>;
  updateQuestion?: Maybe<Question>;
  updateScan?: Maybe<Scan>;
  updateTable?: Maybe<Table>;
  updateTenantQuota?: Maybe<TenantQuota>;
  updateText?: Maybe<Text>;
  updateWorkflow?: Maybe<Workflow>;
  updateWorkflowExecution?: Maybe<WorkflowExecution>;
  updateWorkflowNodeExecution?: Maybe<WorkflowNodeExecution>;
};


export type MutationCancelWorkflowExecutionArgs = {
  key: CompositeKeyInput;
};


export type MutationCompleteWorkflowExecutionArgs = {
  key: CompositeKeyInput;
  outputData?: InputMaybe<Scalars['AWSJSON']['input']>;
};


export type MutationCompleteWorkflowNodeExecutionArgs = {
  key: CompositeKeyInput;
  outputData?: InputMaybe<Scalars['AWSJSON']['input']>;
};


export type MutationCreateAiQueryExecutionArgs = {
  input: CreateAiQueryExecutionInput;
};


export type MutationCreateAnnouncementArgs = {
  input: CreateAnnouncementInput;
};


export type MutationCreateAuditLogEntryArgs = {
  input: CreateAuditLogEntryInput;
};


export type MutationCreateBillingInvoiceArgs = {
  input: CreateBillingInvoiceInput;
};


export type MutationCreateDashboardLayoutArgs = {
  input: CreateDashboardLayoutInput;
};


export type MutationCreateDealRoomMemberArgs = {
  input: CreateDealRoomMemberInput;
};


export type MutationCreateDealTemplateArgs = {
  input: CreateDealTemplateInput;
};


export type MutationCreateDoclinkArgs = {
  input: CreateDoclinkInput;
};


export type MutationCreateDocumentArgs = {
  input: CreateDocumentInput;
};


export type MutationCreateImageArgs = {
  input: CreateImageInput;
};


export type MutationCreateInvestorProfileArgs = {
  input: CreateInvestorProfileInput;
};


export type MutationCreateInvitationArgs = {
  input: CreateInvitationInput;
};


export type MutationCreateInvoiceArgs = {
  input: CreateInvoiceInput;
};


export type MutationCreateJsonSchemaArgs = {
  input: CreateJsonSchemaInput;
};


export type MutationCreateMatchScoreArgs = {
  input: CreateMatchScoreInput;
};


export type MutationCreateMicroInterviewArgs = {
  input: CreateMicroInterviewInput;
};


export type MutationCreateNdaAgreementArgs = {
  input: CreateNdaAgreementInput;
};


export type MutationCreateNotificationArgs = {
  input: CreateNotificationInput;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationCreatePromptArgs = {
  input: CreatePromptInput;
};


export type MutationCreateQuestionArgs = {
  input: CreateQuestionInput;
};


export type MutationCreateScanArgs = {
  input: CreateScanInput;
};


export type MutationCreateTableArgs = {
  input: CreateTableInput;
};


export type MutationCreateTextArgs = {
  input: CreateTextInput;
};


export type MutationCreateUsageRecordArgs = {
  input: CreateUsageRecordInput;
};


export type MutationCreateWorkflowArgs = {
  input: CreateWorkflowInput;
};


export type MutationCreateWorkflowExecutionArgs = {
  input: CreateWorkflowExecutionInput;
};


export type MutationCreateWorkflowNodeExecutionArgs = {
  input: CreateWorkflowNodeExecutionInput;
};


export type MutationDeleteAiQueryExecutionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteAnnouncementArgs = {
  key: CompositeKeyInput;
};


export type MutationDeleteDealRoomMemberArgs = {
  key: CompositeKeyInput;
};


export type MutationDeleteDealTemplateArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteDoclinkArgs = {
  key: CompositeKeyInput;
};


export type MutationDeleteDocumentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteEntityDefinitionArgs = {
  id: Scalars['ID']['input'];
  projectId: Scalars['ID']['input'];
};


export type MutationDeleteEntityInstanceArgs = {
  id: Scalars['ID']['input'];
  projectId: Scalars['ID']['input'];
};


export type MutationDeleteImageArgs = {
  key: CompositeKeyInput;
};


export type MutationDeleteInvitationArgs = {
  key: CompositeKeyInput;
};


export type MutationDeleteJsonSchemaArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteNdaAgreementArgs = {
  key: CompositeKeyInput;
};


export type MutationDeleteNotificationArgs = {
  key: CompositeKeyInput;
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePromptArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteQuestionArgs = {
  key: CompositeKeyInput;
};


export type MutationDeleteScanArgs = {
  key: CompositeKeyInput;
};


export type MutationDeleteTableArgs = {
  key: CompositeKeyInput;
};


export type MutationDeleteTextArgs = {
  key: CompositeKeyInput;
};


export type MutationDeleteWorkflowArgs = {
  key: CompositeKeyInput;
};


export type MutationDeleteWorkflowExecutionArgs = {
  key: CompositeKeyInput;
};


export type MutationDeleteWorkflowNodeExecutionArgs = {
  key: CompositeKeyInput;
};


export type MutationFailWorkflowExecutionArgs = {
  errorDetails?: InputMaybe<Scalars['AWSJSON']['input']>;
  errorMessage: Scalars['String']['input'];
  key: CompositeKeyInput;
};


export type MutationFailWorkflowNodeExecutionArgs = {
  errorDetails?: InputMaybe<Scalars['AWSJSON']['input']>;
  errorMessage: Scalars['String']['input'];
  key: CompositeKeyInput;
};


export type MutationGeneratePromptDraftArgs = {
  input: GeneratePromptDraftInput;
};


export type MutationRestoreProjectArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRetryWorkflowExecutionArgs = {
  key: CompositeKeyInput;
};


export type MutationRetryWorkflowNodeExecutionArgs = {
  key: CompositeKeyInput;
};


export type MutationSaveEntityDefinitionArgs = {
  input: SaveEntityDefinitionInput;
};


export type MutationSaveEntityInstanceArgs = {
  input: SaveInstanceInput;
};


export type MutationStartWorkflowExecutionArgs = {
  key: CompositeKeyInput;
};


export type MutationStartWorkflowNodeExecutionArgs = {
  key: CompositeKeyInput;
};


export type MutationSubmitAiQueryArgs = {
  input: CreateAiQueryExecutionInput;
};


export type MutationUpdateAiQueryExecutionArgs = {
  id: Scalars['ID']['input'];
  input: UpdateAiQueryExecutionInput;
};


export type MutationUpdateAccountCreditsArgs = {
  id: Scalars['ID']['input'];
  input: UpdateAccountCreditsInput;
};


export type MutationUpdateAnnouncementArgs = {
  input: UpdateAnnouncementInput;
  key: CompositeKeyInput;
};


export type MutationUpdateDashboardLayoutArgs = {
  input: UpdateDashboardLayoutInput;
  key: CompositeKeyInput;
};


export type MutationUpdateDealRoomMemberArgs = {
  input: UpdateDealRoomMemberInput;
  key: CompositeKeyInput;
};


export type MutationUpdateDealTemplateArgs = {
  id: Scalars['ID']['input'];
  input: UpdateDealTemplateInput;
};


export type MutationUpdateDoclinkArgs = {
  input: UpdateDoclinkInput;
  key: CompositeKeyInput;
};


export type MutationUpdateDocumentArgs = {
  id: Scalars['ID']['input'];
  input: UpdateDocumentInput;
};


export type MutationUpdateImageArgs = {
  input: UpdateImageInput;
  key: CompositeKeyInput;
};


export type MutationUpdateInvestorProfileArgs = {
  id: Scalars['ID']['input'];
  input: UpdateInvestorProfileInput;
};


export type MutationUpdateInvitationArgs = {
  input: UpdateInvitationInput;
  key: CompositeKeyInput;
};


export type MutationUpdateJsonSchemaArgs = {
  id: Scalars['ID']['input'];
  input: UpdateJsonSchemaInput;
};


export type MutationUpdateMicroInterviewArgs = {
  input: UpdateMicroInterviewInput;
  key: CompositeKeyInput;
};


export type MutationUpdateNdaAgreementArgs = {
  input: UpdateNdaAgreementInput;
  key: CompositeKeyInput;
};


export type MutationUpdateNotificationArgs = {
  input: UpdateNotificationInput;
  key: CompositeKeyInput;
};


export type MutationUpdateProjectArgs = {
  id: Scalars['ID']['input'];
  input: UpdateProjectInput;
};


export type MutationUpdatePromptArgs = {
  id: Scalars['ID']['input'];
  input: UpdatePromptInput;
};


export type MutationUpdateQuestionArgs = {
  input: UpdateQuestionInput;
  key: CompositeKeyInput;
};


export type MutationUpdateScanArgs = {
  input: UpdateScanInput;
  key: CompositeKeyInput;
};


export type MutationUpdateTableArgs = {
  input: UpdateTableInput;
  key: CompositeKeyInput;
};


export type MutationUpdateTenantQuotaArgs = {
  id: Scalars['ID']['input'];
  input: UpdateTenantQuotaInput;
};


export type MutationUpdateTextArgs = {
  input: UpdateTextInput;
  key: CompositeKeyInput;
};


export type MutationUpdateWorkflowArgs = {
  input: UpdateWorkflowInput;
  key: CompositeKeyInput;
};


export type MutationUpdateWorkflowExecutionArgs = {
  input: UpdateWorkflowExecutionInput;
  key: CompositeKeyInput;
};


export type MutationUpdateWorkflowNodeExecutionArgs = {
  input: UpdateWorkflowNodeExecutionInput;
  key: CompositeKeyInput;
};

export type NdaAgreement = Metadata & Node & {
  __typename?: 'NDAAgreement';
  createdAt: Scalars['AWSDateTime']['output'];
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  entityType: EntityType;
  id: Scalars['ID']['output'];
  ownerId: Scalars['ID']['output'];
  parentId: Scalars['ID']['output'];
  signedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  signedDocumentId?: Maybe<Scalars['ID']['output']>;
  status: NdaStatus;
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
  userId: Scalars['ID']['output'];
};

export type NdaAgreementConnection = {
  __typename?: 'NDAAgreementConnection';
  items: Array<NdaAgreement>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type NdaStatus =
  | 'PENDING'
  | 'SIGNED';

export type Node = {
  id: Scalars['ID']['output'];
};

export type Notification = Metadata & Node & {
  __typename?: 'Notification';
  createdAt: Scalars['AWSDateTime']['output'];
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  entityType: EntityType;
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  ownerId: Scalars['ID']['output'];
  parentId: Scalars['ID']['output'];
  properties?: Maybe<Scalars['AWSJSON']['output']>;
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type NotificationConnection = {
  __typename?: 'NotificationConnection';
  items: Array<Notification>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type ProcessNodeConfig = {
  __typename?: 'ProcessNodeConfig';
  options?: Maybe<Scalars['AWSJSON']['output']>;
  staticOutput?: Maybe<Scalars['AWSJSON']['output']>;
};

export type ProcessNodeConfigInput = {
  options?: InputMaybe<Scalars['AWSJSON']['input']>;
  staticOutput?: InputMaybe<Scalars['AWSJSON']['input']>;
};

export type Project = Metadata & Node & Shareable & {
  __typename?: 'Project';
  accessList?: Maybe<ResourceShareConnection>;
  announcements?: Maybe<AnnouncementConnection>;
  auditlogentries?: Maybe<AuditLogEntryConnection>;
  brokerContactEmail?: Maybe<Scalars['String']['output']>;
  brokerContactName?: Maybe<Scalars['String']['output']>;
  brokerContactPhone?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['AWSDateTime']['output'];
  dashboardlayouts?: Maybe<DashboardLayoutConnection>;
  dealTags?: Maybe<Scalars['AWSJSON']['output']>;
  dealroommembers?: Maybe<DealRoomMemberConnection>;
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  doclinks?: Maybe<DoclinkConnection>;
  entityType: EntityType;
  headline?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  invitations?: Maybe<InvitationConnection>;
  logoUrl?: Maybe<Scalars['String']['output']>;
  mapEmbedUrl?: Maybe<Scalars['String']['output']>;
  matchscores?: Maybe<MatchScoreConnection>;
  microinterviews?: Maybe<MicroInterviewConnection>;
  name: Scalars['String']['output'];
  ndagreements?: Maybe<NdaAgreementConnection>;
  notifications?: Maybe<NotificationConnection>;
  ownerId: Scalars['ID']['output'];
  photoUrls?: Maybe<Array<Scalars['String']['output']>>;
  primaryColor?: Maybe<Scalars['String']['output']>;
  /**
   * Deprecated: Prompts are no longer scoped to a project. Use listPrompts(scope) instead.
   * Returns empty list for backward compatibility with clients that still request this field.
   */
  prompts?: Maybe<PromptConnection>;
  questions?: Maybe<QuestionConnection>;
  secondaryColor?: Maybe<Scalars['String']['output']>;
  sharingMode: SharingMode;
  status: ProjectStatus;
  summary?: Maybe<Scalars['String']['output']>;
  tenantId: Scalars['ID']['output'];
  topics?: Maybe<TopicConnection>;
  updatedAt: Scalars['AWSDateTime']['output'];
  workflows?: Maybe<WorkflowConnection>;
};


export type ProjectAccessListArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type ProjectAnnouncementsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type ProjectAuditlogentriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type ProjectDashboardlayoutsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type ProjectDealroommembersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type ProjectDoclinksArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type ProjectInvitationsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type ProjectMatchscoresArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type ProjectMicrointerviewsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type ProjectNdagreementsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type ProjectNotificationsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type ProjectPromptsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type ProjectQuestionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type ProjectTopicsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type ProjectWorkflowsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};

export type ProjectConnection = {
  __typename?: 'ProjectConnection';
  items: Array<Project>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type ProjectStatus =
  | 'ACTIVE'
  | 'ARCHIVED'
  | 'DELETED'
  | 'DRAFT'
  | 'PUBLISHED';

/**
 * AI Studio prompt (formerly PromptTemplate). Versioned instruction set for the AI.
 * Root entity: accessible by any project and any user. User-owned copies link via sourcePromptId.
 */
export type Prompt = Metadata & Node & Shareable & {
  __typename?: 'Prompt';
  accessList?: Maybe<ResourceShareConnection>;
  createdAt: Scalars['AWSDateTime']['output'];
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  entityType: EntityType;
  id: Scalars['ID']['output'];
  /** Variable names; read-only/derived when not provided on create. */
  inputVariables?: Maybe<Array<Scalars['String']['output']>>;
  /** When false, prompt may be excluded from lists or execution; reserved for future use. */
  isActive?: Maybe<Scalars['Boolean']['output']>;
  /** Reference to a persisted JsonSchema entity defining the structured output schema for this prompt. */
  jsonSchemaId?: Maybe<Scalars['ID']['output']>;
  /** Read-only; derived from prompt when possible. */
  model: AiModel;
  /** When set, this prompt is a user-owned copy forked from another (the original remains shared). */
  name: Scalars['String']['output'];
  ownerId: Scalars['ID']['output'];
  /** Main user prompt text; may contain {{ variableName }} placeholders. */
  prompt: Scalars['String']['output'];
  sharingMode: SharingMode;
  /** Optional system instruction for the model. */
  systemInstruction?: Maybe<Scalars['String']['output']>;
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
  /** Server-managed version number; reserved for future use. */
  version?: Maybe<Scalars['Int']['output']>;
};


/**
 * AI Studio prompt (formerly PromptTemplate). Versioned instruction set for the AI.
 * Root entity: accessible by any project and any user. User-owned copies link via sourcePromptId.
 */
export type PromptAccessListArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};

export type PromptConnection = {
  __typename?: 'PromptConnection';
  items: Array<Prompt>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

/** Structured content for a prompt. Replaces templateText. */
export type PromptContent = {
  __typename?: 'PromptContent';
  /** Main user prompt text; may contain {{ variableName }} placeholders. */
  body: Scalars['String']['output'];
  /** Variable names; read-only/derived when not provided on create. */
  inputVariables?: Maybe<Array<Scalars['String']['output']>>;
  /** Optional system instruction for the model. */
  systemInstruction?: Maybe<Scalars['String']['output']>;
};

export type PropertyDataType =
  | 'BOOLEAN'
  | 'CALCULATION'
  | 'DATE'
  | 'NUMBER'
  | 'STRING';

export type PropertyDefinition = {
  __typename?: 'PropertyDefinition';
  dataType: PropertyDataType;
  dependencies?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  description?: Maybe<Scalars['String']['output']>;
  formula?: Maybe<Scalars['String']['output']>;
  isList?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  path: Scalars['String']['output'];
};

export type PropertyDefinitionInput = {
  dataType: PropertyDataType;
  dependencies?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  formula?: InputMaybe<Scalars['String']['input']>;
  isList?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  path: Scalars['String']['input'];
};

export type PropertyValue = {
  __typename?: 'PropertyValue';
  booleanValue?: Maybe<Scalars['Boolean']['output']>;
  confidenceScore?: Maybe<Scalars['Float']['output']>;
  dateValue?: Maybe<Scalars['AWSDate']['output']>;
  extractedByAI?: Maybe<Scalars['Boolean']['output']>;
  numberValue?: Maybe<Scalars['Float']['output']>;
  propertyName: Scalars['String']['output'];
  sourceEvidence?: Maybe<Scalars['String']['output']>;
  stringValue?: Maybe<Scalars['String']['output']>;
};

export type PropertyValueInput = {
  booleanValue?: InputMaybe<Scalars['Boolean']['input']>;
  confidenceScore?: InputMaybe<Scalars['Float']['input']>;
  dateValue?: InputMaybe<Scalars['AWSDate']['input']>;
  extractedByAI?: InputMaybe<Scalars['Boolean']['input']>;
  numberValue?: InputMaybe<Scalars['Float']['input']>;
  propertyName: Scalars['String']['input'];
  sourceEvidence?: InputMaybe<Scalars['String']['input']>;
  stringValue?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  /** Get a single AIQueryExecution by id. */
  getAIQueryExecution?: Maybe<AiQueryExecution>;
  getAccountCredits?: Maybe<AccountCredits>;
  getAnnouncement?: Maybe<Announcement>;
  /** Get a single AuditLogEntry. Requires composite key (ID + ParentID) for access. */
  getAuditLogEntry?: Maybe<AuditLogEntry>;
  getBillingInvoice?: Maybe<BillingInvoice>;
  getDashboardLayout?: Maybe<DashboardLayout>;
  /** Get a single DealRoomMember. Requires composite key (ID + ParentID) for access. */
  getDealRoomMember?: Maybe<DealRoomMember>;
  getDealTemplate?: Maybe<DealTemplate>;
  /** Get a single Doclink. Requires composite key (ID + ParentID) for access. */
  getDoclink?: Maybe<Doclink>;
  getDocument?: Maybe<Document>;
  /** Per-document view/download analytics for a deal. */
  getDocumentAnalytics?: Maybe<DocumentAnalytics>;
  getEntityDefinition?: Maybe<EntityDefinition>;
  getEntityDefinitionByHash?: Maybe<EntityDefinition>;
  getEntityInstance?: Maybe<EntityInstance>;
  /** Get a single Image. Requires composite key (ID + ParentID) for access. */
  getImage?: Maybe<Image>;
  getInvestorProfile?: Maybe<InvestorProfile>;
  /** Get a single Invitation. Requires composite key (ID + ParentID) for access. */
  getInvitation?: Maybe<Invitation>;
  /** Get a single JsonSchema by ID (root entity). */
  getJsonSchema?: Maybe<JsonSchema>;
  getMatchScore?: Maybe<MatchScore>;
  getMicroInterview?: Maybe<MicroInterview>;
  /** Get a single NDAAgreement. Requires composite key (ID + ParentID) for access. */
  getNDAAgreement?: Maybe<NdaAgreement>;
  /** Get a single Notification. Requires composite key (ID + ParentID) for access. */
  getNotification?: Maybe<Notification>;
  getProject?: Maybe<Project>;
  /** Get a single Prompt by ID (root entity). */
  getPrompt?: Maybe<Prompt>;
  getQuestion?: Maybe<Question>;
  /** Get a single Scan. Requires composite key (ID + ParentID) for access. */
  getScan?: Maybe<Scan>;
  /** Get a single Table. Requires composite key (ID + ParentID) for access. */
  getTable?: Maybe<Table>;
  getTenantQuota?: Maybe<TenantQuota>;
  /** Get a single Text. Requires composite key (ID + ParentID) for access. */
  getText?: Maybe<Text>;
  /** Get a single Workflow. Requires composite key (ID + ParentID) for access. */
  getWorkflow?: Maybe<Workflow>;
  /** Get a single WorkflowExecution. Requires composite key (ID + ParentID) for access. */
  getWorkflowExecution?: Maybe<WorkflowExecution>;
  /** Get a single WorkflowNodeExecution. Requires composite key (ID + ParentID) for access. */
  getWorkflowNodeExecution?: Maybe<WorkflowNodeExecution>;
  /** List AI execution history, optionally filtered by promptId. */
  listAIQueryExecutions: AiQueryExecutionConnection;
  listAnnouncements: AnnouncementConnection;
  /** List AuditLogEntries for a specific Deal (Project). For broker activity log / compliance. */
  listAuditLogEntrys: AuditLogEntryConnection;
  listBillingInvoices: BillingInvoiceConnection;
  /** List buyer engagement scores for a deal (aggregated from AuditLogEntry). For broker heatmap/shortlist. */
  listBuyerEngagements: Array<BuyerEngagement>;
  listDashboardLayouts: DashboardLayoutConnection;
  /** List DealRoomMembers for a specific Deal (Project). */
  listDealRoomMembers: DealRoomMemberConnection;
  listDealTemplates: DealTemplateConnection;
  /** List Doclinks for a specific Project. Uses GSI1 (The View). */
  listDoclinks: DoclinkConnection;
  listDocuments: DocumentConnection;
  listEntityDefinitions?: Maybe<Array<Maybe<EntityDefinition>>>;
  listEntityInstances?: Maybe<Array<Maybe<EntityInstance>>>;
  listEntityInstancesByDefinition?: Maybe<Array<Maybe<EntityInstance>>>;
  /** List Images for a specific Document. Uses GSI1 (The View). */
  listImages: ImageConnection;
  /** List Invitations for a specific Deal (Project). */
  listInvitations: InvitationConnection;
  /** List JsonSchemas by scope. Defaults to ALL_TENANT so users see both system and their own schemas. */
  listJsonSchemas: JsonSchemaConnection;
  listMatchScores: MatchScoreConnection;
  listMicroInterviews: MicroInterviewConnection;
  /** List NDAAgreements for a specific Deal (Project). Used for NDA gate check. */
  listNDAAgreements: NdaAgreementConnection;
  /** List Notifications for a specific Project. Uses GSI1 (The View). */
  listNotifications: NotificationConnection;
  listProjects: ProjectConnection;
  /** List Prompts by scope (OWNED_BY_ME, SHARED_WITH_ME, ALL_TENANT). */
  listPrompts: PromptConnection;
  listQuestions: QuestionConnection;
  /** List Scans for a specific Document. Uses GSI1 (The View). */
  listScans: ScanConnection;
  /** List Tables for a specific Document. Uses GSI1 (The View). */
  listTables: TableConnection;
  /** List Texts for a specific Document. Uses GSI1 (The View). */
  listTexts: TextConnection;
  listUsageRecords: UsageRecordConnection;
  /** List WorkflowExecutions for a specific Workflow. Uses main table query. */
  listWorkflowExecutions: WorkflowExecutionConnection;
  /** List WorkflowNodeExecutions for a specific WorkflowExecution. Uses main table query. */
  listWorkflowNodeExecutions: WorkflowNodeExecutionConnection;
  /** List Workflows for a specific Project. Uses main table query. */
  listWorkflows: WorkflowConnection;
  /**
   * Full-text search within a deal (OCR text in Text entities). DynamoDB + FilterExpression.
   * Implement via Lambda that queries Text by deal documentIds and filters by contains(text, query).
   */
  searchDocuments: Array<DocumentSearchResult>;
};


export type QueryGetAiQueryExecutionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetAccountCreditsArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetAnnouncementArgs = {
  key: CompositeKeyInput;
};


export type QueryGetAuditLogEntryArgs = {
  key: CompositeKeyInput;
};


export type QueryGetBillingInvoiceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetDashboardLayoutArgs = {
  key: CompositeKeyInput;
};


export type QueryGetDealRoomMemberArgs = {
  key: CompositeKeyInput;
};


export type QueryGetDealTemplateArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetDoclinkArgs = {
  key: CompositeKeyInput;
};


export type QueryGetDocumentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetDocumentAnalyticsArgs = {
  dealId: Scalars['ID']['input'];
  documentId: Scalars['ID']['input'];
};


export type QueryGetEntityDefinitionArgs = {
  id: Scalars['ID']['input'];
  projectId: Scalars['ID']['input'];
};


export type QueryGetEntityDefinitionByHashArgs = {
  projectId: Scalars['ID']['input'];
  structuralHash: Scalars['String']['input'];
};


export type QueryGetEntityInstanceArgs = {
  id: Scalars['ID']['input'];
  projectId: Scalars['ID']['input'];
};


export type QueryGetImageArgs = {
  key: CompositeKeyInput;
};


export type QueryGetInvestorProfileArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetInvitationArgs = {
  key: CompositeKeyInput;
};


export type QueryGetJsonSchemaArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetMatchScoreArgs = {
  key: CompositeKeyInput;
};


export type QueryGetMicroInterviewArgs = {
  key: CompositeKeyInput;
};


export type QueryGetNdaAgreementArgs = {
  key: CompositeKeyInput;
};


export type QueryGetNotificationArgs = {
  key: CompositeKeyInput;
};


export type QueryGetProjectArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetPromptArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetQuestionArgs = {
  key: CompositeKeyInput;
};


export type QueryGetScanArgs = {
  key: CompositeKeyInput;
};


export type QueryGetTableArgs = {
  key: CompositeKeyInput;
};


export type QueryGetTenantQuotaArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetTextArgs = {
  key: CompositeKeyInput;
};


export type QueryGetWorkflowArgs = {
  key: CompositeKeyInput;
};


export type QueryGetWorkflowExecutionArgs = {
  key: CompositeKeyInput;
};


export type QueryGetWorkflowNodeExecutionArgs = {
  key: CompositeKeyInput;
};


export type QueryListAiQueryExecutionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  promptId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryListAnnouncementsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  parentId: Scalars['ID']['input'];
};


export type QueryListAuditLogEntrysArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  parentId: Scalars['ID']['input'];
};


export type QueryListBillingInvoicesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<ListScope>;
  status?: InputMaybe<InvoiceStatus>;
};


export type QueryListBuyerEngagementsArgs = {
  dealId: Scalars['ID']['input'];
};


export type QueryListDashboardLayoutsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  parentId: Scalars['ID']['input'];
};


export type QueryListDealRoomMembersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  parentId: Scalars['ID']['input'];
};


export type QueryListDealTemplatesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type QueryListDoclinksArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  parentId: Scalars['ID']['input'];
};


export type QueryListDocumentsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type QueryListEntityDefinitionsArgs = {
  projectId: Scalars['ID']['input'];
};


export type QueryListEntityInstancesArgs = {
  projectId: Scalars['ID']['input'];
};


export type QueryListEntityInstancesByDefinitionArgs = {
  definitionId: Scalars['ID']['input'];
  projectId: Scalars['ID']['input'];
};


export type QueryListImagesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  parentId: Scalars['ID']['input'];
};


export type QueryListInvitationsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  parentId: Scalars['ID']['input'];
};


export type QueryListJsonSchemasArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<ListScope>;
};


export type QueryListMatchScoresArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  parentId: Scalars['ID']['input'];
};


export type QueryListMicroInterviewsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  parentId: Scalars['ID']['input'];
};


export type QueryListNdaAgreementsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  parentId: Scalars['ID']['input'];
};


export type QueryListNotificationsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  parentId: Scalars['ID']['input'];
};


export type QueryListProjectsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<ListScope>;
};


export type QueryListPromptsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<ListScope>;
};


export type QueryListQuestionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  parentId: Scalars['ID']['input'];
};


export type QueryListScansArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  parentId: Scalars['ID']['input'];
};


export type QueryListTablesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  parentId: Scalars['ID']['input'];
};


export type QueryListTextsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  parentId: Scalars['ID']['input'];
};


export type QueryListUsageRecordsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  tenantId: Scalars['ID']['input'];
};


export type QueryListWorkflowExecutionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  parentId: Scalars['ID']['input'];
  status?: InputMaybe<WorkflowExecutionStatus>;
};


export type QueryListWorkflowNodeExecutionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  parentId: Scalars['ID']['input'];
  status?: InputMaybe<WorkflowNodeExecutionStatus>;
};


export type QueryListWorkflowsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  parentId: Scalars['ID']['input'];
};


export type QuerySearchDocumentsArgs = {
  dealId: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};

export type Question = Metadata & Node & {
  __typename?: 'Question';
  answerText?: Maybe<Scalars['String']['output']>;
  answeredAt?: Maybe<Scalars['AWSDateTime']['output']>;
  authorId: Scalars['ID']['output'];
  createdAt: Scalars['AWSDateTime']['output'];
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  documentId?: Maybe<Scalars['ID']['output']>;
  entityType: EntityType;
  id: Scalars['ID']['output'];
  isPublic: Scalars['Boolean']['output'];
  ownerId: Scalars['ID']['output'];
  parentId: Scalars['ID']['output'];
  questionText: Scalars['String']['output'];
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type QuestionConnection = {
  __typename?: 'QuestionConnection';
  items: Array<Question>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type QuotaEnforcementPolicy =
  | 'HARD_LIMIT'
  | 'SOFT_LIMIT'
  | 'WARN_ONLY';

export type Relationship = {
  __typename?: 'Relationship';
  relationName: Scalars['String']['output'];
  targetInstanceId: Scalars['ID']['output'];
};

export type RelationshipInput = {
  relationName: Scalars['String']['input'];
  targetInstanceId: Scalars['ID']['input'];
};

export type ResourceShare = Metadata & Node & {
  __typename?: 'ResourceShare';
  createdAt: Scalars['AWSDateTime']['output'];
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  entityType: EntityType;
  id: Scalars['ID']['output'];
  ownerId: Scalars['ID']['output'];
  permission: SharePermission;
  recipientUserId: Scalars['ID']['output'];
  resourceTitle: Scalars['String']['output'];
  resourceType: EntityType;
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type ResourceShareConnection = {
  __typename?: 'ResourceShareConnection';
  items: Array<ResourceShare>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type SaveEntityDefinitionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  jsonSchema: Scalars['AWSJSON']['input'];
  name: Scalars['String']['input'];
  projectId: Scalars['ID']['input'];
  properties?: InputMaybe<Array<InputMaybe<PropertyDefinitionInput>>>;
};

export type SaveInstanceInput = {
  children?: InputMaybe<Array<InputMaybe<RelationshipInput>>>;
  definitionId: Scalars['ID']['input'];
  emitCompletionEvent?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  label?: InputMaybe<Scalars['String']['input']>;
  projectId: Scalars['ID']['input'];
  senderId: Scalars['String']['input'];
  values?: InputMaybe<Array<InputMaybe<PropertyValueInput>>>;
};

export type Scan = Metadata & Node & Storable & {
  __typename?: 'Scan';
  createdAt: Scalars['AWSDateTime']['output'];
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  entityType: EntityType;
  id: Scalars['ID']['output'];
  ownerId: Scalars['ID']['output'];
  parentId: Scalars['ID']['output'];
  s3Bucket: Scalars['String']['output'];
  s3Key: Scalars['String']['output'];
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type ScanConnection = {
  __typename?: 'ScanConnection';
  items: Array<Scan>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type SharePermission =
  | 'ADMIN'
  | 'EDIT'
  | 'VIEW';

export type Shareable = {
  accessList?: Maybe<ResourceShareConnection>;
  sharingMode: SharingMode;
};


export type ShareableAccessListArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};

export type SharingMode =
  | 'PRIVATE'
  | 'SPECIFIC_USERS'
  | 'TENANT_EDIT'
  | 'TENANT_VIEW';

export type Storable = {
  s3Bucket: Scalars['String']['output'];
  s3Key: Scalars['String']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  /** AI STUDIO: AIQueryExecution subscriptions (standard Node pattern). */
  onCreateAIQueryExecution?: Maybe<AiQueryExecution>;
  /** AI STUDIO: AIQueryExecution subscriptions filtered by client executionId (same underlying mutations as above). */
  onCreateAIQueryExecutionByExecutionId?: Maybe<AiQueryExecution>;
  /** DASHBOARD LAYOUT subscriptions */
  onCreateDashboardLayout?: Maybe<DashboardLayout>;
  /** DOCLINK SUBSCRIPTIONS */
  onCreateDoclink?: Maybe<Doclink>;
  /** DOCUMENT SUBSCRIPTIONS */
  onCreateDocument?: Maybe<Document>;
  /** IMAGE SUBSCRIPTIONS */
  onCreateImage?: Maybe<Image>;
  /** AI STUDIO: JsonSchema subscriptions */
  onCreateJsonSchema?: Maybe<JsonSchema>;
  /** NOTIFICATION SUBSCRIPTIONS */
  onCreateNotification?: Maybe<Notification>;
  /** PROJECT SUBSCRIPTIONS */
  onCreateProject?: Maybe<Project>;
  /** AI STUDIO: Prompt subscriptions */
  onCreatePrompt?: Maybe<Prompt>;
  /** SCAN SUBSCRIPTIONS */
  onCreateScan?: Maybe<Scan>;
  /** TABLE SUBSCRIPTIONS */
  onCreateTable?: Maybe<Table>;
  /** TEXT SUBSCRIPTIONS */
  onCreateText?: Maybe<Text>;
  /** WORKFLOW SUBSCRIPTIONS */
  onCreateWorkflow?: Maybe<Workflow>;
  /** WORKFLOW EXECUTION SUBSCRIPTIONS */
  onCreateWorkflowExecution?: Maybe<WorkflowExecution>;
  /** WORKFLOW NODE EXECUTION SUBSCRIPTIONS */
  onCreateWorkflowNodeExecution?: Maybe<WorkflowNodeExecution>;
  onDefinitionDeleted?: Maybe<EntityDefinition>;
  onDefinitionSaved?: Maybe<EntityDefinition>;
  onDeleteAIQueryExecution?: Maybe<AiQueryExecution>;
  onDeleteAIQueryExecutionByExecutionId?: Maybe<AiQueryExecution>;
  onDeleteDoclink?: Maybe<Doclink>;
  onDeleteDocument?: Maybe<Document>;
  onDeleteImage?: Maybe<Image>;
  onDeleteJsonSchema?: Maybe<JsonSchema>;
  onDeleteNotification?: Maybe<Notification>;
  onDeleteProject?: Maybe<Project>;
  onDeletePrompt?: Maybe<Prompt>;
  onDeleteScan?: Maybe<Scan>;
  onDeleteTable?: Maybe<Table>;
  onDeleteText?: Maybe<Text>;
  onDeleteWorkflow?: Maybe<Workflow>;
  onInstanceDeleted?: Maybe<EntityInstance>;
  onInstanceUpdated?: Maybe<EntityInstance>;
  onProjectInstancesChanged?: Maybe<EntityInstance>;
  onRestoreProject?: Maybe<Project>;
  onUpdateAIQueryExecution?: Maybe<AiQueryExecution>;
  onUpdateAIQueryExecutionByExecutionId?: Maybe<AiQueryExecution>;
  onUpdateDashboardLayout?: Maybe<DashboardLayout>;
  onUpdateDoclink?: Maybe<Doclink>;
  onUpdateDocument?: Maybe<Document>;
  onUpdateImage?: Maybe<Image>;
  onUpdateJsonSchema?: Maybe<JsonSchema>;
  onUpdateNotification?: Maybe<Notification>;
  onUpdateProject?: Maybe<Project>;
  onUpdatePrompt?: Maybe<Prompt>;
  onUpdateScan?: Maybe<Scan>;
  onUpdateTable?: Maybe<Table>;
  onUpdateText?: Maybe<Text>;
  onUpdateWorkflow?: Maybe<Workflow>;
  onUpdateWorkflowExecution?: Maybe<WorkflowExecution>;
  onUpdateWorkflowNodeExecution?: Maybe<WorkflowNodeExecution>;
  onWorkflowExecutionStatusChange?: Maybe<WorkflowExecution>;
  onWorkflowNodeExecutionStatusChange?: Maybe<WorkflowNodeExecution>;
};


export type SubscriptionOnCreateAiQueryExecutionArgs = {
  promptId?: InputMaybe<Scalars['ID']['input']>;
};


export type SubscriptionOnCreateAiQueryExecutionByExecutionIdArgs = {
  executionId: Scalars['ID']['input'];
};


export type SubscriptionOnCreateDashboardLayoutArgs = {
  parentId?: InputMaybe<Scalars['ID']['input']>;
};


export type SubscriptionOnCreateDoclinkArgs = {
  parentId?: InputMaybe<Scalars['ID']['input']>;
};


export type SubscriptionOnCreateDocumentArgs = {
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  tenantId?: InputMaybe<Scalars['ID']['input']>;
};


export type SubscriptionOnCreateImageArgs = {
  parentId?: InputMaybe<Scalars['ID']['input']>;
};


export type SubscriptionOnCreateNotificationArgs = {
  parentId?: InputMaybe<Scalars['ID']['input']>;
};


export type SubscriptionOnCreateProjectArgs = {
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  tenantId?: InputMaybe<Scalars['ID']['input']>;
};


export type SubscriptionOnCreateScanArgs = {
  parentId?: InputMaybe<Scalars['ID']['input']>;
};


export type SubscriptionOnCreateTableArgs = {
  parentId?: InputMaybe<Scalars['ID']['input']>;
};


export type SubscriptionOnCreateTextArgs = {
  parentId?: InputMaybe<Scalars['ID']['input']>;
};


export type SubscriptionOnCreateWorkflowArgs = {
  parentId?: InputMaybe<Scalars['ID']['input']>;
};


export type SubscriptionOnCreateWorkflowExecutionArgs = {
  parentId: Scalars['ID']['input'];
};


export type SubscriptionOnCreateWorkflowNodeExecutionArgs = {
  parentId: Scalars['ID']['input'];
};


export type SubscriptionOnDefinitionDeletedArgs = {
  projectId: Scalars['ID']['input'];
};


export type SubscriptionOnDefinitionSavedArgs = {
  projectId: Scalars['ID']['input'];
};


export type SubscriptionOnDeleteAiQueryExecutionArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnDeleteAiQueryExecutionByExecutionIdArgs = {
  executionId: Scalars['ID']['input'];
};


export type SubscriptionOnDeleteDoclinkArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnDeleteDocumentArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnDeleteImageArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnDeleteJsonSchemaArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnDeleteNotificationArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnDeleteProjectArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnDeletePromptArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnDeleteScanArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnDeleteTableArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnDeleteTextArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnDeleteWorkflowArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnInstanceDeletedArgs = {
  projectId: Scalars['ID']['input'];
};


export type SubscriptionOnInstanceUpdatedArgs = {
  id: Scalars['ID']['input'];
  projectId: Scalars['ID']['input'];
};


export type SubscriptionOnProjectInstancesChangedArgs = {
  projectId: Scalars['ID']['input'];
};


export type SubscriptionOnRestoreProjectArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnUpdateAiQueryExecutionArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnUpdateAiQueryExecutionByExecutionIdArgs = {
  executionId: Scalars['ID']['input'];
};


export type SubscriptionOnUpdateDashboardLayoutArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnUpdateDoclinkArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnUpdateDocumentArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnUpdateImageArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnUpdateJsonSchemaArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnUpdateNotificationArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnUpdateProjectArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnUpdatePromptArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnUpdateScanArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnUpdateTableArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnUpdateTextArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnUpdateWorkflowArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnUpdateWorkflowExecutionArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnUpdateWorkflowNodeExecutionArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnWorkflowExecutionStatusChangeArgs = {
  parentId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<WorkflowExecutionStatus>;
};


export type SubscriptionOnWorkflowNodeExecutionStatusChangeArgs = {
  parentId: Scalars['ID']['input'];
};

export type Table = Metadata & Node & {
  __typename?: 'Table';
  createdAt: Scalars['AWSDateTime']['output'];
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  description: Scalars['String']['output'];
  entityType: EntityType;
  id: Scalars['ID']['output'];
  ownerId: Scalars['ID']['output'];
  pageNum: Scalars['Int']['output'];
  parentId: Scalars['ID']['output'];
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type TableConnection = {
  __typename?: 'TableConnection';
  items: Array<Table>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type TenantQuota = Metadata & Node & {
  __typename?: 'TenantQuota';
  createdAt: Scalars['AWSDateTime']['output'];
  currentMonthTokens: Scalars['Int']['output'];
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  enforcementPolicy: QuotaEnforcementPolicy;
  entityType: EntityType;
  id: Scalars['ID']['output'];
  monthlyTokenLimit?: Maybe<Scalars['Int']['output']>;
  ownerId: Scalars['ID']['output'];
  resetDay: Scalars['Int']['output'];
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type Text = Metadata & Node & {
  __typename?: 'Text';
  createdAt: Scalars['AWSDateTime']['output'];
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  entityType: EntityType;
  id: Scalars['ID']['output'];
  ownerId: Scalars['ID']['output'];
  pageNum: Scalars['Int']['output'];
  parentId: Scalars['ID']['output'];
  tenantId: Scalars['ID']['output'];
  text: Scalars['String']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type TextConnection = {
  __typename?: 'TextConnection';
  items: Array<Text>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type ToolsNodeConfig = {
  __typename?: 'ToolsNodeConfig';
  options?: Maybe<Scalars['AWSJSON']['output']>;
};

export type ToolsNodeConfigInput = {
  options?: InputMaybe<Scalars['AWSJSON']['input']>;
};

export type Topic = Metadata & Node & Shareable & {
  __typename?: 'Topic';
  accessList?: Maybe<ResourceShareConnection>;
  createdAt: Scalars['AWSDateTime']['output'];
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  entityType: EntityType;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  ownerId: Scalars['ID']['output'];
  parentId: Scalars['ID']['output'];
  sharingMode: SharingMode;
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};


export type TopicAccessListArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};

export type TopicConnection = {
  __typename?: 'TopicConnection';
  items: Array<Topic>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type UpdateAiQueryExecutionInput = {
  candidatesTokenCount?: InputMaybe<Scalars['Int']['input']>;
  durationMs?: InputMaybe<Scalars['Int']['input']>;
  errorCode?: InputMaybe<Scalars['String']['input']>;
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  executedAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Scalars['String']['input']>;
  promptTokenCount?: InputMaybe<Scalars['Int']['input']>;
  queuedAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  rawOutput?: InputMaybe<Scalars['String']['input']>;
  retryCount?: InputMaybe<Scalars['Int']['input']>;
  startedAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  status?: InputMaybe<ExecutionStatus>;
  statusMessage?: InputMaybe<Scalars['String']['input']>;
  totalTokenCount?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateAccountCreditsInput = {
  balance: Scalars['Int']['input'];
  stripeCustomerId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAnnouncementInput = {
  body?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDashboardLayoutInput = {
  state?: InputMaybe<Scalars['AWSJSON']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDealRoomMemberInput = {
  permissionSetIds?: InputMaybe<Array<Scalars['String']['input']>>;
  role?: InputMaybe<DealRole>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateDealTemplateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  structure?: InputMaybe<Scalars['AWSJSON']['input']>;
};

export type UpdateDoclinkInput = {
  displayOrder?: InputMaybe<Scalars['String']['input']>;
  filename?: InputMaybe<Scalars['String']['input']>;
  folderPath?: InputMaybe<Scalars['String']['input']>;
  linkType?: InputMaybe<DoclinkLinkType>;
  permissionSetIds?: InputMaybe<Array<Scalars['String']['input']>>;
  status?: InputMaybe<DoclinkStatus>;
};

export type UpdateDocumentInput = {
  fileHash?: InputMaybe<Scalars['String']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  s3Bucket?: InputMaybe<Scalars['String']['input']>;
  s3Key?: InputMaybe<Scalars['String']['input']>;
  sizeBytes?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateImageInput = {
  bottomRightX?: InputMaybe<Scalars['Int']['input']>;
  bottomRightY?: InputMaybe<Scalars['Int']['input']>;
  imageAnnotation?: InputMaybe<Scalars['AWSJSON']['input']>;
  imageId?: InputMaybe<Scalars['String']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  pageNum?: InputMaybe<Scalars['Int']['input']>;
  s3Bucket?: InputMaybe<Scalars['String']['input']>;
  s3Key?: InputMaybe<Scalars['String']['input']>;
  sizeBytes?: InputMaybe<Scalars['Int']['input']>;
  topLeftX?: InputMaybe<Scalars['Int']['input']>;
  topLeftY?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateInvestorProfileInput = {
  averageDealSizeViewed?: InputMaybe<Scalars['String']['input']>;
  dealsDeclined?: InputMaybe<Scalars['AWSJSON']['input']>;
  explicitCriteria?: InputMaybe<Scalars['AWSJSON']['input']>;
  pastDealsViewed?: InputMaybe<Scalars['AWSJSON']['input']>;
};

export type UpdateInvitationInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  openedAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  role?: InputMaybe<DealRole>;
  sentAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  status?: InputMaybe<InvitationStatus>;
};

export type UpdateJsonSchemaInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  /** JSON Schema definition (OpenAPI 3.0 / JSON Schema draft-07 compatible). Stored as AWSJSON. */
  schemaDefinition?: InputMaybe<Scalars['AWSJSON']['input']>;
  sharingMode?: InputMaybe<SharingMode>;
};

export type UpdateMicroInterviewInput = {
  respondedAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  response?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateNdaAgreementInput = {
  signedAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  signedDocumentId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<NdaStatus>;
};

export type UpdateNotificationInput = {
  message?: InputMaybe<Scalars['String']['input']>;
  properties?: InputMaybe<Scalars['AWSJSON']['input']>;
};

export type UpdateProjectInput = {
  brokerContactEmail?: InputMaybe<Scalars['String']['input']>;
  brokerContactName?: InputMaybe<Scalars['String']['input']>;
  brokerContactPhone?: InputMaybe<Scalars['String']['input']>;
  dealTags?: InputMaybe<Scalars['AWSJSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  headline?: InputMaybe<Scalars['String']['input']>;
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  mapEmbedUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  photoUrls?: InputMaybe<Array<Scalars['String']['input']>>;
  primaryColor?: InputMaybe<Scalars['String']['input']>;
  secondaryColor?: InputMaybe<Scalars['String']['input']>;
  sharingMode?: InputMaybe<SharingMode>;
  status?: InputMaybe<ProjectStatus>;
  summary?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePromptInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  /** Variable names; optional (derived from prompt when not provided). */
  inputVariables?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Reference to a persisted JsonSchema entity defining the structured output schema for this prompt. */
  jsonSchemaId?: InputMaybe<Scalars['ID']['input']>;
  model?: InputMaybe<AiModel>;
  name?: InputMaybe<Scalars['String']['input']>;
  /** Main user prompt text; may contain {{ variableName }} placeholders. */
  prompt?: InputMaybe<Scalars['String']['input']>;
  sharingMode?: InputMaybe<SharingMode>;
  /** Optional system instruction for the model. */
  systemInstruction?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateQuestionInput = {
  answerText?: InputMaybe<Scalars['String']['input']>;
  answeredAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateScanInput = {
  s3Bucket?: InputMaybe<Scalars['String']['input']>;
  s3Key?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTableInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  pageNum?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateTenantQuotaInput = {
  enforcementPolicy?: InputMaybe<QuotaEnforcementPolicy>;
  monthlyTokenLimit?: InputMaybe<Scalars['Int']['input']>;
  resetDay?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateTextInput = {
  pageNum?: InputMaybe<Scalars['Int']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateWorkflowExecutionInput = {
  cancelledAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  completedAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  completedNodes?: InputMaybe<Scalars['Int']['input']>;
  currentNodeId?: InputMaybe<Scalars['String']['input']>;
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  outputData?: InputMaybe<Scalars['AWSJSON']['input']>;
  status?: InputMaybe<WorkflowExecutionStatus>;
  totalNodes?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateWorkflowInput = {
  definition?: InputMaybe<WorkflowDefinitionInput>;
  jsonSchemaId?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ui?: InputMaybe<WorkflowUiInput>;
};

export type UpdateWorkflowNodeExecutionInput = {
  completedAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  errorDetails?: InputMaybe<Scalars['AWSJSON']['input']>;
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  outputData?: InputMaybe<Scalars['AWSJSON']['input']>;
  startedAt?: InputMaybe<Scalars['AWSDateTime']['input']>;
  status?: InputMaybe<WorkflowNodeExecutionStatus>;
};

export type UsageRecord = Metadata & Node & {
  __typename?: 'UsageRecord';
  createdAt: Scalars['AWSDateTime']['output'];
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  entityType: EntityType;
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['AWSJSON']['output']>;
  ownerId: Scalars['ID']['output'];
  quantity: Scalars['Int']['output'];
  reportableObjectId: Scalars['ID']['output'];
  stripeMeterEventId?: Maybe<Scalars['String']['output']>;
  subscriptionId?: Maybe<Scalars['ID']['output']>;
  tenantId: Scalars['ID']['output'];
  timestamp: Scalars['AWSDateTime']['output'];
  unit: UsageUnit;
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type UsageRecordConnection = {
  __typename?: 'UsageRecordConnection';
  items: Array<UsageRecord>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type UsageUnit =
  | 'API_CALLS'
  | 'DURATION_SECONDS'
  | 'TOKENS';

export type UserError = {
  __typename?: 'UserError';
  code: Scalars['String']['output'];
  field?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  message: Scalars['String']['output'];
};

export type Workflow = Metadata & Node & Shareable & {
  __typename?: 'Workflow';
  accessList?: Maybe<ResourceShareConnection>;
  createdAt: Scalars['AWSDateTime']['output'];
  definition: WorkflowDefinition;
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  entityType: EntityType;
  id: Scalars['ID']['output'];
  jsonSchemaId?: Maybe<Scalars['ID']['output']>;
  name: Scalars['String']['output'];
  ownerId: Scalars['ID']['output'];
  parentId: Scalars['ID']['output'];
  project?: Maybe<Project>;
  sharingMode: SharingMode;
  tenantId: Scalars['ID']['output'];
  ui?: Maybe<WorkflowUi>;
  updatedAt: Scalars['AWSDateTime']['output'];
  workflowexecutions?: Maybe<WorkflowExecutionConnection>;
};


export type WorkflowAccessListArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type WorkflowWorkflowexecutionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};

export type WorkflowConnection = {
  __typename?: 'WorkflowConnection';
  items: Array<Workflow>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type WorkflowDefinition = {
  __typename?: 'WorkflowDefinition';
  edges: Array<WorkflowEdge>;
  nodes: Array<WorkflowNode>;
};

export type WorkflowDefinitionInput = {
  edges: Array<WorkflowEdgeInput>;
  nodes: Array<WorkflowNodeInput>;
};

export type WorkflowEdge = {
  __typename?: 'WorkflowEdge';
  id: Scalars['ID']['output'];
  sourceId: Scalars['ID']['output'];
  sourcePort?: Maybe<Scalars['String']['output']>;
  targetId: Scalars['ID']['output'];
  targetPort?: Maybe<Scalars['String']['output']>;
};

export type WorkflowEdgeInput = {
  id: Scalars['ID']['input'];
  sourceId: Scalars['ID']['input'];
  sourcePort?: InputMaybe<Scalars['String']['input']>;
  targetId: Scalars['ID']['input'];
  targetPort?: InputMaybe<Scalars['String']['input']>;
};

export type WorkflowExecution = Metadata & Node & {
  __typename?: 'WorkflowExecution';
  cancelledAt?: Maybe<Scalars['AWSDateTime']['output']>;
  completedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  completedNodes?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['AWSDateTime']['output'];
  currentNodeId?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  entityType: EntityType;
  errorMessage?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  inputData?: Maybe<Scalars['AWSJSON']['output']>;
  outputData?: Maybe<Scalars['AWSJSON']['output']>;
  ownerId: Scalars['ID']['output'];
  parentId: Scalars['ID']['output'];
  project?: Maybe<Project>;
  startedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  status: WorkflowExecutionStatus;
  tenantId: Scalars['ID']['output'];
  totalNodes?: Maybe<Scalars['Int']['output']>;
  triggerEvent?: Maybe<Scalars['AWSJSON']['output']>;
  updatedAt: Scalars['AWSDateTime']['output'];
  workflow?: Maybe<Workflow>;
  workflownodeexecutions?: Maybe<WorkflowNodeExecutionConnection>;
};


export type WorkflowExecutionWorkflownodeexecutionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};

export type WorkflowExecutionConnection = {
  __typename?: 'WorkflowExecutionConnection';
  items: Array<WorkflowExecution>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type WorkflowExecutionStatus =
  | 'CANCELLED'
  | 'COMPLETED'
  | 'FAILED'
  | 'PENDING'
  | 'RUNNING';

export type WorkflowNode = {
  __typename?: 'WorkflowNode';
  /** Node configuration; shape depends on kind. Null when stored in legacy shape (processConfig/aiConfig/toolsConfig); client should normalize from those if present. */
  configuration?: Maybe<WorkflowNodeConfig>;
  id: Scalars['ID']['output'];
  kind: WorkflowNodeKind;
  label?: Maybe<Scalars['String']['output']>;
  options?: Maybe<Scalars['AWSJSON']['output']>;
};

export type WorkflowNodeConfig = AiNodeConfig | EmptyNodeConfig | InputNodeConfig | ProcessNodeConfig | ToolsNodeConfig;

export type WorkflowNodeExecution = Metadata & Node & {
  __typename?: 'WorkflowNodeExecution';
  completedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  createdAt: Scalars['AWSDateTime']['output'];
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  entityType: EntityType;
  errorDetails?: Maybe<Scalars['AWSJSON']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  inputData?: Maybe<Scalars['AWSJSON']['output']>;
  nodeCategory?: Maybe<Scalars['String']['output']>;
  nodeId: Scalars['String']['output'];
  nodeName?: Maybe<Scalars['String']['output']>;
  nodeType?: Maybe<Scalars['String']['output']>;
  outputData?: Maybe<Scalars['AWSJSON']['output']>;
  ownerId: Scalars['ID']['output'];
  parentId: Scalars['ID']['output'];
  startedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  status: WorkflowNodeExecutionStatus;
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
  workflowExecution?: Maybe<WorkflowExecution>;
};

export type WorkflowNodeExecutionConnection = {
  __typename?: 'WorkflowNodeExecutionConnection';
  items: Array<WorkflowNodeExecution>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type WorkflowNodeExecutionStatus =
  | 'COMPLETED'
  | 'FAILED'
  | 'PENDING'
  | 'RUNNING'
  | 'SKIPPED';

/** Client sends the union variant per kind (same shape as WorkflowNodeConfig), including __typename. E.g. AI node: { __typename: \"AINodeConfig\", prompt, model, ... }. */
export type WorkflowNodeInput = {
  configuration?: InputMaybe<Scalars['AWSJSON']['input']>;
  id: Scalars['ID']['input'];
  kind: WorkflowNodeKind;
  label?: InputMaybe<Scalars['String']['input']>;
  options?: InputMaybe<Scalars['AWSJSON']['input']>;
};

export type WorkflowNodeKind =
  | 'AI'
  | 'COMMENT'
  | 'INPUT'
  | 'OUTPUT'
  | 'PROCESS'
  | 'TOOLS';

export type WorkflowUi = {
  __typename?: 'WorkflowUI';
  connections: Array<WorkflowUiConnection>;
  elements: Array<WorkflowUiElement>;
};

export type WorkflowUiConnection = {
  __typename?: 'WorkflowUIConnection';
  from: Scalars['String']['output'];
  fromSide: Scalars['String']['output'];
  id: Scalars['String']['output'];
  to: Scalars['String']['output'];
  toSide: Scalars['String']['output'];
};

export type WorkflowUiConnectionInput = {
  from: Scalars['String']['input'];
  fromSide: Scalars['String']['input'];
  id: Scalars['String']['input'];
  to: Scalars['String']['input'];
  toSide: Scalars['String']['input'];
};

export type WorkflowUiElement = {
  __typename?: 'WorkflowUIElement';
  category: Scalars['String']['output'];
  height: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  type: Scalars['String']['output'];
  typeLabel: Scalars['String']['output'];
  width: Scalars['Float']['output'];
  x: Scalars['Float']['output'];
  y: Scalars['Float']['output'];
};

export type WorkflowUiElementInput = {
  category: Scalars['String']['input'];
  height: Scalars['Float']['input'];
  id: Scalars['String']['input'];
  type: Scalars['String']['input'];
  typeLabel: Scalars['String']['input'];
  width: Scalars['Float']['input'];
  x: Scalars['Float']['input'];
  y: Scalars['Float']['input'];
};

export type WorkflowUiInput = {
  connections: Array<WorkflowUiConnectionInput>;
  elements: Array<WorkflowUiElementInput>;
};

export type CreateDashboardLayoutMutationVariables = Exact<{
  input: CreateDashboardLayoutInput;
}>;


export type CreateDashboardLayoutMutation = { __typename?: 'Mutation', createDashboardLayout?: { __typename?: 'DashboardLayout', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, state: any, version: string } | null | undefined };

export type UpdateDashboardLayoutMutationVariables = Exact<{
  key: CompositeKeyInput;
  input: UpdateDashboardLayoutInput;
}>;


export type UpdateDashboardLayoutMutation = { __typename?: 'Mutation', updateDashboardLayout?: { __typename?: 'DashboardLayout', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, state: any, version: string } | null | undefined };

export type CreateDoclinkMutationVariables = Exact<{
  input: CreateDoclinkInput;
}>;


export type CreateDoclinkMutation = { __typename?: 'Mutation', createDoclink?: { __typename?: 'Doclink', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, filename: string, status: DoclinkStatus, linkType: DoclinkLinkType, documentId: string } | null | undefined };

export type UpdateDoclinkMutationVariables = Exact<{
  key: CompositeKeyInput;
  input: UpdateDoclinkInput;
}>;


export type UpdateDoclinkMutation = { __typename?: 'Mutation', updateDoclink?: { __typename?: 'Doclink', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, filename: string, status: DoclinkStatus, linkType: DoclinkLinkType, documentId: string } | null | undefined };

export type DeleteDoclinkMutationVariables = Exact<{
  key: CompositeKeyInput;
}>;


export type DeleteDoclinkMutation = { __typename?: 'Mutation', deleteDoclink?: { __typename?: 'Doclink', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, filename: string, status: DoclinkStatus, linkType: DoclinkLinkType, documentId: string } | null | undefined };

export type CreateDocumentMutationVariables = Exact<{
  input: CreateDocumentInput;
}>;


export type CreateDocumentMutation = { __typename?: 'Mutation', createDocument?: { __typename?: 'Document', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, s3Bucket: string, s3Key: string, mimeType: string, sizeBytes?: number | null | undefined } | null | undefined };

export type UpdateDocumentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateDocumentInput;
}>;


export type UpdateDocumentMutation = { __typename?: 'Mutation', updateDocument?: { __typename?: 'Document', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, s3Bucket: string, s3Key: string, mimeType: string, sizeBytes?: number | null | undefined } | null | undefined };

export type DeleteDocumentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteDocumentMutation = { __typename?: 'Mutation', deleteDocument?: { __typename?: 'Document', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, s3Bucket: string, s3Key: string, mimeType: string, sizeBytes?: number | null | undefined } | null | undefined };

export type GeneratePromptDraftMutationVariables = Exact<{
  input: GeneratePromptDraftInput;
}>;


export type GeneratePromptDraftMutation = { __typename?: 'Mutation', generatePromptDraft?: { __typename?: 'GeneratePromptDraftOutput', prompt: string, systemInstruction?: string | null | undefined, jsonSchema?: any | null | undefined, suggestedName?: string | null | undefined } | null | undefined };

export type CreateImageMutationVariables = Exact<{
  input: CreateImageInput;
}>;


export type CreateImageMutation = { __typename?: 'Mutation', createImage?: { __typename?: 'Image', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, s3Bucket: string, s3Key: string, mimeType?: string | null | undefined, sizeBytes?: number | null | undefined, parentId: string, pageNum: number, imageId: string, topLeftX: number, topLeftY: number, bottomRightX: number, bottomRightY: number, imageAnnotation?: any | null | undefined } | null | undefined };

export type UpdateImageMutationVariables = Exact<{
  key: CompositeKeyInput;
  input: UpdateImageInput;
}>;


export type UpdateImageMutation = { __typename?: 'Mutation', updateImage?: { __typename?: 'Image', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, s3Bucket: string, s3Key: string, mimeType?: string | null | undefined, sizeBytes?: number | null | undefined, parentId: string, pageNum: number, imageId: string, topLeftX: number, topLeftY: number, bottomRightX: number, bottomRightY: number, imageAnnotation?: any | null | undefined } | null | undefined };

export type DeleteImageMutationVariables = Exact<{
  key: CompositeKeyInput;
}>;


export type DeleteImageMutation = { __typename?: 'Mutation', deleteImage?: { __typename?: 'Image', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, s3Bucket: string, s3Key: string, mimeType?: string | null | undefined, sizeBytes?: number | null | undefined, parentId: string, pageNum: number, imageId: string, topLeftX: number, topLeftY: number, bottomRightX: number, bottomRightY: number, imageAnnotation?: any | null | undefined } | null | undefined };

export type CreateJsonSchemaMutationVariables = Exact<{
  input: CreateJsonSchemaInput;
}>;


export type CreateJsonSchemaMutation = { __typename?: 'Mutation', createJsonSchema?: { __typename?: 'JsonSchema', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, sharingMode: SharingMode, sourceJsonSchemaId?: string | null | undefined, name: string, description?: string | null | undefined, schemaDefinition: any } | null | undefined };

export type UpdateJsonSchemaMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateJsonSchemaInput;
}>;


export type UpdateJsonSchemaMutation = { __typename?: 'Mutation', updateJsonSchema?: { __typename?: 'JsonSchema', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, sharingMode: SharingMode, sourceJsonSchemaId?: string | null | undefined, name: string, description?: string | null | undefined, schemaDefinition: any } | null | undefined };

export type DeleteJsonSchemaMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteJsonSchemaMutation = { __typename?: 'Mutation', deleteJsonSchema?: { __typename?: 'JsonSchema', id: string } | null | undefined };

export type CreateNotificationMutationVariables = Exact<{
  input: CreateNotificationInput;
}>;


export type CreateNotificationMutation = { __typename?: 'Mutation', createNotification?: { __typename?: 'Notification', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, message: string, properties?: any | null | undefined } | null | undefined };

export type UpdateNotificationMutationVariables = Exact<{
  key: CompositeKeyInput;
  input: UpdateNotificationInput;
}>;


export type UpdateNotificationMutation = { __typename?: 'Mutation', updateNotification?: { __typename?: 'Notification', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, message: string, properties?: any | null | undefined } | null | undefined };

export type DeleteNotificationMutationVariables = Exact<{
  key: CompositeKeyInput;
}>;


export type DeleteNotificationMutation = { __typename?: 'Mutation', deleteNotification?: { __typename?: 'Notification', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, message: string, properties?: any | null | undefined } | null | undefined };

export type SaveEntityDefinitionMutationVariables = Exact<{
  input: SaveEntityDefinitionInput;
}>;


export type SaveEntityDefinitionMutation = { __typename?: 'Mutation', saveEntityDefinition?: { __typename?: 'EntityDefinition', projectId: string, id: string, name: string, description?: string | null | undefined, jsonSchema: any, structuralHash: string, normalizedJsonSchema?: any | null | undefined, properties?: Array<{ __typename?: 'PropertyDefinition', name: string, description?: string | null | undefined, dataType: PropertyDataType, path: string, isList?: boolean | null | undefined, formula?: string | null | undefined, dependencies?: Array<string | null | undefined> | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type DeleteEntityDefinitionMutationVariables = Exact<{
  projectId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
}>;


export type DeleteEntityDefinitionMutation = { __typename?: 'Mutation', deleteEntityDefinition?: { __typename?: 'EntityDefinition', projectId: string, id: string, name: string } | null | undefined };

export type SaveEntityInstanceMutationVariables = Exact<{
  input: SaveInstanceInput;
}>;


export type SaveEntityInstanceMutation = { __typename?: 'Mutation', saveEntityInstance?: { __typename?: 'EntityInstance', projectId: string, id: string, definitionId: string, label?: string | null | undefined, updatedAt?: string | null | undefined, senderId?: string | null | undefined, values?: Array<{ __typename?: 'PropertyValue', propertyName: string, stringValue?: string | null | undefined, numberValue?: number | null | undefined, booleanValue?: boolean | null | undefined, dateValue?: string | null | undefined, extractedByAI?: boolean | null | undefined, confidenceScore?: number | null | undefined, sourceEvidence?: string | null | undefined } | null | undefined> | null | undefined, children?: Array<{ __typename?: 'Relationship', relationName: string, targetInstanceId: string } | null | undefined> | null | undefined } | null | undefined };

export type SaveEntityInstanceMinimalMutationVariables = Exact<{
  input: SaveInstanceInput;
}>;


export type SaveEntityInstanceMinimalMutation = { __typename?: 'Mutation', saveEntityInstance?: { __typename?: 'EntityInstance', projectId: string, id: string, definitionId: string, updatedAt?: string | null | undefined } | null | undefined };

export type DeleteEntityInstanceMutationVariables = Exact<{
  projectId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
}>;


export type DeleteEntityInstanceMutation = { __typename?: 'Mutation', deleteEntityInstance?: { __typename?: 'EntityInstance', projectId: string, id: string, definitionId: string } | null | undefined };

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject?: { __typename?: 'Project', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, sharingMode: SharingMode, name: string, description?: string | null | undefined, status: ProjectStatus } | null | undefined };

export type UpdateProjectMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject?: { __typename?: 'Project', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, sharingMode: SharingMode, name: string, description?: string | null | undefined, status: ProjectStatus } | null | undefined };

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject?: { __typename?: 'Project', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, sharingMode: SharingMode, name: string, description?: string | null | undefined, status: ProjectStatus } | null | undefined };

export type RestoreProjectMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RestoreProjectMutation = { __typename?: 'Mutation', restoreProject?: { __typename?: 'Project', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, sharingMode: SharingMode, name: string, description?: string | null | undefined, status: ProjectStatus } | null | undefined };

export type CreateScanMutationVariables = Exact<{
  input: CreateScanInput;
}>;


export type CreateScanMutation = { __typename?: 'Mutation', createScan?: { __typename?: 'Scan', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, s3Bucket: string, s3Key: string, parentId: string } | null | undefined };

export type UpdateScanMutationVariables = Exact<{
  key: CompositeKeyInput;
  input: UpdateScanInput;
}>;


export type UpdateScanMutation = { __typename?: 'Mutation', updateScan?: { __typename?: 'Scan', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, s3Bucket: string, s3Key: string, parentId: string } | null | undefined };

export type DeleteScanMutationVariables = Exact<{
  key: CompositeKeyInput;
}>;


export type DeleteScanMutation = { __typename?: 'Mutation', deleteScan?: { __typename?: 'Scan', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, s3Bucket: string, s3Key: string, parentId: string } | null | undefined };

export type CreateTableMutationVariables = Exact<{
  input: CreateTableInput;
}>;


export type CreateTableMutation = { __typename?: 'Mutation', createTable?: { __typename?: 'Table', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, pageNum: number, description: string } | null | undefined };

export type UpdateTableMutationVariables = Exact<{
  key: CompositeKeyInput;
  input: UpdateTableInput;
}>;


export type UpdateTableMutation = { __typename?: 'Mutation', updateTable?: { __typename?: 'Table', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, pageNum: number, description: string } | null | undefined };

export type DeleteTableMutationVariables = Exact<{
  key: CompositeKeyInput;
}>;


export type DeleteTableMutation = { __typename?: 'Mutation', deleteTable?: { __typename?: 'Table', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, pageNum: number, description: string } | null | undefined };

export type CreateTextMutationVariables = Exact<{
  input: CreateTextInput;
}>;


export type CreateTextMutation = { __typename?: 'Mutation', createText?: { __typename?: 'Text', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, pageNum: number, text: string } | null | undefined };

export type UpdateTextMutationVariables = Exact<{
  key: CompositeKeyInput;
  input: UpdateTextInput;
}>;


export type UpdateTextMutation = { __typename?: 'Mutation', updateText?: { __typename?: 'Text', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, pageNum: number, text: string } | null | undefined };

export type DeleteTextMutationVariables = Exact<{
  key: CompositeKeyInput;
}>;


export type DeleteTextMutation = { __typename?: 'Mutation', deleteText?: { __typename?: 'Text', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, pageNum: number, text: string } | null | undefined };

export type CreateWorkflowMutationVariables = Exact<{
  input: CreateWorkflowInput;
}>;


export type CreateWorkflowMutation = { __typename?: 'Mutation', createWorkflow?: { __typename?: 'Workflow', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, sharingMode: SharingMode, name: string, jsonSchemaId?: string | null | undefined, parentId: string, definition: { __typename?: 'WorkflowDefinition', nodes: Array<{ __typename?: 'WorkflowNode', id: string, kind: WorkflowNodeKind, label?: string | null | undefined, options?: any | null | undefined, configuration?:
          | { __typename?: 'AINodeConfig', prompt?: string | null | undefined, model?: string | null | undefined, topK?: number | null | undefined, systemPrompt?: string | null | undefined, jsonSchemaId?: string | null | undefined }
          | { __typename?: 'EmptyNodeConfig', _empty?: boolean | null | undefined }
          | { __typename?: 'InputNodeConfig' }
          | { __typename?: 'ProcessNodeConfig', options?: any | null | undefined, staticOutput?: any | null | undefined }
          | { __typename?: 'ToolsNodeConfig', options?: any | null | undefined }
         | null | undefined }>, edges: Array<{ __typename?: 'WorkflowEdge', id: string, sourceId: string, targetId: string, sourcePort?: string | null | undefined, targetPort?: string | null | undefined }> }, ui?: { __typename?: 'WorkflowUI', elements: Array<{ __typename?: 'WorkflowUIElement', id: string, type: string, category: string, typeLabel: string, x: number, y: number, width: number, height: number }>, connections: Array<{ __typename?: 'WorkflowUIConnection', id: string, from: string, to: string, fromSide: string, toSide: string }> } | null | undefined } | null | undefined };

export type UpdateWorkflowMutationVariables = Exact<{
  key: CompositeKeyInput;
  input: UpdateWorkflowInput;
}>;


export type UpdateWorkflowMutation = { __typename?: 'Mutation', updateWorkflow?: { __typename?: 'Workflow', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, sharingMode: SharingMode, name: string, jsonSchemaId?: string | null | undefined, parentId: string, definition: { __typename?: 'WorkflowDefinition', nodes: Array<{ __typename?: 'WorkflowNode', id: string, kind: WorkflowNodeKind, label?: string | null | undefined, options?: any | null | undefined, configuration?:
          | { __typename?: 'AINodeConfig', prompt?: string | null | undefined, model?: string | null | undefined, topK?: number | null | undefined, systemPrompt?: string | null | undefined, jsonSchemaId?: string | null | undefined }
          | { __typename?: 'EmptyNodeConfig', _empty?: boolean | null | undefined }
          | { __typename?: 'InputNodeConfig' }
          | { __typename?: 'ProcessNodeConfig', options?: any | null | undefined, staticOutput?: any | null | undefined }
          | { __typename?: 'ToolsNodeConfig', options?: any | null | undefined }
         | null | undefined }>, edges: Array<{ __typename?: 'WorkflowEdge', id: string, sourceId: string, targetId: string, sourcePort?: string | null | undefined, targetPort?: string | null | undefined }> }, ui?: { __typename?: 'WorkflowUI', elements: Array<{ __typename?: 'WorkflowUIElement', id: string, type: string, category: string, typeLabel: string, x: number, y: number, width: number, height: number }>, connections: Array<{ __typename?: 'WorkflowUIConnection', id: string, from: string, to: string, fromSide: string, toSide: string }> } | null | undefined } | null | undefined };

export type DeleteWorkflowMutationVariables = Exact<{
  key: CompositeKeyInput;
}>;


export type DeleteWorkflowMutation = { __typename?: 'Mutation', deleteWorkflow?: { __typename?: 'Workflow', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, sharingMode: SharingMode, name: string, jsonSchemaId?: string | null | undefined, parentId: string, definition: { __typename?: 'WorkflowDefinition', nodes: Array<{ __typename?: 'WorkflowNode', id: string, kind: WorkflowNodeKind, label?: string | null | undefined, options?: any | null | undefined, configuration?:
          | { __typename?: 'AINodeConfig', prompt?: string | null | undefined, model?: string | null | undefined, topK?: number | null | undefined, systemPrompt?: string | null | undefined, jsonSchemaId?: string | null | undefined }
          | { __typename?: 'EmptyNodeConfig', _empty?: boolean | null | undefined }
          | { __typename?: 'InputNodeConfig' }
          | { __typename?: 'ProcessNodeConfig', options?: any | null | undefined, staticOutput?: any | null | undefined }
          | { __typename?: 'ToolsNodeConfig', options?: any | null | undefined }
         | null | undefined }>, edges: Array<{ __typename?: 'WorkflowEdge', id: string, sourceId: string, targetId: string, sourcePort?: string | null | undefined, targetPort?: string | null | undefined }> }, ui?: { __typename?: 'WorkflowUI', elements: Array<{ __typename?: 'WorkflowUIElement', id: string, type: string, category: string, typeLabel: string, x: number, y: number, width: number, height: number }>, connections: Array<{ __typename?: 'WorkflowUIConnection', id: string, from: string, to: string, fromSide: string, toSide: string }> } | null | undefined } | null | undefined };

export type CreateWorkflowExecutionMutationVariables = Exact<{
  input: CreateWorkflowExecutionInput;
}>;


export type CreateWorkflowExecutionMutation = { __typename?: 'Mutation', createWorkflowExecution?: { __typename?: 'WorkflowExecution', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, status: WorkflowExecutionStatus, startedAt?: string | null | undefined, completedAt?: string | null | undefined, cancelledAt?: string | null | undefined, triggerEvent?: any | null | undefined, inputData?: any | null | undefined, outputData?: any | null | undefined, errorMessage?: string | null | undefined, totalNodes?: number | null | undefined, completedNodes?: number | null | undefined, currentNodeId?: string | null | undefined } | null | undefined };

export type UpdateWorkflowExecutionMutationVariables = Exact<{
  key: CompositeKeyInput;
  input: UpdateWorkflowExecutionInput;
}>;


export type UpdateWorkflowExecutionMutation = { __typename?: 'Mutation', updateWorkflowExecution?: { __typename?: 'WorkflowExecution', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, status: WorkflowExecutionStatus, startedAt?: string | null | undefined, completedAt?: string | null | undefined, cancelledAt?: string | null | undefined, triggerEvent?: any | null | undefined, inputData?: any | null | undefined, outputData?: any | null | undefined, errorMessage?: string | null | undefined, totalNodes?: number | null | undefined, completedNodes?: number | null | undefined, currentNodeId?: string | null | undefined } | null | undefined };

export type CancelWorkflowExecutionMutationVariables = Exact<{
  key: CompositeKeyInput;
}>;


export type CancelWorkflowExecutionMutation = { __typename?: 'Mutation', cancelWorkflowExecution?: { __typename?: 'WorkflowExecution', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, status: WorkflowExecutionStatus, startedAt?: string | null | undefined, completedAt?: string | null | undefined, cancelledAt?: string | null | undefined, triggerEvent?: any | null | undefined, inputData?: any | null | undefined, outputData?: any | null | undefined, errorMessage?: string | null | undefined, totalNodes?: number | null | undefined, completedNodes?: number | null | undefined, currentNodeId?: string | null | undefined } | null | undefined };

export type StartWorkflowExecutionMutationVariables = Exact<{
  key: CompositeKeyInput;
}>;


export type StartWorkflowExecutionMutation = { __typename?: 'Mutation', startWorkflowExecution?: { __typename?: 'WorkflowExecution', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, status: WorkflowExecutionStatus, startedAt?: string | null | undefined, completedAt?: string | null | undefined, cancelledAt?: string | null | undefined, triggerEvent?: any | null | undefined, inputData?: any | null | undefined, outputData?: any | null | undefined, errorMessage?: string | null | undefined, totalNodes?: number | null | undefined, completedNodes?: number | null | undefined, currentNodeId?: string | null | undefined } | null | undefined };

export type CompleteWorkflowExecutionMutationVariables = Exact<{
  key: CompositeKeyInput;
  outputData?: InputMaybe<Scalars['AWSJSON']['input']>;
}>;


export type CompleteWorkflowExecutionMutation = { __typename?: 'Mutation', completeWorkflowExecution?: { __typename?: 'WorkflowExecution', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, status: WorkflowExecutionStatus, startedAt?: string | null | undefined, completedAt?: string | null | undefined, cancelledAt?: string | null | undefined, triggerEvent?: any | null | undefined, inputData?: any | null | undefined, outputData?: any | null | undefined, errorMessage?: string | null | undefined, totalNodes?: number | null | undefined, completedNodes?: number | null | undefined, currentNodeId?: string | null | undefined } | null | undefined };

export type FailWorkflowExecutionMutationVariables = Exact<{
  key: CompositeKeyInput;
  errorMessage: Scalars['String']['input'];
  errorDetails?: InputMaybe<Scalars['AWSJSON']['input']>;
}>;


export type FailWorkflowExecutionMutation = { __typename?: 'Mutation', failWorkflowExecution?: { __typename?: 'WorkflowExecution', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, status: WorkflowExecutionStatus, startedAt?: string | null | undefined, completedAt?: string | null | undefined, cancelledAt?: string | null | undefined, triggerEvent?: any | null | undefined, inputData?: any | null | undefined, outputData?: any | null | undefined, errorMessage?: string | null | undefined, totalNodes?: number | null | undefined, completedNodes?: number | null | undefined, currentNodeId?: string | null | undefined } | null | undefined };

export type RetryWorkflowExecutionMutationVariables = Exact<{
  key: CompositeKeyInput;
}>;


export type RetryWorkflowExecutionMutation = { __typename?: 'Mutation', retryWorkflowExecution?: { __typename?: 'WorkflowExecution', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, status: WorkflowExecutionStatus, startedAt?: string | null | undefined, completedAt?: string | null | undefined, cancelledAt?: string | null | undefined, triggerEvent?: any | null | undefined, inputData?: any | null | undefined, outputData?: any | null | undefined, errorMessage?: string | null | undefined, totalNodes?: number | null | undefined, completedNodes?: number | null | undefined, currentNodeId?: string | null | undefined } | null | undefined };

export type DeleteWorkflowExecutionMutationVariables = Exact<{
  key: CompositeKeyInput;
}>;


export type DeleteWorkflowExecutionMutation = { __typename?: 'Mutation', deleteWorkflowExecution?: { __typename?: 'WorkflowExecution', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, status: WorkflowExecutionStatus, startedAt?: string | null | undefined, completedAt?: string | null | undefined, cancelledAt?: string | null | undefined, triggerEvent?: any | null | undefined, inputData?: any | null | undefined, outputData?: any | null | undefined, errorMessage?: string | null | undefined, totalNodes?: number | null | undefined, completedNodes?: number | null | undefined, currentNodeId?: string | null | undefined } | null | undefined };

export type CreateWorkflowNodeExecutionMutationVariables = Exact<{
  input: CreateWorkflowNodeExecutionInput;
}>;


export type CreateWorkflowNodeExecutionMutation = { __typename?: 'Mutation', createWorkflowNodeExecution?: { __typename?: 'WorkflowNodeExecution', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, nodeId: string, nodeCategory?: string | null | undefined, nodeName?: string | null | undefined, nodeType?: string | null | undefined, status: WorkflowNodeExecutionStatus, startedAt?: string | null | undefined, completedAt?: string | null | undefined, inputData?: any | null | undefined, outputData?: any | null | undefined, errorMessage?: string | null | undefined, errorDetails?: any | null | undefined } | null | undefined };

export type UpdateWorkflowNodeExecutionMutationVariables = Exact<{
  key: CompositeKeyInput;
  input: UpdateWorkflowNodeExecutionInput;
}>;


export type UpdateWorkflowNodeExecutionMutation = { __typename?: 'Mutation', updateWorkflowNodeExecution?: { __typename?: 'WorkflowNodeExecution', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, nodeId: string, nodeCategory?: string | null | undefined, nodeName?: string | null | undefined, nodeType?: string | null | undefined, status: WorkflowNodeExecutionStatus, startedAt?: string | null | undefined, completedAt?: string | null | undefined, inputData?: any | null | undefined, outputData?: any | null | undefined, errorMessage?: string | null | undefined, errorDetails?: any | null | undefined } | null | undefined };

export type StartWorkflowNodeExecutionMutationVariables = Exact<{
  key: CompositeKeyInput;
}>;


export type StartWorkflowNodeExecutionMutation = { __typename?: 'Mutation', startWorkflowNodeExecution?: { __typename?: 'WorkflowNodeExecution', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, nodeId: string, nodeCategory?: string | null | undefined, nodeName?: string | null | undefined, nodeType?: string | null | undefined, status: WorkflowNodeExecutionStatus, startedAt?: string | null | undefined, completedAt?: string | null | undefined, inputData?: any | null | undefined, outputData?: any | null | undefined, errorMessage?: string | null | undefined, errorDetails?: any | null | undefined } | null | undefined };

export type CompleteWorkflowNodeExecutionMutationVariables = Exact<{
  key: CompositeKeyInput;
  outputData?: InputMaybe<Scalars['AWSJSON']['input']>;
}>;


export type CompleteWorkflowNodeExecutionMutation = { __typename?: 'Mutation', completeWorkflowNodeExecution?: { __typename?: 'WorkflowNodeExecution', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, nodeId: string, nodeCategory?: string | null | undefined, nodeName?: string | null | undefined, nodeType?: string | null | undefined, status: WorkflowNodeExecutionStatus, startedAt?: string | null | undefined, completedAt?: string | null | undefined, inputData?: any | null | undefined, outputData?: any | null | undefined, errorMessage?: string | null | undefined, errorDetails?: any | null | undefined } | null | undefined };

export type FailWorkflowNodeExecutionMutationVariables = Exact<{
  key: CompositeKeyInput;
  errorMessage: Scalars['String']['input'];
  errorDetails?: InputMaybe<Scalars['AWSJSON']['input']>;
}>;


export type FailWorkflowNodeExecutionMutation = { __typename?: 'Mutation', failWorkflowNodeExecution?: { __typename?: 'WorkflowNodeExecution', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, nodeId: string, nodeCategory?: string | null | undefined, nodeName?: string | null | undefined, nodeType?: string | null | undefined, status: WorkflowNodeExecutionStatus, startedAt?: string | null | undefined, completedAt?: string | null | undefined, inputData?: any | null | undefined, outputData?: any | null | undefined, errorMessage?: string | null | undefined, errorDetails?: any | null | undefined } | null | undefined };

export type RetryWorkflowNodeExecutionMutationVariables = Exact<{
  key: CompositeKeyInput;
}>;


export type RetryWorkflowNodeExecutionMutation = { __typename?: 'Mutation', retryWorkflowNodeExecution?: { __typename?: 'WorkflowNodeExecution', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, nodeId: string, nodeCategory?: string | null | undefined, nodeName?: string | null | undefined, nodeType?: string | null | undefined, status: WorkflowNodeExecutionStatus, startedAt?: string | null | undefined, completedAt?: string | null | undefined, inputData?: any | null | undefined, outputData?: any | null | undefined, errorMessage?: string | null | undefined, errorDetails?: any | null | undefined } | null | undefined };

export type DeleteWorkflowNodeExecutionMutationVariables = Exact<{
  key: CompositeKeyInput;
}>;


export type DeleteWorkflowNodeExecutionMutation = { __typename?: 'Mutation', deleteWorkflowNodeExecution?: { __typename?: 'WorkflowNodeExecution', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, nodeId: string, nodeCategory?: string | null | undefined, nodeName?: string | null | undefined, nodeType?: string | null | undefined, status: WorkflowNodeExecutionStatus, startedAt?: string | null | undefined, completedAt?: string | null | undefined, inputData?: any | null | undefined, outputData?: any | null | undefined, errorMessage?: string | null | undefined, errorDetails?: any | null | undefined } | null | undefined };

export type GetDashboardLayoutQueryVariables = Exact<{
  key: CompositeKeyInput;
}>;


export type GetDashboardLayoutQuery = { __typename?: 'Query', getDashboardLayout?: { __typename?: 'DashboardLayout', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, state: any, version: string } | null | undefined };

export type ListDashboardLayoutsQueryVariables = Exact<{
  parentId: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
}>;


export type ListDashboardLayoutsQuery = { __typename?: 'Query', listDashboardLayouts: { __typename?: 'DashboardLayoutConnection', nextToken?: string | null | undefined, items: Array<{ __typename?: 'DashboardLayout', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, state: any, version: string }> } };

export type GetDoclinkQueryVariables = Exact<{
  key: CompositeKeyInput;
}>;


export type GetDoclinkQuery = { __typename?: 'Query', getDoclink?: { __typename?: 'Doclink', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, filename: string, status: DoclinkStatus, linkType: DoclinkLinkType, documentId: string } | null | undefined };

export type ListDoclinksQueryVariables = Exact<{
  parentId: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
}>;


export type ListDoclinksQuery = { __typename?: 'Query', listDoclinks: { __typename?: 'DoclinkConnection', nextToken?: string | null | undefined, items: Array<{ __typename?: 'Doclink', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, filename: string, status: DoclinkStatus, linkType: DoclinkLinkType, documentId: string }> } };

export type GetDocumentQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetDocumentQuery = { __typename?: 'Query', getDocument?: { __typename?: 'Document', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, s3Bucket: string, s3Key: string, mimeType: string, sizeBytes?: number | null | undefined } | null | undefined };

export type ListDocumentsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
}>;


export type ListDocumentsQuery = { __typename?: 'Query', listDocuments: { __typename?: 'DocumentConnection', nextToken?: string | null | undefined, items: Array<{ __typename?: 'Document', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, s3Bucket: string, s3Key: string, mimeType: string, sizeBytes?: number | null | undefined }> } };

export type GetImageQueryVariables = Exact<{
  key: CompositeKeyInput;
}>;


export type GetImageQuery = { __typename?: 'Query', getImage?: { __typename?: 'Image', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, s3Bucket: string, s3Key: string, mimeType?: string | null | undefined, sizeBytes?: number | null | undefined, parentId: string, pageNum: number, imageId: string, topLeftX: number, topLeftY: number, bottomRightX: number, bottomRightY: number, imageAnnotation?: any | null | undefined } | null | undefined };

export type ListImagesQueryVariables = Exact<{
  parentId: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
}>;


export type ListImagesQuery = { __typename?: 'Query', listImages: { __typename?: 'ImageConnection', nextToken?: string | null | undefined, items: Array<{ __typename?: 'Image', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, s3Bucket: string, s3Key: string, mimeType?: string | null | undefined, sizeBytes?: number | null | undefined, parentId: string, pageNum: number, imageId: string, topLeftX: number, topLeftY: number, bottomRightX: number, bottomRightY: number, imageAnnotation?: any | null | undefined }> } };

export type JsonSchemaFieldsFragment = { __typename?: 'JsonSchema', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, sharingMode: SharingMode, sourceJsonSchemaId?: string | null | undefined, name: string, description?: string | null | undefined, schemaDefinition: any };

export type GetJsonSchemaQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetJsonSchemaQuery = { __typename?: 'Query', getJsonSchema?: { __typename?: 'JsonSchema', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, sharingMode: SharingMode, sourceJsonSchemaId?: string | null | undefined, name: string, description?: string | null | undefined, schemaDefinition: any } | null | undefined };

export type ListJsonSchemasQueryVariables = Exact<{
  scope?: InputMaybe<ListScope>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
}>;


export type ListJsonSchemasQuery = { __typename?: 'Query', listJsonSchemas: { __typename?: 'JsonSchemaConnection', nextToken?: string | null | undefined, items: Array<{ __typename?: 'JsonSchema', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, sharingMode: SharingMode, sourceJsonSchemaId?: string | null | undefined, name: string, description?: string | null | undefined, schemaDefinition: any }> } };

export type GetNotificationQueryVariables = Exact<{
  key: CompositeKeyInput;
}>;


export type GetNotificationQuery = { __typename?: 'Query', getNotification?: { __typename?: 'Notification', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, message: string, properties?: any | null | undefined } | null | undefined };

export type ListNotificationsQueryVariables = Exact<{
  parentId: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
}>;


export type ListNotificationsQuery = { __typename?: 'Query', listNotifications: { __typename?: 'NotificationConnection', nextToken?: string | null | undefined, items: Array<{ __typename?: 'Notification', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, message: string, properties?: any | null | undefined }> } };

export type OntologyEntityDefinitionFieldsFragment = { __typename?: 'EntityDefinition', projectId: string, id: string, name: string, description?: string | null | undefined, jsonSchema: any, structuralHash: string, normalizedJsonSchema?: any | null | undefined, properties?: Array<{ __typename?: 'PropertyDefinition', name: string, description?: string | null | undefined, dataType: PropertyDataType, path: string, isList?: boolean | null | undefined, formula?: string | null | undefined, dependencies?: Array<string | null | undefined> | null | undefined } | null | undefined> | null | undefined };

export type OntologyEntityInstanceFieldsFragment = { __typename?: 'EntityInstance', projectId: string, id: string, definitionId: string, label?: string | null | undefined, updatedAt?: string | null | undefined, senderId?: string | null | undefined, values?: Array<{ __typename?: 'PropertyValue', propertyName: string, stringValue?: string | null | undefined, numberValue?: number | null | undefined, booleanValue?: boolean | null | undefined, dateValue?: string | null | undefined, extractedByAI?: boolean | null | undefined, confidenceScore?: number | null | undefined, sourceEvidence?: string | null | undefined } | null | undefined> | null | undefined, children?: Array<{ __typename?: 'Relationship', relationName: string, targetInstanceId: string } | null | undefined> | null | undefined };

export type ListEntityDefinitionsQueryVariables = Exact<{
  projectId: Scalars['ID']['input'];
}>;


export type ListEntityDefinitionsQuery = { __typename?: 'Query', listEntityDefinitions?: Array<{ __typename?: 'EntityDefinition', projectId: string, id: string, name: string, description?: string | null | undefined, jsonSchema: any, structuralHash: string, normalizedJsonSchema?: any | null | undefined, properties?: Array<{ __typename?: 'PropertyDefinition', name: string, description?: string | null | undefined, dataType: PropertyDataType, path: string, isList?: boolean | null | undefined, formula?: string | null | undefined, dependencies?: Array<string | null | undefined> | null | undefined } | null | undefined> | null | undefined } | null | undefined> | null | undefined };

export type GetEntityDefinitionQueryVariables = Exact<{
  projectId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
}>;


export type GetEntityDefinitionQuery = { __typename?: 'Query', getEntityDefinition?: { __typename?: 'EntityDefinition', projectId: string, id: string, name: string, description?: string | null | undefined, jsonSchema: any, structuralHash: string, normalizedJsonSchema?: any | null | undefined, properties?: Array<{ __typename?: 'PropertyDefinition', name: string, description?: string | null | undefined, dataType: PropertyDataType, path: string, isList?: boolean | null | undefined, formula?: string | null | undefined, dependencies?: Array<string | null | undefined> | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type GetEntityInstanceQueryVariables = Exact<{
  projectId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
}>;


export type GetEntityInstanceQuery = { __typename?: 'Query', getEntityInstance?: { __typename?: 'EntityInstance', projectId: string, id: string, definitionId: string, label?: string | null | undefined, updatedAt?: string | null | undefined, senderId?: string | null | undefined, values?: Array<{ __typename?: 'PropertyValue', propertyName: string, stringValue?: string | null | undefined, numberValue?: number | null | undefined, booleanValue?: boolean | null | undefined, dateValue?: string | null | undefined, extractedByAI?: boolean | null | undefined, confidenceScore?: number | null | undefined, sourceEvidence?: string | null | undefined } | null | undefined> | null | undefined, children?: Array<{ __typename?: 'Relationship', relationName: string, targetInstanceId: string } | null | undefined> | null | undefined } | null | undefined };

export type ListEntityInstancesQueryVariables = Exact<{
  projectId: Scalars['ID']['input'];
}>;


export type ListEntityInstancesQuery = { __typename?: 'Query', listEntityInstances?: Array<{ __typename?: 'EntityInstance', projectId: string, id: string, definitionId: string, label?: string | null | undefined, updatedAt?: string | null | undefined, senderId?: string | null | undefined, values?: Array<{ __typename?: 'PropertyValue', propertyName: string, stringValue?: string | null | undefined, numberValue?: number | null | undefined, booleanValue?: boolean | null | undefined, dateValue?: string | null | undefined, extractedByAI?: boolean | null | undefined, confidenceScore?: number | null | undefined, sourceEvidence?: string | null | undefined } | null | undefined> | null | undefined, children?: Array<{ __typename?: 'Relationship', relationName: string, targetInstanceId: string } | null | undefined> | null | undefined } | null | undefined> | null | undefined };

export type ListEntityInstancesByDefinitionQueryVariables = Exact<{
  projectId: Scalars['ID']['input'];
  definitionId: Scalars['ID']['input'];
}>;


export type ListEntityInstancesByDefinitionQuery = { __typename?: 'Query', listEntityInstancesByDefinition?: Array<{ __typename?: 'EntityInstance', projectId: string, id: string, definitionId: string, label?: string | null | undefined, updatedAt?: string | null | undefined, senderId?: string | null | undefined, values?: Array<{ __typename?: 'PropertyValue', propertyName: string, stringValue?: string | null | undefined, numberValue?: number | null | undefined, booleanValue?: boolean | null | undefined, dateValue?: string | null | undefined, extractedByAI?: boolean | null | undefined, confidenceScore?: number | null | undefined, sourceEvidence?: string | null | undefined } | null | undefined> | null | undefined, children?: Array<{ __typename?: 'Relationship', relationName: string, targetInstanceId: string } | null | undefined> | null | undefined } | null | undefined> | null | undefined };

export type GetEntityDefinitionByHashQueryVariables = Exact<{
  projectId: Scalars['ID']['input'];
  structuralHash: Scalars['String']['input'];
}>;


export type GetEntityDefinitionByHashQuery = { __typename?: 'Query', getEntityDefinitionByHash?: { __typename?: 'EntityDefinition', projectId: string, id: string, name: string, description?: string | null | undefined, jsonSchema: any, structuralHash: string, normalizedJsonSchema?: any | null | undefined, properties?: Array<{ __typename?: 'PropertyDefinition', name: string, description?: string | null | undefined, dataType: PropertyDataType, path: string, isList?: boolean | null | undefined, formula?: string | null | undefined, dependencies?: Array<string | null | undefined> | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type GetProjectQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProjectQuery = { __typename?: 'Query', getProject?: { __typename?: 'Project', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, sharingMode: SharingMode, name: string, description?: string | null | undefined, status: ProjectStatus, accessList?: { __typename?: 'ResourceShareConnection', nextToken?: string | null | undefined, items: Array<{ __typename?: 'ResourceShare', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, recipientUserId: string, permission: SharePermission, resourceTitle: string, resourceType: EntityType }> } | null | undefined, doclinks?: { __typename?: 'DoclinkConnection', nextToken?: string | null | undefined, items: Array<{ __typename?: 'Doclink', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, parentId: string, filename: string, status: DoclinkStatus, linkType: DoclinkLinkType, documentId: string, deletedAt?: string | null | undefined }> } | null | undefined, topics?: { __typename?: 'TopicConnection', nextToken?: string | null | undefined, items: Array<{ __typename?: 'Topic', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, sharingMode: SharingMode, parentId: string, name: string }> } | null | undefined, workflows?: { __typename?: 'WorkflowConnection', nextToken?: string | null | undefined, items: Array<{ __typename?: 'Workflow', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, sharingMode: SharingMode, name: string, jsonSchemaId?: string | null | undefined, definition: { __typename?: 'WorkflowDefinition', nodes: Array<{ __typename?: 'WorkflowNode', id: string, kind: WorkflowNodeKind, label?: string | null | undefined, options?: any | null | undefined, configuration?:
              | { __typename?: 'AINodeConfig', prompt?: string | null | undefined, model?: string | null | undefined, topK?: number | null | undefined, systemPrompt?: string | null | undefined, jsonSchemaId?: string | null | undefined }
              | { __typename?: 'EmptyNodeConfig', _empty?: boolean | null | undefined }
              | { __typename?: 'InputNodeConfig' }
              | { __typename?: 'ProcessNodeConfig', options?: any | null | undefined, staticOutput?: any | null | undefined }
              | { __typename?: 'ToolsNodeConfig', options?: any | null | undefined }
             | null | undefined }>, edges: Array<{ __typename?: 'WorkflowEdge', id: string, sourceId: string, targetId: string, sourcePort?: string | null | undefined, targetPort?: string | null | undefined }> }, ui?: { __typename?: 'WorkflowUI', elements: Array<{ __typename?: 'WorkflowUIElement', id: string, type: string, category: string, typeLabel: string, x: number, y: number, width: number, height: number }>, connections: Array<{ __typename?: 'WorkflowUIConnection', id: string, from: string, to: string, fromSide: string, toSide: string }> } | null | undefined }> } | null | undefined } | null | undefined };

export type ListProjectsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<ListScope>;
}>;


export type ListProjectsQuery = { __typename?: 'Query', listProjects: { __typename?: 'ProjectConnection', nextToken?: string | null | undefined, items: Array<{ __typename?: 'Project', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, sharingMode: SharingMode, name: string, description?: string | null | undefined, status: ProjectStatus }> } };

export type GetProjectWithPromptsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProjectWithPromptsQuery = { __typename?: 'Query', getProject?: { __typename?: 'Project', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, sharingMode: SharingMode, name: string, description?: string | null | undefined, status: ProjectStatus } | null | undefined };

export type PromptFieldsFragment = { __typename?: 'Prompt', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, sharingMode: SharingMode, name: string, description?: string | null | undefined, prompt: string, systemInstruction?: string | null | undefined, inputVariables?: Array<string> | null | undefined, model: AiModel, version?: number | null | undefined, isActive?: boolean | null | undefined, jsonSchemaId?: string | null | undefined };

export type GetPromptQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPromptQuery = { __typename?: 'Query', getPrompt?: { __typename?: 'Prompt', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, sharingMode: SharingMode, name: string, description?: string | null | undefined, prompt: string, systemInstruction?: string | null | undefined, inputVariables?: Array<string> | null | undefined, model: AiModel, version?: number | null | undefined, isActive?: boolean | null | undefined, jsonSchemaId?: string | null | undefined } | null | undefined };

export type ListPromptsQueryVariables = Exact<{
  scope?: InputMaybe<ListScope>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
}>;


export type ListPromptsQuery = { __typename?: 'Query', listPrompts: { __typename?: 'PromptConnection', nextToken?: string | null | undefined, items: Array<{ __typename?: 'Prompt', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, sharingMode: SharingMode, name: string, description?: string | null | undefined, prompt: string, systemInstruction?: string | null | undefined, inputVariables?: Array<string> | null | undefined, model: AiModel, version?: number | null | undefined, isActive?: boolean | null | undefined, jsonSchemaId?: string | null | undefined }> } };

export type GetScanQueryVariables = Exact<{
  key: CompositeKeyInput;
}>;


export type GetScanQuery = { __typename?: 'Query', getScan?: { __typename?: 'Scan', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, s3Bucket: string, s3Key: string, parentId: string } | null | undefined };

export type ListScansQueryVariables = Exact<{
  parentId: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
}>;


export type ListScansQuery = { __typename?: 'Query', listScans: { __typename?: 'ScanConnection', nextToken?: string | null | undefined, items: Array<{ __typename?: 'Scan', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, s3Bucket: string, s3Key: string, parentId: string }> } };

export type GetTableQueryVariables = Exact<{
  key: CompositeKeyInput;
}>;


export type GetTableQuery = { __typename?: 'Query', getTable?: { __typename?: 'Table', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, pageNum: number, description: string } | null | undefined };

export type ListTablesQueryVariables = Exact<{
  parentId: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
}>;


export type ListTablesQuery = { __typename?: 'Query', listTables: { __typename?: 'TableConnection', nextToken?: string | null | undefined, items: Array<{ __typename?: 'Table', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, pageNum: number, description: string }> } };

export type GetTextQueryVariables = Exact<{
  key: CompositeKeyInput;
}>;


export type GetTextQuery = { __typename?: 'Query', getText?: { __typename?: 'Text', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, pageNum: number, text: string } | null | undefined };

export type ListTextsQueryVariables = Exact<{
  parentId: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
}>;


export type ListTextsQuery = { __typename?: 'Query', listTexts: { __typename?: 'TextConnection', nextToken?: string | null | undefined, items: Array<{ __typename?: 'Text', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, pageNum: number, text: string }> } };

export type GetWorkflowQueryVariables = Exact<{
  key: CompositeKeyInput;
}>;


export type GetWorkflowQuery = { __typename?: 'Query', getWorkflow?: { __typename?: 'Workflow', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, sharingMode: SharingMode, name: string, jsonSchemaId?: string | null | undefined, parentId: string, accessList?: { __typename?: 'ResourceShareConnection', nextToken?: string | null | undefined, items: Array<{ __typename?: 'ResourceShare', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, recipientUserId: string, permission: SharePermission, resourceTitle: string, resourceType: EntityType }> } | null | undefined, definition: { __typename?: 'WorkflowDefinition', nodes: Array<{ __typename?: 'WorkflowNode', id: string, kind: WorkflowNodeKind, label?: string | null | undefined, options?: any | null | undefined, configuration?:
          | { __typename?: 'AINodeConfig', prompt?: string | null | undefined, model?: string | null | undefined, topK?: number | null | undefined, systemPrompt?: string | null | undefined, jsonSchemaId?: string | null | undefined }
          | { __typename?: 'EmptyNodeConfig', _empty?: boolean | null | undefined }
          | { __typename?: 'InputNodeConfig' }
          | { __typename?: 'ProcessNodeConfig', options?: any | null | undefined, staticOutput?: any | null | undefined }
          | { __typename?: 'ToolsNodeConfig', options?: any | null | undefined }
         | null | undefined }>, edges: Array<{ __typename?: 'WorkflowEdge', id: string, sourceId: string, targetId: string, sourcePort?: string | null | undefined, targetPort?: string | null | undefined }> }, ui?: { __typename?: 'WorkflowUI', elements: Array<{ __typename?: 'WorkflowUIElement', id: string, type: string, category: string, typeLabel: string, x: number, y: number, width: number, height: number }>, connections: Array<{ __typename?: 'WorkflowUIConnection', id: string, from: string, to: string, fromSide: string, toSide: string }> } | null | undefined } | null | undefined };

export type ListWorkflowsQueryVariables = Exact<{
  parentId: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
}>;


export type ListWorkflowsQuery = { __typename?: 'Query', listWorkflows: { __typename?: 'WorkflowConnection', nextToken?: string | null | undefined, items: Array<{ __typename?: 'Workflow', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, sharingMode: SharingMode, name: string, jsonSchemaId?: string | null | undefined, parentId: string, definition: { __typename?: 'WorkflowDefinition', nodes: Array<{ __typename?: 'WorkflowNode', id: string, kind: WorkflowNodeKind, label?: string | null | undefined, options?: any | null | undefined, configuration?:
            | { __typename?: 'AINodeConfig', prompt?: string | null | undefined, model?: string | null | undefined, topK?: number | null | undefined, systemPrompt?: string | null | undefined, jsonSchemaId?: string | null | undefined }
            | { __typename?: 'EmptyNodeConfig', _empty?: boolean | null | undefined }
            | { __typename?: 'InputNodeConfig' }
            | { __typename?: 'ProcessNodeConfig', options?: any | null | undefined, staticOutput?: any | null | undefined }
            | { __typename?: 'ToolsNodeConfig', options?: any | null | undefined }
           | null | undefined }>, edges: Array<{ __typename?: 'WorkflowEdge', id: string, sourceId: string, targetId: string, sourcePort?: string | null | undefined, targetPort?: string | null | undefined }> }, ui?: { __typename?: 'WorkflowUI', elements: Array<{ __typename?: 'WorkflowUIElement', id: string, type: string, category: string, typeLabel: string, x: number, y: number, width: number, height: number }>, connections: Array<{ __typename?: 'WorkflowUIConnection', id: string, from: string, to: string, fromSide: string, toSide: string }> } | null | undefined }> } };

export type GetWorkflowExecutionQueryVariables = Exact<{
  key: CompositeKeyInput;
}>;


export type GetWorkflowExecutionQuery = { __typename?: 'Query', getWorkflowExecution?: { __typename?: 'WorkflowExecution', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, status: WorkflowExecutionStatus, startedAt?: string | null | undefined, completedAt?: string | null | undefined, cancelledAt?: string | null | undefined, triggerEvent?: any | null | undefined, inputData?: any | null | undefined, outputData?: any | null | undefined, errorMessage?: string | null | undefined, totalNodes?: number | null | undefined, completedNodes?: number | null | undefined, currentNodeId?: string | null | undefined, workflow?: { __typename?: 'Workflow', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, sharingMode: SharingMode, name: string, jsonSchemaId?: string | null | undefined, definition: { __typename?: 'WorkflowDefinition', nodes: Array<{ __typename?: 'WorkflowNode', id: string, kind: WorkflowNodeKind, label?: string | null | undefined, options?: any | null | undefined, configuration?:
            | { __typename?: 'AINodeConfig', prompt?: string | null | undefined, model?: string | null | undefined, topK?: number | null | undefined, systemPrompt?: string | null | undefined, jsonSchemaId?: string | null | undefined }
            | { __typename?: 'EmptyNodeConfig', _empty?: boolean | null | undefined }
            | { __typename?: 'InputNodeConfig' }
            | { __typename?: 'ProcessNodeConfig', options?: any | null | undefined, staticOutput?: any | null | undefined }
            | { __typename?: 'ToolsNodeConfig', options?: any | null | undefined }
           | null | undefined }>, edges: Array<{ __typename?: 'WorkflowEdge', id: string, sourceId: string, targetId: string, sourcePort?: string | null | undefined, targetPort?: string | null | undefined }> }, ui?: { __typename?: 'WorkflowUI', elements: Array<{ __typename?: 'WorkflowUIElement', id: string, type: string, category: string, typeLabel: string, x: number, y: number, width: number, height: number }>, connections: Array<{ __typename?: 'WorkflowUIConnection', id: string, from: string, to: string, fromSide: string, toSide: string }> } | null | undefined } | null | undefined, workflownodeexecutions?: { __typename?: 'WorkflowNodeExecutionConnection', nextToken?: string | null | undefined, items: Array<{ __typename?: 'WorkflowNodeExecution', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, nodeId: string, nodeCategory?: string | null | undefined, nodeName?: string | null | undefined, nodeType?: string | null | undefined, status: WorkflowNodeExecutionStatus, startedAt?: string | null | undefined, completedAt?: string | null | undefined, inputData?: any | null | undefined, outputData?: any | null | undefined, errorMessage?: string | null | undefined, errorDetails?: any | null | undefined }> } | null | undefined } | null | undefined };

export type ListWorkflowExecutionsQueryVariables = Exact<{
  parentId: Scalars['ID']['input'];
  status?: InputMaybe<WorkflowExecutionStatus>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
}>;


export type ListWorkflowExecutionsQuery = { __typename?: 'Query', listWorkflowExecutions: { __typename?: 'WorkflowExecutionConnection', nextToken?: string | null | undefined, items: Array<{ __typename?: 'WorkflowExecution', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, status: WorkflowExecutionStatus, startedAt?: string | null | undefined, completedAt?: string | null | undefined, cancelledAt?: string | null | undefined, triggerEvent?: any | null | undefined, inputData?: any | null | undefined, outputData?: any | null | undefined, errorMessage?: string | null | undefined, totalNodes?: number | null | undefined, completedNodes?: number | null | undefined, currentNodeId?: string | null | undefined, workflow?: { __typename?: 'Workflow', id: string, name: string, definition: { __typename?: 'WorkflowDefinition', nodes: Array<{ __typename?: 'WorkflowNode', id: string, kind: WorkflowNodeKind, label?: string | null | undefined, options?: any | null | undefined }>, edges: Array<{ __typename?: 'WorkflowEdge', id: string, sourceId: string, targetId: string }> } } | null | undefined }> } };

export type GetWorkflowNodeExecutionQueryVariables = Exact<{
  key: CompositeKeyInput;
}>;


export type GetWorkflowNodeExecutionQuery = { __typename?: 'Query', getWorkflowNodeExecution?: { __typename?: 'WorkflowNodeExecution', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, nodeId: string, nodeCategory?: string | null | undefined, nodeName?: string | null | undefined, nodeType?: string | null | undefined, status: WorkflowNodeExecutionStatus, startedAt?: string | null | undefined, completedAt?: string | null | undefined, inputData?: any | null | undefined, outputData?: any | null | undefined, errorMessage?: string | null | undefined, errorDetails?: any | null | undefined, workflowExecution?: { __typename?: 'WorkflowExecution', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, status: WorkflowExecutionStatus, startedAt?: string | null | undefined, completedAt?: string | null | undefined, cancelledAt?: string | null | undefined, triggerEvent?: any | null | undefined, inputData?: any | null | undefined, outputData?: any | null | undefined, errorMessage?: string | null | undefined, totalNodes?: number | null | undefined, completedNodes?: number | null | undefined, currentNodeId?: string | null | undefined } | null | undefined } | null | undefined };

export type ListWorkflowNodeExecutionsQueryVariables = Exact<{
  parentId: Scalars['ID']['input'];
  status?: InputMaybe<WorkflowNodeExecutionStatus>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
}>;


export type ListWorkflowNodeExecutionsQuery = { __typename?: 'Query', listWorkflowNodeExecutions: { __typename?: 'WorkflowNodeExecutionConnection', nextToken?: string | null | undefined, items: Array<{ __typename?: 'WorkflowNodeExecution', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, nodeId: string, nodeCategory?: string | null | undefined, nodeName?: string | null | undefined, nodeType?: string | null | undefined, status: WorkflowNodeExecutionStatus, startedAt?: string | null | undefined, completedAt?: string | null | undefined, inputData?: any | null | undefined, outputData?: any | null | undefined, errorMessage?: string | null | undefined, errorDetails?: any | null | undefined }> } };

export type OnCreateDashboardLayoutSubscriptionVariables = Exact<{
  parentId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type OnCreateDashboardLayoutSubscription = { __typename?: 'Subscription', onCreateDashboardLayout?: { __typename?: 'DashboardLayout', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, state: any, version: string } | null | undefined };

export type OnUpdateDashboardLayoutSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OnUpdateDashboardLayoutSubscription = { __typename?: 'Subscription', onUpdateDashboardLayout?: { __typename?: 'DashboardLayout', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, state: any, version: string } | null | undefined };

export type OnCreateDoclinkSubscriptionVariables = Exact<{
  parentId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type OnCreateDoclinkSubscription = { __typename?: 'Subscription', onCreateDoclink?: { __typename?: 'Doclink', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, filename: string, status: DoclinkStatus, linkType: DoclinkLinkType, documentId: string } | null | undefined };

export type OnUpdateDoclinkSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OnUpdateDoclinkSubscription = { __typename?: 'Subscription', onUpdateDoclink?: { __typename?: 'Doclink', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, filename: string, status: DoclinkStatus, linkType: DoclinkLinkType, documentId: string } | null | undefined };

export type OnDeleteDoclinkSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OnDeleteDoclinkSubscription = { __typename?: 'Subscription', onDeleteDoclink?: { __typename?: 'Doclink', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, filename: string, status: DoclinkStatus, linkType: DoclinkLinkType, documentId: string } | null | undefined };

export type OnCreateDocumentSubscriptionVariables = Exact<{
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  tenantId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type OnCreateDocumentSubscription = { __typename?: 'Subscription', onCreateDocument?: { __typename?: 'Document', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, s3Bucket: string, s3Key: string, mimeType: string, sizeBytes?: number | null | undefined } | null | undefined };

export type OnUpdateDocumentSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OnUpdateDocumentSubscription = { __typename?: 'Subscription', onUpdateDocument?: { __typename?: 'Document', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, s3Bucket: string, s3Key: string, mimeType: string, sizeBytes?: number | null | undefined } | null | undefined };

export type OnDeleteDocumentSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OnDeleteDocumentSubscription = { __typename?: 'Subscription', onDeleteDocument?: { __typename?: 'Document', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, s3Bucket: string, s3Key: string, mimeType: string, sizeBytes?: number | null | undefined } | null | undefined };

export type OnCreateImageSubscriptionVariables = Exact<{
  parentId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type OnCreateImageSubscription = { __typename?: 'Subscription', onCreateImage?: { __typename?: 'Image', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, s3Bucket: string, s3Key: string, mimeType?: string | null | undefined, sizeBytes?: number | null | undefined, parentId: string, pageNum: number, imageId: string, topLeftX: number, topLeftY: number, bottomRightX: number, bottomRightY: number, imageAnnotation?: any | null | undefined } | null | undefined };

export type OnUpdateImageSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OnUpdateImageSubscription = { __typename?: 'Subscription', onUpdateImage?: { __typename?: 'Image', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, s3Bucket: string, s3Key: string, mimeType?: string | null | undefined, sizeBytes?: number | null | undefined, parentId: string, pageNum: number, imageId: string, topLeftX: number, topLeftY: number, bottomRightX: number, bottomRightY: number, imageAnnotation?: any | null | undefined } | null | undefined };

export type OnDeleteImageSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OnDeleteImageSubscription = { __typename?: 'Subscription', onDeleteImage?: { __typename?: 'Image', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, s3Bucket: string, s3Key: string, mimeType?: string | null | undefined, sizeBytes?: number | null | undefined, parentId: string, pageNum: number, imageId: string, topLeftX: number, topLeftY: number, bottomRightX: number, bottomRightY: number, imageAnnotation?: any | null | undefined } | null | undefined };

export type OnCreateJsonSchemaSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnCreateJsonSchemaSubscription = { __typename?: 'Subscription', onCreateJsonSchema?: { __typename?: 'JsonSchema', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, sharingMode: SharingMode, sourceJsonSchemaId?: string | null | undefined, name: string, description?: string | null | undefined, schemaDefinition: any } | null | undefined };

export type OnUpdateJsonSchemaSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OnUpdateJsonSchemaSubscription = { __typename?: 'Subscription', onUpdateJsonSchema?: { __typename?: 'JsonSchema', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, sharingMode: SharingMode, sourceJsonSchemaId?: string | null | undefined, name: string, description?: string | null | undefined, schemaDefinition: any } | null | undefined };

export type OnDeleteJsonSchemaSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OnDeleteJsonSchemaSubscription = { __typename?: 'Subscription', onDeleteJsonSchema?: { __typename?: 'JsonSchema', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, sharingMode: SharingMode, sourceJsonSchemaId?: string | null | undefined, name: string, description?: string | null | undefined, schemaDefinition: any } | null | undefined };

export type OnCreateNotificationSubscriptionVariables = Exact<{
  parentId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type OnCreateNotificationSubscription = { __typename?: 'Subscription', onCreateNotification?: { __typename?: 'Notification', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, message: string, properties?: any | null | undefined } | null | undefined };

export type OnUpdateNotificationSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OnUpdateNotificationSubscription = { __typename?: 'Subscription', onUpdateNotification?: { __typename?: 'Notification', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, message: string, properties?: any | null | undefined } | null | undefined };

export type OnDeleteNotificationSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OnDeleteNotificationSubscription = { __typename?: 'Subscription', onDeleteNotification?: { __typename?: 'Notification', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, message: string, properties?: any | null | undefined } | null | undefined };

export type OnDefinitionSavedSubscriptionVariables = Exact<{
  projectId: Scalars['ID']['input'];
}>;


export type OnDefinitionSavedSubscription = { __typename?: 'Subscription', onDefinitionSaved?: { __typename?: 'EntityDefinition', projectId: string, id: string, name: string, description?: string | null | undefined, jsonSchema: any, structuralHash: string, normalizedJsonSchema?: any | null | undefined, properties?: Array<{ __typename?: 'PropertyDefinition', name: string, description?: string | null | undefined, dataType: PropertyDataType, path: string, isList?: boolean | null | undefined, formula?: string | null | undefined, dependencies?: Array<string | null | undefined> | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type OnDefinitionDeletedSubscriptionVariables = Exact<{
  projectId: Scalars['ID']['input'];
}>;


export type OnDefinitionDeletedSubscription = { __typename?: 'Subscription', onDefinitionDeleted?: { __typename?: 'EntityDefinition', projectId: string, id: string, name: string } | null | undefined };

export type OnInstanceUpdatedSubscriptionVariables = Exact<{
  projectId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
}>;


export type OnInstanceUpdatedSubscription = { __typename?: 'Subscription', onInstanceUpdated?: { __typename?: 'EntityInstance', projectId: string, id: string, definitionId: string, label?: string | null | undefined, updatedAt?: string | null | undefined, senderId?: string | null | undefined, values?: Array<{ __typename?: 'PropertyValue', propertyName: string, stringValue?: string | null | undefined, numberValue?: number | null | undefined, booleanValue?: boolean | null | undefined, dateValue?: string | null | undefined, extractedByAI?: boolean | null | undefined, confidenceScore?: number | null | undefined, sourceEvidence?: string | null | undefined } | null | undefined> | null | undefined, children?: Array<{ __typename?: 'Relationship', relationName: string, targetInstanceId: string } | null | undefined> | null | undefined } | null | undefined };

export type OnInstanceUpdatedMinimalSubscriptionVariables = Exact<{
  projectId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
}>;


export type OnInstanceUpdatedMinimalSubscription = { __typename?: 'Subscription', onInstanceUpdated?: { __typename?: 'EntityInstance', projectId: string, id: string, definitionId: string, label?: string | null | undefined, updatedAt?: string | null | undefined } | null | undefined };

export type OnProjectInstancesChangedSubscriptionVariables = Exact<{
  projectId: Scalars['ID']['input'];
}>;


export type OnProjectInstancesChangedSubscription = { __typename?: 'Subscription', onProjectInstancesChanged?: { __typename?: 'EntityInstance', projectId: string, id: string, definitionId: string, label?: string | null | undefined, updatedAt?: string | null | undefined, senderId?: string | null | undefined, values?: Array<{ __typename?: 'PropertyValue', propertyName: string, stringValue?: string | null | undefined, numberValue?: number | null | undefined, booleanValue?: boolean | null | undefined, dateValue?: string | null | undefined, extractedByAI?: boolean | null | undefined, confidenceScore?: number | null | undefined, sourceEvidence?: string | null | undefined } | null | undefined> | null | undefined, children?: Array<{ __typename?: 'Relationship', relationName: string, targetInstanceId: string } | null | undefined> | null | undefined } | null | undefined };

export type OnInstanceDeletedSubscriptionVariables = Exact<{
  projectId: Scalars['ID']['input'];
}>;


export type OnInstanceDeletedSubscription = { __typename?: 'Subscription', onInstanceDeleted?: { __typename?: 'EntityInstance', projectId: string, id: string, definitionId: string } | null | undefined };

export type OnCreateProjectSubscriptionVariables = Exact<{
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  tenantId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type OnCreateProjectSubscription = { __typename?: 'Subscription', onCreateProject?: { __typename?: 'Project', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, sharingMode: SharingMode, name: string, description?: string | null | undefined, status: ProjectStatus } | null | undefined };

export type OnUpdateProjectSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OnUpdateProjectSubscription = { __typename?: 'Subscription', onUpdateProject?: { __typename?: 'Project', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, sharingMode: SharingMode, name: string, description?: string | null | undefined, status: ProjectStatus } | null | undefined };

export type OnDeleteProjectSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OnDeleteProjectSubscription = { __typename?: 'Subscription', onDeleteProject?: { __typename?: 'Project', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, sharingMode: SharingMode, name: string, description?: string | null | undefined, status: ProjectStatus } | null | undefined };

export type OnRestoreProjectSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OnRestoreProjectSubscription = { __typename?: 'Subscription', onRestoreProject?: { __typename?: 'Project', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, sharingMode: SharingMode, name: string, description?: string | null | undefined, status: ProjectStatus } | null | undefined };

export type OnCreatePromptSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnCreatePromptSubscription = { __typename?: 'Subscription', onCreatePrompt?: { __typename?: 'Prompt', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, sharingMode: SharingMode, name: string, description?: string | null | undefined, prompt: string, systemInstruction?: string | null | undefined, inputVariables?: Array<string> | null | undefined, model: AiModel, version?: number | null | undefined, isActive?: boolean | null | undefined, jsonSchemaId?: string | null | undefined } | null | undefined };

export type OnUpdatePromptSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OnUpdatePromptSubscription = { __typename?: 'Subscription', onUpdatePrompt?: { __typename?: 'Prompt', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, sharingMode: SharingMode, name: string, description?: string | null | undefined, prompt: string, systemInstruction?: string | null | undefined, inputVariables?: Array<string> | null | undefined, model: AiModel, version?: number | null | undefined, isActive?: boolean | null | undefined, jsonSchemaId?: string | null | undefined } | null | undefined };

export type OnDeletePromptSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OnDeletePromptSubscription = { __typename?: 'Subscription', onDeletePrompt?: { __typename?: 'Prompt', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, sharingMode: SharingMode, name: string, description?: string | null | undefined, prompt: string, systemInstruction?: string | null | undefined, inputVariables?: Array<string> | null | undefined, model: AiModel, version?: number | null | undefined, isActive?: boolean | null | undefined, jsonSchemaId?: string | null | undefined } | null | undefined };

export type OnCreateScanSubscriptionVariables = Exact<{
  parentId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type OnCreateScanSubscription = { __typename?: 'Subscription', onCreateScan?: { __typename?: 'Scan', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, s3Bucket: string, s3Key: string, parentId: string } | null | undefined };

export type OnUpdateScanSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OnUpdateScanSubscription = { __typename?: 'Subscription', onUpdateScan?: { __typename?: 'Scan', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, s3Bucket: string, s3Key: string, parentId: string } | null | undefined };

export type OnDeleteScanSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OnDeleteScanSubscription = { __typename?: 'Subscription', onDeleteScan?: { __typename?: 'Scan', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, s3Bucket: string, s3Key: string, parentId: string } | null | undefined };

export type OnCreateTableSubscriptionVariables = Exact<{
  parentId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type OnCreateTableSubscription = { __typename?: 'Subscription', onCreateTable?: { __typename?: 'Table', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, pageNum: number, description: string } | null | undefined };

export type OnUpdateTableSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OnUpdateTableSubscription = { __typename?: 'Subscription', onUpdateTable?: { __typename?: 'Table', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, pageNum: number, description: string } | null | undefined };

export type OnDeleteTableSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OnDeleteTableSubscription = { __typename?: 'Subscription', onDeleteTable?: { __typename?: 'Table', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, pageNum: number, description: string } | null | undefined };

export type OnCreateTextSubscriptionVariables = Exact<{
  parentId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type OnCreateTextSubscription = { __typename?: 'Subscription', onCreateText?: { __typename?: 'Text', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, pageNum: number, text: string } | null | undefined };

export type OnUpdateTextSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OnUpdateTextSubscription = { __typename?: 'Subscription', onUpdateText?: { __typename?: 'Text', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, pageNum: number, text: string } | null | undefined };

export type OnDeleteTextSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OnDeleteTextSubscription = { __typename?: 'Subscription', onDeleteText?: { __typename?: 'Text', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, pageNum: number, text: string } | null | undefined };

export type OnCreateWorkflowSubscriptionVariables = Exact<{
  parentId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type OnCreateWorkflowSubscription = { __typename?: 'Subscription', onCreateWorkflow?: { __typename?: 'Workflow', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, sharingMode: SharingMode, name: string, jsonSchemaId?: string | null | undefined, parentId: string, definition: { __typename?: 'WorkflowDefinition', nodes: Array<{ __typename?: 'WorkflowNode', id: string, kind: WorkflowNodeKind, label?: string | null | undefined, options?: any | null | undefined, configuration?:
          | { __typename?: 'AINodeConfig', prompt?: string | null | undefined, model?: string | null | undefined, topK?: number | null | undefined, systemPrompt?: string | null | undefined, jsonSchemaId?: string | null | undefined }
          | { __typename?: 'EmptyNodeConfig', _empty?: boolean | null | undefined }
          | { __typename?: 'InputNodeConfig' }
          | { __typename?: 'ProcessNodeConfig', options?: any | null | undefined, staticOutput?: any | null | undefined }
          | { __typename?: 'ToolsNodeConfig', options?: any | null | undefined }
         | null | undefined }>, edges: Array<{ __typename?: 'WorkflowEdge', id: string, sourceId: string, targetId: string, sourcePort?: string | null | undefined, targetPort?: string | null | undefined }> }, ui?: { __typename?: 'WorkflowUI', elements: Array<{ __typename?: 'WorkflowUIElement', id: string, type: string, category: string, typeLabel: string, x: number, y: number, width: number, height: number }>, connections: Array<{ __typename?: 'WorkflowUIConnection', id: string, from: string, to: string, fromSide: string, toSide: string }> } | null | undefined } | null | undefined };

export type OnUpdateWorkflowSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OnUpdateWorkflowSubscription = { __typename?: 'Subscription', onUpdateWorkflow?: { __typename?: 'Workflow', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, sharingMode: SharingMode, name: string, jsonSchemaId?: string | null | undefined, parentId: string, definition: { __typename?: 'WorkflowDefinition', nodes: Array<{ __typename?: 'WorkflowNode', id: string, kind: WorkflowNodeKind, label?: string | null | undefined, options?: any | null | undefined, configuration?:
          | { __typename?: 'AINodeConfig', prompt?: string | null | undefined, model?: string | null | undefined, topK?: number | null | undefined, systemPrompt?: string | null | undefined, jsonSchemaId?: string | null | undefined }
          | { __typename?: 'EmptyNodeConfig', _empty?: boolean | null | undefined }
          | { __typename?: 'InputNodeConfig' }
          | { __typename?: 'ProcessNodeConfig', options?: any | null | undefined, staticOutput?: any | null | undefined }
          | { __typename?: 'ToolsNodeConfig', options?: any | null | undefined }
         | null | undefined }>, edges: Array<{ __typename?: 'WorkflowEdge', id: string, sourceId: string, targetId: string, sourcePort?: string | null | undefined, targetPort?: string | null | undefined }> }, ui?: { __typename?: 'WorkflowUI', elements: Array<{ __typename?: 'WorkflowUIElement', id: string, type: string, category: string, typeLabel: string, x: number, y: number, width: number, height: number }>, connections: Array<{ __typename?: 'WorkflowUIConnection', id: string, from: string, to: string, fromSide: string, toSide: string }> } | null | undefined } | null | undefined };

export type OnDeleteWorkflowSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OnDeleteWorkflowSubscription = { __typename?: 'Subscription', onDeleteWorkflow?: { __typename?: 'Workflow', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, sharingMode: SharingMode, name: string, jsonSchemaId?: string | null | undefined, parentId: string, definition: { __typename?: 'WorkflowDefinition', nodes: Array<{ __typename?: 'WorkflowNode', id: string, kind: WorkflowNodeKind, label?: string | null | undefined, options?: any | null | undefined, configuration?:
          | { __typename?: 'AINodeConfig', prompt?: string | null | undefined, model?: string | null | undefined, topK?: number | null | undefined, systemPrompt?: string | null | undefined, jsonSchemaId?: string | null | undefined }
          | { __typename?: 'EmptyNodeConfig', _empty?: boolean | null | undefined }
          | { __typename?: 'InputNodeConfig' }
          | { __typename?: 'ProcessNodeConfig', options?: any | null | undefined, staticOutput?: any | null | undefined }
          | { __typename?: 'ToolsNodeConfig', options?: any | null | undefined }
         | null | undefined }>, edges: Array<{ __typename?: 'WorkflowEdge', id: string, sourceId: string, targetId: string, sourcePort?: string | null | undefined, targetPort?: string | null | undefined }> }, ui?: { __typename?: 'WorkflowUI', elements: Array<{ __typename?: 'WorkflowUIElement', id: string, type: string, category: string, typeLabel: string, x: number, y: number, width: number, height: number }>, connections: Array<{ __typename?: 'WorkflowUIConnection', id: string, from: string, to: string, fromSide: string, toSide: string }> } | null | undefined } | null | undefined };

export type OnCreateWorkflowExecutionSubscriptionVariables = Exact<{
  parentId: Scalars['ID']['input'];
}>;


export type OnCreateWorkflowExecutionSubscription = { __typename?: 'Subscription', onCreateWorkflowExecution?: { __typename?: 'WorkflowExecution', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, status: WorkflowExecutionStatus, startedAt?: string | null | undefined, completedAt?: string | null | undefined, cancelledAt?: string | null | undefined, triggerEvent?: any | null | undefined, inputData?: any | null | undefined, outputData?: any | null | undefined, errorMessage?: string | null | undefined, totalNodes?: number | null | undefined, completedNodes?: number | null | undefined, currentNodeId?: string | null | undefined } | null | undefined };

export type OnUpdateWorkflowExecutionSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OnUpdateWorkflowExecutionSubscription = { __typename?: 'Subscription', onUpdateWorkflowExecution?: { __typename?: 'WorkflowExecution', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, status: WorkflowExecutionStatus, startedAt?: string | null | undefined, completedAt?: string | null | undefined, cancelledAt?: string | null | undefined, triggerEvent?: any | null | undefined, inputData?: any | null | undefined, outputData?: any | null | undefined, errorMessage?: string | null | undefined, totalNodes?: number | null | undefined, completedNodes?: number | null | undefined, currentNodeId?: string | null | undefined } | null | undefined };

export type OnWorkflowExecutionStatusChangeSubscriptionVariables = Exact<{
  parentId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<WorkflowExecutionStatus>;
}>;


export type OnWorkflowExecutionStatusChangeSubscription = { __typename?: 'Subscription', onWorkflowExecutionStatusChange?: { __typename?: 'WorkflowExecution', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, status: WorkflowExecutionStatus, startedAt?: string | null | undefined, completedAt?: string | null | undefined, cancelledAt?: string | null | undefined, triggerEvent?: any | null | undefined, inputData?: any | null | undefined, outputData?: any | null | undefined, errorMessage?: string | null | undefined, totalNodes?: number | null | undefined, completedNodes?: number | null | undefined, currentNodeId?: string | null | undefined } | null | undefined };

export type OnCreateWorkflowNodeExecutionSubscriptionVariables = Exact<{
  parentId: Scalars['ID']['input'];
}>;


export type OnCreateWorkflowNodeExecutionSubscription = { __typename?: 'Subscription', onCreateWorkflowNodeExecution?: { __typename?: 'WorkflowNodeExecution', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, nodeId: string, nodeCategory?: string | null | undefined, nodeName?: string | null | undefined, nodeType?: string | null | undefined, status: WorkflowNodeExecutionStatus, startedAt?: string | null | undefined, completedAt?: string | null | undefined, inputData?: any | null | undefined, outputData?: any | null | undefined, errorMessage?: string | null | undefined, errorDetails?: any | null | undefined } | null | undefined };

export type OnUpdateWorkflowNodeExecutionSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OnUpdateWorkflowNodeExecutionSubscription = { __typename?: 'Subscription', onUpdateWorkflowNodeExecution?: { __typename?: 'WorkflowNodeExecution', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, nodeId: string, nodeCategory?: string | null | undefined, nodeName?: string | null | undefined, nodeType?: string | null | undefined, status: WorkflowNodeExecutionStatus, startedAt?: string | null | undefined, completedAt?: string | null | undefined, inputData?: any | null | undefined, outputData?: any | null | undefined, errorMessage?: string | null | undefined, errorDetails?: any | null | undefined } | null | undefined };

export type OnWorkflowNodeExecutionStatusChangeSubscriptionVariables = Exact<{
  parentId: Scalars['ID']['input'];
}>;


export type OnWorkflowNodeExecutionStatusChangeSubscription = { __typename?: 'Subscription', onWorkflowNodeExecutionStatusChange?: { __typename?: 'WorkflowNodeExecution', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, nodeId: string, nodeCategory?: string | null | undefined, nodeName?: string | null | undefined, nodeType?: string | null | undefined, status: WorkflowNodeExecutionStatus, startedAt?: string | null | undefined, completedAt?: string | null | undefined, inputData?: any | null | undefined, outputData?: any | null | undefined, errorMessage?: string | null | undefined, errorDetails?: any | null | undefined } | null | undefined };

export declare const CreateDashboardLayout: import("graphql").DocumentNode;
export declare const UpdateDashboardLayout: import("graphql").DocumentNode;
export declare const CreateDoclink: import("graphql").DocumentNode;
export declare const UpdateDoclink: import("graphql").DocumentNode;
export declare const DeleteDoclink: import("graphql").DocumentNode;
export declare const CreateDocument: import("graphql").DocumentNode;
export declare const UpdateDocument: import("graphql").DocumentNode;
export declare const DeleteDocument: import("graphql").DocumentNode;
export declare const GeneratePromptDraft: import("graphql").DocumentNode;
export declare const CreateImage: import("graphql").DocumentNode;
export declare const UpdateImage: import("graphql").DocumentNode;
export declare const DeleteImage: import("graphql").DocumentNode;
export declare const CreateJsonSchema: import("graphql").DocumentNode;
export declare const UpdateJsonSchema: import("graphql").DocumentNode;
export declare const DeleteJsonSchema: import("graphql").DocumentNode;
export declare const CreateNotification: import("graphql").DocumentNode;
export declare const UpdateNotification: import("graphql").DocumentNode;
export declare const DeleteNotification: import("graphql").DocumentNode;
export declare const SaveEntityDefinition: import("graphql").DocumentNode;
export declare const DeleteEntityDefinition: import("graphql").DocumentNode;
export declare const SaveEntityInstance: import("graphql").DocumentNode;
export declare const SaveEntityInstanceMinimal: import("graphql").DocumentNode;
export declare const DeleteEntityInstance: import("graphql").DocumentNode;
export declare const CreateProject: import("graphql").DocumentNode;
export declare const UpdateProject: import("graphql").DocumentNode;
export declare const DeleteProject: import("graphql").DocumentNode;
export declare const RestoreProject: import("graphql").DocumentNode;
export declare const CreateScan: import("graphql").DocumentNode;
export declare const UpdateScan: import("graphql").DocumentNode;
export declare const DeleteScan: import("graphql").DocumentNode;
export declare const CreateTable: import("graphql").DocumentNode;
export declare const UpdateTable: import("graphql").DocumentNode;
export declare const DeleteTable: import("graphql").DocumentNode;
export declare const CreateText: import("graphql").DocumentNode;
export declare const UpdateText: import("graphql").DocumentNode;
export declare const DeleteText: import("graphql").DocumentNode;
export declare const CreateWorkflow: import("graphql").DocumentNode;
export declare const UpdateWorkflow: import("graphql").DocumentNode;
export declare const DeleteWorkflow: import("graphql").DocumentNode;
export declare const CreateWorkflowExecution: import("graphql").DocumentNode;
export declare const UpdateWorkflowExecution: import("graphql").DocumentNode;
export declare const CancelWorkflowExecution: import("graphql").DocumentNode;
export declare const StartWorkflowExecution: import("graphql").DocumentNode;
export declare const CompleteWorkflowExecution: import("graphql").DocumentNode;
export declare const FailWorkflowExecution: import("graphql").DocumentNode;
export declare const RetryWorkflowExecution: import("graphql").DocumentNode;
export declare const DeleteWorkflowExecution: import("graphql").DocumentNode;
export declare const CreateWorkflowNodeExecution: import("graphql").DocumentNode;
export declare const UpdateWorkflowNodeExecution: import("graphql").DocumentNode;
export declare const StartWorkflowNodeExecution: import("graphql").DocumentNode;
export declare const CompleteWorkflowNodeExecution: import("graphql").DocumentNode;
export declare const FailWorkflowNodeExecution: import("graphql").DocumentNode;
export declare const RetryWorkflowNodeExecution: import("graphql").DocumentNode;
export declare const DeleteWorkflowNodeExecution: import("graphql").DocumentNode;
export declare const GetDashboardLayout: import("graphql").DocumentNode;
export declare const ListDashboardLayouts: import("graphql").DocumentNode;
export declare const GetDoclink: import("graphql").DocumentNode;
export declare const ListDoclinks: import("graphql").DocumentNode;
export declare const GetDocument: import("graphql").DocumentNode;
export declare const ListDocuments: import("graphql").DocumentNode;
export declare const GetImage: import("graphql").DocumentNode;
export declare const ListImages: import("graphql").DocumentNode;
export declare const JsonSchemaFields: import("graphql").DocumentNode;
export declare const GetJsonSchema: import("graphql").DocumentNode;
export declare const ListJsonSchemas: import("graphql").DocumentNode;
export declare const GetNotification: import("graphql").DocumentNode;
export declare const ListNotifications: import("graphql").DocumentNode;
export declare const OntologyEntityDefinitionFields: import("graphql").DocumentNode;
export declare const OntologyEntityInstanceFields: import("graphql").DocumentNode;
export declare const ListEntityDefinitions: import("graphql").DocumentNode;
export declare const GetEntityDefinition: import("graphql").DocumentNode;
export declare const GetEntityInstance: import("graphql").DocumentNode;
export declare const ListEntityInstances: import("graphql").DocumentNode;
export declare const ListEntityInstancesByDefinition: import("graphql").DocumentNode;
export declare const GetEntityDefinitionByHash: import("graphql").DocumentNode;
export declare const GetProject: import("graphql").DocumentNode;
export declare const ListProjects: import("graphql").DocumentNode;
export declare const GetProjectWithPrompts: import("graphql").DocumentNode;
export declare const PromptFields: import("graphql").DocumentNode;
export declare const GetPrompt: import("graphql").DocumentNode;
export declare const ListPrompts: import("graphql").DocumentNode;
export declare const GetScan: import("graphql").DocumentNode;
export declare const ListScans: import("graphql").DocumentNode;
export declare const GetTable: import("graphql").DocumentNode;
export declare const ListTables: import("graphql").DocumentNode;
export declare const GetText: import("graphql").DocumentNode;
export declare const ListTexts: import("graphql").DocumentNode;
export declare const GetWorkflow: import("graphql").DocumentNode;
export declare const ListWorkflows: import("graphql").DocumentNode;
export declare const GetWorkflowExecution: import("graphql").DocumentNode;
export declare const ListWorkflowExecutions: import("graphql").DocumentNode;
export declare const GetWorkflowNodeExecution: import("graphql").DocumentNode;
export declare const ListWorkflowNodeExecutions: import("graphql").DocumentNode;
export declare const OnCreateDashboardLayout: import("graphql").DocumentNode;
export declare const OnUpdateDashboardLayout: import("graphql").DocumentNode;
export declare const OnCreateDoclink: import("graphql").DocumentNode;
export declare const OnUpdateDoclink: import("graphql").DocumentNode;
export declare const OnDeleteDoclink: import("graphql").DocumentNode;
export declare const OnCreateDocument: import("graphql").DocumentNode;
export declare const OnUpdateDocument: import("graphql").DocumentNode;
export declare const OnDeleteDocument: import("graphql").DocumentNode;
export declare const OnCreateImage: import("graphql").DocumentNode;
export declare const OnUpdateImage: import("graphql").DocumentNode;
export declare const OnDeleteImage: import("graphql").DocumentNode;
export declare const OnCreateJsonSchema: import("graphql").DocumentNode;
export declare const OnUpdateJsonSchema: import("graphql").DocumentNode;
export declare const OnDeleteJsonSchema: import("graphql").DocumentNode;
export declare const OnCreateNotification: import("graphql").DocumentNode;
export declare const OnUpdateNotification: import("graphql").DocumentNode;
export declare const OnDeleteNotification: import("graphql").DocumentNode;
export declare const OnDefinitionSaved: import("graphql").DocumentNode;
export declare const OnDefinitionDeleted: import("graphql").DocumentNode;
export declare const OnInstanceUpdated: import("graphql").DocumentNode;
export declare const OnInstanceUpdatedMinimal: import("graphql").DocumentNode;
export declare const OnProjectInstancesChanged: import("graphql").DocumentNode;
export declare const OnInstanceDeleted: import("graphql").DocumentNode;
export declare const OnCreateProject: import("graphql").DocumentNode;
export declare const OnUpdateProject: import("graphql").DocumentNode;
export declare const OnDeleteProject: import("graphql").DocumentNode;
export declare const OnRestoreProject: import("graphql").DocumentNode;
export declare const OnCreatePrompt: import("graphql").DocumentNode;
export declare const OnUpdatePrompt: import("graphql").DocumentNode;
export declare const OnDeletePrompt: import("graphql").DocumentNode;
export declare const OnCreateScan: import("graphql").DocumentNode;
export declare const OnUpdateScan: import("graphql").DocumentNode;
export declare const OnDeleteScan: import("graphql").DocumentNode;
export declare const OnCreateTable: import("graphql").DocumentNode;
export declare const OnUpdateTable: import("graphql").DocumentNode;
export declare const OnDeleteTable: import("graphql").DocumentNode;
export declare const OnCreateText: import("graphql").DocumentNode;
export declare const OnUpdateText: import("graphql").DocumentNode;
export declare const OnDeleteText: import("graphql").DocumentNode;
export declare const OnCreateWorkflow: import("graphql").DocumentNode;
export declare const OnUpdateWorkflow: import("graphql").DocumentNode;
export declare const OnDeleteWorkflow: import("graphql").DocumentNode;
export declare const OnCreateWorkflowExecution: import("graphql").DocumentNode;
export declare const OnUpdateWorkflowExecution: import("graphql").DocumentNode;
export declare const OnWorkflowExecutionStatusChange: import("graphql").DocumentNode;
export declare const OnCreateWorkflowNodeExecution: import("graphql").DocumentNode;
export declare const OnUpdateWorkflowNodeExecution: import("graphql").DocumentNode;
export declare const OnWorkflowNodeExecutionStatusChange: import("graphql").DocumentNode;