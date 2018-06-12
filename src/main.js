import Vue from 'vue'
import Home from './Home.vue'
import mixins from './mixins'
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
