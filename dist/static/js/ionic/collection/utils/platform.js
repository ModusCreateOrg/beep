export function isIpad(win) {
    return testUserAgent(win, /iPad/i);
}
export function isIphone(win) {
    return testUserAgent(win, /iPhone/i);
}
export function isIOS(win) {
    return testUserAgent(win, /iPad|iPhone|iPod/i);
}
export function isAndroid(win) {
    return !isIOS(win);
}
export function isPhablet(win) {
    const width = win.innerWidth;
    const height = win.innerHeight;
    const smallest = Math.min(width, height);
    const largest = Math.max(width, height);
    return (smallest > 390 && smallest < 520) &&
        (largest > 620 && largest < 800);
}
export function isTablet(win) {
    const width = win.innerWidth;
    const height = win.innerHeight;
    const smallest = Math.min(width, height);
    const largest = Math.max(width, height);
    return (smallest > 460 && smallest < 820) &&
        (largest > 780 && largest < 1400);
}
export function isDevice(win) {
    return matchMedia(win, '(any-pointer:coarse)');
}
export function isHybrid(win) {
    return isCordova(win) || isCapacitorNative(win);
}
export function isCordova(window) {
    const win = window;
    return !!(win['cordova'] || win['phonegap'] || win['PhoneGap']);
}
export function isCapacitorNative(window) {
    const win = window;
    const capacitor = win['Capacitor'];
    return !!(capacitor && capacitor.isNative);
}
export function isElectron(win) {
    return testUserAgent(win, /electron/);
}
export function needInputShims(win) {
    return isIOS(win) && isDevice(win);
}
export function testUserAgent(win, expr) {
    return expr.test(win.navigator.userAgent);
}
export function matchMedia(win, query, fallback = false) {
    return win.matchMedia
        ? win.matchMedia(query).matches
        : fallback;
}
export const PLATFORM_CONFIGS = [
    {
        name: 'ipad',
        isMatch: isIpad
    },
    {
        name: 'iphone',
        isMatch: isIphone
    },
    {
        name: 'ios',
        isMatch: isIOS
    },
    {
        name: 'android',
        isMatch: isAndroid
    },
    {
        name: 'phablet',
        isMatch: isPhablet
    },
    {
        name: 'tablet',
        isMatch: isTablet
    },
    {
        name: 'cordova',
        isMatch: isCordova
    },
    {
        name: 'electron',
        isMatch: isElectron
    }
];
export function detectPlatforms(win, platforms = PLATFORM_CONFIGS) {
    // bracket notation to ensure they're not property renamed
    return platforms.filter(p => p.isMatch(win));
}
