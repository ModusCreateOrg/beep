import { createThemedClasses, getElementClassMap } from '../../utils/theme';
export class FabButton {
    constructor() {
        this.inList = false;
        /**
         * If true, the fab button will be show a close icon. Defaults to `false`.
         */
        this.activated = false;
        /**
         * If true, the user cannot interact with the fab button. Defaults to `false`.
         */
        this.disabled = false;
        /**
         * If true, the fab button will be translucent. Defaults to `false`.
         */
        this.translucent = false;
        this.show = false;
    }
    componentWillLoad() {
        const parentNode = this.el.parentNode;
        const parentTag = parentNode ? parentNode.nodeName : null;
        this.inList = (parentTag === 'ION-FAB-LIST');
    }
    /**
     * Get the classes for fab buttons in lists
     */
    getFabClassMap() {
        return {
            'fab-button-in-list': this.inList,
            [`fab-button-${this.mode}-in-list`]: this.inList,
            [`fab-button-translucent-${this.mode}-in-list`]: (this.inList && this.translucent),
            'fab-button-close-active': this.activated,
            'fab-button-show': this.show,
        };
    }
    render() {
        const themedClasses = createThemedClasses(this.mode, this.color, 'fab-button');
        const translucentClasses = this.translucent ? createThemedClasses(this.mode, this.color, 'fab-button-translucent') : {};
        const hostClasses = getElementClassMap(this.el.classList);
        const TagType = this.href ? 'a' : 'button';
        const fabClasses = Object.assign({}, this.getFabClassMap(), themedClasses, translucentClasses, hostClasses);
        return (h(TagType, { class: fabClasses, disabled: this.disabled, href: this.href },
            h("ion-icon", { name: "close", class: "fab-button-close-icon" }),
            h("span", { class: "fab-button-inner" },
                h("slot", null)),
            this.mode === 'md' && h("ion-ripple-effect", { tapClick: true })));
    }
    static get is() { return "ion-fab-button"; }
    static get properties() { return {
        "activated": {
            "type": Boolean,
            "attr": "activated"
        },
        "color": {
            "type": String,
            "attr": "color"
        },
        "disabled": {
            "type": Boolean,
            "attr": "disabled"
        },
        "el": {
            "elementRef": true
        },
        "href": {
            "type": String,
            "attr": "href"
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "show": {
            "type": Boolean,
            "attr": "show"
        },
        "translucent": {
            "type": Boolean,
            "attr": "translucent"
        }
    }; }
    static get style() { return "/**style-placeholder:ion-fab-button:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-fab-button:**/"; }
}
