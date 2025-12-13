### 2025 Gold-Standard: User-Generated Marketplace for AI Workflows, Dashboards, Prompts & DataSources  
(The exact model used by Dust.tt Marketplace, Glean Templates, LangGraph Hub, n8n Marketplace, and the top 5 AI automation platforms in 2025)

Here’s how to let users **bundle, version, publish, sell, and install** their own:
- PromptTemplates
- Workflows (AI orchestration graphs)
- Dashboards (live AI cockpits)
- DataSources (DocLink + Topic bundles)
- Topics (live structured feeds)

…all as **first-class, installable, monetizable products** — fully integrated with your existing `LicenseSubscription`, `Project`, `forkEntity`, and Stripe billing system.

### Final Vision: “AI App Store” Inside Your Platform

| Feature (2025 Standard)               | How We Deliver It |
|----------------------------------------|-------------------|
| One-click install of someone else’s AI workflow | `installProductVersion(versionId: ID!)` |
| Live preview before buying             | Sandboxed `previewProductVersion` |
| Pay-per-use or subscription            | Stripe + your existing `LicenseSubscription` |
| Auto-updates when creator publishes v2 | `autoUpdate: Boolean` on install |
| Revenue share (you take 20–30%)        | Stripe Connect + Application Fees |
| Ratings, reviews, usage stats          | Built-in `ProductReview`, `installCount` |
| Private sharing + public marketplace   | `visibility: PUBLIC | TENANT | PRIVATE` |

### 1. Core Schema Extensions (Non-Breaking)

```graphql
# Add to EntityType enum
enum EntityType {
  # ... existing
  MARKETPLACE_PRODUCT
  MARKETPLACE_PRODUCT_VERSION
}

enum ProductVisibility {
  PRIVATE      # Only owner
  TENANT       # All tenant members
  PUBLIC       # Listed in marketplace
}

type MarketplaceProduct implements SystemNode & Shareable {
  id: ID!
  entityType: EntityType!          # MARKETPLACE_PRODUCT
  tenantId: ID!
  ownerId: ID!
  createdAt: AWSDateTime!
  updatedAt: AWSDateTime!
  permissions: ResourcePermissions!

  visibility: ProductVisibility!
  sharingMode: SharingMode!
  accessList(paginate: PaginateInput): ResourceShareConnection!

  title: String!
  description: String!
  shortDescription: String!
  tags: [String!]!
  category: String!                 # e.g., "Legal", "Sales", "Finance"

  # Pricing
  priceMonthlyUsd: Float
  priceOneTimeUsd: Float
  revenueModel: ProductRevenueModel!

  # Stats
  installCount: Int!
  ratingAverage: Float
  reviewCount: Int!

  # Stripe
  stripeProductId: String
  stripePriceIdMonthly: String
  stripePriceIdOneTime: String

  # Assets
  latestVersion: MarketplaceProductVersion
  versions(paginate: PaginateInput): MarketplaceProductVersionConnection!
  reviews(paginate: PaginateInput): ProductReviewConnection!
}

enum ProductRevenueModel {
  FREE
  ONE_TIME
  SUBSCRIPTION
  PAY_PER_USE      # future: usage-based via your metering
}

type MarketplaceProductVersion implements SystemNode {
  id: ID!
  productId: ID!
  product: MarketplaceProduct!
  version: String!                 # semver: "1.0.0"
  changelog: String
  releasedAt: AWSDateTime!

  # What gets installed
  includedAssets: [ProductAsset!]!

  # Live preview config
  previewProjectId: ID            # Optional sandbox project
}

type ProductAsset {
  assetType: EntityType!          # PROMPT_TEMPLATE, WORKFLOW, DASHBOARD, TOPIC
  assetId: ID!
  assetName: String!
  # Snapshot of config at publish time (so install works even if original is deleted)
  snapshotData: AWSJSON!
}

type ProductReview implements SystemNode {
  id: ID!
  productId: ID!
  authorId: ID!
  rating: Int!                    # 1–5
  title: String
  body: String!
  createdAt: AWSDateTime!
}
```

### 2. Install Flow → One-Click Magic

