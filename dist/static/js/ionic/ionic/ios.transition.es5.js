/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.loadBundle("ios.transition.js", ["exports"], function (e) { window.Ionic.h; var o = "opacity"; e.iosTransitionAnimation = function (e, t, n) { var r = "rtl" === document.dir, a = r ? "-99.5%" : "99.5%", l = r ? "33%" : "-33%", d = n.enteringEl, s = n.leavingEl, c = new e; if (c.addElement(d).duration(n.duration || 500).easing(n.easing || "cubic-bezier(0.36,0.66,0.04,1)").beforeRemoveClass("hide-page"), s && t) {
    var o_1 = new e;
    o_1.addElement(t).duringAddClass("show-decor"), c.add(o_1);
} var i = "back" === n.direction; if (d) {
    var t_1 = d.querySelector(":scope > ion-content"), n_1 = d.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *"), s_1 = d.querySelector(":scope > ion-header > ion-toolbar"), m = new e;
    if (t_1 || s_1 || 0 !== n_1.length ? (m.addElement(t_1), m.addElement(n_1)) : m.addElement(d.querySelector(":scope > ion-page, :scope > ion-nav, :scope > ion-tabs")), c.add(m), i ? m.beforeClearStyles([o]).fromTo("translateX", l, "0%", !0).fromTo(o, .8, 1, !0) : m.beforeClearStyles([o]).fromTo("translateX", a, "0%", !0), s_1) {
        var t_2 = new e;
        t_2.addElement(s_1), c.add(t_2);
        var n_2 = new e;
        n_2.addElement(s_1.querySelector("ion-title"));
        var d_1 = new e;
        d_1.addElement(s_1.querySelectorAll("ion-buttons,[menuToggle]"));
        var m_1 = new e;
        m_1.addElement(s_1.querySelector(".toolbar-background"));
        var f = new e;
        if (f.addElement(s_1.querySelector("ion-back-button")), t_2.add(n_2).add(d_1).add(m_1).add(f), n_2.fromTo(o, .01, 1, !0), d_1.fromTo(o, .01, 1, !0), i)
            n_2.fromTo("translateX", l, "0%", !0), f.fromTo(o, .01, 1, !0);
        else {
            n_2.fromTo("translateX", a, "0%", !0), m_1.beforeClearStyles([o]).fromTo(o, .01, 1, !0), f.fromTo(o, .01, 1, !0);
            var l_1 = new e;
            l_1.addElement(s_1.querySelector("ion-back-button .button-text")).fromTo("translateX", r ? "-100px" : "100px", "0px"), t_2.add(l_1);
        }
    }
} if (s) {
    var t_3 = new e;
    t_3.addElement(s.querySelector(":scope > ion-content")), t_3.addElement(s.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *")), c.add(t_3), i ? t_3.beforeClearStyles([o]).fromTo("translateX", "0%", r ? "-100%" : "100%") : t_3.fromTo("translateX", "0%", l, !0).fromTo(o, 1, .8, !0);
    var n_3 = s.querySelector(":scope > ion-header > ion-toolbar");
    if (n_3) {
        var t_4 = new e;
        t_4.addElement(n_3);
        var a_1 = new e;
        a_1.addElement(n_3.querySelector("ion-title"));
        var d_2 = new e;
        d_2.addElement(n_3.querySelectorAll("ion-buttons,[menuToggle]"));
        var s_2 = new e;
        s_2.addElement(n_3.querySelector(".toolbar-background"));
        var m = new e;
        if (m.addElement(n_3.querySelector("ion-back-button")), t_4.add(a_1).add(d_2).add(m).add(s_2), c.add(t_4), m.fromTo(o, .99, 0, !0), a_1.fromTo(o, .99, 0, !0), d_2.fromTo(o, .99, 0, !0), i) {
            a_1.fromTo("translateX", "0%", r ? "-100%" : "100%"), s_2.beforeClearStyles([o]).fromTo(o, 1, .01, !0);
            var l_2 = new e;
            l_2.addElement(n_3.querySelector("ion-back-button .button-text")), l_2.fromTo("translateX", "0%", (r ? -124 : 124) + "px"), t_4.add(l_2);
        }
        else
            a_1.fromTo("translateX", "0%", l).afterClearStyles(["transform"]), m.afterClearStyles([o]), a_1.afterClearStyles([o]), d_2.afterClearStyles([o]);
    }
} return Promise.resolve(c); }, Object.defineProperty(e, "__esModule", { value: !0 }); });
