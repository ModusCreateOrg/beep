import { assert } from '../../utils/helpers';
import { lifecycle, transition } from '../../utils/transition';
import { ViewController, convertToViews, matches } from './view-controller';
export class Nav {
    constructor() {
        this.transInstr = [];
        this.useRouter = false;
        this.isTransitioning = false;
        this.destroyed = false;
        this.views = [];
    }
    rootChanged() {
        const isDev = false;
        if (this.root) {
            if (!this.useRouter) {
                this.setRoot(this.root, this.rootParams);
            }
            else if (isDev) {
                console.warn('<ion-nav> does not support a root attribute when using ion-router.');
            }
        }
    }
    componentWillLoad() {
        this.useRouter = !!this.win.document.querySelector('ion-router') && !this.el.closest('[no-router]');
        if (this.swipeBackEnabled === undefined) {
            this.swipeBackEnabled = this.config.getBoolean('swipeBackEnabled', this.mode === 'ios');
        }
        if (this.animated === undefined) {
            this.animated = this.config.getBoolean('animate', true);
        }
        this.ionNavWillLoad.emit();
    }
    componentDidLoad() {
        this.rootChanged();
    }
    componentDidUnload() {
        for (const view of this.views) {
            lifecycle(this.win, view.element, "ionViewWillUnload" /* WillUnload */);
            view._destroy();
        }
        // release swipe back gesture and transition
        this.sbTrns && this.sbTrns.destroy();
        this.transInstr.length = this.views.length = 0;
        this.sbTrns = undefined;
        this.destroyed = true;
    }
    push(component, componentProps, opts, done) {
        return this.queueTrns({
            insertStart: -1,
            insertViews: [{ page: component, params: componentProps }],
            opts: opts,
        }, done);
    }
    insert(insertIndex, component, componentProps, opts, done) {
        return this.queueTrns({
            insertStart: insertIndex,
            insertViews: [{ page: component, params: componentProps }],
            opts: opts,
        }, done);
    }
    insertPages(insertIndex, insertComponents, opts, done) {
        return this.queueTrns({
            insertStart: insertIndex,
            insertViews: insertComponents,
            opts: opts,
        }, done);
    }
    pop(opts, done) {
        return this.queueTrns({
            removeStart: -1,
            removeCount: 1,
            opts: opts,
        }, done);
    }
    popTo(indexOrViewCtrl, opts, done) {
        const config = {
            removeStart: -1,
            removeCount: -1,
            opts: opts
        };
        if (indexOrViewCtrl instanceof ViewController) {
            config.removeView = indexOrViewCtrl;
            config.removeStart = 1;
        }
        else if (typeof indexOrViewCtrl === 'number') {
            config.removeStart = indexOrViewCtrl + 1;
        }
        return this.queueTrns(config, done);
    }
    popToRoot(opts, done) {
        return this.queueTrns({
            removeStart: 1,
            removeCount: -1,
            opts: opts,
        }, done);
    }
    removeIndex(startIndex, removeCount = 1, opts, done) {
        return this.queueTrns({
            removeStart: startIndex,
            removeCount: removeCount,
            opts: opts,
        }, done);
    }
    setRoot(component, componentProps, opts, done) {
        return this.setPages([{ page: component, params: componentProps }], opts, done);
    }
    setPages(views, opts, done) {
        if (!opts) {
            opts = {};
        }
        // if animation wasn't set to true then default it to NOT animate
        if (opts.animated !== true) {
            opts.animated = false;
        }
        return this.queueTrns({
            insertStart: 0,
            insertViews: views,
            removeStart: 0,
            removeCount: -1,
            opts: opts
        }, done);
    }
    setRouteId(id, params, direction) {
        const active = this.getActive();
        if (matches(active, id, params)) {
            return Promise.resolve({
                changed: false,
                element: active.element
            });
        }
        let resolve;
        const promise = new Promise((r) => resolve = r);
        let finish;
        const commonOpts = {
            updateURL: false,
            viewIsReady: (enteringEl) => {
                let mark;
                const p = new Promise(r => mark = r);
                resolve({
                    changed: true,
                    element: enteringEl,
                    markVisible: async () => {
                        mark();
                        await finish;
                    }
                });
                return p;
            }
        };
        if (direction === 0) {
            finish = this.setRoot(id, params, commonOpts);
        }
        else {
            const viewController = this.views.find(v => matches(v, id, params));
            if (viewController) {
                finish = this.popTo(viewController, Object.assign({}, commonOpts, { direction: 'back' }));
            }
            else if (direction === 1) {
                finish = this.push(id, params, commonOpts);
            }
            else if (direction === -1) {
                finish = this.setRoot(id, params, Object.assign({}, commonOpts, { direction: 'back', animated: true }));
            }
        }
        return promise;
    }
    getRouteId() {
        const active = this.getActive();
        return active ? {
            id: active.element.tagName,
            params: active.params,
            element: active.element
        } : undefined;
    }
    canGoBack(view = this.getActive()) {
        return !!(view && this.getPrevious(view));
    }
    getActive() {
        return this.views[this.views.length - 1];
    }
    getByIndex(index) {
        return this.views[index];
    }
    getPrevious(view = this.getActive()) {
        if (!view) {
            return undefined;
        }
        const views = this.views;
        const index = views.indexOf(view);
        return (index > 0) ? views[index - 1] : undefined;
    }
    length() {
        return this.views.length;
    }
    // _queueTrns() adds a navigation stack change to the queue and schedules it to run:
    // 1. _nextTrns(): consumes the next transition in the queue
    // 2. _viewInit(): initializes enteringView if required
    // 3. _viewTest(): ensures canLeave/canEnter returns true, so the operation can continue
    // 4. _postViewInit(): add/remove the views from the navigation stack
    // 5. _transitionInit(): initializes the visual transition if required and schedules it to run
    // 6. _viewAttachToDOM(): attaches the enteringView to the DOM
    // 7. _transitionStart(): called once the transition actually starts, it initializes the Animation underneath.
    // 8. _transitionFinish(): called once the transition finishes
    // 9. _cleanup(): syncs the navigation internal state with the DOM. For example it removes the pages from the DOM or hides/show them.
    queueTrns(ti, done) {
        const promise = new Promise((resolve, reject) => {
            ti.resolve = resolve;
            ti.reject = reject;
        });
        ti.done = done;
        // Normalize empty
        if (ti.insertViews && ti.insertViews.length === 0) {
            ti.insertViews = undefined;
        }
        // Enqueue transition instruction
        this.transInstr.push(ti);
        // if there isn't a transition already happening
        // then this will kick off this transition
        this.nextTrns();
        return promise;
    }
    success(result, ti) {
        if (this.transInstr === null) {
            this.fireError('nav controller was destroyed', ti);
            return;
        }
        if (ti.done) {
            ti.done(result.hasCompleted, result.requiresTransition, result.enteringView, result.leavingView, result.direction);
        }
        ti.resolve(result.hasCompleted);
        if (ti.opts.updateURL !== false && this.useRouter) {
            const router = this.win.document.querySelector('ion-router');
            if (router) {
                const direction = (result.direction === 'back')
                    ? -1
                    : 1;
                router.navChanged(direction);
            }
        }
    }
    failed(rejectReason, ti) {
        if (this.transInstr === null) {
            this.fireError('nav controller was destroyed', ti);
            return;
        }
        this.transInstr.length = 0;
        this.fireError(rejectReason, ti);
    }
    fireError(rejectReason, ti) {
        if (ti.done) {
            ti.done(false, false, rejectReason);
        }
        if (ti.reject && !this.destroyed) {
            ti.reject(rejectReason);
        }
        else {
            ti.resolve(false);
        }
    }
    nextTrns() {
        // this is the framework's bread 'n butta function
        // only one transition is allowed at any given time
        if (this.isTransitioning) {
            return false;
        }
        // there is no transition happening right now
        // get the next instruction
        const ti = this.transInstr.shift();
        if (!ti) {
            return false;
        }
        this.runTransition(ti);
        return true;
    }
    async runTransition(ti) {
        try {
            // set that this nav is actively transitioning
            this.ionNavWillChange.emit();
            this.isTransitioning = true;
            this.prepareTI(ti);
            const leavingView = this.getActive();
            const enteringView = this.getEnteringView(ti, leavingView);
            if (!leavingView && !enteringView) {
                throw new Error('no views in the stack to be removed');
            }
            if (enteringView && enteringView.state === 1 /* New */) {
                await enteringView.init(this.el);
            }
            this.postViewInit(enteringView, leavingView, ti);
            // Needs transition?
            const requiresTransition = (ti.enteringRequiresTransition || ti.leavingRequiresTransition) && enteringView !== leavingView;
            const result = requiresTransition
                ? await this.transition(enteringView, leavingView, ti)
                : {
                    // transition is not required, so we are already done!
                    // they're inserting/removing the views somewhere in the middle or
                    // beginning, so visually nothing needs to animate/transition
                    // resolve immediately because there's no animation that's happening
                    hasCompleted: true,
                    requiresTransition: false
                };
            this.success(result, ti);
            this.ionNavDidChange.emit();
        }
        catch (rejectReason) {
            this.failed(rejectReason, ti);
        }
        this.isTransitioning = false;
        this.nextTrns();
    }
    prepareTI(ti) {
        const viewsLength = this.views.length;
        ti.opts = ti.opts || {};
        if (ti.opts.delegate === undefined) {
            ti.opts.delegate = this.delegate;
        }
        if (ti.removeView != null) {
            assert(ti.removeStart != null, 'removeView needs removeStart');
            assert(ti.removeCount != null, 'removeView needs removeCount');
            const index = this.views.indexOf(ti.removeView);
            if (index < 0) {
                throw new Error('removeView was not found');
            }
            ti.removeStart += index;
        }
        if (ti.removeStart != null) {
            if (ti.removeStart < 0) {
                ti.removeStart = (viewsLength - 1);
            }
            if (ti.removeCount < 0) {
                ti.removeCount = (viewsLength - ti.removeStart);
            }
            ti.leavingRequiresTransition = (ti.removeCount > 0) && ((ti.removeStart + ti.removeCount) === viewsLength);
        }
        if (ti.insertViews) {
            // allow -1 to be passed in to auto push it on the end
            // and clean up the index if it's larger then the size of the stack
            if (ti.insertStart < 0 || ti.insertStart > viewsLength) {
                ti.insertStart = viewsLength;
            }
            ti.enteringRequiresTransition = (ti.insertStart === viewsLength);
        }
        const insertViews = ti.insertViews;
        if (!insertViews) {
            return;
        }
        assert(insertViews.length > 0, 'length can not be zero');
        const viewControllers = convertToViews(insertViews);
        if (viewControllers.length === 0) {
            throw new Error('invalid views to insert');
        }
        // Check all the inserted view are correct
        for (const view of viewControllers) {
            view.delegate = ti.opts.delegate;
            const nav = view.nav;
            if (nav && nav !== this) {
                throw new Error('inserted view was already inserted');
            }
            if (view.state === 3 /* Destroyed */) {
                throw new Error('inserted view was already destroyed');
            }
        }
        ti.insertViews = viewControllers;
    }
    getEnteringView(ti, leavingView) {
        const insertViews = ti.insertViews;
        if (insertViews) {
            // grab the very last view of the views to be inserted
            // and initialize it as the new entering view
            return insertViews[insertViews.length - 1];
        }
        const removeStart = ti.removeStart;
        if (removeStart != null) {
            const views = this.views;
            const removeEnd = removeStart + ti.removeCount;
            for (let i = views.length - 1; i >= 0; i--) {
                const view = views[i];
                if ((i < removeStart || i >= removeEnd) && view !== leavingView) {
                    return view;
                }
            }
        }
        return undefined;
    }
    postViewInit(enteringView, leavingView, ti) {
        assert(leavingView || enteringView, 'Both leavingView and enteringView are null');
        assert(ti.resolve, 'resolve must be valid');
        assert(ti.reject, 'reject must be valid');
        const opts = ti.opts;
        const insertViews = ti.insertViews;
        const removeStart = ti.removeStart;
        const removeCount = ti.removeCount;
        let destroyQueue = undefined;
        // there are views to remove
        if (removeStart != null && removeCount != null) {
            assert(removeStart >= 0, 'removeStart can not be negative');
            assert(removeCount >= 0, 'removeCount can not be negative');
            destroyQueue = [];
            for (let i = 0; i < removeCount; i++) {
                const view = this.views[i + removeStart];
                if (view && view !== enteringView && view !== leavingView) {
                    destroyQueue.push(view);
                }
            }
            // default the direction to "back"
            opts.direction = opts.direction || 'back';
        }
        const finalBalance = this.views.length + (insertViews ? insertViews.length : 0) - (removeCount ? removeCount : 0);
        assert(finalBalance >= 0, 'final balance can not be negative');
        if (finalBalance === 0) {
            console.warn(`You can't remove all the pages in the navigation stack. nav.pop() is probably called too many times.`, this, this.el);
            throw new Error('navigation stack needs at least one root page');
        }
        // At this point the transition can not be rejected, any throw should be an error
        // there are views to insert
        if (insertViews) {
            // add the views to the
            let insertIndex = ti.insertStart;
            for (const view of insertViews) {
                this.insertViewAt(view, insertIndex);
                insertIndex++;
            }
            if (ti.enteringRequiresTransition) {
                // default to forward if not already set
                opts.direction = opts.direction || 'forward';
            }
        }
        // if the views to be removed are in the beginning or middle
        // and there is not a view that needs to visually transition out
        // then just destroy them and don't transition anything
        // batch all of lifecycles together
        // let's make sure, callbacks are zoned
        if (destroyQueue && destroyQueue.length > 0) {
            for (const view of destroyQueue) {
                lifecycle(this.win, view.element, "ionViewWillLeave" /* WillLeave */);
                lifecycle(this.win, view.element, "ionViewDidLeave" /* DidLeave */);
                lifecycle(this.win, view.element, "ionViewWillUnload" /* WillUnload */);
            }
            // once all lifecycle events has been delivered, we can safely detroy the views
            for (const view of destroyQueue) {
                this.destroyView(view);
            }
        }
    }
    async transition(enteringView, leavingView, ti) {
        if (this.sbTrns) {
            this.sbTrns.destroy();
            this.sbTrns = undefined;
        }
        // we should animate (duration > 0) if the pushed page is not the first one (startup)
        // or if it is a portal (modal, actionsheet, etc.)
        const opts = ti.opts;
        const progressCallback = opts.progressAnimation
            ? (animation) => { this.sbTrns = animation; }
            : undefined;
        const enteringEl = enteringView.element;
        const leavingEl = leavingView && leavingView.element;
        const animationOpts = Object.assign({ mode: this.mode, animated: this.animated, showGoBack: this.canGoBack(enteringView), animationCtrl: this.animationCtrl, progressCallback, window: this.win, baseEl: this.el, enteringEl,
            leavingEl }, opts);
        const trns = await transition(animationOpts);
        return this.transitionFinish(trns, enteringView, leavingView, opts);
    }
    transitionFinish(transition, enteringView, leavingView, opts) {
        const hasCompleted = transition ? transition.hasCompleted : true;
        const cleanupView = hasCompleted ? enteringView : leavingView;
        if (cleanupView) {
            this.cleanup(cleanupView);
        }
        // this is the root transition
        // it's safe to destroy this transition
        transition && transition.destroy();
        return {
            hasCompleted: hasCompleted,
            requiresTransition: true,
            enteringView,
            leavingView,
            direction: opts.direction
        };
    }
    insertViewAt(view, index) {
        const views = this.views;
        const existingIndex = views.indexOf(view);
        if (existingIndex > -1) {
            // this view is already in the stack!!
            // move it to its new location
            assert(view.nav === this, 'view is not part of the nav');
            views.splice(index, 0, views.splice(existingIndex, 1)[0]);
        }
        else {
            assert(!view.nav, 'nav is used');
            // this is a new view to add to the stack
            // create the new entering view
            view.nav = this;
            // insert the entering view into the correct index in the stack
            views.splice(index, 0, view);
        }
    }
    removeView(view) {
        assert(view.state === 2 /* Attached */ || view.state === 3 /* Destroyed */, 'view state should be loaded or destroyed');
        const views = this.views;
        const index = views.indexOf(view);
        assert(index > -1, 'view must be part of the stack');
        if (index >= 0) {
            views.splice(index, 1);
        }
    }
    destroyView(view) {
        view._destroy();
        this.removeView(view);
    }
    /**
     * DOM WRITE
     */
    cleanup(activeView) {
        // ok, cleanup time!! Destroy all of the views that are
        // INACTIVE and come after the active view
        // only do this if the views exist, though
        if (this.destroyed) {
            return;
        }
        const views = this.views;
        const activeViewIndex = views.indexOf(activeView);
        for (let i = views.length - 1; i >= 0; i--) {
            const view = views[i];
            if (i > activeViewIndex) {
                // this view comes after the active view
                // let's unload it
                lifecycle(this.win, view.element, "ionViewWillUnload" /* WillUnload */);
                this.destroyView(view);
            }
            else if (i < activeViewIndex) {
                // this view comes before the active view
                // and it is not a portal then ensure it is hidden
                view.element.hidden = true;
            }
        }
    }
    swipeBackStart() {
        if (this.isTransitioning || this.transInstr.length > 0) {
            return;
        }
        // default the direction to "back";
        const opts = {
            direction: 'back',
            progressAnimation: true
        };
        this.queueTrns({
            removeStart: -1,
            removeCount: 1,
            opts: opts,
        }, undefined);
    }
    swipeBackProgress(detail) {
        if (this.sbTrns) {
            // continue to disable the app while actively dragging
            this.isTransitioning = true;
            // set the transition animation's progress
            const delta = detail.deltaX;
            const stepValue = delta / this.win.innerWidth;
            // set the transition animation's progress
            this.sbTrns.progressStep(stepValue);
        }
    }
    swipeBackEnd(detail) {
        if (this.sbTrns) {
            // the swipe back gesture has ended
            const delta = detail.deltaX;
            const width = this.win.innerWidth;
            const stepValue = delta / width;
            const velocity = detail.velocityX;
            const z = width / 2.0;
            const shouldComplete = (velocity >= 0)
                && (velocity > 0.2 || detail.deltaX > z);
            const missing = shouldComplete ? 1 - stepValue : stepValue;
            const missingDistance = missing * width;
            let realDur = 0;
            if (missingDistance > 5) {
                const dur = missingDistance / Math.abs(velocity);
                realDur = Math.min(dur, 300);
            }
            this.sbTrns.progressEnd(shouldComplete, stepValue, realDur);
        }
    }
    canSwipeBack() {
        return (!!this.swipeBackEnabled &&
            !this.isTransitioning &&
            this.canGoBack());
    }
    render() {
        return [
            this.swipeBackEnabled &&
                h("ion-gesture", { canStart: this.canSwipeBack.bind(this), onStart: this.swipeBackStart.bind(this), onMove: this.swipeBackProgress.bind(this), onEnd: this.swipeBackEnd.bind(this), gestureName: "goback-swipe", gesturePriority: 10, direction: "x", threshold: 10, attachTo: "body" }),
            this.mode === 'ios' && h("div", { class: "nav-decor" }),
            h("slot", null)
        ];
    }
    static get is() { return "ion-nav"; }
    static get properties() { return {
        "animated": {
            "type": Boolean,
            "attr": "animated",
            "mutable": true
        },
        "animationCtrl": {
            "connect": "ion-animation-controller"
        },
        "canGoBack": {
            "method": true
        },
        "config": {
            "context": "config"
        },
        "delegate": {
            "type": "Any",
            "attr": "delegate"
        },
        "el": {
            "elementRef": true
        },
        "getActive": {
            "method": true
        },
        "getByIndex": {
            "method": true
        },
        "getPrevious": {
            "method": true
        },
        "getRouteId": {
            "method": true
        },
        "insert": {
            "method": true
        },
        "insertPages": {
            "method": true
        },
        "length": {
            "method": true
        },
        "pop": {
            "method": true
        },
        "popTo": {
            "method": true
        },
        "popToRoot": {
            "method": true
        },
        "push": {
            "method": true
        },
        "queue": {
            "context": "queue"
        },
        "removeIndex": {
            "method": true
        },
        "root": {
            "type": String,
            "attr": "root",
            "watchCallbacks": ["rootChanged"]
        },
        "rootParams": {
            "type": "Any",
            "attr": "root-params"
        },
        "setPages": {
            "method": true
        },
        "setRoot": {
            "method": true
        },
        "setRouteId": {
            "method": true
        },
        "swipeBackEnabled": {
            "type": Boolean,
            "attr": "swipe-back-enabled",
            "mutable": true
        },
        "win": {
            "context": "window"
        }
    }; }
    static get events() { return [{
            "name": "ionNavWillLoad",
            "method": "ionNavWillLoad",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionNavWillChange",
            "method": "ionNavWillChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionNavDidChange",
            "method": "ionNavDidChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
}
