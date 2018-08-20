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
  },
  beforeRouteLeave(to, from, next) {
    document.querySelector('meta[name="theme-color"]').content = this.initialStatusbarColor
    document.querySelector('meta[name="msapplication-TileColor"]').content = this.initialStatusbarColor
    next()
  },
}
