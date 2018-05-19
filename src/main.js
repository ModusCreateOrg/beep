import Vue from 'vue'
import Home from './Home.vue'
import mixins from './mixins'
import {Delegate} from './framework-delegate'

const glob = { nav: null }

glob.install = function () {
    Object.defineProperty(Vue.prototype, '$glob', {
        get() { return glob }
    })
}

Vue.use(glob)
Vue.config.ignoredElements = [/^ion-/]

const app = new Vue().$mount('#app')

document.querySelector('ion-nav')
    .componentOnReady()
    .then((nav) => {
        nav.delegate = Delegate
        nav.root = Home
        app.$glob.nav = nav
    })
