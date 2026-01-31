export interface RoadRoute {
    distanceKm: number;
    durationMin: number;
    geometry: [number, number][]; // Array of [lat, lng]
}

export async function getRoadRoute(from: { lat: number; lng: number }, to: { lat: number; lng: number }): Promise<RoadRoute | null> {
    try {
        const url = `https://router.project-osrm.org/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson`;

        // Use AbortController for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const res = await fetch(url, {
            signal: controller.signal,
            next: { revalidate: 86400 } // Cache for 24 hours (Next.js specific, might be ignored in pure client fetch but good practice)
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
            console.error("OSRM fetch failed:", res.statusText);
            return null; // Fallback to straight line
        }

        const data = await res.json();

        if (!data.routes || data.routes.length === 0) return null;

        const route = data.routes[0];

        // OSRM returns geometry as [lon, lat], we need [lat, lon] for Leaflet
        const geometry: [number, number][] = route.geometry.coordinates.map((c: [number, number]) => [c[1], c[0]]);

        return {
            distanceKm: route.distance / 1000,
            durationMin: route.duration / 60,
            geometry: geometry
        };
    } catch (error) {
        console.error("Error fetching road route:", error);
        return null;
    }
}
