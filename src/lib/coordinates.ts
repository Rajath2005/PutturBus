export interface Coordinates {
    lat: number;
    lng: number;
}

export const CITY_COORDINATES: Record<string, Coordinates> = {
    'puttur': { lat: 12.7686, lng: 75.2034 },
    'mangalore': { lat: 12.9141, lng: 74.8560 },
    'mangaluru': { lat: 12.9141, lng: 74.8560 },
    'statebank': { lat: 12.8631, lng: 74.8367 },
    'bc road': { lat: 12.8698, lng: 75.0392 },
    'sulya': { lat: 12.5658, lng: 75.3929 },
    'sullia': { lat: 12.5658, lng: 75.3929 },
    'mysuru': { lat: 12.2958, lng: 76.6394 },
    'mysore': { lat: 12.2958, lng: 76.6394 },
    'dharmastala': { lat: 12.9463, lng: 75.3789 },
    'dharmasthala': { lat: 12.9463, lng: 75.3789 },
    'madikeri': { lat: 12.4244, lng: 75.7382 },
    'kasaragod': { lat: 12.5102, lng: 74.9852 },
    'kasaragodu': { lat: 12.5102, lng: 74.9852 },
    'kukke subrahmanya': { lat: 12.6668, lng: 75.6174 },
    'kukkusubrahmanya': { lat: 12.6668, lng: 75.6174 },
    'subrahmanya': { lat: 12.6668, lng: 75.6174 },
    'bengaluru': { lat: 12.9716, lng: 77.5946 },
    'bangalore': { lat: 12.9716, lng: 77.5946 },
    'uppinangady': { lat: 12.8398, lng: 75.2492 },
    'ujire': { lat: 12.9926, lng: 75.3340 },
    'belthangady': { lat: 12.9863, lng: 75.2891 },
    'koila': { lat: 12.8275, lng: 75.1486 },
    'kadaba': { lat: 12.7214, lng: 75.4678 },
    'vitla': { lat: 12.7668, lng: 75.0934 },
    'mani': { lat: 12.8596, lng: 75.0699 },
    'kabaka': { lat: 12.7836, lng: 75.1842 },
};

export function getCoordinates(cityInfo: string): Coordinates | null {
    const key = cityInfo.toLowerCase().trim();

    // Direct lookup
    if (CITY_COORDINATES[key]) return CITY_COORDINATES[key];

    // Fuzzy matching or keyword containment (primitive)
    for (const [name, coords] of Object.entries(CITY_COORDINATES)) {
        if (key.includes(name)) return coords;
    }

    return null;
}
