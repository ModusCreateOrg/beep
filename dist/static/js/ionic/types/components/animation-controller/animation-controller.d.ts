import { Animation, AnimationBuilder, AnimationController } from '../../interface';
export declare class AnimationControllerImpl implements AnimationController {
    create(animationBuilder?: AnimationBuilder, baseEl?: any, opts?: any): Promise<Animation>;
}
