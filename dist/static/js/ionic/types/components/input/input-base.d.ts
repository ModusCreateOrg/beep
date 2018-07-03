import { EventEmitter } from '../../stencil.core';
import { StyleEvent } from '../../interface';
export interface InputBaseComponent {
    ionStyle: EventEmitter<StyleEvent>;
    ionBlur: EventEmitter<void>;
    ionFocus: EventEmitter<void>;
    clearOnEdit: boolean;
    didBlurAfterEdit: boolean;
    autocapitalize?: string;
    autocomplete?: string;
    autofocus?: boolean;
    disabled?: boolean;
    minlength?: number;
    maxlength?: number;
    name?: string;
    placeholder?: string;
    readonly?: boolean;
    required?: boolean;
    spellcheck?: boolean;
    value?: string;
}
export interface InputComponent extends InputBaseComponent {
    clearInput: boolean;
    accept?: string;
    autocorrect?: string;
    min?: string;
    max?: string;
    multiple?: boolean;
    pattern?: string;
    results?: number;
    step?: string;
    size?: number;
    type?: string;
}
export interface TextareaComponent extends InputBaseComponent {
    cols?: number;
    rows?: number;
    wrap?: string;
}
