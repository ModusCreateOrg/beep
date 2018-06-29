import { h as pointerCoord } from "./chunk-770a6cdb.js";
var RELOCATED_KEY = "$ionRelocated";
function relocateInput(t, e, n, o) {
    if (o === void 0) { o = 0; }
    if (t[RELOCATED_KEY] !== n) {
        if (e.value, n) {
            cloneInputComponent(t, e);
            var n_1 = "rtl" === t.ownerDocument.dir ? 9999 : -9999;
            e.style.transform = "translate3d(" + n_1 + "px," + o + "px,0)";
        }
        else
            removeClone(t, e);
        t[RELOCATED_KEY] = n;
    }
}
function isFocused(t) { return t === t.ownerDocument.activeElement; }
function removeClone(t, e) { if (t && t.parentElement) {
    var e_1 = t.parentElement.querySelectorAll(".cloned-input");
    for (var t_1 = 0; t_1 < e_1.length; t_1++)
        e_1[t_1].remove();
    t.style.pointerEvents = "";
} e.style.transform = "", e.style.opacity = ""; }
function cloneInputComponent(t, e) { var n = t.parentElement, o = t.ownerDocument; if (t && n) {
    var r = t.offsetTop, i = t.offsetLeft, s = t.offsetWidth, l = t.offsetHeight, c = o.createElement("div"), a = c.style;
    (_a = c.classList).add.apply(_a, Array.from(t.classList)), c.classList.add("cloned-input"), c.setAttribute("aria-hidden", "true"), a.pointerEvents = "none", a.position = "absolute", a.top = r + "px", a.left = i + "px", a.width = s + "px", a.height = l + "px";
    var u = o.createElement("input");
    (_b = u.classList).add.apply(_b, Array.from(e.classList)), u.value = e.value, u.type = e.type, u.placeholder = e.placeholder, u.tabIndex = -1, c.appendChild(u), n.appendChild(c), t.style.pointerEvents = "none";
} e.style.transform = "scale(0)"; var _a, _b; }
function enableHideCaretOnScroll(t, e, n) { if (!n || !e)
    return function () { }; var o = function (n) { isFocused(e) && relocateInput(t, e, n); }, r = function () { return relocateInput(t, e, !1); }, i = function () { return o(!0); }, s = function () { return o(!1); }; return n && n.addEventListener("ionScrollStart", i), n && n.addEventListener("ionScrollEnd", s), e.addEventListener("blur", r), function () { n.removeEventListener("ionScrollStart", i), n.removeEventListener("ionScrollEnd", s), e.addEventListener("ionBlur", r); }; }
var SKIP_BLURRING = ["INPUT", "TEXTAREA", "ION-INPUT", "ION-TEXTAREA"];
function enableInputBlurring(t) { var e = !0, n = !1; function o() { n = !0; } function r() { e = !0; } function i(o) { if (n)
    return void (n = !1); var r = t.activeElement; if (!r)
    return; if (-1 === SKIP_BLURRING.indexOf(r.tagName))
    return; var i = o.target; i !== r && (SKIP_BLURRING.indexOf(i.tagName) >= 0 || i.classList.contains("input-cover") || (e = !1, setTimeout(function () { e || r.blur(); }, 50))); } return t.addEventListener("ionScrollStart", o), t.addEventListener("focusin", r, !0), t.addEventListener("touchend", i, !1), function () { t.removeEventListener("ionScrollStart", o, !0), t.removeEventListener("focusin", r, !0), t.removeEventListener("touchend", i, !1); }; }
