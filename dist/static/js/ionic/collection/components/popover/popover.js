import { attachComponent, detachComponent } from '../../utils/framework-delegate';
import { BACKDROP, dismiss, eventMethod, present } from '../../utils/overlays';
import { createThemedClasses, getClassMap } from '../../utils/theme';
import { iosEnterAnimation } from './animations/ios.enter';
import { iosLeaveAnimation } from './animations/ios.leave';
import { mdEnterAnimation } from './animations/md.enter';
import { mdLeaveAnimation } from './animations/md.leave';
export class Popover {
    constructor() {
        this.presented = false;
        this.keyboardClose = true;
        /**
         * If true, the popover will be dismissed when the backdrop is clicked. Defaults to `true`.
         */
        this.enableBackdropDismiss = true;
        /**
         * If true, a backdrop will be displayed behind the popover. Defaults to `true`.
         */
        this.showBackdrop = true;
        /**
         * If true, the popover will be translucent. Defaults to `false`.
         */
        this.translucent = false;
        /**
         * If true, the popover will animate. Defaults to `true`.
         */
        this.willAnimate = true;
    }
    componentDidLoad() {
        this.ionPopoverDidLoad.emit();
    }
    componentDidUnload() {
        this.ionPopoverDidUnload.emit();
    }
    onDismiss(ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this.dismiss();
    }
    onBackdropTap() {
        this.dismiss(null, BACKDROP);
    }
    lifecycle(modalEvent) {
        const el = this.usersElement;
        const name = LIFECYCLE_MAP[modalEvent.type];
        if (el && name) {
            const event = new CustomEvent(name, {
                bubbles: false,
                cancelable: false,
                detail: modalEvent.detail
            });
            el.dispatchEvent(event);
        }
    }
    /**
     * Present the popover overlay after it has been created.
     */
    async present() {
        if (this.presented) {
            return;
        }
        const container = this.el.querySelector('.popover-content');
        if (!container) {
            throw new Error('container is undefined');
        }
        const data = Object.assign({}, this.componentProps, { popover: this.el });
        this.usersElement = await attachComponent(this.delegate, container, this.component, ['popover-viewport'], data);
        return present(this, 'popoverEnter', iosEnterAnimation, mdEnterAnimation, this.ev);
    }
    /**
     * Dismiss the popover overlay after it has been presented.
     */
    async dismiss(data, role) {
        await dismiss(this, data, role, 'popoverLeave', iosLeaveAnimation, mdLeaveAnimation, this.ev);
        await detachComponent(this.delegate, this.usersElement);
    }
    /**
     * Returns a promise that resolves when the popover did dismiss. It also accepts a callback
     * that is called in the same circustances.
     *
     * ```
     * const {data, role} = await popover.onDidDismiss();
     * ```
     */
    onDidDismiss(callback) {
        return eventMethod(this.el, 'ionPopoverDidDismiss', callback);
    }
    /**
     * Returns a promise that resolves when the popover will dismiss. It also accepts a callback
     * that is called in the same circustances.
     *
     * ```
     * const {data, role} = await popover.onWillDismiss();
     * ```
     */
    onWillDismiss(callback) {
        return eventMethod(this.el, 'ionPopoverWillDismiss', callback);
    }
    hostData() {
        const themedClasses = this.translucent ? createThemedClasses(this.mode, this.color, 'popover-translucent') : {};
        return {
            style: {
                zIndex: 10000 + this.overlayId,
            },
            'no-router': true,
            class: Object.assign({}, themedClasses, getClassMap(this.cssClass))
        };
    }
    render() {
        const wrapperClasses = createThemedClasses(this.mode, this.color, 'popover-wrapper');
        return [
            h("ion-backdrop", { tappable: this.enableBackdropDismiss }),
            h("div", { class: wrapperClasses },
                h("div", { class: "popover-arrow" }),
                h("div", { class: "popover-content" }))
        ];
    }
    static get is() { return "ion-popover"; }
    static get host() { return {
        "theme": "popover"
    }; }
    static get properties() { return {
        "animationCtrl": {
            "connect": "ion-animation-controller"
        },
        "color": {
            "type": String,
            "attr": "color"
        },
        "component": {
            "type": String,
            "attr": "component"
        },
        "componentProps": {
            "type": "Any",
            "attr": "component-props"
        },
        "config": {
            "context": "config"
        },
        "cssClass": {
            "type": String,
            "attr": "css-class"
        },
        "delegate": {
            "type": "Any",
            "attr": "delegate"
        },
        "dismiss": {
            "method": true
        },
        "el": {
            "elementRef": true
        },
        "enableBackdropDismiss": {
            "type": Boolean,
            "attr": "enable-backdrop-dismiss"
        },
        "enterAnimation": {
            "type": "Any",
            "attr": "enter-animation"
        },
        "ev": {
            "type": "Any",
            "attr": "ev"
        },
        "keyboardClose": {
            "type": Boolean,
            "attr": "keyboard-close"
        },
        "leaveAnimation": {
            "type": "Any",
            "attr": "leave-animation"
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "onDidDismiss": {
            "method": true
        },
        "onWillDismiss": {
            "method": true
        },
        "overlayId": {
            "type": Number,
            "attr": "overlay-id"
        },
        "present": {
            "method": true
        },
        "showBackdrop": {
            "type": Boolean,
            "attr": "show-backdrop"
        },
        "translucent": {
            "type": Boolean,
            "attr": "translucent"
        },
        "willAnimate": {
            "type": Boolean,
            "attr": "will-animate"
        }
    }; }
    static get events() { return [{
            "name": "ionPopoverDidLoad",
            "method": "ionPopoverDidLoad",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionPopoverDidUnload",
            "method": "ionPopoverDidUnload",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionPopoverDidPresent",
            "method": "didPresent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionPopoverWillPresent",
            "method": "willPresent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionPopoverWillDismiss",
            "method": "willDismiss",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionPopoverDidDismiss",
            "method": "didDismiss",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "ionDismiss",
            "method": "onDismiss"
        }, {
            "name": "ionBackdropTap",
            "method": "onBackdropTap"
        }, {
            "name": "ionPopoverDidPresent",
            "method": "lifecycle"
        }, {
            "name": "ionPopoverWillPresent",
            "method": "lifecycle"
        }, {
            "name": "ionPopoverWillDismiss",
            "method": "lifecycle"
        }, {
            "name": "ionPopoverDidDismiss",
            "method": "lifecycle"
        }]; }
    static get style() { return "/**style-placeholder:ion-popover:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-popover:**/"; }
}
const LIFECYCLE_MAP = {
    'ionPopoverDidPresent': 'ionViewDidEnter',
    'ionPopoverWillPresent': 'ionViewWillEnter',
    'ionPopoverWillDismiss': 'ionViewWillDismiss',
    'ionPopoverDidDismiss': 'ionViewDidDismiss',
};
export const POPOVER_POSITION_PROPERTIES = {
    ios: {
        padding: 2,
        unit: '%',
        showArrow: true,
        centerTarget: true
    },
    md: {
        padding: 12,
        unit: 'px',
        showArrow: false,
        centerTarget: false
    }
};
