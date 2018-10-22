import Vue from 'vue'
import './theme/common.css'
import { Ionic, IonicAPI } from '@modus/ionic-vue'
import { defineCustomElements as initMDS } from '@modus/motherboard/dist/loader'
import router from './router'
import helpers from './helpers'
import './registerServiceWorker'
import BreachService from './breachesService'

import { Capacitor, Plugins, StatusBarStyle } from '@capacitor/core'
const { SplashScreen, StatusBar, Network } = Plugins

Vue.config.productionTip = false

// init Motherboard
Vue.config.ignoredElements = [/mds-\w*/]
initMDS(window)

// Initialize Ionic
Ionic.init()
Vue.use(IonicAPI)

// Initialize Capacitor
initCapacitor()

// Initialize helpers
Vue.prototype.$helpers = helpers
Vue.prototype.$breachesService = BreachService

// Create a Vue app instance
new Vue({
  router,
  mounted() {
    SplashScreen.hide().catch(this.$helpers.err)
    initNavGesture(this)
  },
}).$mount('#app')

// Initial Capacitor calls
async function initCapacitor() {
  // Platform checks
  Vue.prototype.$isWeb = Capacitor.platform === 'web'
  Vue.prototype.$isIOS = Capacitor.platform === 'ios'

  // Set status-bar background and style
  StatusBar.setBackgroundColor({ color: helpers.env('INITIAL_STATUSBAR_COLOR') }).catch(helpers.err)
  StatusBar.setStyle({ style: StatusBarStyle.Light }).catch(helpers.err)

  // Set network checks
  Network.getStatus()
    .then(s => (Vue.prototype.$networkStatus = s))
    .catch(helpers.err)

  // Listen to network changes
  Network.addListener('networkStatusChange', s => (Vue.prototype.$networkStatus = s)).catch(
    helpers.err
  )
}

// Navigate through a swipe gesture
async function initNavGesture(app) {
  const gesture = await import('@ionic/core/dist/collection/utils/gesture/gesture')

  gesture
    .createGesture({
      el: document,
      gestureName: 'swipe',
      gesturePriority: 40,
      threshold: 10,
      queue: window.Ionic.queue,
      canStart: () => true,
      onStart: () => {},
      onMove: () => {},
      onEnd: ev => {
        const threshold = app.$root.$el.offsetWidth / 2
        if (Math.abs(ev.deltaX) < threshold) {
          return
        }

        app.$router.go(ev.deltaX > 0 ? -1 : 1)
      },
    })
    .setDisabled(false)
}
