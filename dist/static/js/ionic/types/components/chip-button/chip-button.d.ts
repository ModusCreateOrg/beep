import '../../stencil.core';
import { Color, Mode } from '../../interface';
export declare class ChipButton {
    el: HTMLElement;
    /**
     * The color to use.
     * Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`.
     */
    color?: Color;
    /**
     * The mode determines which platform styles to use.
     * Possible values are: `"ios"` or `"md"`.
     */
    mode: Mode;
    /**
     * If true, the user cannot interact with the chip button. Defaults to `false`.
     */
    disabled: boolean;
    /**
     * Set to `"clear"` for a transparent button style.
     */
    fill?: string;
    /**
     * Contains a URL or a URL fragment that the hyperlink points to.
     * If this property is set, an anchor tag will be rendered.
     */
    href?: string;
    /**
     * Get the classes for the style
     * Chip buttons can only be clear or default (solid)
     */
    private getStyleClassMap(buttonType);
    render(): JSX.Element;
}
