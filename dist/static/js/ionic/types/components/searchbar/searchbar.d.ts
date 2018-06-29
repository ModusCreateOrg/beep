import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
import { Color, InputChangeEvent, Mode } from '../../interface';
export declare class Searchbar {
    private nativeInput;
    private isCancelVisible;
    private shouldBlur;
    private shouldAlignLeft;
    el: HTMLElement;
    doc: Document;
    activated: boolean;
    focused: boolean;
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
     * If true, enable searchbar animation. Default `false`.
     */
    animated: boolean;
    /**
     * Set the input's autocomplete property. Values: `"on"`, `"off"`. Default `"off"`.
     */
    autocomplete: string;
    /**
     * Set the input's autocorrect property. Values: `"on"`, `"off"`. Default `"off"`.
     */
    autocorrect: string;
    /**
     * Set the the cancel button text. Default: `"Cancel"`.
     */
    cancelButtonText: string;
    /**
     * Set the amount of time, in milliseconds, to wait to trigger the `ionChange` event after each keystroke. Default `250`.
     */
    debounce: number;
    protected debounceChanged(): void;
    /**
     * Set the input's placeholder. Default `"Search"`.
     */
    placeholder: string;
    /**
     * If true, show the cancel button. Default `false`.
     */
    showCancelButton: boolean;
    /**
     * If true, enable spellcheck on the input. Default `false`.
     */
    spellcheck: boolean;
    /**
     * Set the type of the input. Values: `"text"`, `"password"`, `"email"`, `"number"`, `"search"`, `"tel"`, `"url"`. Default `"search"`.
     */
    type: string;
    /**
     * the value of the searchbar.
     */
    value: string;
    /**
     * Emitted when a keyboard input ocurred.
     */
    ionInput: EventEmitter<KeyboardEvent>;
    /**
     * Emitted when the value has changed.
     */
    ionChange: EventEmitter<InputChangeEvent>;
    /**
     * Emitted when the cancel button is clicked.
     */
    ionCancel: EventEmitter<void>;
    /**
     * Emitted when the clear input button is clicked.
     */
    ionClear: EventEmitter<void>;
    /**
     * Emitted when the input loses focus.
     */
    ionBlur: EventEmitter<void>;
    /**
     * Emitted when the input has focus.
     */
    ionFocus: EventEmitter<void>;
    protected valueChanged(): void;
    componentDidLoad(): void;
    /**
     * Clears the input field and triggers the control change.
     */
    private clearInput();
    /**
     * Clears the input field and tells the input to blur since
     * the clearInput function doesn't want the input to blur
     * then calls the custom cancel function if the user passed one in.
     */
    private cancelSearchbar();
    /**
     * Update the Searchbar input value when the input changes
     */
    private onInput(ev);
    private inputUpdated();
    /**
     * Sets the Searchbar to not focused and checks if it should align left
     * based on whether there is a value in the searchbar or not.
     */
    private onBlur();
    /**
     * Sets the Searchbar to focused and active on input focus.
     */
    private onFocus();
    /**
     * Positions the input search icon, placeholder, and the cancel button
     * based on the input value and if it is focused. (ios only)
     */
    private positionElements();
    /**
     * Positions the input placeholder
     */
    private positionPlaceholder();
    /**
     * Show the iOS Cancel button on focus, hide it offscreen otherwise
     */
    private positionCancelButton();
    hostData(): {
        class: {
            'searchbar-active': boolean;
            'searchbar-animated': boolean;
            'searchbar-has-value': boolean;
            'searchbar-show-cancel': boolean;
            'searchbar-left-aligned': boolean;
            'searchbar-has-focus': boolean;
        };
    };
    render(): (JSX.Element | null)[];
}
