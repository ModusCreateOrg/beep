export declare function isIpad(win: Window): boolean;
export declare function isIphone(win: Window): boolean;
export declare function isIOS(win: Window): boolean;
export declare function isAndroid(win: Window): boolean;
export declare function isPhablet(win: Window): boolean;
export declare function isTablet(win: Window): boolean;
export declare function isDevice(win: Window): boolean;
export declare function isHybrid(win: Window): boolean;
export declare function isCordova(window: Window): boolean;
export declare function isCapacitorNative(window: Window): boolean;
export declare function isElectron(win: Window): boolean;
export declare function needInputShims(win: Window): boolean;
export declare function testUserAgent(win: Window, expr: RegExp): boolean;
export declare function matchMedia(win: Window, query: string, fallback?: boolean): boolean;
export interface PlatformConfig {
    name: string;
    isMatch: (win: Window) => boolean;
}
export declare const PLATFORM_CONFIGS: PlatformConfig[];
export declare function detectPlatforms(win: Window, platforms?: PlatformConfig[]): PlatformConfig[];
