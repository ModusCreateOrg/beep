import { createThemedClasses } from '../../utils/theme';
import { SPINNERS } from './spinner-configs';
export class Spinner {
    constructor() {
        /**
         * If true, the spinner's animation will be paused. Defaults to `false`.
         */
        this.paused = false;
    }
    getName() {
        let name = this.name || this.config.get('spinner');
        if (!name) {
            // fallback
            if (this.mode === 'md') {
                return 'crescent';
            }
            else {
                return 'lines';
            }
        }
        if (name === 'ios') {
            // deprecation warning, renamed in v4
            console.warn(`spinner "ios" has been renamed to "lines"`);
            name = 'lines';
        }
        else if (name === 'ios-small') {
            // deprecation warning, renamed in v4
            console.warn(`spinner "ios-small" has been renamed to "lines-small"`);
            name = 'lines-small';
        }
        return name;
    }
    hostData() {
        const themedClasses = createThemedClasses(this.mode, this.color, `spinner spinner-${this.getName()}`);
        const spinnerClasses = Object.assign({}, themedClasses, { 'spinner-paused': this.paused });
        return {
            class: spinnerClasses
        };
    }
    render() {
        const name = this.getName();
        const spinner = SPINNERS[name] || SPINNERS['lines'];
        const duration = (typeof this.duration === 'number' && this.duration > 10 ? this.duration : spinner.dur);
        const svgs = [];
        if (spinner.circles) {
            for (let i = 0; i < spinner.circles; i++) {
                svgs.push(buildCircle(spinner, duration, i, spinner.circles));
            }
        }
        else if (spinner.lines) {
            for (let i = 0; i < spinner.lines; i++) {
                svgs.push(buildLine(spinner, duration, i, spinner.lines));
            }
        }
        return svgs;
    }
    static get is() { return "ion-spinner"; }
    static get host() { return {
        "theme": "spinner"
    }; }
    static get properties() { return {
        "color": {
            "type": String,
            "attr": "color"
        },
        "config": {
            "context": "config"
        },
        "duration": {
            "type": Number,
            "attr": "duration"
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "paused": {
            "type": Boolean,
            "attr": "paused"
        }
    }; }
    static get style() { return "/**style-placeholder:ion-spinner:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-spinner:**/"; }
}
function buildCircle(spinner, duration, index, total) {
    const data = spinner.fn(duration, index, total);
    data.style.animationDuration = duration + 'ms';
    return (h("svg", { viewBox: "0 0 64 64", style: data.style },
        h("circle", { transform: "translate(32,32)", r: data.r })));
}
function buildLine(spinner, duration, index, total) {
    const data = spinner.fn(duration, index, total);
    data.style.animationDuration = duration + 'ms';
    return (h("svg", { viewBox: "0 0 64 64", style: data.style },
        h("line", { transform: "translate(32,32)", y1: data.y1, y2: data.y2 })));
}
