// Physics-based route data
// Keys must match normalized slugs from route-matcher.ts
// Format: { km: number, minutes: number }

export interface RoutePhysics {
    km: number;
    minutes: number;
}

export const ROUTE_DETAILS: Record<string, RoutePhysics> = {
    // Mangaluru & Aliases
    'puttur->statebank': { km: 52, minutes: 60 },
    'puttur->mangaluru': { km: 52, minutes: 60 },

    // Mysuru
    'puttur->mysuru': { km: 130, minutes: 195 },

    // Kasaragod
    'puttur->kasaragodu': { km: 50, minutes: 90 },

    // Sulya & Kukke
    'puttur->sulya': { km: 40, minutes: 75 },
    'puttur->kukkusubrahmany': { km: 65, minutes: 110 }, // "Kukkusubrahmany" is the data name

    // Dharmasthala
    'puttur->dharmastala': { km: 35, minutes: 60 },

    // Bangalore
    'puttur->bengaluru': { km: 310, minutes: 420 }, // ~7 hours

    // Common intermediate/other
    'puttur->bc road': { km: 28, minutes: 45 },
    'puttur->uppinangady': { km: 12, minutes: 20 },
    'puttur->vitla': { km: 15, minutes: 30 },
};

export function getRoutePhysics(normalizedSlug: string): RoutePhysics | null {
    // normalizedSlug e.g. "puttur-to-mangaluru" -> "puttur->mangaluru" (if passed full)
    // But route-matcher gives us "mangaluru".
    // Let's standardise keys to "puttur->dest"

    // If input is just "mangaluru", prepend "puttur->"
    const key = normalizedSlug.includes('->')
        ? normalizedSlug
        : `puttur->${normalizedSlug.toLowerCase()}`;

    return ROUTE_DETAILS[key] || null;
}
