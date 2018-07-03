import { createOverlay, dismissOverlay, getTopOverlay, removeLastOverlay } from '../../utils/overlays';
export class LoadingController {
    constructor() {
        this.loadings = new Map();
    }
    loadingWillPresent(ev) {
        this.loadings.set(ev.target.overlayId, ev.target);
    }
    loadingWillDismiss(ev) {
        this.loadings.delete(ev.target.overlayId);
    }
    escapeKeyUp() {
        removeLastOverlay(this.loadings);
    }
    /*
     * Create a loading overlay with loading options.
     */
    create(opts) {
        return createOverlay(this.doc.createElement('ion-loading'), opts);
    }
    /*
     * Dismiss the open loading overlay.
     */
    dismiss(data, role, loadingId = -1) {
        return dismissOverlay(data, role, this.loadings, loadingId);
    }
    /*
     * Get the most recently opened loading overlay.
     */
    getTop() {
        return getTopOverlay(this.loadings);
    }
    static get is() { return "ion-loading-controller"; }
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
            "name": "body:ionLoadingWillPresent",
            "method": "loadingWillPresent"
        }, {
            "name": "body:ionLoadingWillDismiss",
            "method": "loadingWillDismiss"
        }, {
            "name": "body:ionLoadingDidUnload",
            "method": "loadingWillDismiss"
        }, {
            "name": "body:keyup.escape",
            "method": "escapeKeyUp"
        }]; }
}
