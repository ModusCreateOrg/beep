import Vue from 'vue'
import { IonicVueRouter } from '@modus/ionic-vue'
import Home from './views/Home.vue'

Vue.use(IonicVueRouter)

export default new IonicVueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', component: Home },
    { path: '/acc', component: () => import('./views/Acc.vue') },
    { path: '/pwd', component: () => import('./views/Pwd.vue') },
    { path: '/breaches', component: () => import('./views/Breaches.vue') },
    {
      path: '/breaches/:name',
      component: () => import('./views/Breach.vue'),
      props: route => ({ breach_name: route.params.name }),
    },
    {
      path: '/unsafe',
      component: () => import('./views/Unsafe.vue'),
      props: route => ({ count: Number(route.query.count) }),
    },
    { path: '/safe', component: () => import('./views/Safe.vue') },
  ],
})
