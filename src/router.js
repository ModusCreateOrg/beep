import Vue from 'vue'
import { IonicVueRouter } from '@modus/ionic-vue'
import PageHome from './components/PageHome.vue'

Vue.use(IonicVueRouter)

export default new IonicVueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', component: PageHome },
    { path: '/acc', component: () => import('./components/PageCheckAccount.vue') },
    { path: '/pwd', component: () => import('./components/PageCheckPassword.vue') },
    { path: '/breaches', component: () => import('./components/PageBreaches.vue') },
    {
      path: '/breaches/:name',
      component: () => import('./components/PageBreach.vue'),
      props: route => ({ breachName: route.params.name }),
    },
    {
      path: '/unsafe',
      component: () => import('./components/PageUnsafe.vue'),
      props: route => ({ count: Number(route.query.count) }),
    },
    { path: '/safe', component: () => import('./components/PageSafe.vue') },
  ],
})
