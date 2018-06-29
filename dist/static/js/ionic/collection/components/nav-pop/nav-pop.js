export class NavPop {
    pop() {
        const nav = this.el.closest('ion-nav');
        if (nav) {
            return nav.pop();
        }
        return Promise.resolve(null);
    }
    static get is() { return "ion-nav-pop"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        }
    }; }
    static get listeners() { return [{
            "name": "child:click",
            "method": "pop"
        }]; }
}
