export default {
  data() {
    return {
      isModalOpen: false,
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log('qwe')
    next(!this.isModalOpen)
  },
  methods: {
    toggleModal() {
      console.log('ased')
      this.isModalOpen = !this.isModalOpen
    },
  },
}
