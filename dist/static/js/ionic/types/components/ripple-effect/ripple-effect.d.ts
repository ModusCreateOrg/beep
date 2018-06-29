import { EventListenerEnable } from '../../stencil.core';
import { QueueController } from '../../interface';
export declare class RippleEffect {
    private lastClick;
    el: HTMLElement;
    queue: QueueController;
    enableListener: EventListenerEnable;
    doc: Document;
    tapClick: boolean;
    tapClickChanged(tapClick: boolean): void;
    ionActivated(ev: CustomEvent): void;
    touchStart(ev: TouchEvent): void;
    mouseDown(ev: MouseEvent): void;
    componentDidLoad(): void;
    addRipple(pageX: number, pageY: number): void;
}
