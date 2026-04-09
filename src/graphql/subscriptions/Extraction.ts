import { gql } from 'graphql-tag';

import { EXTRACTION_FIELDS } from '../queries/Extraction.js';

/**
 * GraphQL Subscriptions for Extraction.
 * Use onUpdateExtraction(id) to receive RUNNING / SUCCESS / ERROR status changes.
 */

export const S_ON_CREATE_EXTRACTION = gql`
  subscription OnCreateExtraction($projectId: ID) {
    onCreateExtraction(projectId: $projectId) {
      ${EXTRACTION_FIELDS}
    }
  }
`;

export const S_ON_UPDATE_EXTRACTION = gql`
  subscription OnUpdateExtraction($id: ID!) {
    onUpdateExtraction(id: $id) {
      ${EXTRACTION_FIELDS}
    }
  }
`;

export const S_ON_DELETE_EXTRACTION = gql`
  subscription OnDeleteExtraction($id: ID!) {
    onDeleteExtraction(id: $id) {
      ${EXTRACTION_FIELDS}
    }
  }
`;
