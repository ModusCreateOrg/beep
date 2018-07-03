import { PLATFORM_CONFIGS, detectPlatforms, updateTestResults, } from '../../utils/show-hide-when-utils';
export class HideWhen {
    constructor() {
        this.or = false;
        this.passesTest = false;
    }
    componentWillLoad() {
        this.calculatedPlatforms = detectPlatforms(this.win, PLATFORM_CONFIGS);
        this.onResize();
    }
    onResize() {
        updateTestResults(this);
    }
    hostData() {
        return {
            class: {
                'show-content': !this.passesTest,
                'hide-content': this.passesTest
            }
        };
    }
    static get is() { return "ion-hide-when"; }
    static get properties() { return {
        "config": {
            "context": "config"
        },
        "element": {
            "elementRef": true
        },
        "mediaQuery": {
            "type": String,
            "attr": "media-query"
        },
        "or": {
            "type": Boolean,
            "attr": "or"
        },
        "orientation": {
            "type": String,
            "attr": "orientation"
        },
        "passesTest": {
            "state": true
        },
        "platform": {
            "type": String,
            "attr": "platform"
        },
        "size": {
            "type": String,
            "attr": "size"
        },
        "win": {
            "context": "window"
        }
    }; }
    static get listeners() { return [{
            "name": "window:resize",
            "method": "onResize",
            "passive": true
        }]; }
    static get style() { return "/**style-placeholder:ion-hide-when:**/"; }
}
