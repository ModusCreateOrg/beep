import VueRouter from 'vue-router'


export default class Router extends VueRouter {
    constructor(...args) {
        super(...args)
    }
}

Router.install = function (Vue) {
    VueRouter.install(Vue)

    Vue.component('IonRouterView', {
        name: 'IonRouterView',
        data() {
            return {
                views: 0,
                animated: true,
                enteringEl: null,
            }
        },
        methods: {
            beforeEnter(enteringEl) {
                enteringEl.style.opacity = 0
                this.enteringEl = enteringEl
            },
            beforeLeave(leavingEl) {
                leavingEl.style.opacity = 0
                this.transition(this.enteringEl, leavingEl, 1)
                this.views++
            },
            canGoBack() {
                return this.views > 0 && this.$router.currentRoute.path.length > 1
            },
            async transition(enteringEl, leavingEl, direction) {
                const containerEl = document.querySelector('ion-router-outlet')

                if (!enteringEl || enteringEl === leavingEl) {
                    return
                }

                await containerEl.componentOnReady()
                await containerEl.commit(enteringEl, leavingEl, {
                    duration: !this.animated ? 0 : undefined,
                    direction: direction === 1 ? 'forward' : 'back',
                    deepWait: true,
                    showGoBack: this.canGoBack(),
                })
            },
        },
        template: `<ion-router-outlet>
            <transition v-bind:css="false" v-on:before-enter="beforeEnter" v-on:before-leave="beforeLeave">
                <router-view></router-view>
            </transition>
        </ion-router-outlet>`
    })

}
