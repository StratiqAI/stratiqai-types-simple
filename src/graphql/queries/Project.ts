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
          definitionJSON
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