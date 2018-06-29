import { Color, Mode } from '../../interface';
export declare class CardHeader {
    /**
     * The color to use for the background.
     * Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`.
     */
    color?: Color;
    /**
     * The mode determines which platform styles to use.
     * Possible values are: `"ios"` or `"md"`.
     */
    mode: Mode;
    /**
     * If true, the card header will be translucent. Defaults to `false`.
     */
    translucent: boolean;
    hostData(): {
        class: {
            [x: string]: boolean;
        };
    };
}
