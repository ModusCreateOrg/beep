import { EventEmitter } from '../stencil.core';
export declare function reorderArray(array: any[], indexes: {
    from: number;
    to: number;
}): any[];
export declare function clamp(min: number, n: number, max: number): number;
export declare function assert(actual: any, reason: string): void;
export declare function now(ev: UIEvent): number;
export declare function pointerCoord(ev: any): {
    x: number;
    y: number;
};
export declare type Side = 'start' | 'end';
/**
 * @hidden
 * Given a side, return if it should be on the end
 * based on the value of dir
 * @param side the side
 * @param isRTL whether the application dir is rtl
 */
export declare function isEndSide(win: Window, side: Side): boolean;
export declare function deferEvent(event: EventEmitter): EventEmitter;
export declare function debounceEvent(event: EventEmitter, wait: number): EventEmitter;
export declare function debounce(func: Function, wait?: number): (...args: any[]) => void;
