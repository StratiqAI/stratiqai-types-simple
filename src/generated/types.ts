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
};

/**
 * Composite Key for accessing Child Entities (Doclink, Topic).
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
  parentId: Scalars['ID']['input'];
  status?: InputMaybe<DoclinkStatus>;
};

export type CreateDocumentInput = {
  mimeType?: InputMaybe<Scalars['String']['input']>;
  s3Bucket: Scalars['String']['input'];
  s3Key: Scalars['String']['input'];
  sizeBytes?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateProjectInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sharingMode?: InputMaybe<SharingMode>;
  status?: InputMaybe<ProjectStatus>;
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
  ownerId: Scalars['ID']['output'];
  parentId: Scalars['ID']['output'];
  status: DoclinkStatus;
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
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
  mimeType: Scalars['String']['output'];
  ownerId: Scalars['ID']['output'];
  s3Bucket: Scalars['String']['output'];
  s3Key: Scalars['String']['output'];
  sizeBytes?: Maybe<Scalars['Int']['output']>;
  tenantId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type DocumentConnection = {
  __typename?: 'DocumentConnection';
  items: Array<Document>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type EntityType =
  | 'DOCLINK'
  | 'PROJECT'
  | 'RESOURCE_SHARE'
  | 'TOPIC';

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
  createProject?: Maybe<Project>;
  deleteDoclink?: Maybe<Doclink>;
  deleteDocument?: Maybe<Document>;
  deleteProject?: Maybe<Project>;
  restoreProject?: Maybe<Project>;
  updateDoclink?: Maybe<Doclink>;
  updateDocument?: Maybe<Document>;
  updateProject?: Maybe<Project>;
};


export type MutationCreateDoclinkArgs = {
  input: CreateDoclinkInput;
};


export type MutationCreateDocumentArgs = {
  input: CreateDocumentInput;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationDeleteDoclinkArgs = {
  key: CompositeKeyInput;
};


export type MutationDeleteDocumentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID']['input'];
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


export type MutationUpdateProjectArgs = {
  id: Scalars['ID']['input'];
  input: UpdateProjectInput;
};

export type Node = {
  id: Scalars['ID']['output'];
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
  getProject?: Maybe<Project>;
  /** List Doclinks for a specific Project. Uses GSI1 (The View). */
  listDoclinks: DoclinkConnection;
  listDocuments: DocumentConnection;
  listProjects: ProjectConnection;
};


export type QueryGetDoclinkArgs = {
  key: CompositeKeyInput;
};


export type QueryGetDocumentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetProjectArgs = {
  id: Scalars['ID']['input'];
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


export type QueryListProjectsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<ListScope>;
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
  mimeType: Scalars['String']['output'];
  s3Bucket: Scalars['String']['output'];
  s3Key: Scalars['String']['output'];
  sizeBytes?: Maybe<Scalars['Int']['output']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** DOCLINK SUBSCRIPTIONS */
  onCreateDoclink?: Maybe<Doclink>;
  /** DOCUMENT SUBSCRIPTIONS */
  onCreateDocument?: Maybe<Document>;
  /** PROJECT SUBSCRIPTIONS */
  onCreateProject?: Maybe<Project>;
  onDeleteDoclink?: Maybe<Doclink>;
  onDeleteDocument?: Maybe<Document>;
  onDeleteProject?: Maybe<Project>;
  onRestoreProject?: Maybe<Project>;
  onUpdateDoclink?: Maybe<Doclink>;
  onUpdateDocument?: Maybe<Document>;
  onUpdateProject?: Maybe<Project>;
};


export type SubscriptionOnCreateDoclinkArgs = {
  parentId?: InputMaybe<Scalars['ID']['input']>;
};


export type SubscriptionOnCreateDocumentArgs = {
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  tenantId?: InputMaybe<Scalars['ID']['input']>;
};


export type SubscriptionOnCreateProjectArgs = {
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  tenantId?: InputMaybe<Scalars['ID']['input']>;
};


export type SubscriptionOnDeleteDoclinkArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnDeleteDocumentArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionOnDeleteProjectArgs = {
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


export type SubscriptionOnUpdateProjectArgs = {
  id: Scalars['ID']['input'];
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
  status?: InputMaybe<DoclinkStatus>;
};

export type UpdateDocumentInput = {
  mimeType?: InputMaybe<Scalars['String']['input']>;
  s3Bucket?: InputMaybe<Scalars['String']['input']>;
  s3Key?: InputMaybe<Scalars['String']['input']>;
  sizeBytes?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateProjectInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sharingMode?: InputMaybe<SharingMode>;
  status?: InputMaybe<ProjectStatus>;
};

export type CreateDoclinkMutationVariables = Exact<{
  input: CreateDoclinkInput;
}>;


export type CreateDoclinkMutation = { __typename?: 'Mutation', createDoclink?: { __typename?: 'Doclink', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, parentId: string, filename: string, status: DoclinkStatus, documentId: string } | null | undefined };

export type UpdateDoclinkMutationVariables = Exact<{
  key: CompositeKeyInput;
  input: UpdateDoclinkInput;
}>;


export type UpdateDoclinkMutation = { __typename?: 'Mutation', updateDoclink?: { __typename?: 'Doclink', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, parentId: string, filename: string, status: DoclinkStatus, documentId: string } | null | undefined };

export type DeleteDoclinkMutationVariables = Exact<{
  key: CompositeKeyInput;
}>;


export type DeleteDoclinkMutation = { __typename?: 'Mutation', deleteDoclink?: { __typename?: 'Doclink', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, parentId: string, filename: string, status: DoclinkStatus, documentId: string } | null | undefined };

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

export type GetDoclinkQueryVariables = Exact<{
  key: CompositeKeyInput;
}>;


export type GetDoclinkQuery = { __typename?: 'Query', getDoclink?: { __typename?: 'Doclink', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, parentId: string, filename: string, status: DoclinkStatus, documentId: string } | null | undefined };

export type ListDoclinksQueryVariables = Exact<{
  parentId: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
}>;


export type ListDoclinksQuery = { __typename?: 'Query', listDoclinks: { __typename?: 'DoclinkConnection', nextToken?: string | null | undefined, items: Array<{ __typename?: 'Doclink', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, parentId: string, filename: string, status: DoclinkStatus, documentId: string }> } };

export type GetDocumentQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetDocumentQuery = { __typename?: 'Query', getDocument?: { __typename?: 'Document', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, s3Bucket: string, s3Key: string, mimeType: string, sizeBytes?: number | null | undefined } | null | undefined };

export type ListDocumentsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
}>;


