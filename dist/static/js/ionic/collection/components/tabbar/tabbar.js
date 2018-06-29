import { createThemedClasses } from '../../utils/theme';
export class Tabbar {
    constructor() {
        this.canScrollLeft = false;
        this.canScrollRight = false;
        this.hidden = false;
        this.layout = 'icon-top';
        this.placement = 'bottom';
        this.scrollable = false;
        this.tabs = [];
        this.highlight = false;
        /**
         * If true, the tabbar will be translucent. Defaults to `false`.
         */
        this.translucent = false;
    }
    selectedTabChanged() {
        this.scrollable && this.scrollToSelectedButton();
        this.highlight && this.updateHighlight();
    }
    onKeyboardWillHide() {
        setTimeout(() => this.hidden = false, 50);
    }
    onKeyboardWillShow() {
        if (this.placement === 'bottom') {
            this.hidden = true;
        }
    }
    onResize() {
        this.highlight && this.updateHighlight();
    }
    onTabButtonLoad() {
        this.scrollable && this.updateBoundaries();
        this.highlight && this.updateHighlight();
    }
    analyzeTabs() {
        const tabs = Array.from(this.doc.querySelectorAll('ion-tab-button'));
        const scrollLeft = this.scrollEl.scrollLeft;
        const tabsWidth = this.scrollEl.clientWidth;
        let previous = undefined;
        let next = undefined;
        for (const tab of tabs) {
            const left = tab.offsetLeft;
            const right = left + tab.offsetWidth;
            if (left < scrollLeft) {
                previous = { tab, amount: left };
            }
            if (!next && right > (tabsWidth + scrollLeft)) {
                const amount = right - tabsWidth;
                next = { tab, amount };
            }
        }
        return { previous, next };
    }
    getSelectedButton() {
        return Array.from(this.el.querySelectorAll('ion-tab-button'))
            .find(btn => btn.selected);
    }
    scrollToSelectedButton() {
        if (!this.scrollEl) {
            return;
        }
        this.queue.read(() => {
            const activeTabButton = this.getSelectedButton();
            if (activeTabButton) {
                const scrollLeft = this.scrollEl.scrollLeft, tabsWidth = this.scrollEl.clientWidth, left = activeTabButton.offsetLeft, right = left + activeTabButton.offsetWidth;
                let amount = 0;
                if (right > (tabsWidth + scrollLeft)) {
                    amount = right - tabsWidth;
                }
                else if (left < scrollLeft) {
                    amount = left;
                }
                if (amount !== 0) {
                    this.queue.write(() => {
                        this.scrollEl.scrollToPoint(amount, 0, 250).then(() => {
                            this.updateBoundaries();
                        });
                    });
                }
            }
        });
    }
    scrollByTab(direction) {
        this.queue.read(() => {
            const { previous, next } = this.analyzeTabs();
            const info = direction === 'right' ? next : previous;
            const amount = info && info.amount;
            if (info && amount) {
                this.scrollEl.scrollToPoint(amount, 0, 250).then(() => {
                    this.updateBoundaries();
                });
            }
        });
    }
    updateBoundaries() {
        this.canScrollLeft = this.scrollEl.scrollLeft !== 0;
        this.canScrollRight = this.scrollEl.scrollLeft < (this.scrollEl.scrollWidth - this.scrollEl.offsetWidth);
    }
    updateHighlight() {
        if (!this.highlight) {
            return;
        }
        this.queue.read(() => {
            const btn = this.getSelectedButton();
            const highlight = this.el.querySelector('div.tabbar-highlight');
            if (btn && highlight) {
                highlight.style.transform = `translate3d(${btn.offsetLeft}px,0,0) scaleX(${btn.offsetWidth})`;
            }
        });
    }
    hostData() {
        const themedClasses = this.translucent ? createThemedClasses(this.mode, this.color, 'tabbar-translucent') : {};
        return {
            role: 'tablist',
            class: Object.assign({}, themedClasses, { [`layout-${this.layout}`]: true, [`placement-${this.placement}`]: true, 'tabbar-hidden': this.hidden, 'scrollable': this.scrollable })
        };
    }
    render() {
        const selectedTab = this.selectedTab;
        const ionTabbarHighlight = this.highlight ? h("div", { class: "animated tabbar-highlight" }) : null;
        const buttonClasses = createThemedClasses(this.mode, this.color, 'tab-button');
        const tabButtons = this.tabs.map(tab => h("ion-tab-button", { class: buttonClasses, tab: tab, selected: selectedTab === tab }));
        if (this.scrollable) {
            return [
                h("ion-button", { onClick: () => this.scrollByTab('left'), fill: "clear", class: { inactive: !this.canScrollLeft } },
                    h("ion-icon", { name: "arrow-dropleft" })),
                h("ion-scroll", { forceOverscroll: false, ref: (scrollEl) => this.scrollEl = scrollEl },
                    tabButtons,
                    ionTabbarHighlight),
                h("ion-button", { onClick: () => this.scrollByTab('right'), fill: "clear", class: { inactive: !this.canScrollRight } },
                    h("ion-icon", { name: "arrow-dropright" }))
            ];
        }
        else {
            return [
                ...tabButtons,
                ionTabbarHighlight
            ];
        }
    }
    static get is() { return "ion-tabbar"; }
    static get host() { return {
        "theme": "tabbar"
    }; }
    static get properties() { return {
        "canScrollLeft": {
            "state": true
        },
        "canScrollRight": {
            "state": true
        },
        "doc": {
            "context": "document"
        },
        "el": {
            "elementRef": true
        },
        "hidden": {
            "state": true
        },
        "highlight": {
            "type": Boolean,
            "attr": "highlight"
        },
        "layout": {
            "type": String,
            "attr": "layout"
        },
        "placement": {
            "type": String,
            "attr": "placement"
        },
        "queue": {
            "context": "queue"
        },
        "scrollable": {
            "type": Boolean,
            "attr": "scrollable"
        },
        "selectedTab": {
            "type": "Any",
            "attr": "selected-tab",
            "watchCallbacks": ["selectedTabChanged"]
        },
        "tabs": {
            "type": "Any",
            "attr": "tabs"
        },
        "translucent": {
            "type": Boolean,
            "attr": "translucent"
        }
    }; }
    static get listeners() { return [{
            "name": "body:keyboardWillHide",
            "method": "onKeyboardWillHide"
        }, {
            "name": "body:keyboardWillShow",
            "method": "onKeyboardWillShow"
        }, {
            "name": "window:resize",
            "method": "onResize",
            "passive": true
        }, {
            "name": "ionTabButtonDidLoad",
            "method": "onTabButtonLoad"
        }, {
            "name": "ionTabButtonDidUnload",
            "method": "onTabButtonLoad"
        }]; }
    static get style() { return "/**style-placeholder:ion-tabbar:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-tabbar:**/"; }
}
