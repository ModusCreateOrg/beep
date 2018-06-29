import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
import { Color, InputChangeEvent, Mode, StyleEvent } from '../../interface';
import { TextareaComponent } from '../input/input-base';
export declare class Textarea implements TextareaComponent {
    mode: Mode;
    color?: Color;
    didBlurAfterEdit: boolean;
    el: HTMLElement;
    /**
     * Emitted when the input value has changed.
     */
    ionChange: EventEmitter<InputChangeEvent>;
    /**
     * Emitted when a keyboard input ocurred.
     */
    ionInput: EventEmitter<KeyboardEvent>;
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
     * Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user. Defaults to `"none"`.
     */
    autocapitalize: string;
    /**
     * Indicates whether the value of the control can be automatically completed by the browser. Defaults to `"off"`.
     */
    autocomplete: string;
    /**
     * This Boolean attribute lets you specify that a form control should have input focus when the page loads. Defaults to `false`.
     */
    autofocus: boolean;
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
     * If true, the user cannot interact with the textarea. Defaults to `false`.
     */
    disabled: boolean;
    protected disabledChanged(): void;
    /**
     * If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the maximum number of characters that the user can enter.
     */
    maxlength?: number;
    /**
     * If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the minimum number of characters that the user can enter.
     */
    minlength?: number;
    /**
     * The name of the control, which is submitted with the form data.
     */
    name?: string;
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
     * If true, the element will have its spelling and grammar checked. Defaults to `false`.
     */
    spellcheck: boolean;
    /**
     * The visible width of the text control, in average character widths. If it is specified, it must be a positive integer.
     */
    cols?: number;
    /**
     * The number of visible text lines for the control.
     */
    rows?: number;
    /**
     * Indicates how the control wraps text. Possible values are: `"hard"`, `"soft"`, `"off"`.
     */
    wrap?: string;
    /**
     * The value of the textarea.
     */
    value: string;
    /**
     * Update the native input element when the value changes
     */
    protected valueChanged(): void;
    componentDidLoad(): void;
    private emitStyle();
    private clearTextInput();
    private onInput(ev);
    private onFocus();
    private onBlur();
    private onKeyDown();
    /**
     * Check if we need to clear the text input if clearOnEdit is enabled
     */
    private checkClearOnEdit();
    private focusChange();
    private hasFocus();
    private hasValue();
    render(): JSX.Element;
}
