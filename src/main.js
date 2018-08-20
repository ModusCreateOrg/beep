import Vue from 'vue'
import './theme/common.css'
import { Ionic, IonicAPI } from '@modus/ionic-vue'
import router from './router'
import './registerServiceWorker'
import BreachService from './breachesService'

import { Plugins, StatusBarStyle } from '@capacitor/core'
const { SplashScreen, StatusBar } = Plugins

Vue.config.productionTip = false

// Initialize Ionic with all resources pointing to the img/ dir in public/
Ionic.init({ resourcesUrl: 'img/' })
Vue.use(IonicAPI)

Vue.config.productionTip = false

Vue.prototype.$breachesService = BreachService
Vue.prototype.$env = constant => {
  return process.env[`VUE_APP_${constant}`]
}

new Vue({
  router,
  mounted() {
    SplashScreen.hide()
    StatusBar.setStyle({ style: StatusBarStyle.Dark })
    StatusBar.setBackgroundColor({ color: this.$env('INITIAL_STATUSBAR_COLOR') })
  },
}).$mount('#app')
