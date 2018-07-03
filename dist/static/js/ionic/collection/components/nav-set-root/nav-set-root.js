export class NavSetRoot {
    push() {
        const nav = this.el.closest('ion-nav');
        const toPush = this.component;
        if (nav && toPush) {
            return nav.setRoot(toPush, this.componentProps);
        }
        return Promise.resolve(null);
    }
    static get is() { return "ion-nav-set-root"; }
    static get properties() { return {
        "component": {
            "type": String,
            "attr": "component"
        },
        "componentProps": {
            "type": "Any",
            "attr": "component-props"
        },
        "el": {
            "elementRef": true
        }
    }; }
    static get listeners() { return [{
            "name": "child:click",
            "method": "push"
        }]; }
}
