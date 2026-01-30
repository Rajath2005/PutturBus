"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Ticket, Briefcase, Clock, Bus } from "lucide-react";

export default function FAQPage() {
    return (
        <main className="min-h-screen bg-slate-50 pb-20">
            <header className="bg-white border-b border-slate-200 py-12 px-4 text-center">
                <div className="max-w-xl mx-auto">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Bus FAQ</h1>
                    <p className="text-slate-500">Common questions about KSRTC services from Puttur.</p>
                </div>

                <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800 max-w-lg mx-auto">
                    <strong>Note:</strong> PutturBus is only an information platform — all travel, tickets, and rules are managed by KSRTC.
                </div>
            </header>

            <div className="max-w-2xl mx-auto px-4 mt-8 space-y-4">
                <FAQSection title="Tickets & Booking" icon={<Ticket className="w-5 h-5 text-purple-600" />}>
                    <FAQItem
                        question="Where do I buy tickets?"
                        answer="You can buy tickets directly at the KSRTC Bus Stand counters or online at ksrtc.in. For local buses, tickets are purchased inside the bus from the conductor."
                    />
                    <FAQItem
                        question="Can I book tickets on PutturBus?"
                        answer="No. PutturBus is an information-only platform built by students. We do not sell tickets or handle any payments."
                    />
                </FAQSection>

                <FAQSection title="Luggage & Parcel" icon={<Briefcase className="w-5 h-5 text-orange-600" />}>
                    <FAQItem
                        question="What represents the luggage allowance?"
                        answer="KSRTC allows a standard amount of personal luggage. Excessive luggage or commercial goods may be charged separately by the conductor/driver as per corporation rules."
                    />
                </FAQSection>

                <FAQSection title="Timings & Reliability" icon={<Clock className="w-5 h-5 text-blue-600" />}>
                    <FAQItem
                        question="Are the timings exact?"
                        answer="The timings shown are based on official KSRTC schedules. However, actual arrival/departure may vary due to traffic, road conditions, or operational delays."
                    />
                    <FAQItem
                        question="Does PutturBus track buses live?"
                        answer="For select intercity routes, we may show live status if available. For most local routes, we show estimated location based on the scheduled departure time."
                    />
                </FAQSection>

                <FAQSection title="Bus Types" icon={<Bus className="w-5 h-5 text-red-600" />}>
                    <FAQItem
                        question="Karnataka Sarige (Ordinary)"
                        answer="Red buses. Stop at all stops. Cheapest fare. Connects villages to Puttur."
                    />
                    <FAQItem
                        question="Rajahamsa / Non-AC Sleeper"
                        answer="Comfortable 2+2 seating express buses for longer distances like Bangalore or Mysore."
                    />
                    <FAQItem
                        question="Airavat / AC Class"
                        answer="Premium AC buses (Volvo/Scania) available for long-distance overnight travel."
                    />
                </FAQSection>
            </div>
        </main>
    );
}

function FAQSection({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 mt-6 mb-3">
                {icon}
                {title}
            </h2>
            <div className="space-y-3">
                {children}
            </div>
        </div>
    );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
            >
                <span className="font-semibold text-slate-800">{question}</span>
                {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            {isOpen && (
                <div className="px-4 pb-4 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100 mt-2 pt-2">
                    {answer}
                </div>
            )}
        </div>
    );
}
