"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, HelpCircle, User } from "lucide-react";

export function SiteHeader() {
    const pathname = usePathname();

    // Check if we are on the home page or directory page to handle specific styling if needed
    // For now, consistent white style as requested "Government-service style"

    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo / Home Link */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-blue-700 transition-colors">
                        P
                    </div>
                    <div className="hidden sm:block">
                        <h1 className="text-lg font-bold text-slate-900 leading-none">PutturBus</h1>
                        <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Community Project</p>
                    </div>
                </Link>

                {/* Navigation Links */}
                <nav className="flex items-center gap-1 sm:gap-2">
                    <NavLink href="/" icon={<Home className="w-4 h-4" />} label="Home" active={pathname === "/"} />
                    <NavLink href="/directory" icon={<Map className="w-4 h-4" />} label="Directory" active={pathname.startsWith("/directory")} />
                    <NavLink href="/help" icon={<HelpCircle className="w-4 h-4" />} label="Help" active={pathname.startsWith("/help") || pathname.startsWith("/helpline") || pathname.startsWith("/faq")} />
                </nav>
            </div>
        </header>
    );
}

function NavLink({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active: boolean }) {
    return (
        <Link
            href={href}
            className={`
                flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all
                ${active
                    ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-200"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }
            `}
        >
            {icon}
            <span className={`${active ? "block" : "hidden sm:block"}`}>{label}</span>
        </Link>
    );
}
