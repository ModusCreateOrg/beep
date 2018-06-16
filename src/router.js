import VueRouter from 'vue-router'
import IonVueRouter from './IonVueRouter'

console.log(VueRouter)

export default class Router extends VueRouter {
    constructor(...args) {
        super(...args)
    }
}

Router.install = function(Vue) {
    VueRouter.install(Vue)
    Vue.component('ion-vue-router', IonVueRouter)
}
