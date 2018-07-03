import { EventListenerEnable } from '../../stencil.core';
export declare class TapClick {
    private lastTouch;
    private lastActivated;
    private cancelled;
    private activatableEle?;
    private activeDefer;
    private clearDefers;
    isServer: boolean;
    enableListener: EventListenerEnable;
    el: HTMLElement;
    onBodyClick(ev: Event): void;
    onTouchStart(ev: TouchEvent): void;
    onTouchEnd(ev: TouchEvent): void;
    onMouseDown(ev: MouseEvent): void;
    onMouseUp(ev: TouchEvent): void;
    cancelActive(): void;
    private pointerDown(ev);
    private pointerUp(ev);
    private setActivatedElement(el, ev);
    private addActivated(el, x, y);
    private removeActivated(smooth);
}
