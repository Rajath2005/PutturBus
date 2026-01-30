import { Search, MapPin, Bus } from 'lucide-react';

export function HowItWorks() {
    const steps = [
        {
            icon: Search,
            title: "Search Route",
            desc: "Enter your destination to find all available buses."
        },
        {
            icon: Bus,
            title: "Choose Bus",
            desc: "Compare timings and choose Express or Ordinary services."
        },
        {
            icon: MapPin,
            title: "Track Journey",
            desc: "View stops and route map to travel with confidence."
        }
    ];

    return (
        <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold text-foreground">How PutturBus Works</h2>
                    <p className="text-muted-foreground mt-2">Simple steps to get you moving</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((s, i) => (
                        <div key={i} className="flex flex-col items-center text-center group">
                            <div className="w-16 h-16 rounded-2xl bg-white shadow-xl shadow-blue-500/5 mb-6 flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                                <s.icon className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
