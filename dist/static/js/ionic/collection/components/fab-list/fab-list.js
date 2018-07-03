export class FabList {
    constructor() {
        /**
         * If true, the fab list will be show all fab buttons in the list. Defaults to `false`.
         */
        this.activated = false;
        /**
         * The side the fab list will show on relative to the main fab button. Defaults to `'bottom'`.
         */
        this.side = 'bottom';
    }
    activatedChanged(activated) {
        const fabs = Array.from(this.el.querySelectorAll('ion-fab-button'));
        // if showing the fabs add a timeout, else show immediately
        const timeout = activated ? 30 : 0;
        fabs.forEach((fab, i) => {
            setTimeout(() => fab.show = activated, i * timeout);
        });
    }
    hostData() {
        return {
            class: {
                'fab-list-active': this.activated,
                [`fab-list-side-${this.side}`]: this.side
            }
        };
    }
    static get is() { return "ion-fab-list"; }
    static get properties() { return {
        "activated": {
            "type": Boolean,
            "attr": "activated",
            "watchCallbacks": ["activatedChanged"]
        },
        "el": {
            "elementRef": true
        },
        "side": {
            "type": String,
            "attr": "side"
        }
    }; }
    static get style() { return "/**style-placeholder:ion-fab-list:**/"; }
}
