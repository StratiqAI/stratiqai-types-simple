/**
 * Script to extract each EntityType and its dependencies into separate GraphQL files
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SCHEMA_FILE = join(__dirname, 'graphql', 'schema7.graphql');
const OUTPUT_DIR = join(__dirname, 'entity-schemas');

// Entity types from the enum
const ENTITY_TYPES = [
  'PROJECT',
  'DOCLINK',
  'TOPIC',
  'TOPIC_ENTRY',
  'WORKFLOW',
  'DASHBOARD',
  'DASHBOARD_WIDGET',
  'PROMPT_TEMPLATE',
  'RESOURCE_SHARE',
  'SUBSCRIPTION',
  'USER_PROFILE',
  'MARKETPLACE_PRODUCT',
  'MARKETPLACE_PRODUCT_VERSION',
  'PRODUCT_INSTALLATION',
  'PRODUCT_REVIEW',
  'USAGE_RECORD',
  'BILLING_INVOICE',
  'DOCUMENT',
  'INSIGHT',
  'INSIGHT_REACTION',
  'AI_JOB',
  'MESSAGE',
];

// Common types that should be included in all files
const COMMON_SCALARS = [
  'scalar AWSDateTime',
  'scalar AWSEmail',
  'scalar AWSURL',
  'scalar AWSIPAddress',
  'scalar AWSJSON',
];

const COMMON_DIRECTIVES = [
  'directive @aws_iam',
  'directive @aws_cognito_user_pools',
  'directive @aws_auth',
  'directive @aws_subscribe',
  'directive @oneOf',
];

const COMMON_INTERFACES = [
  'interface Node',
  'interface SystemMetadata',
  'interface Shareable',
  'interface LicensedItem',
  'interface Storable',
  'interface DocumentElement',
];

const COMMON_TYPES = [
  'type PropertyDefinition',
  'type PropertyValue',
  'type UserError',
  'type PageInfo',
  'type UserProfile',
];

const COMMON_ENUMS = [
  'enum PropertyType',
  'enum EntityType',
  'enum PermissionScope',
  'enum ListScope',
  'enum SharingMode',
  'enum SharePermission',
  'enum SortDirection',
];

const COMMON_INPUTS = [
  'input PropertyDefinitionInput',
  'input PropertyValueInput',
];

/**
 * Parse GraphQL schema into sections
 */
function parseSchema(schemaContent) {
  const sections = {
    scalars: [],
    directives: [],
    enums: [],
    interfaces: [],
    types: [],
    inputs: [],
    queries: [],
    mutations: [],
    subscriptions: [],
  };

  const lines = schemaContent.split('\n');
  let currentSection = null;
  let currentContent = [];
  let braceCount = 0;
  let inString = false;
  let stringChar = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines and comments at section boundaries
    if (!trimmed || trimmed.startsWith('#')) {
      if (currentContent.length > 0) {
        currentContent.push(line);
      }
      continue;
    }

    // Detect section starts
    if (trimmed.startsWith('scalar ')) {
      if (currentSection && currentContent.length > 0) {
        sections[currentSection].push(currentContent.join('\n'));
      }
      currentSection = 'scalars';
      currentContent = [line];
      continue;
    }

    if (trimmed.startsWith('directive @')) {
      if (currentSection && currentContent.length > 0) {
        sections[currentSection].push(currentContent.join('\n'));
      }
      currentSection = 'directives';
      currentContent = [line];
      continue;
    }

    if (trimmed.startsWith('enum ')) {
      if (currentSection && currentContent.length > 0) {
        sections[currentSection].push(currentContent.join('\n'));
      }
      currentSection = 'enums';
      currentContent = [line];
      braceCount = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      continue;
    }

    if (trimmed.startsWith('interface ')) {
      if (currentSection && currentContent.length > 0) {
        sections[currentSection].push(currentContent.join('\n'));
      }
      currentSection = 'interfaces';
      currentContent = [line];
      braceCount = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      continue;
    }

    if (trimmed.startsWith('type ') && !trimmed.startsWith('type Query') && !trimmed.startsWith('type Mutation') && !trimmed.startsWith('type Subscription')) {
      if (currentSection && currentContent.length > 0) {
        sections[currentSection].push(currentContent.join('\n'));
      }
      currentSection = 'types';
      currentContent = [line];
      braceCount = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      continue;
    }

    if (trimmed.startsWith('input ')) {
      if (currentSection && currentContent.length > 0) {
        sections[currentSection].push(currentContent.join('\n'));
      }
      currentSection = 'inputs';
      currentContent = [line];
      braceCount = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      continue;
    }

    if (trimmed.startsWith('type Query')) {
      if (currentSection && currentContent.length > 0) {
        sections[currentSection].push(currentContent.join('\n'));
      }
      currentSection = 'queries';
      currentContent = [line];
      braceCount = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      continue;
    }

    if (trimmed.startsWith('type Mutation')) {
      if (currentSection && currentContent.length > 0) {
        sections[currentSection].push(currentContent.join('\n'));
      }
      currentSection = 'mutations';
      currentContent = [line];
      braceCount = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      continue;
    }

    if (trimmed.startsWith('type Subscription')) {
      if (currentSection && currentContent.length > 0) {
        sections[currentSection].push(currentContent.join('\n'));
      }
      currentSection = 'subscriptions';
      currentContent = [line];
      braceCount = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      continue;
    }

    // Track braces for multi-line definitions
    if (currentSection) {
      currentContent.push(line);
      braceCount += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      
      // If braces are balanced, we've completed a definition
      if (braceCount === 0 && currentContent.length > 0) {
        sections[currentSection].push(currentContent.join('\n'));
        currentContent = [];
        currentSection = null;
      }
    }
  }

  // Push any remaining content
  if (currentSection && currentContent.length > 0) {
    sections[currentSection].push(currentContent.join('\n'));
  }

  return sections;
}

