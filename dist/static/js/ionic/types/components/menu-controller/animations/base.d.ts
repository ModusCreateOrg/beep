import { Animation } from '../../../interface';
/**
 * baseAnimation
 * Base class which is extended by the various types. Each
 * type will provide their own animations for open and close
 * and registers itself with Menu.
 */
export declare function baseAnimation(Animation: Animation): Promise<Animation>;
