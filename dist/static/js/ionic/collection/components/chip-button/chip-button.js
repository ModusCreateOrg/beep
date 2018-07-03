import { getButtonClassMap, getElementClassMap } from '../../utils/theme';
export class ChipButton {
    constructor() {
        /**
         * If true, the user cannot interact with the chip button. Defaults to `false`.
         */
        this.disabled = false;
    }
    /**
     * Get the classes for the style
     * Chip buttons can only be clear or default (solid)
     */
    getStyleClassMap(buttonType) {
        return getColorClassMap(this.color, buttonType, this.fill || 'default', this.mode);
    }
    render() {
        const buttonType = 'chip-button';
        const hostClasses = getElementClassMap(this.el.classList);
        const TagType = this.href ? 'a' : 'button';
        const buttonClasses = Object.assign({}, hostClasses, getButtonClassMap(buttonType, this.mode), this.getStyleClassMap(buttonType));
        return (h(TagType, { class: buttonClasses, disabled: this.disabled, href: this.href },
            h("span", { class: "chip-button-inner" },
                h("slot", null)),
            this.mode === 'md' && h("ion-ripple-effect", { tapClick: true })));
    }
    static get is() { return "ion-chip-button"; }
    static get properties() { return {
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
        "fill": {
            "type": String,
            "attr": "fill"
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
    static get style() { return "/**style-placeholder:ion-chip-button:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-chip-button:**/"; }
}
/**
 * Get the classes for the color
 */
function getColorClassMap(color, buttonType, style, mode) {
    const className = (style === 'default') ? `${buttonType}` : `${buttonType}-${style}`;
    const map = {
        [className]: true,
        [`${className}-${mode}`]: true
    };
    if (color) {
        map[`${className}-${mode}-${color}`] = true;
    }
    return map;
}
