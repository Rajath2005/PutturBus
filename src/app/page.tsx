"use client";

import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import busData from '@/data/bus-routes.json';
import { Bus } from '@/types/bus';
import { HeroSearch } from '@/components/HeroSearch';
import { BusList } from '@/components/BusList';
import { FilterBar } from '@/components/FilterBar';
import { Disclaimer } from '@/components/Disclaimer';
import { QuickLinks } from '@/components/QuickLinks';
import { HowItWorks } from '@/components/HowItWorks';
import { TrustIndicators } from '@/components/TrustIndicators';

// Extract unique destinations for auto-suggest
const DESTINATIONS = Array.from(new Set(busData.map(b => b.to))).sort();

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTime, setSelectedTime] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const fuse = useMemo(() => new Fuse(busData as Bus[], {
    keys: ['to', 'via'],
    threshold: 0.3,
    distance: 100,
  }), []);

  const filteredBuses = useMemo(() => {
    let results = busData as Bus[];

    if (searchTerm.trim()) {
      results = fuse.search(searchTerm).map(result => result.item);
    }

    if (selectedTime !== 'all') {
      const now = new Date();
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
      results = results.filter(bus =>
        bus.type.toLowerCase().includes(selectedType.toLowerCase())
      );
    }

    return results;
  }, [searchTerm, selectedTime, selectedType, fuse]);

  const isSearching = searchTerm.trim().length > 0 || selectedTime !== 'all' || selectedType !== 'all';

  return (
    <main className="min-h-screen bg-background">
      <HeroSearch
        onSearch={setSearchTerm}
        suggestions={DESTINATIONS}
      />

      <div className="-mt-16 relative z-30 max-w-3xl mx-auto px-4 pb-20">
        <div className="bg-card rounded-3xl shadow-xl border border-border/50 min-h-[60vh] overflow-hidden">
          <div className="bg-slate-50/50 border-b border-slate-100 sticky top-0 z-10">
            <div className="pt-2 px-4 pb-2">
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-2" />
            </div>
            <FilterBar
              selectedTime={selectedTime}
              onTimeChange={setSelectedTime}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
            />
          </div>

          {!isSearching ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <QuickLinks />
              <HowItWorks />
            </div>
          ) : (
            <div className="px-2 pt-2 animate-in fade-in zoom-in-95 duration-300">
              <div className="text-sm text-muted-foreground px-4 mb-2 font-medium flex justify-between items-center py-2">
                <span>{filteredBuses.length} buses found</span>
                {searchTerm && <span className="text-primary truncate ml-2">to &quot;{searchTerm}&quot;</span>}
              </div>

              <BusList buses={filteredBuses} />
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
