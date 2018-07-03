import { createOverlay, dismissOverlay, getTopOverlay, removeLastOverlay } from '../../utils/overlays';
export class ActionSheetController {
    constructor() {
        this.actionSheets = new Map();
    }
    actionSheetWillPresent(ev) {
        this.actionSheets.set(ev.target.overlayId, ev.target);
    }
    actionSheetWillDismiss(ev) {
        this.actionSheets.delete(ev.target.overlayId);
    }
    escapeKeyUp() {
        removeLastOverlay(this.actionSheets);
    }
    /*
     * Create an action sheet overlay with action sheet options.
     */
    create(opts) {
        return createOverlay(this.doc.createElement('ion-action-sheet'), opts);
    }
    /*
     * Dismiss the open action sheet overlay.
     */
    dismiss(data, role, actionSheetId = -1) {
        return dismissOverlay(data, role, this.actionSheets, actionSheetId);
    }
    /*
     * Get the most recently opened action sheet overlay.
     */
    getTop() {
        return getTopOverlay(this.actionSheets);
    }
    static get is() { return "ion-action-sheet-controller"; }
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
            "name": "body:ionActionSheetWillPresent",
            "method": "actionSheetWillPresent"
        }, {
            "name": "body:ionActionSheetWillDismiss",
            "method": "actionSheetWillDismiss"
        }, {
            "name": "body:ionActionSheetDidUnload",
            "method": "actionSheetWillDismiss"
        }, {
            "name": "body:keyup.escape",
            "method": "escapeKeyUp"
        }]; }
}
