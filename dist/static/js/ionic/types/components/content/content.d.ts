import '../../stencil.core';
import { Color, Config, Mode, QueueController } from '../../interface';
export declare class Content {
    private cTop;
    private cBottom;
    private dirty;
    private scrollEl?;
    mode: Mode;
    color?: Color;
    el: HTMLElement;
    config: Config;
    queue: QueueController;
    /**
     * If true, the content will scroll behind the headers
     * and footers. This effect can easily be seen by setting the toolbar
     * to transparent.
     */
    fullscreen: boolean;
    /**
     * If true and the content does not cause an overflow scroll, the scroll interaction will cause a bounce.
     * If the content exceeds the bounds of ionContent, nothing will change.
     * Note, the does not disable the system bounce on iOS. That is an OS level setting.
     */
    forceOverscroll?: boolean;
    scrollEnabled: boolean;
    scrollEvents: boolean;
    onNavChanged(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    /**
     * Scroll to the top of the content component.
     *
     * Duration of the scroll animation in milliseconds. Defaults to `300`.
     * Returns a promise which is resolved when the scroll has completed.
     */
    scrollToTop(duration?: number): Promise<void>;
    /**
     * Scroll to the bottom of the content component.
     *
     * Duration of the scroll animation in milliseconds. Defaults to `300`.
     * Returns a promise which is resolved when the scroll has completed.
     */
    scrollToBottom(duration?: number): Promise<void>;
    scrollByPoint(x: number, y: number, duration: number, done?: Function): Promise<any>;
    scrollToPoint(x: number, y: number, duration: number, done?: Function): Promise<any>;
    private resize();
    private readDimensions();
    private writeDimensions();
    render(): JSX.Element[];
}
