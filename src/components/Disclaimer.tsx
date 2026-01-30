import Link from 'next/link';

export function Disclaimer() {
    return (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 m-4 rounded-r-lg">
            <div className="flex">
                <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                        <span className="font-bold block mb-1">Unofficial Student Project</span>
                        This website is NOT affiliated with KSRTC. For official bookings and inquiries, please visit{' '}
                        <a
                            href="https://ksrtc.in"
                            target="_blank"
                            rel="noopener"
                            className="font-medium underline hover:text-yellow-800"
                        >
                            ksrtc.in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
