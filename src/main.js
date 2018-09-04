import Vue from 'vue'
import './theme/common.css'
import { Ionic, IonicAPI } from '@modus/ionic-vue'
import router from './router'
import helpers from './helpers'
import './registerServiceWorker'
import BreachService from './breachesService'

import { Capacitor, Plugins, StatusBarStyle } from '@capacitor/core'
const { SplashScreen, StatusBar, Network } = Plugins

Vue.config.productionTip = false

// Initialize Ionic
Ionic.init()
Vue.use(IonicAPI)

// Initialize Capacitor
initCapacitor()

// Initialize helpers
Vue.prototype.$helpers = helpers
Vue.prototype.$breachesService = BreachService

new Vue({
  router,
  mounted() {
    SplashScreen.hide().catch(this.$helpers.err)
    StatusBar.setStyle({ style: this.isIOS ? StatusBarStyle.Light : StatusBarStyle.Dark }).catch(
      this.$helpers.err
    )
    StatusBar.setBackgroundColor({ color: helpers.env('INITIAL_STATUSBAR_COLOR') }).catch(
      this.$helpers.err
    )
  },
}).$mount('#app')

async function initCapacitor() {
  // Platform checks
  Vue.prototype.$isWeb = Capacitor.platform === 'web'
  Vue.prototype.$isIOS = Capacitor.platform === 'ios'

  // Set network checks
  Network.getStatus()
    .then(s => (Vue.prototype.$networkStatus = s))
    .catch(helpers.err)

  Network.addListener(
    'networkStatusChange',
    status => (Vue.prototype.$networkStatus = status)
  ).catch(helpers.err)
}
