import { createThemedClasses, getElementClassMap, openURL } from '../../utils/theme';
export class Item {
    constructor() {
        this.itemStyles = {};
        /**
         * If true, a button tag will be rendered and the item will be tappable. Defaults to `false`.
         */
        this.button = false;
        /**
         * If true, the user cannot interact with the item. Defaults to `false`.
         */
        this.disabled = false;
    }
    itemStyle(ev) {
        ev.stopPropagation();
        const tagName = ev.target.tagName;
        const updatedStyles = ev.detail;
        const updatedKeys = Object.keys(ev.detail);
        const newStyles = {};
        const childStyles = this.itemStyles[tagName] || {};
        let hasStyleChange = false;
        for (const key of updatedKeys) {
            const itemKey = `item-${key}`;
            const newValue = updatedStyles[key];
            if (newValue !== childStyles[itemKey]) {
                hasStyleChange = true;
            }
            newStyles[itemKey] = newValue;
        }
        if (hasStyleChange) {
            this.itemStyles[tagName] = newStyles;
            this.el.forceUpdate();
        }
    }
    componentDidLoad() {
        // Change the button size to small for each ion-button in the item
        // unless the size is explicitly set
        const buttons = this.el.querySelectorAll('ion-button');
        for (let i = 0; i < buttons.length; i++) {
            if (!buttons[i].size) {
                buttons[i].size = 'small';
            }
        }
    }
    render() {
        const childStyles = {};
        for (const key in this.itemStyles) {
            Object.assign(childStyles, this.itemStyles[key]);
        }
        const clickable = !!(this.href || this.el.onclick || this.button);
        const TagType = clickable
            ? this.href ? 'a' : 'button'
            : 'div';
        const attrs = (TagType === 'button')
            ? { type: 'button' }
            : { href: this.href };
        const showDetail = this.detail != null ? this.detail : (this.mode === 'ios' && clickable);
        const themedClasses = Object.assign({}, childStyles, createThemedClasses(this.mode, this.color, 'item'), getElementClassMap(this.el.classList), { 'item-disabled': this.disabled, 'item-detail-push': showDetail, [`item-lines-${this.lines}`]: !!this.lines, [`item-${this.mode}-lines-${this.lines}`]: !!this.lines });
        return (h(TagType, Object.assign({}, attrs, { class: themedClasses, onClick: (ev) => openURL(this.win, this.href, ev, this.routerDirection) }),
            h("slot", { name: "start" }),
            h("div", { class: "item-inner" },
                h("div", { class: "input-wrapper" },
                    h("slot", null)),
                h("slot", { name: "end" })),
            clickable && this.mode === 'md' && h("ion-ripple-effect", { tapClick: true })));
    }
    static get is() { return "ion-item"; }
    static get properties() { return {
        "button": {
            "type": Boolean,
            "attr": "button"
        },
        "color": {
            "type": String,
            "attr": "color"
        },
        "detail": {
            "type": Boolean,
            "attr": "detail"
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
        "lines": {
            "type": String,
            "attr": "lines"
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "routerDirection": {
            "type": String,
            "attr": "router-direction"
        },
        "win": {
            "context": "window"
        }
    }; }
    static get listeners() { return [{
            "name": "ionStyle",
            "method": "itemStyle"
        }]; }
    static get style() { return "/**style-placeholder:ion-item:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-item:**/"; }
}
