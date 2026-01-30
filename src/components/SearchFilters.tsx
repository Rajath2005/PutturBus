import { Search, Filter } from 'lucide-react';

interface SearchFiltersProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    selectedTime: string;
    onTimeChange: (value: string) => void;
    selectedType: string;
    onTypeChange: (value: string) => void;
}

export function SearchFilters({
    searchTerm,
    onSearchChange,
    selectedTime,
    onTimeChange,
    selectedType,
    onTypeChange
}: SearchFiltersProps) {
    return (
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md p-4 border-b border-gray-200 shadow-sm space-y-3">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search destination (e.g. Mangalore)"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-sm text-lg"
                />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                <select
                    value={selectedTime}
                    onChange={(e) => onTimeChange(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm font-medium focus:outline-none focus:border-blue-500"
                >
                    <option value="all">All Times</option>
                    <option value="morning">Morning (5AM - 12PM)</option>
                    <option value="afternoon">Afternoon (12PM - 5PM)</option>
                    <option value="evening">Evening (5PM - 11PM)</option>
                </select>

                <select
                    value={selectedType}
                    onChange={(e) => onTypeChange(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm font-medium focus:outline-none focus:border-blue-500"
                >
                    <option value="all">All Types</option>
                    <option value="ordinary">Ordinary</option>
                    <option value="express">Express</option>
                    <option value="limited">Limited Stop</option>
                </select>
            </div>
        </div>
    );
}
