import '../../stencil.core';
import { Color, Mode } from '../../interface';
export declare class FabButton {
    private inList;
    el: HTMLElement;
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
     * If true, the fab button will be show a close icon. Defaults to `false`.
     */
    activated: boolean;
    /**
     * If true, the user cannot interact with the fab button. Defaults to `false`.
     */
    disabled: boolean;
    /**
     * Contains a URL or a URL fragment that the hyperlink points to.
     * If this property is set, an anchor tag will be rendered.
     */
    href?: string;
    /**
     * If true, the fab button will be translucent. Defaults to `false`.
     */
    translucent: boolean;
    show: boolean;
    componentWillLoad(): void;
    /**
     * Get the classes for fab buttons in lists
     */
    private getFabClassMap();
    render(): JSX.Element;
}
