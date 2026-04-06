/**
 * Demo: define a JSON Schema and print its structural SHA-256 fingerprint.
 * Run: npm run fingerprint:demo   (or: npx tsx scripts/print-schema-fingerprint.ts)
 */
import { SchemaFingerprint } from '../src/utils/SchemaFingerprint.js';
import { normalizeStructure } from '../src/utils/SchemaNormalizer.js';
import type { RawJsonSchema } from '../src/utils/SchemaNormalizer.js';

const exampleSchema: RawJsonSchema = {
  title: 'Property Deal',
  description: 'Metadata like this is ignored for the fingerprint',
  type: 'object',
  properties: {
    askingPrice: { type: 'number', minimum: 0 },
    address: { type: 'string' },
  },
  required: ['askingPrice', 'address'],
};

const exampleSchema2: RawJsonSchema = {
  title: 'Property Deal',
  description: 'Metadata like this is ignored for the fingerprint',
  type: 'object',
  properties: {
    address: { type: 'string' },
    askingPrice: { type: 'number', minimum: 0 }
  },
  required: ['askingPrice', 'address'],
};

const hash = await new SchemaFingerprint(exampleSchema).generateStructuralHash();
const hash2 = await new SchemaFingerprint(exampleSchema2).generateStructuralHash();

console.log('Hashes match:', hash === hash2);

console.log('Schema (normalized for fingerprinting):');
console.log(JSON.stringify(normalizeStructure(exampleSchema), null, 2));
console.log();
console.log('Structural fingerprint (SHA-256 hex):');
console.log(hash);
console.log(hash2);
