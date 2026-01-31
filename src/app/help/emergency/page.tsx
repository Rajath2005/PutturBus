"use client";

import { Phone, MapPin, Ambulance, Flame, ShieldAlert, HeartPulse, AlertCircle } from "lucide-react";

export default function EmergencyPage() {
    return (
        <main className="min-h-screen bg-slate-50 pb-20">
            <Banner
                title="Emergency Contacts"
                subtitle="Immediate assistance numbers for Puttur and surrounding regions."
            />

            <div className="max-w-2xl mx-auto px-4 mt-8 space-y-10">

                {/* Emergency Grid */}
                <div>
                    <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Emergency Services</h2>
                    <div className="grid grid-cols-2 gap-3">
                        <EmergencyCard name="Police" number="100" icon={<ShieldAlert className="w-5 h-5" />} color="bg-blue-100 text-blue-700" />
                        <EmergencyCard name="Ambulance" number="108" icon={<Ambulance className="w-5 h-5" />} color="bg-red-100 text-red-700" />
                        <EmergencyCard name="Fire" number="101" icon={<Flame className="w-5 h-5" />} color="bg-orange-100 text-orange-700" />
                        <EmergencyCard name="Women Helpline" number="181" icon={<HeartPulse className="w-5 h-5" />} color="bg-pink-100 text-pink-700" />
                    </div>
                </div>

                {/* Hospitals */}
                <div>
                    <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Nearby Hospitals</h2>
                    <div className="space-y-3">
                        <HospitalCard
                            name="Puttur City Hospital"
                            location="APMC Road"
                            mapUrl="https://www.google.com/maps/search/?api=1&query=Puttur+City+Hospital+Puttur"
                        />
                        <HospitalCard
                            name="Pragathi Speciality Hospital"
                            location="Main Road"
                            mapUrl="https://www.google.com/maps/search/?api=1&query=Pragathi+Speciality+Hospital+Puttur"
                        />
                        <HospitalCard
                            name="Dhanvanthari Hospital"
                            location="Main Road"
                            mapUrl="https://www.google.com/maps/search/?api=1&query=Dhanvanthari+Hospital+Puttur"
                        />
                        <HospitalCard
                            name="Mahaveer Medical Centre"
                            location="Main Road"
                            mapUrl="https://www.google.com/maps/search/?api=1&query=Mahaveer+Medical+Centre+Puttur"
                        />
                        <HospitalCard
                            name="Government General Hospital"
                            location="Government Hospital"
                            mapUrl="https://www.google.com/maps/search/?api=1&query=Government+General+Hospital+Puttur"
                        />
                        <HospitalCard
                            name="Adarsha Hospital"
                            location="APMC Road"
                            mapUrl="https://www.google.com/maps/search/?api=1&query=Adarsha+Hospital+Puttur"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}

function EmergencyCard({ name, number, icon, color }: { name: string; number: string; icon: React.ReactNode; color: string }) {
    return (
        <a href={`tel:${number}`} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-red-200 transition-colors group">
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center`}>
                    {icon}
                </div>
                <div>
                    <div className="font-bold text-slate-800">{name}</div>
                    <div className="text-xs text-slate-400">Tap to call</div>
                </div>
            </div>
            <div className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                {number}
            </div>
        </a>
    );
}

function HospitalCard({ name, location, mapUrl }: { name: string; location: string; mapUrl: string }) {
    return (
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                    <HeartPulse className="w-5 h-5" />
                </div>
                <div>
                    <div className="font-bold text-slate-900">{name}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {location}
                    </div>
                </div>
            </div>
            <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors text-center"
            >
                View Map
            </a>
        </div>
    );
}

function Banner({ title, subtitle }: { title: string; subtitle: string }) {
    return (
        <div className="bg-white border-b border-slate-200 py-12 px-4 text-center">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                <AlertCircle className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
            <p className="text-slate-500 max-w-xl mx-auto">{subtitle}</p>
        </div>
    );
}
