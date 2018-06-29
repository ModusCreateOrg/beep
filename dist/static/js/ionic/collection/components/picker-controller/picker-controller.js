import { createOverlay, dismissOverlay, getTopOverlay, removeLastOverlay } from '../../utils/overlays';
export class PickerController {
    constructor() {
        this.pickers = new Map();
    }
    pickerWillPresent(ev) {
        this.pickers.set(ev.target.overlayId, ev.target);
    }
    pickerWillDismiss(ev) {
        this.pickers.delete(ev.target.overlayId);
    }
    escapeKeyUp() {
        removeLastOverlay(this.pickers);
    }
    /*
     * Create a picker overlay with picker options.
     */
    create(opts) {
        return createOverlay(this.doc.createElement('ion-picker'), opts);
    }
    /*
     * Dismiss the open picker overlay.
     */
    dismiss(data, role, pickerId = -1) {
        return dismissOverlay(data, role, this.pickers, pickerId);
    }
    /*
     * Get the most recently opened picker overlay.
     */
    getTop() {
        return getTopOverlay(this.pickers);
    }
    static get is() { return "ion-picker-controller"; }
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
            "name": "body:ionPickerWillPresent",
            "method": "pickerWillPresent"
        }, {
            "name": "body:ionPickerWillDismiss",
            "method": "pickerWillDismiss"
        }, {
            "name": "body:ionPickerDidUnload",
            "method": "pickerWillDismiss"
        }, {
            "name": "body:keyup.escape",
            "method": "escapeKeyUp"
        }]; }
}
