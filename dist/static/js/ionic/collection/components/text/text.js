export class Text {
    static get is() { return "ion-text"; }
    static get host() { return {
        "theme": "text"
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
    static get style() { return "/**style-placeholder:ion-text:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-text:**/"; }
}
