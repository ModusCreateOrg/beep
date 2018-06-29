export class CardContent {
    static get is() { return "ion-card-content"; }
    static get host() { return {
        "theme": "card-content"
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
    static get style() { return "/**style-placeholder:ion-card-content:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-card-content:**/"; }
}
