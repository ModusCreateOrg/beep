import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
import { AlertButton, AlertInput, Animation, AnimationBuilder, Color, Config, Mode } from '../../interface';
import { OverlayEventDetail, OverlayInterface } from '../../utils/overlays';
export declare class Alert implements OverlayInterface {
    private activeId?;
    private inputType?;
    private processedInputs;
    presented: boolean;
    animation?: Animation;
    color: Color;
    mode: Mode;
    el: HTMLStencilElement;
    animationCtrl: HTMLIonAnimationControllerElement;
    config: Config;
    overlayId: number;
    keyboardClose: boolean;
    /**
     * Animation to use when the alert is presented.
     */
    enterAnimation?: AnimationBuilder;
    /**
     * Animation to use when the alert is dismissed.
     */
    leaveAnimation?: AnimationBuilder;
    /**
     * Additional classes to apply for custom CSS. If multiple classes are
     * provided they should be separated by spaces.
     */
    cssClass?: string | string[];
    /**
     * The main title in the heading of the alert.
     */
    header?: string;
    /**
     * The subtitle in the heading of the alert. Displayed under the title.
     */
    subHeader?: string;
    /**
     * The main message to be displayed in the alert.
     */
    message?: string;
    /**
     * Array of buttons to be added to the alert.
     */
    buttons: AlertButton[];
    /**
     * Array of input to show in the alert.
     */
    inputs: AlertInput[];
    /**
     * If true, the alert will be dismissed when the backdrop is clicked. Defaults to `true`.
     */
    enableBackdropDismiss: boolean;
    /**
     * If true, the alert will be translucent. Defaults to `false`.
     */
    translucent: boolean;
    /**
     * If true, the alert will animate. Defaults to `true`.
     */
    willAnimate: boolean;
    /**
     * Emitted after the alert has presented.
     */
    ionAlertDidLoad: EventEmitter<void>;
    /**
     * Emitted before the alert has presented.
     */
    ionAlertDidUnload: EventEmitter<void>;
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
    inputsChanged(): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    protected onBackdropTap(): void;
    protected dispatchCancelHandler(ev: CustomEvent): void;
    /**
     * Present the alert overlay after it has been created.
     */
    present(): Promise<void>;
    /**
     * Dismiss the alert overlay after it has been presented.
     */
    dismiss(data?: any, role?: string): Promise<void>;
    /**
     * Returns a promise that resolves when the alert did dismiss. It also accepts a callback
     * that is called in the same circustances.
     *
     * ```
     * const {data, role} = await alert.onDidDismiss();
     * ```
     */
    onDidDismiss(callback?: (detail: OverlayEventDetail) => void): Promise<OverlayEventDetail>;
    /**
     * Returns a promise that resolves when the alert will dismiss. It also accepts a callback
     * that is called in the same circustances.
     *
     * ```
     * const {data, role} = await alert.onWillDismiss();
     * ```
     */
    onWillDismiss(callback?: (detail: OverlayEventDetail) => void): Promise<OverlayEventDetail>;
    private rbClick(selectedInput);
    private cbClick(selectedInput);
    private buttonClick(button);
    private callButtonHandler(button);
    private getValues();
    private renderAlertInputs(labelledBy);
    private renderCheckbox(labelledby);
    private renderRadio(labelledby);
    private renderInput(labelledby);
    hostData(): {
        role: string;
        style: {
            zIndex: number;
        };
        class: {
            [x: string]: boolean;
        };
    };
    render(): JSX.Element[];
}
