import { gql } from 'graphql-tag';

import {
	ONTOLOGY_ENTITY_DEFINITION_FIELDS,
	ONTOLOGY_ENTITY_INSTANCE_FIELDS,
} from '../queries/Ontology.js';

/**
 * Ontology graph mutations.
 */

/** Save (upsert) an entity definition; full replace. */
export const M_SAVE_ENTITY_DEFINITION = gql`
	mutation SaveEntityDefinition($input: SaveEntityDefinitionInput!) {
		saveEntityDefinition(input: $input) {
			...OntologyEntityDefinitionFields
		}
	}
	${ONTOLOGY_ENTITY_DEFINITION_FIELDS}
`;

/** Delete an entity definition by project and id. Returns the deleted item. */
export const M_DELETE_ENTITY_DEFINITION = gql`
	mutation DeleteEntityDefinition($projectId: ID!, $id: ID!) {
		deleteEntityDefinition(projectId: $projectId, id: $id) {
			projectId
			id
			name
		}
	}
`;

/** Save (upsert) an entity instance; partial property merge via values array. */
export const M_SAVE_ENTITY_INSTANCE = gql`
	mutation SaveEntityInstance($input: SaveInstanceInput!) {
		saveEntityInstance(input: $input) {
			...OntologyEntityInstanceFields
		}
	}
	${ONTOLOGY_ENTITY_INSTANCE_FIELDS}
`;

/** Same mutation with a minimal selection set (useful for bandwidth checks). */
export const M_SAVE_ENTITY_INSTANCE_MINIMAL = gql`
	mutation SaveEntityInstanceMinimal($input: SaveInstanceInput!) {
		saveEntityInstance(input: $input) {
			projectId
			id
			definitionId
			updatedAt
		}
	}
`;

/** Delete an entity instance by project and id. Returns the deleted item. */
export const M_DELETE_ENTITY_INSTANCE = gql`
	mutation DeleteEntityInstance($projectId: ID!, $id: ID!) {
		deleteEntityInstance(projectId: $projectId, id: $id) {
			projectId
			id
			definitionId
		}
	}
`;
