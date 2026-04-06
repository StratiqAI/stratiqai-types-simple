# Schema Fingerprinting Architecture

> `@stratiqai/types-simple` — `src/utils/`

This document describes the schema fingerprinting subsystem: three focused modules that normalize, convert, and hash JSON Schema definitions so that structurally identical schemas always produce the same SHA-256 fingerprint, regardless of whether they were defined as hand-written JSON, Zod schemas, or AI-generated output.

## Why this exists

StratiqAI uses JSON Schema to describe the shape of data flowing between AI providers and dashboard widgets. The fingerprint is the **routing key**: when an AI returns data, the platform computes its schema fingerprint and matches it to the widget that expects that shape.

For this to work reliably, the fingerprint must be **stable across all schema sources**:

- Backend developers hand-writing JSON Schema
- Frontend developers defining Zod schemas
- Claude / OpenAI Structured Outputs emitting strict schemas with `additionalProperties: false`

Without normalization, trivial differences (omitting `additionalProperties`, reordering `required`, adding `description`) would produce different hashes for logically identical schemas, breaking widget routing.

## Module dependency graph

```
SchemaNormalizer          (zero external deps)
       ^        ^
       |         \
SchemaFingerprint   ZodSchemaAdapter
  (hashing)        (zod, zod-to-json-schema)
```

`SchemaFingerprint` imports `SchemaNormalizer` for normalization and `ZodSchemaAdapter` for its `fromZod` convenience factory. `ZodSchemaAdapter` imports the `RawJsonSchema` type from `SchemaNormalizer`. There are no circular dependencies.

## Modules

### `SchemaNormalizer.ts` — Zero dependencies

**Purpose:** Canonicalize any `RawJsonSchema` into a deterministic structural form suitable for hashing or sending to LLMs.

**Exports:**

| Export | Type | Description |
|---|---|---|
| `RawJsonSchema` | type | Permissive Draft-07 JSON Schema type with index signature. The shared currency type across all three modules. |
| `SEMANTIC_KEYS` | `Set<string>` | Keys stripped during normalization: `title`, `description`, `$schema`, `$id`, `$comment`, `default`, `examples`, `errorMessage`. |
| `normalizeStructure(schema)` | function | Recursive normalizer. Returns a new plain object (does not mutate input). |
| `stableStringify(obj)` | function | Deterministic JSON serialization — alphabetical key sort, preserves array order. |

**Normalization rules** (applied recursively at every schema node):

