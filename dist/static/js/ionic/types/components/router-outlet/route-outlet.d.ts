import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
import { AnimationBuilder, ComponentProps, ComponentRef, Config, FrameworkDelegate, Mode, NavOutlet, RouteID, RouteWrite, RouterOutletOptions } from '../../interface';
export declare class RouterOutlet implements NavOutlet {
    private isTransitioning;
    private activeEl;
    private activeComponent;
    mode: Mode;
    el: HTMLElement;
    config: Config;
    animationCtrl: HTMLIonAnimationControllerElement;
    win: Window;
    animated?: boolean;
    animationBuilder?: AnimationBuilder;
    delegate?: FrameworkDelegate;
    ionNavWillLoad: EventEmitter<void>;
    ionNavWillChange: EventEmitter<void>;
    ionNavDidChange: EventEmitter<void>;
    componentWillLoad(): void;
    componentDidUnload(): void;
    setRoot(component: ComponentRef, params?: ComponentProps, opts?: RouterOutletOptions): Promise<boolean>;
    commit(enteringEl: HTMLElement, leavingEl: HTMLElement | undefined, opts?: RouterOutletOptions): Promise<boolean>;
    setRouteId(id: string, params: any, direction: number): Promise<RouteWrite>;
    getRouteId(): RouteID | undefined;
    render(): JSX.Element[];
}
