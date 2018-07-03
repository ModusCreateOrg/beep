import '../../stencil.core';
import { EventEmitter, EventListenerEnable } from '../../stencil.core';
import { Color, Config, MenuChangeEventDetail, Mode } from '../../interface';
import { Side } from '../../utils/helpers';
export declare class Menu {
    private animation?;
    private isPane;
    private _isOpen;
    private lastOnEnd;
    mode: Mode;
    color?: Color;
    isAnimating: boolean;
    width: number;
    backdropEl?: HTMLElement;
    menuInnerEl?: HTMLElement;
    contentEl?: HTMLElement;
    menuCtrl?: HTMLIonMenuControllerElement;
    el: HTMLIonMenuElement;
    isEndSide: boolean;
    config: Config;
    isServer: boolean;
    lazyMenuCtrl: HTMLIonMenuControllerElement;
    enableListener: EventListenerEnable;
    win: Window;
    /**
     * The content's id the menu should use.
     */
    contentId?: string;
    /**
     * An id for the menu.
     */
    menuId?: string;
    /**
     * The display type of the menu. Default varies based on the mode,
     * see the `menuType` in the [config](../../config/Config). Available options:
     * `"overlay"`, `"reveal"`, `"push"`.
     */
    type: string;
    typeChanged(type: string, oldType: string | null): void;
    /**
     * If true, the menu is disabled. Default `false`.
     */
    disabled: boolean;
    protected disabledChanged(disabled: boolean): void;
    /**
     * Which side of the view the menu should be placed. Default `"start"`.
     */
    side: Side;
    protected sideChanged(): void;
    /**
     * If true, swiping the menu is enabled. Default `true`.
     */
    swipeEnabled: boolean;
    protected swipeEnabledChanged(): void;
    /**
     * If true, the menu will persist on child pages.
     */
    persistent: boolean;
    maxEdgeStart: number;
    /**
     * Emitted when the menu is open.
     */
    ionOpen: EventEmitter<void>;
    /**
     * Emitted when the menu is closed.
     */
    ionClose: EventEmitter<void>;
    protected ionMenuChange: EventEmitter<MenuChangeEventDetail>;
    componentWillLoad(): Promise<void>;
    componentDidLoad(): void;
    componentDidUnload(): void;
    splitPaneChanged(ev: CustomEvent): void;
    onBackdropClick(ev: UIEvent): void;
    isOpen(): boolean;
    open(animated?: boolean): Promise<boolean>;
    close(animated?: boolean): Promise<boolean>;
    toggle(animated?: boolean): Promise<boolean>;
    setOpen(shouldOpen: boolean, animated?: boolean): Promise<boolean>;
    _setOpen(shouldOpen: boolean, animated?: boolean): Promise<boolean>;
    isActive(): boolean;
    private loadAnimation();
    private startAnimation(shouldOpen, animated);
    private canSwipe();
    private canStart(detail);
    private onWillStart();
    private onDragStart();
    private onDragMove(detail);
    private onDragEnd(detail);
    private beforeAnimation();
    private afterAnimation(isOpen);
    private updateState();
    private forceClosing();
    hostData(): {
        role: string;
        class: {
            [x: string]: boolean;
            'menu-enabled': boolean;
            'menu-side-right': boolean;
            'menu-side-left': boolean;
        };
    };
    render(): JSX.Element[];
}
