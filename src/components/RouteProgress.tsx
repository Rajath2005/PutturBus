"use client";

import { Loader2 } from "lucide-react";

interface RouteProgressProps {
    isFetching: boolean;
}

export function RouteProgress({ isFetching }: RouteProgressProps) {
    if (!isFetching) return null;

    return (
        <div className="fixed top-[calc(var(--header-height)+16px)] right-4 z-50 flex items-center gap-2 px-3 py-1.5 bg-slate-900/90 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg animate-in fade-in slide-in-from-top-2">
            <Loader2 className="w-3 h-3 animate-spin text-blue-400" />
            <span>Updating Live Data</span>
        </div>
    );
}
