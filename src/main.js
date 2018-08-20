import Vue from 'vue'
import '@ionic/core/css/ionic.css'
import './theme/common.css'
import { IonicAPI } from '@modus/ionic-vue'
import router from './router'
import './registerServiceWorker'
import BreachService from './breachesService'

import { Plugins, StatusBarStyle } from '@capacitor/core'
const { SplashScreen, StatusBar } = Plugins

Vue.config.productionTip = false

Vue.use(IonicAPI)

Vue.prototype.$breachesService = BreachService
Vue.prototype.$env = constant => {
  return process.env[`VUE_APP_${constant}`]
}

new Vue({
  router,
  mounted() {
    SplashScreen.hide()
    StatusBar.setStyle({ style: StatusBarStyle.Light })
    StatusBar.setBackgroundColor({ color: this.$env('INITIAL_STATUSBAR_COLOR') })
  },
}).$mount('#app')
