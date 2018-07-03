import { EventEmitter } from '../../stencil.core';
import { Config, QueueController, RouterDirection, RouterEventDetail, RouterIntent } from '../../interface';
export declare class Router {
    private previousPath;
    private busy;
    private state;
    private lastState;
    el: HTMLElement;
    config: Config;
    queue: QueueController;
    win: Window;
    /**
     * By default `ion-router` will match the routes at the root path ("/").
     * That can be changed when
     *
     * T
     */
    root: string;
    /**
     * The router can work in two "modes":
     * - With hash: `/index.html#/path/to/page`
     * - Without hash: `/path/to/page`
     *
     * Using one or another might depend in the requirements of your app and/or where it's deployed.
     *
     * Usually "hash-less" navigation works better for SEO and it's more user friendly too, but it might
     * requires aditional server-side configuration in order to properly work.
     *
     * On the otherside hash-navigation is much easier to deploy, it even works over the file protocol.
     *
     * By default, this property is `true`, change to `false` to allow hash-less URLs.
     */
    useHash: boolean;
    ionRouteWillChange: EventEmitter<RouterEventDetail>;
    ionRouteDidChange: EventEmitter<RouterEventDetail>;
    componentWillLoad(): Promise<void>;
    protected onPopState(): Promise<boolean>;
    push(url: string, direction?: RouterDirection): Promise<boolean>;
    printDebug(): void;
    navChanged(intent: RouterIntent): Promise<boolean>;
    private onRedirectChanged();
    private onRoutesChanged();
    private historyDirection();
    private writeNavStateRoot(path, intent);
    private writeNavState(node, chain, intent, path, redirectFrom, index?);
    private setPath(path, intent);
    private getPath();
    private routeChangeEvent(path, redirectFromPath);
}
