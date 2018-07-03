import { assert, isEndSide } from '../../utils/helpers';
export class Menu {
    constructor() {
        this.isPane = false;
        this._isOpen = false;
        this.lastOnEnd = 0;
        this.isAnimating = false;
        this.isEndSide = false;
        /**
         * If true, the menu is disabled. Default `false`.
         */
        this.disabled = false;
        /**
         * Which side of the view the menu should be placed. Default `"start"`.
         */
        this.side = 'start';
        /**
         * If true, swiping the menu is enabled. Default `true`.
         */
        this.swipeEnabled = true;
        /**
         * If true, the menu will persist on child pages.
         */
        this.persistent = false;
        this.maxEdgeStart = 50;
    }
    typeChanged(type, oldType) {
        const contentEl = this.contentEl;
        if (contentEl && oldType) {
            contentEl.classList.remove(`menu-content-${oldType}`);
            contentEl.classList.add(`menu-content-${type}`);
            contentEl.removeAttribute('style');
        }
        if (this.menuInnerEl) {
            // Remove effects of previous animations
            this.menuInnerEl.removeAttribute('style');
        }
        this.animation = undefined;
    }
    disabledChanged(disabled) {
        this.updateState();
        this.ionMenuChange.emit({ disabled: disabled, open: this._isOpen });
    }
    sideChanged() {
        this.isEndSide = isEndSide(this.win, this.side);
    }
    swipeEnabledChanged() {
        this.updateState();
    }
    async componentWillLoad() {
        if (this.type == null) {
            this.type = this.mode === 'ios' ? 'reveal' : 'overlay';
        }
        if (this.isServer) {
            this.disabled = true;
        }
        else {
            this.menuCtrl = await this.lazyMenuCtrl.componentOnReady();
        }
    }
    componentDidLoad() {
        if (this.isServer) {
            return;
        }
        const el = this.el;
        const parent = el.parentNode;
        const content = (this.contentId)
            ? document.getElementById(this.contentId)
            : parent && parent.querySelector && parent.querySelector('[main]');
        if (!content || !content.tagName) {
            // requires content element
            console.error('Menu: must have a "content" element to listen for drag events on.');
            return;
        }
        this.contentEl = content;
        // add menu's content classes
        content.classList.add('menu-content');
        this.typeChanged(this.type, null);
        this.sideChanged();
        let isEnabled = !this.disabled;
        if (isEnabled === true || typeof isEnabled === 'undefined') {
            const menus = this.menuCtrl.getMenus();
            isEnabled = !menus.some(m => {
                return m.side === this.side && !m.disabled;
            });
        }
        // register this menu with the app's menu controller
        this.menuCtrl._register(this);
        this.ionMenuChange.emit({ disabled: !isEnabled, open: this._isOpen });
        // mask it as enabled / disabled
        this.disabled = !isEnabled;
    }
    componentDidUnload() {
        this.menuCtrl._unregister(this);
        this.animation && this.animation.destroy();
        this.animation = undefined;
        this.contentEl = this.backdropEl = this.menuInnerEl = undefined;
    }
    splitPaneChanged(ev) {
        this.isPane = ev.target.isPane(this.el);
        this.updateState();
    }
    onBackdropClick(ev) {
        const el = ev.target;
        if (!el.closest('.menu-inner') && this.lastOnEnd < (ev.timeStamp - 100)) {
            ev.preventDefault();
            ev.stopPropagation();
            this.close();
        }
    }
    isOpen() {
        return this._isOpen;
    }
    open(animated = true) {
        return this.setOpen(true, animated);
    }
    close(animated = true) {
        return this.setOpen(false, animated);
    }
    toggle(animated = true) {
        return this.setOpen(!this._isOpen, animated);
    }
    setOpen(shouldOpen, animated = true) {
        return this.menuCtrl._setOpen(this, shouldOpen, animated);
    }
    async _setOpen(shouldOpen, animated = true) {
        // If the menu is disabled or it is currenly being animated, let's do nothing
        if (!this.isActive() || this.isAnimating || (shouldOpen === this._isOpen)) {
            return this._isOpen;
        }
        this.beforeAnimation();
        await this.loadAnimation();
        await this.startAnimation(shouldOpen, animated);
        this.afterAnimation(shouldOpen);
        return shouldOpen;
    }
    isActive() {
        return !this.disabled && !this.isPane;
    }
    async loadAnimation() {
        // Menu swipe animation takes the menu's inner width as parameter,
        // If `offsetWidth` changes, we need to create a new animation.
        const width = this.menuInnerEl.offsetWidth;
        if (width === this.width && this.animation !== undefined) {
            return;
        }
        this.width = width;
        // Destroy existing animation
        if (this.animation) {
            this.animation.destroy();
            this.animation = undefined;
        }
        // Create new animation
        this.animation = await this.menuCtrl.createAnimation(this.type, this);
    }
    async startAnimation(shouldOpen, animated) {
        const ani = this.animation.reverse(!shouldOpen);
        if (animated) {
            await ani.playAsync();
        }
        else {
            ani.playSync();
        }
    }
    canSwipe() {
        return this.swipeEnabled &&
            !this.isAnimating &&
            this.isActive();
    }
    canStart(detail) {
        if (!this.canSwipe()) {
            return false;
        }
        if (this._isOpen) {
            return true;
        }
        else if (this.menuCtrl.getOpen()) {
            return false;
        }
        return checkEdgeSide(this.win, detail.currentX, this.isEndSide, this.maxEdgeStart);
    }
    onWillStart() {
        this.beforeAnimation();
        return this.loadAnimation();
    }
    onDragStart() {
        if (!this.isAnimating || !this.animation) {
            assert(false, 'isAnimating has to be true');
            return;
        }
        // the cloned animation should not use an easing curve during seek
        this.animation
            .reverse(this._isOpen)
            .progressStart();
    }
    onDragMove(detail) {
        if (!this.isAnimating || !this.animation) {
            assert(false, 'isAnimating has to be true');
            return;
        }
        const delta = computeDelta(detail.deltaX, this._isOpen, this.isEndSide);
        const stepValue = delta / this.width;
        this.animation.progressStep(stepValue);
    }
    onDragEnd(detail) {
        if (!this.isAnimating || !this.animation) {
            assert(false, 'isAnimating has to be true');
            return;
        }
        const isOpen = this._isOpen;
        const isEndSide = this.isEndSide;
        const delta = computeDelta(detail.deltaX, isOpen, isEndSide);
        const width = this.width;
        const stepValue = delta / width;
        const velocity = detail.velocityX;
        const z = width / 2.0;
        const shouldCompleteRight = (velocity >= 0)
            && (velocity > 0.2 || detail.deltaX > z);
        const shouldCompleteLeft = (velocity <= 0)
            && (velocity < -0.2 || detail.deltaX < -z);
        const shouldComplete = (isOpen)
            ? isEndSide ? shouldCompleteRight : shouldCompleteLeft
            : isEndSide ? shouldCompleteLeft : shouldCompleteRight;
        let shouldOpen = (!isOpen && shouldComplete);
        if (isOpen && !shouldComplete) {
            shouldOpen = true;
        }
        const missing = shouldComplete ? 1 - stepValue : stepValue;
        const missingDistance = missing * width;
        let realDur = 0;
        if (missingDistance > 5) {
            const dur = missingDistance / Math.abs(velocity);
            realDur = Math.min(dur, 300);
        }
        this.lastOnEnd = detail.timeStamp;
        this.animation
            .onFinish(() => this.afterAnimation(shouldOpen), { clearExistingCallacks: true })
            .progressEnd(shouldComplete, stepValue, realDur);
    }
    beforeAnimation() {
        assert(!this.isAnimating, '_before() should not be called while animating');
        // this places the menu into the correct location before it animates in
        // this css class doesn't actually kick off any animations
        this.el.classList.add(SHOW_MENU);
        this.backdropEl && this.backdropEl.classList.add(SHOW_BACKDROP);
        this.isAnimating = true;
    }
    afterAnimation(isOpen) {
        assert(this.isAnimating, '_before() should be called while animating');
        // keep opening/closing the menu disabled for a touch more yet
        // only add listeners/css if it's enabled and isOpen
        // and only remove listeners/css if it's not open
        // emit opened/closed events
        this._isOpen = isOpen;
        this.isAnimating = false;
        // add/remove backdrop click listeners
        this.enableListener(this, 'body:click', isOpen);
        if (isOpen) {
            // add css class
            this.contentEl && this.contentEl.classList.add(MENU_CONTENT_OPEN);
            // emit open event
            this.ionOpen.emit();
        }
        else {
            // remove css classes
            this.el.classList.remove(SHOW_MENU);
            this.contentEl && this.contentEl.classList.remove(MENU_CONTENT_OPEN);
            this.backdropEl && this.backdropEl.classList.remove(SHOW_BACKDROP);
            // emit close event
            this.ionClose.emit();
        }
    }
    updateState() {
        const isActive = this.isActive();
        // Close menu inmediately
        if (!isActive && this._isOpen) {
            // close if this menu is open, and should not be enabled
            this.forceClosing();
        }
        if (!this.disabled && this.menuCtrl) {
            this.menuCtrl._setActiveMenu(this);
        }
        assert(!this.isAnimating, 'can not be animating');
    }
    forceClosing() {
        assert(this._isOpen, 'menu cannot be closed');
        this.isAnimating = true;
        this.startAnimation(false, false);
        this.afterAnimation(false);
    }
    hostData() {
        const isEndSide = this.isEndSide;
        return {
            role: 'complementary',
            class: {
                [`menu-type-${this.type}`]: true,
                'menu-enabled': !this.disabled,
                'menu-side-right': isEndSide,
                'menu-side-left': !isEndSide,
            }
        };
    }
    render() {
        return ([
            h("div", { class: "menu-inner", ref: el => this.menuInnerEl = el },
                h("slot", null)),
            h("ion-backdrop", { ref: el => this.backdropEl = el, class: "menu-backdrop", tappable: false, stopPropagation: false }),
            h("ion-gesture", { canStart: this.canStart.bind(this), onWillStart: this.onWillStart.bind(this), onStart: this.onDragStart.bind(this), onMove: this.onDragMove.bind(this), onEnd: this.onDragEnd.bind(this), disabled: !this.isActive() || !this.swipeEnabled, gestureName: "menu-swipe", gesturePriority: 10, direction: "x", threshold: 10, attachTo: "window", disableScroll: true })
        ]);
    }
    static get is() { return "ion-menu"; }
    static get host() { return {
        "theme": "menu"
    }; }
    static get properties() { return {
        "close": {
            "method": true
        },
        "config": {
            "context": "config"
        },
        "contentId": {
            "type": String,
            "attr": "content-id"
        },
        "disabled": {
            "type": Boolean,
            "attr": "disabled",
            "mutable": true,
            "watchCallbacks": ["disabledChanged"]
        },
        "el": {
            "elementRef": true
        },
        "enableListener": {
            "context": "enableListener"
        },
        "isActive": {
            "method": true
        },
        "isEndSide": {
            "state": true
        },
        "isOpen": {
            "method": true
        },
        "isServer": {
            "context": "isServer"
        },
        "lazyMenuCtrl": {
            "connect": "ion-menu-controller"
        },
        "maxEdgeStart": {
            "type": Number,
            "attr": "max-edge-start"
        },
        "menuId": {
            "type": String,
            "attr": "menu-id"
        },
        "open": {
            "method": true
        },
        "persistent": {
            "type": Boolean,
            "attr": "persistent"
        },
        "setOpen": {
            "method": true
        },
        "side": {
            "type": String,
            "attr": "side",
            "watchCallbacks": ["sideChanged"]
        },
        "swipeEnabled": {
            "type": Boolean,
            "attr": "swipe-enabled",
            "watchCallbacks": ["swipeEnabledChanged"]
        },
        "toggle": {
            "method": true
        },
        "type": {
            "type": String,
            "attr": "type",
            "mutable": true,
            "watchCallbacks": ["typeChanged"]
        },
        "win": {
            "context": "window"
        }
    }; }
    static get events() { return [{
            "name": "ionOpen",
            "method": "ionOpen",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionClose",
            "method": "ionClose",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionMenuChange",
            "method": "ionMenuChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "body:ionSplitPaneVisible",
            "method": "splitPaneChanged"
        }, {
            "name": "body:click",
            "method": "onBackdropClick",
            "capture": true,
            "disabled": true
        }]; }
    static get style() { return "/**style-placeholder:ion-menu:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-menu:**/"; }
}
function computeDelta(deltaX, isOpen, isEndSide) {
    return Math.max(0, (isOpen !== isEndSide) ? -deltaX : deltaX);
}
function checkEdgeSide(win, posX, isEndSide, maxEdgeStart) {
    if (isEndSide) {
        return posX >= win.innerWidth - maxEdgeStart;
    }
    else {
        return posX <= maxEdgeStart;
    }
}
const SHOW_MENU = 'show-menu';
const SHOW_BACKDROP = 'show-backdrop';
const MENU_CONTENT_OPEN = 'menu-content-open';
