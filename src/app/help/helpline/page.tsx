import { Phone, Globe, AlertCircle } from "lucide-react";

export default function HelplinePage() {
    return (
        <main className="min-h-screen bg-slate-50 pb-20">
            <Banner
                title="Helpline Numbers"
                subtitle="Official contact channels for KSRTC services."
            />

            <div className="max-w-2xl mx-auto px-4 mt-8 space-y-8">
                {/* Disclaimer */}
                <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex gap-4">
                    <AlertCircle className="w-6 h-6 text-red-600 shrink-0" />
                    <div>
                        <h3 className="font-bold text-red-900 mb-1">Important Notice</h3>
                        <p className="text-red-700 text-sm">
                            We do NOT sell tickets or accept money. These are official KSRTC helpline numbers for your convenience.
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <ContactCard
                        title="KSRTC Central Customer Care"
                        number="080-26252625"
                        label="24/7 Support"
                    />
                    <ContactCard
                        title="Puttur KSRTC Depot"
                        number="08251-230900"
                        label="Depot Enquiry"
                    />
                    <ContactCard
                        title="Puttur Bus Stand Enquiry"
                        number="08251-230800"
                        label="Stand Enquiry"
                    />
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-slate-900">Official Website</h3>
                        <p className="text-slate-500 text-sm">Book tickets and view official schedules</p>
                    </div>
                    <a
                        href="https://ksrtc.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                    >
                        <Globe className="w-4 h-4" />
                        Visit ksrtc.in
                    </a>
                </div>
            </div>
        </main>
    );
}

function ContactCard({ title, number, label }: { title: string; number: string; label: string }) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full mb-2 inline-block">
                    {label}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                <p className="text-slate-500 text-sm">Official Line</p>
            </div>
            <a
                href={`tel:${number.replace(/-/g, '')}`}
                className="flex items-center justify-center gap-2 bg-green-50 text-green-700 px-6 py-3 rounded-xl font-bold hover:bg-green-100 transition-colors"
            >
                <Phone className="w-5 h-5" />
                {number}
            </a>
        </div>
    );
}

function Banner({ title, subtitle }: { title: string; subtitle: string }) {
    return (
        <div className="bg-white border-b border-slate-200 py-12 px-4 text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
            <p className="text-slate-500 max-w-xl mx-auto">{subtitle}</p>
        </div>
    );
}
