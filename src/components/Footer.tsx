"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ExternalLink, Heart, Globe, Terminal, Bus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
    const currentYear = new Date().getFullYear();
    const { t } = useLanguage();

    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-12 pb-8 transition-colors">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">

                    {/* Column 1: Branding */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 group w-fit">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:bg-blue-700 transition-colors">
                                P
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-none">{t('app_name')}</h2>
                                <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mt-0.5">{t('community_project')}</p>
                            </div>
                        </Link>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs">
                            {t('footer_tagline')}
                            <br />
                            <span className="text-xs mt-2 block opacity-80">{t('footer_built_by')}</span>
                        </p>
                    </div>

                    {/* Column 2: Quick Links (Accordion on Mobile) */}
                    <FooterSection title={t('footer_quick_links')}>
                        <FooterLink href="/" label={t('home')} />
                        <FooterLink href="/#hero-search" label={t('footer_search_bus')} />
                        <FooterLink href="/directory" label={t('bus_directory')} />
                        <FooterLink href="/help" label={t('help_info')} />
                        <FooterLink href="/help/emergency" label={t('card_emergency_title')} />
                        <FooterLink href="/help/travel" label={t('footer_travel_guide')} />
                    </FooterSection>

                    {/* Column 3: Community */}
                    <FooterSection title={t('footer_open_community')}>
                        <div className="space-y-3">
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                {t('footer_open_source_desc')}
                            </p>
                            <div className="flex flex-col gap-2">
                                <a
                                    href="https://sitexar.netlify.app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                                >
                                    <Globe className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                                    Sitexar
                                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                                <a
                                    href="https://github.com/Binary-Explorers"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
                                >
                                    <Terminal className="w-4 h-4 text-slate-400 group-hover:text-purple-500" />
                                    Binary-Explorers
                                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            </div>

                        </div>
                    </FooterSection>

                    {/* Column 4: Legal & Trust */}
                    <FooterSection title={t('footer_legal_trust')}>
                        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                            <p>
                                <strong className="text-slate-900 dark:text-white">{t('footer_not_official')}</strong>
                                <br />
                                {t('footer_independent_service')}
                            </p>
                            <a
                                href="https://ksrtc.in"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline inline-flex items-center gap-1"
                            >
                                {t('footer_official_link')} <ExternalLink className="w-3 h-3" />
                            </a>
                            <div className="flex gap-3 text-xs opacity-80 pt-1">
                                <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{t('footer_no_booking')}</span>
                                <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{t('footer_no_ads')}</span>
                            </div>
                        </div>
                    </FooterSection>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                    <p className="text-sm text-slate-500 dark:text-slate-500">
                        © {currentYear} {t('app_name')}. Built by <a href="https://sitexar.netlify.app" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Sitexar</a> & <a href="https://github.com/Binary-Explorers" className="hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors">Binary Explorers</a>.
                    </p>

                    <div className="flex items-center gap-1 text-sm text-slate-500 font-medium">
                        <span>{t('footer_serving')}</span>
                        <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
                    </div>
                </div>
            </div>
        </footer>
    );
}

// Components

function FooterSection({ title, children }: { title: string, children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-slate-100 dark:border-slate-800 md:border-none pb-4 md:pb-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full md:cursor-default group"
            >
                <h3 className="font-bold text-slate-900 dark:text-white mb-0 md:mb-4">{title}</h3>
                <ChevronDown className={`w-5 h-5 text-slate-400 md:hidden transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`mt-2 md:mt-0 space-y-2 md:block ${isOpen ? 'block' : 'hidden'}`}>
                {children}
            </div>
        </div>
    )
}

function FooterLink({ href, label }: { href: string; label: string }) {
    return (
        <Link
            href={href}
            className="block text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-1 transition-all"
        >
            {label}
        </Link>
    );
}
