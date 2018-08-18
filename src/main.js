import Vue from 'vue'
import '@ionic/core/css/ionic.css'
import './theme/common.css'
import { IonicAPI } from '@modus/ionic-vue'
import router from './router'
import './registerServiceWorker'
import BreachService from './breachesService'

import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;

Vue.config.productionTip = false

Vue.use(IonicAPI)

Vue.prototype.$breachesService = BreachService

new Vue({
  router,
  mounted() {
    SplashScreen.hide();
  }
}).$mount('#app')
