import Vue from 'vue'
import Home from './Home.vue'
import Acc from './Acc.vue'
import Pwd from './Pwd.vue'
import Router from './router'
import api from './api'


const glob = {
    api,
}

glob.install = function () {
    Object.defineProperty(Vue.prototype, '$glob', {
        get() { return glob }
    })
}

Vue.use(glob)
Vue.use(Router)
Vue.config.ignoredElements = [/^ion-/]

new Vue({
    router: new Router({
        routes: [
            { path: '/', component: Home },
            { path: '/acc', component: Acc },
            { path: '/pwd', component: Pwd },
        ]
    }),
}).$mount('ion-app')
