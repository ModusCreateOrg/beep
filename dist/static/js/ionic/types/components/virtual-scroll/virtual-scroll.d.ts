import '../../stencil.core';
import { EventListenerEnable } from '../../stencil.core';
import { QueueController } from '../../interface';
import { DomRenderFn, HeaderFn, ItemHeightFn, ItemRenderFn, VirtualNode } from './virtual-scroll-utils';
export declare class VirtualScroll {
    private scrollEl?;
    private range;
    private timerUpdate;
    private heightIndex?;
    private viewportHeight;
    private cells;
    private virtualDom;
    private isEnabled;
    private viewportOffset;
    private currentScrollTop;
    private indexDirty;
    private totalHeight;
    private heightChanged;
    private lastItemLen;
    el: HTMLStencilElement;
    queue: QueueController;
    enableListener: EventListenerEnable;
    win: Window;
    /**
     * It is important to provide this
     * if virtual item height will be significantly larger than the default
     * The approximate height of each virtual item template's cell.
     * This dimension is used to help determine how many cells should
     * be created when initialized, and to help calculate the height of
     * the scrollable area. This height value can only use `px` units.
     * Note that the actual rendered size of each cell comes from the
     * app's CSS, whereas this approximation is used to help calculate
     * initial dimensions before the item has been rendered. Default is
     * `45`.
     */
    approxItemHeight: number;
    /**
     * The approximate height of each header template's cell.
     * This dimension is used to help determine how many cells should
     * be created when initialized, and to help calculate the height of
     * the scrollable area. This height value can only use `px` units.
     * Note that the actual rendered size of each cell comes from the
     * app's CSS, whereas this approximation is used to help calculate
     * initial dimensions before the item has been rendered. Default is `40px`.
     */
    approxHeaderHeight: number;
    /**
     * The approximate width of each footer template's cell.
     * This dimension is used to help determine how many cells should
     * be created when initialized, and to help calculate the height of
     * the scrollable area. This value can use either `px` or `%` units.
     * Note that the actual rendered size of each cell comes from the
     * app's CSS, whereas this approximation is used to help calculate
     * initial dimensions before the item has been rendered. Default is `100%`.
     */
    approxFooterHeight: number;
    /**
     * Section headers and the data used within its given
     * template can be dynamically created by passing a function to `headerFn`.
     * For example, a large list of contacts usually has dividers between each
     * letter in the alphabet. App's can provide their own custom `headerFn`
     * which is called with each record within the dataset. The logic within
     * the header function can decide if the header template should be used,
     * and what data to give to the header template. The function must return
     * `null` if a header cell shouldn't be created.
     */
    headerFn?: HeaderFn;
    /**
     * Section footers and the data used within its given
     * template can be dynamically created by passing a function to `footerFn`.
     * The logic within the footer function can decide if the footer template
     * should be used, and what data to give to the footer template. The function
     * must return `null` if a footer cell shouldn't be created.
     */
    footerFn?: HeaderFn;
    /**
     * The data that builds the templates within the virtual scroll.
     * It's important to note that when this data has changed, then the
     * entire virtual scroll is reset, which is an expensive operation and
     * should be avoided if possible.
     */
    items?: any[];
    itemHeight?: ItemHeightFn;
    renderItem?: (item: any, index: number) => JSX.Element;
    renderHeader?: (item: any, index: number) => JSX.Element;
    renderFooter?: (item: any, index: number) => JSX.Element;
    nodeRender?: ItemRenderFn;
    domRender?: DomRenderFn;
    itemsChanged(): void;
    componentDidLoad(): void;
    componentDidUpdate(): void;
    componentDidUnload(): void;
    onScroll(): void;
    onResize(): void;
    positionForItem(index: number): number;
    markDirty(offset: number, len?: number): void;
    markDirtyTail(): void;
    private updateVirtualScroll();
    private readVS();
    private writeVS();
    private updateCellHeight(cell, node);
    private setCellHeight(cell, height);
    private scheduleUpdate();
    private updateState();
    private calcCells();
    private getHeightIndex();
    private calcHeightIndex(index?);
    private calcDimensions();
    private enableScrollEvents(shouldListen);
    renderVirtualNode(node: VirtualNode): JSX.Element;
    render(): any[] | undefined;
}
