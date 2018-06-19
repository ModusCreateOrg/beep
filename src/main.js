import Vue from 'vue'
import Home from './Home.vue'
import Acc from './Acc.vue'
import Pwd from './Pwd.vue'
import Router from './router'
import api from './api'
import {Delegate} from './framework-delegate'

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

// Option 1
// Extend `ion-router-outlet` with a Vue directive
// <ion-router-outlet v-vue-router></ion-router-outlet>
Vue.directive('vue-router', {
    inserted: async function(el) {
        await el.componentOnReady()
        el.delegate = Delegate
        el.setRoot(Home)
    }
})

// Option 2
// Render `ion-router-outlet` from Vue
Vue.component('home', Home)
Vue.component('VueRouterOutlet', {
    name: 'VueRouterOutlet',
    functional: true,
    render(_, { props, children, parent, data }) {
        console.log(parent)
        return _('ion-router-outlet', [_('home')])
    },
})

new Vue({
    router: new Router({
        routes: [
            // { path: '/', component: Home },
            { path: '/acc', component: Acc },
            { path: '/pwd', component: Pwd },
        ]
    }),
}).$mount('ion-app')
