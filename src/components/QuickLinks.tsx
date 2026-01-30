import Link from 'next/link';
import { Map, Info, Phone, Bus } from 'lucide-react';

const POPULAR_ROUTES = [
    { name: 'Mangalore', slug: 'puttur-to-mangalore', time: '1h 30m' },
    { name: 'Kasaragod', slug: 'puttur-to-kasaragod', time: '1h 45m' },
    { name: 'Mysore', slug: 'puttur-to-mysore', time: '3h 30m' },
    { name: 'Bangalore', slug: 'puttur-to-bangalore', time: '7h 00m' },
    { name: 'Dharmastala', slug: 'puttur-to-dharmastala', time: '1h 15m' },
    { name: 'Kukke Subrahmanya', slug: 'puttur-to-kukke-subrahmanya', time: '1h 10m' },
];

export function QuickLinks() {
    return (
        <div className="py-8 px-4 max-w-2xl mx-auto space-y-8">
            <section>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Map className="w-5 h-5 text-blue-600" />
                    Popular Routes
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    {POPULAR_ROUTES.map((route) => (
                        <Link
                            key={route.slug}
                            href={`/route/${route.slug}`}
                            className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                                    {route.name}
                                </span>
                                <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-full font-medium">
                                    {route.time}
                                </span>
                            </div>
                            <p className="text-xs text-gray-500">From Puttur KSRTC</p>
                        </Link>
                    ))}
                </div>
            </section>

            <section>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-purple-600" />
                    Help & Info
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    <Link href="/directory" className="flex items-center gap-3 bg-purple-50 p-4 rounded-xl hover:bg-purple-100 transition-colors">
                        <Phone className="w-5 h-5 text-purple-600" />
                        <div>
                            <div className="font-semibold text-purple-900">Helpline</div>
                            <div className="text-xs text-purple-700">Important numbers</div>
                        </div>
                    </Link>
                    <Link href="/faq" className="flex items-center gap-3 bg-indigo-50 p-4 rounded-xl hover:bg-indigo-100 transition-colors">
                        <Bus className="w-5 h-5 text-indigo-600" />
                        <div>
                            <div className="font-semibold text-indigo-900">Bus FAQ</div>
                            <div className="text-xs text-indigo-700">How to travel</div>
                        </div>
                    </Link>
                </div>
            </section>
        </div>
    );
}
