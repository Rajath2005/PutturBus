"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import busData from '@/data/bus-routes.json';

const DESTINATIONS = Array.from(new Set(busData.map(b => b.to))).sort();

export default function DirectoryPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDestinations = DESTINATIONS.filter(d =>
        d.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-slate-50 pb-20">
            {/* Header */}
            <header className="bg-primary text-white pt-12 pb-16 px-4 rounded-b-[2.5rem] shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_2px,transparent_2px)] [background-size:24px_24px]"></div>
                <div className="max-w-3xl mx-auto relative z-10 text-center">
                    <Link href="/" className="inline-block mb-6 text-blue-200 hover:text-white transition-colors text-sm font-bold bg-white/10 px-3 py-1 rounded-full">
                        ← Back to Home
                    </Link>
                    <h1 className="text-3xl font-bold mb-2">Bus Directory</h1>
                    <p className="text-blue-100">Browse all connected destinations from Puttur</p>
                </div>
            </header>

            {/* Content using negative margin overlap */}
            <div className="max-w-3xl mx-auto px-4 -mt-8 relative z-20">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-2 mb-8 flex items-center">
                    <Search className="w-5 h-5 text-slate-400 ml-3" />
                    <input
                        type="text"
                        placeholder="Filter destinations..."
                        className="w-full p-3 bg-transparent text-slate-800 placeholder:text-slate-400 focus:outline-none font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {filteredDestinations.map(dest => {
                        const slug = dest.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
                        return (
                            <Link
                                key={dest}
                                href={`/route/puttur-to-${slug}`}
                                className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 group transition-all flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-primary transition-colors">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-slate-700 group-hover:text-primary transition-colors">{dest}</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                            </Link>
                        );
                    })}
                </div>

                {filteredDestinations.length === 0 && (
                    <div className="text-center py-12 text-slate-400">
                        No destinations found matching "{searchTerm}"
                    </div>
                )}
            </div>
        </main>
    );
}
