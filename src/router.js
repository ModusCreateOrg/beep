import VueRouter from 'vue-router'
import IonRouterView from './IonRouterView.vue'


export default class Router extends VueRouter {
    constructor(...args) {
        super(...args)
    }
}

Router.install = function (Vue) {
    VueRouter.install(Vue)
    Vue.component('IonRouterView', IonRouterView)
}
