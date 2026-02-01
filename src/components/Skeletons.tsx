import { Skeleton } from "@/components/ui/Skeleton";

export function BusCardSkeleton() {
    return (
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
            <div className="flex justify-between items-start">
                <div className="space-y-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-8 w-16 rounded-full" />
            </div>
            <div className="flex gap-4 pt-2 border-t border-slate-100">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/3" />
            </div>
        </div>
    );
}

export function MapSkeleton() {
    return (
        <div className="w-full h-full bg-slate-100 relative overflow-hidden flex items-center justify-center">
            <Skeleton className="absolute inset-0 w-full h-full rounded-none opacity-50" />
            <div className="relative z-10 flex flex-col items-center gap-2 opacity-30">
                <div className="w-12 h-12 rounded-full border-4 border-slate-300"></div>
                <div className="h-2 w-24 bg-slate-300 rounded"></div>
            </div>
        </div>
    );
}

export function StatsSkeleton() {
    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-6 w-16" />
            </div>
            <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-6 w-16" />
            </div>
            <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-6 w-16" />
            </div>
        </div>
    )
}
