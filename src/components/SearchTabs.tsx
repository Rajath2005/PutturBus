"use client";

import { MapPin, Route } from 'lucide-react';

interface SearchTabsProps {
    activeTab: 'bus' | 'route';
    onTabChange: (tab: 'bus' | 'route') => void;
}

export function SearchTabs({ activeTab, onTabChange }: SearchTabsProps) {
    return (
        <div className="flex bg-slate-100 p-1 rounded-xl mb-4 w-fit mx-auto">
            <button
                onClick={() => onTabChange('bus')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === 'bus'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                    }`}
            >
                <MapPin className="w-4 h-4" />
                <span>Find Bus</span>
            </button>
            <button
                onClick={() => onTabChange('route')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === 'route'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                    }`}
            >
                <Route className="w-4 h-4" />
                <span>Search Route</span>
            </button>
        </div>
    );
}
