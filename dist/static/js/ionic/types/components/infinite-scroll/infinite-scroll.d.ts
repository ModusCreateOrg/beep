import { EventEmitter, EventListenerEnable } from '../../stencil.core';
import { QueueController } from '../../interface';
export declare class InfiniteScroll {
    private thrPx;
    private thrPc;
    private scrollEl?;
    private didFire;
    private isBusy;
    el: HTMLElement;
    isLoading: boolean;
    queue: QueueController;
    enableListener: EventListenerEnable;
    /**
     * The threshold distance from the bottom
     * of the content to call the `infinite` output event when scrolled.
     * The threshold value can be either a percent, or
     * in pixels. For example, use the value of `10%` for the `infinite`
     * output event to get called when the user has scrolled 10%
     * from the bottom of the page. Use the value `100px` when the
     * scroll is within 100 pixels from the bottom of the page.
     * Defaults to `15%`.
     */
    threshold: string;
    protected thresholdChanged(val: string): void;
    /**
     * If true, the infinite scroll will be hidden and scroll event listeners
     * will be removed.
     *
     * Call `enable(false)` to disable the infinite scroll from actively
     * trying to receive new data while scrolling. This method is useful
     * when it is known that there is no more data that can be added, and
     * the infinite scroll is no longer needed.
     */
    disabled: boolean;
    protected disabledChanged(val: boolean): void;
    /**
     * The position of the infinite scroll element.
     * The value can be either `top` or `bottom`.
     * Defaults to `bottom`.
     */
    position: 'top' | 'bottom';
    /**
     * Emitted when the scroll reaches
     * the threshold distance. From within your infinite handler,
     * you must call the infinite scroll's `complete()` method when
     * your async operation has completed.
     */
    ionInfinite: EventEmitter<void>;
    componentWillLoad(): Promise<void>;
    componentDidLoad(): void;
    componentDidUnload(): void;
    protected onScroll(): 1 | 2 | 3 | 4;
    /**
     * Call `complete()` within the `infinite` output event handler when
     * your async operation has completed. For example, the `loading`
     * state is while the app is performing an asynchronous operation,
     * such as receiving more data from an AJAX request to add more items
     * to a data list. Once the data has been received and UI updated, you
     * then call this method to signify that the loading has completed.
     * This method will change the infinite scroll's state from `loading`
     * to `enabled`.
     */
    complete(): void;
    /**
     * Pass a promise inside `waitFor()` within the `infinite` output event handler in order to
     * change state of infiniteScroll to "complete"
     */
    waitFor(action: Promise<any>): void;
    private canStart();
    private enableScrollEvents(shouldListen);
    hostData(): {
        class: {
            'infinite-scroll-loading': boolean;
            'infinite-scroll-enabled': boolean;
        };
    };
}
