import '../../stencil.core';
import { Color, Mode } from '../../interface';
export declare class ItemOption {
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
     * If true, the user cannot interact with the item option. Defaults to `false`.
     */
    disabled: boolean;
    /**
     * If true, the option will expand to take up the available width and cover any other options. Defaults to `false`.
     */
    expandable: boolean;
    /**
     * Contains a URL or a URL fragment that the hyperlink points to.
     * If this property is set, an anchor tag will be rendered.
     */
    href?: string;
    private clickedOptionButton(ev);
    hostData(): {
        class: {
            'item-option-expandable': boolean;
        };
    };
    render(): JSX.Element;
}
