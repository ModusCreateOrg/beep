import { createOverlay, dismissOverlay, getTopOverlay, removeLastOverlay } from '../../utils/overlays';
export class PopoverController {
    constructor() {
        this.popovers = new Map();
    }
    popoverWillPresent(ev) {
        this.popovers.set(ev.target.overlayId, ev.target);
    }
    popoverWillDismiss(ev) {
        this.popovers.delete(ev.target.overlayId);
    }
    escapeKeyUp() {
        removeLastOverlay(this.popovers);
    }
    /*
     * Create a popover overlay with popover options.
     */
    create(opts) {
        return createOverlay(this.doc.createElement('ion-popover'), opts);
    }
    /*
     * Dismiss the open popover overlay.
     */
    dismiss(data, role, popoverId = -1) {
        return dismissOverlay(data, role, this.popovers, popoverId);
    }
    /*
     * Get the most recently opened popover overlay.
     */
    getTop() {
        return getTopOverlay(this.popovers);
    }
    static get is() { return "ion-popover-controller"; }
    static get properties() { return {
        "create": {
            "method": true
        },
        "dismiss": {
            "method": true
        },
        "doc": {
            "context": "document"
        },
        "getTop": {
            "method": true
        }
    }; }
    static get listeners() { return [{
            "name": "body:ionPopoverWillPresent",
            "method": "popoverWillPresent"
        }, {
            "name": "body:ionPopoverWillDismiss",
            "method": "popoverWillDismiss"
        }, {
            "name": "body:ionPopoverDidUnload",
            "method": "popoverWillDismiss"
        }, {
            "name": "body:keyup.escape",
            "method": "escapeKeyUp"
        }]; }
}
