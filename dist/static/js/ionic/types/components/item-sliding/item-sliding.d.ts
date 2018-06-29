import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
export declare class ItemSliding {
    private item;
    private list;
    private openAmount;
    private initialOpenAmount;
    private optsWidthRightSide;
    private optsWidthLeftSide;
    private sides;
    private tmr;
    private leftOptions?;
    private rightOptions?;
    private optsDirty;
    el: HTMLIonItemSlidingElement;
    private state;
    /**
     * Emitted when the sliding position changes.
     */
    ionDrag: EventEmitter;
    componentDidLoad(): void;
    componentDidUnload(): void;
    /**
     * Get the amount the item is open in pixels.
     */
    getOpenAmount(): number;
    /**
     * Get the ratio of the open amount of the item compared to the width of the options.
     * If the number returned is positive, then the options on the right side are open.
     * If the number returned is negative, then the options on the left side are open.
     * If the absolute value of the number is greater than 1, the item is open more than
     * the width of the options.
     */
    getSlidingRatio(): number;
    /**
     * Close the sliding item. Items can also be closed from the [List](../../list/List).
     */
    close(): void;
    /**
     * Close all of the sliding items in the list. Items can also be closed from the [List](../../list/List).
     */
    closeOpened(): boolean;
    private updateOptions();
    private canStart();
    private onDragStart();
    private onDragMove(gesture);
    private onDragEnd(gesture);
    private calculateOptsWidth();
    private setOpenAmount(openAmount, isFinal);
    hostData(): {
        class: {
            'item-sliding': boolean;
            'item-sliding-active-slide': boolean;
            'item-sliding-active-options-right': boolean;
            'item-sliding-active-options-left': boolean;
            'item-sliding-active-swipe-right': boolean;
            'item-sliding-active-swipe-left': boolean;
        };
    };
    render(): JSX.Element;
}
/** @hidden */
export declare function swipeShouldReset(isResetDirection: boolean, isMovingFast: boolean, isOnResetZone: boolean): boolean;
