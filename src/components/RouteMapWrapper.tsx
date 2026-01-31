"use client";

import dynamic from 'next/dynamic';
import { Coordinates } from '@/lib/geo';
import { useEffect, useState } from 'react';
import { getRoadRoute, RoadRoute } from '@/lib/osrm';
import { getRouteLocation } from '@/data/locations';

// Dynamically import RouteMap with no SSR, valid here since this is a Client Component
const RouteMap = dynamic(() => import('./RouteMap'), {
    ssr: false,
    loading: () => (
        <div className="h-[300px] w-full rounded-2xl bg-muted animate-pulse flex items-center justify-center text-muted-foreground">
            Loading Map...
        </div>
    )
});

interface RouteMapWrapperProps {
    from: Coordinates;
    to: Coordinates;
    destinationName: string;
    viaStops?: string[];
    progress?: number; // 0 to 1
}

export function RouteMapWrapper(props: RouteMapWrapperProps) {
    const [roadGeometry, setRoadGeometry] = useState<[number, number][] | undefined>(undefined);

    useEffect(() => {
        async function fetchRoute() {
            // Get accurate start/end points from our trusted locations file
            const startLoc = getRouteLocation("puttur") || props.from;
            const endLoc = getRouteLocation(props.destinationName) || props.to;

            if (startLoc && endLoc) {
                const route = await getRoadRoute(startLoc, endLoc);
                if (route) {
                    setRoadGeometry(route.geometry);
                }
            }
        }

        fetchRoute();
    }, [props.destinationName, props.from, props.to]);

    return <RouteMap {...props} geometry={roadGeometry} />;
}

