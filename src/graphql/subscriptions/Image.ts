import { gql } from 'graphql-tag';

/**
 * GraphQL Subscriptions for Image
 */

export const S_ON_CREATE_IMAGE = gql`
  subscription OnCreateImage($parentId: ID) {
    onCreateImage(parentId: $parentId) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      s3Bucket
      s3Key
      mimeType
      sizeBytes
      parentId
      pageNum
      imageId
      topLeftX
      topLeftY
      bottomRightX
      bottomRightY
      imageAnnotation
    }
  }
`;

export const S_ON_UPDATE_IMAGE = gql`
  subscription OnUpdateImage($id: ID!) {
    onUpdateImage(id: $id) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      s3Bucket
      s3Key
      mimeType
      sizeBytes
      parentId
      pageNum
      imageId
      topLeftX
      topLeftY
      bottomRightX
      bottomRightY
      imageAnnotation
    }
  }
`;

export const S_ON_DELETE_IMAGE = gql`
  subscription OnDeleteImage($id: ID!) {
    onDeleteImage(id: $id) {
      id
      entityType
      tenantId
      ownerId
      createdAt
      updatedAt
      deletedAt
      s3Bucket
      s3Key
      mimeType
      sizeBytes
      parentId
      pageNum
      imageId
      topLeftX
      topLeftY
      bottomRightX
      bottomRightY
      imageAnnotation
    }
  }
`;

