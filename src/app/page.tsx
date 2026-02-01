"use client";

import { useState, useMemo, Suspense, useEffect } from 'react';
import { HeroSearch } from '@/components/HeroSearch';
import { BusList } from '@/components/BusList';
import { FilterBar } from '@/components/FilterBar';
import { Disclaimer } from '@/components/Disclaimer';
import { QuickLinks } from '@/components/QuickLinks';
import { HowItWorks } from '@/components/HowItWorks';
import { TrustIndicators } from '@/components/TrustIndicators';
import { CheckCircle } from 'lucide-react';

// Route Engine
import { getRoutes, RouteType } from '@/lib/route-engine-switcher';
// Intercity Components
import { IntercityBusCard } from '@/components/IntercityBusCard';
import { IntercityBus } from '@/types/intercity';
import { Bus } from '@/types/bus';
// Data for suggestions
import localRoutes from '@/data/bus-routes.json';
import intercityRoutes from '@/data/intercity-buses.json';
import { getAllDestinations, findDestination } from '@/lib/route-matcher';

// Combined Destinations for Auto-Suggest
const ALL_DESTINATIONS = getAllDestinations();

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTime, setSelectedTime] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const searchResult = useMemo(() => {
    if (!searchTerm.trim()) return { type: 'local' as RouteType, data: [] };

    // 1. Get Routes via Engine Switcher
    // Note: Engine expects "To" destination. We assume user types "To". "From" is Puttur.
    // We need to resolve fuzzy match here or let route-engine do it?
    // route-engine expects canonical names.
    // Let's rely on route-matcher's fuzzy capability implicitly via getRoutes if updated? 
    // Or cleaner: use findDestination here.

    // Actually getRoutes takes 'from' and 'to'.
    // const { findDestination } = require('@/lib/route-matcher'); // Removed require
    const canonicalDest = findDestination(searchTerm);

    if (!canonicalDest) {
      // Fallback to fuzzy search on local if NO canonical match found?
      // Or just return empty.
      // For now, let's try fuzzy match on all data?
      return { type: 'local' as RouteType, data: [] };
    }

    const result = getRoutes('Puttur', canonicalDest);
    return result;

  }, [searchTerm]);

  // Local Filtering Legacy Logic (for Local Type)
  const filteredLocalBuses = useMemo(() => {
    if (searchResult.type !== 'local') return [];
    let results = searchResult.data as Bus[];

    if (selectedTime !== 'all') {
      results = results.filter(bus => {
        const [h, m] = bus.time.split(':').map(Number);
        const mins = h * 60 + m;
        if (selectedTime === 'morning') return mins >= 300 && mins < 720;
        if (selectedTime === 'afternoon') return mins >= 720 && mins < 1020;
        if (selectedTime === 'evening') return mins >= 1020;
        return true;
      });
    }
    if (selectedType !== 'all') {
      results = results.filter(bus => bus.type.toLowerCase().includes(selectedType.toLowerCase()));
    }
    return results;

  }, [searchResult, selectedTime, selectedType]);

  // Intercity Filtering Logic
  // We can reuse FilterBar but 'Time' might interpret differently.
  // Simplifying: Intercity usually shows ALL for the day.
  const filteredIntercityBuses = useMemo(() => {
    if (searchResult.type !== 'intercity') return [];
    return searchResult.data as IntercityBus[];
  }, [searchResult]);

  const isSearching = searchTerm.trim().length > 0;
  const hasResults = (searchResult.type === 'local' && filteredLocalBuses.length > 0) ||
    (searchResult.type === 'intercity' && filteredIntercityBuses.length > 0);

  // Auto-scroll logic
  useEffect(() => {
    if (hasResults) {
      setTimeout(() => {
        const resultsEl = document.getElementById('search-results');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [hasResults, searchTerm]); // Trigger on results or new search

  return (
    <main className="min-h-screen bg-background">
      <Suspense fallback={<div className="h-[400px] bg-slate-50 animate-pulse" />}>
        <HeroSearch
          onSearch={setSearchTerm}
          suggestions={ALL_DESTINATIONS}
        />
      </Suspense>

      {/* Community Banner (Home Page Only) */}
      <div className="bg-blue-50/80 border-b border-blue-100 px-4 py-2 text-center text-xs text-blue-800">
        <span className="font-bold">Community Project Notice:</span> PutturBus is a free, non-profit student initiative. For official bookings visit <a href="https://ksrtc.in" target="_blank" className="underline hover:text-blue-900">ksrtc.in</a>.
      </div>

      <div className="-mt-16 relative z-30 max-w-3xl mx-auto px-4 pb-20">
        <div id="search-results" className={`transition-all duration-500 scroll-mt-[calc(var(--header-height)+20px)] ${isSearching ? 'animate-result-reveal' : ''}`}>
          <div className="bg-card rounded-3xl shadow-xl border border-border/50 min-h-[60vh] overflow-hidden">
            <div className="bg-slate-50/50 border-b border-slate-100 sticky top-[calc(var(--header-height)+env(safe-area-inset-top)-1px)] z-30 backdrop-blur-md">
              <div className="pt-2 px-4 pb-2">
                <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-2" />
              </div>

              {/* Only show filters for Local? Or adaptable? */}
              {searchResult.type === 'local' && (
                <FilterBar
                  selectedTime={selectedTime}
                  onTimeChange={setSelectedTime}
                  selectedType={selectedType}
                  onTypeChange={setSelectedType}
                />
              )}

              {searchResult.type === 'intercity' && (
                <div className="px-4 py-3 flex items-center justify-between bg-blue-50/50 border-b border-blue-100">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    Intercity Engine Active
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    KSRTC Schedules
                  </span>
                </div>
              )}
            </div>

            {!isSearching ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <QuickLinks />
                <HowItWorks />
              </div>
            ) : (
              <div className="px-2 pt-2 animate-in fade-in zoom-in-95 duration-300">
                {/* Results Found Banner */}
                <div className="mx-4 mb-4 bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-center gap-3 animate-in slide-in-from-top-2 duration-500">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="text-sm font-medium text-emerald-900">
                    {searchResult.type === 'local' ? filteredLocalBuses.length : filteredIntercityBuses.length} buses found to <span className="font-bold">{searchTerm}</span>
                  </div>
                </div>

                {searchResult.type === 'local' ? (
                  <BusList buses={filteredLocalBuses} />
                ) : (
                  <div className="space-y-3 px-2">
                    {filteredIntercityBuses.map(bus => (
                      <IntercityBusCard key={bus.id} bus={bus} />
                    ))}
                    {filteredIntercityBuses.length === 0 && (
                      <div className="text-center py-10 text-slate-400">
                        No intercity buses found.
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {!isSearching && <TrustIndicators />}

      <div className="py-8 bg-background">
        <Disclaimer />
      </div>
    </main >
  );
}
