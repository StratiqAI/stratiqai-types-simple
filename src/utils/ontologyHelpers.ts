/**
 * Client-side helpers for ontology operations.
 *
 * These utilities wrap SchemaFingerprint for common use cases such as
 * preview hash computation and cache-key generation. The server always
 * computes the authoritative hash via the saveEntityDefinition pipeline;
 * these helpers are for client-side optimistic UI and deduplication.
 */

import { SchemaFingerprint } from './SchemaFingerprint.js';
import { normalizeStructure, stableStringify } from './SchemaNormalizer.js';
import type { RawJsonSchema } from './SchemaNormalizer.js';

/**
 * Compute the structural hash of a JSON Schema for preview / cache-key
 * purposes. Returns the same SHA-256 hex digest that the server computes,
 * enabling optimistic deduplication before calling the mutation.
 */
export async function computeSchemaHash(jsonSchema: RawJsonSchema): Promise<string> {
  const fp = new SchemaFingerprint(jsonSchema);
  return fp.generateStructuralHash();
}

/**
 * Convenience overload for AWSJSON strings (as stored in AppSync).
 */
export async function computeSchemaHashFromString(jsonString: string): Promise<string> {
  const fp = SchemaFingerprint.fromJsonString(jsonString);
  return fp.generateStructuralHash();
}

/**
 * Return both the structural hash and the normalized JSON schema string.
 * Useful when the client wants to display the canonical form alongside
 * the hash (e.g. in a diff or schema inspector UI).
 */
export async function computeSchemaFingerprint(
  jsonSchema: RawJsonSchema
): Promise<{ structuralHash: string; normalizedJsonSchema: string }> {
  const fp = new SchemaFingerprint(jsonSchema);
  const structuralHash = await fp.generateStructuralHash();

  const normalized = normalizeStructure(jsonSchema);
  const normalizedJsonSchema = stableStringify(normalized);

  return { structuralHash, normalizedJsonSchema };
}
