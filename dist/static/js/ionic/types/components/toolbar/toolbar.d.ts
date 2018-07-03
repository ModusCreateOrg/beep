import '../../stencil.core';
import { Color, Config, Mode } from '../../interface';
export declare class Toolbar {
    config: Config;
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
     * If true, the toolbar will be translucent.
     * Note: In order to scroll content behind the toolbar, the `fullscreen`
     * attribute needs to be set on the content.
     * Defaults to `false`.
     */
    translucent: boolean;
    hostData(): {
        class: {
            [className: string]: boolean;
        };
    };
    render(): JSX.Element[];
}
