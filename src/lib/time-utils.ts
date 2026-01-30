export function formatTime(time24: string): string {
    if (!time24) return '';
    const [h, m] = time24.split(':').map(Number);
    const suffix = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${m.toString().padStart(2, '0')} ${suffix}`;
}

export function minutesFromMidnight(time24: string): number {
    if (!time24) return 0;
    const [h, m] = time24.split(':').map(Number);
    return h * 60 + m;
}

export function getCurrentMinutes(): number {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
}

/**
 * Returns strict status for a bus.
 * "Departing Soon" only if bus is in the future AND < 15 mins away.
 */
export function getBusStatus(busTime24: string): { label: string; color: string; bg: string } | null {
    const busMins = minutesFromMidnight(busTime24);
    const nowMins = getCurrentMinutes();

    // Past bus
    if (busMins < nowMins) return null;

    const diff = busMins - nowMins;

    // Strict "Departing Soon": Future + within 15 mins
    if (diff <= 15) {
        return { label: 'Departing Soon', color: 'text-emerald-700', bg: 'bg-emerald-100 animate-pulse' };
    }

    return null; // Normal future bus
}

export function calculateFrequency(times24: string[]): string {
    if (times24.length < 2) return 'Variable';

    // Sort and convert to minutes
    const minutes = times24
        .map(minutesFromMidnight)
        .sort((a, b) => a - b);

    // Calculate gaps
    let totalGap = 0;
    let gaps = 0;

    for (let i = 1; i < minutes.length; i++) {
        const gap = minutes[i] - minutes[i - 1];
        if (gap > 0) { // Should be positive if sorted unique, but safe check
            totalGap += gap;
            gaps++;
        }
    }

    if (gaps === 0) return 'Variable';

    const avg = Math.round(totalGap / gaps);
    return `Every ~${avg} mins`;
}

export function formatDuration(minutes: number): string {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h === 0) return `${m} mins`;
    if (m === 0) return `${h} hr`;
    return `${h}h ${m}m`;
}
