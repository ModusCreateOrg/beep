import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
import { Animation, AnimationBuilder, Color, ComponentProps, ComponentRef, Config, FrameworkDelegate, Mode } from '../../interface';
import { OverlayEventDetail, OverlayInterface } from '../../utils/overlays';
export declare class Popover implements OverlayInterface {
    private usersElement?;
    presented: boolean;
    animation?: Animation;
    el: HTMLElement;
    animationCtrl: HTMLIonAnimationControllerElement;
    config: Config;
    delegate?: FrameworkDelegate;
    overlayId: number;
    keyboardClose: boolean;
    /**
     * The color to use from your Sass `$colors` map.
     * Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`.
     * For more information, see [Theming your App](/docs/theming/theming-your-app).
     */
    color?: Color;
    /**
     * The mode determines which platform styles to use.
     * Possible values are: `"ios"` or `"md"`.
     * For more information, see [Platform Styles](/docs/theming/platform-specific-styles).
     */
    mode: Mode;
    /**
     * Animation to use when the popover is presented.
     */
    enterAnimation?: AnimationBuilder;
    /**
     * Animation to use when the popover is dismissed.
     */
    leaveAnimation?: AnimationBuilder;
    /**
     * The component to display inside of the popover.
     */
    component: ComponentRef;
    /**
     * The data to pass to the popover component.
     */
    componentProps?: ComponentProps;
    /**
     * Additional classes to apply for custom CSS. If multiple classes are
     * provided they should be separated by spaces.
     */
    cssClass?: string | string[];
    /**
     * If true, the popover will be dismissed when the backdrop is clicked. Defaults to `true`.
     */
    enableBackdropDismiss: boolean;
    /**
     * The event to pass to the popover animation.
     */
    ev: any;
    /**
     * If true, a backdrop will be displayed behind the popover. Defaults to `true`.
     */
    showBackdrop: boolean;
    /**
     * If true, the popover will be translucent. Defaults to `false`.
     */
    translucent: boolean;
    /**
     * If true, the popover will animate. Defaults to `true`.
     */
    willAnimate: boolean;
    /**
     * Emitted after the popover has loaded.
     */
    ionPopoverDidLoad: EventEmitter<void>;
    /**
     * Emitted after the popover has unloaded.
     */
    ionPopoverDidUnload: EventEmitter<void>;
    /**
     * Emitted after the popover has presented.
     */
    didPresent: EventEmitter<void>;
    /**
     * Emitted before the popover has presented.
     */
    willPresent: EventEmitter<void>;
    /**
     * Emitted before the popover has dismissed.
     */
    willDismiss: EventEmitter<OverlayEventDetail>;
    /**
     * Emitted after the popover has dismissed.
     */
    didDismiss: EventEmitter<OverlayEventDetail>;
    componentDidLoad(): void;
    componentDidUnload(): void;
    protected onDismiss(ev: UIEvent): void;
    protected onBackdropTap(): void;
    protected lifecycle(modalEvent: CustomEvent): void;
    /**
     * Present the popover overlay after it has been created.
     */
    present(): Promise<void>;
    /**
     * Dismiss the popover overlay after it has been presented.
     */
    dismiss(data?: any, role?: string): Promise<void>;
    /**
     * Returns a promise that resolves when the popover did dismiss. It also accepts a callback
     * that is called in the same circustances.
     *
     * ```
     * const {data, role} = await popover.onDidDismiss();
     * ```
     */
    onDidDismiss(callback?: (detail: OverlayEventDetail) => void): Promise<OverlayEventDetail>;
    /**
     * Returns a promise that resolves when the popover will dismiss. It also accepts a callback
     * that is called in the same circustances.
     *
     * ```
     * const {data, role} = await popover.onWillDismiss();
     * ```
     */
    onWillDismiss(callback?: (detail: OverlayEventDetail) => void): Promise<OverlayEventDetail>;
    hostData(): {
        style: {
            zIndex: number;
        };
        'no-router': boolean;
        class: {
            [x: string]: boolean;
        };
    };
    render(): JSX.Element[];
}
export declare const POPOVER_POSITION_PROPERTIES: any;
