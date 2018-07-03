import { isEndSide } from '../../utils/helpers';
export class ItemOptions {
    constructor() {
        /**
         * The side the option button should be on.
         * Possible values: `"start"` and `"end"`.
         * Defaults to `"end"`.
         * If you have multiple `ion-item-options`, a side must be provided for each.
         */
        this.side = 'end';
    }
    isEndSide() {
        return isEndSide(this.win, this.side);
    }
    width() {
        return this.el.offsetWidth;
    }
    fireSwipeEvent() {
        this.ionSwipe.emit();
    }
    hostData() {
        return {
            class: {
                'item-options-start': !this.isEndSide(),
                'item-options-end': this.isEndSide()
            }
        };
    }
    static get is() { return "ion-item-options"; }
    static get host() { return {
        "theme": "item-options"
    }; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "fireSwipeEvent": {
            "method": true
        },
        "isEndSide": {
            "method": true
        },
        "side": {
            "type": String,
            "attr": "side"
        },
        "width": {
            "method": true
        },
        "win": {
            "context": "window"
        }
    }; }
    static get events() { return [{
            "name": "ionSwipe",
            "method": "ionSwipe",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:ion-item-options:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-item-options:**/"; }
}
