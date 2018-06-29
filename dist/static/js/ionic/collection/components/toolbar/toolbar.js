import { createThemedClasses } from '../../utils/theme';
export class Toolbar {
    constructor() {
        /**
         * If true, the toolbar will be translucent.
         * Note: In order to scroll content behind the toolbar, the `fullscreen`
         * attribute needs to be set on the content.
         * Defaults to `false`.
         */
        this.translucent = false;
    }
    hostData() {
        const themedClasses = this.translucent ? createThemedClasses(this.mode, this.color, 'toolbar-translucent') : {};
        return {
            class: themedClasses
        };
    }
    render() {
        const backgroundCss = createThemedClasses(this.mode, this.color, 'toolbar-background');
        const contentCss = createThemedClasses(this.mode, this.color, 'toolbar-content');
        return [
            h("div", { class: backgroundCss }),
            h("slot", { name: "start" }),
            h("slot", { name: "secondary" }),
            h("div", { class: contentCss },
                h("slot", null)),
            h("slot", { name: "primary" }),
            h("slot", { name: "end" })
        ];
    }
    static get is() { return "ion-toolbar"; }
    static get host() { return {
        "theme": "toolbar"
    }; }
    static get properties() { return {
        "color": {
            "type": String,
            "attr": "color"
        },
        "config": {
            "context": "config"
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "translucent": {
            "type": Boolean,
            "attr": "translucent"
        }
    }; }
    static get style() { return "/**style-placeholder:ion-toolbar:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-toolbar:**/"; }
}
