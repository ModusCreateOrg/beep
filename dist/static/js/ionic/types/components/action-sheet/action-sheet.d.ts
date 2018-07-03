import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
import { ActionSheetButton, Animation, AnimationBuilder, Color, Config, Mode } from '../../interface';
import { OverlayEventDetail, OverlayInterface } from '../../utils/overlays';
export declare class ActionSheet implements OverlayInterface {
    mode: Mode;
    color?: Color;
    presented: boolean;
    animation?: Animation;
    el: HTMLElement;
    animationCtrl: HTMLIonAnimationControllerElement;
    config: Config;
    overlayId: number;
    keyboardClose: boolean;
    /**
     * Animation to use when the action sheet is presented.
     */
    enterAnimation?: AnimationBuilder;
    /**
     * Animation to use when the action sheet is dismissed.
     */
    leaveAnimation?: AnimationBuilder;
    /**
     * An array of buttons for the action sheet.
     */
    buttons: ActionSheetButton[];
    /**
     * Additional classes to apply for custom CSS. If multiple classes are
     * provided they should be separated by spaces.
     */
    cssClass?: string | string[];
    /**
     * If true, the action sheet will be dismissed when the backdrop is clicked. Defaults to `true`.
     */
    enableBackdropDismiss: boolean;
    /**
     * Title for the action sheet.
     */
    header?: string;
    /**
     * Subtitle for the action sheet.
     */
    subHeader?: string;
    /**
     * If true, the action sheet will be translucent. Defaults to `false`.
     */
    translucent: boolean;
    /**
     * If true, the action sheet will animate. Defaults to `true`.
     */
    willAnimate: boolean;
    /**
     * Emitted after the alert has loaded.
     */
    ionActionSheetDidLoad: EventEmitter<void>;
    /**
     * Emitted after the alert has unloaded.
     */
    ionActionSheetDidUnload: EventEmitter<void>;
    /**
     * Emitted after the alert has presented.
     */
    didPresent: EventEmitter<void>;
    /**
     * Emitted before the alert has presented.
     */
    willPresent: EventEmitter<void>;
    /**
     * Emitted before the alert has dismissed.
     */
    willDismiss: EventEmitter<OverlayEventDetail>;
    /**
     * Emitted after the alert has dismissed.
     */
    didDismiss: EventEmitter<OverlayEventDetail>;
    componentDidLoad(): void;
    componentDidUnload(): void;
    protected onBackdropTap(): void;
    protected dispatchCancelHandler(ev: CustomEvent): void;
    /**
     * Present the action sheet overlay after it has been created.
     */
    present(): Promise<void>;
    /**
     * Dismiss the action sheet overlay after it has been presented.
     */
    dismiss(data?: any, role?: string): Promise<void>;
    /**
     * Returns a promise that resolves when the action-sheet did dismiss. It also accepts a callback
     * that is called in the same circustances.
     *
     * ```
     * const {data, role} = await actionSheet.onDidDismiss();
     * ```
     */
    onDidDismiss(callback?: (detail: OverlayEventDetail) => void): Promise<OverlayEventDetail>;
    /**
     * Returns a promise that resolves when the action-sheet will dismiss. It also accepts a callback
     * that is called in the same circustances.
     *
     * ```
     * const {data, role} = await actionSheet.onWillDismiss();
     * ```
     */
    onWillDismiss(callback?: (detail: OverlayEventDetail) => void): Promise<OverlayEventDetail>;
    protected buttonClick(button: ActionSheetButton): void;
    private callButtonHandler(button);
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
