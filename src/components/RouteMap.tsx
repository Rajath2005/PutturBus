"use client";

import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Coordinates, getCoordinates } from '@/lib/geo';

// Production-Grade Leaflet Map
// Phase 2: Restored Interactvity
// Phase 3: Auto-Fit (Calculated Bounds)
// Phase 4: Intermediate Stops
// Phase 6: Simulated Bus Movement
// Phase 7: Real Road Geometry

interface RouteMapProps {
    from: Coordinates;
    to: Coordinates;
    destinationName: string;
    viaStops?: string[];
    progress?: number; // 0 to 1
    geometry?: [number, number][]; // OSRM Geometry
}

// Custom Icons
const createIcon = (color: string, size = 'sm') => {
    const sizeClasses = size === 'lg' ? 'w-5 h-5 border-[3px]' : 'w-3 h-3 border-[2px]';
    return L.divIcon({
        className: 'bg-transparent',
        html: `<div class="${sizeClasses} rounded-full bg-white ${color} shadow-lg transform transition-transform duration-300 hover:scale-125"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
};

const OriginIcon = createIcon('border-blue-600', 'lg');
const DestIcon = createIcon('border-red-600', 'lg');
const StopIcon = createIcon('border-slate-500', 'sm');

// Bus Icon
const BusMarkerIcon = L.divIcon({
    className: 'bg-transparent',
    html: `
        <div class="relative w-8 h-8 flex items-center justify-center">
            <div class="absolute inset-0 bg-blue-500/30 animate-ping rounded-full"></div>
            <div class="relative z-10 w-6 h-6 bg-slate-900 border-2 border-white rounded-full shadow-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3 text-white">
                    <path d="M8 6v6" />
                    <path d="M15 6v6" />
                    <path d="M2 12h19.6" />
                    <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.6-8 .5-6-4.2-2.5-8.8-2.5-4.6 0-9.3 3.5-8.8 9.5.4 7.2.5 3.8.9 3.8H18c0 0-2.8 0-2.8-5h-3c0 5 0 5 0 5h3Z" />
                    <path d="M7 18h10" />
                    <rect width="20" height="14" x="2" y="3" rx="2" />
                </svg>
            </div>
        </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
});

function MapController({ from, to, stops, geometry }: { from: Coordinates; to: Coordinates; stops: Coordinates[]; geometry?: [number, number][]; }) {
    const map = useMap();

    useEffect(() => {
        let points: L.LatLngExpression[] = [];

        if (geometry && geometry.length > 0) {
            points = geometry;
        } else {
            points = [
                [from.lat, from.lng],
                ...stops.map(s => [s.lat, s.lng]),
                [to.lat, to.lng]
            ] as L.LatLngExpression[];
        }

        const bounds = L.latLngBounds(points);

        // Responsive Padding
        map.fitBounds(bounds, {
            padding: [40, 40],
            animate: true,
            duration: 1.5
        });

    }, [map, from, to, stops, geometry]);

    return null;
}

// Helper to interpolate position along polyline
function interpolatePosition(path: [number, number][], progress: number): [number, number] | null {
    if (progress <= 0) return path[0];
    if (progress >= 1) return path[path.length - 1];

    if (!path || path.length < 2) return null;

    // Calculate total length
    let totalLength = 0;
    const segments = [];
    for (let i = 0; i < path.length - 1; i++) {
        const p1 = L.latLng(path[i]);
        const p2 = L.latLng(path[i + 1]);
        const dist = p1.distanceTo(p2);
        segments.push({ start: path[i], end: path[i + 1], dist });
        totalLength += dist;
    }

    // Safety check
    if (totalLength === 0) return path[0];

    const targetDist = totalLength * progress;

    // Find segment
    let currentDist = 0;
    for (const segment of segments) {
        if (currentDist + segment.dist >= targetDist) {
            // Found segment
            const segmentProgress = (targetDist - currentDist) / segment.dist;

            // Linear interpolation
            const lat = segment.start[0] + (segment.end[0] - segment.start[0]) * segmentProgress;
            const lng = segment.start[1] + (segment.end[1] - segment.start[1]) * segmentProgress;
            return [lat, lng];
        }
        currentDist += segment.dist;
    }

    return path[path.length - 1];
}

export default function RouteMap({ from, to, destinationName, viaStops = [], progress = 0, geometry }: RouteMapProps) {
    // Resolve Stop Coordinates
    const stopCoordinates = useMemo(() => {
        return viaStops
            .map(cityName => ({ name: cityName, coords: getCoordinates(cityName) }))
            .filter(item => item.coords !== null) as { name: string, coords: Coordinates }[];
    }, [viaStops]);

    // Construct Route Path
    // If OSRM geometry is provided, use it. Otherwise fall back to straight lines (waypoints).
    const routePath = useMemo(() => {
        if (geometry && geometry.length > 0) return geometry;
        return [
            [from.lat, from.lng],
            ...stopCoordinates.map(s => [s.coords.lat, s.coords.lng]),
            [to.lat, to.lng]
        ] as [number, number][];
    }, [from, to, stopCoordinates, geometry]);

    const pathOptions = {
        color: '#2563EB',
        weight: 6,
        opacity: 0.9,
        lineCap: 'round' as const,
        dashArray: geometry ? undefined : '10, 10' // Dashed for straight line fallback to imply "appoximate"
    };

    // Calculate Bus Position
    const busPosition = useMemo(() => {
        if (progress > 0 && progress < 1) {
            return interpolatePosition(routePath, progress);
        }
        return null; // Don't show if not active
    }, [routePath, progress]);

    return (
        <div className="h-full w-full bg-slate-100 relative z-0">
            <MapContainer
                center={[from.lat, from.lng]}
                zoom={10}
                className="h-full w-full outline-none"
                scrollWheelZoom={true}
                touchZoom={true}
                dragging={true}
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />

                {/* Origin */}
                <Marker position={[from.lat, from.lng]} icon={OriginIcon}>
                    <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                        <span className="font-bold text-xs">Puttur</span>
                    </Tooltip>
                </Marker>

                {/* Intermediate Stops */}
                {stopCoordinates.map((stop, i) => (
                    <Marker key={i} position={[stop.coords.lat, stop.coords.lng]} icon={StopIcon}>
                        <Tooltip direction="top" offset={[0, -10]} opacity={0.9}>
                            <span className="font-bold text-xs text-slate-600">{stop.name}</span>
                        </Tooltip>
                    </Marker>
                ))}

                {/* Destination */}
                <Marker position={[to.lat, to.lng]} icon={DestIcon}>
                    <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
                        <span className="font-bold text-xs">{destinationName}</span>
                    </Tooltip>
                </Marker>

                {/* Moving Bus Marker */}
                {busPosition && (
                    <Marker position={busPosition} icon={BusMarkerIcon} zIndexOffset={1000}>
                        <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent className="bg-slate-900 border-0 px-2 py-1 radius-md">
                            <span className="font-bold text-xs text-secondary-foreground">Live</span>
                        </Tooltip>
                    </Marker>
                )}

                <Polyline positions={routePath} pathOptions={pathOptions} />

                <MapController from={from} to={to} stops={stopCoordinates.map(s => s.coords)} geometry={geometry} />
            </MapContainer>
        </div>
    );
}

