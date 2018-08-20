import { Plugins } from '@capacitor/core'
const { StatusBar } = Plugins

export default {
  data() {
    return {
      initialStatusbarColor: '#FFFFFF',
      newStatusbarColor: '',
    }
  },
  mounted() {
    document.querySelector('meta[name="theme-color"]').content = this.newStatusbarColor
    document.querySelector('meta[name="msapplication-TileColor"]').content = this.newStatusbarColor
    StatusBar.setBackgroundColor({ color: this.newStatusbarColor }).catch(() =>
      console.log('Statusbar is not available')
    )
  },
  beforeRouteLeave(to, from, next) {
    document.querySelector('meta[name="theme-color"]').content = this.initialStatusbarColor
    document.querySelector(
      'meta[name="msapplication-TileColor"]'
    ).content = this.initialStatusbarColor
    StatusBar.setBackgroundColor({ color: this.initialStatusbarColor }).catch(() =>
      console.log('Statusbar is not available')
    )
    next()
  },
}
