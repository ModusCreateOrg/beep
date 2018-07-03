import '../../stencil.core';
import { QueueController } from '../../interface';
export declare class ReorderGroup {
    private selectedItemEl;
    private selectedItemHeight;
    private lastToIndex;
    private cachedHeights;
    private containerEl;
    private scrollEl;
    private scrollElTop;
    private scrollElBottom;
    private scrollElInitial;
    private containerTop;
    private containerBottom;
    enabled: boolean;
    iconVisible: boolean;
    activated: boolean;
    el: HTMLElement;
    queue: QueueController;
    /**
     * If true, the reorder will be hidden. Defaults to `true`.
     */
    disabled: boolean;
    protected disabledChanged(disabled: boolean): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    private canStart(ev);
    private onDragStart(ev);
    private onDragMove(ev);
    private onDragEnd();
    private itemIndexForTop(deltaY);
    /********* DOM WRITE ********* */
    private reorderMove(fromIndex, toIndex);
    private autoscroll(posY);
    hostData(): {
        class: {
            'reorder-enabled': boolean;
            'reorder-list-active': boolean;
            'reorder-visible': boolean;
        };
    };
    render(): JSX.Element;
}
