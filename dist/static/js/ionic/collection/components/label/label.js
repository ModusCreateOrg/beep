export class Label {
    getText() {
        return this.el.textContent || '';
    }
    componentDidLoad() {
        this.positionChanged();
    }
    positionChanged() {
        const position = this.position;
        return this.ionStyle.emit({
            [`label-${position}`]: !!position,
        });
    }
    hostData() {
        const position = this.position;
        return {
            class: {
                [`label-${position}`]: !!position,
                [`label-${this.mode}-${position}`]: !!position
            }
        };
    }
    static get is() { return "ion-label"; }
    static get host() { return {
        "theme": "label"
    }; }
    static get properties() { return {
        "color": {
            "type": String,
            "attr": "color"
        },
        "el": {
            "elementRef": true
        },
        "getText": {
            "method": true
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "position": {
            "type": String,
            "attr": "position",
            "watchCallbacks": ["positionChanged"]
        }
    }; }
    static get events() { return [{
            "name": "ionStyle",
            "method": "ionStyle",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:ion-label:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-label:**/"; }
}
