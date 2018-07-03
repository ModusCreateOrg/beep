import '../../stencil.core';
import { Config } from '../../interface';
export declare class MenuButton {
    config: Config;
    /**
     * Optional property that maps to a Menu's `menuId` prop. Can also be `left` or `right` for the menu side. This is used to find the correct menu to toggle
     */
    menu?: string;
    /**
     * Automatically hides the menu button when the corresponding menu is not active
     */
    autoHide: boolean;
    render(): JSX.Element;
}
