export class RangeKnob {
    handleKeyBoard(ev) {
        const keyCode = ev.keyCode;
        if (keyCode === KEY_LEFT || keyCode === KEY_DOWN) {
            this.ionDecrease.emit({ isIncrease: false, knob: this.knob });
            ev.preventDefault();
            ev.stopPropagation();
        }
        else if (keyCode === KEY_RIGHT || keyCode === KEY_UP) {
            this.ionIncrease.emit({ isIncrease: true, knob: this.knob });
            ev.preventDefault();
            ev.stopPropagation();
        }
    }
    hostData() {
        const { value, min, max } = this;
        const pos = this.ratio * 100;
        return {
            class: {
                'range-knob-handle': true,
                'range-knob-pressed': this.pressed,
                'range-knob-min': value === min,
                'range-knob-max': value === max
            },
            style: {
                'left': `${pos}%`
            },
            'role': 'slider',
            'tabindex': this.disabled ? -1 : 0,
            'aria-valuemin': min,
            'aria-valuemax': max,
            'aria-disabled': this.disabled,
            'aria-labelledby': this.labelId,
            'aria-valuenow': value
        };
    }
    render() {
        if (this.pin) {
            return [
                h("div", { class: "range-pin", role: "presentation" }, Math.round(this.value)),
                h("div", { class: "range-knob", role: "presentation" })
            ];
        }
        return h("div", { class: "range-knob", role: "presentation" });
    }
    static get is() { return "ion-range-knob"; }
    static get properties() { return {
        "disabled": {
            "type": Boolean,
            "attr": "disabled"
        },
        "knob": {
            "type": Number,
            "attr": "knob"
        },
        "labelId": {
            "type": String,
            "attr": "label-id"
        },
        "max": {
            "type": Number,
            "attr": "max"
        },
        "min": {
            "type": Number,
            "attr": "min"
        },
        "pin": {
            "type": Boolean,
            "attr": "pin"
        },
        "pressed": {
            "type": Boolean,
            "attr": "pressed"
        },
        "ratio": {
            "type": Number,
            "attr": "ratio"
        },
        "value": {
            "type": Number,
            "attr": "value"
        }
    }; }
    static get events() { return [{
            "name": "ionIncrease",
            "method": "ionIncrease",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionDecrease",
            "method": "ionDecrease",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "keydown",
            "method": "handleKeyBoard"
        }]; }
}
export const KEY_LEFT = 37;
export const KEY_UP = 38;
export const KEY_RIGHT = 39;
export const KEY_DOWN = 40;
