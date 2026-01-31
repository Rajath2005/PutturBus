"use client"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

// Declare window.gtag for TypeScript
declare global {
    interface Window {
        gtag: (command: string, targetId: string, config?: any) => void;
    }
}

export default function PageViewTracker() {
    const pathname = usePathname()

    useEffect(() => {
        if (window.gtag && process.env.NEXT_PUBLIC_GA_ID) {
            window.gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
                page_path: pathname,
            })
        }
    }, [pathname])

    return null
}
