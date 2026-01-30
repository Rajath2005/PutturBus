import Link from 'next/link';
import { MapPin, ArrowRight, Info, HelpCircle, Globe, Map, Phone } from 'lucide-react';

const POPULAR_ROUTES = [
    { name: 'Mangalore', slug: 'puttur-to-mangalore', time: '1h 30m' },
    { name: 'Kasaragod', slug: 'puttur-to-kasaragod', time: '1h 45m' },
    { name: 'Sulya', slug: 'puttur-to-sulya', time: '1h 15m' },
    { name: 'Udupi', slug: 'puttur-to-udupi', time: '2h 15m' },
    { name: 'Karwar', slug: 'puttur-to-karwar', time: '5h 00m' },
    { name: 'Mysore', slug: 'puttur-to-mysore', time: '3h 30m' },
    { name: 'Bangalore', slug: 'puttur-to-bangalore', time: '7h 00m' },
    { name: 'Dharmastala', slug: 'puttur-to-dharmastala', time: '1h 15m' },
    { name: 'Kukke Subrahmanya', slug: 'puttur-to-kukke-subrahmanya', time: '1h 10m' },
];

export function QuickLinks() {
    return (
        <div className="py-8 px-4 max-w-2xl mx-auto space-y-12">
            {/* Popular Routes Section */}
            <section>
                <div className="flex items-center gap-2 mb-6">
                    <Map className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-bold text-slate-900">Popular Routes</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {POPULAR_ROUTES.map((route) => (
                        <Link
                            key={route.slug}
                            href={`/route/${route.slug}`}
                            className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all group flex flex-col gap-2"
                        >
                            <div className="flex justify-between items-start">
                                <span className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors">
                                    {route.name}
                                </span>
                                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-bold">
                                    {route.time}
                                </span>
                            </div>
                            <p className="text-xs text-slate-400 font-medium">From Puttur KSRTC</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Explore Network Section (New Feature) */}
            <section>
                <div className="flex items-center gap-2 mb-6">
                    <Globe className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-lg font-bold text-slate-900">Explore Network</h3>
                </div>

                <Link href="/directory" className="block p-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-blue-500/20 active:scale-[0.98] transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4">
                        <Globe className="w-32 h-32 text-white" />
                    </div>

                    <div className="relative z-10 text-white flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0">
                            <Map className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-2xl font-bold mb-2">Bus Directory</h4>
                            <p className="text-blue-100 text-sm mb-6 max-w-md">
                                Browse all connected destinations from Puttur KSRTC. Find routes, timings, and stops for every location.
                            </p>
                            <div className="inline-flex items-center gap-2 font-bold bg-white text-blue-600 px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors">
                                Browse All Routes
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </Link>
            </section>

            {/* Help & Support Section */}
            <section>
                <div className="flex items-center gap-2 mb-6">
                    <Info className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-bold text-slate-900">Help & Info</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/help/helpline" className="flex items-center gap-4 bg-purple-50 p-4 rounded-2xl hover:bg-purple-100 transition-colors border border-purple-100/50">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-purple-600 shadow-sm">
                            <Phone className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="font-bold text-purple-900">Helpline</div>
                            <div className="text-xs text-purple-600 font-medium">Emergency contacts</div>
                        </div>
                    </Link>
                    <Link href="/help/faq" className="flex items-center gap-4 bg-indigo-50 p-4 rounded-2xl hover:bg-indigo-100 transition-colors border border-indigo-100/50">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-sm">
                            <HelpCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="font-bold text-indigo-900">Bus FAQ</div>
                            <div className="text-xs text-indigo-600 font-medium">Travel Information</div>
                        </div>
                    </Link>
                </div>
            </section>
        </div>
    );
}
