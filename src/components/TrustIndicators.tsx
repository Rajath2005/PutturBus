import { ShieldCheck, Users, Heart } from 'lucide-react';

export function TrustIndicators() {
    return (
        <section className="py-8 border-t border-slate-100 bg-slate-50/50">
            <div className="max-w-4xl mx-auto px-4 flex flex-wrap justify-center gap-6 md:gap-12">
                <div className="flex items-center gap-3 opacity-70 grayscale hover:grayscale-0 transition-all cursor-default">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-semibold text-slate-600">Verified Routes</span>
                </div>
                <div className="flex items-center gap-3 opacity-70 grayscale hover:grayscale-0 transition-all cursor-default">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-semibold text-slate-600">Community Powered</span>
                </div>
                <div className="flex items-center gap-3 opacity-70 grayscale hover:grayscale-0 transition-all cursor-default">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span className="text-sm font-semibold text-slate-600">Student Project</span>
                </div>
            </div>
        </section>
    );
}
