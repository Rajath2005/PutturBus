export interface Coordinates {
    lat: number;
    lng: number;
}

// Single source of truth for location data
// High precision coordinates for KSRTC Puttur network
export const WAYPOINTS: Record<string, Coordinates> = {
    // Hubs
    'puttur': { lat: 12.7686, lng: 75.2034 },
    'bundar': { lat: 12.8631, lng: 74.8367 }, // Statebank old name
    'statebank': { lat: 12.8631, lng: 74.8367 },
    'mangalore': { lat: 12.9141, lng: 74.8560 }, // KSRTC Bus Stand
    'mangaluru': { lat: 12.9141, lng: 74.8560 },
    'mysuru': { lat: 12.2958, lng: 76.6394 },
    'bengaluru': { lat: 12.9716, lng: 77.5946 },
    'kasaragod': { lat: 12.5102, lng: 74.9852 },
    'dharmastala': { lat: 12.9463, lng: 75.3789 },
    'subrahmanya': { lat: 12.6668, lng: 75.6174 },
    'kukke subrahmanya': { lat: 12.6668, lng: 75.6174 },
    'sulya': { lat: 12.5658, lng: 75.3929 },

    // Intermediate Stops (Puttur -> Mangalore Route)
    'kombettu': { lat: 12.7720, lng: 75.2100 },
    'bolwar': { lat: 12.7600, lng: 75.2000 },
    'kabaka': { lat: 12.7836, lng: 75.1842 },
    'mani': { lat: 12.8596, lng: 75.0699 },
    'kalladka': { lat: 12.8600, lng: 75.0500 }, // Approx
    'bc road': { lat: 12.8698, lng: 75.0392 },
    'farangipete': { lat: 12.8700, lng: 74.9800 }, // Approx
    'adyar': { lat: 12.8800, lng: 74.9200 },
    'pumpwell': { lat: 12.8800, lng: 74.8700 }, // Kankanady
    'jyothi': { lat: 12.8750, lng: 74.8450 },

    // Intermediate Stops (Puttur -> Uppinangady)
    'uppinangady': { lat: 12.8398, lng: 75.2492 },
    'nelyadi': { lat: 12.8800, lng: 75.3500 },

    // Misc
    'vitla': { lat: 12.7668, lng: 75.0934 },
    'kadaba': { lat: 12.7214, lng: 75.4678 },
    'bellare': { lat: 12.6300, lng: 75.4000 },
};

/**
 * Get coordinates for a place. Normalizes input.
 */
export function getCoordinates(placeName: string): Coordinates | null {
    if (!placeName) return null;
    const normalized = placeName.toLowerCase().trim();

    // Direct match
    if (WAYPOINTS[normalized]) return WAYPOINTS[normalized];

    // Check aliases/substrings
    /*
      Optimized search: 
      Instead of iterating everything, maintain a map of aliases if needed.
      For now, simple iteration is fine for <100 points.
    */
    for (const [key, coords] of Object.entries(WAYPOINTS)) {
        if (normalized.includes(key) || key.includes(normalized)) {
            return coords;
        }
    }

    return null; // Location unknown
}

/**
 * Calculate Haversine distance between two points in km
 */
export function calculateDistance(from: Coordinates, to: Coordinates): number {
    const R = 6371; // Earth radius in km
    const dLat = (to.lat - from.lat) * Math.PI / 180;
    const dLon = (to.lng - from.lng) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(from.lat * Math.PI / 180) * Math.cos(to.lat * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
