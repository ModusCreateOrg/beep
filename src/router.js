import Vue from 'vue'
import { IonicVueRouter } from '@modus/ionic-vue'
import PageHome from './views/PageHome.vue'

Vue.use(IonicVueRouter)

export default new IonicVueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', component: PageHome },
    { path: '/acc', component: () => import('./views/PageAcc.vue') },
    { path: '/pwd', component: () => import('./views/PagePwd.vue') },
    { path: '/breaches', component: () => import('./views/PageBreaches.vue') },
    {
      path: '/breaches/:name',
      component: () => import('./views/PageBreach.vue'),
      props: route => ({ breach_name: route.params.name }),
    },
    {
      path: '/unsafe',
      component: () => import('./views/PageUnsafe.vue'),
      props: route => ({ count: Number(route.query.count) }),
    },
    { path: '/safe', component: () => import('./views/PageSafe.vue') },
  ],
})