/**
 * Find type name from definition
 */
function getTypeName(definition) {
  const match = definition.match(/^(type|input|enum|interface|scalar|union)\s+(\w+)/);
  return match ? match[2] : null;
}

/**
 * Find all referenced types in a definition
 */
function findReferencedTypes(definition) {
  const referenced = new Set();
  
  // Find type references (TypeName, [TypeName], TypeName!)
  const typePattern = /\b([A-Z][a-zA-Z0-9_]*)\b/g;
  const matches = definition.matchAll(typePattern);
  
  for (const match of matches) {
    const typeName = match[1];
    // Skip GraphQL keywords and common words
    if (!['ID', 'String', 'Int', 'Float', 'Boolean', 'true', 'false', 'null'].includes(typeName)) {
      referenced.add(typeName);
    }
  }
  
  return referenced;
}

/**
 * Extract entity schema with all dependencies
 */
function extractEntitySchema(entityType, sections) {
  const entityName = entityType.toLowerCase().replace(/_/g, '');
  const mainTypeName = entityType === 'INSIGHT' ? 'AIInsight' : 
                       entityType === 'SUBSCRIPTION' ? 'TenantSubscription' :
                       entityType === 'INSIGHT_REACTION' ? 'InsightReaction' :
                       entityType === 'AI_JOB' ? 'AIJob' :
                       entityType === 'USER_PROFILE' ? 'UserProfile' :
                       entityType === 'RESOURCE_SHARE' ? 'ResourceShare' :
                       entityType === 'DOCLINK' ? 'DocLink' :
                       entityType === 'DASHBOARD_WIDGET' ? 'DashboardWidget' :
                       entityType === 'PROMPT_TEMPLATE' ? 'PromptTemplate' :
                       entityType === 'MARKETPLACE_PRODUCT' ? 'MarketplaceProduct' :
                       entityType === 'MARKETPLACE_PRODUCT_VERSION' ? 'MarketplaceProductVersion' :
                       entityType === 'PRODUCT_INSTALLATION' ? 'ProductInstallation' :
                       entityType === 'PRODUCT_REVIEW' ? 'ProductReview' :
                       entityType === 'USAGE_RECORD' ? 'UsageRecord' :
                       entityType === 'BILLING_INVOICE' ? 'BillingInvoice' :
                       entityType === 'TOPIC_ENTRY' ? 'TopicEntry' :
                       entityType.charAt(0) + entityType.slice(1).toLowerCase().replace(/_([a-z])/g, (_, c) => c.toUpperCase());
  
  const collected = {
    scalars: new Set(),
    directives: new Set(),
    enums: new Set(),
    interfaces: new Set(),
    types: new Set(),
    inputs: new Set(),
    queries: [],
    mutations: [],
    subscriptions: [],
  };

  // Find main type
  const mainType = sections.types.find(t => {
    const name = getTypeName(t);
    return name === mainTypeName || 
           (entityType === 'INSIGHT' && name === 'AIInsight') ||
           (entityType === 'SUBSCRIPTION' && name === 'TenantSubscription') ||
           (entityType === 'INSIGHT_REACTION' && name === 'InsightReaction') ||
           (entityType === 'AI_JOB' && name === 'AIJob') ||
           (entityType === 'USER_PROFILE' && name === 'UserProfile') ||
           (entityType === 'RESOURCE_SHARE' && name === 'ResourceShare');
  });

  if (!mainType) {
    console.warn(`Warning: Could not find main type for ${entityType} (looking for ${mainTypeName})`);
    return null;
  }

  // Add main type
  collected.types.add(mainType);
  
  // Find all related types recursively
  const toProcess = [mainType];
  const processed = new Set();
  
  while (toProcess.length > 0) {
    const current = toProcess.shift();
    const currentName = getTypeName(current);
    
    if (processed.has(currentName)) continue;
    processed.add(currentName);
    
    // Find referenced types
    const referenced = findReferencedTypes(current);
    
    for (const refName of referenced) {
      // Find in types
      const type = sections.types.find(t => getTypeName(t) === refName);
      if (type && !collected.types.has(type)) {
        collected.types.add(type);
        toProcess.push(type);
      }
      
      // Find in inputs
      const input = sections.inputs.find(i => getTypeName(i) === refName);
      if (input && !collected.inputs.has(input)) {
        collected.inputs.add(input);
        toProcess.push(input);
      }
      
      // Find in enums
      const enumDef = sections.enums.find(e => getTypeName(e) === refName);
      if (enumDef && !collected.enums.has(enumDef)) {
        collected.enums.add(enumDef);
      }
      
      // Find in interfaces
      const interfaceDef = sections.interfaces.find(i => getTypeName(i) === refName);
      if (interfaceDef && !collected.interfaces.has(interfaceDef)) {
        collected.interfaces.add(interfaceDef);
      }
    }
  }

  // Find related inputs (Create*, Update*, *Input)
  const inputPatterns = [
    `Create${mainTypeName}Input`,
    `Update${mainTypeName}Input`,
    `${mainTypeName}Input`,
    `${mainTypeName}FilterInput`,
    `${mainTypeName}SortInput`,
  ];
  
  // Special cases
  if (entityType === 'INSIGHT') {
    inputPatterns.push('CreateUserInsightInput', 'CreateSystemInsightInput');
  }
  if (entityType === 'DASHBOARD_WIDGET') {
    inputPatterns.push('CreateDashboardWidgetInput', 'UpdateDashboardWidgetInput', 'CreateChartWidgetInput', 'CreateKpiWidgetInput', 'CreateTextWidgetInput', 'CreateFeedWidgetInput');
  }
  if (entityType === 'TOPIC') {
    inputPatterns.push('CreateTopicInput', 'UpdateTopicInput', 'TopicEntryFilterInput');
  }
  if (entityType === 'TOPIC_ENTRY') {
    inputPatterns.push('TopicEntryFilterInput');
  }
  if (entityType === 'PROJECT') {
    inputPatterns.push('ProjectFilterInput', 'ProjectSortInput');
  }
  if (entityType === 'WORKFLOW') {
    inputPatterns.push('WorkflowFilterInput', 'WorkflowSortInput');
  }
  if (entityType === 'DASHBOARD') {
    inputPatterns.push('DashboardSortInput');
  }
  if (entityType === 'MARKETPLACE_PRODUCT') {
    inputPatterns.push('CreateProductInput', 'MarketplaceSortInput');
  }
  if (entityType === 'USAGE_RECORD') {
    inputPatterns.push('CreateUsageRecordInput');
  }
  if (entityType === 'RESOURCE_SHARE') {
    inputPatterns.push('ShareResourceInput', 'UnshareResourceInput');
  }

  for (const pattern of inputPatterns) {
    const input = sections.inputs.find(i => getTypeName(i) === pattern);
    if (input) {
      collected.inputs.add(input);
    }
  }

  // Find connection/edge/payload types
  const connectionPatterns = [
    `${mainTypeName}Connection`,
    `${mainTypeName}Edge`,
    `${mainTypeName}Payload`,
  ];
  
  // Special cases
  if (entityType === 'INSIGHT') {
    connectionPatterns.push('AIInsightConnection', 'AIInsightEdge', 'AIInsightPayload');
    connectionPatterns.push('InsightReactionConnection', 'InsightReactionEdge', 'InsightReactionPayload');
    connectionPatterns.push('InsightVersionConnection', 'InsightVersionEdge');
  }
  if (entityType === 'DASHBOARD_WIDGET') {
    connectionPatterns.push('DashboardWidgetConnection', 'DashboardWidgetEdge', 'DashboardWidgetPayload');
    connectionPatterns.push('WidgetConfiguration', 'ChartConfiguration', 'KpiCardConfiguration', 'TableConfiguration', 'RichTextConfiguration', 'InsightFeedConfiguration');
  }
  if (entityType === 'DASHBOARD') {
    connectionPatterns.push('DashboardConnection', 'DashboardEdge', 'DashboardPayload');
  }
  if (entityType === 'TOPIC') {
    connectionPatterns.push('TopicConnection', 'TopicEdge', 'TopicPayload');
    connectionPatterns.push('TopicEntryConnection', 'TopicEntryEdge', 'TopicEntryPayload');
    connectionPatterns.push('TopicEntryContent');
  }
  if (entityType === 'TOPIC_ENTRY') {
    connectionPatterns.push('TopicEntryConnection', 'TopicEntryEdge', 'TopicEntryPayload');
    connectionPatterns.push('TopicEntryContent');
  }
  if (entityType === 'DOCLINK') {
    connectionPatterns.push('DocLinkConnection', 'DocLinkEdge', 'DocLinkPayload');
  }
  if (entityType === 'PROJECT') {
    connectionPatterns.push('ProjectConnection', 'ProjectEdge', 'ProjectPayload');
  }
  if (entityType === 'WORKFLOW') {
    connectionPatterns.push('WorkflowConnection', 'WorkflowEdge', 'WorkflowPayload');
  }
  if (entityType === 'MARKETPLACE_PRODUCT') {
    connectionPatterns.push('MarketplaceProductConnection', 'MarketplaceProductEdge', 'MarketplaceProductPayload');
    connectionPatterns.push('MarketplaceProductVersionConnection', 'MarketplaceProductVersionEdge', 'MarketplaceProductVersionPayload');
    connectionPatterns.push('ProductInstallationConnection', 'ProductInstallationEdge', 'InstallProductPayload');
    connectionPatterns.push('ProductReviewConnection', 'ProductReviewEdge');
    connectionPatterns.push('ProductAsset', 'InstalledAsset');
    connectionPatterns.push('PreviewSandboxPayload');
  }
  if (entityType === 'MARKETPLACE_PRODUCT_VERSION') {
    connectionPatterns.push('MarketplaceProductVersionConnection', 'MarketplaceProductVersionEdge', 'MarketplaceProductVersionPayload');
    connectionPatterns.push('ProductAsset');
  }
  if (entityType === 'PRODUCT_INSTALLATION') {
    connectionPatterns.push('ProductInstallationConnection', 'ProductInstallationEdge', 'InstallProductPayload');
    connectionPatterns.push('InstalledAsset');
  }
  if (entityType === 'PRODUCT_REVIEW') {
    connectionPatterns.push('ProductReviewConnection', 'ProductReviewEdge');
  }
  if (entityType === 'USAGE_RECORD') {
    connectionPatterns.push('UsageRecordConnection', 'UsageRecordEdge', 'UsageRecordPayload');
  }
  if (entityType === 'BILLING_INVOICE') {
    connectionPatterns.push('BillingInvoiceConnection', 'BillingInvoiceEdge');
    connectionPatterns.push('InvoiceLineItemConnection', 'InvoiceLineItemEdge', 'InvoiceLineItem');
    connectionPatterns.push('BillingSummary');
    connectionPatterns.push('PaymentIntentPayload');
  }
  if (entityType === 'DOCUMENT') {
    connectionPatterns.push('DocumentPageConnection', 'DocumentPageEdge', 'DocumentPage');
    connectionPatterns.push('DocumentImageConnection', 'DocumentImageEdge', 'DocumentImage');
    connectionPatterns.push('DocumentTableConnection', 'DocumentTableEdge', 'DocumentTable');
    connectionPatterns.push('DocumentChartConnection', 'DocumentChartEdge', 'DocumentChart');
  }
  if (entityType === 'RESOURCE_SHARE') {
    connectionPatterns.push('ResourceShareConnection', 'ResourceShareEdge');
  }
  if (entityType === 'SUBSCRIPTION') {
    connectionPatterns.push('TenantSubscriptionPayload');
  }

  for (const pattern of connectionPatterns) {
    const type = sections.types.find(t => getTypeName(t) === pattern);
    if (type) {
      collected.types.add(type);
    }
  }

  // Find related enums
  const enumPatterns = [
    `${mainTypeName}Status`,
    `${mainTypeName}Type`,
    `${mainTypeName}Visibility`,
    `${mainTypeName}SortField`,
  ];
  
  // Special cases
  if (entityType === 'PROJECT') {
    enumPatterns.push('ProjectStatus', 'ProjectSortField');
  }
  if (entityType === 'DOCLINK') {
    enumPatterns.push('DocLinkStatus');
  }
  if (entityType === 'DASHBOARD_WIDGET') {
    enumPatterns.push('DashboardWidgetType');
  }
  if (entityType === 'DASHBOARD') {
    enumPatterns.push('DashboardSortField');
  }
  if (entityType === 'WORKFLOW') {
    enumPatterns.push('WorkflowSortField');
  }
  if (entityType === 'INSIGHT') {
    enumPatterns.push('InsightVisibility', 'InsightReactionType');
  }
  if (entityType === 'AI_JOB') {
    enumPatterns.push('AIJobStatus');
  }
  if (entityType === 'MARKETPLACE_PRODUCT') {
    enumPatterns.push('ProductVisibility', 'ProductRevenueModel', 'MarketplaceSortField');
  }
  if (entityType === 'SUBSCRIPTION') {
    enumPatterns.push('SubscriptionStatus');
  }
  if (entityType === 'USAGE_RECORD') {
    enumPatterns.push('UsageUnit');
  }
  if (entityType === 'BILLING_INVOICE') {
    enumPatterns.push('BillingPeriod', 'InvoiceStatus');
  }

  for (const pattern of enumPatterns) {
    const enumDef = sections.enums.find(e => getTypeName(e) === pattern);
    if (enumDef) {
      collected.enums.add(enumDef);
    }
  }

  // Find related queries
  const queryPatterns = [
    entityName,
    `${entityName}s`,
    `get${mainTypeName}`,
    `list${mainTypeName}`,
  ];
  
  // Special cases
  if (entityType === 'INSIGHT') {
    queryPatterns.push('insight', 'projectInsights', 'documentInsights');
  }
  if (entityType === 'DOCLINK') {
    queryPatterns.push('docLink', 'docLinks');
  }
  if (entityType === 'TOPIC') {
    queryPatterns.push('topics');
  }
  if (entityType === 'DASHBOARD_WIDGET') {
    // Widgets are accessed through Dashboard
  }
  if (entityType === 'MARKETPLACE_PRODUCT') {
    queryPatterns.push('marketplaceProducts', 'myProductInstallations', 'previewProductVersion');
  }
  if (entityType === 'USAGE_RECORD') {
    queryPatterns.push('usageRecords', 'myBillingSummary');
  }
  if (entityType === 'BILLING_INVOICE') {
    queryPatterns.push('billingInvoices', 'myBillingSummary');
  }
  if (entityType === 'RESOURCE_SHARE') {
    queryPatterns.push('sharedWithMe');
  }

  // Extract queries
  const queryType = sections.queries.find(q => getTypeName(q) === 'Query');
  if (queryType) {
    const queryLines = queryType.split('\n');
    for (let i = 0; i < queryLines.length; i++) {
      const line = queryLines[i];
      for (const pattern of queryPatterns) {
        if (line.includes(pattern + '(') || line.includes(pattern + ':')) {
          // Extract the query field
          let queryField = line.trim();
          let j = i + 1;
          let braceCount = (queryField.match(/\{/g) || []).length - (queryField.match(/\}/g) || []).length;
          
          while (j < queryLines.length && braceCount >= 0) {
            queryField += '\n' + queryLines[j];
            braceCount += (queryLines[j].match(/\{/g) || []).length - (queryLines[j].match(/\}/g) || []).length;
            if (braceCount < 0) break;
            j++;
          }
          
          collected.queries.push(queryField);
          break;
        }
      }
    }
  }

  // Find related mutations
  const mutationPatterns = [
    `create${mainTypeName}`,
    `update${mainTypeName}`,
    `delete${mainTypeName}`,
    `restore${mainTypeName}`,
  ];
  
  // Special cases
  if (entityType === 'INSIGHT') {
    mutationPatterns.push('createUserInsight', 'createSystemInsight', 'reactToInsight');
  }
  if (entityType === 'DASHBOARD_WIDGET') {
    mutationPatterns.push('createDashboardWidget', 'updateDashboardWidget', 'deleteDashboardWidget');
  }
  if (entityType === 'TOPIC') {
    mutationPatterns.push('createTopic', 'updateTopic', 'deleteTopic', 'publishInsightToTopic', 'publishToTopic');
  }
  if (entityType === 'TOPIC_ENTRY') {
    mutationPatterns.push('publishInsightToTopic', 'publishToTopic');
  }
  if (entityType === 'MARKETPLACE_PRODUCT') {
    mutationPatterns.push('createMarketplaceProduct', 'publishProductVersion', 'installProductVersion', 'upgradeProductInstallation');
  }
  if (entityType === 'MARKETPLACE_PRODUCT_VERSION') {
    mutationPatterns.push('publishProductVersion');
  }
  if (entityType === 'PRODUCT_INSTALLATION') {
    mutationPatterns.push('installProductVersion', 'upgradeProductInstallation');
  }
  if (entityType === 'USAGE_RECORD') {
    mutationPatterns.push('createUsageRecord', 'publishUsageAlert');
  }
  if (entityType === 'BILLING_INVOICE') {
    mutationPatterns.push('createPaymentIntent');
  }
  if (entityType === 'RESOURCE_SHARE') {
    mutationPatterns.push('shareResource', 'unshareResource');
  }
  if (entityType === 'SUBSCRIPTION') {
    mutationPatterns.push('grantSubscription');
  }

  // Extract mutations
  const mutationType = sections.mutations.find(m => getTypeName(m) === 'Mutation');
  if (mutationType) {
    const mutationLines = mutationType.split('\n');
    for (let i = 0; i < mutationLines.length; i++) {
      const line = mutationLines[i];
      for (const pattern of mutationPatterns) {
        if (line.includes(pattern + '(')) {
          // Extract the mutation field
          let mutationField = line.trim();
          let j = i + 1;
          let braceCount = (mutationField.match(/\{/g) || []).length - (mutationField.match(/\}/g) || []).length;
          
          while (j < mutationLines.length && braceCount >= 0) {
            mutationField += '\n' + mutationLines[j];
            braceCount += (mutationLines[j].match(/\{/g) || []).length - (mutationLines[j].match(/\}/g) || []).length;
            if (braceCount < 0) break;
            j++;
          }
          
          collected.mutations.push(mutationField);
          break;
        }
      }
    }
  }

  // Find related subscriptions
  const subscriptionPatterns = [
    `onCreate${mainTypeName}`,
    `onUpdate${mainTypeName}`,
    `onDelete${mainTypeName}`,
  ];
  
  // Special cases
  if (entityType === 'INSIGHT') {
    subscriptionPatterns.push('onInsightCreatedInProject', 'onInsightCreatedForDocument');
  }
  if (entityType === 'DASHBOARD_WIDGET') {
    // Widgets don't have direct subscriptions
  }
  if (entityType === 'TOPIC') {
    subscriptionPatterns.push('onTopicEntryAdded', 'onProjectTopicEntry');
  }
  if (entityType === 'TOPIC_ENTRY') {
    subscriptionPatterns.push('onTopicEntryAdded', 'onProjectTopicEntry');
  }
  if (entityType === 'RESOURCE_SHARE') {
    subscriptionPatterns.push('onResourceShared', 'onResourceUnshared');
  }
  if (entityType === 'SUBSCRIPTION') {
    subscriptionPatterns.push('onGrantSubscription');
  }
  if (entityType === 'USAGE_RECORD') {
    subscriptionPatterns.push('onUsageThresholdExceeded');
  }

  // Extract subscriptions
  const subscriptionType = sections.subscriptions.find(s => getTypeName(s) === 'Subscription');
  if (subscriptionType) {
    const subscriptionLines = subscriptionType.split('\n');
    for (let i = 0; i < subscriptionLines.length; i++) {
      const line = subscriptionLines[i];
      for (const pattern of subscriptionPatterns) {
        if (line.includes(pattern + '(')) {
          // Extract the subscription field
          let subscriptionField = line.trim();
          let j = i + 1;
          let braceCount = (subscriptionField.match(/\{/g) || []).length - (subscriptionField.match(/\}/g) || []).length;
          
          while (j < subscriptionLines.length && braceCount >= 0) {
            subscriptionField += '\n' + subscriptionLines[j];
            braceCount += (subscriptionLines[j].match(/\{/g) || []).length - (subscriptionLines[j].match(/\}/g) || []).length;
            if (braceCount < 0) break;
            j++;
          }
          
          collected.subscriptions.push(subscriptionField);
          break;
        }
      }
    }
  }

  // Add common dependencies
  for (const scalar of COMMON_SCALARS) {
    collected.scalars.add(scalar);
  }
  for (const directive of COMMON_DIRECTIVES) {
    collected.directives.add(directive);
  }
  for (const interfaceDef of COMMON_INTERFACES) {
    const iface = sections.interfaces.find(i => {
      const name = getTypeName(i);
      return interfaceDef.includes(name);
    });
    if (iface) {
      collected.interfaces.add(iface);
    }
  }
  for (const commonType of COMMON_TYPES) {
    const type = sections.types.find(t => {
      const name = getTypeName(t);
      return commonType.includes(name);
    });
    if (type) {
      collected.types.add(type);
    }
  }
  for (const commonEnum of COMMON_ENUMS) {
    const enumDef = sections.enums.find(e => {
      const name = getTypeName(e);
      return commonEnum.includes(name);
    });
    if (enumDef) {
      collected.enums.add(enumDef);
    }
  }
  for (const commonInput of COMMON_INPUTS) {
    const input = sections.inputs.find(i => {
      const name = getTypeName(i);
      return commonInput.includes(name);
    });
    if (input) {
      collected.inputs.add(input);
    }
  }

  return collected;
}

