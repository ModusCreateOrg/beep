export class SkeletonText {
    constructor() {
        this.width = '100%';
    }
    render() {
        return h("span", { style: { width: this.width } }, "\u00A0");
    }
    static get is() { return "ion-skeleton-text"; }
    static get host() { return {
        "theme": "skeleton-text"
    }; }
    static get properties() { return {
        "width": {
            "type": String,
            "attr": "width"
        }
    }; }
    static get style() { return "/**style-placeholder:ion-skeleton-text:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-skeleton-text:**/"; }
}
