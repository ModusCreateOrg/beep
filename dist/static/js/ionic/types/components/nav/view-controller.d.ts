import { ComponentProps, FrameworkDelegate, Nav } from '../../interface';
export declare const enum ViewState {
    New = 1,
    Attached = 2,
    Destroyed = 3,
}
export declare class ViewController {
    component: any;
    params: any;
    state: ViewState;
    nav?: Nav;
    element?: HTMLElement;
    delegate?: FrameworkDelegate;
    constructor(component: any, params: any);
    /**
     * @hidden
     */
    init(container: HTMLElement): Promise<void>;
    /**
     * @hidden
     * DOM WRITE
     */
    _destroy(): void;
}
export declare function matches(view: ViewController | undefined, id: string, params: ComponentProps): view is ViewController;
export declare function convertToView(page: any, params: any): ViewController | null;
export declare function convertToViews(pages: any[]): ViewController[];
