export class RouteRedirect {
    constructor() {
        /**
         * A redirect route, redirects "from" a URL "to" another URL. This property is that "from" URL.
         * It needs to be an exact match of the navigated URL in order to apply.
         *
         * The path specified in this value is always an absolute path, even if the initial `/` slash
         * is not specified.
         *
         */
        this.from = '';
    }
    componentDidLoad() {
        this.ionRouteRedirectChanged.emit();
    }
    componentDidUnload() {
        this.ionRouteRedirectChanged.emit();
    }
    componentDidUpdate() {
        this.ionRouteRedirectChanged.emit();
    }
    static get is() { return "ion-route-redirect"; }
    static get properties() { return {
        "from": {
            "type": String,
            "attr": "from"
        },
        "to": {
            "type": String,
            "attr": "to"
        }
    }; }
    static get events() { return [{
            "name": "ionRouteRedirectChanged",
            "method": "ionRouteRedirectChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
}
