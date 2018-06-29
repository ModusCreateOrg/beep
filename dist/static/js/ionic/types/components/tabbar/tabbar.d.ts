import '../../stencil.core';
import { Color, Mode, QueueController } from '../../interface';
export declare type TabbarLayout = 'icon-top' | 'icon-start' | 'icon-end' | 'icon-bottom' | 'icon-hide' | 'title-hide';
export declare type TabbarPlacement = 'top' | 'bottom';
export declare class Tabbar {
    private scrollEl?;
    mode: Mode;
    color?: Color;
    el: HTMLElement;
    queue: QueueController;
    doc: Document;
    canScrollLeft: boolean;
    canScrollRight: boolean;
    hidden: boolean;
    layout: TabbarLayout;
    placement: TabbarPlacement;
    selectedTab?: HTMLIonTabElement;
    scrollable: boolean;
    tabs: HTMLIonTabElement[];
    selectedTabChanged(): void;
    highlight: boolean;
    /**
     * If true, the tabbar will be translucent. Defaults to `false`.
     */
    translucent: boolean;
    protected onKeyboardWillHide(): void;
    protected onKeyboardWillShow(): void;
    onResize(): void;
    onTabButtonLoad(): void;
    protected analyzeTabs(): {
        previous: {
            tab: HTMLIonTabButtonElement;
            amount: number;
        } | undefined;
        next: {
            tab: HTMLIonTabButtonElement;
            amount: number;
        } | undefined;
    };
    private getSelectedButton();
    protected scrollToSelectedButton(): void;
    private scrollByTab(direction);
    private updateBoundaries();
    private updateHighlight();
    hostData(): {
        role: string;
        class: {
            [x: string]: boolean;
            'tabbar-hidden': boolean;
            'scrollable': boolean;
        };
    };
    render(): (JSX.Element | null)[];
}
