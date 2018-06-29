import { CssClassMap, Mode, RouterDirection } from '../interface';
/**
 * Create the mode and color classes for the component based on the classes passed in
 */
export declare function createThemedClasses(mode: Mode | undefined, color: string | undefined, classes: string): CssClassMap;
/**
 * Get the classes from a class list and return them as an object
 */
export declare function getElementClassMap(classList: DOMTokenList | string[]): CssClassMap;
/**
 * Get the classes based on the button type
 * e.g. alert-button, action-sheet-button
 */
export declare function getButtonClassMap(buttonType: string | undefined, mode: Mode): CssClassMap;
export declare function getClassList(classes: string | string[] | undefined): string[];
export declare function getClassMap(classes: string | string[] | undefined): CssClassMap;
export declare function openURL(win: Window, url: string | undefined, ev: Event, direction?: RouterDirection): Promise<boolean | void>;
