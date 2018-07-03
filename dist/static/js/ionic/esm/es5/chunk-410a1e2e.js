function isIpad(i) { return testUserAgent(i, /iPad/i); }
function isIphone(i) { return testUserAgent(i, /iPhone/i); }
function isIOS(i) { return testUserAgent(i, /iPad|iPhone|iPod/i); }
function isAndroid(i) { return !isIOS(i); }
function isPhablet(i) { var t = i.innerWidth, n = i.innerHeight, e = Math.min(t, n), s = Math.max(t, n); return e > 390 && e < 520 && s > 620 && s < 800; }
function isTablet(i) { var t = i.innerWidth, n = i.innerHeight, e = Math.min(t, n), s = Math.max(t, n); return e > 460 && e < 820 && s > 780 && s < 1400; }
function isDevice(i) { return matchMedia(i, "(any-pointer:coarse)"); }
function isHybrid(i) { return isCordova(i) || isCapacitorNative(i); }
function isCordova(i) { var t = i; return !!(t.cordova || t.phonegap || t.PhoneGap); }
function isCapacitorNative(i) { var t = i.Capacitor; return !(!t || !t.isNative); }
function isElectron(i) { return testUserAgent(i, /electron/); }
function needInputShims(i) { return isIOS(i) && isDevice(i); }
function testUserAgent(i, t) { return t.test(i.navigator.userAgent); }
function matchMedia(i, t, n) {
    if (n === void 0) { n = !1; }
    return i.matchMedia ? i.matchMedia(t).matches : n;
}
export { isAndroid as a, isCordova as b, isElectron as c, isIOS as d, isIpad as e, isIphone as f, isPhablet as g, isTablet as h, matchMedia as i, isDevice as j, isHybrid as k, needInputShims as l };
