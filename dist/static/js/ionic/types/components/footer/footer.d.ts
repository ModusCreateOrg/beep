import { Color, Mode } from '../../interface';
export declare class Footer {
    mode: Mode;
    color?: Color;
    /**
     * If true, the footer will be translucent.
     * Note: In order to scroll content behind the footer, the `fullscreen`
     * attribute needs to be set on the content.
     * Defaults to `false`.
     */
    translucent: boolean;
    hostData(): {
        class: {
            [x: string]: boolean;
        };
    };
}
