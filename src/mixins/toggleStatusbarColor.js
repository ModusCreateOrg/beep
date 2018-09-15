import { Plugins, StatusBarStyle } from '@capacitor/core'
const { StatusBar } = Plugins
const metaSelectors = ['meta[name="theme-color"]', 'meta[name="msapplication-TileColor"]']

export default {
  data() {
    return {
      initialStatusbarColor: this.$helpers.env('INITIAL_STATUSBAR_COLOR'),
      newStatusbarColor: '',
    }
  },
  mounted() {
    for (const selector of metaSelectors) {
      document.querySelector(selector).content = this.newStatusbarColor
    }
    StatusBar.setBackgroundColor({ color: this.newStatusbarColor }).catch(this.$helpers.err)
    StatusBar.setStyle({ style: StatusBarStyle.Dark }).catch(this.$helpers.err)
  },
  beforeRouteLeave(to, from, next) {
    for (const selector of metaSelectors) {
      document.querySelector(selector).content = this.initialStatusbarColor
    }
    StatusBar.setBackgroundColor({ color: this.initialStatusbarColor }).catch(this.$helpers.err)
    StatusBar.setStyle({ style: StatusBarStyle.Light }).catch(this.$helpers.err)
    next()
  },
}
