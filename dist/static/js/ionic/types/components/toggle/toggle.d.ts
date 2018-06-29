import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
import { CheckboxInput, CheckedInputChangeEvent, Color, Mode, StyleEvent } from '../../interface';
export declare class Toggle implements CheckboxInput {
    private inputId;
    private nativeInput;
    private pivotX;
    activated: boolean;
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
    /**
     * If true, the toggle is selected. Defaults to `false`.
     */
    checked: boolean;
    disabled: boolean;
    /**
     * the value of the toggle.
     */
    value: string;
    /**
     * Emitted when the value property has changed.
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
    checkedChanged(isChecked: boolean): void;
    emitStyle(): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    private onDragStart(detail);
    private onDragMove(detail);
    private onDragEnd(detail);
    private onChange();
    private onKeyUp();
    private onFocus();
    private onBlur();
    hostData(): {
        class: {
            'toggle-activated': boolean;
            'toggle-checked': boolean;
            'toggle-disabled': boolean;
            'toggle-key': boolean;
        };
    };
    render(): JSX.Element[];
}
