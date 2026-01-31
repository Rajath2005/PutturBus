"use client";

import { track } from '@/lib/analytics';
import Link from 'next/link';
import { ArrowLeft, Clock, MapPin, ArrowRight, Filter, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { IntercityBusCard } from '@/components/IntercityBusCard';
import { RouteMapWrapper } from '@/components/RouteMapWrapper';
import { getUpcomingIntercityBuses, getAllIntercityBusesSorted } from '@/lib/intercity-engine';
import { getCoordinates } from '@/lib/geo';
import { findDestination } from '@/lib/route-matcher';

interface Props {
    slug: string;
}

export function IntercityRoutePageClient({ slug }: Props) {
    const destinationName = findDestination(slug) || "";
    const allBuses = getAllIntercityBusesSorted(destinationName);

    useEffect(() => {
        track("route_view", { route: slug, destination: destinationName, type: 'intercity' });
    }, [slug, destinationName]);

    // Derived Data
    const upcomingBuses = getUpcomingIntercityBuses(destinationName);
    const shortestDuration = allBuses.length > 0
        ? allBuses.reduce((prev, curr) => prev.distanceKm < curr.distanceKm ? prev : curr).duration // heuristic
        : "--";

    const operators = Array.from(new Set(allBuses.map(b => b.operator)));

    const [filterOperator, setFilterOperator] = useState<string | null>(null);

    // Filtering
    const filteredBuses = allBuses.filter(bus => {
        if (filterOperator && bus.operator !== filterOperator) return false;
        return true;
    });

    const fromCoords = getCoordinates('puttur') || { lat: 12.7686, lng: 75.2034 };
    const toCoords = getCoordinates(destinationName) || { lat: 12.9141, lng: 74.8560 };

    if (!destinationName || allBuses.length === 0) {
        // Fallback 404
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                    <AlertCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Route Not Found</h2>
                    <p className="text-slate-500 mb-6">We don't have intercity data for this route yet.</p>
                    <Link href="/" className="px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-medium">Go Home</Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Intercity Engine</div>
                        <h1 className="text-lg font-bold text-slate-900 leading-none flex items-center gap-2">
                            Puttur <ArrowRight className="w-3 h-3 text-slate-300" /> {destinationName}
                        </h1>
                    </div>
                </div>
            </header>

            {/* Map Area (Static Planning Map) */}
            <div className="w-full h-48 bg-slate-200 relative shrink-0">
                <RouteMapWrapper
                    from={fromCoords}
                    to={toCoords}
                    destinationName={destinationName}
                    viaStops={allBuses[0]?.via || []}
                    progress={undefined} // Static Mode implicit
                />
                <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-medium text-slate-500 shadow-sm border border-slate-200">
                    Planning Map
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 bg-slate-50 max-w-3xl mx-auto w-full pb-20">

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 p-4">
                    <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-center">
                        <div className="text-[10px] text-slate-400 font-bold uppercase">Distance</div>
                        <div className="text-lg font-bold text-slate-900">{allBuses[0]?.distanceKm || 0} km</div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-center">
                        <div className="text-[10px] text-slate-400 font-bold uppercase">Duration</div>
                        <div className="text-lg font-bold text-slate-900">{shortestDuration}</div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-center">
                        <div className="text-[10px] text-slate-400 font-bold uppercase">Buses</div>
                        <div className="text-lg font-bold text-slate-900">{allBuses.length}</div>
                    </div>
                </div>

                {/* Trust Badge */}
                <div className="mx-4 mb-6 px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <Filter className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-blue-900">Route Schedules</h3>
                        <p className="text-xs text-blue-700">KSRTC & Authorized Private Operators</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="px-4 mb-4">
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                        <button
                            onClick={() => setFilterOperator(null)}
                            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${!filterOperator ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
                        >
                            All Operators
                        </button>
                        {operators.map(op => (
                            <button
                                key={op}
                                onClick={() => setFilterOperator(op)}
                                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${filterOperator === op ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
                            >
                                {op}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bus List */}
                <div className="px-4 space-y-3">
                    <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Available Buses</h2>
                    {filteredBuses.map(bus => (
                        <IntercityBusCard key={bus.id} bus={bus} />
                    ))}

                    {filteredBuses.length === 0 && (
                        <div className="text-center py-10 text-slate-400 text-sm">
                            No buses found for this filter.
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
