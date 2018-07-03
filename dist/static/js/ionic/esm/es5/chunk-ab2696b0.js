function attachComponent(e, o, n, t, r) { if (e)
    return e.attachViewToDom(o, n, r, t); if ("string" != typeof n && !(n instanceof HTMLElement))
    throw new Error("framework delegate is missing"); var a = "string" == typeof n ? o.ownerDocument.createElement(n) : n; return t && t.forEach(function (e) { return a.classList.add(e); }), r && Object.assign(a, r), o.appendChild(a), a.componentOnReady ? a.componentOnReady() : Promise.resolve(a); }
function detachComponent(e, o) { if (o) {
    if (e) {
        var n = o.parentElement;
        return e.removeViewFromDom(n, o);
    }
    o.remove();
} return Promise.resolve(); }
export { attachComponent as a, detachComponent as b };
