var DURATION = 500, EASING = "cubic-bezier(0.36,0.66,0.04,1)", OPACITY = "opacity", TRANSFORM = "transform", TRANSLATEX = "translateX", CENTER = "0%", OFF_OPACITY = .8;
function iosTransitionAnimation(e, o, t) { var n = "rtl" === document.dir, r = n ? "-99.5%" : "99.5%", d = n ? "33%" : "-33%", T = t.enteringEl, a = t.leavingEl, l = new e; if (l.addElement(T).duration(t.duration || DURATION).easing(t.easing || EASING).beforeRemoveClass("hide-page"), a && o) {
    var t_1 = new e;
    t_1.addElement(o).duringAddClass("show-decor"), l.add(t_1);
} var c = "back" === t.direction; if (T) {
    var o_1 = T.querySelector(":scope > ion-content"), t_2 = T.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *"), a_1 = T.querySelector(":scope > ion-header > ion-toolbar"), i = new e;
    if (o_1 || a_1 || 0 !== t_2.length ? (i.addElement(o_1), i.addElement(t_2)) : i.addElement(T.querySelector(":scope > ion-page, :scope > ion-nav, :scope > ion-tabs")), l.add(i), c ? i.beforeClearStyles([OPACITY]).fromTo(TRANSLATEX, d, CENTER, !0).fromTo(OPACITY, OFF_OPACITY, 1, !0) : i.beforeClearStyles([OPACITY]).fromTo(TRANSLATEX, r, CENTER, !0), a_1) {
        var o_2 = new e;
        o_2.addElement(a_1), l.add(o_2);
        var t_3 = new e;
        t_3.addElement(a_1.querySelector("ion-title"));
        var T_1 = new e;
        T_1.addElement(a_1.querySelectorAll("ion-buttons,[menuToggle]"));
        var i_1 = new e;
        i_1.addElement(a_1.querySelector(".toolbar-background"));
        var s = new e;
        if (s.addElement(a_1.querySelector("ion-back-button")), o_2.add(t_3).add(T_1).add(i_1).add(s), t_3.fromTo(OPACITY, .01, 1, !0), T_1.fromTo(OPACITY, .01, 1, !0), c)
            t_3.fromTo(TRANSLATEX, d, CENTER, !0), s.fromTo(OPACITY, .01, 1, !0);
        else {
            t_3.fromTo(TRANSLATEX, r, CENTER, !0), i_1.beforeClearStyles([OPACITY]).fromTo(OPACITY, .01, 1, !0), s.fromTo(OPACITY, .01, 1, !0);
            var d_1 = new e;
            d_1.addElement(a_1.querySelector("ion-back-button .button-text")).fromTo(TRANSLATEX, n ? "-100px" : "100px", "0px"), o_2.add(d_1);
        }
    }
} if (a) {
    var o_3 = new e;
    o_3.addElement(a.querySelector(":scope > ion-content")), o_3.addElement(a.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *")), l.add(o_3), c ? o_3.beforeClearStyles([OPACITY]).fromTo(TRANSLATEX, CENTER, n ? "-100%" : "100%") : o_3.fromTo(TRANSLATEX, CENTER, d, !0).fromTo(OPACITY, 1, OFF_OPACITY, !0);
    var t_4 = a.querySelector(":scope > ion-header > ion-toolbar");
    if (t_4) {
        var o_4 = new e;
        o_4.addElement(t_4);
        var r_1 = new e;
        r_1.addElement(t_4.querySelector("ion-title"));
        var T_2 = new e;
        T_2.addElement(t_4.querySelectorAll("ion-buttons,[menuToggle]"));
        var a_2 = new e;
        a_2.addElement(t_4.querySelector(".toolbar-background"));
        var i = new e;
        if (i.addElement(t_4.querySelector("ion-back-button")), o_4.add(r_1).add(T_2).add(i).add(a_2), l.add(o_4), i.fromTo(OPACITY, .99, 0, !0), r_1.fromTo(OPACITY, .99, 0, !0), T_2.fromTo(OPACITY, .99, 0, !0), c) {
            r_1.fromTo(TRANSLATEX, CENTER, n ? "-100%" : "100%"), a_2.beforeClearStyles([OPACITY]).fromTo(OPACITY, 1, .01, !0);
            var d_2 = new e;
            d_2.addElement(t_4.querySelector("ion-back-button .button-text")), d_2.fromTo(TRANSLATEX, CENTER, (n ? -124 : 124) + "px"), o_4.add(d_2);
        }
        else
            r_1.fromTo(TRANSLATEX, CENTER, d).afterClearStyles([TRANSFORM]), i.afterClearStyles([OPACITY]), r_1.afterClearStyles([OPACITY]), T_2.afterClearStyles([OPACITY]);
    }
} return Promise.resolve(l); }
export { iosTransitionAnimation };
