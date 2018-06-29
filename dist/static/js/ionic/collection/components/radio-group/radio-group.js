export class RadioGroup {
    constructor() {
        this.inputId = `ion-rg-${radioGroupIds++}`;
        this.labelId = `${this.inputId}-lbl`;
        this.radios = [];
        /*
         * If true, the radios can be deselected. Default false.
         */
        this.allowEmptySelection = false;
        /**
         * The name of the control, which is submitted with the form data.
         */
        this.name = this.inputId;
        /*
         * If true, the user cannot interact with the radio group. Default false.
         */
        this.disabled = false;
    }
    disabledChanged() {
        for (const radio of this.radios) {
            radio.disabled = this.disabled;
        }
    }
    valueChanged(value) {
        this.updateRadios();
        this.ionChange.emit({ value });
    }
    onRadioDidLoad(ev) {
        const radio = ev.target;
        radio.name = this.name;
        // add radio to internal list
        this.radios.push(radio);
        // this radio-group does not have a value
        // but this radio is checked, so let's set the
        // radio-group's value from the checked radio
        if (this.value === undefined && radio.checked) {
            this.value = radio.value;
        }
        else {
            this.updateRadios();
        }
    }
    onRadioDidUnload(ev) {
        const index = this.radios.indexOf(ev.target);
        if (index > -1) {
            this.radios.splice(index, 1);
        }
    }
    onRadioSelect(ev) {
        const selectedRadio = ev.target;
        if (selectedRadio) {
            this.value = selectedRadio.value;
        }
    }
    componentDidLoad() {
        // Get the list header if it exists and set the id
        // this is used to set aria-labelledby
        let header = this.el.querySelector('ion-list-header');
        if (!header) {
            header = this.el.querySelector('ion-item-divider');
        }
        if (header) {
            const label = header.querySelector('ion-label');
            if (label) {
                this.labelId = label.id = this.name + '-lbl';
            }
        }
        this.disabledChanged();
        this.updateRadios();
    }
    updateRadios() {
        const value = this.value;
        let hasChecked = false;
        for (const radio of this.radios) {
            if (!hasChecked && radio.value === value) {
                // correct value for this radio
                // but this radio isn't checked yet
                // and we haven't found a checked yet
                hasChecked = true;
                radio.checked = true;
            }
            else {
                // this radio doesn't have the correct value
                // or the radio group has been already checked
                radio.checked = false;
            }
        }
    }
    hostData() {
        const hostAttrs = {
            'role': 'radiogroup'
        };
        if (this.labelId) {
            hostAttrs['aria-labelledby'] = this.labelId;
        }
        return hostAttrs;
    }
    static get is() { return "ion-radio-group"; }
    static get properties() { return {
        "allowEmptySelection": {
            "type": Boolean,
            "attr": "allow-empty-selection"
        },
        "disabled": {
            "type": Boolean,
            "attr": "disabled",
            "watchCallbacks": ["disabledChanged"]
        },
        "el": {
            "elementRef": true
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "value": {
            "type": String,
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
        }]; }
    static get listeners() { return [{
            "name": "ionRadioDidLoad",
            "method": "onRadioDidLoad"
        }, {
            "name": "ionRadioDidUnload",
            "method": "onRadioDidUnload"
        }, {
            "name": "ionSelect",
            "method": "onRadioSelect"
        }]; }
}
let radioGroupIds = 0;
