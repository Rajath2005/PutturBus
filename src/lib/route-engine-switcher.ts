
import localRoutes from "@/data/bus-routes.json"
import intercityRoutes from "@/data/intercity-buses.json"
import { isIntercityDest } from "@/lib/route-matcher"
import { Bus } from "@/types/bus"
import { IntercityBus } from "@/types/intercity"

export type RouteType = 'local' | 'intercity';

interface RouteResult {
    type: RouteType;
    data: Bus[] | IntercityBus[];
}

export function getRoutes(from: string, to: string): RouteResult {
    // Determine if it's an intercity destination
    // "to" must be the canonical name found via findDestination or otherwise passed in
    const isIntercity = isIntercityDest(to);

    if (isIntercity) {
        // Filter Intercity
        const routes = intercityRoutes.filter(r =>
            r.to.toLowerCase() === to.toLowerCase() &&
            r.from.toLowerCase() === from.toLowerCase()
        ) as IntercityBus[];

        return { type: 'intercity', data: routes };
    } else {
        // Filter Local
        // Note: Local routes might use 'Statebank' for 'Mangalore'
        const routes = localRoutes.filter(r =>
            r.to.toLowerCase() === to.toLowerCase()
        ) as Bus[];

        return { type: 'local', data: routes };
    }
}
