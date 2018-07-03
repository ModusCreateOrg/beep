import { createThemedClasses } from '../../utils/theme';
export class Header {
    constructor() {
        /**
         * If true, the header will be translucent.
         * Note: In order to scroll content behind the header, the `fullscreen`
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
    static get is() { return "ion-header"; }
    static get host() { return {
        "theme": "header"
    }; }
    static get properties() { return {
        "translucent": {
            "type": Boolean,
            "attr": "translucent"
        }
    }; }
    static get style() { return "/**style-placeholder:ion-header:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-header:**/"; }
}