export type ListDocumentsQuery = { __typename?: 'Query', listDocuments: { __typename?: 'DocumentConnection', nextToken?: string | null | undefined, items: Array<{ __typename?: 'Document', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, s3Bucket: string, s3Key: string, mimeType: string, sizeBytes?: number | null | undefined }> } };

export type GetProjectQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProjectQuery = { __typename?: 'Query', getProject?: { __typename?: 'Project', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, sharingMode: SharingMode, name: string, description?: string | null | undefined, status: ProjectStatus, accessList?: { __typename?: 'ResourceShareConnection', nextToken?: string | null | undefined, items: Array<{ __typename?: 'ResourceShare', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, recipientUserId: string, permission: SharePermission, resourceTitle: string, resourceType: EntityType }> } | null | undefined, doclinks?: { __typename?: 'DoclinkConnection', nextToken?: string | null | undefined, items: Array<{ __typename?: 'Doclink', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, parentId: string, filename: string, status: DoclinkStatus, documentId: string }> } | null | undefined, topics?: { __typename?: 'TopicConnection', nextToken?: string | null | undefined, items: Array<{ __typename?: 'Topic', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, sharingMode: SharingMode, parentId: string, name: string }> } | null | undefined } | null | undefined };

export type ListProjectsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<ListScope>;
}>;


export type ListProjectsQuery = { __typename?: 'Query', listProjects: { __typename?: 'ProjectConnection', nextToken?: string | null | undefined, items: Array<{ __typename?: 'Project', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, sharingMode: SharingMode, name: string, description?: string | null | undefined, status: ProjectStatus }> } };

export type OnCreateDoclinkSubscriptionVariables = Exact<{
  parentId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type OnCreateDoclinkSubscription = { __typename?: 'Subscription', onCreateDoclink?: { __typename?: 'Doclink', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, parentId: string, filename: string, status: DoclinkStatus, documentId: string } | null | undefined };

export type OnUpdateDoclinkSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OnUpdateDoclinkSubscription = { __typename?: 'Subscription', onUpdateDoclink?: { __typename?: 'Doclink', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, parentId: string, filename: string, status: DoclinkStatus, documentId: string } | null | undefined };

export type OnDeleteDoclinkSubscriptionVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OnDeleteDoclinkSubscription = { __typename?: 'Subscription', onDeleteDoclink?: { __typename?: 'Doclink', id: string, entityType: EntityType, tenantId: string, ownerId: string, createdAt: string, updatedAt: string, parentId: string, filename: string, status: DoclinkStatus, documentId: string } | null | undefined };

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

export type OnCreateProjectSubscriptionVariables = Exact<{
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

export declare const CreateDoclink: import("graphql").DocumentNode;
export declare const UpdateDoclink: import("graphql").DocumentNode;
export declare const DeleteDoclink: import("graphql").DocumentNode;
export declare const CreateDocument: import("graphql").DocumentNode;
export declare const UpdateDocument: import("graphql").DocumentNode;
export declare const DeleteDocument: import("graphql").DocumentNode;
export declare const CreateProject: import("graphql").DocumentNode;
export declare const UpdateProject: import("graphql").DocumentNode;
export declare const DeleteProject: import("graphql").DocumentNode;
export declare const RestoreProject: import("graphql").DocumentNode;
export declare const GetDoclink: import("graphql").DocumentNode;
export declare const ListDoclinks: import("graphql").DocumentNode;
export declare const GetDocument: import("graphql").DocumentNode;
export declare const ListDocuments: import("graphql").DocumentNode;
export declare const GetProject: import("graphql").DocumentNode;
export declare const ListProjects: import("graphql").DocumentNode;
export declare const OnCreateDoclink: import("graphql").DocumentNode;
export declare const OnUpdateDoclink: import("graphql").DocumentNode;
export declare const OnDeleteDoclink: import("graphql").DocumentNode;
export declare const OnCreateDocument: import("graphql").DocumentNode;
export declare const OnUpdateDocument: import("graphql").DocumentNode;
export declare const OnDeleteDocument: import("graphql").DocumentNode;
export declare const OnCreateProject: import("graphql").DocumentNode;
export declare const OnUpdateProject: import("graphql").DocumentNode;
export declare const OnDeleteProject: import("graphql").DocumentNode;