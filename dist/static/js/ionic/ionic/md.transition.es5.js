/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.loadBundle("md.transition.js", ["exports"], function (e) { window.Ionic.h; function n(e) { if (e.classList.contains("ion-page"))
    return e; return e.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs") || e; } e.mdTransitionAnimation = function (e, o, i) { var t = i.enteringEl, a = i.leavingEl, r = n(t), c = new e; c.addElement(r).beforeRemoveClass("hide-page"); var d = "back" === i.direction; if (t) {
    d ? c.duration(i.duration || 200).easing("cubic-bezier(0.47,0,0.745,0.715)") : c.duration(i.duration || 280).easing("cubic-bezier(0.36,0.66,0.04,1)").fromTo("translateY", "40px", "0px", !0).fromTo("opacity", .01, 1, !0);
    var n_1 = r.querySelector("ion-toolbar");
    if (n_1) {
        var o_1 = new e;
        o_1.addElement(n_1), c.add(o_1);
    }
} if (a && d) {
    c.duration(i.duration || 200).easing("cubic-bezier(0.47,0,0.745,0.715)");
    var o_2 = new e;
    o_2.addElement(n(a)).fromTo("translateY", "0px", "40px").fromTo("opacity", 1, 0), c.add(o_2);
} return Promise.resolve(c); }, Object.defineProperty(e, "__esModule", { value: !0 }); });
