"use client";

import { useState, useMemo } from 'react';
import { HeroSearch } from '@/components/HeroSearch';
import { BusList } from '@/components/BusList';
import { FilterBar } from '@/components/FilterBar';
import { Disclaimer } from '@/components/Disclaimer';
import { QuickLinks } from '@/components/QuickLinks';
import { HowItWorks } from '@/components/HowItWorks';
import { TrustIndicators } from '@/components/TrustIndicators';

// Route Engine
import { getRoutes, RouteType } from '@/lib/route-engine-switcher';
// Intercity Components
import { IntercityBusCard } from '@/components/IntercityBusCard';
import { IntercityBus } from '@/types/intercity';
import { Bus } from '@/types/bus';
// Data for suggestions
import localRoutes from '@/data/bus-routes.json';
import intercityRoutes from '@/data/intercity-buses.json';
import { getAllDestinations } from '@/lib/route-matcher';

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
    const { findDestination } = require('@/lib/route-matcher'); // Lazy import or move to top
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

  return (
    <main className="min-h-screen bg-background">
      <HeroSearch
        onSearch={setSearchTerm}
        suggestions={ALL_DESTINATIONS}
      />

      <div className="-mt-16 relative z-30 max-w-3xl mx-auto px-4 pb-20">
        <div className="bg-card rounded-3xl shadow-xl border border-border/50 min-h-[60vh] overflow-hidden">
          <div className="bg-slate-50/50 border-b border-slate-100 sticky top-0 z-10">
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
                  Official Schedules
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
              <div className="text-sm text-muted-foreground px-4 mb-2 font-medium flex justify-between items-center py-2">
                <span>
                  {searchResult.type === 'local' ? filteredLocalBuses.length : filteredIntercityBuses.length} buses found
                </span>
                {searchTerm && <span className="text-primary truncate ml-2">to &quot;{searchTerm}&quot;</span>}
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

      {!isSearching && <TrustIndicators />}

      <div className="py-8 bg-background">
        <Disclaimer />
        <footer className="text-center text-muted-foreground text-sm pb-8">
          <p className="font-bold text-lg mb-1 text-primary">PutturBus</p>
          <p>© {new Date().getFullYear()} Unofficial Student Project.</p>
          <p className="mt-1 font-medium">Powered by Sitexar</p>
        </footer>
      </div>
    </main>
  );
}
