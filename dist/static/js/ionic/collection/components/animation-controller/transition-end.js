export function transitionEnd(el, callback) {
    let unRegTrans;
    const opts = { passive: true };
    function unregister() {
        unRegTrans && unRegTrans();
    }
    function onTransitionEnd(ev) {
        if (el === ev.target) {
            unregister();
            callback(ev);
        }
    }
    if (el) {
        el.addEventListener('webkitTransitionEnd', onTransitionEnd, opts);
        el.addEventListener('transitionend', onTransitionEnd, opts);
        unRegTrans = function () {
            el.removeEventListener('webkitTransitionEnd', onTransitionEnd, opts);
            el.removeEventListener('transitionend', onTransitionEnd, opts);
        };
    }
    return unregister;
}
