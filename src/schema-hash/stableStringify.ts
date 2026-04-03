/**
 * Deterministic JSON serialization: objects have sorted keys, arrays keep order.
 * Used for execution IDs, schema hashing, and canonical comparisons.
 */
export function stableStringify(value: unknown): string {
	if (value === null || typeof value !== 'object') {
		return JSON.stringify(value);
	}
	if (Array.isArray(value)) {
		return `[${value.map(stableStringify).join(',')}]`;
	}
	const o = value as Record<string, unknown>;
	const keys = Object.keys(o).sort();
	return `{${keys.map((k) => `${JSON.stringify(k)}:${stableStringify(o[k])}`).join(',')}}`;
}
