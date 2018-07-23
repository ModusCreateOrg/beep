<template>
  <ion-page class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button/>
        </ion-buttons>
        <ion-title>Check Password</ion-title>
        <ion-buttons slot="end">
          <ion-button clear :disabled="!validatePwd()" @click="checkHash">
            <span v-if="requestPending">
              <ion-spinner/>
            </span>
            <span v-else>Check</span>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content" padding>
      <div class="sub-title">
        Don't worry.<br/>
        Your password is hash protected and<br/>
        we won't store it anywhere.<br/>
      </div>
      <ion-item>
        <ion-label floating>Your password</ion-label>
        <ion-input large :type="pwdType" :value="pwd" @input="pwd = $event.target.value"/>
        <ion-button v-show="pwd.length > 0" slot="end" fill="clear" size="large" @click="togglePwdType">
          <ion-icon :name="showPwdIcon"/>
        </ion-button>
      </ion-item>
      <div class="hash-protected">
        <img src="../images/Icon-Hash-Protected.svg" alt="Hash Protected">
        <span>Hash protected</span>
      </div>
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
    showPwdIcon() {
      return this.showPwd ? 'eye-off' : 'eye'
    },
  },
  methods: {
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
      const loading = await this.$ionic.newLoadingController({
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

      this.$ionic
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

.sub-title {
  color: #5C5C5C;
  height: 45px;
  width: 100%;
  color: rgba(27, 27, 27, 0.5);
  font-family: Lato, serif;
  font-size: 12px;
  letter-spacing: -0.29px;
  line-height: 15px;
  text-align: center;
}

ion-input[type="password"] {
  font: small-caption;
  font-size: 75px;
  color: #5C5C5C !important;
  letter-spacing: -2px;
  height: 20px;
}

input[type="password"] {
  color: #5C5C5C !important;
}

ion-input[type="text"] {
  font: small-caption;
  font-size: 20px;
  color: #5C5C5C;
  height: 20px;
}

ion-label {
  width: 100%;
  color: #5C5C5C !important;
  font-family: Lato, serif;
  font-size: 25px;
  letter-spacing: -0.43px;
  line-height: 25px;
}

ion-item {
  border-bottom: none !important;
  --inner-border-width: 0 !important;
}

.hash-protected > img {
  float: left;
}

.hash-protected > span {
  color: #555555;
  font-family: Lato, serif;
  font-size: 18px;
  font-weight: 300;
  letter-spacing: -0.43px;
  line-height: 22px;
}
</style>
