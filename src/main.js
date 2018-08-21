import Vue from 'vue'
import '@ionic/core/css/ionic.css'
import './theme/common.css'
import { IonicAPI } from '@modus/ionic-vue'
import router from './router'
import helpers from './helpers'
import './registerServiceWorker'
import BreachService from './breachesService'

import { Plugins, StatusBarStyle } from '@capacitor/core'
const { SplashScreen, StatusBar, Device } = Plugins

Vue.config.productionTip = false

Vue.use(IonicAPI)

Vue.prototype.$device = {}
Vue.prototype.$isIOS = false
Vue.prototype.$env = helpers.env
Vue.prototype.$breachesService = BreachService

Device.getInfo()
  .then(result => {
    const isIOS = result.platform === 'ios'

    Vue.prototype.$device = result
    Vue.prototype.$isIOS = isIOS

    StatusBar.setStyle({ style: isIOS ? StatusBarStyle.Light : StatusBarStyle.Dark })
    StatusBar.setBackgroundColor({ color: helpers.env('INITIAL_STATUSBAR_COLOR') })
    return
  })
  .catch(e => console.error(e))

new Vue({
  router,
  mounted() {
    SplashScreen.hide()
  },
}).$mount('#app')
