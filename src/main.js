import Vue from 'vue'
import Home from './Home.vue'
import mixins from './mixins'
import {Delegate} from './framework-delegate'

const nav = document.querySelector('ion-nav')
const glob = { nav: nav }

glob.install = function () {
    Object.defineProperty(Vue.prototype, '$glob', {
        get() { return glob }
    })
}

Vue.use(glob)
Vue.config.ignoredElements = [/^ion-/]

// Init Ionic's NavController by setting the root (home) page
nav.componentOnReady()
    .then((obj) => {
        obj.delegate = Delegate
        obj.root = Home
    })
