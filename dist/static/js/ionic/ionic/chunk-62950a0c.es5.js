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
Ionic.loadBundle("chunk-62950a0c.js", ["exports"], function (n) { function e(n) { return n ? (Array.isArray(n) ? n : n.split(" ")).filter(function (n) { return null != n; }).map(function (n) { return n.trim(); }).filter(function (n) { return "" !== n; }) : []; } window.Ionic.h, n.createThemedClasses = function (n, t, r) { var o = {}; return e(r).forEach(function (e) { o[e] = !0, n && (o[e + "-" + n] = !0, t && (o[e + "-" + t] = !0, o[e + "-" + n + "-" + t] = !0)); }), o; }, n.getClassMap = function (n) { var t = {}; return e(n).forEach(function (n) { return t[n] = !0; }), t; }, n.openURL = function (n, e, t, r) {
    return __awaiter(this, void 0, void 0, function () { var o; return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(e && "#" !== e[0] && -1 === e.indexOf("://"))) return [3 /*break*/, 2];
                o = n.document.querySelector("ion-router");
                if (!o) return [3 /*break*/, 2];
                t && t.preventDefault();
                return [4 /*yield*/, o.componentOnReady()];
            case 1: return [2 /*return*/, (_a.sent(), o.push(e, r))];
            case 2: return [2 /*return*/, Promise.resolve()];
        }
    }); });
}, n.getElementClassMap = function (n) { var e = {}; for (var t = 0; t < n.length; t++)
    e[n[t]] = !0; return e; }, n.getButtonClassMap = function (n, e) { return n ? (_a = {}, _a[n] = !0, _a[n + "-" + e] = !0, _a) : {}; var _a; }; });
