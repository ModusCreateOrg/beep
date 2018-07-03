export class Segment {
    constructor() {
        /*
         * If true, the user cannot interact with the segment. Defaults to `false`.
         */
        this.disabled = false;
    }
    valueChanged(value) {
        this.update();
        this.ionChange.emit({ value });
    }
    segmentClick(ev) {
        const selectedButton = ev.target;
        this.value = selectedButton.value;
    }
    componentDidLoad() {
        if (this.value === undefined) {
            const buttons = Array.from(this.el.querySelectorAll('ion-segment-button'));
            const checked = buttons.find(b => b.checked);
            if (checked) {
                this.value = checked.value;
            }
        }
        this.update();
    }
    update() {
        const value = this.value;
        const buttons = Array.from(this.el.querySelectorAll('ion-segment-button'));
        for (const button of buttons) {
            button.checked = (button.value === value);
        }
    }
    hostData() {
        return {
            class: {
                'segment-disabled': this.disabled
            }
        };
    }
    static get is() { return "ion-segment"; }
    static get host() { return {
        "theme": "segment"
    }; }
    static get properties() { return {
        "color": {
            "type": String,
            "attr": "color"
        },
        "disabled": {
            "type": Boolean,
            "attr": "disabled"
        },
        "el": {
            "elementRef": true
        },
        "mode": {
            "type": String,
            "attr": "mode"
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
            "name": "ionSelect",
            "method": "segmentClick"
        }]; }
    static get style() { return "/**style-placeholder:ion-segment:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-segment:**/"; }
}
