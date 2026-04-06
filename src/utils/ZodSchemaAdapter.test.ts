import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { zodToRawJsonSchema } from './ZodSchemaAdapter.js';
import type { RawJsonSchema } from './SchemaNormalizer.js';

describe('ZodSchemaAdapter', () => {
  describe('zodToRawJsonSchema', () => {
    it('returns a JSON Schema object from a simple Zod schema', () => {
      const zodSchema = z.object({
        name: z.string(),
      });

      const raw = zodToRawJsonSchema(zodSchema);

      expect(raw.type).toBe('object');
      expect(raw.properties).toBeDefined();
      expect((raw.properties as Record<string, RawJsonSchema>).name.type).toBe('string');
      expect(raw.required).toContain('name');
    });

    it('produces additionalProperties: false for z.object', () => {
      const raw = zodToRawJsonSchema(z.object({ x: z.number() }));
      expect(raw.additionalProperties).toBe(false);
    });

    it('inlines nested objects (no $ref)', () => {
      const zodSchema = z.object({
        address: z.object({
          city: z.string(),
        }),
      });

      const raw = zodToRawJsonSchema(zodSchema);
      const addressProps = (raw.properties as Record<string, RawJsonSchema>).address;

      expect(addressProps.type).toBe('object');
      expect(addressProps.properties).toBeDefined();
      expect(raw).not.toHaveProperty('definitions');
      expect(raw).not.toHaveProperty('$defs');
    });

    it('converts constraints (min, max, pattern, etc.)', () => {
      const zodSchema = z.object({
        age: z.number().min(0).max(150),
        email: z.string().email(),
      });

      const raw = zodToRawJsonSchema(zodSchema);
      const props = raw.properties as Record<string, RawJsonSchema>;

      expect(props.age.minimum).toBe(0);
      expect(props.age.maximum).toBe(150);
      expect(props.email.type).toBe('string');
    });

    it('converts z.enum to JSON Schema enum', () => {
      const zodSchema = z.enum(['a', 'b', 'c']);
      const raw = zodToRawJsonSchema(zodSchema);

      expect(raw.type).toBe('string');
      expect(raw.enum).toEqual(['a', 'b', 'c']);
    });

    it('preserves descriptions from .describe()', () => {
      const zodSchema = z.object({
        name: z.string().describe('The user name'),
      }).describe('A user object');

      const raw = zodToRawJsonSchema(zodSchema);

      expect(raw.description).toBe('A user object');
      expect((raw.properties as Record<string, RawJsonSchema>).name.description).toBe('The user name');
    });
  });
});
