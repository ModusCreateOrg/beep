import { ComponentDidLoad, EventEmitter } from '../../stencil.core';
import { InputChangeEvent, RadioGroupInput } from '../../interface';
export declare class RadioGroup implements ComponentDidLoad, RadioGroupInput {
    private inputId;
    private labelId;
    private radios;
    el: HTMLElement;
    allowEmptySelection: boolean;
    /**
     * The name of the control, which is submitted with the form data.
     */
    name: string;
    disabled: boolean;
    disabledChanged(): void;
    /**
     * the value of the radio group.
     */
    value?: string;
    valueChanged(value: string | undefined): void;
    /**
     * Emitted when the value has changed.
     */
    ionChange: EventEmitter<InputChangeEvent>;
    onRadioDidLoad(ev: Event): void;
    onRadioDidUnload(ev: Event): void;
    onRadioSelect(ev: Event): void;
    componentDidLoad(): void;
    private updateRadios();
    hostData(): any;
}
