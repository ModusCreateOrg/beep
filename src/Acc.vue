<template>
  <ion-page class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button/>
        </ion-buttons>
        <ion-title>Account page</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content
      class="content"
      padding>
      <ion-list>
        <ion-item>
          <ion-icon
            slot="start"
            name="person"/>
          <ion-input
            :value="account"
            type="text"
            @input="account = $event.target.value"/>
        </ion-item>
        <ion-item>
          <ion-checkbox
            :checked="includeUnverified"
            @change="toggleIncludeUnverified"/>
          <ion-label>Include Unverified</ion-label>
        </ion-item>
      </ion-list>

      <ion-button
        :disabled="!validateAccount()"
        expand="full"
        @click="checkAccount">
        <span v-if="requestPending">
          <ion-spinner/>
        </span>
        <span v-else>Have I been pwned?</span>
      </ion-button>

      <div>
        <ion-card
          v-if="isSubmitted"
          no-margin>
          <ion-card-content text-center>
            <i>{{ accountChecked }}</i> is
            <strong>
              <ion-badge :color="breaches.length ? 'danger' : 'success'">
                <span v-if="breaches.length">pwned {{ breaches.length }} times</span>
                <span v-else>not pwned, yet...</span>
              </ion-badge>
            </strong>
          </ion-card-content>
        </ion-card>
        <breach
          v-for="(breach, index) in breaches"
          :key="index"
          :breach="breach"/>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import axios from 'axios'
import Breach from './Breach.vue'

const baseURL = 'https://haveibeenpwned.com/api/v2/breachedaccount/'

export default {
  name: 'Acc',
  components: {
    Breach,
  },
  data() {
    return {
      account: '',
      accountChecked: '',
      requestPending: false,
      isSubmitted: false,
      includeUnverified: false,
      breaches: [],
    }
  },
  methods: {
    validateAccount() {
      return this.account.trim()
    },
    getURL() {
      let url = baseURL + this.account
      if (this.includeUnverified) {
        url += '?includeUnverified=true'
      }
      return url
    },
    toggleIncludeUnverified() {
      this.includeUnverified = !this.includeUnverified
    },
    checkAccount() {
      if (!this.requestPending && this.validateAccount()) {
        this.reset()
        this.sendRequest()
      }
    },
    reset() {
      this.isSubmitted = false
      this.breaches = []
      this.accountChecked = this.account
    },
    async sendRequest() {
      const loading = await this.$ionic.newLoadingController({
        content: 'Fetching breach details...',
      })

      loading.present()
      this.requestPending = true

      return axios
        .get(this.getURL())
        .then(response => (this.breaches = response.data))
        .catch(err => {
          // 404 means account not pwned
          if (err.response && err.response.status === 404) {
            this.breaches = []
            return
          }
          this.showError()
        })
        .finally(() => {
          this.account = ''
          this.isSubmitted = true
          this.requestPending = false
          loading.dismiss()
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

<style>
ion-icon {
  font-size: 25px;
}

ion-spinner * {
  stroke: white !important;
}
</style>
