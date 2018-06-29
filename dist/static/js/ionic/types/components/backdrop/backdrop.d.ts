import { EventEmitter } from '../../stencil.core';
export declare class Backdrop {
    private lastClick;
    doc: Document;
    /**
     * If true, the backdrop will be visible. Defaults to `true`.
     */
    visible: boolean;
    /**
     * If true, the backdrop will can be clicked and will emit the `ionBackdropTap` event. Defaults to `true`.
     */
    tappable: boolean;
    /**
     * If true, the backdrop will stop propagation on tap. Defaults to `true`.
     */
    stopPropagation: boolean;
    /**
     * Emitted when the backdrop is tapped.
     */
    ionBackdropTap: EventEmitter<void>;
    componentDidLoad(): void;
    componentDidUnload(): void;
    protected onTouchStart(ev: TouchEvent): void;
    protected onMouseDown(ev: TouchEvent): void;
    private emitTap(ev);
    hostData(): {
        tabindex: string;
        class: {
            'backdrop-hide': boolean;
            'backdrop-no-tappable': boolean;
        };
    };
}
