export class Route {
    constructor() {
        /**
         * Relative path that needs to match in order for this route to apply.
         *
         * Accepts paths similar to expressjs so that you can define parameters
         * in the url /foo/:bar where bar would be available in incoming props.
         */
        this.url = '';
    }
    onUpdate(newValue) {
        this.ionRouteDataChanged.emit(newValue);
    }
    onComponentProps(newValue, oldValue) {
        if (newValue === oldValue) {
            return;
        }
        const keys1 = newValue ? Object.keys(newValue) : [];
        const keys2 = oldValue ? Object.keys(oldValue) : [];
        if (keys1.length !== keys2.length) {
            this.onUpdate(newValue);
            return;
        }
        for (let i = 0; i < keys1.length; i++) {
            const key = keys1[i];
            if (newValue[key] !== oldValue[key]) {
                this.onUpdate(newValue);
                return;
            }
        }
    }
    componentDidLoad() {
        this.ionRouteDataChanged.emit();
    }
    componentDidUnload() {
        this.ionRouteDataChanged.emit();
    }
    static get is() { return "ion-route"; }
    static get properties() { return {
        "component": {
            "type": String,
            "attr": "component",
            "watchCallbacks": ["onUpdate"]
        },
        "componentProps": {
            "type": "Any",
            "attr": "component-props",
            "watchCallbacks": ["onComponentProps"]
        },
        "url": {
            "type": String,
            "attr": "url",
            "watchCallbacks": ["onUpdate"]
        }
    }; }
    static get events() { return [{
            "name": "ionRouteDataChanged",
            "method": "ionRouteDataChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
}
