/**
 * SchemaFingerprint — Deterministic structural hashing for JSON Schema definitions.
 *
 * Computes a SHA-256 fingerprint of a JSON Schema by normalizing it (via
 * `SchemaNormalizer`) and hashing the canonical representation.
 *
 * Isomorphic: uses `globalThis.crypto.subtle` (Web Crypto API), available in
 * Node.js 18+ and all modern browsers.
 */

import type { ZodSchema } from 'zod';
import { normalizeStructure, stableStringify } from './SchemaNormalizer.js';
import type { RawJsonSchema } from './SchemaNormalizer.js';
import { zodToRawJsonSchema } from './ZodSchemaAdapter.js';

export type { RawJsonSchema } from './SchemaNormalizer.js';

export class SchemaFingerprint {
  private schema: RawJsonSchema;

  constructor(schema: RawJsonSchema) {
    this.schema = schema;
  }

  /** Construct from an AWSJSON string (as stored in AppSync). */
  static fromJsonString(jsonString: string): SchemaFingerprint {
    return new SchemaFingerprint(JSON.parse(jsonString) as RawJsonSchema);
  }

  /**
   * Construct from a Zod schema by converting to JSON Schema (Draft 7) first.
   * Delegates to `zodToRawJsonSchema` from `ZodSchemaAdapter`.
   */
  static fromZod(zodSchema: ZodSchema): SchemaFingerprint {
    return new SchemaFingerprint(zodToRawJsonSchema(zodSchema));
  }

  /**
   * SHA-256 hex digest of the normalized, stable-stringified schema.
   * Uses the Web Crypto API (`globalThis.crypto.subtle`).
   */
  async generateStructuralHash(): Promise<string> {
    const normalized = normalizeStructure(this.schema);
    const canonical = stableStringify(normalized);
    const encoded = new TextEncoder().encode(canonical);
    const hashBuffer = await globalThis.crypto.subtle.digest('SHA-256', encoded);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
}
