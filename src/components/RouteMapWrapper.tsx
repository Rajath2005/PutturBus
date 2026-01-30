"use client";

import dynamic from 'next/dynamic';
import { Coordinates } from '@/lib/geo';

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
    return <RouteMap {...props} />;
}
