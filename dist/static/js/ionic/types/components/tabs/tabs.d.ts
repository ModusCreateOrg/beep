import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
import { Color, Config, NavOutlet, RouteID, RouteWrite } from '../../interface';
import { TabbarLayout, TabbarPlacement } from '../tabbar/tabbar';
export declare class Tabs implements NavOutlet {
    private ids;
    private transitioning;
    private tabsId;
    private leavingTab?;
    el: HTMLElement;
    tabs: HTMLIonTabElement[];
    selectedTab?: HTMLIonTabElement;
    config: Config;
    doc: Document;
    /**
     * The color to use from your Sass `$colors` map.
     * Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`.
     * For more information, see [Theming your App](/docs/theming/theming-your-app).
     */
    color?: Color;
    /**
     * A unique name for the tabs
     */
    name?: string;
    /**
     * If true, the tabbar
     */
    tabbarHidden: boolean;
    /**
     * Set the tabbar layout: `icon-top`, `icon-start`, `icon-end`, `icon-bottom`, `icon-hide`, `title-hide`.
     */
    tabbarLayout?: TabbarLayout;
    /**
     * Set position of the tabbar: `top`, `bottom`.
     */
    tabbarPlacement?: TabbarPlacement;
    /**
     * If true, show the tab highlight bar under the selected tab.
     */
    tabbarHighlight?: boolean;
    /**
     * If true, the tabs will be translucent.
     * Note: In order to scroll content behind the tabs, the `fullscreen`
     * attribute needs to be set on the content.
     * Defaults to `false`.
     */
    translucent: boolean;
    scrollable: boolean;
    useRouter: boolean;
    /**
     * Emitted when the tab changes.
     */
    ionChange: EventEmitter<{
        tab: HTMLIonTabElement;
    }>;
    ionNavWillLoad: EventEmitter<void>;
    ionNavWillChange: EventEmitter<void>;
    ionNavDidChange: EventEmitter<void>;
    componentWillLoad(): void;
    componentDidLoad(): Promise<void>;
    componentDidUnload(): void;
    protected tabChange(ev: CustomEvent<HTMLIonTabElement>): void;
    /**
     * @param {number|Tab} tabOrIndex Index, or the Tab instance, of the tab to select.
     */
    select(tabOrIndex: number | HTMLIonTabElement): Promise<boolean>;
    setRouteId(id: string): Promise<RouteWrite>;
    getRouteId(): RouteID | undefined;
    getTab(tabOrIndex: string | number | HTMLIonTabElement): HTMLIonTabElement | undefined;
    /**
     * @return {HTMLIonTabElement} Returns the currently selected tab
     */
    getSelected(): HTMLIonTabElement | undefined;
    private initTabs();
    private initSelect();
    private loadConfig(attrKey, fallback);
    private setActive(selectedTab);
    private tabSwitch();
    private notifyRouter();
    private shouldSwitch(selectedTab);
    render(): JSX.Element[];
}
