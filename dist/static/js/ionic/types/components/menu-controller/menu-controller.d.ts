import { Animation, AnimationBuilder, Menu } from '../../interface';
import { menuOverlayAnimation } from './animations/overlay';
import { menuPushAnimation } from './animations/push';
import { menuRevealAnimation } from './animations/reveal';
export declare class MenuController {
    private menus;
    private menuAnimations;
    animationCtrl: HTMLIonAnimationControllerElement;
    constructor();
    /**
     * Programatically open the Menu.
     * @param {string} [menuId]  Optionally get the menu by its id, or side.
     * @return {Promise} returns a promise when the menu is fully opened
     */
    open(menuId?: string): Promise<boolean>;
    /**
     * Programatically close the Menu. If no `menuId` is given as the first
     * argument then it'll close any menu which is open. If a `menuId`
     * is given then it'll close that exact menu.
     * @param {string} [menuId]  Optionally get the menu by its id, or side.
     * @return {Promise} returns a promise when the menu is fully closed
     */
    close(menuId?: string): Promise<boolean>;
    /**
     * Toggle the menu. If it's closed, it will open, and if opened, it
     * will close.
     * @param {string} [menuId]  Optionally get the menu by its id, or side.
     * @return {Promise} returns a promise when the menu has been toggled
     */
    toggle(menuId?: string): Promise<boolean>;
    /**
     * Used to enable or disable a menu. For example, there could be multiple
     * left menus, but only one of them should be able to be opened at the same
     * time. If there are multiple menus on the same side, then enabling one menu
     * will also automatically disable all the others that are on the same side.
     * @param {string} [menuId]  Optionally get the menu by its id, or side.
     * @return {HTMLIonMenuElement}  Returns the instance of the menu, which is useful for chaining.
     */
    enable(shouldEnable: boolean, menuId?: string): HTMLIonMenuElement | null;
    /**
     * Used to enable or disable the ability to swipe open the menu.
     * @param {boolean} shouldEnable  True if it should be swipe-able, false if not.
     * @param {string} [menuId]  Optionally get the menu by its id, or side.
     * @return {HTMLIonMenuElement}  Returns the instance of the menu, which is useful for chaining.
     */
    swipeEnable(shouldEnable: boolean, menuId?: string): HTMLIonMenuElement | null;
    /**
     * @param {string} [menuId] Optionally get the menu by its id, or side.
     * @return {boolean} Returns true if the specified menu is currently open, otherwise false.
     * If the menuId is not specified, it returns true if ANY menu is currenly open.
     */
    isOpen(menuId?: string): boolean;
    /**
     * @param {string} [menuId]  Optionally get the menu by its id, or side.
     * @return {boolean} Returns true if the menu is currently enabled, otherwise false.
     */
    isEnabled(menuId?: string): boolean;
    /**
     * Used to get a menu instance. If a `menuId` is not provided then it'll
     * return the first menu found. If a `menuId` is `left` or `right`, then
     * it'll return the enabled menu on that side. Otherwise, if a `menuId` is
     * provided, then it'll try to find the menu using the menu's `id`
     * property. If a menu is not found then it'll return `null`.
     * @param {string} [menuId]  Optionally get the menu by its id, or side.
     * @return {HTMLIonMenuElement} Returns the instance of the menu if found, otherwise `null`.
     */
    get(menuId?: string): HTMLIonMenuElement | null;
    /**
     * @return {Menu} Returns the instance of the menu already opened, otherwise `null`.
     */
    getOpen(): HTMLIonMenuElement | null;
    /**
     * @return {Array<HTMLIonMenuElement>}  Returns an array of all menu instances.
     */
    getMenus(): HTMLIonMenuElement[];
    /**
     * @hidden
     * @return {boolean} if any menu is currently animating
     */
    isAnimating(): boolean;
    /**
     * @hidden
     */
    _register(menu: Menu): void;
    /**
     * @hidden
     */
    _unregister(menu: Menu): void;
    /**
     * @hidden
     */
    _setActiveMenu(menu: Menu): void;
    /**
     * @hidden
     */
    _setOpen(menu: Menu, shouldOpen: boolean, animated: boolean): Promise<boolean>;
    /**
     * @hidden
     */
    createAnimation(type: string, menuCmp: Menu): Promise<Animation>;
    registerAnimation(name: string, animation: AnimationBuilder): void;
    private find(predicate);
}
export { menuOverlayAnimation, menuPushAnimation, menuRevealAnimation };
