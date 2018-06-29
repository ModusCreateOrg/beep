import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
import { Animation, AnimationBuilder, Color, Config, Mode } from '../../interface';
import { OverlayEventDetail, OverlayInterface } from '../../utils/overlays';
export declare class Loading implements OverlayInterface {
    private durationTimeout;
    presented: boolean;
    animation?: Animation;
    color?: Color;
    mode: Mode;
    el: HTMLElement;
    animationCtrl: HTMLIonAnimationControllerElement;
    config: Config;
    overlayId: number;
    keyboardClose: boolean;
    /**
     * Animation to use when the loading indicator is presented.
     */
    enterAnimation?: AnimationBuilder;
    /**
     * Animation to use when the loading indicator is dismissed.
     */
    leaveAnimation?: AnimationBuilder;
    /**
     * Optional text content to display in the loading indicator.
     */
    content?: string;
    /**
     * Additional classes to apply for custom CSS. If multiple classes are
     * provided they should be separated by spaces.
     */
    cssClass?: string | string[];
    /**
     * If true, the loading indicator will dismiss when the page changes. Defaults to `false`.
     */
    dismissOnPageChange: boolean;
    /**
     * Number of milliseconds to wait before dismissing the loading indicator.
     */
    duration?: number;
    /**
     * If true, the loading indicator will be dismissed when the backdrop is clicked. Defaults to `false`.
     */
    enableBackdropDismiss: boolean;
    /**
     * If true, a backdrop will be displayed behind the loading indicator. Defaults to `true`.
     */
    showBackdrop: boolean;
    /**
     * The name of the spinner to display. Possible values are: `"lines"`, `"lines-small"`, `"dots"`,
     * `"bubbles"`, `"circles"`, `"crescent"`.
     */
    spinner?: string;
    /**
     * If true, the loading indicator will be translucent. Defaults to `false`.
     */
    translucent: boolean;
    /**
     * If true, the loading indicator will animate. Defaults to `true`.
     */
    willAnimate: boolean;
    /**
     * Emitted after the loading has unloaded.
     */
    ionLoadingDidUnload: EventEmitter<void>;
    /**
     * Emitted after the loading has loaded.
     */
    ionLoadingDidLoad: EventEmitter<void>;
    /**
     * Emitted after the loading has presented.
     */
    didPresent: EventEmitter<void>;
    /**
     * Emitted before the loading has presented.
     */
    willPresent: EventEmitter<void>;
    /**
     * Emitted before the loading has dismissed.
     */
    willDismiss: EventEmitter<OverlayEventDetail>;
    /**
     * Emitted after the loading has dismissed.
     */
    didDismiss: EventEmitter<OverlayEventDetail>;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    protected onBackdropTap(): void;
    /**
     * Present the loading overlay after it has been created.
     */
    present(): Promise<void>;
    /**
     * Dismiss the loading overlay after it has been presented.
     */
    dismiss(data?: any, role?: string): Promise<void>;
    /**
     * Returns a promise that resolves when the loading did dismiss. It also accepts a callback
     * that is called in the same circustances.
     *
     * ```
     * const {data, role} = await loading.onDidDismiss();
     * ```
     */
    onDidDismiss(callback?: (detail: OverlayEventDetail) => void): Promise<OverlayEventDetail>;
    /**
     * Returns a promise that resolves when the loading will dismiss. It also accepts a callback
     * that is called in the same circustances.
     *
     * ```
     * const {data, role} = await loading.onWillDismiss();
     * ```
     */
    onWillDismiss(callback?: (detail: OverlayEventDetail) => void): Promise<OverlayEventDetail>;
    hostData(): {
        style: {
            zIndex: number;
        };
        class: {
            [x: string]: boolean;
        };
    };
    render(): JSX.Element[];
}
