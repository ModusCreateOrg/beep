import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
import { Config, GestureDetail, Mode, QueueController } from '../../interface';
export declare class Scroll {
    private watchDog;
    private isScrolling;
    private lastScroll;
    private detail;
    private queued;
    el: HTMLElement;
    config: Config;
    queue: QueueController;
    win: Window;
    mode: Mode;
    /**
     * If true and the content does not cause an overflow scroll, the scroll interaction will cause a bounce.
     * If the content exceeds the bounds of ionScroll, nothing will change.
     * Note, the does not disable the system bounce on iOS. That is an OS level setting.
     */
    forceOverscroll?: boolean;
    scrollEvents: boolean;
    /**
     * Emitted when the scroll has started.
     */
    ionScrollStart: EventEmitter<ScrollBaseDetail>;
    /**
     * Emitted while scrolling. This event is disabled by default.
     * Look at the property: `scrollEvents`
     */
    ionScroll: EventEmitter<ScrollDetail>;
    /**
     * Emitted when the scroll has ended.
     */
    ionScrollEnd: EventEmitter<ScrollBaseDetail>;
    constructor();
    componentWillLoad(): void;
    componentDidUnload(): void;
    onScroll(ev: UIEvent): void;
    scrollToTop(duration: number): Promise<void>;
    scrollToBottom(duration: number): Promise<void>;
    scrollByPoint(x: number, y: number, duration: number, done?: Function): Promise<any>;
    scrollToPoint(x: number, y: number, duration: number, done?: Function): Promise<any>;
    private onScrollStart();
    private onScrollEnd();
    hostData(): {
        class: {
            overscroll: boolean | undefined;
        };
    };
    render(): JSX.Element[];
}
export interface ScrollDetail extends GestureDetail, ScrollBaseDetail {
    positions: number[];
    scrollTop: number;
    scrollLeft: number;
}
export interface ScrollBaseDetail {
    isScrolling: boolean;
}
export interface ScrollCallback {
    (detail?: ScrollDetail): boolean | void;
}
