/**
 * Mutation Registry
 * 
 * Maps entity types and operations to their corresponding mutation constants and input types.
 * This enables dynamic resolution of mutations based on event metadata.
 */

import type { DocumentNode } from 'graphql';

import { M_CREATE_DOCLINK, M_UPDATE_DOCLINK, M_DELETE_DOCLINK } from './DocLink.js';
import { M_CREATE_DOCUMENT, M_UPDATE_DOCUMENT, M_DELETE_DOCUMENT } from './Document.js';
import { M_CREATE_IMAGE, M_UPDATE_IMAGE, M_DELETE_IMAGE } from './Image.js';
import { M_CREATE_NOTIFICATION, M_UPDATE_NOTIFICATION, M_DELETE_NOTIFICATION } from './Notification.js';
import { M_CREATE_PROJECT, M_UPDATE_PROJECT, M_DELETE_PROJECT, M_RESTORE_PROJECT } from './Project.js';
import { M_CREATE_TABLE, M_UPDATE_TABLE, M_DELETE_TABLE } from './Table.js';
import { M_CREATE_TEXT, M_UPDATE_TEXT, M_DELETE_TEXT } from './Text.js';
import { M_CREATE_SCAN, M_UPDATE_SCAN, M_DELETE_SCAN } from './Scan.js';

export type EntityType = 
  | 'Project'
  | 'DocLink'
  | 'Topic'
  | 'Document'
  | 'Notification'
  | 'Image'
  | 'Table'
  | 'Text'
  | 'Scan';

export type MutationOperation = 'create' | 'update' | 'delete' | 'restore';

export interface MutationRegistryEntry {
  mutation: DocumentNode;
  inputType: string;
  /**
   * Whether this mutation uses a simple ID parameter instead of an input object.
   * For example: deleteProject(id: ID!) vs createProject(input: CreateProjectInput!)
   */
  usesIdParameter?: boolean;
  /**
   * Whether this mutation requires both id and input parameters.
   * For example: updateProject(id: ID!, input: UpdateProjectInput!)
   */
  requiresIdAndInput?: boolean;
  /**
   * Whether this mutation uses a CompositeKeyInput instead of a simple input.
   * For example: updateDoclink(key: CompositeKeyInput!, input: UpdateDoclinkInput!)
   */
  usesCompositeKey?: boolean;
}

type MutationRegistry = {
  [K in EntityType]: {
    [O in MutationOperation]?: MutationRegistryEntry;
  };
};

/**
 * Registry mapping entity types and operations to their mutations and input types
 */
