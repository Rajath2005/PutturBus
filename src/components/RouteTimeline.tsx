import { MapPin, Circle, Navigation, Flag } from 'lucide-react';

interface RouteTimelineProps {
    via: string;
    destination: string;
}

export function RouteTimeline({ via, destination }: RouteTimelineProps) {
    // Parse via string to getting stops
    // "BC Road, Mani, Kalladka" -> ["BC Road", "Mani", "Kalladka"]
    const stops = via.split(',').map(s => s.trim()).filter(s => s.length > 0);
    const allStops = ['Puttur', ...stops, destination];

    return (
        <div className="py-2">
            <h3 className="text-lg font-bold text-slate-900 mb-8 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-blue-600" />
                Stops & Route
            </h3>

            <div className="relative pl-2">
                {/* Continuous Line Background */}
                <div className="absolute left-[20px] top-4 bottom-8 w-0.5 bg-gradient-to-b from-blue-500 via-slate-200 to-red-500 opacity-80" />

                <div className="space-y-8">
                    {allStops.map((stop, idx) => {
                        const isStart = idx === 0;
                        const isEnd = idx === allStops.length - 1;

                        return (
                            <div key={idx} className="relative flex items-start group">
                                {/* Timeline Node */}
                                <div className="relative z-10 flex-shrink-0 w-10 flex justify-center">
                                    {isStart ? (
                                        <div className="w-4 h-4 rounded-full bg-blue-600 ring-4 ring-blue-100 shadow-sm" />
                                    ) : isEnd ? (
                                        <div className="w-4 h-4 rounded-full bg-red-600 ring-4 ring-red-100 shadow-sm" />
                                    ) : (
                                        <div className="w-2.5 h-2.5 rounded-full bg-white border-2 border-slate-300 mt-1" />
                                    )}
                                </div>

                                {/* Content */}
                                <div className={`flex-1 pl-4 ${isStart || isEnd ? '-mt-1' : '-mt-0.5'}`}>
                                    <div className={`
                                        font-bold transition-colors
                                        ${isStart ? 'text-blue-900 text-lg' : ''}
                                        ${isEnd ? 'text-red-900 text-lg' : ''}
                                        ${!isStart && !isEnd ? 'text-slate-600 text-sm' : ''}
                                    `}>
                                        {stop}
                                    </div>

                                    {isStart && (
                                        <div className="flex items-center gap-1 mt-1">
                                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                                                ORIGIN
                                            </span>
                                        </div>
                                    )}

                                    {isEnd && (
                                        <div className="flex items-center gap-1 mt-1">
                                            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                                                DESTINATION
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
