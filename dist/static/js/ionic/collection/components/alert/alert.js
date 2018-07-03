import { BACKDROP, dismiss, eventMethod, isCancel, present } from '../../utils/overlays';
import { createThemedClasses, getClassMap } from '../../utils/theme';
import { iosEnterAnimation } from './animations/ios.enter';
import { iosLeaveAnimation } from './animations/ios.leave';
import { mdEnterAnimation } from './animations/md.enter';
import { mdLeaveAnimation } from './animations/md.leave';
export class Alert {
    constructor() {
        this.processedInputs = [];
        this.presented = false;
        this.keyboardClose = true;
        /**
         * Array of buttons to be added to the alert.
         */
        this.buttons = [];
        /**
         * Array of input to show in the alert.
         */
        this.inputs = [];
        /**
         * If true, the alert will be dismissed when the backdrop is clicked. Defaults to `true`.
         */
        this.enableBackdropDismiss = true;
        /**
         * If true, the alert will be translucent. Defaults to `false`.
         */
        this.translucent = false;
        /**
         * If true, the alert will animate. Defaults to `true`.
         */
        this.willAnimate = true;
    }
    inputsChanged() {
        const inputs = this.inputs;
        // An alert can be created with several different inputs. Radios,
        // checkboxes and inputs are all accepted, but they cannot be mixed.
        const inputTypes = new Set(inputs.map(i => i.type));
        if (inputTypes.has('checkbox') || inputTypes.has('radio')) {
            console.warn(`Alert cannot mix input types: ${(Array.from(inputTypes.values()).join('/'))}. Please see alert docs for more info.`);
        }
        this.inputType = inputTypes.values().next().value;
        this.processedInputs = inputs.map((i, index) => ({
            type: i.type || 'text',
            name: i.name ? i.name : index + '',
            placeholder: i.placeholder ? i.placeholder : '',
            value: i.value ? i.value : '',
            label: i.label,
            checked: !!i.checked,
            disabled: !!i.disabled,
            id: i.id ? i.id : `alert-input-${this.overlayId}-${index}`,
            handler: i.handler ? i.handler : null,
            min: i.min ? i.min : null,
            max: i.max ? i.max : null
        }));
    }
    componentWillLoad() {
        this.inputsChanged();
    }
    componentDidLoad() {
        this.ionAlertDidLoad.emit();
    }
    componentDidUnload() {
        this.ionAlertDidUnload.emit();
    }
    onBackdropTap() {
        this.dismiss(null, BACKDROP);
    }
    dispatchCancelHandler(ev) {
        const role = ev.detail.role;
        if (isCancel(role)) {
            const cancelButton = this.buttons.find(b => b.role === 'cancel');
            this.callButtonHandler(cancelButton);
        }
    }
    /**
     * Present the alert overlay after it has been created.
     */
    present() {
        return present(this, 'alertEnter', iosEnterAnimation, mdEnterAnimation);
    }
    /**
     * Dismiss the alert overlay after it has been presented.
     */
    dismiss(data, role) {
        return dismiss(this, data, role, 'alertLeave', iosLeaveAnimation, mdLeaveAnimation);
    }
    /**
     * Returns a promise that resolves when the alert did dismiss. It also accepts a callback
     * that is called in the same circustances.
     *
     * ```
     * const {data, role} = await alert.onDidDismiss();
     * ```
     */
    onDidDismiss(callback) {
        return eventMethod(this.el, 'ionAlertDidDismiss', callback);
    }
    /**
     * Returns a promise that resolves when the alert will dismiss. It also accepts a callback
     * that is called in the same circustances.
     *
     * ```
     * const {data, role} = await alert.onWillDismiss();
     * ```
     */
    onWillDismiss(callback) {
        return eventMethod(this.el, 'ionAlertWillDismiss', callback);
    }
    rbClick(selectedInput) {
        for (const input of this.processedInputs) {
            input.checked = input === selectedInput;
        }
        this.activeId = selectedInput.id;
        if (selectedInput.handler) {
            selectedInput.handler(selectedInput);
        }
        this.el.forceUpdate();
    }
    cbClick(selectedInput) {
        selectedInput.checked = !selectedInput.checked;
        if (selectedInput.handler) {
            selectedInput.handler(selectedInput);
        }
        this.el.forceUpdate();
    }
    buttonClick(button) {
        const role = button.role;
        if (isCancel(role)) {
            this.dismiss(this.getValues(), role);
            return;
        }
        const shouldDismiss = this.callButtonHandler(button);
        if (shouldDismiss) {
            this.dismiss(this.getValues(), button.role);
        }
    }
    callButtonHandler(button) {
        if (button && button.handler) {
            // a handler has been provided, execute it
            // pass the handler the values from the inputs
            if (button.handler(this.getValues()) === false) {
                // if the return value of the handler is false then do not dismiss
                return false;
            }
        }
        return true;
    }
    getValues() {
        if (this.inputType === 'radio') {
            // this is an alert with radio buttons (single value select)
            // return the one value which is checked, otherwise undefined
            const checkedInput = this.processedInputs.find(i => i.checked === true);
            console.debug('returning', checkedInput ? checkedInput.value : undefined);
            return checkedInput ? checkedInput.value : undefined;
        }
        if (this.inputType === 'checkbox') {
            // this is an alert with checkboxes (multiple value select)
            // return an array of all the checked values
            console.debug('returning', this.processedInputs.filter(i => i.checked).map(i => i.value));
            return this.processedInputs.filter(i => i.checked).map(i => i.value);
        }
        if (this.processedInputs.length === 0) {
            // this is an alert without any options/inputs at all
            console.debug('returning', 'undefined');
            return undefined;
        }
        // this is an alert with text inputs
        // return an object of all the values with the input name as the key
        const values = {};
        this.processedInputs.forEach(i => {
            values[i.name] = i.value || '';
        });
        console.debug('returning', values);
        return values;
    }
    renderAlertInputs(labelledBy) {
        switch (this.inputType) {
            case 'checkbox': return this.renderCheckbox(labelledBy);
            case 'radio': return this.renderRadio(labelledBy);
            default: return this.renderInput(labelledBy);
        }
    }
    renderCheckbox(labelledby) {
        const inputs = this.processedInputs;
        if (inputs.length === 0) {
            return null;
        }
        return (h("div", { class: "alert-checkbox-group", "aria-labelledby": labelledby }, inputs.map((i) => (h("button", { onClick: () => this.cbClick(i), "aria-checked": i.checked, id: i.id, disabled: i.disabled, tabIndex: 0, role: "checkbox", class: "alert-tappable alert-checkbox alert-checkbox-button" },
            h("div", { class: "alert-button-inner" },
                h("div", { class: "alert-checkbox-icon" },
                    h("div", { class: "alert-checkbox-inner" })),
                h("div", { class: "alert-checkbox-label" }, i.label)),
            this.mode === 'md' && h("ion-ripple-effect", { tapClick: true }))))));
    }
    renderRadio(labelledby) {
        const inputs = this.processedInputs;
        if (inputs.length === 0) {
            return null;
        }
        return (h("div", { class: "alert-radio-group", role: "radiogroup", "aria-labelledby": labelledby, "aria-activedescendant": this.activeId }, inputs.map((i) => (h("button", { onClick: () => this.rbClick(i), "aria-checked": i.checked, disabled: i.disabled, id: i.id, tabIndex: 0, class: "alert-radio-button alert-tappable alert-radio", role: "radio" },
            h("div", { class: "alert-button-inner" },
                h("div", { class: "alert-radio-icon" },
                    h("div", { class: "alert-radio-inner" })),
                h("div", { class: "alert-radio-label" }, i.label)),
            this.mode === 'md' && h("ion-ripple-effect", { tapClick: true }))))));
    }
    renderInput(labelledby) {
        const inputs = this.processedInputs;
        if (inputs.length === 0) {
            return null;
        }
        return (h("div", { class: "alert-input-group", "aria-labelledby": labelledby }, inputs.map(i => (h("div", { class: "alert-input-wrapper" },
            h("input", { placeholder: i.placeholder, value: i.value, type: i.type, min: i.min, max: i.max, onInput: e => i.value = e.target.value, id: i.id, disabled: i.disabled, tabIndex: 0, class: "alert-input" }))))));
    }
    hostData() {
        const themedClasses = this.translucent ? createThemedClasses(this.mode, this.color, 'alert-translucent') : {};
        return {
            role: 'alertdialog',
            style: {
                zIndex: 20000 + this.overlayId,
            },
            class: Object.assign({}, themedClasses, getClassMap(this.cssClass))
        };
    }
    render() {
        const hdrId = `alert-${this.overlayId}-hdr`;
        const subHdrId = `alert-${this.overlayId}-sub-hdr`;
        const msgId = `alert-${this.overlayId}-msg`;
        let labelledById = undefined;
        if (this.header) {
            labelledById = hdrId;
        }
        else if (this.subHeader) {
            labelledById = subHdrId;
        }
        const buttons = this.buttons.map(b => {
            if (typeof b === 'string') {
                return { text: b };
            }
            return b;
        })
            .filter(b => b !== null);
        const alertButtonGroupClass = {
            'alert-button-group': true,
            'alert-button-group-vertical': buttons.length > 2
        };
        return [
            h("ion-backdrop", { tappable: this.enableBackdropDismiss }),
            h("div", { class: "alert-wrapper" },
                h("div", { class: "alert-head" },
                    this.header && h("h2", { id: hdrId, class: "alert-title" }, this.header),
                    this.subHeader && h("h2", { id: subHdrId, class: "alert-sub-title" }, this.subHeader)),
                h("div", { id: msgId, class: "alert-message", innerHTML: this.message }),
                this.renderAlertInputs(labelledById),
                h("div", { class: alertButtonGroupClass }, buttons.map(button => h("button", { class: buttonClass(button), tabIndex: 0, onClick: () => this.buttonClick(button) },
                    h("span", { class: "alert-button-inner" }, button.text)))))
        ];
    }
    static get is() { return "ion-alert"; }
    static get host() { return {
        "theme": "alert"
    }; }
    static get properties() { return {
        "animationCtrl": {
            "connect": "ion-animation-controller"
        },
        "buttons": {
            "type": "Any",
            "attr": "buttons"
        },
        "config": {
            "context": "config"
        },
        "cssClass": {
            "type": String,
            "attr": "css-class"
        },
        "dismiss": {
            "method": true
        },
        "el": {
            "elementRef": true
        },
        "enableBackdropDismiss": {
            "type": Boolean,
            "attr": "enable-backdrop-dismiss"
        },
        "enterAnimation": {
            "type": "Any",
            "attr": "enter-animation"
        },
        "header": {
            "type": String,
            "attr": "header"
        },
        "inputs": {
            "type": "Any",
            "attr": "inputs",
            "mutable": true,
            "watchCallbacks": ["inputsChanged"]
        },
        "keyboardClose": {
            "type": Boolean,
            "attr": "keyboard-close"
        },
        "leaveAnimation": {
            "type": "Any",
            "attr": "leave-animation"
        },
        "message": {
            "type": String,
            "attr": "message"
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "onDidDismiss": {
            "method": true
        },
        "onWillDismiss": {
            "method": true
        },
        "overlayId": {
            "type": Number,
            "attr": "overlay-id"
        },
        "present": {
            "method": true
        },
        "subHeader": {
            "type": String,
            "attr": "sub-header"
        },
        "translucent": {
            "type": Boolean,
            "attr": "translucent"
        },
        "willAnimate": {
            "type": Boolean,
            "attr": "will-animate"
        }
    }; }
    static get events() { return [{
            "name": "ionAlertDidLoad",
            "method": "ionAlertDidLoad",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionAlertDidUnload",
            "method": "ionAlertDidUnload",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionAlertDidPresent",
            "method": "didPresent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionAlertWillPresent",
            "method": "willPresent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionAlertWillDismiss",
            "method": "willDismiss",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionAlertDidDismiss",
            "method": "didDismiss",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "ionBackdropTap",
            "method": "onBackdropTap"
        }, {
            "name": "ionAlertWillDismiss",
            "method": "dispatchCancelHandler"
        }]; }
    static get style() { return "/**style-placeholder:ion-alert:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-alert:**/"; }
}
function buttonClass(button) {
    return Object.assign({ 'alert-button': true }, getClassMap(button.cssClass));
}
