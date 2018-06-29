import { EventEmitter } from '../../stencil.core';
export declare class SelectOption {
    private inputId;
    el: HTMLElement;
    /**
     * If true, the user cannot interact with the select option. Defaults to `false`.
     */
    disabled: boolean;
    /**
     * If true, the element is selected.
     */
    selected: boolean;
    /**
     * The text value of the option.
     */
    value: string;
    /**
     * Emitted when the select option loads.
     */
    ionSelectOptionDidLoad: EventEmitter<void>;
    /**
     * Emitted when the select option unloads.
     */
    ionSelectOptionDidUnload: EventEmitter<void>;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    hostData(): {
        'role': string;
        'id': string;
    };
}
