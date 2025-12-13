import { gql } from 'graphql-tag';

/**
 * GraphQL Mutations for Project
 */

export const M_CREATE_PROJECT = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
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

export const M_UPDATE_PROJECT = gql`
  mutation UpdateProject($id: ID!, $input: UpdateProjectInput!) {
    updateProject(id: $id, input: $input) {
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

export const M_DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
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

export const M_RESTORE_PROJECT = gql`
  mutation RestoreProject($id: ID!) {
    restoreProject(id: $id) {
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