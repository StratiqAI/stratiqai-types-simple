import { normalizeSchemaForHash } from './normalizeSchemaForHash.js';
import { stableStringify } from './stableStringify.js';

async function sha256HexUtf8(text: string): Promise<string> {
	const cryptoApi = globalThis.crypto;
	if (!cryptoApi?.subtle) {
		throw new Error('schemaHash requires Web Crypto (globalThis.crypto.subtle)');
	}
	const data = new TextEncoder().encode(text);
	const digest = await cryptoApi.subtle.digest('SHA-256', data);
	return Array.from(new Uint8Array(digest))
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');
}

/**
 * Structural hash of a JSON Schema (metadata-stripped, canonical form).
 * Prefix `sch_` + first 16 hex chars of SHA-256.
 */
export async function schemaHash(schema: unknown): Promise<string> {
	const normalized = normalizeSchemaForHash(schema);
	const canonical = stableStringify(normalized);
	const full = await sha256HexUtf8(canonical);
	return `sch_${full.slice(0, 16)}`;
}
