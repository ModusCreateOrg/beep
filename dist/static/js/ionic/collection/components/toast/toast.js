import { dismiss, eventMethod, present } from '../../utils/overlays';
import { createThemedClasses, getClassMap } from '../../utils/theme';
import { iosEnterAnimation } from './animations/ios.enter';
import { iosLeaveAnimation } from './animations/ios.leave';
import { mdEnterAnimation } from './animations/md.enter';
import { mdLeaveAnimation } from './animations/md.leave';
export class Toast {
    constructor() {
        this.presented = false;
        this.keyboardClose = false;
        /**
         * If true, the close button will be displayed. Defaults to `false`.
         */
        this.showCloseButton = false;
        /**
         * If true, the toast will be translucent. Defaults to `false`.
         */
        this.translucent = false;
        /**
         * If true, the toast will animate. Defaults to `true`.
         */
        this.willAnimate = true;
    }
    componentDidLoad() {
        this.ionToastDidLoad.emit();
    }
    componentDidUnload() {
        this.ionToastDidUnload.emit();
    }
    onDismiss(ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this.dismiss();
    }
    /**
     * Present the toast overlay after it has been created.
     */
    async present() {
        await present(this, 'toastEnter', iosEnterAnimation, mdEnterAnimation, this.position);
        if (this.duration) {
            this.durationTimeout = setTimeout(() => this.dismiss(), this.duration);
        }
    }
    /**
     * Dismiss the toast overlay after it has been presented.
     */
    dismiss(data, role) {
        if (this.durationTimeout) {
            clearTimeout(this.durationTimeout);
        }
        return dismiss(this, data, role, 'toastLeave', iosLeaveAnimation, mdLeaveAnimation, this.position);
    }
    /**
     * Returns a promise that resolves when the toast did dismiss. It also accepts a callback
     * that is called in the same circustances.
     *
     * ```
     * const {data, role} = await toast.onDidDismiss();
     * ```
     */
    onDidDismiss(callback) {
        return eventMethod(this.el, 'ionToastDidDismiss', callback);
    }
    /**
     * Returns a promise that resolves when the toast will dismiss. It also accepts a callback
     * that is called in the same circustances.
     *
     * ```
     * const {data, role} = await toast.onWillDismiss();
     * ```
     */
    onWillDismiss(callback) {
        return eventMethod(this.el, 'ionToastWillDismiss', callback);
    }
    hostData() {
        const themedClasses = this.translucent ? createThemedClasses(this.mode, this.color, 'toast-translucent') : {};
        return {
            class: Object.assign({}, themedClasses, getClassMap(this.cssClass))
        };
    }
    render() {
        const position = this.position ? this.position : 'bottom';
        const wrapperClass = {
            'toast-wrapper': true,
            [`toast-${position}`]: true
        };
        return (h("div", { class: wrapperClass },
            h("div", { class: "toast-container" },
                this.message
                    ? h("div", { class: "toast-message" }, this.message)
                    : null,
                this.showCloseButton
                    ? h("ion-button", { fill: "clear", color: "light", class: "toast-button", onClick: () => this.dismiss() }, this.closeButtonText || 'Close')
                    : null)));
    }
    static get is() { return "ion-toast"; }
    static get host() { return {
        "theme": "toast"
    }; }
    static get properties() { return {
        "animationCtrl": {
            "connect": "ion-animation-controller"
        },
        "closeButtonText": {
            "type": String,
            "attr": "close-button-text"
        },
        "config": {
            "context": "config"
        },
        "cssClass": {
            "type": String,
            "attr": "css-class"
        },
        "dismiss": {
            "method": true
        },
        "duration": {
            "type": Number,
            "attr": "duration"
        },
        "el": {
            "elementRef": true
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
        "message": {
            "type": String,
            "attr": "message"
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
        "position": {
            "type": String,
            "attr": "position"
        },
        "present": {
            "method": true
        },
        "showCloseButton": {
            "type": Boolean,
            "attr": "show-close-button"
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
            "name": "ionToastDidLoad",
            "method": "ionToastDidLoad",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionToastDidPresent",
            "method": "didPresent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionToastWillPresent",
            "method": "willPresent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionToastWillDismiss",
            "method": "willDismiss",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionToastDidDismiss",
            "method": "didDismiss",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionToastDidUnload",
            "method": "ionToastDidUnload",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "ionDismiss",
            "method": "onDismiss"
        }]; }
    static get style() { return "/**style-placeholder:ion-toast:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-toast:**/"; }
}
