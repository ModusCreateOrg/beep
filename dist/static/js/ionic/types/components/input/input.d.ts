import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
import { Color, InputChangeEvent, Mode, StyleEvent } from '../../interface';
import { InputComponent } from './input-base';
export declare class Input implements InputComponent {
    private nativeInput;
    didBlurAfterEdit: boolean;
    mode: Mode;
    color?: Color;
    el: HTMLElement;
    /**
     * Emitted when a keyboard input ocurred.
     */
    ionInput: EventEmitter<KeyboardEvent>;
    /**
     * Emitted when the value has changed.
     */
    ionChange: EventEmitter<InputChangeEvent>;
    /**
     * Emitted when the styles change.
     */
    ionStyle: EventEmitter<StyleEvent>;
    /**
     * Emitted when the input loses focus.
     */
    ionBlur: EventEmitter<void>;
    /**
     * Emitted when the input has focus.
     */
    ionFocus: EventEmitter<void>;
    /**
     * Emitted when the input has been created.
     */
    ionInputDidLoad: EventEmitter<void>;
    /**
     * Emitted when the input has been removed.
     */
    ionInputDidUnload: EventEmitter<void>;
    /**
     * If the value of the type attribute is `"file"`, then this attribute will indicate the types of files that the server accepts, otherwise it will be ignored. The value must be a comma-separated list of unique content type specifiers.
     */
    accept?: string;
    /**
     * Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user. Defaults to `"none"`.
     */
    autocapitalize: string;
    /**
     * Indicates whether the value of the control can be automatically completed by the browser. Defaults to `"off"`.
     */
    autocomplete: string;
    /**
     * Whether autocorrection should be enabled when the user is entering/editing the text value. Defaults to `"off"`.
     */
    autocorrect: string;
    /**
     * This Boolean attribute lets you specify that a form control should have input focus when the page loads. Defaults to `false`.
     */
    autofocus: boolean;
    /**
     * If true, a clear icon will appear in the input when there is a value. Clicking it clears the input. Defaults to `false`.
     */
    clearInput: boolean;
    /**
     * If true, the value will be cleared after focus upon edit. Defaults to `true` when `type` is `"password"`, `false` for all other types.
     */
    clearOnEdit: boolean;
    /**
     * Set the amount of time, in milliseconds, to wait to trigger the `ionChange` event after each keystroke. Default `0`.
     */
    debounce: number;
    protected debounceChanged(): void;
    /**
     * If true, the user cannot interact with the input. Defaults to `false`.
     */
    disabled: boolean;
    protected disabledChanged(): void;
    /**
     * A hint to the browser for which keyboard to display. This attribute applies when the value of the type attribute is `"text"`, `"password"`, `"email"`, or `"url"`. Possible values are: `"verbatim"`, `"latin"`, `"latin-name"`, `"latin-prose"`, `"full-width-latin"`, `"kana"`, `"katakana"`, `"numeric"`, `"tel"`, `"email"`, `"url"`.
     */
    inputmode?: string;
    /**
     * The maximum value, which must not be less than its minimum (min attribute) value.
     */
    max?: string;
    /**
     * If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the maximum number of characters that the user can enter.
     */
    maxlength?: number;
    /**
     * The minimum value, which must not be greater than its maximum (max attribute) value.
     */
    min?: string;
    /**
     * If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the minimum number of characters that the user can enter.
     */
    minlength?: number;
    /**
     * If true, the user can enter more than one value. This attribute applies when the type attribute is set to `"email"` or `"file"`, otherwise it is ignored.
     */
    multiple?: boolean;
    /**
     * The name of the control, which is submitted with the form data.
     */
    name?: string;
    /**
     * A regular expression that the value is checked against. The pattern must match the entire value, not just some subset. Use the title attribute to describe the pattern to help the user. This attribute applies when the value of the type attribute is `"text"`, `"search"`, `"tel"`, `"url"`, `"email"`, or `"password"`, otherwise it is ignored.
     */
    pattern?: string;
    /**
     * Instructional text that shows before the input has a value.
     */
    placeholder?: string;
    /**
     * If true, the user cannot modify the value. Defaults to `false`.
     */
    readonly: boolean;
    /**
     * If true, the user must fill in a value before submitting a form.
     */
    required: boolean;
    /**
     * This is a nonstandard attribute supported by Safari that only applies when the type is `"search"`. Its value should be a nonnegative decimal integer.
     */
    results?: number;
    /**
     * If true, the element will have its spelling and grammar checked. Defaults to `false`.
     */
    spellcheck: boolean;
    /**
     * Works with the min and max attributes to limit the increments at which a value can be set. Possible values are: `"any"` or a positive floating point number.
     */
    step?: string;
    /**
     * The initial size of the control. This value is in pixels unless the value of the type attribute is `"text"` or `"password"`, in which case it is an integer number of characters. This attribute applies only when the `type` attribute is set to `"text"`, `"search"`, `"tel"`, `"url"`, `"email"`, or `"password"`, otherwise it is ignored.
     */
    size?: number;
    /**
     * The type of control to display. The default type is text. Possible values are: `"text"`, `"password"`, `"email"`, `"number"`, `"search"`, `"tel"`, or `"url"`.
     */
    type: string;
    /**
     * The value of the input.
     */
    value: string;
    /**
     * Update the native input element when the value changes
     */
    protected valueChanged(): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    private emitStyle();
    private onInput(ev);
    private onBlur();
    private onFocus();
    private focusChanged();
    private inputKeydown();
    /**
     * Check if we need to clear the text input if clearOnEdit is enabled
     */
    private checkClearOnEdit();
    private clearTextInput();
    private hasFocus();
    private hasValue();
    render(): JSX.Element[];
}
