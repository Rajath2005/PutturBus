"use client";

import Link from 'next/link';
import { MapPin, ArrowRight, Clock, Bus as BusIcon } from 'lucide-react';
import { Bus } from '@/types/bus';
import { motion } from 'framer-motion';
import { formatTime } from '@/lib/time-utils';
import { getLiveStatus } from '@/lib/realtime';

interface BusCardProps {
    bus: Bus;
    style?: React.CSSProperties; // For virtual list
}

export function BusCard({ bus, style }: BusCardProps) {
    // Generate internal route slug
    const destSlug = bus.to.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    const routeUrl = `/route/puttur-to-${destSlug}`;
    const typeDetails = getServiceType(bus.type);

    // Live Status Logic
    const status = getLiveStatus(bus.time);

    return (
        <div style={style} className="px-1 py-2 relative">
            <Link href={routeUrl}>
                <motion.div
                    whileTap={{ scale: 0.99 }}
                    className="bg-white hover:border-blue-300 p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col md:flex-row items-start md:items-center gap-4 relative overflow-hidden"
                >
                    {/* Left: Time */}
                    <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-1 md:min-w-[90px] md:border-r border-slate-100 md:pr-4 w-full md:w-auto">
                        <div className="text-center md:text-left">
                            <span className={`text-3xl font-bold tracking-tight block leading-none ${status?.isDeparting ? 'text-red-500' : 'text-slate-900'}`}>
                                {formatTime(bus.time)}
                            </span>
                            {/* Status Indicator */}
                            {status && (
                                <div className={`mt-1.5 text-xs ${status.className}`}>
                                    {status.label}
                                </div>
                            )}
                        </div>

                        {/* Mobile Service Badge (moved here for better mobile layout) */}
                        <div className={`md:hidden ml-auto px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${typeDetails.className}`}>
                            {typeDetails.label}
                        </div>
                    </div>

                    {/* Center: Destination */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center py-1">
                        <h3 className="text-lg md:text-xl font-bold text-slate-900 truncate leading-tight group-hover:text-blue-700 transition-colors">
                            {bus.to}
                        </h3>
                        <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-1.5 font-medium">
                            <span className="text-slate-400">Via:</span>
                            <span className="truncate text-slate-600">{bus.via}</span>
                        </div>
                    </div>

                    {/* Right: Service & Action */}
                    <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto mt-2 md:mt-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-50">
                        <div className={`hidden md:block px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider border ${typeDetails.className}`}>
                            {typeDetails.label}
                        </div>

                        <div className="flex items-center gap-2 text-blue-600 font-bold text-sm bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors w-full md:w-auto justify-center group-hover:bg-blue-600 group-hover:text-white">
                            <span>View Route</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </motion.div>
            </Link>
        </div>
    );
}

function getServiceType(type: string) {
    const t = type.toLowerCase();
    if (t.includes('express')) return { label: 'Express', className: 'bg-orange-50 text-orange-700 border-orange-100' };
    if (t.includes('semidelux')) return { label: 'Semi Deluxe', className: 'bg-indigo-50 text-indigo-700 border-indigo-100' };
    if (t.includes('limited')) return { label: 'Limited', className: 'bg-purple-50 text-purple-700 border-purple-100' };
    if (t.includes('non stop')) return { label: 'Non Stop', className: 'bg-red-50 text-red-700 border-red-100' };
    return { label: 'Ordinary', className: 'bg-slate-50 text-slate-600 border-slate-100' };
}
