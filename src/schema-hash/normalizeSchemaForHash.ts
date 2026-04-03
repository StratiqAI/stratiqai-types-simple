/**
 * Canonical JSON Schema shape for structural hashing.
 * Strips documentation-only keys, normalizes types and property order,
 * sorts `required`, and pins object shapes with additionalProperties: false.
 */

const META_KEYS = new Set([
	'$schema',
	'$id',
	'$comment',
	'title',
	'description',
	'examples',
	'default'
]);

function normalizeTypeField(t: unknown): unknown {
	if (t === undefined) return undefined;
	if (typeof t === 'string') return [t].sort();
	if (Array.isArray(t)) return [...new Set(t.map(String))].sort();
	return t;
}

function isObjectType(types: unknown): boolean {
	if (types === 'object') return true;
	if (Array.isArray(types) && types.includes('object')) return true;
	return false;
}

/**
 * Recursively normalize a JSON Schema (draft-07 / OpenAI structured output subset).
 */
export function normalizeSchemaForHash(input: unknown): unknown {
	if (input === null || typeof input !== 'object') {
		return input;
	}
	if (Array.isArray(input)) {
		return input.map(normalizeSchemaForHash);
	}

	const src = input as Record<string, unknown>;
	const out: Record<string, unknown> = {};

	for (const key of Object.keys(src).sort()) {
		if (META_KEYS.has(key)) continue;

		let v = src[key];

		if (key === 'type') {
			v = normalizeTypeField(v);
		} else if (key === 'required' && Array.isArray(v)) {
			v = [...v].map(String).sort();
		} else if (key === 'properties' && v && typeof v === 'object' && !Array.isArray(v)) {
			const sorted: Record<string, unknown> = {};
			for (const pk of Object.keys(v).sort()) {
				sorted[pk] = normalizeSchemaForHash((v as Record<string, unknown>)[pk]);
			}
			v = sorted;
		} else if (key === '$defs' && v && typeof v === 'object' && !Array.isArray(v)) {
			const sorted: Record<string, unknown> = {};
			for (const dk of Object.keys(v).sort()) {
				sorted[dk] = normalizeSchemaForHash((v as Record<string, unknown>)[dk]);
			}
			v = sorted;
		} else if (key === 'patternProperties' && v && typeof v === 'object' && !Array.isArray(v)) {
			const sorted: Record<string, unknown> = {};
			for (const pk of Object.keys(v).sort()) {
				sorted[pk] = normalizeSchemaForHash((v as Record<string, unknown>)[pk]);
			}
			v = sorted;
		} else if (typeof v === 'object' && v !== null) {
			v = normalizeSchemaForHash(v);
		}

		out[key] = v;
	}

	const types = out.type;
	const hasProps = out.properties && typeof out.properties === 'object' && !Array.isArray(out.properties);
	if (hasProps || isObjectType(types)) {
		out.additionalProperties = false;
	}

	return out;
}
