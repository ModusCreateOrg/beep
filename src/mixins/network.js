export default {
  methods: {
    checkNetworkStatus() {
      return this.$isWeb ? true : this.$networkStatus && this.$networkStatus.connected
    },
    showNetworkAlert() {
      return this.$ionic.alertController
        .create({
          header: 'No internet connection',
          message: 'Please check your internet connection.',
          buttons: ['OK'],
        })
        .then(a => a.present())
    },
  },
}
