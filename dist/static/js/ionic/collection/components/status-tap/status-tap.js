export class StatusTap {
    constructor() {
        this.duration = 300;
    }
    onStatusTap() {
        this.queue.read(() => {
            const width = this.win.innerWidth;
            const height = this.win.innerWidth;
            const el = this.win.document.elementFromPoint(width / 2, height / 2);
            if (!el) {
                return;
            }
            const scrollEl = el.closest('ion-scroll');
            if (scrollEl) {
                scrollEl.componentOnReady().then(() => {
                    this.queue.write(() => {
                        scrollEl.scrollToTop(this.duration);
                    });
                });
            }
        });
    }
    static get is() { return "ion-status-tap"; }
    static get properties() { return {
        "duration": {
            "type": Number,
            "attr": "duration"
        },
        "queue": {
            "context": "queue"
        },
        "win": {
            "context": "window"
        }
    }; }
    static get listeners() { return [{
            "name": "window:statusTap",
            "method": "onStatusTap"
        }]; }
}
