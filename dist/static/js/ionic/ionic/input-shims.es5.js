/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.loadBundle("input-shims.js", ["exports", "./chunk-f06b75c7.js"], function (t, e) { window.Ionic.h; var n = "$ionRelocated"; function o(t, e, o, i) {
    if (i === void 0) { i = 0; }
    if (t[n] !== o) {
        if (e.value, o) {
            !function (t, e) { var n = t.parentElement, o = t.ownerDocument; if (t && n) {
                var i_1 = t.offsetTop, r_1 = t.offsetLeft, s_1 = t.offsetWidth, c_1 = t.offsetHeight, l_1 = o.createElement("div"), a_1 = l_1.style;
                (_a = l_1.classList).add.apply(_a, Array.from(t.classList)), l_1.classList.add("cloned-input"), l_1.setAttribute("aria-hidden", "true"), a_1.pointerEvents = "none", a_1.position = "absolute", a_1.top = i_1 + "px", a_1.left = r_1 + "px", a_1.width = s_1 + "px", a_1.height = c_1 + "px";
                var u_1 = o.createElement("input");
                (_b = u_1.classList).add.apply(_b, Array.from(e.classList)), u_1.value = e.value, u_1.type = e.type, u_1.placeholder = e.placeholder, u_1.tabIndex = -1, l_1.appendChild(u_1), n.appendChild(l_1), t.style.pointerEvents = "none";
            } e.style.transform = "scale(0)"; var _a, _b; }(t, e);
            var n_1 = "rtl" === t.ownerDocument.dir ? 9999 : -9999;
            e.style.transform = "translate3d(" + n_1 + "px," + i + "px,0)";
        }
        else
            !function (t, e) { if (t && t.parentElement) {
                var e_1 = t.parentElement.querySelectorAll(".cloned-input");
                for (var t_1 = 0; t_1 < e_1.length; t_1++)
                    e_1[t_1].remove();
                t.style.pointerEvents = "";
            } e.style.transform = "", e.style.opacity = ""; }(t, e);
        t[n] = o;
    }
} function i(t) { return t === t.ownerDocument.activeElement; } var r = ["INPUT", "TEXTAREA", "ION-INPUT", "ION-TEXTAREA"], s = .3; function c(t, n, r, c) { var l; var a = function (t) { l = e.pointerCoord(t), t.type; }, u = function (a) { if (a.type, !l)
    return; var u = e.pointerCoord(a); (function (t, e, n) { if (e && n) {
    var t_2 = e.x - n.x, o_1 = e.y - n.y;
    return t_2 * t_2 + o_1 * o_1 > 36;
} return !1; })(0, l, u) || i(n) || (a.preventDefault(), a.stopPropagation(), function (t, e, n, i) { var r = function (t, e, n) { return e ? function (t, e, n, o) { var i = t.top, r = t.bottom, c = e.top + 10, l = Math.min(e.bottom, o - n) / 2 - r, a = c - i, u = Math.round(l < 0 ? -l : a > 0 ? -a : 0), d = Math.abs(u) / s; return { scrollAmount: u, scrollDuration: Math.min(400, Math.max(150, d)), scrollPadding: n, inputSafeY: 4 - (i - c) }; }((t.closest("ion-item,[ion-item]") || t).getBoundingClientRect(), e.getBoundingClientRect(), n, window.innerHeight) : { scrollAmount: 0, scrollPadding: 0, scrollDuration: 0, inputSafeY: 0 }; }(t, n, i); Math.abs(r.scrollAmount) < 4 ? e.focus() : (o(t, e, !0, r.inputSafeY), e.focus(), n.scrollByPoint(0, r.scrollAmount, r.scrollDuration, function () { o(t, e, !1, r.inputSafeY), e.focus(); })); }(t, n, r, c)); }; return t.addEventListener("touchstart", a, !0), t.addEventListener("touchend", u, !0), function () { t.removeEventListener("touchstart", a, !0), t.removeEventListener("touchend", u, !0); }; } var l = "$ionPaddingTimer"; function a(t, e) { if ("INPUT" !== t.tagName)
    return; if (t.parentElement && "ION-INPUT" === t.parentElement.tagName)
    return; var n = t.closest(".scroll-inner"); if (!n)
    return; var o = n[l]; o && clearTimeout(o), e > 0 ? n.style.paddingBottom = e + "px" : n[l] = setTimeout(function () { n.style.paddingBottom = ""; }, 120); } var u = !0, d = !0; t.startInputShims = function (t, e) { var n = e.getNumber("keyboardHeight", 290), s = e.getBoolean("scrollAssist", !0), l = e.getBoolean("hideCaretOnScroll", !0), f = e.getBoolean("inputBlurring", !0), p = e.getBoolean("scrollPadding", !0), m = new WeakMap, v = new WeakMap; function E(t) { var e = t.querySelector("input"), r = t.closest("ion-scroll"), a = t.closest("ion-content"); if (e) {
    if (d && r && l && !m.has(t)) {
        var n_2 = function (t, e, n) { if (!n || !e)
            return function () { }; var r = function (n) { i(e) && o(t, e, n); }, s = function () { return o(t, e, !1); }, c = function () { return r(!0); }, l = function () { return r(!1); }; return n && n.addEventListener("ionScrollStart", c), n && n.addEventListener("ionScrollEnd", l), e.addEventListener("blur", s), function () { n.removeEventListener("ionScrollStart", c), n.removeEventListener("ionScrollEnd", l), e.addEventListener("ionBlur", s); }; }(t, e, r);
        m.set(t, n_2);
    }
    if (u && a && s && !v.has(t)) {
        var o_2 = c(t, e, a, n);
        v.set(t, o_2);
    }
} } f && function (t) { var e = !0, n = !1; t.addEventListener("ionScrollStart", function () { n = !0; }), t.addEventListener("focusin", function () { e = !0; }, !0), t.addEventListener("touchend", function (o) { if (n)
    return void (n = !1); var i = t.activeElement; if (!i)
    return; if (-1 === r.indexOf(i.tagName))
    return; var s = o.target; s !== i && (r.indexOf(s.tagName) >= 0 || s.classList.contains("input-cover") || (e = !1, setTimeout(function () { e || i.blur(); }, 50))); }, !1); }(t), p && function (t, e) { t.addEventListener("focusin", function (t) { a(t.target, e); }), t.addEventListener("focusout", function (t) { a(t.target, 0); }); }(t, n); var g = Array.from(t.querySelectorAll("ion-input")); for (var _i = 0, g_1 = g; _i < g_1.length; _i++) {
    var t_3 = g_1[_i];
    E(t_3);
} t.body.addEventListener("ionInputDidLoad", function (t) { E(t.target); }), t.body.addEventListener("ionInputDidUnload", function (t) { !function (t) { if (d && l) {
    var e_2 = m.get(t);
    e_2 && e_2(), m.delete(t);
} if (u && s) {
    var e_3 = v.get(t);
    e_3 && e_3(), v.delete(t);
} }(t.target); }); }, Object.defineProperty(t, "__esModule", { value: !0 }); });
