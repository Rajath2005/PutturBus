"use client";

import { track } from '@/lib/analytics';
import Link from 'next/link';
import { ArrowLeft, Clock, MapPin, Bus as BusIcon, ArrowRight, AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BusList } from '@/components/BusList';
import { RouteMapWrapper } from '@/components/RouteMapWrapper';
import { RouteTimeline } from '@/components/RouteTimeline';
import { Bus } from '@/types/bus';
import busData from '@/data/bus-routes.json';
import { getCoordinates, calculateDistance } from '@/lib/geo';
import { getStopsForRoute } from '@/data/stops';
// PHASE 1 & 2 IMPORTS
import { getCurrentMinutes, minutesFromTime, timeFromMinutes, format12h } from '@/lib/time-engine';
import { getRoutePhysics } from '@/data/route-physics';
import { findDestination } from '@/lib/route-matcher';
import { calculateFrequency } from '@/lib/time-utils';
import { getRoadRoute } from '@/lib/osrm';
import { getRouteLocation } from '@/data/locations';

interface RoutePageClientProps {
    slug: string;
}

export function RoutePageClient({ slug }: RoutePageClientProps) {
    const [nowMinutes, setNowMinutes] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [realStats, setRealStats] = useState<{ distance: number; duration: number } | null>(null);

    // PHASE 9: Auto Live Refresh (Every 60s)
    const destinationName = findDestination(slug) || "";

    useEffect(() => {
        setNowMinutes(getCurrentMinutes());
        setIsLoaded(true);
        track("route_view", { route: slug, destination: destinationName });

        const interval = setInterval(() => {
            setNowMinutes(getCurrentMinutes());
        }, 60000);

        return () => clearInterval(interval);
    }, [slug, destinationName]);

    // OSRM Stats Fetching
    useEffect(() => {
        async function fetchStats() {
            if (!destinationName) return;
            const startLoc = getRouteLocation("puttur");
            const endLoc = getRouteLocation(destinationName);

            if (startLoc && endLoc) {
                const route = await getRoadRoute(startLoc, endLoc);
                if (route) {
                    setRealStats({ distance: route.distanceKm, duration: route.durationMin });
                }
            }
        }
        fetchStats();
    }, [destinationName]);

    // Filter Buses for this route
    const routeBuses = destinationName
        ? busData.filter(b => b.to === destinationName) as Bus[]
        : [];

    // PHASE 4: Live Filtering
    // Morning buses NEVER appear in evening
    const upcomingBuses = routeBuses
        .map(bus => ({
            ...bus,
            depMin: minutesFromTime(bus.time)
        }))
        // Filter: Show future buses OR buses that left recently (within last 5 mins)
        .filter(bus => bus.depMin >= nowMinutes - 5)
        .sort((a, b) => a.depMin - b.depMin);

    // PHASE 5: Next Bus Logic
    const nextBus = upcomingBuses[0];

    // Physics Data (Fallback)
    const physics = getRoutePhysics(destinationName || "");

    // Use Real Stats if available, otherwise physics
    const distanceKm = realStats ? realStats.distance : physics.distanceKm;
    const travelTime = realStats ? realStats.duration : physics.durationMin;

    // Derived Times
    const nextDepartureMins = nextBus ? nextBus.depMin : 0;
    const departureDelta = nextBus ? (nextDepartureMins - nowMinutes) : 0;

    // PHASE 3: Arrival Time
    // arrivalTime = departureTime + route.durationMin
    const arrivalTime = nextBus
        ? timeFromMinutes(nextBus.depMin + travelTime)
        : "--:--";

    // Map Data
    const fromCoords = getCoordinates('puttur') || { lat: 12.7686, lng: 75.2034 };
    const toCoords = getCoordinates(destinationName) || { lat: 12.9141, lng: 74.8560 };
    const routeStops = getStopsForRoute(destinationName).map(s => s.name);
    const intermediateStops = routeStops.filter(s => s.toLowerCase() !== 'puttur' && s.toLowerCase() !== destinationName.toLowerCase());

    // Stats
    const allSorted = [...routeBuses].sort((a, b) => minutesFromTime(a.time) - minutesFromTime(b.time));
    const lastBusTime = allSorted[allSorted.length - 1]?.time;

    // PHASE 6: Simulated Movement
    // Calculate progress (0 to 1)
    let busProgress = 0;

    if (nextBus) {
        // If Departure is in future: Progress = 0
        // If Departure is in past: Progress = (Now - Dep) / Duration
        if (nowMinutes >= nextBus.depMin) {
            const elapsed = nowMinutes - nextBus.depMin;
            // Physics duration is in minutes
            const percent = elapsed / travelTime;
            busProgress = Math.min(Math.max(percent, 0), 1); // Clamp 0-1
        }
    }

    // Loading State
    if (!isLoaded) return <div className="min-h-screen bg-slate-50" />;

    // 404 State
    if (!destinationName || routeBuses.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                    <AlertCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Route Not Found</h2>
                    <Link href="/" className="px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-medium">Go Home</Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col">
            {/* Sticky Header */}
            <motion.header
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3"
            >
                <div className="max-w-2xl mx-auto flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Route Details</div>
                        <h1 className="text-lg font-bold text-slate-900 leading-none flex items-center gap-2">
                            Puttur <ArrowRight className="w-3 h-3 text-slate-300" /> {destinationName}
                        </h1>
                    </div>
                    {/* Live Indicator */}
                    <div className="ml-auto flex items-center gap-1.5 px-2 py-1 bg-rose-50 border border-rose-100 rounded-full">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                        </span>
                        <span className="text-[10px] font-bold text-rose-700">LIVE</span>
                    </div>
                </div>
            </motion.header>

            {/* Map Area */}
            <div className="relative w-full h-[45vh] md:h-[60vh] bg-slate-200 shrink-0">
                <RouteMapWrapper
                    from={fromCoords}
                    to={toCoords}
                    destinationName={destinationName}
                    viaStops={intermediateStops}
                    progress={busProgress}
                />
            </div>

            {/* Docked Summary Card */}
            <div className="flex-1 bg-slate-50 -mt-4 relative z-10 rounded-t-3xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] border-t border-slate-200">
                <div className="max-w-2xl mx-auto">
                    {/* Drag Handle */}
                    <div className="w-full h-6 flex justify-center items-center">
                        <div className="w-12 h-1.5 bg-slate-300 rounded-full opacity-50" />
                    </div>

                    {/* Stats Grid */}
                    <div className="bg-white mx-4 mt-2 rounded-2xl shadow-sm border border-slate-100 p-4 grid grid-cols-3 divide-x divide-slate-100">
                        {/* Column 1: NEXT BUS */}
                        <div className="px-2 flex flex-col items-center text-center">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Next Bus</div>
                            <div className={`text-xl font-bold tracking-tight mb-1 ${nextBus ? 'text-slate-900' : 'text-slate-400'}`}>
                                {nextBus ? format12h(nextBus.time) : "Done"}
                            </div>
                            {nextBus ? (
                                (() => {
                                    if (departureDelta <= 0) return <span className="text-[10px] font-bold text-rose-600 animate-pulse">Departing</span>;
                                    if (departureDelta < 15) return <span className="text-[10px] font-bold text-emerald-600">In {departureDelta} min</span>;
                                    return <span className="text-[10px] font-medium text-slate-500">in {departureDelta} min</span>;
                                })()
                            ) : <span className="text-[10px] font-medium text-slate-400">Back tomorrow</span>}
                        </div>

                        {/* Column 2: ARRIVAL TIME */}
                        <div className="px-2 flex flex-col items-center text-center">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Reaches At</div>
                            {" "}
                            <div className="text-xl font-bold text-slate-900 tracking-tight mb-1">
                                {nextBus ? arrivalTime : "--:--"}
                            </div>
                            <div className="text-[10px] font-medium text-slate-500">
                                {realStats
                                    ? `~${Math.floor(travelTime / 60)}h ${Math.floor(travelTime % 60)}m`
                                    : `~${Math.floor(travelTime / 60)}h ${travelTime % 60}m risk`}
                            </div>
                        </div>

                        {/* Column 3: LAST BUS */}
                        <div className="px-2 flex flex-col items-center text-center">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 text-orange-600/80">Distance</div>
                            <div className="text-xl font-bold text-slate-900 tracking-tight mb-1">
                                ~{Math.round(distanceKm)} km
                            </div>
                            <div className="text-[10px] font-medium text-slate-400">
                                {realStats ? "Real Road" : "Estimated"}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-2 py-4">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
                            Updated {format12h(timeFromMinutes(nowMinutes))}
                        </span>
                    </div>

                    <div className="px-4 pb-20">
                        <div className="flex items-center justify-between mb-4 mt-2">
                            <h2 className="font-bold text-slate-700 text-lg flex items-center gap-2">
                                Upcoming Buses <span className="text-slate-400 text-sm font-normal">({upcomingBuses.length})</span>
                            </h2>
                        </div>

                        {upcomingBuses.length > 0 ? (
                            <div className="space-y-3 mb-8">
                                {/* We map upcomingBuses back to Bus type or handle correctly in BusList */}
                                {/* Assuming BusList accepts Bus[], and our filtered object has extra depMin but compatible */}
                                <BusList buses={upcomingBuses} />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                    <Clock className="w-8 h-8 text-slate-300" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-700 mb-1">No more buses today</h3>
                                <p className="text-slate-500 text-sm max-w-xs mx-auto">
                                    Services resume tomorrow morning.
                                </p>
                            </div>
                        )}

                        {/* Phase 7: Timeline Intelligence */}
                        <div className="pt-8 border-t border-slate-200 mt-8">
                            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-blue-500" />
                                Live Route Progress
                            </h3>
                            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                                <RouteTimeline via={routeBuses[0]?.via || ''} destination={destinationName} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

