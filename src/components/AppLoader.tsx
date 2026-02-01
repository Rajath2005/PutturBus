"use client";

import { useEffect, useState } from "react";
import { BusLoader } from "./BusLoader";

export function AppLoader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Premium loading simulation
        const timer = setTimeout(() => {
            requestAnimationFrame(() => setIsLoading(false));
        }, 1200);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={`fixed inset-0 z-[100] transition-opacity duration-700 pointer-events-none ${isLoading ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden={!isLoading}
        >
            {isLoading && <BusLoader />}
        </div>
    );
}
