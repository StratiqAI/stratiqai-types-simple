/**
 * SchemaNormalizer — Zero-dependency JSON Schema canonicalization.
 *
 * Provides deterministic normalization of JSON Schema Draft-07 objects:
 *  - Strips semantic metadata (title, description, $comment, etc.)
 *  - Sorts `required` arrays for order independence
 *  - Normalizes single-element `type` arrays to plain strings
 *  - Injects `additionalProperties: false` on object schemas where absent,
 *    aligning with AI-strict requirements (Claude / OpenAI Structured Outputs)
 *
 * Also exports `stableStringify` for deterministic JSON serialization.
 *
 * This module has zero external dependencies so consumers that only need
 * canonicalization (e.g. LLM adapters) do not pull in zod or hashing libs.
 */

/** Keys that carry semantic metadata and do not affect validation behavior. */
export const SEMANTIC_KEYS = new Set([
  'title',
  'description',
  '$schema',
  '$id',
  '$comment',
  'default',
  'examples',
  'errorMessage',
]);

/**
 * Recursive type representing a parsed JSON Schema Draft-07 object.
 * Intentionally permissive via index signature so it handles any valid schema
 * without requiring an exhaustive property list.
 */
export type RawJsonSchema = {
  type?: string | string[];
  properties?: Record<string, RawJsonSchema>;
  required?: string[];
  items?: RawJsonSchema | RawJsonSchema[];
  enum?: unknown[];
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  format?: string;
  additionalProperties?: boolean | RawJsonSchema;
  oneOf?: RawJsonSchema[];
  anyOf?: RawJsonSchema[];
  allOf?: RawJsonSchema[];
  not?: RawJsonSchema;
  const?: unknown;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
  title?: string;
  description?: string;
  $schema?: string;
  $id?: string;
  $comment?: string;
  default?: unknown;
  examples?: unknown[];
  [key: string]: unknown;
};

/**
 * Recursively normalize a JSON Schema for fingerprinting / canonicalization:
 *  - Strips semantic metadata keys at every level.
 *  - Sorts `required` arrays for deterministic output.
 *  - Normalizes single-element `type` arrays to a plain string.
 *  - Injects `additionalProperties: false` on object schemas where absent.
 */
export function normalizeStructure(schema: RawJsonSchema): unknown {
  return normalizeObject(schema);
}

/**
 * Zero-dependency deterministic JSON serialization.
 * Object keys are sorted alphabetically; array element order is preserved.
 */
export function stableStringify(obj: unknown): string {
  return stableStringifyValue(obj);
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function normalizeObject(obj: RawJsonSchema): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (SEMANTIC_KEYS.has(key)) continue;
    if (value === undefined) continue;

    if (key === 'required' && Array.isArray(value)) {
      result[key] = [...(value as string[])].sort();
    } else if (key === 'properties' && isPlainObject(value)) {
      const normalized: Record<string, unknown> = {};
      for (const [propName, propSchema] of Object.entries(value as Record<string, RawJsonSchema>)) {
        normalized[propName] = normalizeObject(propSchema);
      }
      result[key] = normalized;
    } else if (
      (key === 'oneOf' || key === 'anyOf' || key === 'allOf') &&
      Array.isArray(value)
    ) {
      result[key] = (value as RawJsonSchema[]).map(normalizeObject);
    } else if (key === 'not' && isPlainObject(value)) {
      result[key] = normalizeObject(value as RawJsonSchema);
    } else if (key === 'items') {
      if (Array.isArray(value)) {
        result[key] = (value as RawJsonSchema[]).map(normalizeObject);
      } else if (isPlainObject(value)) {
        result[key] = normalizeObject(value as RawJsonSchema);
      } else {
        result[key] = value;
      }
    } else if (key === 'additionalProperties' && isPlainObject(value)) {
      result[key] = normalizeObject(value as RawJsonSchema);
    } else if (isPlainObject(value)) {
      result[key] = normalizeObject(value as RawJsonSchema);
    } else {
      result[key] = value;
    }
  }

  if (Array.isArray(result.type) && (result.type as unknown[]).length === 1) {
    result.type = (result.type as unknown[])[0];
  }

  if (result.type === 'object' || result.properties !== undefined) {
    if (!Object.prototype.hasOwnProperty.call(result, 'additionalProperties')) {
      result.additionalProperties = false;
    }
  }

  return result;
}

function isPlainObject(val: unknown): val is Record<string, unknown> {
  return val !== null && typeof val === 'object' && !Array.isArray(val);
}

function stableStringifyValue(val: unknown): string {
  if (val === null) return 'null';
  if (val === undefined) return 'null';
  if (typeof val === 'boolean' || typeof val === 'number') return JSON.stringify(val);
  if (typeof val === 'string') return JSON.stringify(val);

  if (Array.isArray(val)) {
    const items = val.map((item) => stableStringifyValue(item));
    return `[${items.join(',')}]`;
  }

  if (isPlainObject(val)) {
    const keys = Object.keys(val).sort();
    const pairs = keys
      .filter((k) => val[k] !== undefined)
      .map((k) => `${JSON.stringify(k)}:${stableStringifyValue(val[k])}`);
    return `{${pairs.join(',')}}`;
  }

  return JSON.stringify(val);
}
