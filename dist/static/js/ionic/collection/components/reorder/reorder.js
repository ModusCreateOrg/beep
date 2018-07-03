export class Reorder {
    render() {
        return (h("slot", null,
            h("ion-icon", { class: "reorder-icon", name: "reorder" })));
    }
    static get is() { return "ion-reorder"; }
    static get host() { return {
        "theme": "reorder"
    }; }
    static get style() { return "/**style-placeholder:ion-reorder:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-reorder:**/"; }
}
