import Vue from 'vue'
import Ionic from '@modus/ionic-vue'
import router from './router'

// Capacitor
import { Capacitor, Plugins, StatusBarStyle } from '@capacitor/core'
const { SplashScreen, StatusBar, Network } = Plugins

// Helpers
import helpers from './helpers'
import BreachService from './breachesService'
import './registerServiceWorker'

// Ionic core styles and theming
import '@ionic/core/css/core.css'
import '@ionic/core/css/ionic.bundle.css'
import './theme/common.css'

// Disable tips
Vue.config.productionTip = false

// Use ionic/vue plugin
Vue.use(Ionic)

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

// Navigate back and forth through a swipe gesture
async function initNavGesture(app) {
  const gesture = await import('@ionic/core/dist/collection/utils/gesture')

  gesture
    .createGesture({
      el: document.body,
      gestureName: 'swipe',
      gesturePriority: 40,
      threshold: 10,
      queue: window.Ionic.queue,
      canStart: () => true,
      onStart: () => {},
      onMove: () => {},
      onEnd: ev => {
        const threshold = app.$root.$el.offsetWidth / 2
        if (Math.abs(ev.deltaX) > threshold) {
          app.$router.go(ev.deltaX > 0 ? -1 : 1)
        }
      },
    })
    .setDisabled(false)
}
