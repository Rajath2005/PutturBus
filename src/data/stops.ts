// Ordered list of stops definitions

export interface RouteStop {
    name: string;
    isMajor: boolean; // Show on map by default
}

// Ordered list of stops for major routes starting from Puttur
export const ROUTE_STOPS: Record<string, RouteStop[]> = {
    // Puttur -> Mangalore (Statebank)
    'statebank': [
        { name: 'Puttur', isMajor: true },
        { name: 'Kabaka', isMajor: false },
        { name: 'Mani', isMajor: true },
        { name: 'Kalladka', isMajor: false },
        { name: 'BC Road', isMajor: true },
        { name: 'Farangipete', isMajor: false },
        { name: 'Adyar', isMajor: false },
        { name: 'Pumpwell', isMajor: true },
        { name: 'Jyothi', isMajor: false },
        { name: 'Statebank', isMajor: true }
    ],
    // Puttur -> Mangalore (Main Bus Stand)
    'mangaluru': [
        { name: 'Puttur', isMajor: true },
        { name: 'Kabaka', isMajor: false },
        { name: 'Mani', isMajor: true },
        { name: 'BC Road', isMajor: true },
        { name: 'Pumpwell', isMajor: true },
        { name: 'Bejai', isMajor: false }, // KSRTC stand area
        { name: 'Mangaluru', isMajor: true }
    ],
    // Puttur -> Dharmastala
    'dharmastala': [
        { name: 'Puttur', isMajor: true },
        { name: 'Uppinangady', isMajor: true },
        { name: 'Guruvayanakere', isMajor: false },
        { name: 'Belthangady', isMajor: true },
        { name: 'Ujire', isMajor: true },
        { name: 'Dharmastala', isMajor: true }
    ],
    // Puttur -> Sulya
    'sulya': [
        { name: 'Puttur', isMajor: true },
        { name: 'Kumbra', isMajor: false },
        { name: 'Sullia', isMajor: true } // Name variation mapped in geo.ts
    ],
    // Default fallback
    'default': [
        { name: 'Puttur', isMajor: true }
    ]
};

export function getStopsForRoute(destination: string): RouteStop[] {
    const key = destination.toLowerCase().replace(/ /g, '');
    // Try to find a matching key
    if (ROUTE_STOPS[key]) return ROUTE_STOPS[key];

    // Check aliases
    if (key === 'mangalore') return ROUTE_STOPS['mangaluru'];
    if (key.includes('statebank')) return ROUTE_STOPS['statebank'];

    return ROUTE_STOPS['default'];
}
