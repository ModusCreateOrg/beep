import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
import { Color, Mode } from '../../interface';
export declare class SegmentButton {
    el: HTMLElement;
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
    /**
     * If true, the segment button is selected. Defaults to `false`.
     */
    checked: boolean;
    disabled: boolean;
    /**
     * Contains a URL or a URL fragment that the hyperlink points to.
     * If this property is set, an anchor tag will be rendered.
     */
    href?: string;
    /**
     * The value of the segment button.
     */
    value: string;
    /**
     * Emitted when the segment button is clicked.
     */
    ionSelect: EventEmitter<void>;
    checkedChanged(checked: boolean, prev: boolean): void;
    render(): JSX.Element[];
}
