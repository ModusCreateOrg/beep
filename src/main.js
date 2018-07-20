import Vue from 'vue'
import Router from '@modus/ion-router-vue'
import IonicAPI from './ionic-api'
import Home from './Home.vue'
import Acc from './Acc.vue'
import Pwd from './Pwd.vue'

Vue.use(Router)
Vue.use(IonicAPI)

new Vue({
  el: '#app',
  data() {
    return {
      route: Home
    }
  },
  render(h) {
    return h(this.route)
  }
  // router: new Router({
    // routes: [
      // { path: '/', component: Home },
      // { path: '/acc', component: Acc },
      // { path: '/pwd', component: Pwd },
    // ],
  // }),
})//.$mount('ion-app')

