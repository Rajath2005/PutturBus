export interface Location {
    lat: number;
    lng: number;
}

export const LOCATIONS: Record<string, Location> = {
    puttur: { lat: 12.759, lng: 75.201 }, // Puttur KSRTC
    vitla: { lat: 12.7668, lng: 75.0934 },
    kasaragod: { lat: 12.498, lng: 74.986 },
    uppinangady: { lat: 12.842, lng: 75.247 },
    mangalore: { lat: 12.8631, lng: 74.8367 }, // Statebank
    mangaluru: { lat: 12.8631, lng: 74.8367 }, // Alias
    statebank: { lat: 12.8631, lng: 74.8367 }, // Alias
    mysuru: { lat: 12.3051, lng: 76.6551 }, // Suburban Stand
    bengaluru: { lat: 12.9784, lng: 77.5721 }, // Majestic
    sulya: { lat: 12.5658, lng: 75.3929 },
    dharmastala: { lat: 12.9463, lng: 75.3789 },
    subrahmanya: { lat: 12.6668, lng: 75.6174 },
    udupi: { lat: 13.3409, lng: 74.7421 },
    karwar: { lat: 14.8200, lng: 74.1200 },
    panaji: { lat: 15.4909, lng: 73.8278 },
    mulleria: { lat: 12.5583, lng: 75.1039 },
};

// Helper to get location safely (now preferred over geo.ts for routing)
export function getRouteLocation(name: string): Location | null {
    if (!name) return null;
    const key = name.toLowerCase().trim();
    if (LOCATIONS[key]) return LOCATIONS[key];

    // Search aliases
    for (const [k, v] of Object.entries(LOCATIONS)) {
        if (key.includes(k) || k.includes(key)) return v;
    }
    return null;
}
