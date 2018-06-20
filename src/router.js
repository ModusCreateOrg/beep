import VueRouter from 'vue-router'


export default class Router extends VueRouter {
    constructor(...args) {
        super(...args)
    }
}

Router.install = function (Vue) {
    VueRouter.install(Vue)
    const RouterView = Vue.component('router-view')

    Vue.component('ion-router-view', {
        name: 'IonRouterView',
        extends: RouterView,
        render(h, { props, children, parent, data }) {
            // Create @ionic/core router outlet
            const vNode= h('ion-router-outlet', [
                // Call to native router's render method
                RouterView.options.render(h, { props, children, parent, data })
            ])

            // ionic core's animation method
            /* transition(to, from, ...args) */

            // this renders to screen
            return vNode
        },
    })

    async function transition(enteringView, leavingView, direction, animated, showGoBack) {
        const enteringEl = enteringView ? enteringView.elm : undefined
        const leavingEl = leavingView ? leavingView.elm : undefined
        const containerEl = document.querySelector('ion-router-outlet')

        if (!enteringEl || enteringEl === leavingEl) {
            return
        }

        await containerEl.componentOnReady()
        await containerEl.commit(enteringEl, leavingEl, {
            duration: !animated ? 0 : undefined,
            direction: direction === 1 ? 'forward' : 'back',
            deepWait: true,
            showGoBack,
        })
    }
}
