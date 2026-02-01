"use client";

import React from 'react';

/**
 * BusLoader Component
 * 
 * A high-performance, GPU-accelerated loader that mimics a bus driving on a road.
 * Optimized for mobile with minimal layout shift and no heavy assets.
 */
export function BusLoader() {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-[#eaf6ff] to-white pointer-events-none select-none overflow-hidden">
            <style jsx>{`
        @keyframes busDrive {
          0% { transform: translateX(-120px) scale(0.95); }
          50% { transform: translateX(calc(50vw - 50px)) scale(1); }
          100% { transform: translateX(100vw) scale(0.95); }
        }
        
        @keyframes roadMove {
          from { background-position-x: 0; }
          to { background-position-x: 50px; }
        }

        @keyframes cloudFloat {
          from { transform: translateX(100%); opacity: 0.8; }
          to { transform: translateX(-100%); opacity: 0.8; }
        }

        .bus-animation {
          animation: busDrive 3s linear infinite;
          will-change: transform;
        }

        .road-animation {
          animation: roadMove 0.5s linear infinite;
          will-change: background-position;
        }
        
        .cloud-1 { animation: cloudFloat 15s linear infinite; top: 10%; left: -20%; }
        .cloud-2 { animation: cloudFloat 20s linear infinite; top: 20%; left: -10%; animation-delay: 5s; }
      `}</style>

            {/* Decorative Clouds */}
            <div className="absolute inset-0 w-full h-full opacity-30">
                <div className="absolute cloud-1 w-24 h-8 bg-white rounded-full blur-xl"></div>
                <div className="absolute cloud-2 w-32 h-10 bg-white rounded-full blur-xl"></div>
            </div>

            <div className="relative w-full max-w-lg aspect-[2/1] flex flex-col justify-center items-center">
                {/* The Bus */}
                <div className="bus-animation relative z-10 w-24 h-14">
                    <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
                        {/* Bus Body - Main */}
                        <path d="M10 20C10 15 14 12 20 12H90C95 12 98 16 98 20V45C98 48 95 50 92 50H15C12 50 10 48 10 45V20Z" fill="#3b82f6" />

                        {/* Bus Roof/Top */}
                        <path d="M12 20C12 16 16 14 20 14H88C92 14 96 16 96 20V30H12V20Z" fill="#60a5fa" />

                        {/* Windows */}
                        <rect x="16" y="18" width="14" height="10" rx="1" fill="#bfdbfe" />
                        <rect x="34" y="18" width="14" height="10" rx="1" fill="#bfdbfe" />
                        <rect x="52" y="18" width="14" height="10" rx="1" fill="#bfdbfe" />
                        <rect x="70" y="18" width="18" height="10" rx="1" fill="#bfdbfe" />

                        {/* Stripe */}
                        <rect x="10" y="34" width="88" height="4" fill="#1d4ed8" fillOpacity="0.2" />

                        {/* Wheels */}
                        <circle cx="25" cy="50" r="6" fill="#1e293b" />
                        <circle cx="25" cy="50" r="2.5" fill="#94a3b8" />

                        <circle cx="80" cy="50" r="6" fill="#1e293b" />
                        <circle cx="80" cy="50" r="2.5" fill="#94a3b8" />

                        {/* Headlight */}
                        <path d="M96 38H98V42H96V38Z" fill="#facc15" />
                    </svg>
                </div>

                {/* The Road */}
                <div className="w-full h-24 absolute top-[55%] flex items-center overflow-hidden">
                    {/* Road Surface */}
                    <div className="w-full h-1 bg-slate-300 relative rounded-full overflow-hidden">
                        {/* Dashed Line */}
                        <div
                            className="road-animation absolute top-0 left-0 h-full w-[200%] bg-[repeating-linear-gradient(90deg,transparent,transparent_20px,#ffffff_20px,#ffffff_40px)] opacity-50"
                            style={{ backgroundSize: '40px 100%' }}
                        />
                    </div>
                </div>
            </div>

            {/* Loading Text */}
            <div className="absolute bottom-20 flex flex-col items-center gap-2">
                <div className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] animate-pulse">
                    Loading System
                </div>
            </div>
        </div>
    );
}
