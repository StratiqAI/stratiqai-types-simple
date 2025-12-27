import { gql } from 'graphql-tag';

/**
 * GraphQL Queries for Image
 */

export const Q_GET_IMAGE = gql`
  query GetImage($key: CompositeKeyInput!) {
    getImage(key: $key) {
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

export const Q_LIST_IMAGES = gql`
  query ListImages(
    $parentId: ID!
    $limit: Int
    $nextToken: String
  ) {
    listImages(parentId: $parentId, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;

