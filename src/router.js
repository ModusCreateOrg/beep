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
            return RouterView.options.render(_, { props, children, parent, data })
        },
        methods: {
            canGoBack(depth = 1) {
                this.stackCtrl.canGoBack(depth)
            },
            pop(depth = 1) {
                this.stackCtrl.pop(depth)
            }
        }
    })
}
