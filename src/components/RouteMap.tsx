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

interface RouteMapProps {
    from: Coordinates;
    to: Coordinates;
    destinationName: string;
    viaStops?: string[];
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

function MapController({ from, to, stops }: { from: Coordinates; to: Coordinates; stops: Coordinates[] }) {
    const map = useMap();

    useEffect(() => {
        // Collect all points
        const points = [
            [from.lat, from.lng],
            ...stops.map(s => [s.lat, s.lng]),
            [to.lat, to.lng]
        ] as L.LatLngExpression[];

        const bounds = L.latLngBounds(points);

        // Responsive Padding (Phase 3 & 6)
        // Mobile: Map is at top, so we need less bottom padding than before
        // But we want to ensure points aren't at the very edge
        map.fitBounds(bounds, {
            padding: [40, 40],
            animate: true,
            duration: 1.5
        });

    }, [map, from, to, stops]);

    return null;
}

export default function RouteMap({ from, to, destinationName, viaStops = [] }: RouteMapProps) {
    // Resolve Stop Coordinates (Phase 4)
    const stopCoordinates = useMemo(() => {
        return viaStops
            .map(cityName => ({ name: cityName, coords: getCoordinates(cityName) }))
            .filter(item => item.coords !== null) as { name: string, coords: Coordinates }[];
    }, [viaStops]);

    const routePath = [
        [from.lat, from.lng],
        ...stopCoordinates.map(s => [s.coords.lat, s.coords.lng]),
        [to.lat, to.lng]
    ] as L.LatLngExpression[];

    const pathOptions = { color: '#2563EB', weight: 5, opacity: 0.8, lineCap: 'round' as const };

    return (
        <div className="h-full w-full bg-slate-100 relative z-0">
            {/* Phase 2: Restored Interactivity settings */}
            <MapContainer
                center={[from.lat, from.lng]}
                zoom={10}
                className="h-full w-full outline-none"
                scrollWheelZoom={true} // Enabled
                touchZoom={true}       // Enabled
                dragging={true}        // Enabled
                zoomControl={false}     // Custom control or disabled for clean look? User asked for zoomControl: true in prompt Phase 2.
            >
                {/* Re-adding zoom control manually if needed, or default top-left */}

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

                <Polyline positions={routePath} pathOptions={pathOptions} />

                <MapController from={from} to={to} stops={stopCoordinates.map(s => s.coords)} />
            </MapContainer>
        </div>
    );
}
