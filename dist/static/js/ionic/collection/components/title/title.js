import { createThemedClasses } from '../../utils/theme';
export class ToolbarTitle {
    render() {
        const themedClasses = createThemedClasses(this.mode, this.color, 'toolbar-title');
        return [
            h("div", { class: themedClasses },
                h("slot", null))
        ];
    }
    static get is() { return "ion-title"; }
    static get host() { return {
        "theme": "title"
    }; }
    static get properties() { return {
        "color": {
            "type": String,
            "attr": "color"
        },
        "mode": {
            "type": String,
            "attr": "mode"
        }
    }; }
    static get style() { return "/**style-placeholder:ion-title:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-title:**/"; }
}
