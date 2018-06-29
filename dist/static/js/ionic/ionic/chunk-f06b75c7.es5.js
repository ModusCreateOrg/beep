/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.loadBundle("chunk-f06b75c7.js", ["exports"], function (n) { function e(n, e) { var r = n._original || n; return { _original: n, emit: t(r.emit.bind(r), e) }; } function t(n, e) {
    if (e === void 0) { e = 0; }
    var t;
    return function () {
        var r = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            r[_i] = arguments[_i];
        }
        clearTimeout(t), t = setTimeout.apply(void 0, [n, e].concat(r));
    };
} window.Ionic.h, n.now = function (n) { return n.timeStamp || Date.now(); }, n.deferEvent = function (n) { return e(n, 0); }, n.clamp = function (n, e, t) { return Math.max(n, Math.min(e, t)); }, n.assert = function (n, e) { if (!n) {
    var n_1 = "ASSERT: " + e;
    throw console.error(n_1), new Error(n_1);
} }, n.debounceEvent = e, n.isEndSide = function (n, e) { var t = "rtl" === n.document.dir; switch (e) {
    case "start": return t;
    case "end": return !t;
    default: throw new Error("\"" + e + "\" is not a valid value for [side]. Use \"start\" or \"end\" instead.");
} }, n.debounce = t, n.pointerCoord = function (n) { if (n) {
    var e_1 = n.changedTouches;
    if (e_1 && e_1.length > 0) {
        var n_2 = e_1[0];
        return { x: n_2.clientX, y: n_2.clientY };
    }
    if (void 0 !== n.pageX)
        return { x: n.pageX, y: n.pageY };
} return { x: 0, y: 0 }; }; });
