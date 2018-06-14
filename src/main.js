import Vue from 'vue'
import Home from './Home.vue'
import Breach from './Breach.vue'
import api from './api'


const glob = {
    api,
    nav: api.newNavController(Home).then(e => glob.nav = e),
}

glob.install = function () {
    Object.defineProperty(Vue.prototype, '$glob', {
        get() { return glob }
    })
}

Vue.use(glob)
Vue.config.ignoredElements = [/^ion-/]
Vue.component('breach', Breach);

