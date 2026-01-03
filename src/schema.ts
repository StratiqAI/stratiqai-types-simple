import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Schema.graphql is not exported - only used for code generation
// This path will not exist in the published package
const schemaGraphqlPath = join(__dirname, 'schema.graphql');

let _schema: string | null | undefined = undefined;

/**
 * Loads the GraphQL schema from schema.graphql file lazily.
 * Returns null if the file doesn't exist, allowing the package to be used
 * without the schema file when only operations/types are needed.
 * 
 * This function is called only when the schema is actually accessed,
 * not at module load time.
 */
function loadSchema(): string | null {
  // Return cached value if already loaded
  if (_schema !== undefined) {
    return _schema;
  }
  
  // Check if file exists before trying to read
  if (!existsSync(schemaGraphqlPath)) {
    _schema = null;
    return null;
  }
  
  try {
    _schema = readFileSync(schemaGraphqlPath, 'utf-8');
    return _schema;
  } catch (error) {
    // Silently return null if file can't be read
    // This allows the package to work without the schema file
    _schema = null;
    return null;
  }
}

/**
 * GraphQL schema as a string
 * Loaded lazily from schema.graphql file when this function is called.
 * 
 * Returns null if the schema.graphql file is not available.
 * This allows the package to be used without the schema file if only
 * operations/types are needed.
 * 
 * Note: The schema file is optional. If you only need GraphQL operations
 * or TypeScript types, you don't need the schema file.
 */
export function getSchema(): string | null {
  return loadSchema();
}

/**
 * GraphQL schema as a string (lazy-loaded getter)
 * Accessing this will trigger lazy loading of the schema file.
 * 
 * Returns null if the schema.graphql file is not available.
 * 
 * Note: This is a getter function. Access it like: const s = schema;
 * For explicit function call, use getSchema() instead.
 */
export function schema(): string | null {
  return loadSchema();
}

// Note: schema.graphql is not included in the published package
// These functions will return null when the file is not available
