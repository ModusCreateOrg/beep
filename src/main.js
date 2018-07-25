import Vue from 'vue'
import { IonicVueRouter, IonicAPI } from '@modus/ionic-vue'
import Home from './Home.vue'
import Acc from './Acc.vue'
import Pwd from './Pwd.vue'

Vue.use(IonicVueRouter)
Vue.use(IonicAPI)

new Vue({
  router: new IonicVueRouter({
    routes: [
      { path: '/', component: Home },
      { path: '/acc', component: Acc },
      { path: '/pwd', component: Pwd },
    ],
  }),
}).$mount('ion-app')
