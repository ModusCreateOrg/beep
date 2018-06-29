import { Color, Mode } from '../../interface';
export declare class Header {
    mode: Mode;
    color?: Color;
    /**
     * If true, the header will be translucent.
     * Note: In order to scroll content behind the header, the `fullscreen`
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
