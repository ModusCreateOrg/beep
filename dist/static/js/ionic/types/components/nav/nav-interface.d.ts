import { Animation, AnimationBuilder, ComponentRef, FrameworkDelegate, Mode } from '../../interface';
import { ViewController } from './view-controller';
export { Nav } from './nav';
export declare type NavDirection = 'back' | 'forward';
export declare type NavComponent = ComponentRef | ViewController;
export interface NavResult {
    hasCompleted: boolean;
    requiresTransition: boolean;
    enteringView?: ViewController;
    leavingView?: ViewController;
    direction?: NavDirection;
}
export interface RouterOutletOptions {
    animated?: boolean;
    animationBuilder?: AnimationBuilder;
    duration?: number;
    easing?: string;
    showGoBack?: boolean;
    direction?: NavDirection;
    deepWait?: boolean;
    mode?: Mode;
    keyboardClose?: boolean;
}
export interface NavOptions extends RouterOutletOptions {
    progressAnimation?: boolean;
    updateURL?: boolean;
    delegate?: FrameworkDelegate;
    viewIsReady?: (enteringEl: HTMLElement) => Promise<any>;
}
export interface Page extends Function {
    new (...args: any[]): any;
}
export interface TransitionResolveFn {
    (hasCompleted: boolean, requiresTransition: boolean, enteringName?: string, leavingName?: string, direction?: string): void;
}
export interface TransitionRejectFn {
    (rejectReason: any, transition?: Animation): void;
}
export interface TransitionDoneFn {
    (hasCompleted: boolean, requiresTransition: boolean, enteringView?: ViewController, leavingView?: ViewController, direction?: string): void;
}
export interface TransitionInstruction {
    opts: NavOptions | undefined | null;
    insertStart?: number;
    insertViews?: any[];
    removeView?: ViewController;
    removeStart?: number;
    removeCount?: number;
    resolve?: (hasCompleted: boolean) => void;
    reject?: (rejectReason: string) => void;
    done?: TransitionDoneFn;
    leavingRequiresTransition?: boolean;
    enteringRequiresTransition?: boolean;
}
