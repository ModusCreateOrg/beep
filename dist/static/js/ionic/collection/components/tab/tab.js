import { attachComponent } from '../../utils/framework-delegate';
export class Tab {
    constructor() {
        this.loaded = false;
        this.active = false;
        /**
         * The badge color for the tab button.
         */
        this.badgeColor = 'default';
        /**
         * If true, the user cannot interact with the tab. Defaults to `false`.
         */
        this.disabled = false;
        /**
         * If true, the tab will be selected. Defaults to `false`.
         */
        this.selected = false;
        /**
         * If true, the tab button is visible within the tabbar. Defaults to `true`.
         */
        this.show = true;
        /**
         * If true, hide the tabs on child pages.
         */
        this.tabsHideOnSubPages = false;
    }
    selectedChanged(selected) {
        if (selected) {
            this.ionSelect.emit();
        }
    }
    componentWillLoad() {
        if (false) {
            if (this.component && this.el.childElementCount > 0) {
                console.error('You can not use a lazy-loaded component in a tab and inlined content at the same time.' +
                    `- Remove the component attribute in: <ion-tab component="${this.component}">` +
                    ` or` +
                    `- Remove the embeded content inside the ion-tab: <ion-tab></ion-tab>`);
            }
        }
    }
    getTabId() {
        if (this.name) {
            return this.name;
        }
        if (typeof this.component === 'string') {
            return this.component;
        }
        return null;
    }
    async setActive() {
        await this.prepareLazyLoaded();
        this.active = true;
    }
    prepareLazyLoaded() {
        if (!this.loaded && this.component) {
            this.loaded = true;
            return attachComponent(this.delegate, this.el, this.component, ['ion-page']);
        }
        return Promise.resolve();
    }
    hostData() {
        return {
            'aria-labelledby': this.btnId,
            'role': 'tabpanel',
            'hidden': !this.active,
            'class': {
                'ion-page': !this.component
            }
        };
    }
    static get is() { return "ion-tab"; }
    static get properties() { return {
        "active": {
            "type": Boolean,
            "attr": "active",
            "mutable": true
        },
        "badge": {
            "type": String,
            "attr": "badge"
        },
        "badgeColor": {
            "type": String,
            "attr": "badge-color"
        },
        "btnId": {
            "type": String,
            "attr": "btn-id"
        },
        "component": {
            "type": String,
            "attr": "component"
        },
        "delegate": {
            "type": "Any",
            "attr": "delegate"
        },
        "disabled": {
            "type": Boolean,
            "attr": "disabled"
        },
        "el": {
            "elementRef": true
        },
        "getTabId": {
            "method": true
        },
        "href": {
            "type": String,
            "attr": "href"
        },
        "icon": {
            "type": String,
            "attr": "icon"
        },
        "label": {
            "type": String,
            "attr": "label"
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "selected": {
            "type": Boolean,
            "attr": "selected",
            "mutable": true,
            "watchCallbacks": ["selectedChanged"]
        },
        "setActive": {
            "method": true
        },
        "show": {
            "type": Boolean,
            "attr": "show"
        },
        "tabsHideOnSubPages": {
            "type": Boolean,
            "attr": "tabs-hide-on-sub-pages"
        }
    }; }
    static get events() { return [{
            "name": "ionSelect",
            "method": "ionSelect",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
}
