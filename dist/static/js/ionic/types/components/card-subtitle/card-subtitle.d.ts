import { Color, Mode } from '../../interface';
export declare class CardSubtitle {
    /**
     * The color to use for the text color.
     * Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`.
     */
    color?: Color;
    /**
     * The mode determines which platform styles to use.
     * Possible values are: `"ios"` or `"md"`.
     */
    mode: Mode;
    hostData(): {
        'role': string;
        'aria-level': string;
    };
}
