import { gql } from 'graphql-tag';

import {
	ONTOLOGY_ENTITY_DEFINITION_FIELDS,
	ONTOLOGY_ENTITY_INSTANCE_FIELDS,
} from '../queries/Ontology.js';

/**
 * Ontology graph subscriptions.
 * Variables must match the mutation payload fields AppSync uses for subscription filtering.
 */

/** Subscribe to any definition save within a project. */
export const S_ON_DEFINITION_SAVED = gql`
	subscription OnDefinitionSaved($projectId: ID!) {
		onDefinitionSaved(projectId: $projectId) {
			...OntologyEntityDefinitionFields
		}
	}
	${ONTOLOGY_ENTITY_DEFINITION_FIELDS}
`;

/** Subscribe to any definition deletion within a project. */
export const S_ON_DEFINITION_DELETED = gql`
	subscription OnDefinitionDeleted($projectId: ID!) {
		onDefinitionDeleted(projectId: $projectId) {
			projectId
			id
			name
		}
	}
`;

/** Subscribe to updates on a specific entity instance. */
export const S_ON_INSTANCE_UPDATED = gql`
	subscription OnInstanceUpdated($projectId: ID!, $id: ID!) {
		onInstanceUpdated(projectId: $projectId, id: $id) {
			...OntologyEntityInstanceFields
		}
	}
	${ONTOLOGY_ENTITY_INSTANCE_FIELDS}
`;

/** Subscription with minimal fields (matches filter fields + definitionId for quick checks). */
export const S_ON_INSTANCE_UPDATED_MINIMAL = gql`
	subscription OnInstanceUpdatedMinimal($projectId: ID!, $id: ID!) {
		onInstanceUpdated(projectId: $projectId, id: $id) {
			projectId
			id
			definitionId
			label
			updatedAt
		}
	}
`;

/** Subscribe to all instance creates and updates within a project (no id filter). */
export const S_ON_PROJECT_INSTANCES_CHANGED = gql`
	subscription OnProjectInstancesChanged($projectId: ID!) {
		onProjectInstancesChanged(projectId: $projectId) {
			...OntologyEntityInstanceFields
		}
	}
	${ONTOLOGY_ENTITY_INSTANCE_FIELDS}
`;

/** Subscribe to any instance deletion within a project. */
export const S_ON_INSTANCE_DELETED = gql`
	subscription OnInstanceDeleted($projectId: ID!) {
		onInstanceDeleted(projectId: $projectId) {
			projectId
			id
			definitionId
		}
	}
`;
