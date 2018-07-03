import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
import { CheckedInputChangeEvent, Color, Mode, RadioButtonInput, StyleEvent } from '../../interface';
export declare class Radio implements RadioButtonInput {
    private inputId;
    private nativeInput;
    keyFocus: boolean;
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
     * The name of the control, which is submitted with the form data.
     */
    name: string;
    disabled: boolean;
    /**
     * If true, the radio is selected. Defaults to `false`.
     */
    checked: boolean;
    /**
     * the value of the radio.
     */
    value: string;
    /**
     * Emitted when the radio loads.
     */
    ionRadioDidLoad: EventEmitter<void>;
    /**
     * Emitted when the radio unloads.
     */
    ionRadioDidUnload: EventEmitter<void>;
    /**
     * Emitted when the styles change.
     */
    ionStyle: EventEmitter<StyleEvent>;
    /**
     * Emitted when the radio button is selected.
     */
    ionSelect: EventEmitter<CheckedInputChangeEvent>;
    /**
     * Emitted when the radio button has focus.
     */
    ionFocus: EventEmitter<void>;
    /**
     * Emitted when the radio button loses focus.
     */
    ionBlur: EventEmitter<void>;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    colorChanged(): void;
    checkedChanged(isChecked: boolean): void;
    disabledChanged(isDisabled: boolean): void;
    emitStyle(): void;
    onClick(): void;
    onChange(): void;
    onKeyUp(): void;
    onFocus(): void;
    onBlur(): void;
    hostData(): {
        'class': {
            'radio-checked': boolean;
            'radio-disabled': boolean;
            'radio-key': boolean;
        };
    };
    render(): JSX.Element[];
}
