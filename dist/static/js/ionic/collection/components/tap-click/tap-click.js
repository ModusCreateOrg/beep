import { now, pointerCoord } from '../../utils/helpers';
export class TapClick {
    constructor() {
        this.lastTouch = -MOUSE_WAIT * 10;
        this.lastActivated = 0;
        this.cancelled = false;
        this.clearDefers = new WeakMap();
    }
    onBodyClick(ev) {
        if (this.cancelled) {
            ev.preventDefault();
            ev.stopPropagation();
        }
    }
    // Touch Events
    onTouchStart(ev) {
        this.lastTouch = now(ev);
        this.pointerDown(ev);
    }
    onTouchEnd(ev) {
        this.lastTouch = now(ev);
        this.pointerUp(ev);
    }
    onMouseDown(ev) {
        const t = now(ev) - MOUSE_WAIT;
        if (this.lastTouch < t) {
            this.pointerDown(ev);
        }
    }
    onMouseUp(ev) {
        const t = now(ev) - MOUSE_WAIT;
        if (this.lastTouch < t) {
            this.pointerUp(ev);
        }
    }
    cancelActive() {
        clearTimeout(this.activeDefer);
        if (this.activatableEle) {
            this.removeActivated(false);
            this.activatableEle = undefined;
        }
        this.cancelled = true;
    }
    pointerDown(ev) {
        if (this.activatableEle) {
            return;
        }
        this.cancelled = false;
        this.setActivatedElement(getActivatableTarget(ev.target), ev);
    }
    pointerUp(ev) {
        this.setActivatedElement(undefined, ev);
        if (this.cancelled && ev.cancelable) {
            ev.preventDefault();
        }
    }
    setActivatedElement(el, ev) {
        // do nothing
        const activatableEle = this.activatableEle;
        if (el && el === activatableEle) {
            return;
        }
        clearTimeout(this.activeDefer);
        this.activeDefer = undefined;
        const { x, y } = pointerCoord(ev);
        // unactivate selected
        if (activatableEle) {
            if (this.clearDefers.has(activatableEle)) {
                throw new Error('internal error');
            }
            if (!activatableEle.classList.contains(ACTIVATED)) {
                this.addActivated(activatableEle, x, y);
            }
            this.removeActivated(true);
        }
        // activate
        if (el) {
            const deferId = this.clearDefers.get(el);
            if (deferId) {
                clearTimeout(deferId);
                this.clearDefers.delete(el);
            }
            el.classList.remove(ACTIVATED);
            this.activeDefer = setTimeout(() => {
                this.addActivated(el, x, y);
                this.activeDefer = undefined;
            }, ADD_ACTIVATED_DEFERS);
        }
        this.activatableEle = el;
    }
    addActivated(el, x, y) {
        this.lastActivated = Date.now();
        el.classList.add(ACTIVATED);
        const event = new CustomEvent('ionActivated', {
            bubbles: false,
            detail: { x, y }
        });
        el.dispatchEvent(event);
    }
    removeActivated(smooth) {
        const activatableEle = this.activatableEle;
        if (!activatableEle) {
            return;
        }
        const time = CLEAR_STATE_DEFERS - Date.now() + this.lastActivated;
        if (smooth && time > 0) {
            const deferId = setTimeout(() => {
                activatableEle.classList.remove(ACTIVATED);
                this.clearDefers.delete(activatableEle);
            }, CLEAR_STATE_DEFERS);
            this.clearDefers.set(activatableEle, deferId);
        }
        else {
            activatableEle.classList.remove(ACTIVATED);
        }
    }
    static get is() { return "ion-tap-click"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "enableListener": {
            "context": "enableListener"
        },
        "isServer": {
            "context": "isServer"
        }
    }; }
    static get listeners() { return [{
            "name": "body:click",
            "method": "onBodyClick",
            "capture": true
        }, {
            "name": "document:touchstart",
            "method": "onTouchStart",
            "capture": true,
            "passive": true
        }, {
            "name": "document:touchcancel",
            "method": "onTouchEnd",
            "capture": true
        }, {
            "name": "document:touchend",
            "method": "onTouchEnd",
            "capture": true
        }, {
            "name": "document:mousedown",
            "method": "onMouseDown",
            "capture": true,
            "passive": true
        }, {
            "name": "document:mouseup",
            "method": "onMouseUp",
            "capture": true
        }, {
            "name": "body:ionScrollStart",
            "method": "cancelActive"
        }, {
            "name": "body:ionGestureCaptured",
            "method": "cancelActive"
        }]; }
}
function getActivatableTarget(el) {
    return el.closest('a,button,[tappable]');
}
const ACTIVATED = 'activated';
const ADD_ACTIVATED_DEFERS = 200;
const CLEAR_STATE_DEFERS = 200;
const MOUSE_WAIT = 2500;
