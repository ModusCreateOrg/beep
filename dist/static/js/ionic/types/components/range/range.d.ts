import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
import { BaseInput, Color, Mode, RangeInputChangeEvent, StyleEvent } from '../../interface';
import { RangeEventDetail, RangeValue } from './range-interface';
export declare class Range implements BaseInput {
    private noUpdate;
    private rect;
    private hasFocus;
    el: HTMLStencilElement;
    private ratioA;
    private ratioB;
    private pressedKnob;
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
     * How long, in milliseconds, to wait to trigger the
     * `ionChange` event after each change in the range value. Default `0`.
     */
    debounce: number;
    protected debounceChanged(): void;
    /**
     * The name of the control, which is submitted with the form data.
     */
    name: string;
    /**
     * Show two knobs. Defaults to `false`.
     */
    dualKnobs: boolean;
    /**
     * Minimum integer value of the range. Defaults to `0`.
     */
    min: number;
    /**
     * Maximum integer value of the range. Defaults to `100`.
     */
    max: number;
    /**
     * If true, a pin with integer value is shown when the knob
     * is pressed. Defaults to `false`.
     */
    pin: boolean;
    /**
     * If true, the knob snaps to tick marks evenly spaced based
     * on the step property value. Defaults to `false`.
     */
    snaps: boolean;
    /**
     * Specifies the value granularity. Defaults to `1`.
     */
    step: number;
    disabled: boolean;
    protected disabledChanged(): void;
    /**
     * the value of the range.
     */
    value: any;
    protected valueChanged(value: RangeValue): void;
    /**
     * Emitted when the value property has changed.
     */
    ionChange: EventEmitter<RangeInputChangeEvent>;
    /**
     * Emitted when the styles change.
     */
    ionStyle: EventEmitter<StyleEvent>;
    /**
     * Emitted when the range has focus.
     */
    ionFocus: EventEmitter<void>;
    /**
     * Emitted when the range loses focus.
     */
    ionBlur: EventEmitter<void>;
    componentWillLoad(): void;
    keyChng(ev: CustomEvent<RangeEventDetail>): void;
    private getValue();
    private emitStyle();
    private fireBlur();
    private fireFocus();
    private onDragStart(detail);
    private onDragMove(detail);
    private onDragEnd(detail);
    private update(currentX);
    private readonly valA;
    private readonly valB;
    private readonly ratioLower;
    private readonly ratioUpper;
    private updateRatio();
    private updateValue();
    hostData(): {
        class: {
            'range-disabled': boolean;
            'range-pressed': boolean;
            'range-has-pin': boolean;
        };
    };
    render(): JSX.Element[];
}
export declare function ratioToValue(ratio: number, min: number, max: number, step: number): number;
export declare function valueToRatio(value: number, min: number, max: number): number;
