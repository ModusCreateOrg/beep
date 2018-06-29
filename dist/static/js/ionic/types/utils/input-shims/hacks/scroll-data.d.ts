export interface ScrollData {
    scrollAmount: number;
    scrollPadding: number;
    scrollDuration: number;
    inputSafeY: number;
}
export declare function getScrollData(componentEl: HTMLElement, contentEl: HTMLElement, keyboardHeight: number): ScrollData;