export const MUTATION_REGISTRY: MutationRegistry = {
  Project: {
    create: {
      mutation: M_CREATE_PROJECT,
      inputType: 'CreateProjectInput',
    },
    update: {
      mutation: M_UPDATE_PROJECT,
      inputType: 'UpdateProjectInput',
      requiresIdAndInput: true, // updateProject uses id: ID! and input: UpdateProjectInput!
    },
    delete: {
      mutation: M_DELETE_PROJECT,
      inputType: 'ID', // deleteProject uses id: ID! directly
      usesIdParameter: true,
    },
    restore: {
      mutation: M_RESTORE_PROJECT,
      inputType: 'ID', // restoreProject uses id: ID! directly
      usesIdParameter: true,
    },
  },
  DocLink: {
    create: {
      mutation: M_CREATE_DOCLINK,
      inputType: 'CreateDoclinkInput',
    },
    update: {
      mutation: M_UPDATE_DOCLINK,
      inputType: 'UpdateDoclinkInput',
      usesCompositeKey: true, // updateDoclink uses key: CompositeKeyInput! and input: UpdateDoclinkInput!
    },
    delete: {
      mutation: M_DELETE_DOCLINK,
      inputType: 'CompositeKeyInput',
      usesCompositeKey: true, // deleteDoclink uses key: CompositeKeyInput!
    },
  },
  Document: {
    create: {
      mutation: M_CREATE_DOCUMENT,
      inputType: 'CreateDocumentInput',
    },
    update: {
      mutation: M_UPDATE_DOCUMENT,
      inputType: 'UpdateDocumentInput',
      requiresIdAndInput: true, // updateDocument uses id: ID! and input: UpdateDocumentInput!
    },
    delete: {
      mutation: M_DELETE_DOCUMENT,
      inputType: 'DeleteDocumentInput',
    },
  },
  Notification: {
    create: {
      mutation: M_CREATE_NOTIFICATION,
      inputType: 'CreateNotificationInput',
    },
    update: {
      mutation: M_UPDATE_NOTIFICATION,
      inputType: 'UpdateNotificationInput',
      usesCompositeKey: true, // updateNotification uses key: CompositeKeyInput! and input: UpdateNotificationInput!
    },
    delete: {
      mutation: M_DELETE_NOTIFICATION,
      inputType: 'CompositeKeyInput',
      usesCompositeKey: true, // deleteNotification uses key: CompositeKeyInput!
    },
  },
  Image: {
    create: {
      mutation: M_CREATE_IMAGE,
      inputType: 'CreateImageInput',
    },
    update: {
      mutation: M_UPDATE_IMAGE,
      inputType: 'UpdateImageInput',
      usesCompositeKey: true, // updateImage uses key: CompositeKeyInput! and input: UpdateImageInput!
    },
    delete: {
      mutation: M_DELETE_IMAGE,
      inputType: 'CompositeKeyInput',
      usesCompositeKey: true, // deleteImage uses key: CompositeKeyInput!
    },
  },
  Table: {
    create: {
      mutation: M_CREATE_TABLE,
      inputType: 'CreateTableInput',
    },
    update: {
      mutation: M_UPDATE_TABLE,
      inputType: 'UpdateTableInput',
      usesCompositeKey: true, // updateTable uses key: CompositeKeyInput! and input: UpdateTableInput!
    },
    delete: {
      mutation: M_DELETE_TABLE,
      inputType: 'CompositeKeyInput',
      usesCompositeKey: true, // deleteTable uses key: CompositeKeyInput!
    },
  },
  Text: {
    create: {
      mutation: M_CREATE_TEXT,
      inputType: 'CreateTextInput',
    },
    update: {
      mutation: M_UPDATE_TEXT,
      inputType: 'UpdateTextInput',
      usesCompositeKey: true, // updateText uses key: CompositeKeyInput! and input: UpdateTextInput!
    },
    delete: {
      mutation: M_DELETE_TEXT,
      inputType: 'CompositeKeyInput',
      usesCompositeKey: true, // deleteText uses key: CompositeKeyInput!
    },
  },
  Scan: {
    create: {
      mutation: M_CREATE_SCAN,
      inputType: 'CreateScanInput',
    },
    update: {
      mutation: M_UPDATE_SCAN,
      inputType: 'UpdateScanInput',
      usesCompositeKey: true, // updateScan uses key: CompositeKeyInput! and input: UpdateScanInput!
    },
    delete: {
      mutation: M_DELETE_SCAN,
      inputType: 'CompositeKeyInput',
      usesCompositeKey: true, // deleteScan uses key: CompositeKeyInput!
    },
  },
  Topic: {
    // Topic mutations would go here if they exist
  },
};

/**
 * Get mutation and input type for a given entity and operation
 */
export function getMutation(
  entityType: EntityType,
  operation: MutationOperation
): MutationRegistryEntry | undefined {
  return MUTATION_REGISTRY[entityType]?.[operation];
}

/**
 * Type guard to check if an entity type is valid
 */
export function isValidEntityType(value: string): value is EntityType {
  return value in MUTATION_REGISTRY;
}

/**
 * Type guard to check if an operation is valid
 */
export function isValidOperation(value: string): value is MutationOperation {
  return ['create', 'update', 'delete', 'restore'].includes(value);
}

