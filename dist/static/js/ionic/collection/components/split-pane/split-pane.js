const SPLIT_PANE_MAIN = 'split-pane-main';
const SPLIT_PANE_SIDE = 'split-pane-side';
const QUERY = {
    'xs': '(min-width: 0px)',
    'sm': '(min-width: 576px)',
    'md': '(min-width: 768px)',
    'lg': '(min-width: 992px)',
    'xl': '(min-width: 1200px)',
    'never': ''
};
export class SplitPane {
    constructor() {
        this.visible = false;
        /**
         * If true, the split pane will be hidden. Defaults to `false`.
         */
        this.disabled = false;
        /**
         * When the split-pane should be shown.
         * Can be a CSS media query expression, or a shortcut expression.
         * Can also be a boolean expression.
         */
        this.when = QUERY['md'];
    }
    visibleChanged(visible) {
        const detail = { visible };
        this.ionChange.emit(detail);
        this.ionSplitPaneVisible.emit(detail);
    }
    componentDidLoad() {
        this._styleChildren();
        this.whenChanged();
    }
    componentDidUnload() {
        this.rmL && this.rmL();
        this.rmL = null;
    }
    whenChanged() {
        if (this.isServer) {
            return;
        }
        this.rmL && this.rmL();
        this.rmL = null;
        // Check if the split-pane is disabled
        if (this.disabled) {
            this.visible = false;
            return;
        }
        // When query is a boolean
        const query = this.when;
        if (typeof query === 'boolean') {
            this.visible = query;
            return;
        }
        // When query is a string, let's find first if it is a shortcut
        const defaultQuery = QUERY[query];
        const mediaQuery = (defaultQuery)
            ? defaultQuery
            : query;
        // Media query is empty or null, we hide it
        if (!mediaQuery || mediaQuery.length === 0) {
            this.visible = false;
            return;
        }
        // Listen on media query
        const callback = (q) => this.visible = q.matches;
        const mediaList = this.win.matchMedia(mediaQuery);
        mediaList.addListener(callback);
        this.rmL = () => mediaList.removeListener(callback);
        this.visible = mediaList.matches;
    }
    isVisible() {
        return this.visible;
    }
    isPane(element) {
        if (!this.visible) {
            return false;
        }
        return element.parentElement === this.el
            && element.classList.contains(SPLIT_PANE_SIDE);
    }
    _styleChildren() {
        if (this.isServer) {
            return;
        }
        const children = this.el.children;
        const nu = this.el.childElementCount;
        let foundMain = false;
        for (let i = 0; i < nu; i++) {
            const child = children[i];
            const isMain = child.hasAttribute('main');
            if (isMain) {
                if (foundMain) {
                    console.warn('split pane can not have more than one main node');
                    return;
                }
                foundMain = true;
            }
            setPaneClass(child, isMain);
        }
        if (!foundMain) {
            console.warn('split pane could not found any main node');
        }
    }
    hostData() {
        return {
            class: {
                'split-pane-visible': this.visible
            }
        };
    }
    static get is() { return "ion-split-pane"; }
    static get host() { return {
        "theme": "split-pane"
    }; }
    static get properties() { return {
        "disabled": {
            "type": Boolean,
            "attr": "disabled"
        },
        "el": {
            "elementRef": true
        },
        "isPane": {
            "method": true
        },
        "isServer": {
            "context": "isServer"
        },
        "isVisible": {
            "method": true
        },
        "visible": {
            "state": true,
            "watchCallbacks": ["visibleChanged"]
        },
        "when": {
            "type": "Any",
            "attr": "when",
            "watchCallbacks": ["whenChanged"]
        },
        "win": {
            "context": "window"
        }
    }; }
    static get events() { return [{
            "name": "ionChange",
            "method": "ionChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionSplitPaneVisible",
            "method": "ionSplitPaneVisible",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:ion-split-pane:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-split-pane:**/"; }
}
function setPaneClass(el, isMain) {
    let toAdd;
    let toRemove;
    if (isMain) {
        toAdd = SPLIT_PANE_MAIN;
        toRemove = SPLIT_PANE_SIDE;
    }
    else {
        toAdd = SPLIT_PANE_SIDE;
        toRemove = SPLIT_PANE_MAIN;
    }
    const classList = el.classList;
    classList.add(toAdd);
    classList.remove(toRemove);
}
