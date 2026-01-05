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
  AWSDateTime: { input: string; output: string; }
  AWSJSON: { input: any; output: any; }
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

export type CreateDoclinkInput = {
  documentId: Scalars['ID']['input'];
  filename: Scalars['String']['input'];
  openAIFileId: Scalars['ID']['input'];
  parentId: Scalars['ID']['input'];
  status?: InputMaybe<DoclinkStatus>;
  vectorStoreId: Scalars['ID']['input'];
};

export type CreateDocumentInput = {
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

export type CreateNotificationInput = {
  message: Scalars['String']['input'];
  parentId: Scalars['ID']['input'];
  properties?: InputMaybe<Scalars['AWSJSON']['input']>;
};

export type CreateProjectInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sharingMode?: InputMaybe<SharingMode>;
  status?: InputMaybe<ProjectStatus>;
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

export type DeleteDocumentInput = {
  id: Scalars['ID']['input'];
};

export type Doclink = Metadata & Node & {
  __typename?: 'Doclink';
  createdAt: Scalars['AWSDateTime']['output'];
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  documentId: Scalars['ID']['output'];
  entityType: EntityType;
  filename: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  openAIFileId: Scalars['ID']['output'];
  ownerId: Scalars['ID']['output'];
  parentId: Scalars['ID']['output'];
  status: DoclinkStatus;
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
  vectorStoreId: Scalars['ID']['output'];
};

export type DoclinkConnection = {
  __typename?: 'DoclinkConnection';
  items: Array<Doclink>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type DoclinkStatus =
  | 'FAILED'
  | 'NOT_UPLOADED'
  | 'PROCESSING'
  | 'READY'
  | 'UPLOADED';

export type Document = Metadata & Node & Storable & {
  __typename?: 'Document';
  createdAt: Scalars['AWSDateTime']['output'];
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  entityType: EntityType;
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

export type DocumentConnection = {
  __typename?: 'DocumentConnection';
  items: Array<Document>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type EntityType =
  | 'DOCLINK'
  | 'DOCUMENT'
  | 'IMAGE'
  | 'NOTIFICATION'
  | 'PROJECT'
  | 'RESOURCE_SHARE'
  | 'SCAN'
  | 'TABLE'
  | 'TEXT'
  | 'TOPIC';

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

export type ListScope =
  | 'ALL_TENANT'
  | 'OWNED_BY_ME'
  | 'SHARED_WITH_ME';

export type Metadata = {
  createdAt: Scalars['AWSDateTime']['output'];
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  entityType: EntityType;
  id: Scalars['ID']['output'];
  ownerId: Scalars['ID']['output'];
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createDoclink?: Maybe<Doclink>;
  createDocument?: Maybe<Document>;
  createImage?: Maybe<Image>;
  createNotification?: Maybe<Notification>;
  createProject?: Maybe<Project>;
  createScan?: Maybe<Scan>;
  createTable?: Maybe<Table>;
  createText?: Maybe<Text>;
  deleteDoclink?: Maybe<Doclink>;
  deleteDocument?: Maybe<Document>;
  deleteImage?: Maybe<Image>;
  deleteNotification?: Maybe<Notification>;
  deleteProject?: Maybe<Project>;
  deleteScan?: Maybe<Scan>;
  deleteTable?: Maybe<Table>;
  deleteText?: Maybe<Text>;
  restoreProject?: Maybe<Project>;
  updateDoclink?: Maybe<Doclink>;
  updateDocument?: Maybe<Document>;
  updateImage?: Maybe<Image>;
  updateNotification?: Maybe<Notification>;
  updateProject?: Maybe<Project>;
  updateScan?: Maybe<Scan>;
  updateTable?: Maybe<Table>;
  updateText?: Maybe<Text>;
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


export type MutationCreateNotificationArgs = {
  input: CreateNotificationInput;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
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


export type MutationDeleteDoclinkArgs = {
  key: CompositeKeyInput;
};


export type MutationDeleteDocumentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteImageArgs = {
  key: CompositeKeyInput;
};


export type MutationDeleteNotificationArgs = {
  key: CompositeKeyInput;
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID']['input'];
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


export type MutationRestoreProjectArgs = {
  id: Scalars['ID']['input'];
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


export type MutationUpdateNotificationArgs = {
  input: UpdateNotificationInput;
  key: CompositeKeyInput;
};


export type MutationUpdateProjectArgs = {
  id: Scalars['ID']['input'];
  input: UpdateProjectInput;
};


export type MutationUpdateScanArgs = {
  input: UpdateScanInput;
  key: CompositeKeyInput;
};


export type MutationUpdateTableArgs = {
  input: UpdateTableInput;
  key: CompositeKeyInput;
};


export type MutationUpdateTextArgs = {
  input: UpdateTextInput;
  key: CompositeKeyInput;
};

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

export type Project = Metadata & Node & Shareable & {
  __typename?: 'Project';
  accessList?: Maybe<ResourceShareConnection>;
  createdAt: Scalars['AWSDateTime']['output'];
  deletedAt?: Maybe<Scalars['AWSDateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  doclinks?: Maybe<DoclinkConnection>;
  entityType: EntityType;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  notifications?: Maybe<NotificationConnection>;
  ownerId: Scalars['ID']['output'];
  sharingMode: SharingMode;
  status: ProjectStatus;
  tenantId: Scalars['ID']['output'];
  topics?: Maybe<TopicConnection>;
  updatedAt: Scalars['AWSDateTime']['output'];
};


export type ProjectAccessListArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type ProjectDoclinksArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type ProjectNotificationsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type ProjectTopicsArgs = {
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
  | 'DELETED';

export type Query = {
  __typename?: 'Query';
  /** Get a single Doclink. Requires composite key (ID + ParentID) for access. */
  getDoclink?: Maybe<Doclink>;
  getDocument?: Maybe<Document>;
  /** Get a single Image. Requires composite key (ID + ParentID) for access. */
  getImage?: Maybe<Image>;
  /** Get a single Notification. Requires composite key (ID + ParentID) for access. */
  getNotification?: Maybe<Notification>;
  getProject?: Maybe<Project>;
  /** Get a single Scan. Requires composite key (ID + ParentID) for access. */
  getScan?: Maybe<Scan>;
  /** Get a single Table. Requires composite key (ID + ParentID) for access. */
  getTable?: Maybe<Table>;
  /** Get a single Text. Requires composite key (ID + ParentID) for access. */
  getText?: Maybe<Text>;
  /** List Doclinks for a specific Project. Uses GSI1 (The View). */
  listDoclinks: DoclinkConnection;
  listDocuments: DocumentConnection;
  /** List Images for a specific Document. Uses GSI1 (The View). */
  listImages: ImageConnection;
  /** List Notifications for a specific Project. Uses GSI1 (The View). */
  listNotifications: NotificationConnection;
  listProjects: ProjectConnection;
  /** List Scans for a specific Document. Uses GSI1 (The View). */
  listScans: ScanConnection;
  /** List Tables for a specific Document. Uses GSI1 (The View). */
  listTables: TableConnection;
  /** List Texts for a specific Document. Uses GSI1 (The View). */
  listTexts: TextConnection;
};


export type QueryGetDoclinkArgs = {
  key: CompositeKeyInput;
};


export type QueryGetDocumentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetImageArgs = {
  key: CompositeKeyInput;
};


export type QueryGetNotificationArgs = {
  key: CompositeKeyInput;
};


export type QueryGetProjectArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetScanArgs = {
  key: CompositeKeyInput;
};


export type QueryGetTableArgs = {
  key: CompositeKeyInput;
};


export type QueryGetTextArgs = {
  key: CompositeKeyInput;
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


export type QueryListImagesArgs = {
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
  /** DOCLINK SUBSCRIPTIONS */
  onCreateDoclink?: Maybe<Doclink>;
  /** DOCUMENT SUBSCRIPTIONS */
  onCreateDocument?: Maybe<Document>;
  /** IMAGE SUBSCRIPTIONS */
  onCreateImage?: Maybe<Image>;
  /** NOTIFICATION SUBSCRIPTIONS */
  onCreateNotification?: Maybe<Notification>;
  /** PROJECT SUBSCRIPTIONS */
  onCreateProject?: Maybe<Project>;
  /** SCAN SUBSCRIPTIONS */
  onCreateScan?: Maybe<Scan>;
  /** TABLE SUBSCRIPTIONS */
  onCreateTable?: Maybe<Table>;
  /** TEXT SUBSCRIPTIONS */
  onCreateText?: Maybe<Text>;
  onDeleteDoclink?: Maybe<Doclink>;
  onDeleteDocument?: Maybe<Document>;
  onDeleteImage?: Maybe<Image>;
  onDeleteNotification?: Maybe<Notification>;
  onDeleteProject?: Maybe<Project>;
  onDeleteScan?: Maybe<Scan>;
  onDeleteTable?: Maybe<Table>;
  onDeleteText?: Maybe<Text>;
  onRestoreProject?: Maybe<Project>;
  onUpdateDoclink?: Maybe<Doclink>;
  onUpdateDocument?: Maybe<Document>;
  onUpdateImage?: Maybe<Image>;
  onUpdateNotification?: Maybe<Notification>;
  onUpdateProject?: Maybe<Project>;
  onUpdateScan?: Maybe<Scan>;
  onUpdateTable?: Maybe<Table>;
  onUpdateText?: Maybe<Text>;
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


export type SubscriptionOnDeleteDoclinkArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnDeleteDocumentArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnDeleteImageArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnDeleteNotificationArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnDeleteProjectArgs = {
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


export type SubscriptionOnRestoreProjectArgs = {
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


export type SubscriptionOnUpdateNotificationArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnUpdateProjectArgs = {
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

export type UpdateDoclinkInput = {
  filename?: InputMaybe<Scalars['String']['input']>;
  openAIFileId: Scalars['ID']['input'];
  status?: InputMaybe<DoclinkStatus>;
  vectorStoreId: Scalars['ID']['input'];
};

export type UpdateDocumentInput = {
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

export type UpdateNotificationInput = {
  message?: InputMaybe<Scalars['String']['input']>;
  properties?: InputMaybe<Scalars['AWSJSON']['input']>;
};

export type UpdateProjectInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sharingMode?: InputMaybe<SharingMode>;
  status?: InputMaybe<ProjectStatus>;
};

export type UpdateScanInput = {
  s3Bucket?: InputMaybe<Scalars['String']['input']>;
  s3Key?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTableInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  pageNum?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateTextInput = {
  pageNum?: InputMaybe<Scalars['Int']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type CreateDoclinkMutationVariables = Exact<{
  input: CreateDoclinkInput;
}>;


export type CreateDoclinkMutation = { __typename?: 'Mutation', createDoclink?: { __typename?: 'Doclink', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, filename: string, vectorStoreId: string, openAIFileId: string, status: DoclinkStatus, documentId: string } | null | undefined };

export type UpdateDoclinkMutationVariables = Exact<{
  key: CompositeKeyInput;
  input: UpdateDoclinkInput;
}>;


export type UpdateDoclinkMutation = { __typename?: 'Mutation', updateDoclink?: { __typename?: 'Doclink', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, filename: string, vectorStoreId: string, openAIFileId: string, status: DoclinkStatus, documentId: string } | null | undefined };

export type DeleteDoclinkMutationVariables = Exact<{
  key: CompositeKeyInput;
}>;


export type DeleteDoclinkMutation = { __typename?: 'Mutation', deleteDoclink?: { __typename?: 'Doclink', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, filename: string, vectorStoreId: string, openAIFileId: string, status: DoclinkStatus, documentId: string } | null | undefined };

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

export type GetDoclinkQueryVariables = Exact<{
  key: CompositeKeyInput;
}>;


export type GetDoclinkQuery = { __typename?: 'Query', getDoclink?: { __typename?: 'Doclink', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, filename: string, vectorStoreId: string, openAIFileId: string, status: DoclinkStatus, documentId: string } | null | undefined };

export type ListDoclinksQueryVariables = Exact<{
  parentId: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
}>;


export type ListDoclinksQuery = { __typename?: 'Query', listDoclinks: { __typename?: 'DoclinkConnection', nextToken?: string | null | undefined, items: Array<{ __typename?: 'Doclink', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, filename: string, vectorStoreId: string, openAIFileId: string, status: DoclinkStatus, documentId: string }> } };

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

export type GetProjectQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProjectQuery = { __typename?: 'Query', getProject?: { __typename?: 'Project', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, sharingMode: SharingMode, name: string, description?: string | null | undefined, status: ProjectStatus, accessList?: { __typename?: 'ResourceShareConnection', nextToken?: string | null | undefined, items: Array<{ __typename?: 'ResourceShare', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, recipientUserId: string, permission: SharePermission, resourceTitle: string, resourceType: EntityType }> } | null | undefined, doclinks?: { __typename?: 'DoclinkConnection', nextToken?: string | null | undefined, items: Array<{ __typename?: 'Doclink', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, parentId: string, vectorStoreId: string, openAIFileId: string, filename: string, status: DoclinkStatus, documentId: string, deletedAt?: string | null | undefined }> } | null | undefined, topics?: { __typename?: 'TopicConnection', nextToken?: string | null | undefined, items: Array<{ __typename?: 'Topic', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, sharingMode: SharingMode, parentId: string, name: string }> } | null | undefined } | null | undefined };

export type ListProjectsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<ListScope>;
}>;


export type ListProjectsQuery = { __typename?: 'Query', listProjects: { __typename?: 'ProjectConnection', nextToken?: string | null | undefined, items: Array<{ __typename?: 'Project', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, sharingMode: SharingMode, name: string, description?: string | null | undefined, status: ProjectStatus }> } };

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

export type OnCreateDoclinkSubscriptionVariables = Exact<{
  parentId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type OnCreateDoclinkSubscription = { __typename?: 'Subscription', onCreateDoclink?: { __typename?: 'Doclink', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, filename: string, vectorStoreId: string, openAIFileId: string, status: DoclinkStatus, documentId: string } | null | undefined };

export type OnUpdateDoclinkSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OnUpdateDoclinkSubscription = { __typename?: 'Subscription', onUpdateDoclink?: { __typename?: 'Doclink', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, filename: string, vectorStoreId: string, openAIFileId: string, status: DoclinkStatus, documentId: string } | null | undefined };

export type OnDeleteDoclinkSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OnDeleteDoclinkSubscription = { __typename?: 'Subscription', onDeleteDoclink?: { __typename?: 'Doclink', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, deletedAt?: string | null | undefined, parentId: string, filename: string, vectorStoreId: string, openAIFileId: string, status: DoclinkStatus, documentId: string } | null | undefined };

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

export declare const CreateDoclink: import("graphql").DocumentNode;
export declare const UpdateDoclink: import("graphql").DocumentNode;
export declare const DeleteDoclink: import("graphql").DocumentNode;
export declare const CreateDocument: import("graphql").DocumentNode;
export declare const UpdateDocument: import("graphql").DocumentNode;
export declare const DeleteDocument: import("graphql").DocumentNode;
export declare const CreateImage: import("graphql").DocumentNode;
export declare const UpdateImage: import("graphql").DocumentNode;
export declare const DeleteImage: import("graphql").DocumentNode;
export declare const CreateNotification: import("graphql").DocumentNode;
export declare const UpdateNotification: import("graphql").DocumentNode;
export declare const DeleteNotification: import("graphql").DocumentNode;
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
export declare const GetDoclink: import("graphql").DocumentNode;
export declare const ListDoclinks: import("graphql").DocumentNode;
export declare const GetDocument: import("graphql").DocumentNode;
export declare const ListDocuments: import("graphql").DocumentNode;
export declare const GetImage: import("graphql").DocumentNode;
export declare const ListImages: import("graphql").DocumentNode;
export declare const GetNotification: import("graphql").DocumentNode;
export declare const ListNotifications: import("graphql").DocumentNode;
export declare const GetProject: import("graphql").DocumentNode;
export declare const ListProjects: import("graphql").DocumentNode;
export declare const GetScan: import("graphql").DocumentNode;
export declare const ListScans: import("graphql").DocumentNode;
export declare const GetTable: import("graphql").DocumentNode;
export declare const ListTables: import("graphql").DocumentNode;
export declare const GetText: import("graphql").DocumentNode;
export declare const ListTexts: import("graphql").DocumentNode;
export declare const OnCreateDoclink: import("graphql").DocumentNode;
export declare const OnUpdateDoclink: import("graphql").DocumentNode;
export declare const OnDeleteDoclink: import("graphql").DocumentNode;
export declare const OnCreateDocument: import("graphql").DocumentNode;
export declare const OnUpdateDocument: import("graphql").DocumentNode;
export declare const OnDeleteDocument: import("graphql").DocumentNode;
export declare const OnCreateImage: import("graphql").DocumentNode;
export declare const OnUpdateImage: import("graphql").DocumentNode;
export declare const OnDeleteImage: import("graphql").DocumentNode;
export declare const OnCreateNotification: import("graphql").DocumentNode;
export declare const OnUpdateNotification: import("graphql").DocumentNode;
export declare const OnDeleteNotification: import("graphql").DocumentNode;
export declare const OnCreateProject: import("graphql").DocumentNode;
export declare const OnUpdateProject: import("graphql").DocumentNode;
export declare const OnDeleteProject: import("graphql").DocumentNode;
export declare const OnCreateScan: import("graphql").DocumentNode;
export declare const OnUpdateScan: import("graphql").DocumentNode;
export declare const OnDeleteScan: import("graphql").DocumentNode;
export declare const OnCreateTable: import("graphql").DocumentNode;
export declare const OnUpdateTable: import("graphql").DocumentNode;
export declare const OnDeleteTable: import("graphql").DocumentNode;
export declare const OnCreateText: import("graphql").DocumentNode;
export declare const OnUpdateText: import("graphql").DocumentNode;
export declare const OnDeleteText: import("graphql").DocumentNode;