/**
 * Generate GraphQL file content
 */
function generateGraphQLFile(entityType, collected) {
  const lines = [];
  
  lines.push(`# GraphQL Schema for ${entityType}`);
  lines.push(`# Extracted from schema7.graphql`);
  lines.push('');
  
  // Scalars
  if (collected.scalars.size > 0) {
    lines.push('# Scalars');
    for (const scalar of Array.from(collected.scalars).sort()) {
      lines.push(scalar);
    }
    lines.push('');
  }
  
  // Directives
  if (collected.directives.size > 0) {
    lines.push('# Directives');
    for (const directive of Array.from(collected.directives).sort()) {
      lines.push(directive);
    }
    lines.push('');
  }
  
  // Enums
  if (collected.enums.size > 0) {
    lines.push('# Enums');
    for (const enumDef of Array.from(collected.enums).sort()) {
      lines.push(enumDef);
      lines.push('');
    }
  }
  
  // Interfaces
  if (collected.interfaces.size > 0) {
    lines.push('# Interfaces');
    for (const interfaceDef of Array.from(collected.interfaces).sort()) {
      lines.push(interfaceDef);
      lines.push('');
    }
  }
  
  // Types
  if (collected.types.size > 0) {
    lines.push('# Types');
    for (const type of Array.from(collected.types).sort()) {
      lines.push(type);
      lines.push('');
    }
  }
  
  // Inputs
  if (collected.inputs.size > 0) {
    lines.push('# Inputs');
    for (const input of Array.from(collected.inputs).sort()) {
      lines.push(input);
      lines.push('');
    }
  }
  
  // Queries
  if (collected.queries.length > 0) {
    lines.push('# Queries');
    lines.push('type Query {');
    for (const query of collected.queries) {
      // Extract just the field definition
      const fieldMatch = query.match(/(\s+[a-zA-Z_][a-zA-Z0-9_]*\([^)]*\)[^:]*:[^@\n]+(@[^\n]+)?)/);
      if (fieldMatch) {
        lines.push(fieldMatch[1].trim());
      } else {
        // Fallback: try to extract the line
        const queryLines = query.split('\n');
        for (const line of queryLines) {
          if (line.trim() && !line.trim().startsWith('type Query')) {
            lines.push(line);
            break;
          }
        }
      }
    }
    lines.push('}');
    lines.push('');
  }
  
  // Mutations
  if (collected.mutations.length > 0) {
    lines.push('# Mutations');
    lines.push('type Mutation {');
    for (const mutation of collected.mutations) {
      // Extract just the field definition
      const fieldMatch = mutation.match(/(\s+[a-zA-Z_][a-zA-Z0-9_]*\([^)]*\)[^:]*:[^@\n]+(@[^\n]+)?)/);
      if (fieldMatch) {
        lines.push(fieldMatch[1].trim());
      } else {
        // Fallback: try to extract the line
        const mutationLines = mutation.split('\n');
        for (const line of mutationLines) {
          if (line.trim() && !line.trim().startsWith('type Mutation')) {
            lines.push(line);
            break;
          }
        }
      }
    }
    lines.push('}');
    lines.push('');
  }
  
  // Subscriptions
  if (collected.subscriptions.length > 0) {
    lines.push('# Subscriptions');
    lines.push('type Subscription {');
    for (const subscription of collected.subscriptions) {
      // Extract just the field definition
      const fieldMatch = subscription.match(/(\s+[a-zA-Z_][a-zA-Z0-9_]*\([^)]*\)[^:]*:[^@\n]+(@[^\n]+)?)/);
      if (fieldMatch) {
        lines.push(fieldMatch[1].trim());
      } else {
        // Fallback: try to extract the line
        const subscriptionLines = subscription.split('\n');
        for (const line of subscriptionLines) {
          if (line.trim() && !line.trim().startsWith('type Subscription')) {
            lines.push(line);
            break;
          }
        }
      }
    }
    lines.push('}');
    lines.push('');
  }
  
  return lines.join('\n');
}

/**
 * Main execution
 */
function main() {
  console.log('Reading schema file...');
  const schemaContent = readFileSync(SCHEMA_FILE, 'utf-8');
  
  console.log('Parsing schema...');
  const sections = parseSchema(schemaContent);
  
  console.log(`Found ${sections.types.length} types, ${sections.inputs.length} inputs, ${sections.enums.length} enums`);
  
  console.log('Extracting entity schemas...');
  for (const entityType of ENTITY_TYPES) {
    console.log(`  Processing ${entityType}...`);
    const collected = extractEntitySchema(entityType, sections);
    
    if (!collected) {
      console.warn(`    Skipping ${entityType} (not found)`);
      continue;
    }
    
    const content = generateGraphQLFile(entityType, collected);
    const filename = `${entityType.toLowerCase()}.graphql`;
    const filepath = join(OUTPUT_DIR, filename);
    
    writeFileSync(filepath, content, 'utf-8');
    console.log(`    ✓ Wrote ${filename}`);
  }
  
  console.log('\nDone!');
}

main();

