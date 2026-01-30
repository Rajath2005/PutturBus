import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getGoogleMapsUrl(destination: string): string {
    const origin = "Puttur KSRTC Bus Stand";
    let finalDestination = destination;

    // Handle specific mappings
    const destLower = destination.toLowerCase().replace(/\s+/g, ''); // Remove spaces to match 'statebank' vs 'state bank'
    if (destLower.includes('statebank') || destLower.includes('mangalore') || destLower.includes('mangaluru')) {
        finalDestination = "12.8630076,74.7609671"; // Precise coordinates for State Bank Bus Stand
    }

    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(finalDestination)}&travelmode=transit&transit_mode=bus`;
}
