import Vue from 'vue'
import Home from './Home.vue'
import Breach from './Breach.vue'
import api from './api'
import Router from './router'


const glob = {
    api,
    // nav: api.newNavController(Home).then(e => glob.nav = e),
}

glob.install = function () {
    Object.defineProperty(Vue.prototype, '$glob', {
        get() { return glob }
    })
}

Vue.use(glob)
Vue.use(Router)
Vue.config.ignoredElements = [/^ion-/]
Vue.component('breach', Breach)

new Vue({
    router: new Router({
        routes: [
            { path: '/', component: Home },
        ]
    })
}).$mount('ion-app')
