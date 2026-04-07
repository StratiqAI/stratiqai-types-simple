import { gql } from 'graphql-tag';

/**
 * Ontology graph queries (EntityDefinition list, EntityInstance get).
 */

export const ONTOLOGY_ENTITY_DEFINITION_FIELDS = gql`
	fragment OntologyEntityDefinitionFields on EntityDefinition {
		projectId
		id
		name
		description
		jsonSchema
		structuralHash
		normalizedJsonSchema
		properties {
			name
			description
			dataType
			path
			isList
			formula
			dependencies
		}
	}
`;

export const ONTOLOGY_ENTITY_INSTANCE_FIELDS = gql`
	fragment OntologyEntityInstanceFields on EntityInstance {
		projectId
		id
		definitionId
		label
		updatedAt
		senderId
		values {
			propertyName
			stringValue
			numberValue
			booleanValue
			dateValue
			extractedByAI
			confidenceScore
			sourceEvidence
		}
		children {
			relationName
			targetInstanceId
		}
	}
`;

export const Q_LIST_ENTITY_DEFINITIONS = gql`
	query ListEntityDefinitions($projectId: ID!) {
		listEntityDefinitions(projectId: $projectId) {
			...OntologyEntityDefinitionFields
		}
	}
	${ONTOLOGY_ENTITY_DEFINITION_FIELDS}
`;

export const Q_GET_ENTITY_DEFINITION = gql`
	query GetEntityDefinition($projectId: ID!, $id: ID!) {
		getEntityDefinition(projectId: $projectId, id: $id) {
			...OntologyEntityDefinitionFields
		}
	}
	${ONTOLOGY_ENTITY_DEFINITION_FIELDS}
`;

export const Q_GET_ENTITY_INSTANCE = gql`
	query GetEntityInstance($projectId: ID!, $id: ID!) {
		getEntityInstance(projectId: $projectId, id: $id) {
			...OntologyEntityInstanceFields
		}
	}
	${ONTOLOGY_ENTITY_INSTANCE_FIELDS}
`;

export const Q_LIST_ENTITY_INSTANCES = gql`
	query ListEntityInstances($projectId: ID!) {
		listEntityInstances(projectId: $projectId) {
			...OntologyEntityInstanceFields
		}
	}
	${ONTOLOGY_ENTITY_INSTANCE_FIELDS}
`;

export const Q_LIST_ENTITY_INSTANCES_BY_DEFINITION = gql`
	query ListEntityInstancesByDefinition($projectId: ID!, $definitionId: ID!) {
		listEntityInstancesByDefinition(projectId: $projectId, definitionId: $definitionId) {
			...OntologyEntityInstanceFields
		}
	}
	${ONTOLOGY_ENTITY_INSTANCE_FIELDS}
`;

export const Q_GET_ENTITY_DEFINITION_BY_HASH = gql`
	query GetEntityDefinitionByHash($projectId: ID!, $structuralHash: String!) {
		getEntityDefinitionByHash(projectId: $projectId, structuralHash: $structuralHash) {
			...OntologyEntityDefinitionFields
		}
	}
	${ONTOLOGY_ENTITY_DEFINITION_FIELDS}
`;
