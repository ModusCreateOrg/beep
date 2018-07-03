import { isDevice, isHybrid, needInputShims } from '../../utils/platform';
export class App {
    componentDidLoad() {
        loadInputShims(this.win, this.config);
    }
    hostData() {
        const hybrid = isHybrid(this.win);
        const statusBar = this.config.getBoolean('statusbarPadding', hybrid);
        return {
            class: {
                [this.mode]: true,
                'statusbar-padding': statusBar
            }
        };
    }
    render() {
        const device = this.config.getBoolean('isDevice', isDevice(this.win));
        return [
            h("ion-tap-click", null),
            device && h("ion-status-tap", null),
            h("slot", null)
        ];
    }
    static get is() { return "ion-app"; }
    static get host() { return {
        "theme": "app"
    }; }
    static get properties() { return {
        "config": {
            "context": "config"
        },
        "el": {
            "elementRef": true
        },
        "win": {
            "context": "window"
        }
    }; }
    static get style() { return "/**style-placeholder:ion-app:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-app:**/"; }
}
async function loadInputShims(win, config) {
    const inputShims = config.getBoolean('inputShims', needInputShims(win));
    if (inputShims) {
        (await import('../../utils/input-shims/input-shims')).startInputShims(win.document, config);
    }
}
