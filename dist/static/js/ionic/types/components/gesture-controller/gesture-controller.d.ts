import { EventEmitter } from '../../stencil.core';
import { BlockerConfig, GestureConfig } from '../../interface';
import { BlockerDelegate, GestureDelegate } from './gesture-controller-utils';
export declare class GestureController {
    private gestureId;
    private requestedStart;
    private disabledGestures;
    private disabledScroll;
    private capturedId;
    ionGestureCaptured: EventEmitter<string>;
    create(config: GestureConfig): Promise<GestureDelegate>;
    createBlocker(opts?: BlockerConfig): BlockerDelegate;
    start(gestureName: string, id: number, priority: number): boolean;
    capture(gestureName: string, id: number, priority: number): boolean;
    release(id: number): void;
    disableGesture(gestureName: string, id: number): void;
    enableGesture(gestureName: string, id: number): void;
    disableScroll(id: number): void;
    enableScroll(id: number): void;
    canStart(gestureName: string): boolean;
    isCaptured(): boolean;
    isScrollDisabled(): boolean;
    isDisabled(gestureName: string): boolean;
    private newID();
}
