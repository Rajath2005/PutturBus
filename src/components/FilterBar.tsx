import { cn } from '@/lib/utils';
import { Clock, Zap, Map } from 'lucide-react';

interface FilterBarProps {
    selectedTime: string;
    onTimeChange: (val: string) => void;
    selectedType: string;
    onTypeChange: (val: string) => void;
}

export function FilterBar({ selectedTime, onTimeChange, selectedType, onTypeChange }: FilterBarProps) {
    const times = [
        { id: 'all', label: 'Now' },
        { id: 'morning', label: 'Morning' },
        { id: 'afternoon', label: 'Afternoon' },
        { id: 'evening', label: 'Evening' },
    ];

    const types = [
        { id: 'all', label: 'All' },
        { id: 'express', label: 'Express' },
        { id: 'limited', label: 'Limited' },
        { id: 'ordinary', label: 'Ordinary' },
    ];

    return (
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border py-2 px-4 space-y-2">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {times.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => onTimeChange(t.id)}
                        className={cn(
                            "px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border",
                            selectedTime === t.id
                                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                : "bg-secondary text-secondary-foreground border-transparent hover:bg-secondary/80"
                        )}
                    >
                        {t.label}
                    </button>
                ))}
                <div className="w-px h-6 bg-border mx-1 my-auto" />
                {types.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => onTypeChange(t.id)}
                        className={cn(
                            "px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border",
                            selectedType === t.id
                                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                : "bg-secondary text-secondary-foreground border-transparent hover:bg-secondary/80"
                        )}
                    >
                        {t.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
