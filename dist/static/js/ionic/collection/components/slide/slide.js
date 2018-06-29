export class Slide {
    hostData() {
        return {
            class: {
                'slide-zoom': true,
                'swiper-slide': true
            }
        };
    }
    static get is() { return "ion-slide"; }
    static get style() { return "/**style-placeholder:ion-slide:**/"; }
}
