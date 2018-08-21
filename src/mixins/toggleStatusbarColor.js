import { Plugins, StatusBarStyle } from '@capacitor/core'
import Vue from 'vue'
const { StatusBar } = Plugins
const metaSelectors = ['meta[name="theme-color"]', 'meta[name="msapplication-TileColor"]']

export default {
  data() {
    return {
      initialStatusbarColor: this.$env('INITIAL_STATUSBAR_COLOR'),
      newStatusbarColor: '',
    }
  },
  mounted() {
    for (const selector of metaSelectors) {
      document.querySelector(selector).content = this.newStatusbarColor
    }
    StatusBar.setStyle({
      style: Vue.prototype.$isIOS() ? StatusBarStyle.Dark : StatusBarStyle.Light,
    })
    StatusBar.setBackgroundColor({ color: this.newStatusbarColor })
  },
  beforeRouteLeave(to, from, next) {
    for (const selector of metaSelectors) {
      document.querySelector(selector).content = this.initialStatusbarColor
    }
    StatusBar.setStyle({
      style: Vue.prototype.$isIOS() ? StatusBarStyle.Light : StatusBarStyle.Dark,
    })
    StatusBar.setBackgroundColor({ color: this.initialStatusbarColor })
    next()
  },
}
