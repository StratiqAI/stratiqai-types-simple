import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { SchemaFingerprint } from './SchemaFingerprint.js';
import type { RawJsonSchema } from './SchemaNormalizer.js';

describe('SchemaFingerprint', () => {
  // -----------------------------------------------------------------------
  // Semantic Independence
  // -----------------------------------------------------------------------
  describe('semantic independence', () => {
    it('produces the same hash when only title/description/$comment differ', async () => {
      const schemaA: RawJsonSchema = {
        title: 'Property Deal',
        description: 'A commercial real estate deal',
        $comment: 'Version 1',
        type: 'object',
        properties: {
          askingPrice: { type: 'number', minimum: 0 },
          address: { type: 'string' },
        },
        required: ['askingPrice', 'address'],
      };

      const schemaB: RawJsonSchema = {
        title: 'Completely Different Title',
        description: 'Totally unrelated description text',
        $comment: 'Version 99 — rewritten',
        type: 'object',
        properties: {
          askingPrice: { type: 'number', minimum: 0 },
          address: { type: 'string' },
        },
        required: ['askingPrice', 'address'],
      };

      const hashA = await new SchemaFingerprint(schemaA).generateStructuralHash();
      const hashB = await new SchemaFingerprint(schemaB).generateStructuralHash();

      expect(hashA).toBe(hashB);
      expect(hashA).toHaveLength(64);
    });

    it('ignores $schema, $id, default, and examples', async () => {
      const bare: RawJsonSchema = {
        type: 'object',
        properties: { name: { type: 'string' } },
      };

      const decorated: RawJsonSchema = {
        $schema: 'http://json-schema.org/draft-07/schema#',
        $id: 'https://example.com/my-schema',
        default: {},
        examples: [{ name: 'Alice' }],
        type: 'object',
        properties: { name: { type: 'string', default: 'Unknown', examples: ['Bob'] } },
      };

      const hashBare = await new SchemaFingerprint(bare).generateStructuralHash();
      const hashDecorated = await new SchemaFingerprint(decorated).generateStructuralHash();

      expect(hashBare).toBe(hashDecorated);
    });
  });

  // -----------------------------------------------------------------------
  // Structural Dependence
  // -----------------------------------------------------------------------
  describe('structural dependence', () => {
    it('produces different hashes when a property type changes', async () => {
      const withString: RawJsonSchema = {
        title: 'Same title',
        description: 'Same description',
        type: 'object',
        properties: { value: { type: 'string' } },
      };

      const withNumber: RawJsonSchema = {
        title: 'Same title',
        description: 'Same description',
        type: 'object',
        properties: { value: { type: 'number' } },
      };

      const hashS = await new SchemaFingerprint(withString).generateStructuralHash();
      const hashN = await new SchemaFingerprint(withNumber).generateStructuralHash();

      expect(hashS).not.toBe(hashN);
    });

    it('produces different hashes when constraints differ', async () => {
      const a: RawJsonSchema = {
        type: 'object',
        properties: { age: { type: 'number', minimum: 0 } },
      };

      const b: RawJsonSchema = {
        type: 'object',
        properties: { age: { type: 'number', minimum: 18 } },
      };

      const hashA = await new SchemaFingerprint(a).generateStructuralHash();
      const hashB = await new SchemaFingerprint(b).generateStructuralHash();

      expect(hashA).not.toBe(hashB);
    });
  });

  // -----------------------------------------------------------------------
  // Key Order Independence
  // -----------------------------------------------------------------------
  describe('key order independence', () => {
    it('produces the same hash regardless of property definition order', async () => {
      const schemaAB: RawJsonSchema = {
        type: 'object',
        properties: {
          alpha: { type: 'string' },
          beta: { type: 'number' },
        },
      };

      const schemaBA: RawJsonSchema = {
        type: 'object',
        properties: {
          beta: { type: 'number' },
          alpha: { type: 'string' },
        },
      };

      const hashAB = await new SchemaFingerprint(schemaAB).generateStructuralHash();
      const hashBA = await new SchemaFingerprint(schemaBA).generateStructuralHash();

      expect(hashAB).toBe(hashBA);
    });

    it('produces the same hash regardless of top-level key order', async () => {
      const schema1: RawJsonSchema = {
        type: 'object',
        required: ['a'],
        properties: { a: { type: 'string' } },
      };

      const schema2: RawJsonSchema = {
        properties: { a: { type: 'string' } },
        type: 'object',
        required: ['a'],
      };

      const hash1 = await new SchemaFingerprint(schema1).generateStructuralHash();
      const hash2 = await new SchemaFingerprint(schema2).generateStructuralHash();

      expect(hash1).toBe(hash2);
    });
  });

  // -----------------------------------------------------------------------
  // Nested Object Stripping
  // -----------------------------------------------------------------------
  describe('nested object stripping', () => {
    it('strips descriptions nested inside child objects', async () => {
      const withDescriptions: RawJsonSchema = {
        type: 'object',
        description: 'Root description',
        properties: {
          address: {
            type: 'object',
            description: 'Address block',
            properties: {
              city: { type: 'string', description: 'The city name' },
              zip: { type: 'string', description: 'ZIP/postal code' },
            },
          },
        },
      };

      const withoutDescriptions: RawJsonSchema = {
        type: 'object',
        properties: {
          address: {
            type: 'object',
            properties: {
              city: { type: 'string' },
              zip: { type: 'string' },
            },
          },
        },
      };

      const hashWith = await new SchemaFingerprint(withDescriptions).generateStructuralHash();
      const hashWithout = await new SchemaFingerprint(withoutDescriptions).generateStructuralHash();

      expect(hashWith).toBe(hashWithout);
    });

    it('strips descriptions nested inside array items', async () => {
      const withDesc: RawJsonSchema = {
        type: 'array',
        items: {
          type: 'object',
          description: 'An item in the list',
          properties: { name: { type: 'string', description: 'Item name' } },
        },
      };

      const withoutDesc: RawJsonSchema = {
        type: 'array',
        items: {
          type: 'object',
          properties: { name: { type: 'string' } },
        },
      };

      const hashWith = await new SchemaFingerprint(withDesc).generateStructuralHash();
      const hashWithout = await new SchemaFingerprint(withoutDesc).generateStructuralHash();

      expect(hashWith).toBe(hashWithout);
    });

    it('strips semantic keys inside oneOf/anyOf/allOf', async () => {
      const withMeta: RawJsonSchema = {
        oneOf: [
          { type: 'string', title: 'String option', description: 'A string' },
          { type: 'number', title: 'Number option', description: 'A number' },
        ],
      };

      const withoutMeta: RawJsonSchema = {
        oneOf: [
          { type: 'string' },
          { type: 'number' },
        ],
      };

      const hashWith = await new SchemaFingerprint(withMeta).generateStructuralHash();
      const hashWithout = await new SchemaFingerprint(withoutMeta).generateStructuralHash();

      expect(hashWith).toBe(hashWithout);
    });
  });

  // -----------------------------------------------------------------------
  // Required Array Stability
  // -----------------------------------------------------------------------
  describe('required array stability', () => {
    it('produces the same hash regardless of required array order', async () => {
      const schema1: RawJsonSchema = {
        type: 'object',
        properties: { name: { type: 'string' }, age: { type: 'number' } },
        required: ['name', 'age'],
      };

      const schema2: RawJsonSchema = {
        type: 'object',
        properties: { name: { type: 'string' }, age: { type: 'number' } },
        required: ['age', 'name'],
      };

      const hash1 = await new SchemaFingerprint(schema1).generateStructuralHash();
      const hash2 = await new SchemaFingerprint(schema2).generateStructuralHash();

      expect(hash1).toBe(hash2);
    });
  });

  // -----------------------------------------------------------------------
  // Enum Preservation
  // -----------------------------------------------------------------------
  describe('enum preservation', () => {
    it('produces different hashes when enum values are reordered', async () => {
      const schemaABC: RawJsonSchema = { type: 'string', enum: ['a', 'b', 'c'] };
      const schemaCBA: RawJsonSchema = { type: 'string', enum: ['c', 'b', 'a'] };

      const hashABC = await new SchemaFingerprint(schemaABC).generateStructuralHash();
      const hashCBA = await new SchemaFingerprint(schemaCBA).generateStructuralHash();

      expect(hashABC).not.toBe(hashCBA);
    });

    it('produces the same hash for identical enum arrays', async () => {
      const schema1: RawJsonSchema = { type: 'string', enum: ['x', 'y'] };
      const schema2: RawJsonSchema = { type: 'string', enum: ['x', 'y'] };

      const hash1 = await new SchemaFingerprint(schema1).generateStructuralHash();
      const hash2 = await new SchemaFingerprint(schema2).generateStructuralHash();

      expect(hash1).toBe(hash2);
    });
  });

  // -----------------------------------------------------------------------
  // fromJsonString
  // -----------------------------------------------------------------------
  describe('fromJsonString', () => {
    it('produces the same hash as constructing from a parsed object', async () => {
      const schema: RawJsonSchema = {
        type: 'object',
        properties: {
          total: { type: 'number', minimum: 0 },
          label: { type: 'string', maxLength: 100 },
        },
        required: ['total'],
      };

      const fromObj = await new SchemaFingerprint(schema).generateStructuralHash();
      const fromStr = await SchemaFingerprint.fromJsonString(JSON.stringify(schema)).generateStructuralHash();

      expect(fromObj).toBe(fromStr);
    });

    it('correctly parses and normalizes metadata from a JSON string', async () => {
      const withMeta = JSON.stringify({
        title: 'My Schema',
        description: 'Some text',
        type: 'object',
        properties: { x: { type: 'number' } },
      });

      const withoutMeta: RawJsonSchema = {
        type: 'object',
        properties: { x: { type: 'number' } },
      };

      const hashFromStr = await SchemaFingerprint.fromJsonString(withMeta).generateStructuralHash();
      const hashFromObj = await new SchemaFingerprint(withoutMeta).generateStructuralHash();

      expect(hashFromStr).toBe(hashFromObj);
    });
  });

  // -----------------------------------------------------------------------
  // Zod integration (hashing)
  // -----------------------------------------------------------------------
  describe('Zod integration', () => {
    describe('determinism', () => {
      it('same Zod schema produces the same hash across two calls', async () => {
        const zodSchema = z.object({
          name: z.string(),
          age: z.number().min(0),
        });

        const hash1 = await SchemaFingerprint.fromZod(zodSchema).generateStructuralHash();
        const hash2 = await SchemaFingerprint.fromZod(zodSchema).generateStructuralHash();

        expect(hash1).toBe(hash2);
        expect(hash1).toHaveLength(64);
      });
    });

    describe('parity with hand-written JSON Schema', () => {
      it('simple object: Zod matches hand-written JSON after normalization', async () => {
        const zodSchema = z.object({
          askingPrice: z.number().min(0),
          address: z.string(),
        });

        const handWritten: RawJsonSchema = {
          type: 'object',
          properties: {
            askingPrice: { type: 'number', minimum: 0 },
            address: { type: 'string' },
          },
          required: ['askingPrice', 'address'],
          additionalProperties: false,
        };

        const hashZod = await SchemaFingerprint.fromZod(zodSchema).generateStructuralHash();
        const hashHand = await new SchemaFingerprint(handWritten).generateStructuralHash();

        expect(hashZod).toBe(hashHand);
      });

      it('hand-written JSON without additionalProperties matches Zod (normalization injects false)', async () => {
        const zodSchema = z.object({ content: z.string() });

        const handWritten: RawJsonSchema = {
          type: 'object',
          properties: { content: { type: 'string' } },
          required: ['content'],
        };

        const hashZod = await SchemaFingerprint.fromZod(zodSchema).generateStructuralHash();
        const hashHand = await new SchemaFingerprint(handWritten).generateStructuralHash();

        expect(hashZod).toBe(hashHand);
      });
    });

    describe('semantic metadata', () => {
      it('.describe() on Zod schema does not change the hash', async () => {
        const plain = z.object({ name: z.string() });

        const described = z.object({
          name: z.string().describe('The user name'),
        }).describe('A user object');

        const hashPlain = await SchemaFingerprint.fromZod(plain).generateStructuralHash();
        const hashDescribed = await SchemaFingerprint.fromZod(described).generateStructuralHash();

        expect(hashPlain).toBe(hashDescribed);
      });
    });

    describe('nested objects and arrays', () => {
      it('nested z.object inside z.array produces a stable hash', async () => {
        const zodSchema = z.object({
          items: z.array(z.object({
            name: z.string(),
            quantity: z.number().int().min(1),
          })),
        });

        const hash1 = await SchemaFingerprint.fromZod(zodSchema).generateStructuralHash();
        const hash2 = await SchemaFingerprint.fromZod(zodSchema).generateStructuralHash();

        expect(hash1).toBe(hash2);
        expect(hash1).toHaveLength(64);
      });

      it('nested Zod object matches equivalent hand-written JSON', async () => {
        const zodSchema = z.object({
          address: z.object({ city: z.string(), zip: z.string() }),
        });

        const handWritten: RawJsonSchema = {
          type: 'object',
          properties: {
            address: {
              type: 'object',
              properties: { city: { type: 'string' }, zip: { type: 'string' } },
              required: ['city', 'zip'],
              additionalProperties: false,
            },
          },
          required: ['address'],
          additionalProperties: false,
        };

        const hashZod = await SchemaFingerprint.fromZod(zodSchema).generateStructuralHash();
        const hashHand = await new SchemaFingerprint(handWritten).generateStructuralHash();

        expect(hashZod).toBe(hashHand);
      });
    });

    describe('unions and enums', () => {
      it('z.enum produces a stable hash', async () => {
        const zodSchema = z.object({ status: z.enum(['active', 'inactive', 'pending']) });

        const hash1 = await SchemaFingerprint.fromZod(zodSchema).generateStructuralHash();
        const hash2 = await SchemaFingerprint.fromZod(zodSchema).generateStructuralHash();

        expect(hash1).toBe(hash2);
      });

      it('z.union produces a stable hash', async () => {
        const zodSchema = z.union([
          z.object({ type: z.literal('text'), content: z.string() }),
          z.object({ type: z.literal('image'), url: z.string() }),
        ]);

        const hash1 = await SchemaFingerprint.fromZod(zodSchema).generateStructuralHash();
        const hash2 = await SchemaFingerprint.fromZod(zodSchema).generateStructuralHash();

        expect(hash1).toBe(hash2);
      });
    });
  });
});