var SCROLL_ASSIST_SPEED = .3;
function getScrollData(t, e, n) { return e ? calcScrollData((t.closest("ion-item,[ion-item]") || t).getBoundingClientRect(), e.getBoundingClientRect(), n, window.innerHeight) : { scrollAmount: 0, scrollPadding: 0, scrollDuration: 0, inputSafeY: 0 }; }
function calcScrollData(t, e, n, o) { var r = t.top, i = t.bottom, s = e.top + 10, l = Math.min(e.bottom, o - n) / 2 - i, c = s - r, a = Math.round(l < 0 ? -l : c > 0 ? -c : 0), u = Math.abs(a) / SCROLL_ASSIST_SPEED; return { scrollAmount: a, scrollDuration: Math.min(400, Math.max(150, u)), scrollPadding: n, inputSafeY: 4 - (r - s) }; }
function enableScrollAssist(t, e, n, o) { var r; var i = function (t) { r = pointerCoord(t), t.type; }, s = function (i) { if (i.type, !r)
    return; var s = pointerCoord(i); hasPointerMoved(6, r, s) || isFocused(e) || (i.preventDefault(), i.stopPropagation(), jsSetFocus(t, e, n, o)); }; return t.addEventListener("touchstart", i, !0), t.addEventListener("touchend", s, !0), function () { t.removeEventListener("touchstart", i, !0), t.removeEventListener("touchend", s, !0); }; }
function jsSetFocus(t, e, n, o) { var r = getScrollData(t, n, o); Math.abs(r.scrollAmount) < 4 ? e.focus() : (relocateInput(t, e, !0, r.inputSafeY), e.focus(), n.scrollByPoint(0, r.scrollAmount, r.scrollDuration, function () { relocateInput(t, e, !1, r.inputSafeY), e.focus(); })); }
function hasPointerMoved(t, e, n) { if (e && n) {
    var o = e.x - n.x, r = e.y - n.y;
    return o * o + r * r > t * t;
} return !1; }
var PADDING_TIMER_KEY = "$ionPaddingTimer";
function enableScrollPadding(t, e) { function n(t) { setScrollPadding(t.target, e); } function o(t) { setScrollPadding(t.target, 0); } return t.addEventListener("focusin", n), t.addEventListener("focusout", o), function () { t.removeEventListener("focusin", n), t.removeEventListener("focusout", o); }; }
function setScrollPadding(t, e) { if ("INPUT" !== t.tagName)
    return; if (t.parentElement && "ION-INPUT" === t.parentElement.tagName)
    return; var n = t.closest(".scroll-inner"); if (!n)
    return; var o = n[PADDING_TIMER_KEY]; o && clearTimeout(o), e > 0 ? n.style.paddingBottom = e + "px" : n[PADDING_TIMER_KEY] = setTimeout(function () { n.style.paddingBottom = ""; }, 120); }
var INPUT_BLURRING = !0, SCROLL_ASSIST = !0, SCROLL_PADDING = !0, HIDE_CARET = !0;
function startInputShims(t, e) { var n = e.getNumber("keyboardHeight", 290), o = e.getBoolean("scrollAssist", !0), r = e.getBoolean("hideCaretOnScroll", !0), i = e.getBoolean("inputBlurring", !0), s = e.getBoolean("scrollPadding", !0), l = new WeakMap, c = new WeakMap; function a(t) { var e = t.querySelector("input"), i = t.closest("ion-scroll"), s = t.closest("ion-content"); if (e) {
    if (HIDE_CARET && i && r && !l.has(t)) {
        var n_2 = enableHideCaretOnScroll(t, e, i);
        l.set(t, n_2);
    }
    if (SCROLL_ASSIST && s && o && !c.has(t)) {
        var o_1 = enableScrollAssist(t, e, s, n);
        c.set(t, o_1);
    }
} } i && INPUT_BLURRING && enableInputBlurring(t), s && SCROLL_PADDING && enableScrollPadding(t, n); var u = Array.from(t.querySelectorAll("ion-input")); for (var _i = 0, u_1 = u; _i < u_1.length; _i++) {
    var t_2 = u_1[_i];
    a(t_2);
} t.body.addEventListener("ionInputDidLoad", function (t) { a(t.target); }), t.body.addEventListener("ionInputDidUnload", function (t) { !function (t) { if (HIDE_CARET && r) {
    var e_2 = l.get(t);
    e_2 && e_2(), l.delete(t);
} if (SCROLL_ASSIST && o) {
    var e_3 = c.get(t);
    e_3 && e_3(), c.delete(t);
} }(t.target); }); }
export { startInputShims };
