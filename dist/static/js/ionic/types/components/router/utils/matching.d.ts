import { RouteChain, RouteID, RouteRedirect } from './interface';
export declare function matchesRedirect(input: string[], route: RouteRedirect): route is Required<RouteRedirect>;
export declare function routeRedirect(path: string[], routes: RouteRedirect[]): Required<RouteRedirect> | undefined;
export declare function matchesIDs(ids: string[], chain: RouteChain): number;
export declare function matchesPath(path: string[], chain: RouteChain): RouteChain | null;
export declare function mergeParams(a: any, b: any): any;
export declare function routerIDsToChain(ids: RouteID[], chains: RouteChain[]): RouteChain | null;
export declare function routerPathToChain(path: string[], chains: RouteChain[]): RouteChain | null;
export declare function computePriority(chain: RouteChain): number;
export declare class RouterSegments {
    private path;
    constructor(path: string[]);
    next(): string;
}
