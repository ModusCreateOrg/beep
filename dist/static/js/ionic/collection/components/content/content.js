export class Content {
    constructor() {
        this.cTop = -1;
        this.cBottom = -1;
        this.dirty = false;
        /**
         * If true, the content will scroll behind the headers
         * and footers. This effect can easily be seen by setting the toolbar
         * to transparent.
         */
        this.fullscreen = false;
        this.scrollEnabled = true;
        this.scrollEvents = false;
    }
    onNavChanged() {
        this.resize();
    }
    componentDidLoad() {
        this.resize();
    }
    componentDidUnload() {
        this.scrollEl = undefined;
    }
    /**
     * Scroll to the top of the content component.
     *
     * Duration of the scroll animation in milliseconds. Defaults to `300`.
     * Returns a promise which is resolved when the scroll has completed.
     */
    scrollToTop(duration = 300) {
        if (!this.scrollEl) {
            throw new Error('content is not scrollable');
        }
        return this.scrollEl.scrollToTop(duration);
    }
    /**
     * Scroll to the bottom of the content component.
     *
     * Duration of the scroll animation in milliseconds. Defaults to `300`.
     * Returns a promise which is resolved when the scroll has completed.
     */
    scrollToBottom(duration = 300) {
        if (!this.scrollEl) {
            throw new Error('content is not scrollable');
        }
        return this.scrollEl.scrollToBottom(duration);
    }
    scrollByPoint(x, y, duration, done) {
        if (!this.scrollEl) {
            throw new Error('content is not scrollable');
        }
        return this.scrollEl.scrollByPoint(x, y, duration, done);
    }
    scrollToPoint(x, y, duration, done) {
        if (!this.scrollEl) {
            throw new Error('content is not scrollable');
        }
        return this.scrollEl.scrollToPoint(x, y, duration, done);
    }
    resize() {
        if (!this.scrollEl) {
            return;
        }
        if (this.fullscreen) {
            this.queue.read(() => {
                this.queue.read(this.readDimensions.bind(this));
                this.queue.write(this.writeDimensions.bind(this));
            });
        }
        else {
            this.cTop = this.cBottom = -1;
            this.queue.write(() => this.scrollEl && this.scrollEl.removeAttribute('style'));
        }
    }
    readDimensions() {
        const page = getPageElement(this.el);
        const top = Math.max(this.el.offsetTop, 0);
        const bottom = Math.max(page.offsetHeight - top - this.el.offsetHeight, 0);
        this.dirty = top !== this.cTop || bottom !== this.cBottom;
        this.cTop = top;
        this.cBottom = bottom;
    }
    writeDimensions() {
        if (this.dirty && this.scrollEl) {
            const style = this.scrollEl.style;
            style.paddingTop = this.cTop + 'px';
            style.paddingBottom = this.cBottom + 'px';
            style.top = -this.cTop + 'px';
            style.bottom = -this.cBottom + 'px';
            this.dirty = false;
        }
    }
    render() {
        this.resize();
        return [
            (this.scrollEnabled)
                ? h("ion-scroll", { ref: el => this.scrollEl = el, mode: this.mode, scrollEvents: this.scrollEvents, forceOverscroll: this.forceOverscroll },
                    h("slot", null))
                : h("div", { class: "scroll-inner" },
                    h("slot", null)),
            h("slot", { name: "fixed" })
        ];
    }
    static get is() { return "ion-content"; }
    static get properties() { return {
        "config": {
            "context": "config"
        },
        "el": {
            "elementRef": true
        },
        "forceOverscroll": {
            "type": Boolean,
            "attr": "force-overscroll"
        },
        "fullscreen": {
            "type": Boolean,
            "attr": "fullscreen"
        },
        "queue": {
            "context": "queue"
        },
        "scrollByPoint": {
            "method": true
        },
        "scrollEnabled": {
            "type": Boolean,
            "attr": "scroll-enabled"
        },
        "scrollEvents": {
            "type": Boolean,
            "attr": "scroll-events"
        },
        "scrollToBottom": {
            "method": true
        },
        "scrollToPoint": {
            "method": true
        },
        "scrollToTop": {
            "method": true
        }
    }; }
    static get listeners() { return [{
            "name": "body:ionNavDidChange",
            "method": "onNavChanged"
        }]; }
    static get style() { return "/**style-placeholder:ion-content:**/"; }
}
function getParentElement(el) {
    if (el.parentElement) {
        // normal element with a parent element
        return el.parentElement;
    }
    if (el.parentNode && el.parentNode.host) {
        // shadow dom's document fragment
        return el.parentNode.host;
    }
    return null;
}
function getPageElement(el) {
    const tabs = el.closest('ion-tabs');
    if (tabs) {
        return tabs;
    }
    const page = el.closest('ion-app,ion-page,.ion-page,page-inner');
    if (page) {
        return page;
    }
    return getParentElement(el);
}
