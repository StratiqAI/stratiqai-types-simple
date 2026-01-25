import { gql } from 'graphql-tag';

/**
 * GraphQL Queries for Project
 */

export const Q_GET_PROJECT = gql`
  query GetProject($id: ID!) {
    getProject(id: $id) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      sharingMode
      accessList(limit: 10) {
        items {
          id
          entityType
          tenantId
          ownerId
          createdAt
          updatedAt
          recipientUserId
          permission
          resourceTitle
          resourceType
        }
        nextToken
      }
      name
      description
      status
      doclinks(limit: 10) {
        items {
          id
          entityType
          tenantId
          ownerId
          createdAt
          updatedAt
          parentId
          vectorStoreId
          openAIFileId
          filename
          status
          documentId
          deletedAt
        }
        nextToken
      }
      topics(limit: 10) {
        items {
          id
          entityType
          tenantId
          ownerId
          createdAt
          updatedAt
          sharingMode
          parentId
          name
        }
        nextToken
      }
      workflows {
        items {
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
                  structuredOutputSchema {
                    jsonSchema
                  }
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
        nextToken
      }
    }
  }
`;

export const Q_LIST_PROJECTS = gql`
  query ListProjects($limit: Int, $nextToken: String, $scope: ListScope) {
    listProjects(limit: $limit, nextToken: $nextToken, scope: $scope) {
      items {
        id
        entityType
        tenantId
        ownerId
        createdAt
        updatedAt
        sharingMode
        name
        description
        status
      }
      nextToken
    }
  }
`;

/**
 * Query to get a project with its prompt templates
 * Used by the Library page to fetch templates for a selected project
 */
export const Q_GET_PROJECT_WITH_PROMPT_TEMPLATES = gql`
  query GetProjectWithPromptTemplates($id: ID!) {
    getProject(id: $id) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      sharingMode
      name
      description
      status
      prompttemplates(limit: 100) {
        items {
          id
          entityType
          tenantId
          ownerId
          createdAt
          updatedAt
          deletedAt
          sharingMode
          parentId
          name
          template
          description
        }
        nextToken
      }
    }
  }
`;