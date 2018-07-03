import { EventEmitter } from '../../stencil.core';
export declare class SplitPane {
    private rmL;
    el: HTMLElement;
    visible: boolean;
    isServer: boolean;
    win: Window;
    /**
     * If true, the split pane will be hidden. Defaults to `false`.
     */
    disabled: boolean;
    /**
     * When the split-pane should be shown.
     * Can be a CSS media query expression, or a shortcut expression.
     * Can also be a boolean expression.
     */
    when: string | boolean;
    /**
     * Emitted when the split pane is visible.
     */
    ionChange: EventEmitter<{
        visible: boolean;
    }>;
    /**
     * Expression to be called when the split-pane visibility has changed
     */
    protected ionSplitPaneVisible: EventEmitter;
    visibleChanged(visible: boolean): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    protected whenChanged(): void;
    isVisible(): boolean;
    isPane(element: HTMLElement): boolean;
    private _styleChildren();
    hostData(): {
        class: {
            'split-pane-visible': boolean;
        };
    };
}
