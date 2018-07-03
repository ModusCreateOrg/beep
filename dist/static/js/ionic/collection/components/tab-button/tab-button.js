export class TabButton {
    constructor() {
        this.keyFocus = false;
        this.selected = false;
    }
    componentDidLoad() {
        this.ionTabButtonDidLoad.emit();
    }
    componentDidUnload() {
        this.ionTabButtonDidUnload.emit();
    }
    onClick(ev) {
        if (!this.tab.disabled) {
            this.ionTabbarClick.emit(this.tab);
        }
        ev.stopPropagation();
        ev.preventDefault();
    }
    onKeyUp() {
        this.keyFocus = true;
    }
    onBlur() {
        this.keyFocus = false;
    }
    hostData() {
        const selected = this.selected;
        const tab = this.tab;
        const hasTitle = !!tab.label;
        const hasIcon = !!tab.icon;
        const hasTitleOnly = (hasTitle && !hasIcon);
        const hasIconOnly = (hasIcon && !hasTitle);
        const hasBadge = !!tab.badge;
        return {
            'role': 'tab',
            'id': tab.btnId,
            'aria-selected': selected,
            'hidden': !tab.show,
            class: {
                'tab-selected': selected,
                'has-title': hasTitle,
                'has-icon': hasIcon,
                'has-title-only': hasTitleOnly,
                'has-icon-only': hasIconOnly,
                'has-badge': hasBadge,
                'tab-btn-disabled': tab.disabled,
                'focused': this.keyFocus
            }
        };
    }
    render() {
        const tab = this.tab;
        const href = tab.href || '#';
        return [
            h("a", { href: href, class: "tab-cover", onKeyUp: this.onKeyUp.bind(this), onBlur: this.onBlur.bind(this) },
                tab.icon && h("ion-icon", { class: "tab-button-icon", name: tab.icon }),
                tab.label && h("span", { class: "tab-button-text" }, tab.label),
                tab.badge && h("ion-badge", { class: "tab-badge", color: tab.badgeColor }, tab.badge),
                this.mode === 'md' && h("ion-ripple-effect", { tapClick: true }))
        ];
    }
    static get is() { return "ion-tab-button"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "keyFocus": {
            "state": true
        },
        "selected": {
            "type": Boolean,
            "attr": "selected"
        },
        "tab": {
            "type": "Any",
            "attr": "tab"
        }
    }; }
    static get events() { return [{
            "name": "ionTabbarClick",
            "method": "ionTabbarClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionTabButtonDidLoad",
            "method": "ionTabButtonDidLoad",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionTabButtonDidUnload",
            "method": "ionTabButtonDidUnload",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "click",
            "method": "onClick"
        }]; }
    static get style() { return "/**style-placeholder:ion-tab-button:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-tab-button:**/"; }
}
