export class CardTitle {
    hostData() {
        return {
            'role': 'heading',
            'aria-level': '2'
        };
    }
    static get is() { return "ion-card-title"; }
    static get host() { return {
        "theme": "card-title"
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
    static get style() { return "/**style-placeholder:ion-card-title:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-card-title:**/"; }
}
