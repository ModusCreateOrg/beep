import { createThemedClasses } from '../../utils/theme';
export class Footer {
    constructor() {
        /**
         * If true, the footer will be translucent.
         * Note: In order to scroll content behind the footer, the `fullscreen`
         * attribute needs to be set on the content.
         * Defaults to `false`.
         */
        this.translucent = false;
    }
    hostData() {
        const themedClasses = this.translucent ? createThemedClasses(this.mode, this.color, 'header-translucent') : {};
        const hostClasses = Object.assign({}, themedClasses);
        return {
            class: hostClasses
        };
    }
    static get is() { return "ion-footer"; }
    static get host() { return {
        "theme": "footer"
    }; }
    static get properties() { return {
        "translucent": {
            "type": Boolean,
            "attr": "translucent"
        }
    }; }
    static get style() { return "/**style-placeholder:ion-footer:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-footer:**/"; }
}
