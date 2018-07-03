import { openURL } from '../../utils/theme';
export class Anchor {
    render() {
        return h("a", { href: this.href, onClick: (ev) => openURL(this.win, this.href, ev, this.routerDirection) },
            h("slot", null));
    }
    static get is() { return "ion-anchor"; }
    static get properties() { return {
        "href": {
            "type": String,
            "attr": "href"
        },
        "routerDirection": {
            "type": String,
            "attr": "router-direction"
        },
        "win": {
            "context": "window"
        }
    }; }
}
