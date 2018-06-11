import Vue from 'vue'
import Home from './Home.vue'
import Acc from './Acc.vue'
import api from './api'


const glob = {
    api: api,
    nav: api.newNavController(Home).then(e => glob.nav = e),
}

glob.install = function () {
    Object.defineProperty(Vue.prototype, '$glob', {
        get() { return glob }
    })
}

Vue.use(glob)
Vue.config.ignoredElements = [/^ion-/]
