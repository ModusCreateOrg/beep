<template>
  <ion-page class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/" />
        </ion-buttons>
        <ion-title>Check Account</ion-title>
        <ion-buttons slot="end">
          <ion-button :disabled="!isValidAccount" clear @click="checkAccount">
            <span v-if="requestPending">
              <ion-spinner/>
            </span>
            <span v-else>Check</span>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content padding class="content">
      <h1>
        Enter any username or email and<br>
        we'll check if it's been hacked<br>
      </h1>
      <div class="input-holder">
        <form @submit.prevent="checkAccount" action="#">
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
              @keydown.enter="checkAccount"
            />
          </ion-item>
          <input type="submit" class="form-submit-button"/>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Acc',
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
    this.$breachesService.clear()
  },
  methods: {
    getURL() {
      return this.$breachesService.baseApiURL + encodeURIComponent(this.account)
    },
    checkAccount() {
      if (!this.$networkStatus.connected && this.$device.platform !== 'web') {
        this.$ionic
          .newAlertController({
            header: 'No internet connection',
            message: 'Please check your internet connection.',
            buttons: ['OK'],
          })
          .then(e => e.present())
          .catch(err => console.error(err))
        return
      }

      if (!this.requestPending && this.isValidAccount) {
        this.sendRequest()
      }
    },
    async sendRequest() {
      const loading = await this.$ionic.newLoadingController()
      loading.present()

      this.$breachesService.breaches = []
      this.$breachesService.account = this.account
      this.requestPending = true

      return axios
        .get(this.getURL())
        .then(response => {
          this.$breachesService.breaches = response.data
          this.$router.push('/breaches')

          return response
        })
        .catch(err => {
          // 404 means account not pwned
          this.$breachesService.breaches = []
          if (err.response && err.response.status === 404) {
            this.$router.push('/safe')
            return
          }
          this.showError()
        })
        .then(() => {
          this.account = ''
          this.requestPending = false
          loading.dismiss()
          return
        })
    },
    showError() {
      this.$ionic
        .newAlertController({
          header: 'Error',
          message: 'Something went wrong...',
          buttons: ['OK'],
        })
        .then(e => e.present())
        .catch(err => console.error(err))
    },
  },
}
</script>

<style scoped>
ion-spinner * {
  stroke: white;
}

ion-button,
ion-button.button-clear,
ion-button.button.button-clear.button-md.button-clear-md {
  --ion-color-base: var(--beep-primary);
  text-transform: none;
}

ion-back-button {
  --ion-color-base: var(--beep-primary);
}

h1 {
  color: var(--ion-dark-transparent);
  width: 100%;
  font-size: 12px;
  font-weight: normal;
  letter-spacing: -0.29px;
  line-height: 1.4;
  text-align: center;
}

ion-item {
  --border-style: none;
  --padding-start: 7%;
  --ion-text-color: var(--beep-secondary);
  --inner-border-width: 0;
}

ion-input {
  height: 56px;
  font-size: 25px;
  color: var(--beep-secondary);
  font-weight: 300;
  letter-spacing: -0.63px;
  line-height: 25px;
}

ion-label {
  width: 100%;
  margin: 10px 8px -15px 0;
  color: var(--beep-secondary);
  font-size: 18px;
  letter-spacing: -0.43px;
  line-height: 18px;
}

.form-submit-button {
  visibility: hidden;
  position: absolute;
}
</style>
