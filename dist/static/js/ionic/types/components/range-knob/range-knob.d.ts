import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
import { Knob } from '../../interface';
export declare class RangeKnob {
    pressed: boolean;
    pin: boolean;
    min: number;
    max: number;
    value: number;
    ratio: number;
    disabled: boolean;
    labelId: string;
    knob: Knob;
    ionIncrease: EventEmitter;
    ionDecrease: EventEmitter;
    handleKeyBoard(ev: KeyboardEvent): void;
    hostData(): {
        class: {
            'range-knob-handle': boolean;
            'range-knob-pressed': boolean;
            'range-knob-min': boolean;
            'range-knob-max': boolean;
        };
        style: {
            'left': string;
        };
        'role': string;
        'tabindex': number;
        'aria-valuemin': number;
        'aria-valuemax': number;
        'aria-disabled': boolean;
        'aria-labelledby': string;
        'aria-valuenow': number;
    };
    render(): JSX.Element;
}
export declare const KEY_LEFT = 37;
export declare const KEY_UP = 38;
export declare const KEY_RIGHT = 39;
export declare const KEY_DOWN = 40;
