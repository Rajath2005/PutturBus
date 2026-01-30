import { Metadata } from 'next';
import { RoutePageClient } from '@/components/RoutePageClient';

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    // slug format: puttur-to-dest-name
    const destPart = slug.replace(/^puttur-to-/, '').replace(/-/g, ' ');
    const niceName = destPart.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    return {
        title: `Puttur to ${niceName} Bus Timings | PutturBus`,
        description: `Latest KSRTC bus timings, route map, and stops for Puttur to ${niceName}.`,
    };
}

export default async function RoutePage({ params }: Props) {
    const { slug } = await params;
    return <RoutePageClient slug={slug} />;
}
