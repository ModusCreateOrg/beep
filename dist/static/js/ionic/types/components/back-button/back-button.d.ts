import '../../stencil.core';
import { Color, Config, Mode } from '../../interface';
export declare class BackButton {
    el: HTMLElement;
    config: Config;
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
     * The url to navigate back to by default when there is no history.
     */
    defaultHref?: string;
    /**
     * The icon name to use for the back button.
     */
    icon?: string;
    /**
     * The text to display in the back button.
     */
    text?: string;
    private onClick(ev);
    hostData(): {
        class: {
            'show-back-button': boolean;
        };
    };
    render(): JSX.Element;
}
