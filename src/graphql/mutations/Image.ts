import { gql } from 'graphql-tag';

/**
 * GraphQL Mutations for Image
 */

export const M_CREATE_IMAGE = gql`
  mutation CreateImage($input: CreateImageInput!) {
    createImage(input: $input) {
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

export const M_UPDATE_IMAGE = gql`
  mutation UpdateImage($key: CompositeKeyInput!, $input: UpdateImageInput!) {
    updateImage(key: $key, input: $input) {
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

export const M_DELETE_IMAGE = gql`
  mutation DeleteImage($key: CompositeKeyInput!) {
    deleteImage(key: $key) {
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

