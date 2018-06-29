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
Ionic.loadBundle("chunk-b122ec41.js", ["require", "exports"], function (n, e) { window.Ionic.h; function i(n, e) {
    return __awaiter(this, void 0, void 0, function () { var i; return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                i = (null != n.deepWait ? n.deepWait : e) ? [s(n.enteringEl), s(n.leavingEl)] : [r(n.enteringEl), r(n.leavingEl)];
                return [4 /*yield*/, Promise.all(i)];
            case 1:
                _a.sent();
                return [4 /*yield*/, function (n, e) {
                        return __awaiter(this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = n;
                                    if (!_a) return [3 /*break*/, 2];
                                    return [4 /*yield*/, n(e)];
                                case 1:
                                    _a = (_b.sent());
                                    _b.label = 2;
                                case 2:
                                    _a;
                                    return [2 /*return*/];
                            }
                        }); });
                    }(n.viewIsReady, n.enteringEl)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    }); });
} function t(n, e, i) { o(n, i, "ionViewWillLeave"), o(n, e, "ionViewWillEnter"); } function a(n, e, i) { o(n, e, "ionViewDidEnter"), o(n, i, "ionViewDidLeave"); } function o(n, e, i) { if (e) {
    var t_1 = new (0, n.CustomEvent)(i, { bubbles: !1, cancelable: !1 });
    e.dispatchEvent(t_1);
} } function r(n) { return n && n.componentOnReady ? n.componentOnReady() : Promise.resolve(); } function s(n) { return n ? customElements.get ? customElements.get(n.tagName.toLowerCase()) ? l(n) : Promise.all(Array.from(n.children).map(s)) : l(n) : Promise.resolve(); } function l(n) { return n.componentOnReady ? n.componentOnReady() : Promise.all(Array.from(n.children).map(s)); } e.lifecycle = o, e.transition = function (e) {
    return __awaiter(this, void 0, void 0, function () { var o; return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                !function (n) { var e = n.enteringEl, i = n.leavingEl; (function (n, e, i) { n && (n.style.zIndex = "back" === i ? "99" : "101"), e && (e.style.zIndex = "100"); })(e, i, n.direction), n.showGoBack ? e.classList.add("can-go-back") : e.classList.remove("can-go-back"), e.hidden = !1, i && (i.hidden = !1); }(e);
                return [4 /*yield*/, function (e) {
                        return __awaiter(this, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    if (!(e.leavingEl && !1 !== e.animated && 0 !== e.duration)) return [3 /*break*/, 7];
                                    if (!e.animationBuilder) return [3 /*break*/, 1];
                                    _a = e.animationBuilder;
                                    return [3 /*break*/, 6];
                                case 1:
                                    if (!("ios" === e.mode)) return [3 /*break*/, 3];
                                    return [4 /*yield*/, (function () { return new Promise(function (e, i) { n(["./ios.transition.js"], e, i); }); })()];
                                case 2:
                                    _b = (_c.sent()).iosTransitionAnimation;
                                    return [3 /*break*/, 5];
                                case 3: return [4 /*yield*/, (function () { return new Promise(function (e, i) { n(["./md.transition.js"], e, i); }); })()];
                                case 4:
                                    _b = (_c.sent()).mdTransitionAnimation;
                                    _c.label = 5;
                                case 5:
                                    _a = _b;
                                    _c.label = 6;
                                case 6: return [2 /*return*/, _a];
                                case 7: return [2 /*return*/];
                            }
                        }); });
                    }(e)];
            case 1:
                o = _a.sent();
                return [2 /*return*/, o ? function (n, e) {
                        return __awaiter(this, void 0, void 0, function () { var o; return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, i(e, !0)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, e.animationCtrl.create(n, e.baseEl, e)];
                                case 2:
                                    o = _a.sent();
                                    t(e.window, e.enteringEl, e.leavingEl);
                                    return [4 /*yield*/, function (n, e) { var i = e.progressCallback, t = new Promise(function (e) { return n.onFinish(e); }); return i ? (n.progressStart(), i(n)) : n.play(), t; }(o, e)];
                                case 3: return [2 /*return*/, (_a.sent(), o.hasCompleted && a(e.window, e.enteringEl, e.leavingEl), o)];
                            }
                        }); });
                    }(o, e) : function (n) {
                        return __awaiter(this, void 0, void 0, function () { var e, o; return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    e = n.enteringEl, o = n.leavingEl;
                                    e && e.classList.remove("hide-page"), o && o.classList.remove("hide-page");
                                    return [4 /*yield*/, i(n, !1)];
                                case 1: return [2 /*return*/, (_a.sent(), t(n.window, e, o), a(n.window, e, o), null)];
                            }
                        }); });
                    }(e)];
        }
    }); });
}; });
