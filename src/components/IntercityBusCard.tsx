import { IntercityBus } from '@/types/intercity';
import { Bus, Clock, MapPin, Armchair, Zap, Crown, Moon, Ticket } from 'lucide-react';
import { formatTime } from '@/lib/time-utils';

interface IntercityBusCardProps {
    bus: IntercityBus;
}

const SERVICE_STYLES: Record<string, { color: string; bg: string; border: string; icon: any; label: string }> = {
    'Express': {
        color: 'text-red-700',
        bg: 'bg-red-50',
        border: 'border-l-red-500',
        icon: Zap,
        label: 'Sarige Express'
    },
    'Rajahamsa': {
        color: 'text-amber-700',
        bg: 'bg-amber-50',
        border: 'border-l-amber-500',
        icon: Crown,
        label: 'Rajahamsa Executive'
    },
    'Airavat': {
        color: 'text-sky-700',
        bg: 'bg-sky-50',
        border: 'border-l-sky-500',
        icon: Bus,
        label: 'Airavat Volvo'
    },
    'Airavat Club Class': {
        color: 'text-indigo-700',
        bg: 'bg-indigo-50',
        border: 'border-l-indigo-500',
        icon: Crown,
        label: 'Club Class'
    },
    'Sleeper': {
        color: 'text-purple-700',
        bg: 'bg-purple-50',
        border: 'border-l-purple-500',
        icon: Moon,
        label: 'AC Sleeper'
    },
    'NAC Sleeper': {
        color: 'text-fuchsia-700',
        bg: 'bg-fuchsia-50',
        border: 'border-l-fuchsia-500',
        icon: Moon,
        label: 'Non-AC Sleeper'
    },
    'Ordinary': {
        color: 'text-slate-600',
        bg: 'bg-slate-100',
        border: 'border-l-slate-400',
        icon: Bus,
        label: 'Ordinary'
    }
};

export function IntercityBusCard({ bus }: IntercityBusCardProps) {
    const style = SERVICE_STYLES[bus.serviceType] || SERVICE_STYLES['Express'];
    const Icon = style.icon;

    return (
        <div className={`bg-white rounded-xl shadow-sm border border-slate-200 mb-3 relative overflow-hidden group hover:shadow-md transition-shadow ${style.border} border-l-4`}>
            <div className="p-4">
                {/* Header: Type & Operator */}
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg ${style.bg} ${style.color}`}>
                            <Icon className="w-4 h-4" />
                        </div>
                        <div>
                            <div className={`text-xs font-bold uppercase tracking-wider ${style.color}`}>
                                {style.label}
                            </div>
                            <div className="text-[10px] font-medium text-slate-400">
                                {bus.operator}
                            </div>
                        </div>
                    </div>
                    {/* Optional: Add Amenities Ticket Icon etc. */}
                </div>

                {/* Timings */}
                <div className="flex items-center justify-between mb-4">
                    <div className="text-center md:text-left">
                        <div className="text-xl font-bold text-slate-900 leading-none">
                            {formatTime(bus.departureTime)}
                        </div>
                        <div className="text-[10px] font-medium text-slate-400 mt-1 uppercase">
                            Departure
                        </div>
                    </div>

                    <div className="flex-1 px-4 flex flex-col items-center">
                        <div className="w-full h-px bg-slate-200 relative mb-1">
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                        </div>
                        <div className="text-[10px] font-medium text-slate-400 bg-white px-2 -mt-2.5">
                            {bus.duration}
                        </div>
                    </div>

                    <div className="text-center md:text-right">
                        <div className="text-xl font-bold text-slate-900 leading-none">
                            {formatTime(bus.arrivalTime)}
                        </div>
                        <div className="text-[10px] font-medium text-slate-400 mt-1 uppercase">
                            Arrival
                        </div>
                    </div>
                </div>

                {/* Footer: Route & Info */}
                <div className="flex items-center gap-3 pt-3 border-t border-slate-50">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <MapPin className="w-3 h-3 shrink-0 text-slate-400" />
                            <span className="truncate">
                                <span className="text-slate-400 mr-1">Via:</span>
                                {bus.via.join(', ')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
