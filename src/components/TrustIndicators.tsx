import { ShieldCheck, Users, Heart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function TrustIndicators() {
    const { t } = useLanguage();

    return (
        <section className="py-12 border-t border-slate-100 bg-gradient-to-b from-white to-slate-50">
            <div className="max-w-5xl mx-auto px-4">
                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                    {/* Badge 1 */}
                    <div className="flex items-center gap-3 px-5 py-2.5 bg-white border border-slate-200 rounded-full shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group cursor-default">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-sm font-bold text-slate-700 group-hover:text-emerald-900 transition-colors">
                            {t('trust_verified')}
                        </span>
                    </div>

                    {/* Badge 2 */}
                    <div className="flex items-center gap-3 px-5 py-2.5 bg-white border border-slate-200 rounded-full shadow-sm hover:shadow-md hover:border-blue-200 transition-all group cursor-default">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                            <Users className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-bold text-slate-700 group-hover:text-blue-900 transition-colors">
                            {t('trust_community')}
                        </span>
                    </div>

                    {/* Badge 3 */}
                    <div className="flex items-center gap-3 px-5 py-2.5 bg-white border border-slate-200 rounded-full shadow-sm hover:shadow-md hover:border-rose-200 transition-all group cursor-default">
                        <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center group-hover:bg-rose-100 transition-colors">
                            <Heart className="w-4 h-4 text-rose-600" />
                        </div>
                        <span className="text-sm font-bold text-slate-700 group-hover:text-rose-900 transition-colors">
                            {t('trust_civic')}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
