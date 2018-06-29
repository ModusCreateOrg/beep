export class ItemOption {
    constructor() {
        /**
         * If true, the user cannot interact with the item option. Defaults to `false`.
         */
        this.disabled = false;
        /**
         * If true, the option will expand to take up the available width and cover any other options. Defaults to `false`.
         */
        this.expandable = false;
    }
    clickedOptionButton(ev) {
        const el = ev.target.closest('ion-item-option');
        return !!el;
    }
    hostData() {
        return {
            class: {
                'item-option-expandable': this.expandable
            }
        };
    }
    render() {
        const TagType = this.href ? 'a' : 'button';
        return (h(TagType, { class: "item-option-button", disabled: this.disabled, href: this.href, onClick: this.clickedOptionButton.bind(this) },
            h("span", { class: "item-option-button-inner" },
                h("slot", { name: "start" }),
                h("slot", { name: "top" }),
                h("slot", { name: "icon-only" }),
                h("slot", null),
                h("slot", { name: "bottom" }),
                h("slot", { name: "end" }))));
    }
    static get is() { return "ion-item-option"; }
    static get host() { return {
        "theme": "item-option"
    }; }
    static get properties() { return {
        "color": {
            "type": String,
            "attr": "color"
        },
        "disabled": {
            "type": Boolean,
            "attr": "disabled"
        },
        "expandable": {
            "type": Boolean,
            "attr": "expandable"
        },
        "href": {
            "type": String,
            "attr": "href"
        },
        "mode": {
            "type": String,
            "attr": "mode"
        }
    }; }
    static get style() { return "/**style-placeholder:ion-item-option:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-item-option:**/"; }
}
