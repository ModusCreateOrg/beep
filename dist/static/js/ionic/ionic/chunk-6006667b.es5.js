/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.loadBundle("chunk-6006667b.js", ["exports"], function (e) { window.Ionic.h, e.attachComponent = function (e, n, o, t, r) { if (e)
    return e.attachViewToDom(n, o, r, t); if ("string" != typeof o && !(o instanceof HTMLElement))
    throw new Error("framework delegate is missing"); var i = "string" == typeof o ? n.ownerDocument.createElement(o) : o; return t && t.forEach(function (e) { return i.classList.add(e); }), r && Object.assign(i, r), n.appendChild(i), i.componentOnReady ? i.componentOnReady() : Promise.resolve(i); }, e.detachComponent = function (e, n) { if (n) {
    if (e) {
        var o = n.parentElement;
        return e.removeViewFromDom(o, n);
    }
    n.remove();
} return Promise.resolve(); }; });
