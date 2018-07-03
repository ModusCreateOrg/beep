import { attachComponent, detachComponent } from '../../utils/framework-delegate';
import { BACKDROP, dismiss, eventMethod, present } from '../../utils/overlays';
import { createThemedClasses, getClassMap } from '../../utils/theme';
import { iosEnterAnimation } from './animations/ios.enter';
import { iosLeaveAnimation } from './animations/ios.leave';
import { mdEnterAnimation } from './animations/md.enter';
import { mdLeaveAnimation } from './animations/md.leave';
export class Modal {
    constructor() {
        this.presented = false;
        this.keyboardClose = true;
        /**
         * If true, the modal will be dismissed when the backdrop is clicked. Defaults to `true`.
         */
        this.enableBackdropDismiss = true;
        /**
         * If true, a backdrop will be displayed behind the modal. Defaults to `true`.
         */
        this.showBackdrop = true;
        /**
         * If true, the modal will animate. Defaults to `true`.
         */
        this.willAnimate = true;
    }
    componentDidLoad() {
        this.ionModalDidLoad.emit();
    }
    componentDidUnload() {
        this.ionModalDidUnload.emit();
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
     * Present the modal overlay after it has been created.
     */
    async present() {
        if (this.presented) {
            return;
        }
        const container = this.el.querySelector(`.modal-wrapper`);
        if (!container) {
            throw new Error('container is undefined');
        }
        const componentProps = Object.assign({}, this.componentProps, { modal: this.el });
        this.usersElement = await attachComponent(this.delegate, container, this.component, ['ion-page'], componentProps);
        return present(this, 'modalEnter', iosEnterAnimation, mdEnterAnimation);
    }
    /**
     * Dismiss the modal overlay after it has been presented.
     */
    async dismiss(data, role) {
        await dismiss(this, data, role, 'modalLeave', iosLeaveAnimation, mdLeaveAnimation);
        await detachComponent(this.delegate, this.usersElement);
    }
    /**
     * Returns a promise that resolves when the modal did dismiss. It also accepts a callback
     * that is called in the same circustances.
     *
     * ```
     * const {data, role} = await modal.onDidDismiss();
     * ```
     */
    onDidDismiss(callback) {
        return eventMethod(this.el, 'ionModalDidDismiss', callback);
    }
    /**
     * Returns a promise that resolves when the modal will dismiss. It also accepts a callback
     * that is called in the same circustances.
     *
     * ```
     * const {data, role} = await modal.onWillDismiss();
     * ```
     */
    onWillDismiss(callback) {
        return eventMethod(this.el, 'ionModalWillDismiss', callback);
    }
    hostData() {
        return {
            'no-router': true,
            class: getClassMap(this.cssClass),
            style: {
                zIndex: 20000 + this.overlayId,
            }
        };
    }
    render() {
        const dialogClasses = createThemedClasses(this.mode, this.color, 'modal-wrapper');
        return [
            h("ion-backdrop", { visible: this.showBackdrop, tappable: this.enableBackdropDismiss }),
            h("div", { role: "dialog", class: dialogClasses })
        ];
    }
    static get is() { return "ion-modal"; }
    static get host() { return {
        "theme": "modal"
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
        "willAnimate": {
            "type": Boolean,
            "attr": "will-animate"
        }
    }; }
    static get events() { return [{
            "name": "ionModalDidLoad",
            "method": "ionModalDidLoad",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionModalDidUnload",
            "method": "ionModalDidUnload",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionModalDidPresent",
            "method": "didPresent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionModalWillPresent",
            "method": "willPresent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionModalWillDismiss",
            "method": "willDismiss",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionModalDidDismiss",
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
            "name": "ionModalDidPresent",
            "method": "lifecycle"
        }, {
            "name": "ionModalWillPresent",
            "method": "lifecycle"
        }, {
            "name": "ionModalWillDismiss",
            "method": "lifecycle"
        }, {
            "name": "ionModalDidDismiss",
            "method": "lifecycle"
        }]; }
    static get style() { return "/**style-placeholder:ion-modal:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-modal:**/"; }
}
const LIFECYCLE_MAP = {
    'ionModalDidPresent': 'ionViewDidEnter',
    'ionModalWillPresent': 'ionViewWillEnter',
    'ionModalWillDismiss': 'ionViewWillDismiss',
    'ionModalDidDismiss': 'ionViewDidDismiss',
};
