import { createThemedClasses } from '../../utils/theme';
export class CardHeader {
    constructor() {
        /**
         * If true, the card header will be translucent. Defaults to `false`.
         */
        this.translucent = false;
    }
    hostData() {
        const themedClasses = this.translucent ? createThemedClasses(this.mode, this.color, 'card-header-translucent') : {};
        const hostClasses = Object.assign({}, themedClasses);
        return {
            class: hostClasses
        };
    }
    static get is() { return "ion-card-header"; }
    static get host() { return {
        "theme": "card-header"
    }; }
    static get properties() { return {
        "color": {
            "type": String,
            "attr": "color"
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
    static get style() { return "/**style-placeholder:ion-card-header:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-card-header:**/"; }
}
