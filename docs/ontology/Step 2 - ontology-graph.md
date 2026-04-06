---
title: Ontology graph (DynamoDB, GraphQL, resolvers)
description: Ontology graph table, merged GraphQL schema, AppSync JS resolvers, and AppSync SDL constraints
---

# Ontology graph

This document describes the **ontology graph** feature: a dedicated DynamoDB table and AppSync operations for **entity definitions** (metamodel) and **entity instances** (graph data), kept separate from the main application single-table design and pipeline resolvers.

## What was added

### DynamoDB (`modules/storage`)

- New table resource `aws_dynamodb_table.ontology_graph`.
- **Primary key:** `projectId` (hash), `recordId` (range). Item keys use prefixes such as `PROJ#…`, `DEF#…`, `INST#…`.
- **GSI1:** `GSI1PK` / `GSI1SK` (name `GSI1`), projection `ALL`.
- **Streams:** `NEW_AND_OLD_IMAGES`, PITR on, pay-per-request billing, deletion protection in prod (same pattern as other platform tables).

Outputs in `modules/storage/outputs.tf`:

- `dynamodb_table_ontology_graph_name`
- `dynamodb_table_ontology_graph_arn`
- `dynamodb_stream_ontology_graph_arn`

### AppSync API (`modules/api`)

- **Variables:** `dynamodb_table_ontology_name`, `dynamodb_table_ontology_arn` in `variables.tf`.
- **IAM:** The existing AppSync DynamoDB role policy includes the ontology table ARN and `${table}/index/*`.
- **Datasource:** `aws_appsync_datasource.ontology_table` pointing at the ontology table.
- **Resolvers (UNIT, APPSYNC_JS):**
  - `Query.listEntityDefinitions` → `backend/src/resolvers/ontology/listEntityDefinitions.js`
  - `Query.getEntityInstance` → `backend/src/resolvers/ontology/getEntityInstance.js`
  - `Mutation.saveEntityInstance` → `backend/src/resolvers/ontology/saveEntityInstance.js`
- **Subscription:** `onInstanceUpdated` is declared on the schema with `@aws_subscribe(mutations: ["saveEntityInstance"])`; AppSync wires it without a custom resolver resource.

### Environment wiring (`environments/dev/main.tf`)

- **`schema_content`** is built with `join("\n", [file(schema.graphql), file(ontology-schema.graphql)])` so the deployed API sees one combined SDL string.
- Ontology table name and ARN are passed from `module.storage` into `module.api`.

### GraphQL schema (`@stratiqai/types-simple`)

Two files are merged at deploy time:

| File | Role |
|------|------|
| `src/graphql/schema.graphql` | Root `schema { … }` block and **`type Query` / `type Mutation` / `type Subscription` fields** for ontology operations |
| `src/graphql/ontology-schema.graphql` | Ontology **enums, object types, and inputs** (`EntityDefinition`, `EntityInstance`, `PropertyValue`, inputs, etc.) |

Canonical types package path: repository **stratiqai-types-simple** (sibling of stratiqai-platform in the usual layout).

#### AppSync does not support `extend type`

AWS AppSync does **not** honor GraphQL `extend type Query { … }` (and similar) in the way many GraphQL servers do; extended fields may not appear on the deployed schema. As a result, ontology **operation fields** are declared **inside** the existing `type Query`, `type Mutation`, and `type Subscription` blocks in `schema.graphql`. The separate `ontology-schema.graphql` file holds only shared types and inputs; a short comment there documents this constraint.

### Instance shape: `valuesMap` ↔ `values`

- DynamoDB stores per-property data under a **map** attribute `valuesMap` (keyed by property name) so partial updates can merge one property at a time.
- GraphQL exposes `values` as a **list** of `PropertyValue`. The get/save resolvers translate between map and list.

### Structural hashes (definitions)

`EntityDefinition.structuralHash` is part of the GraphQL type; it is **not** computed inside AppSync JS resolvers. Callers (client or Lambda) compute it using **`SchemaFingerprint`** and related utilities in `@stratiqai/types-simple`. See the types package doc **SCHEMA_FINGERPRINTING.md** for normalization and hashing rules.

## APPSYNC_JS resolver constraints

The **APPSYNC_JS** runtime is a restricted JavaScript environment. The `saveEntityInstance` resolver was adjusted after deploy-time validation failed with “The code contains one or more errors.” In practice, avoid:

- **Regular expressions** (e.g. `/pattern/` or `String.prototype.replace` with a regex).
- **`++` / `--`** (use `idx = idx + 1` instead).
- **Unsupported patterns** that fail validation: prefer explicit property copies over rest/spread destructuring when in doubt.

`listEntityDefinitions` and `getEntityInstance` use simpler patterns (e.g. string `replace` with plain substring arguments, `map`, `Object.entries`); if a future change triggers validation errors, apply the same conservative style as `saveEntityInstance`.

## Operational notes

- After changing SDL in **stratiqai-types-simple**, run the types package build/codegen workflow your team uses (`npm run build:types` / publish to Verdaccio per project conventions) before relying on generated client types.
- Terraform applies that add new fields and resolvers require the **merged** schema to succeed first; resolver creation validates that each field exists on `Query` / `Mutation`.

## File checklist (platform repo)

| Area | Paths |
|------|--------|
| Table | `modules/storage/main.tf`, `modules/storage/outputs.tf` |
| API module | `modules/api/variables.tf`, `datasources.tf`, `resolvers.tf` |
| Resolvers | `backend/src/resolvers/ontology/*.js` |
| Dev env | `environments/dev/main.tf` (`schema_content`, ontology table inputs) |

## Related documentation

- [Platform overview](./platform-overview) — overall module layout
- [Resolver patterns](../../ai-context/resolver-patterns) — general AppSync resolver conventions (pipeline vs UNIT)
- Schema fingerprinting: **stratiqai-types-simple** `docs/SCHEMA_FINGERPRINTING.md` (sibling package)
