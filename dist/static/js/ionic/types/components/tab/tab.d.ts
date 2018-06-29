import { EventEmitter } from '../../stencil.core';
import { Color, ComponentRef, FrameworkDelegate } from '../../interface';
export declare class Tab {
    private loaded;
    el: HTMLIonTabElement;
    active: boolean;
    btnId?: string;
    delegate?: FrameworkDelegate;
    /**
     * The title of the tab.
     */
    label?: string;
    /**
     * The URL which will be used as the `href` within this tab's `<ion-tab-button>` anchor.
     */
    href?: string;
    /**
     * The icon for the tab.
     */
    icon?: string;
    /**
     * The badge for the tab.
     */
    badge?: string;
    /**
     * The badge color for the tab button.
     */
    badgeColor: Color;
    /**
     * The component to display inside of the tab.
     */
    component?: ComponentRef;
    /**
     * The name of the tab.
     */
    name?: string;
    /**
     * If true, the user cannot interact with the tab. Defaults to `false`.
     */
    disabled: boolean;
    /**
     * If true, the tab will be selected. Defaults to `false`.
     */
    selected: boolean;
    selectedChanged(selected: boolean): void;
    /**
     * If true, the tab button is visible within the tabbar. Defaults to `true`.
     */
    show: boolean;
    /**
     * If true, hide the tabs on child pages.
     */
    tabsHideOnSubPages: boolean;
    /**
     * Emitted when the current tab is selected.
     */
    ionSelect: EventEmitter<void>;
    componentWillLoad(): void;
    getTabId(): string | null;
    setActive(): Promise<void>;
    private prepareLazyLoaded();
    hostData(): {
        'aria-labelledby': string | undefined;
        'role': string;
        'hidden': boolean;
        'class': {
            'ion-page': boolean;
        };
    };
}
