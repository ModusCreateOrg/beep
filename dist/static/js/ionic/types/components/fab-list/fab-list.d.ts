export declare class FabList {
    el: HTMLIonFabElement;
    /**
     * If true, the fab list will be show all fab buttons in the list. Defaults to `false`.
     */
    activated: boolean;
    protected activatedChanged(activated: boolean): void;
    /**
     * The side the fab list will show on relative to the main fab button. Defaults to `'bottom'`.
     */
    side: 'start' | 'end' | 'top' | 'bottom';
    hostData(): {
        class: {
            [x: string]: boolean | "start" | "end" | "bottom" | "top";
            'fab-list-active': boolean;
        };
    };
}
