import { deferEvent } from '../../utils/helpers';
export class Select {
    constructor() {
        this.childOpts = [];
        this.selectId = `ion-sel-${selectIds++}`;
        this.isExpanded = false;
        this.keyFocus = false;
        /**
         * If true, the user cannot interact with the select. Defaults to `false`.
         */
        this.disabled = false;
        /**
         * The text to display on the cancel button. Default: `Cancel`.
         */
        this.cancelText = 'Cancel';
        /**
         * The text to display on the ok button. Default: `OK`.
         */
        this.okText = 'OK';
        /**
         * If true, the select can accept multiple values.
         */
        this.multiple = false;
        /**
         * The interface the select should use: `action-sheet`, `popover` or `alert`. Default: `alert`.
         */
        this.interface = 'alert';
        /**
         * Any additional options that the `alert`, `action-sheet` or `popover` interface
         * can take. See the [AlertController API docs](../../alert/AlertController/#create), the
         * [ActionSheetController API docs](../../action-sheet/ActionSheetController/#create) and the
         * [PopoverController API docs](../../popover/PopoverController/#create) for the
         * create options for each interface.
         */
        this.interfaceOptions = {};
    }
    disabledChanged() {
        this.emitStyle();
    }
    valueChanged() {
        // this select value just changed
        // double check the select option with this value is checked
        if (this.value === undefined) {
            // set to undefined
            // ensure all that are checked become unchecked
            this.childOpts.filter(o => o.selected).forEach(selectOption => {
                selectOption.selected = false;
            });
            this.text = '';
        }
        else {
            let hasChecked = false;
            const texts = [];
            this.childOpts.forEach(selectOption => {
                if ((Array.isArray(this.value) && this.value.includes(selectOption.value)) || (selectOption.value === this.value)) {
                    if (!selectOption.selected && (this.multiple || !hasChecked)) {
                        // correct value for this select option
                        // but this select option isn't checked yet
                        // and we haven't found a checked yet
                        // so CHECK IT!
                        selectOption.selected = true;
                    }
                    else if (!this.multiple && hasChecked && selectOption.selected) {
                        // somehow we've got multiple select options
                        // with the same value, but only one can be checked
                        selectOption.selected = false;
                    }
                    // remember we've got a checked select option button now
                    hasChecked = true;
                }
                else if (selectOption.selected) {
                    // this select option doesn't have the correct value
                    // and it's also checked, so let's uncheck it
                    selectOption.selected = false;
                }
                if (selectOption.selected) {
                    texts.push(selectOption.textContent || '');
                }
            });
            this.text = texts.join(', ');
        }
        // emit the new value
        this.ionChange.emit({
            value: this.value,
            text: this.text
        });
        this.emitStyle();
    }
    optLoad(ev) {
        const selectOption = ev.target;
        this.childOpts = Array.from(this.el.querySelectorAll('ion-select-option'));
        if (this.value != null && (Array.isArray(this.value) && this.value.includes(selectOption.value)) || (selectOption.value === this.value)) {
            // this select has a value and this
            // option equals the correct select value
            // so let's check this select option
            selectOption.selected = true;
        }
        else if (Array.isArray(this.value) && this.multiple && selectOption.selected) {
            // if the value is an array we need to push the option on
            this.value.push(selectOption.value);
        }
        else if (this.value === undefined && selectOption.selected) {
            // this select does not have a value
            // but this select option is checked, so let's set the
            // select's value from the checked select option
            this.value = selectOption.value;
        }
        else if (selectOption.selected) {
            // if it doesn't match one of the above cases, but the
            // select option is still checked, then we need to uncheck it
            selectOption.selected = false;
        }
    }
    optUnload(ev) {
        const index = this.childOpts.indexOf(ev.target);
        if (index > -1) {
            this.childOpts.splice(index, 1);
        }
    }
    onSelect(ev) {
        // ionSelect only come from the checked select option
        this.childOpts.forEach(selectOption => {
            if (selectOption === ev.target) {
                this.value = selectOption.value;
            }
            else {
                selectOption.selected = false;
            }
        });
    }
    componentWillLoad() {
        if (!this.value) {
            this.value = this.multiple ? [] : undefined;
        }
        this.name = this.name || this.selectId;
    }
    componentDidLoad() {
        this.ionStyle = deferEvent(this.ionStyle);
        const label = this.getLabel();
        if (label) {
            this.labelId = label.id = this.name + '-lbl';
        }
        if (this.multiple) {
            // there are no values set at this point
            // so check to see who should be selected
            const checked = this.childOpts.filter(o => o.selected);
            this.value.length = 0;
            checked.forEach(o => {
                // doing this instead of map() so we don't
                // fire off an unecessary change event
                this.value.push(o.value);
            });
            this.text = checked.map(o => o.textContent).join(', ');
        }
        else {
            const checked = this.childOpts.find(o => o.selected);
            if (checked) {
                this.value = checked.value;
                this.text = checked.textContent || '';
            }
        }
        this.emitStyle();
    }
    getLabel() {
        const item = this.el.closest('ion-item');
        if (item) {
            return item.querySelector('ion-label');
        }
        return null;
    }
    open(ev) {
        let selectInterface = this.interface;
        if ((selectInterface === 'action-sheet' || selectInterface === 'popover') && this.multiple) {
            console.warn('Select interface cannot be "' + selectInterface + '" with a multi-value select. Using the "alert" interface instead.');
            selectInterface = 'alert';
        }
        if (selectInterface === 'popover' && !ev) {
            console.warn('Select interface cannot be a "popover" without passing an event. Using the "alert" interface instead.');
            selectInterface = 'alert';
        }
        if (selectInterface === 'popover') {
            return this.openPopover(ev);
        }
        if (selectInterface === 'action-sheet') {
            return this.openActionSheet();
        }
        return this.openAlert();
    }
    async openPopover(ev) {
        const interfaceOptions = this.interfaceOptions;
        const popoverOpts = Object.assign({}, interfaceOptions, { component: 'ion-select-popover', componentProps: {
                header: interfaceOptions.header,
                subHeader: interfaceOptions.subHeader,
                message: interfaceOptions.message,
                value: this.value,
                options: this.childOpts.map(o => {
                    return {
                        text: o.textContent,
                        value: o.value,
                        checked: o.selected,
                        disabled: o.disabled,
                        handler: () => {
                            this.value = o.value;
                            this.close();
                        }
                    };
                })
            }, cssClass: ['select-popover', interfaceOptions.cssClass], ev: ev });
        const popover = this.overlay = await this.popoverCtrl.create(popoverOpts);
        await popover.present();
        this.isExpanded = true;
        return popover;
    }
    async openActionSheet() {
        const actionSheetButtons = this.childOpts.map(option => {
            return {
                role: (option.selected ? 'selected' : ''),
                text: option.textContent,
                handler: () => {
                    this.value = option.value;
                }
            };
        });
        actionSheetButtons.push({
            text: this.cancelText,
            role: 'cancel',
            handler: () => {
                this.ionCancel.emit();
            }
        });
        const interfaceOptions = this.interfaceOptions;
        const actionSheetOpts = Object.assign({}, interfaceOptions, { buttons: actionSheetButtons, cssClass: ['select-action-sheet', interfaceOptions.cssClass] });
        const actionSheet = this.overlay = await this.actionSheetCtrl.create(actionSheetOpts);
        await actionSheet.present();
        this.isExpanded = true;
        return actionSheet;
    }
    async openAlert() {
        const label = this.getLabel();
        const labelText = (label) ? label.textContent : null;
        const interfaceOptions = this.interfaceOptions;
        const alertOpts = Object.assign({}, interfaceOptions, { header: interfaceOptions.header ? interfaceOptions.header : labelText, inputs: this.childOpts.map(o => {
                return {
                    type: (this.multiple ? 'checkbox' : 'radio'),
                    label: o.textContent,
                    value: o.value,
                    checked: o.selected,
                    disabled: o.disabled
                };
            }), buttons: [{
                    text: this.cancelText,
                    role: 'cancel',
                    handler: () => {
                        this.ionCancel.emit();
                    }
                }, {
                    text: this.okText,
                    handler: (selectedValues) => {
                        this.value = selectedValues;
                    }
                }], cssClass: ['select-alert', interfaceOptions.cssClass,
                (this.multiple ? 'multiple-select-alert' : 'single-select-alert')] });
        const alert = this.overlay = await this.alertCtrl.create(alertOpts);
        await alert.present();
        this.isExpanded = true;
        return alert;
    }
    /**
     * Close the select interface.
     */
    close() {
        // TODO check !this.overlay || !this.isFocus()
        if (!this.overlay) {
            return Promise.resolve();
        }
        const overlay = this.overlay;
        this.overlay = undefined;
        this.isExpanded = false;
        return overlay.dismiss();
    }
    onKeyUp() {
        this.keyFocus = true;
    }
    onFocus() {
        this.ionFocus.emit();
    }
    onBlur() {
        this.keyFocus = false;
        this.ionBlur.emit();
    }
    hasValue() {
        if (Array.isArray(this.value)) {
            return this.value.length > 0;
        }
        return (this.value !== null && this.value !== undefined && this.value !== '');
    }
    emitStyle() {
        this.ionStyle.emit({
            'interactive': true,
            'select': true,
            'select-disabled': this.disabled,
            'input-has-value': this.hasValue()
        });
    }
    hostData() {
        return {
            class: {
                'select-disabled': this.disabled,
                'select-key': this.keyFocus
            }
        };
    }
    render() {
        let addPlaceholderClass = false;
        let selectText = this.selectedText || this.text;
        if (!selectText && this.placeholder) {
            selectText = this.placeholder;
            addPlaceholderClass = true;
        }
        const selectTextClasses = {
            'select-text': true,
            'select-placeholder': addPlaceholderClass
        };
        return [
            h("div", { role: "textbox", "aria-multiline": "false", class: selectTextClasses }, selectText),
            h("div", { class: "select-icon", role: "presentation" },
                h("div", { class: "select-icon-inner" })),
            h("button", { type: "button", role: "combobox", "aria-haspopup": "dialog", "aria-expanded": this.isExpanded, "aria-labelledby": this.labelId, "aria-disabled": this.disabled ? 'true' : false, onClick: this.open.bind(this), onKeyUp: this.onKeyUp.bind(this), onFocus: this.onFocus.bind(this), onBlur: this.onBlur.bind(this), class: "select-cover" },
                h("slot", null),
                this.mode === 'md' && h("ion-ripple-effect", { tapClick: true })),
            h("input", { type: "hidden", name: this.name, value: parseValue(this.value) })
        ];
    }
    static get is() { return "ion-select"; }
    static get host() { return {
        "theme": "select"
    }; }
    static get properties() { return {
        "actionSheetCtrl": {
            "connect": "ion-action-sheet-controller"
        },
        "alertCtrl": {
            "connect": "ion-alert-controller"
        },
        "cancelText": {
            "type": String,
            "attr": "cancel-text"
        },
        "disabled": {
            "type": Boolean,
            "attr": "disabled",
            "watchCallbacks": ["disabledChanged"]
        },
        "el": {
            "elementRef": true
        },
        "interface": {
            "type": String,
            "attr": "interface"
        },
        "interfaceOptions": {
            "type": "Any",
            "attr": "interface-options"
        },
        "isExpanded": {
            "state": true
        },
        "keyFocus": {
            "state": true
        },
        "multiple": {
            "type": Boolean,
            "attr": "multiple"
        },
        "name": {
            "type": String,
            "attr": "name",
            "mutable": true
        },
        "okText": {
            "type": String,
            "attr": "ok-text"
        },
        "placeholder": {
            "type": String,
            "attr": "placeholder"
        },
        "popoverCtrl": {
            "connect": "ion-popover-controller"
        },
        "selectedText": {
            "type": String,
            "attr": "selected-text"
        },
        "text": {
            "state": true
        },
        "value": {
            "type": "Any",
            "attr": "value",
            "mutable": true,
            "watchCallbacks": ["valueChanged"]
        }
    }; }
    static get events() { return [{
            "name": "ionChange",
            "method": "ionChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionCancel",
            "method": "ionCancel",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionFocus",
            "method": "ionFocus",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionBlur",
            "method": "ionBlur",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionStyle",
            "method": "ionStyle",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "ionSelectOptionDidLoad",
            "method": "optLoad"
        }, {
            "name": "ionSelectOptionDidUnload",
            "method": "optUnload"
        }, {
            "name": "ionSelect",
            "method": "onSelect"
        }]; }
    static get style() { return "/**style-placeholder:ion-select:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-select:**/"; }
}
function parseValue(value) {
    if (value == null) {
        return undefined;
    }
    if (Array.isArray(value)) {
        return value.join(',');
    }
    return value.toString();
}
let selectIds = 0;
