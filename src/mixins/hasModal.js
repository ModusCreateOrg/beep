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
    toggleModal(modalComponent = null) {
      if (!this.isModalOpen) {
        this.isModalOpen = !this.isModalOpen
        return this.openModal(modalComponent)
      }
      this.isModalOpen = !this.isModalOpen
      return Promise.resolve()
    },
    async openModal(modalComponent = null) {
      const modal = await this.$ionic.modalController.create({
        component: modalComponent || this.modal,
      })
      modal.present()
      return modal.onDidDismiss().then(this.toggleModal)
    },
  },
}
