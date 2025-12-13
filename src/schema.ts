import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * GraphQL schema as a string
 * Loaded from schema.graphql file
 * 
 * Note: In the built output, this will resolve to the source schema.graphql file
 */
export const schema = readFileSync(
  join(__dirname, 'schema.graphql'),
  'utf-8'
);

/**
 * Export the schema file path for tools that need it
 * This points to the source schema.graphql file
 */
export const schemaPath = join(__dirname, 'schema.graphql');
