export interface Viewport {
    top: number;
    bottom: number;
}
export interface Range {
    offset: number;
    length: number;
}
export declare const enum CellType {
    Item = 0,
    Header = 1,
    Footer = 2,
}
export declare const enum NodeChange {
    NoChange = 0,
    Position = 1,
    Cell = 2,
}
export interface Cell {
    i: number;
    index: number;
    value: any;
    type: CellType;
    height: number;
    reads: number;
    visible: boolean;
}
export interface VirtualNode {
    cell: Cell;
    top: number;
    change: NodeChange;
    d: boolean;
    visible: boolean;
}
export declare type HeaderFn = (item: any, index: number, items: any[]) => string | null;
export declare type ItemHeightFn = (item: any, index?: number) => number;
export declare type ItemRenderFn = (el: HTMLElement | null, cell: Cell, domIndex?: number) => HTMLElement;
export declare type DomRenderFn = (dom: VirtualNode[]) => void;
export declare function updateVDom(dom: VirtualNode[], heightIndex: Uint32Array, cells: Cell[], range: Range): void;
export declare function doRender(el: HTMLElement, nodeRender: ItemRenderFn, dom: VirtualNode[], updateCellHeight: Function): void;
export declare function getViewport(scrollTop: number, vierportHeight: number, margin: number): Viewport;
export declare function getRange(heightIndex: Uint32Array, viewport: Viewport, buffer: number): Range;
export declare function getShouldUpdate(dirtyIndex: number, currentRange: Range, range: Range): boolean;
export declare function findCellIndex(cells: Cell[], index: number): number;
export declare function inplaceUpdate(dst: Cell[], src: Cell[], offset: number): Cell[];
export declare function calcCells(items: any[], itemHeight: ItemHeightFn | undefined, headerFn: HeaderFn | undefined, footerFn: HeaderFn | undefined, approxHeaderHeight: number, approxFooterHeight: number, approxItemHeight: number, j: number, offset: number, len: number): Cell[];
export declare function calcHeightIndex(buf: Uint32Array, cells: Cell[], index: number): number;
export declare function resizeBuffer(buf: Uint32Array | undefined, len: number): Uint32Array;
export declare function positionForIndex(index: number, cells: Cell[], heightIndex: Uint32Array): number;
