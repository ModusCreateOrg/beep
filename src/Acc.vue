<template>
  <ion-page class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button/>
        </ion-buttons>
        <ion-title>Check Account</ion-title>
        <ion-buttons slot="end">
          <ion-button clear :disabled="!isValidAccount()" @click="checkAccount">
            <span v-if="requestPending">
              <ion-spinner/>
            </span>
            <span v-else>Check</span>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content" padding>
      <h1>
        Enter any username or email and<br/>
        we'll check if it's been hacked<br/>
      </h1>
      <div class="input-holder">
        <ion-item>
          <ion-label padding>Your username or email</ion-label>
        </ion-item>
        <ion-item>
          <ion-input large type="email" :value="account" @input="account = $event.target.value"
                     placeholder="Username or email"/>
        </ion-item>
      </div>
    </ion-content>
    <!--<div>-->
    <!--<ion-card-->
    <!--v-if="isSubmitted"-->
    <!--no-margin>-->
    <!--<ion-card-content text-center>-->
    <!--<i>{{ accountChecked }}</i> is-->
    <!--<strong>-->
    <!--<ion-badge :color="breaches.length ? 'danger' : 'success'">-->
    <!--<span v-if="breaches.length">pwned {{ breaches.length }} times</span>-->
    <!--<span v-else>not pwned, yet...</span>-->
    <!--</ion-badge>-->
    <!--</strong>-->
    <!--</ion-card-content>-->
    <!--</ion-card>-->
    <!--<breach-->
    <!--v-for="(breach, index) in breaches"-->
    <!--:key="index"-->
    <!--:breach="breach"/>-->
    <!--</div>-->
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
    isValidAccount() {
      return this.account.trim().length > 0
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
      if (!this.requestPending && this.isValidAccount()) {
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
        content: 'Checking account...',
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
@import '../styles/common-styles.css';
</style>

<style scoped>

ion-spinner * {
  stroke: white;
}

ion-toolbar {
  --ion-color-base: #FFFFFF;
}

ion-button {
  --ion-color-base: var(--beep-primary);
  text-transform: none;
}

ion-back-button {
  --ion-color-base: var(--beep-primary);
}

h1 {
  color: rgba(27, 27, 27, 0.5);
  width: 100%;
  font-size: 12px;
  font-weight: normal;
  letter-spacing: -0.29px;
  line-height: 1.4;
  text-align: center;
}

.input-holder {
  margin-top: 20vh;
  height: 20vh;
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
  color: rgba(92, 92, 92, 0.5);
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
</style>
