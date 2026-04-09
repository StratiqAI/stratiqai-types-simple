import { gql } from 'graphql-tag';

import { EXTRACTION_FIELDS } from '../queries/Extraction.js';

/**
 * GraphQL Mutations for Extraction (simplified widget data pipeline).
 *
 * `CreateExtractionInput` (schema): `projectId`, `prompt` required;
 * optional `schema`, `documentIds`, `model`, `runImmediately`, etc.
 */

export const M_CREATE_EXTRACTION = gql`
  mutation CreateExtraction($input: CreateExtractionInput!) {
    createExtraction(input: $input) {
      ${EXTRACTION_FIELDS}
    }
  }
`;

export const M_UPDATE_EXTRACTION = gql`
  mutation UpdateExtraction($id: ID!, $input: UpdateExtractionInput!) {
    updateExtraction(id: $id, input: $input) {
      ${EXTRACTION_FIELDS}
    }
  }
`;

export const M_RUN_EXTRACTION = gql`
  mutation RunExtraction($id: ID!) {
    runExtraction(id: $id) {
      ${EXTRACTION_FIELDS}
    }
  }
`;

export const M_DELETE_EXTRACTION = gql`
  mutation DeleteExtraction($id: ID!) {
    deleteExtraction(id: $id) {
      ${EXTRACTION_FIELDS}
    }
  }
`;
