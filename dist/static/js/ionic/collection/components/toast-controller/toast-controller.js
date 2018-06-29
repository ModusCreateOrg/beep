import { createOverlay, dismissOverlay, getTopOverlay, removeLastOverlay } from '../../utils/overlays';
export class ToastController {
    constructor() {
        this.toasts = new Map();
    }
    toastWillPresent(ev) {
        this.toasts.set(ev.target.overlayId, ev.target);
    }
    toastWillDismiss(ev) {
        this.toasts.delete(ev.target.overlayId);
    }
    escapeKeyUp() {
        removeLastOverlay(this.toasts);
    }
    /*
     * Create a toast overlay with toast options.
     */
    create(opts) {
        return createOverlay(this.doc.createElement('ion-toast'), opts);
    }
    /*
     * Dismiss the open toast overlay.
     */
    dismiss(data, role, toastId = -1) {
        return dismissOverlay(data, role, this.toasts, toastId);
    }
    /*
     * Get the most recently opened toast overlay.
     */
    getTop() {
        return getTopOverlay(this.toasts);
    }
    static get is() { return "ion-toast-controller"; }
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
            "name": "body:ionToastWillPresent",
            "method": "toastWillPresent"
        }, {
            "name": "body:ionToastWillDismiss",
            "method": "toastWillDismiss"
        }, {
            "name": "body:ionToastDidUnload",
            "method": "toastWillDismiss"
        }, {
            "name": "body:keyup.escape",
            "method": "escapeKeyUp"
        }]; }
}
