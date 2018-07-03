import { Config, Mode } from '../interface';
export declare function updateTestResults(displayWhen: DisplayWhen): void;
export declare function isPlatformMatch(platforms: string[], multiPlatformString: string): boolean;
export declare function isModeMatch(config: Config, multiModeString: string): boolean;
export declare function isSizeMatch(win: Window, multiSizeString: string): boolean;
export declare function getTestResult(displayWhen: DisplayWhen): boolean;
export declare function isOrientationMatch(win: Window, orientation: string): boolean;
export declare function isPortrait(win: Window): boolean;
export declare const PLATFORM_CONFIGS: PlatformConfig[];
export interface PlatformConfig {
    name: string;
    isMatch: (win: Window) => boolean;
}
export declare function detectPlatforms(win: Window, platforms: PlatformConfig[]): PlatformConfig[];
export interface DisplayWhen {
    calculatedPlatforms: PlatformConfig[];
    config: Config;
    win: Window;
    mediaQuery?: string;
    mode: Mode;
    or: boolean;
    orientation?: string;
    passesTest: boolean;
    platform?: string;
    size?: string;
}
