import Vue from 'vue'
import Router from '@modus/ion-router-vue'
import IonicAPI from './ionic-api'
import Home from './Home.vue'
import Acc from './Acc.vue'
import Safe from './Safe.vue'
import Pwd from './Pwd.vue'
import Unsafe from './Unsafe.vue'
import Breaches from './Breaches.vue'
import Breach from './Breach.vue'
import BreachService from './breaches-service'

Vue.use(Router)
Vue.use(IonicAPI)

Vue.prototype.$breachesService = BreachService

new Vue({
  router: new Router({
    routes: [
      { path: '/', component: Home },
      { path: '/acc', component: Acc },
      { path: '/pwd', component: Pwd },
      { path: '/breaches', component: Breaches },
      {
        path: '/breaches/:name',
        component: Breach,
        props: (route) => ({breach_name: route.params.name})
      },
      {
        path: '/unsafe',
        component: Unsafe,
        props: (route) => ({count: route.query.count})
      },
      { path: '/safe', component: Safe },
    ],
  }),
}).$mount('ion-app')
