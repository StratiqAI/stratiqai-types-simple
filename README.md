# StratiqAI Types Simple

Central package for GraphQL schema, operations, and TypeScript types.

## Workflow for Keeping Types in Sync

### 1. Update GraphQL Schema
Edit `src/schema.graphql` when you need to change types, fields, or operations.

### 2. Update GraphQL Operations
Edit operation files in `src/graphql/**/*.ts` to match the schema.

### 3. Generate TypeScript Types
Run code generation to create TypeScript types from the schema and validate operations:

```bash
npm run generate:types
```

This will:
- ✅ Generate TypeScript types from the schema
- ✅ Validate all operations against the schema
- ✅ Fail if operations don't match the schema (prevents drift)

### 4. Use Generated Types
Import and use the generated types in your code:

```typescript
import { Q_GET_PROJECT } from 'stratiqai-types-simple/operations';
import type { GetProjectQuery, GetProjectQueryVariables } from 'stratiqai-types-simple';

// Type-safe GraphQL operations
const result = await client.query<GetProjectQuery, GetProjectQueryVariables>({
  query: Q_GET_PROJECT,
  variables: { id: '123' }
});
```

## Best Practices

1. **Always run `npm run generate:types` after schema changes** - This ensures types stay in sync
2. **Fix validation errors immediately** - Don't ignore codegen validation errors
3. **Use generated types everywhere** - Import types from this package, don't redefine them
4. **Schema-first development** - Update the schema first, then operations, then regenerate types

## CI/CD Integration

Add to your CI pipeline to catch type mismatches:

```yaml
- name: Validate GraphQL types
  run: npm run generate:types
```

This will fail the build if operations don't match the schema.
