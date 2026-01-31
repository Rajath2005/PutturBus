import Link from 'next/link';
import { Info } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function Disclaimer() {
    const { t } = useLanguage();

    return (
        <div className="max-w-4xl mx-auto px-4 my-8">
            <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-4 flex items-start gap-4 shadow-sm backdrop-blur-sm">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                    <Info className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1">
                    <h4 className="text-sm font-bold text-amber-900 mb-1">
                        {t('disclaimer_title')}
                    </h4>
                    <p className="text-xs md:text-sm text-amber-800/80 leading-relaxed">
                        {t('disclaimer_text')}{' '}
                        <a
                            href="https://ksrtc.in"
                            target="_blank"
                            rel="noopener"
                            className="font-bold underline decoration-amber-400 hover:text-amber-950 transition-colors"
                        >
                            ksrtc.in
                        </a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
