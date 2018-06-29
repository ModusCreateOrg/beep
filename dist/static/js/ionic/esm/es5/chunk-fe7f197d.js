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
var iosTransitionAnimation = function () { return import("./ios.transition.js"); }, mdTransitionAnimation = function () { return import("./md.transition.js"); };
function transition(n) {
    return __awaiter(this, void 0, void 0, function () { var i; return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                beforeTransition(n);
                return [4 /*yield*/, getAnimationBuilder(n)];
            case 1:
                i = _a.sent();
                return [2 /*return*/, i ? animation(i, n) : noAnimation(n)];
        }
    }); });
}
function getAnimationBuilder(n) {
    return __awaiter(this, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!(n.leavingEl && !1 !== n.animated && 0 !== n.duration)) return [3 /*break*/, 7];
                if (!n.animationBuilder) return [3 /*break*/, 1];
                _a = n.animationBuilder;
                return [3 /*break*/, 6];
            case 1:
                if (!("ios" === n.mode)) return [3 /*break*/, 3];
                return [4 /*yield*/, iosTransitionAnimation()];
            case 2:
                _b = (_c.sent()).iosTransitionAnimation;
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, mdTransitionAnimation()];
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
}
function beforeTransition(n) { var i = n.enteringEl, e = n.leavingEl; setZIndex(i, e, n.direction), n.showGoBack ? i.classList.add("can-go-back") : i.classList.remove("can-go-back"), i.hidden = !1, e && (e.hidden = !1); }
function animation(n, i) {
    return __awaiter(this, void 0, void 0, function () { var e; return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, waitForReady(i, !0)];
            case 1:
                _a.sent();
                return [4 /*yield*/, i.animationCtrl.create(n, i.baseEl, i)];
            case 2:
                e = _a.sent();
                fireWillEvents(i.window, i.enteringEl, i.leavingEl);
                return [4 /*yield*/, playTransition(e, i)];
            case 3: return [2 /*return*/, (_a.sent(), e.hasCompleted && fireDidEvents(i.window, i.enteringEl, i.leavingEl), e)];
        }
    }); });
}
function noAnimation(n) {
    return __awaiter(this, void 0, void 0, function () { var i, e; return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                i = n.enteringEl, e = n.leavingEl;
                i && i.classList.remove("hide-page"), e && e.classList.remove("hide-page");
                return [4 /*yield*/, waitForReady(n, !1)];
            case 1: return [2 /*return*/, (_a.sent(), fireWillEvents(n.window, i, e), fireDidEvents(n.window, i, e), null)];
        }
    }); });
}
function waitForReady(n, i) {
    return __awaiter(this, void 0, void 0, function () { var e; return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                e = (null != n.deepWait ? n.deepWait : i) ? [deepReady(n.enteringEl), deepReady(n.leavingEl)] : [shallowReady(n.enteringEl), shallowReady(n.leavingEl)];
                return [4 /*yield*/, Promise.all(e)];
            case 1:
                _a.sent();
                return [4 /*yield*/, notifyViewReady(n.viewIsReady, n.enteringEl)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    }); });
}
function notifyViewReady(n, i) {
    return __awaiter(this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = n;
                if (!_a) return [3 /*break*/, 2];
                return [4 /*yield*/, n(i)];
            case 1:
                _a = (_b.sent());
                _b.label = 2;
            case 2:
                _a;
                return [2 /*return*/];
        }
    }); });
}
function playTransition(n, i) { var e = i.progressCallback, a = new Promise(function (i) { return n.onFinish(i); }); return e ? (n.progressStart(), e(n)) : n.play(), a; }
function fireWillEvents(n, i, e) { lifecycle(n, e, "ionViewWillLeave"), lifecycle(n, i, "ionViewWillEnter"); }
function fireDidEvents(n, i, e) { lifecycle(n, i, "ionViewDidEnter"), lifecycle(n, e, "ionViewDidLeave"); }
function lifecycle(n, i, e) { if (i) {
    var a = new (0, n.CustomEvent)(e, { bubbles: !1, cancelable: !1 });
    i.dispatchEvent(a);
} }
function shallowReady(n) { return n && n.componentOnReady ? n.componentOnReady() : Promise.resolve(); }
function deepReady(n) { return n ? customElements.get ? customElements.get(n.tagName.toLowerCase()) ? componentOnReady(n) : Promise.all(Array.from(n.children).map(deepReady)) : componentOnReady(n) : Promise.resolve(); }
function componentOnReady(n) { return n.componentOnReady ? n.componentOnReady() : Promise.all(Array.from(n.children).map(deepReady)); }
function setZIndex(n, i, e) { n && (n.style.zIndex = "back" === e ? "99" : "101"), i && (i.style.zIndex = "100"); }
export { lifecycle as a, transition as b };
