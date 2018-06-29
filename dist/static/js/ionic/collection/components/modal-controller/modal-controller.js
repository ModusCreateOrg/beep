import { createOverlay, dismissOverlay, getTopOverlay, removeLastOverlay } from '../../utils/overlays';
export class ModalController {
    constructor() {
        this.modals = new Map();
    }
    modalWillPresent(ev) {
        this.modals.set(ev.target.overlayId, ev.target);
    }
    modalWillDismiss(ev) {
        this.modals.delete(ev.target.overlayId);
    }
    escapeKeyUp() {
        removeLastOverlay(this.modals);
    }
    /*
     * Create a modal overlay with modal options.
     */
    create(opts) {
        return createOverlay(this.doc.createElement('ion-modal'), opts);
    }
    /*
     * Dismiss the open modal overlay.
     */
    dismiss(data, role, modalId = -1) {
        return dismissOverlay(data, role, this.modals, modalId);
    }
    /*
     * Get the most recently opened modal overlay.
     */
    getTop() {
        return getTopOverlay(this.modals);
    }
    static get is() { return "ion-modal-controller"; }
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
            "name": "body:ionModalWillPresent",
            "method": "modalWillPresent"
        }, {
            "name": "body:ionModalWillDismiss",
            "method": "modalWillDismiss"
        }, {
            "name": "body:ionModalDidUnload",
            "method": "modalWillDismiss"
        }, {
            "name": "body:keyup.escape",
            "method": "escapeKeyUp"
        }]; }
}
