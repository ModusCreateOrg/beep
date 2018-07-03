import { debounceEvent, deferEvent } from '../../utils/helpers';
import { createThemedClasses } from '../../utils/theme';
export class Textarea {
    constructor() {
        this.didBlurAfterEdit = false;
        /**
         * Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user. Defaults to `"none"`.
         */
        this.autocapitalize = 'none';
        /**
         * Indicates whether the value of the control can be automatically completed by the browser. Defaults to `"off"`.
         */
        this.autocomplete = 'off';
        /**
         * This Boolean attribute lets you specify that a form control should have input focus when the page loads. Defaults to `false`.
         */
        this.autofocus = false;
        /**
         * If true, the value will be cleared after focus upon edit. Defaults to `true` when `type` is `"password"`, `false` for all other types.
         */
        this.clearOnEdit = false;
        /**
         * Set the amount of time, in milliseconds, to wait to trigger the `ionChange` event after each keystroke. Default `0`.
         */
        this.debounce = 0;
        /**
         * If true, the user cannot interact with the textarea. Defaults to `false`.
         */
        this.disabled = false;
        /**
         * If true, the user cannot modify the value. Defaults to `false`.
         */
        this.readonly = false;
        /**
         * If true, the user must fill in a value before submitting a form.
         */
        this.required = false;
        /**
         * If true, the element will have its spelling and grammar checked. Defaults to `false`.
         */
        this.spellcheck = false;
        /**
         * The value of the textarea.
         */
        this.value = '';
    }
    debounceChanged() {
        this.ionChange = debounceEvent(this.ionChange, this.debounce);
    }
    disabledChanged() {
        this.emitStyle();
    }
    /**
     * Update the native input element when the value changes
     */
    valueChanged() {
        const inputEl = this.el.querySelector('textarea');
        const value = this.value;
        if (inputEl.value !== value) {
            inputEl.value = value;
        }
        this.ionChange.emit({ value });
    }
    componentDidLoad() {
        this.ionStyle = deferEvent(this.ionStyle);
        this.debounceChanged();
        this.emitStyle();
    }
    emitStyle() {
        this.ionStyle.emit({
            'interactive': true,
            'textarea': true,
            'input': true,
            'input-disabled': this.disabled,
            'input-has-value': this.hasValue(),
            'input-has-focus': this.hasFocus()
        });
    }
    clearTextInput() {
        this.value = '';
    }
    onInput(ev) {
        this.value = ev.target && ev.target.value || '';
        this.emitStyle();
        this.ionInput.emit(ev);
    }
    onFocus() {
        this.focusChange();
        this.emitStyle();
        this.ionFocus.emit();
    }
    onBlur() {
        this.focusChange();
        this.emitStyle();
        this.ionBlur.emit();
    }
    onKeyDown() {
        this.checkClearOnEdit();
    }
    /**
     * Check if we need to clear the text input if clearOnEdit is enabled
     */
    checkClearOnEdit() {
        if (!this.clearOnEdit) {
            return;
        }
        // Did the input value change after it was blurred and edited?
        if (this.didBlurAfterEdit && this.hasValue()) {
            // Clear the input
            this.clearTextInput();
        }
        // Reset the flag
        this.didBlurAfterEdit = false;
    }
    focusChange() {
        // If clearOnEdit is enabled and the input blurred but has a value, set a flag
        if (this.clearOnEdit && !this.hasFocus() && this.hasValue()) {
            this.didBlurAfterEdit = true;
        }
    }
    hasFocus() {
        // check if an input has focus or not
        return this.el && (this.el.querySelector(':focus') === this.el.querySelector('textarea'));
    }
    hasValue() {
        return this.value !== '';
    }
    render() {
        const themedClasses = createThemedClasses(this.mode, this.color, 'native-textarea');
        // TODO aria-labelledby={this.item.labelId}
        return (h("textarea", { autoCapitalize: this.autocapitalize, 
            // autoComplete={this.autocomplete}
            autoFocus: this.autofocus, disabled: this.disabled, maxLength: this.maxlength, minLength: this.minlength, name: this.name, placeholder: this.placeholder, readOnly: this.readonly, required: this.required, spellCheck: this.spellcheck, cols: this.cols, rows: this.rows, wrap: this.wrap, class: themedClasses, onInput: this.onInput.bind(this), onBlur: this.onBlur.bind(this), onFocus: this.onFocus.bind(this), onKeyDown: this.onKeyDown.bind(this) }, this.value));
    }
    static get is() { return "ion-textarea"; }
    static get host() { return {
        "theme": "textarea"
    }; }
    static get properties() { return {
        "autocapitalize": {
            "type": String,
            "attr": "autocapitalize"
        },
        "autocomplete": {
            "type": String,
            "attr": "autocomplete"
        },
        "autofocus": {
            "type": Boolean,
            "attr": "autofocus"
        },
        "clearOnEdit": {
            "type": Boolean,
            "attr": "clear-on-edit",
            "mutable": true
        },
        "cols": {
            "type": Number,
            "attr": "cols"
        },
        "debounce": {
            "type": Number,
            "attr": "debounce",
            "watchCallbacks": ["debounceChanged"]
        },
        "disabled": {
            "type": Boolean,
            "attr": "disabled",
            "watchCallbacks": ["disabledChanged"]
        },
        "el": {
            "elementRef": true
        },
        "maxlength": {
            "type": Number,
            "attr": "maxlength"
        },
        "minlength": {
            "type": Number,
            "attr": "minlength"
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "placeholder": {
            "type": String,
            "attr": "placeholder"
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "required": {
            "type": Boolean,
            "attr": "required"
        },
        "rows": {
            "type": Number,
            "attr": "rows"
        },
        "spellcheck": {
            "type": Boolean,
            "attr": "spellcheck"
        },
        "value": {
            "type": String,
            "attr": "value",
            "mutable": true,
            "watchCallbacks": ["valueChanged"]
        },
        "wrap": {
            "type": String,
            "attr": "wrap"
        }
    }; }
    static get events() { return [{
            "name": "ionChange",
            "method": "ionChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionInput",
            "method": "ionInput",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionStyle",
            "method": "ionStyle",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionBlur",
            "method": "ionBlur",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionFocus",
            "method": "ionFocus",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:ion-textarea:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-textarea:**/"; }
}
