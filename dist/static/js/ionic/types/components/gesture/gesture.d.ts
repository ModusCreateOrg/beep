import { EventListenerEnable } from '../../stencil.core';
import { BlockerConfig, GestureCallback, GestureDetail, QueueController } from '../../interface';
export declare const BLOCK_ALL: BlockerConfig;
export declare class Gesture {
    private detail;
    private positions;
    private gesture?;
    private lastTouch;
    private pan;
    private hasCapturedPan;
    private hasStartedPan;
    private hasFiredStart;
    private isMoveQueued;
    private blocker?;
    gestureCtrl: HTMLIonGestureControllerElement;
    queue: QueueController;
    enableListener: EventListenerEnable;
    isServer: boolean;
    disabled: boolean;
    attachTo: string | HTMLElement;
    autoBlockAll: boolean;
    disableScroll: boolean;
    direction: string;
    gestureName: string;
    gesturePriority: number;
    passive: boolean;
    maxAngle: number;
    threshold: number;
    canStart?: GestureCallback;
    onWillStart?: (_: GestureDetail) => Promise<void>;
    onStart?: GestureCallback;
    onMove?: GestureCallback;
    onEnd?: GestureCallback;
    notCaptured?: GestureCallback;
    constructor();
    componentWillLoad(): Promise<void>;
    componentDidLoad(): void;
    componentDidUnload(): void;
    protected disabledChanged(isDisabled: boolean): void;
    onTouchStart(ev: TouchEvent): void;
    onMouseDown(ev: MouseEvent): void;
    private pointerDown(ev, timeStamp);
    onTouchMove(ev: TouchEvent): void;
    onMoveMove(ev: TouchEvent): void;
    private pointerMove(ev);
    private fireOnMove();
    private calcGestureData(ev);
    private tryToCapturePan();
    private fireOnStart();
    private abortGesture();
    private reset();
    onTouchCancel(ev: TouchEvent): void;
    onMouseUp(ev: TouchEvent): void;
    private pointerUp(ev);
    private enableMouse(shouldEnable);
    private enableTouch(shouldEnable);
    private enable(shouldEnable);
}
