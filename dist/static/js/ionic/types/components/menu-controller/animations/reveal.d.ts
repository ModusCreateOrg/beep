import { Animation, Menu } from '../../../interface';
/**
 * @hidden
 * Menu Reveal Type
 * The content slides over to reveal the menu underneath.
 * The menu itself, which is under the content, does not move.
 */
export declare function menuRevealAnimation(Animation: Animation, _: HTMLElement, menu: Menu): Promise<Animation>;
