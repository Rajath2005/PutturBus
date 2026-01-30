"use client";

import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, ArrowRight, History, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchTabs } from './SearchTabs';

const POPULAR_DESTINATIONS = ['Mangalore', 'Bengaluru', 'Mysuru', 'Kasaragod', 'Panaji'];

interface HeroSearchProps {
    onSearch: (term: string) => void;
    suggestions: string[];
}

export function HeroSearch({ onSearch, suggestions }: HeroSearchProps) {
    const [activeTab, setActiveTab] = useState<'bus' | 'route'>('bus');
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredSuggestions = query
        ? suggestions.filter(s => s.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
        : [];

    const handleSearch = (term: string) => {
        setQuery(term);
        onSearch(term);
        setIsFocused(false);
    };

    return (
        <div className="relative z-20 pb-12">
            <div className="pt-12 pb-16 px-4 text-center">
                {/* Clean Header */}
                <div className="mb-8 space-y-3">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                        Find buses from Puttur
                    </h1>
                    <p className="text-slate-500 text-lg font-normal">
                        Search KSRTC routes, timings, and connections instantly.
                    </p>
                </div>

                {/* Main Search Card */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white p-2 md:p-3 rounded-2xl shadow-xl shadow-slate-200/50 mx-auto max-w-3xl border border-slate-200"
                >
                    <div className="px-2 pt-2 pb-4">
                        <SearchTabs activeTab={activeTab} onTabChange={setActiveTab} />
                    </div>

                    <div className="flex flex-col md:flex-row gap-2 px-2 pb-2">
                        {activeTab === 'bus' ? (
                            <>
                                {/* FROM (Locked) */}
                                <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center relative gap-3 cursor-not-allowed">
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-400 ring-4 ring-slate-200 ml-1"></div>
                                    <div className="text-left">
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">From</div>
                                        <div className="font-semibold text-slate-600">Puttur KSRTC</div>
                                    </div>
                                    <div className="ml-auto">
                                        <div className="bg-slate-200/50 p-1.5 rounded-md">
                                            <div className="w-3 h-3 border-2 border-slate-400 rounded-sm border-t-0 border-r-0 rotate-45 opacity-50"></div> {/* Lock visual */}
                                        </div>
                                    </div>
                                </div>

                                {/* Divider (Mobile) */}
                                <div className="md:hidden h-px bg-slate-100 mx-2"></div>

                                {/* TO Input */}
                                <div className={`
                                    flex-[1.5] bg-white border rounded-xl p-3.5 flex items-center relative transition-all duration-200
                                    ${isFocused ? 'border-blue-500 ring-2 ring-blue-500/10 z-20' : 'border-slate-200 hover:border-slate-300'}
                                `}>
                                    <div className={`w-2.5 h-2.5 rounded-full ring-4 ml-1 mr-3 transition-colors ${isFocused ? 'bg-blue-500 ring-blue-100' : 'bg-slate-300 ring-slate-100'}`}></div>

                                    <div className="text-left w-full relative">
                                        <div className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${isFocused ? 'text-blue-500' : 'text-slate-400'}`}>
                                            To
                                        </div>
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            className="w-full bg-transparent text-slate-900 placeholder:text-slate-300 focus:outline-none font-semibold text-lg leading-tight"
                                            placeholder="Enter destination..."
                                            value={query}
                                            onChange={(e) => {
                                                setQuery(e.target.value);
                                                onSearch(e.target.value);
                                            }}
                                            onFocus={() => setIsFocused(true)}
                                            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                                        />
                                    </div>

                                    {/* Dropdown */}
                                    <AnimatePresence>
                                        {isFocused && filteredSuggestions.length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 5 }}
                                                className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 py-1"
                                            >
                                                {filteredSuggestions.map((item) => (
                                                    <button
                                                        key={item}
                                                        onClick={() => handleSearch(item)}
                                                        className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors"
                                                    >
                                                        <History className="w-4 h-4 text-slate-400" />
                                                        <span className="font-medium text-slate-700">{item}</span>
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Search Button */}
                                <button
                                    onClick={() => { }}
                                    className="bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl px-8 py-4 md:py-0 transition-all flex items-center justify-center gap-2 shadow-md shadow-sky-500/20 active:scale-95 focus:ring-4 focus:ring-sky-500/30 outline-none"
                                >
                                    <Search className="w-5 h-5" />
                                    <span className="md:hidden">Find Buses</span>
                                </button>
                            </>
                        ) : (
                            <div className="w-full relative">
                                <div className={`
                                    w-full bg-white border rounded-xl p-4 flex items-center transition-all duration-200
                                    ${isFocused ? 'border-primary ring-2 ring-primary/10' : 'border-slate-200 hover:border-slate-300'}
                                `}>
                                    <Search className="w-5 h-5 text-slate-400 mr-4" />
                                    <input
                                        type="text"
                                        className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium text-lg"
                                        placeholder="Search for any route..."
                                        value={query}
                                        onChange={(e) => {
                                            setQuery(e.target.value);
                                            onSearch(e.target.value);
                                        }}
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Popular Routes Cards */}
                <div className="mt-10 max-w-4xl mx-auto">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Popular Routes</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {POPULAR_DESTINATIONS.map((dest) => (
                            <motion.button
                                key={dest}
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleSearch(dest)}
                                className="bg-white hover:border-blue-300 border border-slate-200 p-3 px-5 rounded-xl flex items-center gap-2.5 shadow-sm transition-colors group"
                            >
                                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-sm"></div>
                                <span className="text-slate-700 font-medium text-sm group-hover:text-blue-700">{dest}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
