export class MenuButton {
    constructor() {
        /**
         * Automatically hides the menu button when the corresponding menu is not active
         */
        this.autoHide = true;
    }
    render() {
        const menuIcon = this.config.get('menuIcon', 'menu');
        return (h("ion-menu-toggle", { menu: this.menu, autoHide: this.autoHide },
            h("ion-button", null,
                h("slot", null,
                    h("ion-icon", { slot: "icon-only", name: menuIcon })))));
    }
    static get is() { return "ion-menu-button"; }
    static get host() { return {
        "theme": "menu-button"
    }; }
    static get properties() { return {
        "autoHide": {
            "type": Boolean,
            "attr": "auto-hide"
        },
        "config": {
            "context": "config"
        },
        "menu": {
            "type": String,
            "attr": "menu"
        }
    }; }
    static get style() { return "/**style-placeholder:ion-menu-button:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-menu-button:**/"; }
}
