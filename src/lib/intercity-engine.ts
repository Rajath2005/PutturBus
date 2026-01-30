import intercityData from '@/data/intercity-buses.json';
import { IntercityBus } from '@/types/intercity';
import { minutesFromTime, getCurrentMinutes } from '@/lib/time-engine';

// Helper to filter buses
export function getIntercityBuses(destination: string): IntercityBus[] {
    // Normalize destination logic if needed, but data has "Bengaluru", "Mysuru"
    return intercityData.filter(b =>
        b.to.toLowerCase() === destination.toLowerCase() &&
        b.from.toLowerCase() === 'puttur'
    ) as IntercityBus[];
}

export function getUpcomingIntercityBuses(destination: string): IntercityBus[] {
    const buses = getIntercityBuses(destination);
    const nowMin = getCurrentMinutes();

    return buses.filter(bus => {
        const depMin = minutesFromTime(bus.departureTime); // Bus times are 24h e.g. "21:30"
        // Show if departure > now (roughly). 
        // Logic: Intercity buses are "Scheduled". We usually show all of today's remaining.
        return depMin >= nowMin;
    }).sort((a, b) => minutesFromTime(a.departureTime) - minutesFromTime(b.departureTime));
}

export function getAllIntercityBusesSorted(destination: string): IntercityBus[] {
    const buses = getIntercityBuses(destination);
    return buses.sort((a, b) => minutesFromTime(a.departureTime) - minutesFromTime(b.departureTime));
}
