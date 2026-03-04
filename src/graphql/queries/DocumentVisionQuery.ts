import { gql } from 'graphql-tag';

/**
 * Vision RAG: query Pinecone by documentIds (from Project doclinks), then Gemini with images.
 * Returns answer text and optional structured output.
 */

export const Q_DOCUMENT_VISION_QUERY = gql`
  query DocumentVisionQuery($input: DocumentVisionQueryInput!) {
    documentVisionQuery(input: $input) {
      answer
      structuredOutput
      matchCount
    }
  }
`;
