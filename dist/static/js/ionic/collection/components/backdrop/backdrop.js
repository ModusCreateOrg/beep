import { now } from '../../utils/helpers';
export class Backdrop {
    constructor() {
        this.lastClick = -10000;
        /**
         * If true, the backdrop will be visible. Defaults to `true`.
         */
        this.visible = true;
        /**
         * If true, the backdrop will can be clicked and will emit the `ionBackdropTap` event. Defaults to `true`.
         */
        this.tappable = true;
        /**
         * If true, the backdrop will stop propagation on tap. Defaults to `true`.
         */
        this.stopPropagation = true;
    }
    componentDidLoad() {
        registerBackdrop(this.doc, this);
    }
    componentDidUnload() {
        unregisterBackdrop(this.doc, this);
    }
    onTouchStart(ev) {
        this.lastClick = now(ev);
        this.emitTap(ev);
    }
    onMouseDown(ev) {
        if (this.lastClick < now(ev) - 2500) {
            this.emitTap(ev);
        }
    }
    emitTap(ev) {
        if (this.stopPropagation) {
            ev.preventDefault();
            ev.stopPropagation();
        }
        if (this.tappable) {
            this.ionBackdropTap.emit();
        }
    }
    hostData() {
        return {
            tabindex: '-1',
            class: {
                'backdrop-hide': !this.visible,
                'backdrop-no-tappable': !this.tappable,
            }
        };
    }
    static get is() { return "ion-backdrop"; }
    static get host() { return {
        "theme": "backdrop"
    }; }
    static get properties() { return {
        "doc": {
            "context": "document"
        },
        "stopPropagation": {
            "type": Boolean,
            "attr": "stop-propagation"
        },
        "tappable": {
            "type": Boolean,
            "attr": "tappable"
        },
        "visible": {
            "type": Boolean,
            "attr": "visible"
        }
    }; }
    static get events() { return [{
            "name": "ionBackdropTap",
            "method": "ionBackdropTap",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "touchstart",
            "method": "onTouchStart",
            "capture": true
        }, {
            "name": "mousedown",
            "method": "onMouseDown",
            "capture": true
        }]; }
    static get style() { return "/**style-placeholder:ion-backdrop:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-backdrop:**/"; }
}
const BACKDROP_NO_SCROLL = 'backdrop-no-scroll';
const activeBackdrops = new Set();
function registerBackdrop(doc, backdrop) {
    activeBackdrops.add(backdrop);
    doc.body.classList.add(BACKDROP_NO_SCROLL);
}
function unregisterBackdrop(doc, backdrop) {
    activeBackdrops.delete(backdrop);
    if (activeBackdrops.size === 0) {
        doc.body.classList.remove(BACKDROP_NO_SCROLL);
    }
}
