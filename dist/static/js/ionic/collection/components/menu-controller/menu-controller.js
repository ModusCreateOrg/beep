import { menuOverlayAnimation } from './animations/overlay';
import { menuPushAnimation } from './animations/push';
import { menuRevealAnimation } from './animations/reveal';
export class MenuController {
    constructor() {
        this.menus = [];
        this.menuAnimations = new Map();
        this.registerAnimation('reveal', menuRevealAnimation);
        this.registerAnimation('push', menuPushAnimation);
        this.registerAnimation('overlay', menuOverlayAnimation);
    }
    /**
     * Programatically open the Menu.
     * @param {string} [menuId]  Optionally get the menu by its id, or side.
     * @return {Promise} returns a promise when the menu is fully opened
     */
    open(menuId) {
        const menu = this.get(menuId);
        if (menu) {
            return menu.open();
        }
        return Promise.resolve(false);
    }
    /**
     * Programatically close the Menu. If no `menuId` is given as the first
     * argument then it'll close any menu which is open. If a `menuId`
     * is given then it'll close that exact menu.
     * @param {string} [menuId]  Optionally get the menu by its id, or side.
     * @return {Promise} returns a promise when the menu is fully closed
     */
    close(menuId) {
        const menu = (menuId)
            ? this.get(menuId)
            : this.getOpen();
        if (menu) {
            return menu.close();
        }
        return Promise.resolve(false);
    }
    /**
     * Toggle the menu. If it's closed, it will open, and if opened, it
     * will close.
     * @param {string} [menuId]  Optionally get the menu by its id, or side.
     * @return {Promise} returns a promise when the menu has been toggled
     */
    toggle(menuId) {
        const menu = this.get(menuId);
        if (menu) {
            return menu.toggle();
        }
        return Promise.resolve(false);
    }
    /**
     * Used to enable or disable a menu. For example, there could be multiple
     * left menus, but only one of them should be able to be opened at the same
     * time. If there are multiple menus on the same side, then enabling one menu
     * will also automatically disable all the others that are on the same side.
     * @param {string} [menuId]  Optionally get the menu by its id, or side.
     * @return {HTMLIonMenuElement}  Returns the instance of the menu, which is useful for chaining.
     */
    enable(shouldEnable, menuId) {
        const menu = this.get(menuId);
        if (menu) {
            menu.disabled = !shouldEnable;
        }
        return menu;
    }
    /**
     * Used to enable or disable the ability to swipe open the menu.
     * @param {boolean} shouldEnable  True if it should be swipe-able, false if not.
     * @param {string} [menuId]  Optionally get the menu by its id, or side.
     * @return {HTMLIonMenuElement}  Returns the instance of the menu, which is useful for chaining.
     */
    swipeEnable(shouldEnable, menuId) {
        const menu = this.get(menuId);
        if (menu) {
            menu.swipeEnabled = shouldEnable;
        }
        return menu;
    }
    /**
     * @param {string} [menuId] Optionally get the menu by its id, or side.
     * @return {boolean} Returns true if the specified menu is currently open, otherwise false.
     * If the menuId is not specified, it returns true if ANY menu is currenly open.
     */
    isOpen(menuId) {
        if (menuId) {
            const menu = this.get(menuId);
            return menu && menu.isOpen() || false;
        }
        return !!this.getOpen();
    }
    /**
     * @param {string} [menuId]  Optionally get the menu by its id, or side.
     * @return {boolean} Returns true if the menu is currently enabled, otherwise false.
     */
    isEnabled(menuId) {
        const menu = this.get(menuId);
        if (menu) {
            return !menu.disabled;
        }
        return false;
    }
    /**
     * Used to get a menu instance. If a `menuId` is not provided then it'll
     * return the first menu found. If a `menuId` is `left` or `right`, then
     * it'll return the enabled menu on that side. Otherwise, if a `menuId` is
     * provided, then it'll try to find the menu using the menu's `id`
     * property. If a menu is not found then it'll return `null`.
     * @param {string} [menuId]  Optionally get the menu by its id, or side.
     * @return {HTMLIonMenuElement} Returns the instance of the menu if found, otherwise `null`.
     */
    get(menuId) {
        if (menuId === 'left') {
            console.error('menu.side=left is deprecated, use "start" instead');
            return null;
        }
        if (menuId === 'right') {
            console.error('menu.side=right is deprecated, use "end" instead');
            return null;
        }
        if (menuId === 'start' || menuId === 'end') {
            // there could be more than one menu on the same side
            // so first try to get the enabled one
            const menu = this.find(m => m.side === menuId && !m.disabled);
            if (menu) {
                return menu;
            }
            // didn't find a menu side that is enabled
            // so try to get the first menu side found
            return this.find(m => m.side === menuId) || null;
        }
        else if (menuId) {
            // the menuId was not left or right
            // so try to get the menu by its "id"
            return this.find(m => m.menuId === menuId) || null;
        }
        // return the first enabled menu
        const menu = this.find(m => !m.disabled);
        if (menu) {
            return menu;
        }
        // get the first menu in the array, if one exists
        return (this.menus.length > 0 ? this.menus[0].el : null);
    }
    /**
     * @return {Menu} Returns the instance of the menu already opened, otherwise `null`.
     */
    getOpen() {
        return this.find(m => m.isOpen());
    }
    /**
     * @return {Array<HTMLIonMenuElement>}  Returns an array of all menu instances.
     */
    getMenus() {
        return this.menus.map(menu => menu.el);
    }
    /**
     * @hidden
     * @return {boolean} if any menu is currently animating
     */
    isAnimating() {
        return this.menus.some(menu => menu.isAnimating);
    }
    /**
     * @hidden
     */
    _register(menu) {
        if (this.menus.indexOf(menu) < 0) {
            this.menus.push(menu);
        }
    }
    /**
     * @hidden
     */
    _unregister(menu) {
        const index = this.menus.indexOf(menu);
        if (index > -1) {
            this.menus.splice(index, 1);
        }
    }
    /**
     * @hidden
     */
    _setActiveMenu(menu) {
        // if this menu should be enabled
        // then find all the other menus on this same side
        // and automatically disable other same side menus
        const side = menu.side;
        this.menus
            .filter(m => m.side === side && m !== menu)
            .forEach(m => m.disabled = true);
    }
    /**
     * @hidden
     */
    _setOpen(menu, shouldOpen, animated) {
        if (this.isAnimating()) {
            return Promise.resolve(false);
        }
        if (shouldOpen) {
            const openedMenu = this.getOpen();
            if (openedMenu && menu.el !== openedMenu) {
                openedMenu.setOpen(false, false);
            }
        }
        return menu._setOpen(shouldOpen, animated);
    }
    /**
     * @hidden
     */
    createAnimation(type, menuCmp) {
        const animationBuilder = this.menuAnimations.get(type);
        if (!animationBuilder) {
            return Promise.reject('animation not registered');
        }
        return this.animationCtrl.create(animationBuilder, null, menuCmp);
    }
    registerAnimation(name, animation) {
        this.menuAnimations.set(name, animation);
    }
    find(predicate) {
        const instance = this.menus.find(predicate);
        if (instance) {
            return instance.el;
        }
        return null;
    }
    static get is() { return "ion-menu-controller"; }
    static get properties() { return {
        "_register": {
            "method": true
        },
        "_setActiveMenu": {
            "method": true
        },
        "_setOpen": {
            "method": true
        },
        "_unregister": {
            "method": true
        },
        "animationCtrl": {
            "connect": "ion-animation-controller"
        },
        "close": {
            "method": true
        },
        "createAnimation": {
            "method": true
        },
        "enable": {
            "method": true
        },
        "get": {
            "method": true
        },
        "getMenus": {
            "method": true
        },
        "getOpen": {
            "method": true
        },
        "isAnimating": {
            "method": true
        },
        "isEnabled": {
            "method": true
        },
        "isOpen": {
            "method": true
        },
        "open": {
            "method": true
        },
        "registerAnimation": {
            "method": true
        },
        "swipeEnable": {
            "method": true
        },
        "toggle": {
            "method": true
        }
    }; }
}
export { menuOverlayAnimation, menuPushAnimation, menuRevealAnimation };
