# Entity Schema Files

This directory contains GraphQL schema files extracted from `src/graphql/schema.graphql`, with each file containing a single `EntityType` and all of its dependencies.

## Overview

Each file contains:
- **Scalars**: AWS scalar types (AWSDateTime, AWSEmail, etc.)
- **Directives**: AWS AppSync directives (@aws_iam, @aws_cognito_user_pools, etc.)
- **Enums**: EntityType enum and related enums (status, visibility, sort fields, etc.)
- **Interfaces**: Common interfaces (Node, SystemMetadata, Shareable, etc.)
- **Types**: Main entity type, connection types, edge types, payload types, and related types
- **Inputs**: Create/Update/Filter/Sort input types
- **Queries**: Related query fields from the Query type
- **Mutations**: Related mutation fields from the Mutation type
- **Subscriptions**: Related subscription fields from the Subscription type

## Files

| Entity Type | File | Description |
|------------|------|-------------|
| `PROJECT` | `project.graphql` | Project entity with docLinks and topics |
| `DOCLINK` | `doclink.graphql` | Document link child entity |
| `TOPIC` | `topic.graphql` | Topic feed with entries |
| `TOPIC_ENTRY` | `topic_entry.graphql` | Topic entry content |
| `WORKFLOW` | `workflow.graphql` | Workflow definitions |
| `DASHBOARD` | `dashboard.graphql` | Dashboard with widgets |
| `DASHBOARD_WIDGET` | `dashboard_widget.graphql` | Dashboard widget configurations |
| `PROMPT_TEMPLATE` | `prompt_template.graphql` | Prompt template schemas |
| `RESOURCE_SHARE` | `resource_share.graphql` | Resource sharing ACLs |
| `SUBSCRIPTION` | `subscription.graphql` | Tenant subscriptions |
| `USER_PROFILE` | `user_profile.graphql` | User profile information |
| `MARKETPLACE_PRODUCT` | `marketplace_product.graphql` | Marketplace products |
| `MARKETPLACE_PRODUCT_VERSION` | `marketplace_product_version.graphql` | Product versions |
| `PRODUCT_INSTALLATION` | `product_installation.graphql` | Product installations |
| `PRODUCT_REVIEW` | `product_review.graphql` | Product reviews |
| `USAGE_RECORD` | `usage_record.graphql` | Usage tracking records |
| `BILLING_INVOICE` | `billing_invoice.graphql` | Billing invoices |
| `DOCUMENT` | `document.graphql` | Document storage with pages/images/tables/charts |
| `INSIGHT` | `insight.graphql` | AI-generated insights |
| `INSIGHT_REACTION` | `insight_reaction.graphql` | Insight reactions |
| `AI_JOB` | `ai_job.graphql` | AI job execution tracking |
| `MESSAGE` | `message.graphql` | Message content |

## Usage

Each schema file is self-contained and includes all dependencies needed to understand and work with that entity type. You can:

1. **Reference a specific entity**: Open the corresponding `.graphql` file to see all types, queries, mutations, and subscriptions related to that entity.

2. **Understand dependencies**: Each file includes all referenced types, enums, and interfaces, so you can see the complete picture of how an entity relates to other parts of the schema.

3. **Generate code**: Use these files as input for GraphQL code generators or documentation tools.

4. **Documentation**: Each file serves as documentation for a specific domain area of the API.

## Extraction Script

The files were generated using `extract-entity-schemas.js` which:
- Parses `src/graphql/schema.graphql`
- Identifies the main type for each EntityType enum value
- Recursively finds all dependencies (types, inputs, enums, interfaces)
- Extracts related queries, mutations, and subscriptions
- Generates a self-contained GraphQL schema file

To regenerate these files, run:
```bash
node extract-entity-schemas.js
```

## Notes

- Each file includes the full `EntityType` enum for reference, even though only one value is relevant
- Common types (Node, SystemMetadata, PageInfo, etc.) are included in each file for completeness
- Query/Mutation/Subscription fields are extracted as field definitions, not full type definitions
- Some entities may reference types from other entities (e.g., Project references DocLink)

