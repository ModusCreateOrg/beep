var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.loadBundle("chunk-d492bf7f.js", ["exports"], function (e) { window.Ionic.h; var n = 1; function t(e) { return e.get(i(e)); } function i(e) { var n = -1; return e.forEach(function (e, t) { t > n && (n = t); }), n; } function o(e, n, t, i) {
    return __awaiter(this, void 0, void 0, function () { var e_1, o, _a; return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (e.keyboardClose) {
                    e_1 = t.ownerDocument.activeElement;
                    e_1 && e_1.blur && e_1.blur();
                }
                e.animation && (e.animation.destroy(), e.animation = void 0);
                _a = e;
                return [4 /*yield*/, e.animationCtrl.create(n, t, i)];
            case 1:
                o = _a.animation = _b.sent();
                e.animation = o, e.willAnimate || o.duration(0);
                return [4 /*yield*/, o.playAsync()];
            case 2:
                _b.sent(), o.destroy(), e.animation = void 0;
                return [2 /*return*/];
        }
    }); });
} e.BACKDROP = "backdrop", e.dismiss = function (e, n, t, i, r, a, s) {
    return __awaiter(this, void 0, void 0, function () { var c; return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!e.presented)
                    return [2 /*return*/];
                e.presented = !1, e.willDismiss.emit({ data: n, role: t });
                c = e.leaveAnimation ? e.leaveAnimation : e.config.get(i, "ios" === e.mode ? r : a);
                return [4 /*yield*/, o(e, c, e.el, s)];
            case 1:
                _a.sent(), e.didDismiss.emit({ data: n, role: t }), e.el.remove();
                return [2 /*return*/];
        }
    }); });
}, e.eventMethod = function (e, n, t) { var i; var o = new Promise(function (e) { return i = e; }); return function (e, n, t) { var i = function (o) { e.removeEventListener(n, i), t(o); }; e.addEventListener(n, i); }(e, n, function (e) { var n = e.detail; t && t(n), i(n); }), o; }, e.isCancel = function (e) { return "cancel" === e || "backdrop" === e; }, e.present = function (e, n, t, i, r) {
    return __awaiter(this, void 0, void 0, function () { var a; return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (e.presented)
                    return [2 /*return*/];
                e.presented = !0, e.willPresent.emit();
                a = e.enterAnimation ? e.enterAnimation : e.config.get(n, "ios" === e.mode ? t : i);
                return [4 /*yield*/, o(e, a, e.el, r)];
            case 1:
                _a.sent(), e.didPresent.emit();
                return [2 /*return*/];
        }
    }); });
}, e.createOverlay = function (e, t) { Object.assign(e, t), e.overlayId = n++; var i = e.ownerDocument; return (i.querySelector("ion-app") || i.body).appendChild(e), e.componentOnReady(); }, e.dismissOverlay = function (e, n, t, o) { o = o >= 0 ? o : i(t); var r = t.get(o); return r ? r.dismiss(e, n) : Promise.reject("overlay does not exist"); }, e.getTopOverlay = t, e.removeLastOverlay = function (e) { var n = t(e); return n ? n.dismiss() : Promise.resolve(); }; });
