import Vue from 'vue'
import './theme/common.css'
import { Ionic, IonicAPI } from '@modus/ionic-vue'
import router from './router'
import './registerServiceWorker'
import BreachService from './breachesService'

Ionic.init({ resourcesUrl: 'img/' })
Vue.use(IonicAPI)

Vue.config.productionTip = false

Vue.prototype.$breachesService = BreachService

new Vue({
  router,
}).$mount('#app')
