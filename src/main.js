import Vue from 'vue'
import Router from '@modus/ion-router-vue'
import IonicAPI from './ionic-api'
import Home from './Home.vue'
import Acc from './Acc.vue'
import Safe from './Safe.vue'
import Pwd from './Pwd.vue'
import Unsafe from './Unsafe.vue'

Vue.use(Router)
Vue.use(IonicAPI)

new Vue({
  router: new Router({
    routes: [
      { path: '/', component: Home },
      { path: '/acc', component: Acc },
      { path: '/pwd', component: Pwd },
      { path: '/unsafe', component: Unsafe },
      {
        path: '/safe',
        component: Safe,
        props: (route) => ({account: route.query.account})
      },
    ],
  }),
}).$mount('ion-app')
