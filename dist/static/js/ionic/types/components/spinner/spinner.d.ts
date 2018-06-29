import { Color, Config, Mode } from '../../interface';
export declare class Spinner {
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
     * Duration of the spinner animation in milliseconds. The default varies based on the spinner.
     */
    duration?: number;
    /**
     * The name of the SVG spinner to use. If a name is not provided, the platform's default
     * spinner will be used. Possible values are: `"lines"`, `"lines-small"`, `"dots"`, `"bubbles"`,
     * `"circles"`, `"crescent"`.
     */
    name?: string;
    /**
     * If true, the spinner's animation will be paused. Defaults to `false`.
     */
    paused: boolean;
    private getName();
    hostData(): {
        class: {
            'spinner-paused': boolean;
        };
    };
    render(): any[];
}
