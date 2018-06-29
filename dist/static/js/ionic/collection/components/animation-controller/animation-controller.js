import { Animator } from './animator';
export class AnimationControllerImpl {
    create(animationBuilder, baseEl, opts) {
        if (animationBuilder) {
            return animationBuilder(Animator, baseEl, opts);
        }
        return Promise.resolve(new Animator());
    }
    static get is() { return "ion-animation-controller"; }
    static get properties() { return {
        "create": {
            "method": true
        }
    }; }
}
