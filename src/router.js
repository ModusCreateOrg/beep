import Vue from 'vue'
import { IonicVueRouter } from '@modus/ionic-vue'
import Home from './views/Home.vue'
import Cnfg from './views/Cnfg.vue'
import Acc from './views/Acc.vue'
import Safe from './views/Safe.vue'
import Pwd from './views/Pwd.vue'
import Unsafe from './views/Unsafe.vue'
import Breaches from './views/Breaches.vue'
import Breach from './views/Breach.vue'

Vue.use(IonicVueRouter)

export default new IonicVueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', component: Home },
    { path: '/cnfg', component: Cnfg },
    { path: '/acc', component: Acc },
    { path: '/pwd', component: Pwd },
    { path: '/breaches', component: Breaches },
    {
      path: '/breaches/:name',
      component: Breach,
      props: route => ({ breach_name: route.params.name }),
    },
    {
      path: '/unsafe',
      component: Unsafe,
      props: route => ({ count: Number(route.query.count) }),
    },
    { path: '/safe', component: Safe },
  ],
})
