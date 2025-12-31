import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const schemaGraphqlPath = join(__dirname, 'schema.graphql');

/**
 * Loads the GraphQL schema from schema.graphql file.
 * Returns null if the file doesn't exist, allowing the package to be used
 * without the schema file when only operations/types are needed.
 */
function loadSchema(): string | null {
  if (!existsSync(schemaGraphqlPath)) {
    return null;
  }
  
  try {
    return readFileSync(schemaGraphqlPath, 'utf-8');
  } catch (error) {
    // Silently return null if file can't be read
    // This allows the package to work without the schema file
    return null;
  }
}

/**
 * GraphQL schema as a string
 * Loaded lazily from schema.graphql file when accessed.
 * 
 * Returns null if the schema.graphql file is not available.
 * This allows the package to be used without the schema file if only
 * operations/types are needed.
 * 
 * Note: The schema file is optional. If you only need GraphQL operations
 * or TypeScript types, you don't need the schema file.
 */
export const schema: string | null = loadSchema();

/**
 * Export the schema file path for tools that need it
 * This points to the source schema.graphql file
 */
export const schemaPath = schemaGraphqlPath;
