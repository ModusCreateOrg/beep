export default {
  data() {
    return {
      isModalOpen: false,
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.isModalOpen) {
      document.querySelector('ion-modal-controller').dismiss()
    }
    next(!this.isModalOpen)
  },
  methods: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen
    },
  },
}
