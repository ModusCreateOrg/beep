export class Chip {
    static get is() { return "ion-chip"; }
    static get host() { return {
        "theme": "chip"
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
    static get style() { return "/**style-placeholder:ion-chip:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-chip:**/"; }
}
