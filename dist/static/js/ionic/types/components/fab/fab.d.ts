export declare class Fab {
    el: HTMLElement;
    /**
     * Where to align the fab horizontally in the viewport.
     * Possible values are: `"center"`, `"start"`, `"end"`.
     */
    horizontal?: 'start' | 'end' | 'center';
    /**
     * Where to align the fab vertically in the viewport.
     * Possible values are: `"top"`, `"center"`, `"bottom"`.
     */
    vertical?: 'top' | 'bottom' | 'center';
    /**
     * If true, the fab will display on the edge of the header if
     * `vertical` is `"top"`, and on the edge of the footer if
     * it is `"bottom"`. Should be used with a `fixed` slot.
     */
    edge: boolean;
    activated: boolean;
    activatedChanged(): void;
    componentDidLoad(): void;
    onClick(): void;
    /**
     * Close an active FAB list container
     */
    close(): void;
    hostData(): {
        class: {
            [x: string]: boolean;
            ['fab-edge']: boolean;
        };
    };
}
