import { gql } from 'graphql-tag';

/**
 * AI-assisted prompt generation: send a plain-English description,
 * receive a production-quality prompt + JSON schema.
 */
export const M_GENERATE_PROMPT_DRAFT = gql`
  mutation GeneratePromptDraft($input: GeneratePromptDraftInput!) {
    generatePromptDraft(input: $input) {
      prompt
      systemInstruction
      jsonSchema
      suggestedName
    }
  }
`;
