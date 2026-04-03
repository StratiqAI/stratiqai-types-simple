/**
 * Lightweight structural view for widget (consumer) vs prompt (producer) compatibility.
 * Matches uw-webapp checkSchemaCompatibility semantics.
 */

export interface RequirementProfile {
	/** Keys the consumer schema marks as required (sorted). */
	required: string[];
	/** Top-level property name → normalized type string (from `properties[key].type`). */
	propertyTypes: Record<string, string>;
}

/** Normalize JSON Schema `type` to a comparable string (same rules as legacy uw-webapp). */
export function normalizeJsonSchemaType(t: string | string[] | undefined): string {
	if (!t) return 'any';
	return Array.isArray(t) ? t.filter((x) => x !== 'null').sort().join('|') : t;
}

interface SchemaLike {
	type?: string | string[];
	properties?: Record<string, { type?: string | string[] }>;
	required?: string[];
}

/**
 * Build a requirement profile from an object-style JSON Schema root.
 * Non-object roots yield empty profiles.
 */
export function extractRequirementProfile(schema: unknown): RequirementProfile {
	if (!schema || typeof schema !== 'object' || Array.isArray(schema)) {
		return { required: [], propertyTypes: {} };
	}
	const s = schema as SchemaLike;
	const required = [...(s.required ?? [])].map(String).sort();
	const props = s.properties ?? {};
	const propertyTypes: Record<string, string> = {};
	for (const key of Object.keys(props)) {
		propertyTypes[key] = normalizeJsonSchemaType(props[key]?.type);
	}
	return { required, propertyTypes };
}

export type SchemaCompatibilityAnalysis =
	| { compatible: true }
	| {
			compatible: false;
			reason: string;
			missingKeys: string[];
			extraKeys: string[];
	  };

/**
 * Widget profile = target (consumer); prompt profile = candidate (producer).
 * Every widget.required key must appear in prompt.required, with matching top-level types
 * when both declare a type for that property.
 */
export function analyzeRequirementProfiles(
	widgetProfile: RequirementProfile,
	promptProfile: RequirementProfile
): SchemaCompatibilityAnalysis {
	const wReq = new Set(widgetProfile.required);
	const pReq = new Set(promptProfile.required);
	const wTypes = widgetProfile.propertyTypes;
	const pTypes = promptProfile.propertyTypes;

	const missingKeys: string[] = [];
	for (const key of wReq) {
		if (!pReq.has(key)) {
			missingKeys.push(key);
		}
	}

	const typeMismatches: string[] = [];
	for (const key of wReq) {
		if (key in wTypes && key in pTypes) {
			const wt = wTypes[key];
			const pt = pTypes[key];
			if (wt !== 'any' && pt !== 'any' && wt !== pt) {
				typeMismatches.push(`${key}: expected ${wt}, got ${pt}`);
			}
		}
	}

	const extraKeys = [...pReq].filter((k) => !wReq.has(k));

	if (missingKeys.length > 0 || typeMismatches.length > 0) {
		const parts: string[] = [];
		if (missingKeys.length > 0) {
			parts.push(`Missing required fields: ${missingKeys.join(', ')}`);
		}
		if (typeMismatches.length > 0) {
			parts.push(`Type mismatches: ${typeMismatches.join('; ')}`);
		}
		return {
			compatible: false,
			reason: parts.join('. '),
			missingKeys,
			extraKeys
		};
	}

	return { compatible: true };
}

export function isProfileCompatible(
	widgetProfile: RequirementProfile,
	promptProfile: RequirementProfile
): boolean {
	return analyzeRequirementProfiles(widgetProfile, promptProfile).compatible;
}
