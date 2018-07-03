import { transition } from '../../utils';
import { attachComponent, detachComponent } from '../../utils/framework-delegate';
export class RouterOutlet {
    constructor() {
        this.isTransitioning = false;
    }
    componentWillLoad() {
        if (this.animated === undefined) {
            this.animated = this.config.getBoolean('animate', true);
        }
        this.ionNavWillLoad.emit();
    }
    componentDidUnload() {
        this.activeEl = this.activeComponent = undefined;
    }
    async setRoot(component, params, opts) {
        if (this.isTransitioning || this.activeComponent === component) {
            return false;
        }
        this.activeComponent = component;
        // attach entering view to DOM
        const enteringEl = await attachComponent(this.delegate, this.el, component, ['ion-page', 'hide-page'], params);
        const leavingEl = this.activeEl;
        // commit animation
        await this.commit(enteringEl, leavingEl, opts);
        // remove leaving view
        this.activeEl = enteringEl;
        detachComponent(this.delegate, leavingEl);
        return true;
    }
    async commit(enteringEl, leavingEl, opts) {
        // isTransitioning acts as a lock to prevent reentering
        if (this.isTransitioning || leavingEl === enteringEl) {
            return false;
        }
        this.isTransitioning = true;
        // emit nav will change event
        this.ionNavWillChange.emit();
        opts = opts || {};
        await transition(Object.assign({ mode: this.mode, animated: this.animated, animationCtrl: this.animationCtrl, window: this.win, enteringEl: enteringEl, leavingEl: leavingEl, baseEl: this.el }, opts));
        this.isTransitioning = false;
        // emit nav changed event
        this.ionNavDidChange.emit();
        return true;
    }
    async setRouteId(id, params, direction) {
        const changed = await this.setRoot(id, params, {
            duration: direction === 0 ? 0 : undefined,
            direction: direction === -1 ? 'back' : 'forward',
        });
        return {
            changed,
            element: this.activeEl
        };
    }
    getRouteId() {
        const active = this.activeEl;
        return active ? {
            id: active.tagName,
            element: active,
        } : undefined;
    }
    render() {
        return [
            this.mode === 'ios' && h("div", { class: "nav-decor" }),
            h("slot", null)
        ];
    }
    static get is() { return "ion-router-outlet"; }
    static get properties() { return {
        "animated": {
            "type": Boolean,
            "attr": "animated",
            "mutable": true
        },
        "animationBuilder": {
            "type": "Any",
            "attr": "animation-builder"
        },
        "animationCtrl": {
            "connect": "ion-animation-controller"
        },
        "commit": {
            "method": true
        },
        "config": {
            "context": "config"
        },
        "delegate": {
            "type": "Any",
            "attr": "delegate"
        },
        "el": {
            "elementRef": true
        },
        "getRouteId": {
            "method": true
        },
        "setRoot": {
            "method": true
        },
        "setRouteId": {
            "method": true
        },
        "win": {
            "context": "window"
        }
    }; }
    static get events() { return [{
            "name": "ionNavWillLoad",
            "method": "ionNavWillLoad",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionNavWillChange",
            "method": "ionNavWillChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionNavDidChange",
            "method": "ionNavDidChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
}
