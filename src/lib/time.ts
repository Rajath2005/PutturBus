/**
 * Time Normalization Library
 * STRICT SOURCE OF TRUTH: User's Local System Time (new Date())
 */

/**
 * Get current time in minutes from midnight (0 - 1439)
 * Uses local system time.
 */
export function getNowMinutes(): number {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
}

/**
 * Convert time string to minutes from midnight.
 * Supports:
 * - "14:30" (24h) -> 870
 * - "2:30 PM" (12h) -> 870
 * - "6:15" (Assumes 24h, so 6:15 AM) -> 375
 */
export function toMinutes(timeString: string): number {
    if (!timeString) return 0;

    // Normalize string
    const s = timeString.trim().toLowerCase();

    let hours = 0;
    let minutes = 0;

    // Check for AM/PM
    const isPM = s.includes('pm');
    const isAM = s.includes('am');

    // Remove clean text
    const cleanTime = s.replace('pm', '').replace('am', '').trim();
    const parts = cleanTime.split(':');

    if (parts.length >= 2) {
        hours = parseInt(parts[0], 10);
        minutes = parseInt(parts[1], 10);
    }

    // Adjust for 12h format if modifiers present
    if (isPM && hours < 12) hours += 12;
    if (isAM && hours === 12) hours = 0;

    // Handle 24h edge cases if no modifier (e.g. data might be mixed)
    // For now assuming existing data in bus-routes.json is 24h or consistent
    // If we see "5:00" it is 5:00 AM. "17:00" is 5:00 PM.

    return hours * 60 + minutes;
}

/**
 * Format minutes back to readable time
 */
export function formatMinutesToTime(minutes: number): string {
    if (minutes < 0) minutes = minutes + 1440; // Handle negatives roughly
    const h = Math.floor(minutes / 60) % 24;
    const m = minutes % 60;
    const suffix = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${m.toString().padStart(2, '0')} ${suffix}`;
}
