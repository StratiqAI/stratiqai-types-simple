import { describe, it, expect } from 'vitest';
import { normalizeStructure, stableStringify, SEMANTIC_KEYS, type RawJsonSchema } from './SchemaNormalizer.js';

describe('SchemaNormalizer', () => {
  // -----------------------------------------------------------------------
  // normalizeStructure — semantic stripping
  // -----------------------------------------------------------------------
  describe('normalizeStructure', () => {
    it('returns an object without semantic keys', () => {
      const input: RawJsonSchema = {
        title: 'Test',
        description: 'Desc',
        $schema: 'http://json-schema.org/draft-07/schema#',
        $id: 'test-id',
        $comment: 'A comment',
        default: 'foo',
        examples: ['bar'],
        type: 'object',
        properties: { a: { type: 'string' } },
        required: ['a'],
      };

      const normalized = normalizeStructure(input) as Record<string, unknown>;

      expect(normalized).not.toHaveProperty('title');
      expect(normalized).not.toHaveProperty('description');
      expect(normalized).not.toHaveProperty('$schema');
      expect(normalized).not.toHaveProperty('$id');
      expect(normalized).not.toHaveProperty('$comment');
      expect(normalized).not.toHaveProperty('default');
      expect(normalized).not.toHaveProperty('examples');
      expect(normalized).toHaveProperty('type', 'object');
      expect(normalized).toHaveProperty('properties');
      expect(normalized).toHaveProperty('required');
    });

    it('returns normalized object with injected defaults and stripped semantics', () => {
      const input: RawJsonSchema = {
        title: 'Test',
        description: 'Desc',
        type: 'object',
        properties: { a: { type: 'string', description: 'field A' } },
        required: ['a'],
      };

      const normalized = normalizeStructure(input) as Record<string, unknown>;

      expect(normalized).not.toHaveProperty('title');
      expect(normalized).not.toHaveProperty('description');
      expect(normalized).toHaveProperty('type', 'object');
      expect(normalized).toHaveProperty('properties');
      expect(normalized).toHaveProperty('required');
      expect(normalized.additionalProperties).toBe(false);
    });
  });

  // -----------------------------------------------------------------------
  // additionalProperties defaulting
  // -----------------------------------------------------------------------
  describe('additionalProperties defaulting', () => {
    it('omitted additionalProperties is normalized to false', () => {
      const omitted: RawJsonSchema = {
        type: 'object',
        properties: { name: { type: 'string' } },
      };

      const explicitFalse: RawJsonSchema = {
        type: 'object',
        properties: { name: { type: 'string' } },
        additionalProperties: false,
      };

      const normOmitted = stableStringify(normalizeStructure(omitted));
      const normFalse = stableStringify(normalizeStructure(explicitFalse));

      expect(normOmitted).toBe(normFalse);
    });

    it('injects additionalProperties: false at every nested object layer', () => {
      const nested: RawJsonSchema = {
        type: 'object',
        properties: {
          address: {
            type: 'object',
            properties: { city: { type: 'string' } },
          },
        },
      };

      const nestedExplicit: RawJsonSchema = {
        type: 'object',
        properties: {
          address: {
            type: 'object',
            properties: { city: { type: 'string' } },
            additionalProperties: false,
          },
        },
        additionalProperties: false,
      };

      expect(stableStringify(normalizeStructure(nested)))
        .toBe(stableStringify(normalizeStructure(nestedExplicit)));
    });

    it('preserves explicit additionalProperties: true', () => {
      const closed: RawJsonSchema = {
        type: 'object',
        properties: { name: { type: 'string' } },
        additionalProperties: false,
      };

      const open: RawJsonSchema = {
        type: 'object',
        properties: { name: { type: 'string' } },
        additionalProperties: true,
      };

      expect(stableStringify(normalizeStructure(closed)))
        .not.toBe(stableStringify(normalizeStructure(open)));
    });

    it('preserves additionalProperties when it is a schema object', () => {
      const withSchema: RawJsonSchema = {
        type: 'object',
        properties: { name: { type: 'string' } },
        additionalProperties: { type: 'number' },
      };

      const withFalse: RawJsonSchema = {
        type: 'object',
        properties: { name: { type: 'string' } },
        additionalProperties: false,
      };

      expect(stableStringify(normalizeStructure(withSchema)))
        .not.toBe(stableStringify(normalizeStructure(withFalse)));
    });

    it('defaults additionalProperties when only properties is present (no explicit type)', () => {
      const implicitObject: RawJsonSchema = {
        properties: { x: { type: 'number' } },
      };

      const normalized = normalizeStructure(implicitObject) as Record<string, unknown>;
      expect(normalized.additionalProperties).toBe(false);
    });

    it('does not inject additionalProperties on non-object schemas', () => {
      const arraySchema: RawJsonSchema = {
        type: 'array',
        items: { type: 'string' },
      };

      const normalized = normalizeStructure(arraySchema) as Record<string, unknown>;
      expect(normalized).not.toHaveProperty('additionalProperties');
    });
  });

  // -----------------------------------------------------------------------
  // type normalization
  // -----------------------------------------------------------------------
  describe('type normalization', () => {
    it('single-element type array is normalized to plain string', () => {
      const withArray: RawJsonSchema = { type: ['string'] };
      const withString: RawJsonSchema = { type: 'string' };

      expect(stableStringify(normalizeStructure(withArray)))
        .toBe(stableStringify(normalizeStructure(withString)));
    });

    it('multi-element type array is preserved', () => {
      const schema: RawJsonSchema = { type: ['string', 'null'] };

      const normalized = normalizeStructure(schema) as Record<string, unknown>;
      expect(normalized.type).toEqual(['string', 'null']);
    });

    it('single-element type array on nested property is normalized', () => {
      const a: RawJsonSchema = {
        type: 'object',
        properties: { age: { type: ['number'] } },
      };

      const b: RawJsonSchema = {
        type: 'object',
        properties: { age: { type: 'number' } },
      };

      expect(stableStringify(normalizeStructure(a)))
        .toBe(stableStringify(normalizeStructure(b)));
    });
  });

  // -----------------------------------------------------------------------
  // errorMessage stripping
  // -----------------------------------------------------------------------
  describe('errorMessage stripping', () => {
    it('ignores errorMessage metadata', () => {
      const withError: RawJsonSchema = {
        type: 'object',
        properties: { name: { type: 'string', errorMessage: 'Must be a string' } as RawJsonSchema },
        errorMessage: { required: 'Name is required' },
      };

      const withoutError: RawJsonSchema = {
        type: 'object',
        properties: { name: { type: 'string' } },
      };

      expect(stableStringify(normalizeStructure(withError)))
        .toBe(stableStringify(normalizeStructure(withoutError)));
    });
  });

  // -----------------------------------------------------------------------
  // SEMANTIC_KEYS
  // -----------------------------------------------------------------------
  describe('SEMANTIC_KEYS', () => {
    it('contains the expected keys', () => {
      expect(SEMANTIC_KEYS.has('title')).toBe(true);
      expect(SEMANTIC_KEYS.has('description')).toBe(true);
      expect(SEMANTIC_KEYS.has('$schema')).toBe(true);
      expect(SEMANTIC_KEYS.has('$id')).toBe(true);
      expect(SEMANTIC_KEYS.has('$comment')).toBe(true);
      expect(SEMANTIC_KEYS.has('default')).toBe(true);
      expect(SEMANTIC_KEYS.has('examples')).toBe(true);
      expect(SEMANTIC_KEYS.has('errorMessage')).toBe(true);
      expect(SEMANTIC_KEYS.has('type')).toBe(false);
    });
  });

  // -----------------------------------------------------------------------
  // stableStringify
  // -----------------------------------------------------------------------
  describe('stableStringify', () => {
    it('sorts object keys alphabetically', () => {
      expect(stableStringify({ b: 2, a: 1 })).toBe('{"a":1,"b":2}');
    });

    it('preserves array element order', () => {
      expect(stableStringify([3, 1, 2])).toBe('[3,1,2]');
    });

    it('handles null and nested structures', () => {
      expect(stableStringify({ z: null, a: { c: 1, b: 2 } }))
        .toBe('{"a":{"b":2,"c":1},"z":null}');
    });

    it('omits undefined values in objects', () => {
      expect(stableStringify({ a: 1, b: undefined, c: 3 }))
        .toBe('{"a":1,"c":3}');
    });
  });
});
