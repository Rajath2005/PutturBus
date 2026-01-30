import { Map, Clock, ShieldCheck, MapPin } from "lucide-react";

export default function TravelInfoPage() {
    return (
        <main className="min-h-screen bg-slate-50 pb-20">
            <header className="bg-white border-b border-slate-200 py-12 px-4 text-center">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Travel Information</h1>
                <p className="text-slate-500 max-w-xl mx-auto">
                    Understanding how PutturBus works and how to travel smart.
                </p>
            </header>

            <div className="max-w-2xl mx-auto px-4 mt-8 space-y-12">

                {/* Section 1: About */}
                <section>
                    <div className="bg-blue-600 text-white rounded-2xl p-8 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                        <h2 className="text-2xl font-bold mb-4 relative z-10">What is PutturBus?</h2>
                        <p className="text-blue-100 leading-relaxed relative z-10">
                            PutturBus is a free community tool created by engineering students (Sitexar) to make KSRTC bus information easy and accessible for everyone in Puttur.
                        </p>
                    </div>
                </section>

                {/* Section 2: Bus Categories */}
                <section>
                    <SectionHeader title="Service Types" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InfoCard
                            title="Local Routes"
                            description="Buses connecting Puttur to nearby towns like Sulya, Udupi, and Mangalore. Usually 'Karnataka Sarige' red buses."
                            icon={<MapPin className="w-5 h-5 text-red-500" />}
                        />
                        <InfoCard
                            title="Intercity Routes"
                            description="Long-distance buses to Bengaluru, Mysuru, or Goa. Includes Rajahamsa, Sleeper, and Airavat classes."
                            icon={<Map className="w-5 h-5 text-blue-500" />}
                        />
                    </div>
                </section>

                {/* Section 3: How it works */}
                <section>
                    <SectionHeader title="How Timing Works" />
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                <Clock className="w-5 h-5 text-slate-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Official Schedules</h3>
                                <p className="text-sm text-slate-500 mt-1">
                                    We digitize the official time tables from the KSRTC depot.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                <Map className="w-5 h-5 text-slate-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Route Logic</h3>
                                <p className="text-sm text-slate-500 mt-1">
                                    We estimate travel time based on distance and average bus speed. Actual arrival depends on traffic.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 5: Community Promise */}
                <section className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-full mb-4">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Our Community Promise</h2>
                    <p className="text-slate-500 max-w-sm mx-auto">
                        This platform is built for society, not profit. It will always remain free for the people of Puttur.
                    </p>
                </section>

            </div>
        </main>
    );
}

function SectionHeader({ title }: { title: string }) {
    return (
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-l-4 border-blue-500 pl-3">
            {title}
        </h2>
    );
}

function InfoCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
    return (
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
                {icon}
                <h3 className="font-bold text-slate-900">{title}</h3>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
                {description}
            </p>
        </div>
    );
}