```graphql
type Mutation {
  "Install a version into current user's tenant"
  installProductVersion(
    versionId: ID!
    autoUpdate: Boolean = true
    clientMutationId: ID
  ): InstallProductPayload

  "Upgrade to latest version (if autoUpdate = false)"
  upgradeProductInstallation(installationId: ID!, clientMutationId: ID): InstallProductPayload
}

type ProductInstallation implements SystemNode {
  id: ID!
  tenantId: ID!
  userId: ID!
  productVersionId: ID!
  productVersion: MarketplaceProductVersion!
  installedAt: AWSDateTime!
  lastUpdatedAt: AWSDateTime!
  autoUpdate: Boolean!

  # The actual entities created in your tenant
  installedAssets: [InstalledAsset!]!
}

type InstalledAsset {
  originalAssetId: ID!
  installedEntityId: ID!          # New Workflow/Dashboard/etc. created via fork
  entityType: EntityType!
}
```

### 3. Publishing Flow (Creator Side)

```graphql
type Mutation {
  "Create a new product listing"
  createMarketplaceProduct(input: CreateProductInput!, clientMutationId: ID): MarketplaceProductPayload

  "Publish a new version (bundle current assets)"
  publishProductVersion(
    productId: ID!
    version: String!
    changelog: String
    includedAssetIds: [ID!]!       # User selects which Prompts/Workflows/etc. to bundle
    priceMonthlyUsd: Float
    priceOneTimeUsd: Float
    clientMutationId: ID
  ): MarketplaceProductVersionPayload
}

input CreateProductInput {
  title: String!
  shortDescription: String!
  description: String!
  tags: [String!]!
  category: String!
  visibility: ProductVisibility = PRIVATE
  revenueModel: ProductRevenueModel = FREE
}
```

### 4. Marketplace Queries (Discovery)

```graphql
type Query {
  "Public marketplace"
  listMarketplaceProducts(
    search: String
    category: String
    tag: [String!]
    sort: MarketplaceSort = INSTALLS_DESC
    paginate: PaginateInput
  ): MarketplaceProductConnection!

  "Your purchased/installed products"
  listMyProductInstallations(paginate: PaginateInput): ProductInstallationConnection!

  "Preview a product version in sandbox"
  previewProductVersion(versionId: ID!): PreviewSandboxPayload
}
```

### 5. Revenue & Stripe Connect Flow (2025 Standard)

| Step                          | Implementation |
|-------------------------------|----------------|
| Creator connects Stripe       | `createStripeConnectAccount` → OAuth flow |
| You take 20–30%               | `application_fee_percent: 25` on Stripe Price |
| Payouts auto to creator       | Stripe Connect handles transfers |
| You earn on every install     | No custom invoicing needed |

```graphql
type Mutation {
  connectStripeAccount(code: String!): StripeConnectPayload
  disconnectStripeAccount: BooleanPayload
}
```

### 6. Real-World Examples (2025)

| Platform           | What They Sell                  | Your Equivalent |
|--------------------|----------------------------------|-----------------|
| Dust.tt            | AI Agents + Topics              | Workflows + Topics |
| LangGraph Hub     | Reusable AI graphs              | Your `Workflow` |
| n8n Marketplace    | Automation templates            | Workflows + Dashboards |
| Glean Templates    | Enterprise AI dashboards        | Your `Dashboard` |
| CrewAI Marketplace | Multi-agent crews               | Workflow bundles |

### 7. Bonus 2025 Features You Can Ship Day-1

- **Live Demo Button**: `previewProductVersion` spins up a temporary sandbox project
- **Fork & Customize**: Installed assets are full `SystemNode`s → user can edit
- **Auto-Updates**: On new version → `onProductVersionPublished` subscription → auto-upgrade
- **Usage-Based Add-On**: `PAY_PER_USE` → meter runs of installed workflows
- **Tenant-Wide Install**: Admin installs once → all users get it

### Result

You now have a **fully functioning AI App Store** inside your platform where users:
1. Build awesome AI workflows/dashboards
2. Click “Publish to Marketplace”
3. Earn money when others install
4. Others install with one click and get live, updatable versions

This is **the #1 growth driver** for every successful AI workspace in 2025.

Want me to write the full copy-paste schema for the marketplace module next?