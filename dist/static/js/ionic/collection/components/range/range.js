import { clamp, debounceEvent, deferEvent } from '../../utils/helpers';
export class Range {
    constructor() {
        this.noUpdate = false;
        this.hasFocus = false;
        this.ratioA = 0;
        this.ratioB = 0;
        this.pressedKnob = 0 /* None */;
        /**
         * How long, in milliseconds, to wait to trigger the
         * `ionChange` event after each change in the range value. Default `0`.
         */
        this.debounce = 0;
        /**
         * The name of the control, which is submitted with the form data.
         */
        this.name = '';
        /**
         * Show two knobs. Defaults to `false`.
         */
        this.dualKnobs = false;
        /**
         * Minimum integer value of the range. Defaults to `0`.
         */
        this.min = 0;
        /**
         * Maximum integer value of the range. Defaults to `100`.
         */
        this.max = 100;
        /**
         * If true, a pin with integer value is shown when the knob
         * is pressed. Defaults to `false`.
         */
        this.pin = false;
        /**
         * If true, the knob snaps to tick marks evenly spaced based
         * on the step property value. Defaults to `false`.
         */
        this.snaps = false;
        /**
         * Specifies the value granularity. Defaults to `1`.
         */
        this.step = 1;
        /*
         * If true, the user cannot interact with the range. Defaults to `false`.
         */
        this.disabled = false;
        /**
         * the value of the range.
         */
        this.value = 0;
    }
    debounceChanged() {
        this.ionChange = debounceEvent(this.ionChange, this.debounce);
    }
    disabledChanged() {
        this.emitStyle();
    }
    valueChanged(value) {
        if (!this.noUpdate) {
            this.updateRatio();
        }
        this.ionChange.emit({ value });
    }
    componentWillLoad() {
        this.ionStyle = deferEvent(this.ionStyle);
        this.updateRatio();
        this.debounceChanged();
        this.emitStyle();
    }
    keyChng(ev) {
        let step = this.step;
        step = step > 0 ? step : 1;
        step = step / (this.max - this.min);
        if (!ev.detail.isIncrease) {
            step *= -1;
        }
        if (ev.detail.knob === 1 /* A */) {
            this.ratioA += step;
        }
        else {
            this.ratioB += step;
        }
    }
    getValue() {
        const value = this.value || 0;
        if (this.dualKnobs) {
            if (typeof value === 'object') {
                return value;
            }
            return {
                lower: 0,
                upper: value,
            };
        }
        else {
            if (typeof value === 'object') {
                return value.upper;
            }
            return value;
        }
    }
    emitStyle() {
        this.ionStyle.emit({
            'range-disabled': this.disabled
        });
    }
    fireBlur() {
        if (this.hasFocus) {
            this.hasFocus = false;
            this.ionBlur.emit();
            this.emitStyle();
        }
    }
    fireFocus() {
        if (!this.hasFocus) {
            this.hasFocus = true;
            this.ionFocus.emit();
            this.emitStyle();
        }
    }
    onDragStart(detail) {
        this.fireFocus();
        const el = this.el.querySelector('.range-slider');
        const rect = this.rect = el.getBoundingClientRect();
        const currentX = detail.currentX;
        // figure out which knob they started closer to
        const ratio = clamp(0, (currentX - rect.left) / rect.width, 1);
        this.pressedKnob = (!this.dualKnobs || (Math.abs(this.ratioA - ratio) < Math.abs(this.ratioB - ratio)))
            ? 1 /* A */
            : 2 /* B */;
        // update the active knob's position
        this.update(currentX);
    }
    onDragMove(detail) {
        this.update(detail.currentX);
    }
    onDragEnd(detail) {
        this.update(detail.currentX);
        this.pressedKnob = 0 /* None */;
        this.fireBlur();
    }
    update(currentX) {
        // figure out where the pointer is currently at
        // update the knob being interacted with
        const rect = this.rect;
        let ratio = clamp(0, (currentX - rect.left) / rect.width, 1);
        if (this.snaps) {
            // snaps the ratio to the current value
            const value = ratioToValue(ratio, this.min, this.max, this.step);
            ratio = valueToRatio(value, this.min, this.max);
        }
        // update which knob is pressed
        if (this.pressedKnob === 1 /* A */) {
            this.ratioA = ratio;
        }
        else {
            this.ratioB = ratio;
        }
        // Update input value
        this.updateValue();
    }
    get valA() {
        return ratioToValue(this.ratioA, this.min, this.max, this.step);
    }
    get valB() {
        return ratioToValue(this.ratioB, this.min, this.max, this.step);
    }
    get ratioLower() {
        if (this.dualKnobs) {
            return Math.min(this.ratioA, this.ratioB);
        }
        return 0;
    }
    get ratioUpper() {
        if (this.dualKnobs) {
            return Math.max(this.ratioA, this.ratioB);
        }
        return this.ratioA;
    }
    updateRatio() {
        const value = this.getValue();
        const { min, max } = this;
        if (this.dualKnobs) {
            this.ratioA = valueToRatio(value.lower, min, max);
            this.ratioB = valueToRatio(value.upper, min, max);
        }
        else {
            this.ratioA = valueToRatio(value, min, max);
        }
    }
    updateValue() {
        this.noUpdate = true;
        const { valA, valB } = this;
        this.value = (!this.dualKnobs)
            ? valA
            : {
                lower: Math.min(valA, valB),
                upper: Math.max(valA, valB)
            };
        this.noUpdate = false;
    }
    hostData() {
        return {
            class: {
                'range-disabled': this.disabled,
                'range-pressed': this.pressedKnob !== 0 /* None */,
                'range-has-pin': this.pin
            }
        };
    }
    render() {
        const { min, max, step, ratioLower, ratioUpper } = this;
        const barL = `${ratioLower * 100}%`;
        const barR = `${100 - ratioUpper * 100}%`;
        const ticks = [];
        if (this.snaps) {
            for (let value = min; value <= max; value += step) {
                const ratio = valueToRatio(value, min, max);
                ticks.push({
                    ratio,
                    active: ratio >= ratioLower && ratio <= ratioUpper,
                    left: `${ratio * 100}%`
                });
            }
        }
        return [
            h("slot", { name: "start" }),
            h("ion-gesture", { disableScroll: true, onStart: this.onDragStart.bind(this), onMove: this.onDragMove.bind(this), onEnd: this.onDragEnd.bind(this), disabled: this.disabled, gestureName: "range", gesturePriority: 30, direction: "x", threshold: 0 },
                h("div", { class: "range-slider" },
                    ticks.map(t => h("div", { style: { left: t.left }, role: "presentation", class: {
                            'range-tick': true,
                            'range-tick-active': t.active
                        } })),
                    h("div", { class: "range-bar", role: "presentation" }),
                    h("div", { class: "range-bar range-bar-active", role: "presentation", style: {
                            left: barL,
                            right: barR
                        } }),
                    h("ion-range-knob", { knob: 1 /* A */, pressed: this.pressedKnob === 1 /* A */, value: this.valA, ratio: this.ratioA, pin: this.pin, min: min, max: max }),
                    this.dualKnobs &&
                        h("ion-range-knob", { knob: 2 /* B */, pressed: this.pressedKnob === 2 /* B */, value: this.valB, ratio: this.ratioB, pin: this.pin, min: min, max: max }))),
            h("slot", { name: "end" })
        ];
    }
    static get is() { return "ion-range"; }
    static get host() { return {
        "theme": "range"
    }; }
    static get properties() { return {
        "color": {
            "type": String,
            "attr": "color"
        },
        "debounce": {
            "type": Number,
            "attr": "debounce",
            "watchCallbacks": ["debounceChanged"]
        },
        "disabled": {
            "type": Boolean,
            "attr": "disabled",
            "watchCallbacks": ["disabledChanged"]
        },
        "dualKnobs": {
            "type": Boolean,
            "attr": "dual-knobs"
        },
        "el": {
            "elementRef": true
        },
        "max": {
            "type": Number,
            "attr": "max"
        },
        "min": {
            "type": Number,
            "attr": "min"
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "pin": {
            "type": Boolean,
            "attr": "pin"
        },
        "pressedKnob": {
            "state": true
        },
        "ratioA": {
            "state": true
        },
        "ratioB": {
            "state": true
        },
        "snaps": {
            "type": Boolean,
            "attr": "snaps"
        },
        "step": {
            "type": Number,
            "attr": "step"
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
            "name": "ionStyle",
            "method": "ionStyle",
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
        }]; }
    static get listeners() { return [{
            "name": "ionIncrease",
            "method": "keyChng"
        }, {
            "name": "ionDecrease",
            "method": "keyChng"
        }]; }
    static get style() { return "/**style-placeholder:ion-range:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-range:**/"; }
}
export function ratioToValue(ratio, min, max, step) {
    let value = ((max - min) * ratio);
    if (step > 0) {
        value = Math.round(value / step) * step + min;
    }
    return clamp(min, value, max);
}
export function valueToRatio(value, min, max) {
    return clamp(0, (value - min) / (max - min), 1);
}
