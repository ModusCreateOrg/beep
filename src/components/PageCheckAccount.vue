<template>
  <BasePageCheckForHack
    title="Check Account"
    :is-valid="isValidAccount"
    :request-pending="requestPending"
    @check-for-hack="sendRequest"
  >
    <template slot="subtitle">
      Enter any username or email and<br>
      we'll check if it's been hacked<br>
    </template>

    <template slot="input-form">
      <ion-item>
        <ion-label padding>Your username or email</ion-label>
      </ion-item>
      <ion-item>
        <ion-input
          :value="account"
          large
          type="email"
          placeholder="Username or email"
          @input="account = $event.target.value"
          @keydown.enter="sendRequest"
        />
      </ion-item>
    </template>
  </BasePageCheckForHack>
</template>

<script>
import axios from 'axios'
import hasModal from '@/mixins/hasModal'
import reviewAppModal from '@/mixins/reviewAppModal'
import BasePageCheckForHack from './BasePageCheckForHack';

export default {
  name: 'PageAcc',
  components: {
    BasePageCheckForHack,
  },
  mixins: [hasModal, reviewAppModal],
  data() {
    return {
      account: '',
      requestPending: false,
    }
  },
  computed: {
    isValidAccount() {
      return this.account.trim().length > 0
    },
  },
  mounted() {
    this.tryPromptAppReview()
    this.$breachesService.clear()
  },
  methods: {
    getURL() {
      return this.$breachesService.baseApiURL + encodeURIComponent(this.account)
    },
    async sendRequest() {
      const loading = await this.$ionic.loadingController.create()
      loading.present()

      this.$breachesService.breaches = []
      this.$breachesService.account = this.account
      this.requestPending = true

      return axios
        .get(this.getURL())
        .then(response => {
          this.$breachesService.breaches = response.data
          this.$reviewAppService.registerCheck()
          this.$router.push('/breaches')

          return response
        })
        .catch(err => {
          // 404 means account not pwned
          this.$breachesService.breaches = []
          if (err.response && err.response.status === 404) {
            this.$reviewAppService.registerCheck()
            this.$router.push('/safe')
            return
          }

          this.showBlockedError()
        })
        .then(() => {
          this.account = ''
          this.requestPending = false
          loading.dismiss()
          return
        })
    },
    showBlockedError() {
      return this.$ionic.alertController
        .create({
          header: 'Request blocked',
          message:
            'Your request was blocked by the <a href="https://haveibeenpwned.com/" target="_blank">API service provider</a>',
          buttons: ['OK'],
        })
        .then(e => e.present())
    },
    showError() {
      return this.$ionic.alertController
        .create({
          header: 'Error',
          message: 'Something went wrong...',
          buttons: ['OK'],
        })
        .then(e => e.present())
    },
  },
}
</script>
