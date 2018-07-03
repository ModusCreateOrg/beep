export class SelectPopover {
    constructor() {
        this.options = [];
    }
    onSelect(ev) {
        const option = this.options.find(o => o.value === ev.target.value);
        option && option.handler && option.handler();
    }
    render() {
        return (h("ion-list", null,
            this.header ? h("ion-list-header", null, this.header) : null,
            this.subHeader || this.message
                ? h("ion-item", { "text-wrap": true },
                    h("ion-label", null,
                        this.subHeader ? h("h3", null, this.subHeader) : null,
                        this.message ? h("p", null, this.message) : null))
                : null,
            h("ion-radio-group", null, this.options.map(option => h("ion-item", null,
                h("ion-label", null, option.text),
                h("ion-radio", { checked: option.checked, value: option.value, disabled: option.disabled }))))));
    }
    static get is() { return "ion-select-popover"; }
    static get host() { return {
        "theme": "select-popover"
    }; }
    static get properties() { return {
        "header": {
            "type": String,
            "attr": "header"
        },
        "message": {
            "type": String,
            "attr": "message"
        },
        "options": {
            "type": "Any",
            "attr": "options"
        },
        "subHeader": {
            "type": String,
            "attr": "sub-header"
        }
    }; }
    static get listeners() { return [{
            "name": "ionSelect",
            "method": "onSelect"
        }]; }
}
