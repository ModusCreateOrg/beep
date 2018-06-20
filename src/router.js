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
        render(_, { props, children, parent, data }) {
            console.log(parent, 'router render')

            // call to native router's render method
            const vNode = RouterView.options.render(_, { props, children, parent, data })

            // wrap the above result in ionic core's outlet
            const vNode2= _('ion-router-outlet', [vNode])

            // ionic core's method
            transition(vNode2, cache[name], 1, true, true)

            // this renders to screen
            return vNode2
        },
    })

    // this is incomplete, at this point it was just yanked from Ionic's repo
    async function transition(enteringView, leavingView, direction, animated, showGoBack) {
        console.log('transition method called')

        const enteringEl = enteringView ? enteringView.element : undefined
        const leavingEl = leavingView ? leavingView.element : undefined
        const containerEl = document.querySelector('ion-router-outlet')//this.containerEl

        if (!enteringEl || enteringEl === leavingEl) {
            return
        }

        enteringEl.classList.add('ion-page', 'hide-page')
        containerEl.appendChild(enteringEl)

        await containerEl.componentOnReady()
        await containerEl.commit(enteringEl, leavingEl, {
            duration: !animated ? 0 : undefined,
            direction: direction === 1 ? 'forward' : 'back',
            deepWait: true,
            showGoBack,
        })
    }
}
