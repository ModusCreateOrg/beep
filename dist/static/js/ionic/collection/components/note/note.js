export class Note {
    static get is() { return "ion-note"; }
    static get host() { return {
        "theme": "note"
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
    static get style() { return "/**style-placeholder:ion-note:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-note:**/"; }
}
