/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.loadBundle("chunk-575b79b0.js", ["exports"], function (n) { function i(n) { return r(n, /iPad|iPhone|iPod/i); } function t(n) { return o(n, "(any-pointer:coarse)"); } function e(n) { var i = n; return !!(i.cordova || i.phonegap || i.PhoneGap); } function r(n, i) { return i.test(n.navigator.userAgent); } function o(n, i, t) {
    if (t === void 0) { t = !1; }
    return n.matchMedia ? n.matchMedia(i).matches : t;
} window.Ionic.h, n.isAndroid = function (n) { return !i(n); }, n.isCordova = e, n.isElectron = function (n) { return r(n, /electron/); }, n.isIOS = i, n.isIpad = function (n) { return r(n, /iPad/i); }, n.isIphone = function (n) { return r(n, /iPhone/i); }, n.isPhablet = function (n) { var i = n.innerWidth, t = n.innerHeight, e = Math.min(i, t), r = Math.max(i, t); return e > 390 && e < 520 && r > 620 && r < 800; }, n.isTablet = function (n) { var i = n.innerWidth, t = n.innerHeight, e = Math.min(i, t), r = Math.max(i, t); return e > 460 && e < 820 && r > 780 && r < 1400; }, n.matchMedia = o, n.isDevice = t, n.isHybrid = function (n) { return e(n) || function (i) { var t = n.Capacitor; return !(!t || !t.isNative); }(); }, n.needInputShims = function (n) { return i(n) && t(n); }; });
