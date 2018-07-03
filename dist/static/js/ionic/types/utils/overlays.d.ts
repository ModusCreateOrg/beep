import { EventEmitter } from '../stencil.core';
import { Animation, AnimationBuilder, Config, Mode } from '../interface';
/**
 * Convert an interface where all the properties are optional to mandatory.
 */
export declare type Requires<K extends string> = {
    [P in K]: any;
};
export declare function createOverlay<T extends HTMLIonOverlayElement & Requires<keyof B>, B>(element: T, opts: B): Promise<T>;
export declare function dismissOverlay(data: any, role: string | undefined, overlays: OverlayMap, id: number): Promise<void>;
export declare function getTopOverlay<T extends HTMLIonOverlayElement>(overlays: OverlayMap): T;
export declare function getHighestId(overlays: OverlayMap): number;
export declare function removeLastOverlay(overlays: OverlayMap): Promise<void>;
export declare function present(overlay: OverlayInterface, name: string, iosEnterAnimation: AnimationBuilder, mdEnterAnimation: AnimationBuilder, opts?: any): Promise<void>;
export declare function dismiss(overlay: OverlayInterface, data: any | undefined, role: string | undefined, name: string, iosLeaveAnimation: AnimationBuilder, mdLeaveAnimation: AnimationBuilder, opts?: any): Promise<void>;
export declare function autoFocus(containerEl: HTMLElement): HTMLElement | null;
export declare function eventMethod<T>(element: HTMLElement, eventName: string, callback?: (detail: T) => void): Promise<T>;
export declare function onceEvent(element: HTMLElement, eventName: string, callback: (ev: Event) => void): void;
export declare function isCancel(role: string | undefined): boolean;
export interface OverlayEventDetail {
    data?: any;
    role?: string;
}
export interface OverlayInterface {
    mode: Mode;
    el: HTMLElement;
    willAnimate: boolean;
    keyboardClose: boolean;
    config: Config;
    overlayId: number;
    presented: boolean;
    animation?: Animation;
    animationCtrl: HTMLIonAnimationControllerElement;
    enterAnimation?: AnimationBuilder;
    leaveAnimation?: AnimationBuilder;
    didPresent: EventEmitter<void>;
    willPresent: EventEmitter<void>;
    willDismiss: EventEmitter<OverlayEventDetail>;
    didDismiss: EventEmitter<OverlayEventDetail>;
    present(): Promise<void>;
    dismiss(data?: any, role?: string): Promise<void>;
}
export interface OverlayController {
    create(opts?: any): Promise<HTMLElement>;
    dismiss(data?: any, role?: string, alertId?: number): Promise<void>;
    getTop(): HTMLElement;
}
export interface HTMLIonOverlayElement extends HTMLStencilElement {
    overlayId: number;
    dismiss(data?: any, role?: string): Promise<void>;
}
export declare type OverlayMap = Map<number, HTMLIonOverlayElement>;
export declare const BACKDROP = "backdrop";
