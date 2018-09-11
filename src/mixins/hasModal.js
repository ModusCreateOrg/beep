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
    toggleModal() {
      if (!this.isModalOpen) {
        this.openModal()
      }
      this.isModalOpen = !this.isModalOpen
    },
    async openModal() {
      const modal = await this.$ionic.modalController.create({ component: this.modal })
      modal.present()
      return modal.onDidDismiss().then(this.toggleModal)
    },
  },
}
