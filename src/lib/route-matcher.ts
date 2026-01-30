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
    'hubbali': 'Hubli',
    'hubballi': 'Hubli',
    'kukkesubramanya': 'Kukke Subrahmanya',
    'kukkusubrahmany': 'Kukke Subrahmanya',
    'mysuru': 'Mysuru',
    'mysore': 'Mysuru',
    'bengaluru': 'Bengaluru',
    'bangalore': 'Bengaluru',
    'panaji': 'Panaji',
    'goa': 'Panaji',
    'mangalore': 'Statebank',
    'mangaluru': 'Statebank',
    'statebank': 'Statebank',
    'kasaragod': 'Kasaragodu',
    'dharmasthala': 'Dharmastala',
    'sullia': 'Sulya',
    'uppinangadi': 'Uppinangady',
    'b c road': 'BC Road',
    'bc road': 'BC Road',
    'bcroad': 'BC Road'
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

// Explicit list of Intercity Destinations
// These will trigger the Intercity Engine
const INTERCITY_KEYS = new Set([
    'Bengaluru',
    'Mysuru',
    'Panaji',
    'Kasaragod',
    'Hubli',
    'Mumbai',
    'Goa',
    'Badiyadka',
    'Bhatkala',
    'Chamarajanagara',
    'Channarayapatna',
    'Coimbatore',
    'Dharmastala',
    'Gokarna',
    'Gudlupet',
    'Hubbali',
    'KGF',
    'Kollegala',
    'Kundapura',
    'Kutta',
    'Madikeri',
    'Madurai',
    'Malla',
    'Nanjanagud',
    'Ooty',
    'Somavarapete',
    'Udupi',
    'Virajapete'
]);

export function isIntercityDest(destination: string | null): boolean {
    if (!destination) return false;
    // Check if the canonical name is in our Intercity List
    // OR if it's NOT in the inferred Local list (if we want that logic).
    // For now, explicit inclusion is safer to avoid breaking existing routes.
    return INTERCITY_KEYS.has(destination) || destination === 'Kasaragodu';
}

export function getAllDestinations(): string[] {
    return DESTINATIONS.sort();
}
