export declare const enum Knob {
    None = 0,
    A = 1,
    B = 2,
}
export declare type RangeValue = number | {
    lower: number;
    upper: number;
};
export interface RangeEventDetail extends Event {
    isIncrease: boolean;
    knob: Knob;
}
