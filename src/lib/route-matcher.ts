import Fuse from 'fuse.js';
import busData from '@/data/bus-routes.json';

// unique destinations from data
const DESTINATIONS = Array.from(new Set(busData.map(b => b.to)));

// normalized map for strict matching
// e.g. "mysuru" -> "Mysuru"
const NORMALIZED_DESTINATIONS: Record<string, string> = {};
DESTINATIONS.forEach(dest => {
    NORMALIZED_DESTINATIONS[dest.toLowerCase()] = dest;
    // Handle "CityName (Place)" format if exists, though data seems simple
});

// Common Aliases to Canonical Names in JSON
const ALIAS_MAP: Record<string, string> = {
    'mysore': 'Mysuru',
    'mangalore': 'Statebank', // Start with Statebank as it's the main detailed one? Or 'Mangaluru'?
    'mangaluru': 'Statebank',
    'statebank': 'Statebank',
    'kasaragod': 'Kasaragodu',
    'kukke': 'Kukkusubrahmany', // Data has 'Kukkusubrahmany'
    'subrahmanya': 'Kukkusubrahmany',
    'dharmasthala': 'Dharmastala', // Data has 'Dharmastala'
    'sullia': 'Sulya',
    'uppinangadi': 'Uppinangady',
    'b c road': 'BC Road',
    'bc road': 'BC Road',
    'bcroad': 'BC Road',
    'bangalore': 'Bengaluru',
};

// Fuzzy Search Instance
const fuse = new Fuse(DESTINATIONS, {
    includeScore: true,
    threshold: 0.4, // 0.0 is perfect match, 1.0 is match anything
});

export function normalizeSlug(slug: string): string {
    if (!slug) return '';
    // remove "puttur-to-" prefix
    let clean = slug.replace(/^puttur-to-/, '');
    // replace dashes with spaces
    clean = clean.replace(/-/g, ' ');
    return clean.trim();
}

/**
 * Finds the canonical destination name from a user slug/query.
 * @param slug e.g. "puttur-to-mysore" or "mysore"
 * @returns The exact destination name in JSON (e.g. "Mysuru") or null
 */
export function findDestination(slug: string): string | null {
    const rawTerm = normalizeSlug(slug).toLowerCase();

    // 1. Direct Alias Match
    if (ALIAS_MAP[rawTerm]) {
        return ALIAS_MAP[rawTerm];
    }

    // 2. Direct normalized match (case-insensitive)
    if (NORMALIZED_DESTINATIONS[rawTerm]) {
        return NORMALIZED_DESTINATIONS[rawTerm];
    }

    // 3. Fuzzy Search
    const results = fuse.search(rawTerm);
    if (results.length > 0) {
        return results[0].item;
    }

    return null;
}

export function getAllDestinations(): string[] {
    return DESTINATIONS.sort();
}