1. **Strip semantic keys** — Any key in `SEMANTIC_KEYS` is removed.
2. **Sort `required` arrays** — `["b", "a"]` becomes `["a", "b"]`.
3. **Normalize single-element `type` arrays** — `type: ["string"]` becomes `type: "string"`. Multi-element arrays (e.g. `["string", "null"]`) are preserved.
4. **Default `additionalProperties: false` on objects** — If a node has `type: "object"` or a `properties` key, and `additionalProperties` is absent, the normalizer injects `additionalProperties: false`. Explicit `true` or a schema object value are preserved as-is.
5. **Recurse into structural keys** — `properties`, `items`, `oneOf`, `anyOf`, `allOf`, `not`, `additionalProperties` (when it's a schema object), and any other plain-object values are recursed into.

**Design decision — closed objects by default:** Claude and OpenAI Structured Outputs require `additionalProperties: false` on objects to prevent the model from hallucinating extra fields. By normalizing omission to `false`, hand-written schemas that forget this key still match Zod-converted or AI-strict schemas. If you explicitly want an open object, set `additionalProperties: true` — it will be preserved and produce a different fingerprint.

### `ZodSchemaAdapter.ts` — Depends on `zod`, `zod-to-json-schema`

**Purpose:** Convert a Zod schema to a `RawJsonSchema` using fixed, deterministic options.

**Exports:**

| Export | Type | Description |
|---|---|---|
| `zodToRawJsonSchema(zodSchema)` | function | Converts any `ZodSchema` to `RawJsonSchema` using Draft 7 target and `$refStrategy: 'none'` (fully inlined, no `$ref` / `definitions`). |

**Fixed conversion options:**
```typescript
{ target: 'jsonSchema7', $refStrategy: 'none' }
```

This module has no knowledge of hashing. It returns raw (un-normalized) JSON Schema. Callers pipe the result into `normalizeStructure` or `SchemaFingerprint` as needed.

**Why `$refStrategy: 'none'`:** Ref-based output creates `$ref` / `definitions` wrappers that differ structurally from inlined hand-written JSON. Inlining everything produces schemas that normalize identically to hand-written equivalents.

### `SchemaFingerprint.ts` — Depends on `SchemaNormalizer`, `ZodSchemaAdapter`

**Purpose:** Compute a SHA-256 structural fingerprint of any JSON Schema (or Zod schema).

**Exports:**

| Export | Type | Description |
|---|---|---|
| `SchemaFingerprint` | class | Main entry point for fingerprinting. |
| `RawJsonSchema` | type (re-export) | Re-exported from `SchemaNormalizer` for import convenience. |

**Class API:**

```typescript
class SchemaFingerprint {
  constructor(schema: RawJsonSchema)

  // Factory: parse a JSON string (e.g. from AppSync AWSJSON)
  static fromJsonString(jsonString: string): SchemaFingerprint

  // Factory: convert a Zod schema, then wrap for hashing
  static fromZod(zodSchema: ZodSchema): SchemaFingerprint

  // Compute the SHA-256 hex digest (64 chars)
  async generateStructuralHash(): Promise<string>
}
```

**Hashing pipeline:**

```
Input (RawJsonSchema or Zod)
  → normalizeStructure()     [SchemaNormalizer]
  → stableStringify()        [SchemaNormalizer]
  → TextEncoder.encode()
  → crypto.subtle.digest('SHA-256', ...)
  → hex string (64 chars)
```

The hash is async because `crypto.subtle.digest` returns a Promise. The Web Crypto API is available in Node.js 18+ and all modern browsers.

## Package exports

Consumers can import from the main entry point or from subpath exports to control their dependency footprint:

```typescript
// Everything (pulls in zod transitively)
import { SchemaFingerprint, normalizeStructure, zodToRawJsonSchema } from '@stratiqai/types-simple';

// Just normalization (zero external deps at runtime)
import { normalizeStructure, stableStringify } from '@stratiqai/types-simple/utils/SchemaNormalizer';

// Just Zod conversion
import { zodToRawJsonSchema } from '@stratiqai/types-simple/utils/ZodSchemaAdapter';

// Just hashing
import { SchemaFingerprint } from '@stratiqai/types-simple/utils/SchemaFingerprint';
```

## Usage examples

### Hash a hand-written JSON Schema

```typescript
import { SchemaFingerprint } from '@stratiqai/types-simple';

const hash = await new SchemaFingerprint({
  type: 'object',
  properties: {
    askingPrice: { type: 'number', minimum: 0 },
    address: { type: 'string' },
  },
  required: ['askingPrice', 'address'],
}).generateStructuralHash();
// → "d1caed0b..." (64 hex chars)
```

### Hash a Zod schema and compare to hand-written JSON

```typescript
import { z } from 'zod';
import { SchemaFingerprint } from '@stratiqai/types-simple';

const zodHash = await SchemaFingerprint.fromZod(
  z.object({ askingPrice: z.number().min(0), address: z.string() })
).generateStructuralHash();

const jsonHash = await new SchemaFingerprint({
  type: 'object',
  properties: {
    askingPrice: { type: 'number', minimum: 0 },
    address: { type: 'string' },
  },
  required: ['askingPrice', 'address'],
}).generateStructuralHash();

zodHash === jsonHash; // true — normalization aligns both
```

### Normalize a schema before sending to an LLM

```typescript
import { normalizeStructure } from '@stratiqai/types-simple/utils/SchemaNormalizer';

const normalized = normalizeStructure({
  title: 'Deal',
  type: 'object',
  properties: { price: { type: 'number' } },
});
// → { type: 'object', properties: { price: { type: 'number' } }, additionalProperties: false }
// title stripped, additionalProperties injected
```

### Inspect what Zod produces before hashing

```typescript
import { zodToRawJsonSchema } from '@stratiqai/types-simple/utils/ZodSchemaAdapter';
import { z } from 'zod';

const raw = zodToRawJsonSchema(z.object({ name: z.string() }));
console.log(JSON.stringify(raw, null, 2));
// Shows the exact JSON Schema that will be normalized and hashed
```

## Test structure

Tests are split to match the module boundaries — 3 files, 45 tests total:

| File | Tests | What it covers |
|---|---|---|
| `SchemaNormalizer.test.ts` | 17 | Semantic stripping, `additionalProperties` defaulting (omitted/explicit false/true/schema), `type` array normalization, `errorMessage` stripping, `SEMANTIC_KEYS` contents, `stableStringify` serialization. |
| `ZodSchemaAdapter.test.ts` | 6 | Conversion shape, `additionalProperties: false` output, inlining (no `$ref`), constraints, enums, `.describe()` passthrough. |
| `SchemaFingerprint.test.ts` | 22 | End-to-end hashing: semantic independence, structural dependence, key order independence, nested stripping, `required` stability, enum preservation, `fromJsonString`, and full Zod integration (determinism, parity with hand-written JSON, `.describe()` metadata, nesting, unions/enums). |

Run with: `npm test` (vitest)

## Known limitations and future considerations

- **`$ref` / `definitions` in hand-written JSON:** The normalizer does not resolve `$ref` pointers. If a hand-written schema uses `$ref`, it will not match an equivalent inlined schema. Keep schemas inlined for fingerprinting.
- **Optional / nullable encoding:** Zod's `.optional()` and `.nullable()` may produce `anyOf` wrappers that don't match a hand-written `type: ["string", "null"]`. Test parity explicitly if you use these patterns.
- **Hash migration:** Changing normalization rules (e.g. adding new defaults) changes fingerprints for all schemas. Any stored fingerprints in the database must be recomputed.
- **Converter drift:** `zod-to-json-schema` output can change across versions. The test suite pins expectations; run tests after bumping the dependency.
