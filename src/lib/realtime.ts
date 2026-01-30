import { getNowMinutes, toMinutes } from './time';

/**
 * Real Time Engine for PutturBus
 * Centralizes all time-based logic, deltas, and live status.
 * Uses strict time.ts normalization.
 */

export function getCurrentMinutes(): number {
    return getNowMinutes();
}

export function convertTimeToMinutes(time24: string): number {
    return toMinutes(time24);
}

export interface LiveStatus {
    label: string;
    className: string;
    isDeparting: boolean;
}

/**
 * Get the live status of a bus based on its departure time.
 * @param time24 Bus departure time in "HH:MM" format
 * @returns Status object or null if no special status
 */
export function getLiveStatus(time24: string): LiveStatus | null {
    const busMins = toMinutes(time24);
    const nowMins = getNowMinutes();

    const delta = busMins - nowMins;

    // Logic from Phase 4
    if (delta <= 5 && delta > -10) { // Allow slightly past for "Departing"
        return {
            label: "Departing Now",
            className: "text-red-600 animate-pulse font-bold",
            isDeparting: true
        };
    }

    if (delta > 5 && delta <= 15) {
        return {
            label: "Boarding Soon",
            className: "text-emerald-600 font-bold",
            isDeparting: false
        };
    }

    if (delta > 15 && delta <= 60) {
        return {
            label: `in ${delta} min`,
            className: "text-blue-600 font-semibold",
            isDeparting: false
        };
    }

    return null;
}

/**
 * Helpers for displaying "No buses" message
 */
export function getLastBusTime(allBuses: { time: string }[]): string | null {
    if (allBuses.length === 0) return null;
    // Assumes sorted input or sorts it
    const sorted = [...allBuses].sort((a, b) => toMinutes(a.time) - toMinutes(b.time));
    return sorted[sorted.length - 1].time;
}
