import VueRouter from 'vue-router'


export default class Router extends VueRouter {
    constructor(...args) {
        super(...args)
    }
}

Router.install = function(Vue) {
    VueRouter.install(Vue)
    const RouterView = Vue.component('router-view')

    Vue.component('ion-vue-router-view', RouterView.extend({
        name: 'IonVueRouterView',
        render(_, { props, children, parent, data }) {
            return RouterView.options.render(_, { props, children, parent, data })
        }
    }))
}
