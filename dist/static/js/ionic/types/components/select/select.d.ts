import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
import { Mode, SelectInputChangeEvent, SelectInterface, StyleEvent } from '../../interface';
export declare class Select {
    private childOpts;
    private selectId;
    private labelId?;
    private overlay?;
    mode: Mode;
    el: HTMLIonSelectElement;
    actionSheetCtrl: HTMLIonActionSheetControllerElement;
    alertCtrl: HTMLIonAlertControllerElement;
    popoverCtrl: HTMLIonPopoverControllerElement;
    isExpanded: boolean;
    keyFocus: boolean;
    text?: string;
    /**
     * If true, the user cannot interact with the select. Defaults to `false`.
     */
    disabled: boolean;
    /**
     * The text to display on the cancel button. Default: `Cancel`.
     */
    cancelText: string;
    /**
     * The text to display on the ok button. Default: `OK`.
     */
    okText: string;
    /**
     * The text to display when the select is empty.
     */
    placeholder?: string;
    /**
     * The name of the control, which is submitted with the form data.
     */
    name?: string;
    /**
     * The text to display instead of the selected option's value.
     */
    selectedText?: string;
    /**
     * If true, the select can accept multiple values.
     */
    multiple: boolean;
    /**
     * The interface the select should use: `action-sheet`, `popover` or `alert`. Default: `alert`.
     */
    interface: SelectInterface;
    /**
     * Any additional options that the `alert`, `action-sheet` or `popover` interface
     * can take. See the [AlertController API docs](../../alert/AlertController/#create), the
     * [ActionSheetController API docs](../../action-sheet/ActionSheetController/#create) and the
     * [PopoverController API docs](../../popover/PopoverController/#create) for the
     * create options for each interface.
     */
    interfaceOptions: any;
    /**
     * the value of the select.
     */
    value?: any;
    /**
     * Emitted when the value has changed.
     */
    ionChange: EventEmitter<SelectInputChangeEvent>;
    /**
     * Emitted when the selection is cancelled.
     */
    ionCancel: EventEmitter<void>;
    /**
     * Emitted when the select has focus.
     */
    ionFocus: EventEmitter<void>;
    /**
     * Emitted when the select loses focus.
     */
    ionBlur: EventEmitter<void>;
    /**
     * Emitted when the styles change.
     */
    ionStyle: EventEmitter<StyleEvent>;
    disabledChanged(): void;
    valueChanged(): void;
    optLoad(ev: CustomEvent): void;
    optUnload(ev: CustomEvent): void;
    onSelect(ev: CustomEvent): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    private getLabel();
    private open(ev);
    private openPopover(ev);
    private openActionSheet();
    private openAlert();
    /**
     * Close the select interface.
     */
    private close();
    onKeyUp(): void;
    onFocus(): void;
    onBlur(): void;
    hasValue(): boolean;
    private emitStyle();
    hostData(): {
        class: {
            'select-disabled': boolean;
            'select-key': boolean;
        };
    };
    render(): JSX.Element[];
}
