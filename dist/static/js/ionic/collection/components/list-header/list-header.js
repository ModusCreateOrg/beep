export class ListHeader {
    static get is() { return "ion-list-header"; }
    static get host() { return {
        "theme": "list-header"
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
    static get style() { return "/**style-placeholder:ion-list-header:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-list-header:**/"; }
}
