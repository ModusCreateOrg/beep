import Vue from 'vue'
import Router from '@modus/ion-router-vue'
import IonicAPI from './ionic-api'
import Home from './Home.vue'
import Acc from './Acc.vue'
import AccSafe from './AccSafe.vue'
import Pwd from './Pwd.vue'

Vue.use(Router)
Vue.use(IonicAPI)

new Vue({
  router: new Router({
    routes: [
      { path: '/', component: Home },
      { path: '/acc', component: Acc },
      { path: '/pwd', component: Pwd },
      { path: '/acc-safe', component: AccSafe },
    ],
  }),
}).$mount('ion-app')
