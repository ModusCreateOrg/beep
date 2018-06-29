import { RouteChain, RouteRedirect, RouteTree } from './interface';
export declare function readRedirects(root: Element): RouteRedirect[];
export declare function readRoutes(root: Element): RouteChain[];
export declare function readRouteNodes(root: Element, node?: Element): RouteTree;
export declare function readProp(el: HTMLElement, prop: string): string | null;
export declare function flattenRouterTree(nodes: RouteTree): RouteChain[];
