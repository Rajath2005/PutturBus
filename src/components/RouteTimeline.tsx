import { MapPin, Circle } from 'lucide-react';

interface RouteTimelineProps {
    via: string;
    destination: string;
}

export function RouteTimeline({ via, destination }: RouteTimelineProps) {
    // Parse via string to getting stops
    // "BC Road, Mani, Kalladka" -> ["BC Road", "Mani", "Kalladka"]
    const stops = via.split(',').map(s => s.trim()).filter(s => s.length > 0);
    const allStops = ['Puttur (Start)', ...stops, destination + ' (End)'];

    return (
        <div className="py-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Stops & Route
            </h3>
            <div className="relative pl-4 border-l-2 border-dashed border-gray-200 ml-3 space-y-6">
                {allStops.map((stop, idx) => (
                    <div key={idx} className="relative flex items-start group">
                        <div className={`
                            absolute -left-[21px] mt-1 w-3 h-3 rounded-full border-2 bg-white
                            ${idx === 0 || idx === allStops.length - 1 ? 'border-primary w-4 h-4 -left-[23px] bg-primary ring-4 ring-blue-50' : 'border-gray-300'}
                        `} />
                        <div className="ml-4">
                            <div className={`font-semibold ${idx === 0 || idx === allStops.length - 1 ? 'text-gray-900 text-base' : 'text-gray-600 text-sm'}`}>
                                {stop}
                            </div>
                            {idx === 0 && <div className="text-xs text-primary font-medium">Origin</div>}
                            {idx === allStops.length - 1 && <div className="text-xs text-primary font-medium">Destination</div>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
