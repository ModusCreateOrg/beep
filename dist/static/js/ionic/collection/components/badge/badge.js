export class Badge {
    static get is() { return "ion-badge"; }
    static get host() { return {
        "theme": "badge"
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
    static get style() { return "/**style-placeholder:ion-badge:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-badge:**/"; }
}
