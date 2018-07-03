var TRANSLATEY = "translateY", OFF_BOTTOM = "40px", CENTER = "0px";
function mdTransitionAnimation(e, n, o) { var i = o.enteringEl, t = o.leavingEl, a = getIonPageElement(i), r = new e; r.addElement(a).beforeRemoveClass("hide-page"); var c = "back" === o.direction; if (i) {
    c ? r.duration(o.duration || 200).easing("cubic-bezier(0.47,0,0.745,0.715)") : r.duration(o.duration || 280).easing("cubic-bezier(0.36,0.66,0.04,1)").fromTo(TRANSLATEY, OFF_BOTTOM, CENTER, !0).fromTo("opacity", .01, 1, !0);
    var n_1 = a.querySelector("ion-toolbar");
    if (n_1) {
        var o_1 = new e;
        o_1.addElement(n_1), r.add(o_1);
    }
} if (t && c) {
    r.duration(o.duration || 200).easing("cubic-bezier(0.47,0,0.745,0.715)");
    var n_2 = new e;
    n_2.addElement(getIonPageElement(t)).fromTo(TRANSLATEY, CENTER, OFF_BOTTOM).fromTo("opacity", 1, 0), r.add(n_2);
} return Promise.resolve(r); }
function getIonPageElement(e) { if (e.classList.contains("ion-page"))
    return e; return e.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs") || e; }
export { mdTransitionAnimation };
