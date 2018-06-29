import { createOverlay, dismissOverlay, getTopOverlay, removeLastOverlay } from '../../utils/overlays';
export class AlertController {
    constructor() {
        this.alerts = new Map();
    }
    alertWillPresent(ev) {
        this.alerts.set(ev.target.overlayId, ev.target);
    }
    alertWillDismiss(ev) {
        this.alerts.delete(ev.target.overlayId);
    }
    escapeKeyUp() {
        removeLastOverlay(this.alerts);
    }
    /*
     * Create an alert overlay with alert options.
     */
    create(opts) {
        return createOverlay(this.doc.createElement('ion-alert'), opts);
    }
    /*
     * Dismiss the open alert overlay.
     */
    dismiss(data, role, alertId = -1) {
        return dismissOverlay(data, role, this.alerts, alertId);
    }
    /*
     * Get the most recently opened alert overlay.
     */
    getTop() {
        return getTopOverlay(this.alerts);
    }
    static get is() { return "ion-alert-controller"; }
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
            "name": "body:ionAlertWillPresent",
            "method": "alertWillPresent"
        }, {
            "name": "body:ionAlertWillDismiss",
            "method": "alertWillDismiss"
        }, {
            "name": "body:ionAlertDidUnload",
            "method": "alertWillDismiss"
        }, {
            "name": "body:keyup.escape",
            "method": "escapeKeyUp"
        }]; }
}
