import Vue from 'vue'
import '@ionic/core'
import '@ionic/core/css/ionic.css'
import { IonicAPI } from '@modus/ionic-vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import BreachService from './breachesService'

Vue.config.productionTip = false

Vue.use(IonicAPI)

Vue.prototype.$breachesService = BreachService

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
