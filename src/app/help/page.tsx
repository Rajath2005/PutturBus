"use client";

import Link from "next/link";
import { Phone, AlertTriangle, HelpCircle, Compass, ArrowRight, Shield } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function HelpPage() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen bg-slate-50 pb-20">
            {/* Hero Section */}
            <header className="bg-white border-b border-slate-200 py-16 px-4 text-center">
                <div className="max-w-2xl mx-auto space-y-6">
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                        <Shield className="w-4 h-4" />
                        {t('help_hero_badge')}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                        {t('help_hero_title')}
                    </h1>
                    <p className="text-xl text-slate-500 font-medium">
                        {t('help_hero_subtitle')}
                    </p>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 max-w-lg mx-auto">
                        <p className="font-semibold">{t('help_box_title')}</p>
                        <p>{t('help_box_text')}</p>
                    </div>
                </div>
            </header>

            {/* Content Grid */}
            <div className="max-w-4xl mx-auto px-4 -mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <HelpCard
                        href="/help/helpline"
                        icon={<Phone className="w-6 h-6 text-green-600" />}
                        title={t('card_helpline_title')}
                        description={t('card_helpline_desc')}
                        color="bg-green-50"
                    />
                    <HelpCard
                        href="/help/emergency"
                        icon={<AlertTriangle className="w-6 h-6 text-red-600" />}
                        title={t('card_emergency_title')}
                        description={t('card_emergency_desc')}
                        color="bg-red-50"
                    />
                    <HelpCard
                        href="/help/faq"
                        icon={<HelpCircle className="w-6 h-6 text-purple-600" />}
                        title={t('card_faq_title')}
                        description={t('card_faq_desc')}
                        color="bg-purple-50"
                    />
                    <HelpCard
                        href="/help/travel"
                        icon={<Compass className="w-6 h-6 text-blue-600" />}
                        title={t('card_travel_title')}
                        description={t('card_travel_desc')}
                        color="bg-blue-50"
                    />
                </div>
            </div>
        </main>
    );
}

function HelpCard({ href, icon, title, description, color }: { href: string; icon: React.ReactNode; title: string; description: string; color: string }) {
    return (
        <Link href={href} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex items-start gap-4 h-full">
            <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center shrink-0`}>
                {icon}
            </div>
            <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                    {title}
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-500" />
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                    {description}
                </p>
            </div>
        </Link>
    );
}
