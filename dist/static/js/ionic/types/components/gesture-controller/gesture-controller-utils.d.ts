export declare class GestureDelegate {
    private id;
    private name;
    private priority;
    private disableScroll;
    private ctrl?;
    constructor(ctrl: any, id: number, name: string, priority: number, disableScroll: boolean);
    canStart(): boolean;
    start(): boolean;
    capture(): boolean;
    release(): void;
    destroy(): void;
}
export declare class BlockerDelegate {
    private id;
    private disable;
    private disableScroll;
    private ctrl?;
    constructor(id: number, ctrl: any, disable: string[] | undefined, disableScroll: boolean);
    block(): void;
    unblock(): void;
    destroy(): void;
}
