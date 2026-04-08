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
          filename
          status
          linkType
          documentId
          textEmbeddingStatus
          imageEmbeddingStatus
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
              configuration {
                ... on ProcessNodeConfig {
                  options
                  staticOutput
                }
                ... on AINodeConfig {
                  prompt
                  model
                  topK
                  systemPrompt
                  jsonSchemaId
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
          jsonSchemaId
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
 * Query to get a project by ID.
 * Prompts are no longer scoped to a project; use listPrompts(scope) to fetch prompts.
 */
export const Q_GET_PROJECT_WITH_PROMPTS = gql`
  query GetProjectWithPrompts($id: ID!) {
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
    }
  }
`;