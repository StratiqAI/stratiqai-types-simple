# AppSync console — ontology copy/paste tests

Use these files in the **AWS AppSync** console for your API (**Queries** in the left sidebar).

## Before you start

1. Sign in to the console with an identity that can call your API (often **Amazon Cognito User Pool** with a user in an allowed group, or **IAM** if your API allows it).
2. Replace placeholders in each `*.variables.json` file:
   - `YOUR_PROJECT_ID` — GraphQL `ID` for the project (plain id, **not** `PROJ#...`).
   - `YOUR_INSTANCE_ID` / `YOUR_DEFINITION_ID` — plain ids without `INST#` or `DEF#` prefixes.

## How to run one test

1. Open the **`.graphql`** file for the test you want.
2. Select all → copy → paste into the AppSync **query editor** (replace anything already there).
3. Open the matching **`.variables.json`** file → copy entire JSON → paste into **Query variables** (collapsed panel below the editor).
4. Click **Run**.

**Important:** Only one operation may appear in the editor at a time. Do not paste the whole repo file; use one pair per run.

## Operations reference

### Entity Definitions (CRUD)

| Operation | Type | Files |
|-----------|------|-------|
| Save definition | Mutation | `saveEntityDefinition.graphql` + `.variables.json` |
| Get definition | Query | `getEntityDefinition.graphql` + `.variables.json` |
| Get definition by hash | Query | `getEntityDefinitionByHash.graphql` + `.variables.json` |
| List definitions | Query | `listEntityDefinitions.graphql` + `.variables.json` |
| Delete definition | Mutation | `deleteEntityDefinition.graphql` + `.variables.json` |

### Entity Instances (CRUD)

| Operation | Type | Files |
|-----------|------|-------|
| Save instance | Mutation | `saveEntityInstance.graphql` + `.variables.json` |
| Save instance (label only) | Mutation | `saveEntityInstance-labelOnly.graphql` + `.variables.json` |
| Get instance | Query | `getEntityInstance.graphql` + `.variables.json` |
| List instances (all in project) | Query | `listEntityInstances.graphql` + `.variables.json` |
| List instances (by definition) | Query | `listEntityInstancesByDefinition.graphql` + `.variables.json` |
| Delete instance | Mutation | `deleteEntityInstance.graphql` + `.variables.json` |

### Subscriptions

| Operation | Filter | Files |
|-----------|--------|-------|
| On definition saved | projectId | `onDefinitionSaved.graphql` + `.variables.json` |
| On definition deleted | projectId | `onDefinitionDeleted.graphql` + `.variables.json` |
| On instance updated | projectId + id | `onInstanceUpdated.graphql` + `.variables.json` |
| On instance deleted | projectId | `onInstanceDeleted.graphql` + `.variables.json` |

## Suggested test order

1. **Save a definition** — `saveEntityDefinition` — creates the definition; `structuralHash` and `normalizedJsonSchema` are computed server-side.
2. **Get the definition** — `getEntityDefinition` — verify it was stored with the computed hash.
3. **Get definition by hash** — `getEntityDefinitionByHash` — copy the `structuralHash` from step 1 and look up the definition by hash via GSI2.
4. **List definitions** — `listEntityDefinitions` — should include the new one.
5. **Save an instance** — `saveEntityInstance` — creates an instance linked to the definition.
6. **Get the instance** — `getEntityInstance` — verify the instance with translated values.
7. **List instances** — `listEntityInstances` or `listEntityInstancesByDefinition`.
8. **Subscribe** — Open `onInstanceUpdated` in one tab, then run `saveEntityInstance` in another tab to see the subscription fire.
9. **Delete instance** — `deleteEntityInstance` — returns the deleted item.
10. **Delete definition** — `deleteEntityDefinition` — returns the deleted item.

## Notes

- `saveEntityDefinition` is a **pipeline resolver**: a Lambda computes the `structuralHash` (SHA-256 of the normalized `jsonSchema`) server-side, then a DynamoDB PutItem stores the full definition. The caller does **not** supply `structuralHash` — it is computed and returned.
- `normalizedJsonSchema` is also computed server-side and stored alongside the definition.
- `getEntityDefinitionByHash` uses **GSI2** to look up a definition by its computed hash within a project.
- `saveEntityInstance` uses **UpdateItem** with partial merge on `valuesMap`. It can create the instance row on first call.
- Delete operations return the deleted item's old values. If the item does not exist, the result is `null`.
- Definition subscriptions (`onDefinitionSaved`, `onDefinitionDeleted`) filter by **`projectId`** only — they fire for any definition change in the project.
- `onInstanceUpdated` filters by **`projectId`** + **`id`** (specific instance). `onInstanceDeleted` filters by **`projectId`** only (all deletions in the project).
