import '../../stencil.core';
import { RouterDirection } from '../../interface';
export declare class Anchor {
    win: Window;
    /**
     * Contains a URL or a URL fragment that the hyperlink points to.
     * If this property is set, an anchor tag will be rendered.
     */
    href?: string;
    /**
     * When using a router, it specifies the transition direction when navigating to
     * another page using `href`.
     */
    routerDirection?: RouterDirection;
    render(): JSX.Element;
}
