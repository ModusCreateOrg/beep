export class SelectOption {
    constructor() {
        this.inputId = `ion-selopt-${selectOptionIds++}`;
        /**
         * If true, the user cannot interact with the select option. Defaults to `false`.
         */
        this.disabled = false;
        /**
         * If true, the element is selected.
         */
        this.selected = false;
    }
    componentWillLoad() {
        if (this.value === undefined) {
            this.value = this.el.textContent || '';
        }
    }
    componentDidLoad() {
        this.ionSelectOptionDidLoad.emit();
    }
    componentDidUnload() {
        this.ionSelectOptionDidUnload.emit();
    }
    hostData() {
        return {
            'role': 'option',
            'id': this.inputId
        };
    }
    static get is() { return "ion-select-option"; }
    static get host() { return {
        "theme": "select-option"
    }; }
    static get properties() { return {
        "disabled": {
            "type": Boolean,
            "attr": "disabled"
        },
        "el": {
            "elementRef": true
        },
        "selected": {
            "type": Boolean,
            "attr": "selected"
        },
        "value": {
            "type": String,
            "attr": "value",
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "ionSelectOptionDidLoad",
            "method": "ionSelectOptionDidLoad",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionSelectOptionDidUnload",
            "method": "ionSelectOptionDidUnload",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
}
let selectOptionIds = 0;
