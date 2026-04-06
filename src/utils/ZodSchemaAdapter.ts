/**
 * ZodSchemaAdapter — Convert Zod schemas to JSON Schema (Draft 7).
 *
 * Wraps `zod-to-json-schema` with fixed options that produce fully inlined,
 * deterministic JSON Schema suitable for fingerprinting and AI consumption.
 *
 * Depends on `zod` and `zod-to-json-schema`. Consumers that only need
 * normalization or hashing of raw JSON Schema can import `SchemaNormalizer`
 * or `SchemaFingerprint` directly and avoid pulling in these dependencies.
 */

import type { ZodSchema } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';
import type { RawJsonSchema } from './SchemaNormalizer.js';

/**
 * Convert a Zod schema to a `RawJsonSchema` (JSON Schema Draft 7).
 *
 * Uses `$refStrategy: 'none'` to produce a fully inlined schema with no
 * `$ref` / `definitions` indirection, ensuring stable deterministic output.
 */
export function zodToRawJsonSchema(zodSchema: ZodSchema): RawJsonSchema {
  return zodToJsonSchema(zodSchema, {
    target: 'jsonSchema7',
    $refStrategy: 'none',
  }) as RawJsonSchema;
}
