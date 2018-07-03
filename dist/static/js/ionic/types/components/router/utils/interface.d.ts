export interface NavOutlet {
    setRouteId(id: string, data: any, direction: RouterIntent): Promise<RouteWrite>;
    getRouteId(): RouteID | undefined;
}
export interface RouterEventDetail {
    from: string | null;
    redirectedFrom: string | null;
    to: string;
}
export declare type RouterDirection = 'forward' | 'back' | 'root';
export declare const enum RouterIntent {
    None = 0,
    Forward = 1,
    Back = -1,
}
export interface RouteRedirect {
    from: string[];
    to?: string[];
}
export interface RouteWrite {
    changed: boolean;
    element: HTMLElement | undefined;
    markVisible?: () => void | Promise<void>;
}
export interface RouteID {
    id: string;
    element: HTMLElement | undefined;
    params?: any;
}
export declare type NavOutletElement = NavOutlet & HTMLStencilElement;
export interface RouteEntry {
    id: string;
    path: string[];
    params: any | undefined;
}
export interface RouteNode extends RouteEntry {
    children: RouteTree;
}
export declare type RouteChain = RouteEntry[];
export declare type RouteTree = RouteNode[];
