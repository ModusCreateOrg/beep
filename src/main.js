import Vue from 'vue'
import '@ionic/core/css/ionic.css'
import './theme/common.css'
import { IonicAPI } from '@modus/ionic-vue'
import router from './router'
import './registerServiceWorker'
import BreachService from './breachesService'

Vue.config.productionTip = false

Vue.use(IonicAPI)

Vue.prototype.$breachesService = BreachService

new Vue({
  router,
}).$mount('#app')
