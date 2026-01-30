import { Coordinates, calculateDistance } from './geo';
import { RouteStop } from '@/data/stops';

// Average speeds in km/h for KSRTC bus types (conservative estimates including stops)
const SPEEDS = {
    'Oridinary': 35, // Typos in source data handled? 'Ordinary'
    'Ordinary': 35,
    'Limited stop': 42,
    'Express': 45,
    'Rajahamsa': 45,
    'Non stop': 50,
    'Sleeper': 50,
    'Airavat': 55
};

export const DEFAULT_SPEED = 35;

/**
 * Calculate estimated travel time in minutes based on distance and bus type.
 */
export function getTravelTime(distanceKm: number, busType: string): number {
    const speed = SPEEDS[busType as keyof typeof SPEEDS] || DEFAULT_SPEED;
    // Time = Distance / Speed * 60 minutes
    // Add 10% buffer for traffic/delays
    const timeHours = distanceKm / speed;
    return Math.ceil(timeHours * 60 * 1.1);
}

/**
 * Get physics-based Arrival Time
 */
export function getArrivalTime(departureTime24: string, travelTimeMinutes: number): string {
    const [h, m] = departureTime24.split(':').map(Number);
    const departureMins = h * 60 + m;
    const arrivalMins = departureMins + travelTimeMinutes;

    const arrivalH = Math.floor(arrivalMins / 60) % 24;
    const arrivalM = arrivalMins % 60;

    return `${arrivalH.toString().padStart(2, '0')}:${arrivalM.toString().padStart(2, '0')}`;
}

/**
 * Calculate precise "Leaves in X min"
 */
export function getDepartureDelta(departureTime24: string): number {
    const now = new Date();
    const currentMins = now.getHours() * 60 + now.getMinutes();
    const [h, m] = departureTime24.split(':').map(Number);
    const depMins = h * 60 + m; // Assumes same day logic for simplicity, or we check if < currentMins then it's tomorrow

    let diff = depMins - currentMins;

    // Handle overnight edge case? 
    // For this app, simply: if diff < -60 (gone long ago), maybe it's next day? 
    // But usually we filter list.
    // Let's stick to simple diff for "Next Bus" logic which usually picks future buses.

    return diff;
}
