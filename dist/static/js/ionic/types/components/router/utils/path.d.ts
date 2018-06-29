import { RouteChain } from '../../../interface';
import { RouterIntent } from './interface';
export declare function generatePath(segments: string[]): string;
export declare function chainToPath(chain: RouteChain): string[] | null;
export declare function writePath(history: History, root: string, useHash: boolean, path: string[], intent: RouterIntent, state: number): void;
export declare function removePrefix(prefix: string[], path: string[]): string[] | null;
export declare function readPath(loc: Location, root: string, useHash: boolean): string[] | null;
export declare function parsePath(path: string | undefined | null): string[];
