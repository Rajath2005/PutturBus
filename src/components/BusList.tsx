import { Bus } from '@/types/bus';
import { BusCard } from './BusCard';
import { SearchX } from 'lucide-react';
import { BusCardSkeleton } from './Skeletons';

interface BusListProps {
    buses: Bus[];
    isLoading?: boolean;
}

export function BusList({ buses, isLoading = false }: BusListProps) {
    if (isLoading) {
        return (
            <div className="pb-20 space-y-2">
                <BusCardSkeleton />
                <BusCardSkeleton />
                <BusCardSkeleton />
            </div>
        );
    }

    if (buses.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                    <SearchX className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">No buses found</h3>
                <p className="text-slate-500 max-w-xs mx-auto">
                    We couldn't find any buses matching your criteria. Try changing the time or filter.
                </p>
            </div>
        );
    }

    // Optimize rendering by limiting initial items or just rendering all since 500 is manageable
    // adding a simple unique key based on id
    return (
        <div className="pb-20 space-y-2">
            {buses.map((bus) => (
                <BusCard key={bus.id} bus={bus} />
            ))}
        </div>
    );
}
