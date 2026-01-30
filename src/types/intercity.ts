export type BusOperator = 'KSRTC' | 'VRL' | 'Private' | 'Sugama' | 'Durgamba';
export type ServiceType = 'Express' | 'Airavat' | 'Rajahamsa' | 'Ordinary' | 'Sleeper' | 'Club Class';

export interface IntercityBus {
    id: string;
    from: string;
    to: string;
    via: string[]; // Major via points
    operator: BusOperator;
    serviceType: ServiceType;
    departureTime: string; // "HH:MM" 24h format
    arrivalTime: string;   // "HH:MM" 24h format
    duration: string;      // e.g. "7h 30m"
    distanceKm: number;
    daysRunning: 'Daily' | 'Weekdays' | 'Weekends' | string;
    price?: number;
}
