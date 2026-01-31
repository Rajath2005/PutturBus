import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, AlertTriangle, Info, Gavel, Scale } from 'lucide-react';

export default function LegalPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Link>
                </div>

                <div className="bg-white dark:bg-neutral-900 shadow-xl rounded-2xl overflow-hidden border border-gray-100 dark:border-neutral-800">
                    <div className="px-6 py-8 sm:p-10 border-b border-gray-100 dark:border-neutral-800">
                        <div className="flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full mb-4">
                            <Scale className="w-6 h-6" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
                            Legal Disclaimer & Use Policy
                        </h1>
                        <p className="mt-2 text-center text-gray-500 dark:text-gray-400">
                            Please read this important legal information regarding the use of PutturBus.
                        </p>
                    </div>

                    <div className="px-6 py-8 sm:p-10 space-y-10">
                        {/* Identity */}
                        <section>
                            <h2 className="flex items-center text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                <Info className="w-5 h-5 mr-2 text-blue-500" />
                                Project Identity
                            </h2>
                            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                                <p>
                                    <strong>PutturBus</strong> is a student-built community service created by <strong>Sitexar</strong> and <strong>Binary Explorers</strong> to improve access to public transport information for residents of Puttur and surrounding regions.
                                </p>
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-4 border border-blue-100 dark:border-blue-800">
                                    <p className="font-medium text-blue-900 dark:text-blue-100 mb-2">This project:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Does <strong>NOT</strong> sell tickets</li>
                                        <li>Does <strong>NOT</strong> collect money</li>
                                        <li>Does <strong>NOT</strong> represent KSRTC (officially)</li>
                                        <li>Does <strong>NOT</strong> operate buses</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Data Source */}
                        <section>
                            <h2 className="flex items-center text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
                                Data Source & Accuracy
                            </h2>
                            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                                <p>
                                    All bus timings, routes, and schedules displayed on PutturBus are compiled from <strong>publicly available KSRTC schedules</strong> and <strong>community-verified data</strong>.
                                </p>
                                <p className="mt-2">
                                    While we strive for accuracy, delays, cancellations, or schedule changes may occur. <strong>We cannot guarantee real-time accuracy.</strong>
                                </p>
                                <p className="mt-4 font-medium text-gray-900 dark:text-white">
                                    Always verify important journeys with KSRTC directly.
                                </p>
                            </div>
                        </section>

                        {/* Non-Commercial */}
                        <section>
                            <h2 className="flex items-center text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                <Shield className="w-5 h-5 mr-2 text-emerald-500" />
                                No Commercial Use
                            </h2>
                            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                                <p>
                                    PutturBus is a <strong>non-profit, non-commercial project</strong> created exclusively for educational and social welfare purposes.
                                </p>
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li>We do NOT sell user data.</li>
                                    <li>We do NOT run commercial advertisements.</li>
                                    <li>We do NOT collect user payments.</li>
                                    <li>We do NOT resell KSRTC information.</li>
                                </ul>
                            </div>
                        </section>

                        {/* Liability */}
                        <section>
                            <h2 className="flex items-center text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                <Gavel className="w-5 h-5 mr-2 text-red-500" />
                                Liability Protection
                            </h2>
                            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                                <p>
                                    PutturBus, Sitexar, Binary Explorers, and the student developers are <strong>not responsible</strong> for:
                                </p>
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li>Missed buses or connections.</li>
                                    <li>Schedule changes made by KSRTC.</li>
                                    <li>Travel losses or inconveniences.</li>
                                    <li>Any personal or financial damages resulting from the use of this app.</li>
                                </ul>
                                <p className="mt-4 italic">
                                    This website is provided &ldquo;as is&rdquo; for informational purposes only.
                                </p>
                            </div>
                        </section>

                        {/* Government Relationship */}
                        <section className="bg-gray-50 dark:bg-neutral-800 p-6 rounded-xl">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                🏛️ Government & KSRTC Relationship
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                We respect KSRTC as the official transport authority. This platform exists solely to make public transport information easier to access for citizens. If KSRTC or any authority requests corrections or removals, we will cooperate respectfully and immediately.
                            </p>
                        </section>

                        {/* Intellectual Property */}
                        <section className="bg-gray-50 dark:bg-neutral-800 p-6 rounded-xl">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                🧠 Intellectual Property
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                KSRTC names, routes, and locations belong to their respective owners. PutturBus does not claim ownership of official KSRTC data.
                            </p>
                        </section>

                        {/* Contact */}
                        <section className="border-t border-gray-100 dark:border-neutral-800 pt-8 mt-8">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                📬 Contact for Concerns
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                If you represent KSRTC or a government body and have any concerns, please contact us. We are happy to correct, update, or remove any content as requested.
                            </p>
                            <a
                                href="mailto:support@putturbus.in"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                support@putturbus.in
                            </a>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
