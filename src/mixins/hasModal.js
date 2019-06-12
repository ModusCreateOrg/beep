export default {
  data() {
    return {
      modal: null,
      isModalOpen: false,
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.isModalOpen) {
      this.$ionic.modalController.dismiss()
    }
    next(!this.isModalOpen)
  },
  methods: {
    async toggleModal(modalComponent = null) {
      let response = Promise.resolve()

      if (!this.isModalOpen) {
        const modal = await this.$ionic.modalController.create({
          component: modalComponent || this.modal,
        })
        modal.present()
        response = modal.onDidDismiss().then(this.toggleModal)
      }

      this.isModalOpen = !this.isModalOpen

      return response
    },
  },
}
