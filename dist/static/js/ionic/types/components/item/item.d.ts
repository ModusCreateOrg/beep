import '../../stencil.core';
import { Color, Mode, RouterDirection } from '../../interface';
export declare class Item {
    private itemStyles;
    el: HTMLStencilElement;
    win: Window;
    /**
     * The color to use from your Sass `$colors` map.
     * Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`.
     * For more information, see [Theming your App](/docs/theming/theming-your-app).
     */
    color?: Color;
    /**
     * The mode determines which platform styles to use.
     * Possible values are: `"ios"` or `"md"`.
     * For more information, see [Platform Styles](/docs/theming/platform-specific-styles).
     */
    mode: Mode;
    /**
     * If true, a button tag will be rendered and the item will be tappable. Defaults to `false`.
     */
    button: boolean;
    /**
     * If true, a detail arrow will appear on the item. Defaults to `false` unless the `mode`
     * is `ios` and an `href`, `onclick` or `button` property is present.
     */
    detail?: boolean;
    /**
     * If true, the user cannot interact with the item. Defaults to `false`.
     */
    disabled: boolean;
    /**
     * Contains a URL or a URL fragment that the hyperlink points to.
     * If this property is set, an anchor tag will be rendered.
     */
    href?: string;
    /**
     * How the bottom border should be displayed on the item.
     */
    lines?: 'full' | 'inset' | 'none';
    /**
     * When using a router, it specifies the transition direction when navigating to
     * another page using `href`.
     */
    routerDirection?: RouterDirection;
    itemStyle(ev: UIEvent): void;
    componentDidLoad(): void;
    render(): JSX.Element;
}
