export class Fab {
    constructor() {
        /**
         * If true, the fab will display on the edge of the header if
         * `vertical` is `"top"`, and on the edge of the footer if
         * it is `"bottom"`. Should be used with a `fixed` slot.
         */
        this.edge = false;
        this.activated = false;
    }
    activatedChanged() {
        const activated = this.activated;
        const fab = this.el.querySelector('ion-fab-button');
        if (fab) {
            fab.activated = activated;
        }
        Array.from(this.el.querySelectorAll('ion-fab-list')).forEach(list => {
            list.activated = activated;
        });
    }
    componentDidLoad() {
        this.activatedChanged();
    }
    onClick() {
        const hasList = !!this.el.querySelector('ion-fab-list');
        if (hasList) {
            this.activated = !this.activated;
        }
    }
    /**
     * Close an active FAB list container
     */
    close() {
        this.activated = false;
    }
    hostData() {
        return {
            class: {
                [`fab-horizontal-${this.horizontal}`]: !!this.horizontal,
                [`fab-vertical-${this.vertical}`]: !!this.vertical,
                ['fab-edge']: this.edge
            }
        };
    }
    static get is() { return "ion-fab"; }
    static get properties() { return {
        "activated": {
            "type": Boolean,
            "attr": "activated",
            "mutable": true,
            "watchCallbacks": ["activatedChanged"]
        },
        "close": {
            "method": true
        },
        "edge": {
            "type": Boolean,
            "attr": "edge"
        },
        "el": {
            "elementRef": true
        },
        "horizontal": {
            "type": String,
            "attr": "horizontal"
        },
        "vertical": {
            "type": String,
            "attr": "vertical"
        }
    }; }
    static get listeners() { return [{
            "name": "click",
            "method": "onClick"
        }]; }
    static get style() { return "/**style-placeholder:ion-fab:**/"; }
}
