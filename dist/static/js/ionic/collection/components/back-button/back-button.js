import { createThemedClasses, getElementClassMap, openURL } from '../../utils/theme';
export class BackButton {
    onClick(ev) {
        const nav = this.el.closest('ion-nav');
        if (nav && nav.canGoBack()) {
            ev.preventDefault();
            nav.pop();
        }
        else if (this.defaultHref) {
            openURL(this.win, this.defaultHref, ev, 'back');
        }
    }
    hostData() {
        return {
            class: {
                'show-back-button': !!this.defaultHref
            }
        };
    }
    render() {
        const backButtonIcon = this.icon || this.config.get('backButtonIcon', 'arrow-back');
        const backButtonText = this.text != null ? this.text : this.config.get('backButtonText', 'Back');
        const themedClasses = createThemedClasses(this.mode, this.color, 'back-button');
        const backButtonClasses = Object.assign({}, themedClasses, getElementClassMap(this.el.classList));
        return (h("button", { class: backButtonClasses, onClick: (ev) => this.onClick(ev) },
            h("span", { class: "back-button-inner" },
                backButtonIcon && h("ion-icon", { name: backButtonIcon }),
                this.mode === 'ios' && backButtonText && h("span", { class: "button-text" }, backButtonText),
                this.mode === 'md' && h("ion-ripple-effect", { tapClick: true }))));
    }
    static get is() { return "ion-back-button"; }
    static get host() { return {
        "theme": "back-button"
    }; }
    static get properties() { return {
        "color": {
            "type": String,
            "attr": "color"
        },
        "config": {
            "context": "config"
        },
        "defaultHref": {
            "type": String,
            "attr": "default-href"
        },
        "el": {
            "elementRef": true
        },
        "icon": {
            "type": String,
            "attr": "icon"
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "text": {
            "type": String,
            "attr": "text"
        },
        "win": {
            "context": "window"
        }
    }; }
    static get style() { return "/**style-placeholder:ion-back-button:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-back-button:**/"; }
}
