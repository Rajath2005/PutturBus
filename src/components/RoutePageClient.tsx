"use client";

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
import { getTravelTime, getDepartureDelta } from '@/lib/route-engine';
import { getNowMinutes, toMinutes, formatMinutesToTime } from '@/lib/time';
import { findDestination } from '@/lib/route-matcher';
import { calculateFrequency, formatTime } from '@/lib/time-utils';

interface RoutePageClientProps {
    slug: string;
}

export function RoutePageClient({ slug }: RoutePageClientProps) {
    const [nowMinutes, setNowMinutes] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    // 1. Live Time Update (Every Minute)
    useEffect(() => {
        // Initial set
        setNowMinutes(getNowMinutes());
        setIsLoaded(true);

        const interval = setInterval(() => {
            setNowMinutes(getNowMinutes());
        }, 30000); // 30s update

        return () => clearInterval(interval);
    }, []);

    // 2. Resolve Destination
    const destinationName = findDestination(slug);

    // 3. Filter & Sort Buses
    const routeBuses = destinationName
        ? busData.filter(b => b.to === destinationName) as Bus[]
        : [];

    // STRICT FILTERING
    // Only show buses that are equal to or after current time
    // Keeping a 2-minute buffer for "Just Left" vs "Gone"
    const visibleBuses = routeBuses.filter(bus => {
        const busMinutes = toMinutes(bus.time);
        return busMinutes >= (nowMinutes - 2);
    });

    // Sort by soonest
    const sortedBuses = visibleBuses.sort((a, b) =>
        toMinutes(a.time) - toMinutes(b.time)
    );

    // Get Next Bus (First in sorted list)
    const nextBus = sortedBuses[0];

    // Stats (frequency uses all scheduled buses)
    const allSorted = [...routeBuses].sort((a, b) => toMinutes(a.time) - toMinutes(b.time));
    const lastBusTime = allSorted[allSorted.length - 1]?.time;
    const frequencyLabel = calculateFrequency(allSorted.map(b => b.time));

    // Physics 
    const fromCoords = getCoordinates('puttur') || { lat: 12.7686, lng: 75.2034 };
    const toCoords = getCoordinates(destinationName) || { lat: 12.9141, lng: 74.8560 };
    const distanceKm = calculateDistance(fromCoords, toCoords);
    const routeStops = getStopsForRoute(destinationName).map(s => s.name);
    const intermediateStops = routeStops.filter(s => s.toLowerCase() !== 'puttur' && s.toLowerCase() !== destinationName.toLowerCase());

    const travelTime = nextBus ? getTravelTime(distanceKm, nextBus.type) : 60;
    let departureDelta = nextBus ? (toMinutes(nextBus.time) - nowMinutes) : 0;

    // Loading State
    if (!isLoaded) {
        return <div className="min-h-screen bg-slate-50" />;
    }

    // 404 State
    if (!destinationName || routeBuses.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Route Not Found</h2>
                    <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-xl">Go Home</Link>
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
                    <div className="ml-auto flex items-center gap-1.5 px-2 py-1 bg-emerald-50 border border-emerald-100 rounded-full">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700">LIVE</span>
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
                />
            </div>

            {/* Docked Summary Card */}
            <div className="flex-1 bg-slate-50 -mt-4 relative z-10 rounded-t-3xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] border-t border-slate-200">
                <div className="max-w-2xl mx-auto">
                    {/* Drag Handle */}
                    <div className="w-full h-6 flex justify-center items-center">
                        <div className="w-12 h-1.5 bg-slate-300 rounded-full opacity-50" />
                    </div>

                    <div className="bg-white mx-4 mt-2 rounded-2xl shadow-sm border border-slate-100 p-4 grid grid-cols-3 divide-x divide-slate-100">
                        {/* Column 1: NEXT BUS */}
                        <div className="px-2 flex flex-col items-center text-center">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Next Bus</div>
                            <div className={`text-xl font-bold tracking-tight mb-1 ${nextBus ? 'text-slate-900' : 'text-slate-400'}`}>
                                {nextBus ? formatTime(nextBus.time) : "Done"}
                            </div>
                            {nextBus ? (
                                (() => {
                                    if (departureDelta <= 0) return <span className="text-[10px] font-bold text-slate-400">Boarding / Left</span>;
                                    if (departureDelta < 15) return <span className="text-[10px] font-bold text-emerald-600 animate-pulse">In {departureDelta} min</span>;
                                    return <span className="text-[10px] font-medium text-slate-500">Leaves in {departureDelta}m</span>;
                                })()
                            ) : <span className="text-[10px] font-medium text-slate-400">Back tomorrow</span>}
                        </div>

                        {/* Column 2: EST TRAVEL */}
                        <div className="px-2 flex flex-col items-center text-center">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Est. Travel</div>
                            <div className="text-xl font-bold text-slate-900 tracking-tight mb-1">
                                {nextBus ? `${Math.floor(travelTime / 60)}h ${travelTime % 60}m` : "--"}
                            </div>
                            <div className="text-[10px] font-medium text-slate-500">
                                {nextBus ? `~${distanceKm.toFixed(0)} km` : "Distance"}
                            </div>
                        </div>

                        {/* Column 3: LAST BUS */}
                        <div className="px-2 flex flex-col items-center text-center">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 text-orange-600/80">Last Bus</div>
                            <div className="text-xl font-bold text-slate-900 tracking-tight mb-1">{formatTime(lastBusTime || "")}</div>
                            <div className="text-[10px] font-medium text-slate-400">Ends at {formatTime(lastBusTime || "")}</div>
                        </div>
                    </div>

                    {/* Trust Signal */}
                    <div className="flex justify-center items-center gap-2 py-4">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
                            {formatMinutesToTime(nowMinutes)} • Live Updates
                        </span>
                    </div>

                    <div className="px-4 pb-20">
                        <div className="flex items-center justify-between mb-4 mt-2">
                            <h2 className="font-bold text-slate-700 text-lg flex items-center gap-2">
                                Upcoming Buses <span className="text-slate-400 text-sm font-normal">({sortedBuses.length})</span>
                            </h2>
                        </div>

                        {sortedBuses.length > 0 ? (
                            <div className="space-y-3 mb-8">
                                <BusList buses={sortedBuses} />
                            </div>
                        ) : (
                            // Empty State
                            <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                    <Clock className="w-8 h-8 text-slate-300" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-700 mb-1">No more buses today</h3>
                                <p className="text-slate-500 text-sm max-w-xs mx-auto">
                                    The last bus departed at <span className="font-bold text-slate-700">{formatTime(lastBusTime || "")}</span>. Services resume tomorrow morning.
                                </p>
                            </div>
                        )}

                        {/* Timeline Preview */}
                        <div className="pt-8 border-t border-slate-200 mt-8">
                            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-blue-500" />
                                Route Stops
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
