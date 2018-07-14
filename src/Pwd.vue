<template>
  <ion-page class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button/>
        </ion-buttons>
        <ion-title>Password checking</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content 
      class="content" 
      padding>
      <ion-list>
        <ion-item>
          <ion-icon 
            v-show="!showPwd" 
            slot="start" 
            name="lock"/>
          <ion-icon 
            v-show="showPwd" 
            slot="start" 
            name="unlock"/>
          <ion-input 
            :type="pwdType" 
            :value="pwd" 
            placeholder="Password" 
            @input="pwd = $event.target.value"/>
          <ion-button 
            v-show="pwd" 
            slot="end" 
            fill="clear" 
            size="small" 
            @click="togglePwdType">
            {{ showPwdText }}
          </ion-button>
        </ion-item>
      </ion-list>

      <ion-button 
        :disabled="!validatePwd()" 
        expand="full" 
        type="submit" 
        @click="checkHash">
        <span v-if="requestPending">
          <ion-spinner/>
        </span>
        <span v-else>Have I been pwned?</span>
      </ion-button>
      <ion-button @click="goToAcc">go to account page</ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
import sha1 from 'sha1'
import axios from 'axios'

const baseURL = 'https://api.pwnedpasswords.com/range/'

export default {
  name: 'Pwd',
  data() {
    return {
      pwd: '',
      showPwd: false,
      requestPending: false,
      pwned: false,
      count: 0,
    }
  },
  computed: {
    pwdType() {
      return this.showPwd ? 'text' : 'password'
    },
    showPwdText() {
      return this.showPwd ? 'hide' : 'show'
    },
  },
  methods: {
    goToAcc() {
      this.$router.push('/acc')
    },
    validatePwd() {
      return this.pwd.trim()
    },
    togglePwdType() {
      this.showPwd = !this.showPwd
    },
    getURL(hashPart) {
      return baseURL + hashPart
    },
    checkHash() {
      if (this.validatePwd() && !this.requestPending) {
        this.sendRequest()
      }
    },
    async sendRequest() {
      const hash = sha1(this.pwd)
      const loading = await this.$glob.api.newLoadingController({
        content: 'Fetching breach details...',
      })

      loading.present()
      this.requestPending = true

      return axios
        .get(this.getURL(hash.substr(0, 5)))
        .then(res => {
          this.count = this.search(hash.substr(5).toUpperCase(), res.data)
          this.pwned = this.count > 0
          return this.notify()
        })
        .catch(err => console.error(err))
        .finally(() => {
          // Reset and unblock subsequent requests
          this.pwd = ''
          this.requestPending = false
          loading.dismiss()
        })
    },
    search(hash, text) {
      const startIndex = text.indexOf(hash)
      if (startIndex === -1) {
        return 0
      }

      let endIndex = text.indexOf('\n', startIndex)
      if (endIndex === -1) {
        endIndex = text.substr(startIndex).length
      }

      const breachData = text.substr(startIndex, endIndex - startIndex).split(':')
      if (breachData.length !== 2) {
        throw new Error('Unexpected data')
      }

      return breachData[1]
    },
    notify() {
      let btns = ['Yay!']
      let msg = 'You are secure, for now...'

      if (this.pwned) {
        btns = ['Doh!']
        msg = `You've been pwned across ${this.count} domains`
      }

      this.$glob.api
        .newAlertController({
          header: 'Beep',
          subHeader: null,
          message: msg,
          buttons: btns,
        })
        .then(o => o.present())
        .catch(err => console.error(err))
    },
  },
}
</script>

<style>
ion-spinner * {
  stroke: white !important;
}
</style>
