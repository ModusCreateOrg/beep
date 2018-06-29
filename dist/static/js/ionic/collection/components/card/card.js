export class Card {
    static get is() { return "ion-card"; }
    static get host() { return {
        "theme": "card"
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
    static get style() { return "/**style-placeholder:ion-card:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-card:**/"; }
}
