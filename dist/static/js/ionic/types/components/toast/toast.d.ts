import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
import { Animation, AnimationBuilder, Color, Config, Mode } from '../../interface';
import { OverlayEventDetail, OverlayInterface } from '../../utils/overlays';
export declare class Toast implements OverlayInterface {
    private durationTimeout;
    presented: boolean;
    el: HTMLElement;
    mode: Mode;
    color?: Color;
    animation: Animation | undefined;
    animationCtrl: HTMLIonAnimationControllerElement;
    config: Config;
    overlayId: number;
    keyboardClose: boolean;
    /**
     * Animation to use when the toast is presented.
     */
    enterAnimation?: AnimationBuilder;
    /**
     * Animation to use when the toast is dismissed.
     */
    leaveAnimation?: AnimationBuilder;
    /**
     * Text to display in the close button.
     */
    closeButtonText?: string;
    /**
     * Additional classes to apply for custom CSS. If multiple classes are
     * provided they should be separated by spaces.
     */
    cssClass?: string | string[];
    /**
     * How many milliseconds to wait before hiding the toast. By default, it will show
     * until `dismiss()` is called.
     */
    duration?: number;
    /**
     * Message to be shown in the toast.
     */
    message?: string;
    /**
     * The position of the toast on the screen. Possible values: "top", "middle", "bottom".
     */
    position?: string;
    /**
     * If true, the close button will be displayed. Defaults to `false`.
     */
    showCloseButton: boolean;
    /**
     * If true, the toast will be translucent. Defaults to `false`.
     */
    translucent: boolean;
    /**
     * If true, the toast will animate. Defaults to `true`.
     */
    willAnimate: boolean;
    /**
     * Emitted after the toast has loaded.
     */
    ionToastDidLoad: EventEmitter<void>;
    /**
     * Emitted after the toast has presented.
     */
    didPresent: EventEmitter<void>;
    /**
     * Emitted before the toast has presented.
     */
    willPresent: EventEmitter<void>;
    /**
     * Emitted before the toast has dismissed.
     */
    willDismiss: EventEmitter<OverlayEventDetail>;
    /**
     * Emitted after the toast has dismissed.
     */
    didDismiss: EventEmitter<OverlayEventDetail>;
    /**
     * Emitted after the toast has unloaded.
     */
    ionToastDidUnload: EventEmitter<void>;
    componentDidLoad(): void;
    componentDidUnload(): void;
    protected onDismiss(ev: UIEvent): void;
    /**
     * Present the toast overlay after it has been created.
     */
    present(): Promise<void>;
    /**
     * Dismiss the toast overlay after it has been presented.
     */
    dismiss(data?: any, role?: string): Promise<void>;
    /**
     * Returns a promise that resolves when the toast did dismiss. It also accepts a callback
     * that is called in the same circustances.
     *
     * ```
     * const {data, role} = await toast.onDidDismiss();
     * ```
     */
    onDidDismiss(callback?: (detail: OverlayEventDetail) => void): Promise<OverlayEventDetail>;
    /**
     * Returns a promise that resolves when the toast will dismiss. It also accepts a callback
     * that is called in the same circustances.
     *
     * ```
     * const {data, role} = await toast.onWillDismiss();
     * ```
     */
    onWillDismiss(callback?: (detail: OverlayEventDetail) => void): Promise<OverlayEventDetail>;
    hostData(): {
        class: {
            [x: string]: boolean;
        };
    };
    render(): JSX.Element;
}
