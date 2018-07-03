export class CardSubtitle {
    hostData() {
        return {
            'role': 'heading',
            'aria-level': '3'
        };
    }
    static get is() { return "ion-card-subtitle"; }
    static get host() { return {
        "theme": "card-subtitle"
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
    static get style() { return "/**style-placeholder:ion-card-subtitle:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-card-subtitle:**/"; }
}
