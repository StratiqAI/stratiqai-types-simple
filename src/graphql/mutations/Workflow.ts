import { gql } from 'graphql-tag';

/**
 * GraphQL Mutations for Workflow
 */

export const M_CREATE_WORKFLOW = gql`
  mutation CreateWorkflow($input: CreateWorkflowInput!) {
    createWorkflow(input: $input) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      sharingMode
      name
      definition {
        nodes {
          id
          kind
          label
          options
          config {
            ... on ProcessNodeConfig {
              options
              staticOutput
            }
            ... on AINodeConfig {
              prompt
              model
              topK
              systemPrompt
            }
            ... on ToolsNodeConfig {
              options
            }
            ... on EmptyNodeConfig {
              _empty
            }
          }
        }
        edges {
          id
          sourceId
          targetId
          sourcePort
          targetPort
        }
      }
      structuredOutputSchema {
        jsonSchema
      }
      parentId
      ui {
        elements {
          id
          type
          category
          typeLabel
          x
          y
          width
          height
        }
        connections {
          id
          from
          to
          fromSide
          toSide
        }
      }
    }
  }
`;

export const M_UPDATE_WORKFLOW = gql`
  mutation UpdateWorkflow($key: CompositeKeyInput!, $input: UpdateWorkflowInput!) {
    updateWorkflow(key: $key, input: $input) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      sharingMode
      name
      definition {
        nodes {
          id
          kind
          label
          options
          config {
            ... on ProcessNodeConfig {
              options
              staticOutput
            }
            ... on AINodeConfig {
              prompt
              model
              topK
              systemPrompt
            }
            ... on ToolsNodeConfig {
              options
            }
            ... on EmptyNodeConfig {
              _empty
            }
          }
        }
        edges {
          id
          sourceId
          targetId
          sourcePort
          targetPort
        }
      }
      structuredOutputSchema {
        jsonSchema
      }
      parentId
      ui {
        elements {
          id
          type
          category
          typeLabel
          x
          y
          width
          height
        }
        connections {
          id
          from
          to
          fromSide
          toSide
        }
      }
    }
  }
`;

export const M_DELETE_WORKFLOW = gql`
  mutation DeleteWorkflow($key: CompositeKeyInput!) {
    deleteWorkflow(key: $key) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      sharingMode
      name
      definition {
        nodes {
          id
          kind
          label
          options
          config {
            ... on ProcessNodeConfig {
              options
              staticOutput
            }
            ... on AINodeConfig {
              prompt
              model
              topK
              systemPrompt
            }
            ... on ToolsNodeConfig {
              options
            }
            ... on EmptyNodeConfig {
              _empty
            }
          }
        }
        edges {
          id
          sourceId
          targetId
          sourcePort
          targetPort
        }
      }
      structuredOutputSchema {
        jsonSchema
      }
      parentId
      ui {
        elements {
          id
          type
          category
          typeLabel
          x
          y
          width
          height
        }
        connections {
          id
          from
          to
          fromSide
          toSide
        }
      }
    }
  }
`;
