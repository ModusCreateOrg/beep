import { BlockerDelegate, GestureDelegate } from './gesture-controller-utils';
export class GestureController {
    constructor() {
        this.gestureId = 0;
        this.requestedStart = new Map();
        this.disabledGestures = new Map();
        this.disabledScroll = new Set();
        this.capturedId = null;
    }
    create(config) {
        return Promise.resolve(new GestureDelegate(this, this.newID(), config.name, config.priority ? config.priority : 0, !!config.disableScroll));
    }
    createBlocker(opts = {}) {
        return new BlockerDelegate(this.newID(), this, opts.disable, !!opts.disableScroll);
    }
    start(gestureName, id, priority) {
        if (!this.canStart(gestureName)) {
            this.requestedStart.delete(id);
            return false;
        }
        this.requestedStart.set(id, priority);
        return true;
    }
    capture(gestureName, id, priority) {
        if (!this.start(gestureName, id, priority)) {
            return false;
        }
        const requestedStart = this.requestedStart;
        let maxPriority = -10000;
        requestedStart.forEach(value => {
            maxPriority = Math.max(maxPriority, value);
        });
        if (maxPriority === priority) {
            this.capturedId = id;
            requestedStart.clear();
            this.ionGestureCaptured && this.ionGestureCaptured.emit(gestureName);
            return true;
        }
        requestedStart.delete(id);
        return false;
    }
    release(id) {
        this.requestedStart.delete(id);
        if (this.capturedId && id === this.capturedId) {
            this.capturedId = null;
        }
    }
    disableGesture(gestureName, id) {
        let set = this.disabledGestures.get(gestureName);
        if (!set) {
            set = new Set();
            this.disabledGestures.set(gestureName, set);
        }
        set.add(id);
    }
    enableGesture(gestureName, id) {
        const set = this.disabledGestures.get(gestureName);
        if (set) {
            set.delete(id);
        }
    }
    disableScroll(id) {
        this.disabledScroll.add(id);
    }
    enableScroll(id) {
        this.disabledScroll.delete(id);
    }
    canStart(gestureName) {
        if (this.capturedId) {
            // a gesture already captured
            return false;
        }
        if (this.isDisabled(gestureName)) {
            return false;
        }
        return true;
    }
    isCaptured() {
        return !!this.capturedId;
    }
    isScrollDisabled() {
        return this.disabledScroll.size > 0;
    }
    isDisabled(gestureName) {
        const disabled = this.disabledGestures.get(gestureName);
        if (disabled && disabled.size > 0) {
            return true;
        }
        return false;
    }
    newID() {
        this.gestureId++;
        return this.gestureId;
    }
    static get is() { return "ion-gesture-controller"; }
    static get properties() { return {
        "create": {
            "method": true
        },
        "createBlocker": {
            "method": true
        }
    }; }
    static get events() { return [{
            "name": "ionGestureCaptured",
            "method": "ionGestureCaptured",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
}
