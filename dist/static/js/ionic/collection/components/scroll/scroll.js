export class Scroll {
    constructor() {
        this.isScrolling = false;
        this.lastScroll = 0;
        this.queued = false;
        this.scrollEvents = false;
        // Detail is used in a hot loop in the scroll event, by allocating it here
        // V8 will be able to inline any read/write to it since it's a monomorphic class.
        // https://mrale.ph/blog/2015/01/11/whats-up-with-monomorphism.html
        this.detail = {
            positions: [],
            scrollTop: 0,
            scrollLeft: 0,
            type: 'scroll',
            event: undefined,
            startX: 0,
            startY: 0,
            startTimeStamp: 0,
            currentX: 0,
            currentY: 0,
            velocityX: 0,
            velocityY: 0,
            deltaX: 0,
            deltaY: 0,
            timeStamp: 0,
            data: undefined,
            isScrolling: true,
        };
    }
    componentWillLoad() {
        if (this.forceOverscroll === undefined) {
            this.forceOverscroll = this.mode === 'ios' && ('ontouchstart' in this.win);
        }
    }
    componentDidUnload() {
        if (this.watchDog) {
            clearInterval(this.watchDog);
        }
    }
    onScroll(ev) {
        const timeStamp = Date.now();
        const didStart = !this.isScrolling;
        this.lastScroll = timeStamp;
        if (didStart) {
            this.onScrollStart();
        }
        if (!this.queued && this.scrollEvents) {
            this.queued = true;
            this.queue.read(timeStamp => {
                this.queued = false;
                this.detail.event = ev;
                updateScrollDetail(this.detail, this.el, timeStamp, didStart);
                this.ionScroll.emit(this.detail);
            });
        }
    }
    scrollToTop(duration) {
        return this.scrollToPoint(0, 0, duration);
    }
    scrollToBottom(duration) {
        const y = (this.el)
            ? this.el.scrollHeight - this.el.clientHeight
            : 0;
        return this.scrollToPoint(0, y, duration);
    }
    scrollByPoint(x, y, duration, done) {
        return this.scrollToPoint(x + this.el.scrollLeft, y + this.el.scrollTop, duration, done);
    }
    scrollToPoint(x, y, duration, done) {
        // scroll animation loop w/ easing
        // credit https://gist.github.com/dezinezync/5487119
        let resolve;
        const promise = new Promise(r => {
            resolve = r;
        }).then(() => done && done());
        const self = this;
        const el = self.el;
        if (!el) {
            // invalid element
            resolve();
            return promise;
        }
        if (duration < 32) {
            el.scrollTop = y;
            el.scrollLeft = x;
            resolve();
            return promise;
        }
        const fromY = el.scrollTop;
        const fromX = el.scrollLeft;
        const maxAttempts = (duration / 16) + 100;
        let startTime;
        let attempts = 0;
        let stopScroll = false;
        // scroll loop
        function step(timeStamp) {
            attempts++;
            if (!self.el || stopScroll || attempts > maxAttempts) {
                self.isScrolling = false;
                el.style.transform = el.style.webkitTransform = '';
                resolve();
                return;
            }
            let time = Math.min(1, ((timeStamp - startTime) / duration));
            // where .5 would be 50% of time on a linear scale easedT gives a
            // fraction based on the easing method
            const easedT = (--time) * time * time + 1;
            if (fromY !== y) {
                el.scrollTop = (easedT * (y - fromY)) + fromY;
            }
            if (fromX !== x) {
                el.scrollLeft = Math.floor((easedT * (x - fromX)) + fromX);
            }
            if (easedT < 1) {
                // do not use DomController here
                // must use nativeRaf in order to fire in the next frame
                self.queue.read(step);
            }
            else {
                stopScroll = true;
                self.isScrolling = false;
                el.style.transform = el.style.webkitTransform = '';
                resolve();
            }
        }
        // start scroll loop
        self.isScrolling = true;
        // chill out for a frame first
        this.queue.write(() => {
            this.queue.write(timeStamp => {
                startTime = timeStamp;
                step(timeStamp);
            });
        });
        return promise;
    }
    onScrollStart() {
        this.isScrolling = true;
        this.ionScrollStart.emit({
            isScrolling: true
        });
        if (this.watchDog) {
            clearInterval(this.watchDog);
        }
        // watchdog
        this.watchDog = setInterval(() => {
            if (this.lastScroll < Date.now() - 120) {
                this.onScrollEnd();
            }
        }, 100);
    }
    onScrollEnd() {
        clearInterval(this.watchDog);
        this.watchDog = null;
        this.isScrolling = false;
        this.ionScrollEnd.emit({
            isScrolling: false
        });
    }
    hostData() {
        return {
            class: {
                overscroll: this.forceOverscroll
            }
        };
    }
    render() {
        return [
            // scroll-inner is used to keep custom user padding
            h("div", { class: "scroll-inner" },
                h("slot", null))
        ];
    }
    static get is() { return "ion-scroll"; }
    static get host() { return {
        "theme": "scroll"
    }; }
    static get properties() { return {
        "config": {
            "context": "config"
        },
        "el": {
            "elementRef": true
        },
        "forceOverscroll": {
            "type": Boolean,
            "attr": "force-overscroll",
            "mutable": true
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "queue": {
            "context": "queue"
        },
        "scrollByPoint": {
            "method": true
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
        },
        "win": {
            "context": "window"
        }
    }; }
    static get events() { return [{
            "name": "ionScrollStart",
            "method": "ionScrollStart",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionScroll",
            "method": "ionScroll",
            "bubbles": false,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionScrollEnd",
            "method": "ionScrollEnd",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "scroll",
            "method": "onScroll",
            "passive": true
        }]; }
    static get style() { return "/**style-placeholder:ion-scroll:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-scroll:**/"; }
}
// ******** DOM READ ****************
function updateScrollDetail(detail, el, timeStamp, didStart) {
    const scrollTop = el.scrollTop;
    const scrollLeft = el.scrollLeft;
    const positions = detail.positions;
    if (didStart) {
        // remember the start positions
        detail.startTimeStamp = timeStamp;
        detail.startY = scrollTop;
        detail.startX = scrollLeft;
        positions.length = 0;
    }
    detail.timeStamp = timeStamp;
    detail.currentY = detail.scrollTop = scrollTop;
    detail.currentX = detail.scrollLeft = scrollLeft;
    detail.deltaY = scrollTop - detail.startY;
    detail.deltaX = scrollLeft - detail.startX;
    // actively scrolling
    positions.push(scrollTop, scrollLeft, timeStamp);
    // move pointer to position measured 100ms ago
    const timeRange = timeStamp - 100;
    let startPos = positions.length - 1;
    while (startPos > 0 && positions[startPos] > timeRange) {
        startPos -= 3;
    }
    if (startPos > 3) {
        // compute relative movement between these two points
        const frequency = 1 / (positions[startPos] - timeStamp);
        const movedX = positions[startPos - 1] - scrollLeft;
        const movedY = positions[startPos - 2] - scrollTop;
        // based on XXms compute the movement to apply for each render step
        // velocity = space/time = s*(1/t) = s*frequency
        detail.velocityX = movedX * frequency;
        detail.velocityY = movedY * frequency;
    }
    else {
        detail.velocityX = 0;
        detail.velocityY = 0;
    }
}
