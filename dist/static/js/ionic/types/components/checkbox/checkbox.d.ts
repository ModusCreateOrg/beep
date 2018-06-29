import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
import { CheckboxInput, CheckedInputChangeEvent, Color, Mode, StyleEvent } from '../../interface';
export declare class Checkbox implements CheckboxInput {
    private inputId;
    private labelId;
    el: HTMLElement;
    keyFocus: boolean;
    /**
     * The color to use.
     * Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`.
     */
    color?: Color;
    /**
     * The mode determines which platform styles to use.
     * Possible values are: `"ios"` or `"md"`.
     */
    mode: Mode;
    /**
     * The name of the control, which is submitted with the form data.
     */
    name: string;
    /**
     * If true, the checkbox is selected. Defaults to `false`.
     */
    checked: boolean;
    /**
     * If true, the user cannot interact with the checkbox. Defaults to `false`.
     */
    disabled: boolean;
    /**
     * the value of the checkbox.
     */
    value: string;
    /**
     * Emitted when the checked property has changed.
     */
    ionChange: EventEmitter<CheckedInputChangeEvent>;
    /**
     * Emitted when the toggle has focus.
     */
    ionFocus: EventEmitter<void>;
    /**
     * Emitted when the toggle loses focus.
     */
    ionBlur: EventEmitter<void>;
    /**
     * Emitted when the styles change.
     */
    ionStyle: EventEmitter<StyleEvent>;
    componentWillLoad(): void;
    componentDidLoad(): void;
    checkedChanged(isChecked: boolean): void;
    emitStyle(): void;
    onChange(): void;
    onKeyUp(): void;
    onFocus(): void;
    onBlur(): void;
    hostData(): {
        class: {
            'checkbox-checked': boolean;
            'checkbox-disabled': boolean;
            'checkbox-key': boolean;
        };
    };
    render(): JSX.Element[];
}
