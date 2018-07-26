<template>
  <ion-page class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button/>
        </ion-buttons>
        <ion-title>Check Password</ion-title>
        <ion-buttons slot="end">
          <ion-button clear :disabled="!isValidPwd()" @click="checkHash">
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
        Don't worry.<br/>
        Your password is hash protected and<br/>
        we won't store it anywhere.<br/>
      </h1>
      <div class="input-holder">
        <ion-item>
          <ion-label padding>Your password</ion-label>
        </ion-item>
        <ion-item>
          <ion-input large :type="pwdType" :value="pwd" @input="pwd = $event.target.value"
                     placeholder="••••••"/>
          <ion-button v-show="isValidPwd()" slot="end" fill="clear" size="large" @click="togglePwdType">
            <img src="../images/Icon-Show-Hide.svg" alt="Show Hide Password">
          </ion-button>
        </ion-item>
      </div>
      <div class="hash-protected">
        <div class="hash-protected-inner">
          <img src="../images/Icon-Hash-Protected.svg" alt="Hash Protected">
          <span>Hash protected</span>
        </div>
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
  },
  methods: {
    isValidPwd() {
      return this.pwd.trim().length > 0
    },
    togglePwdType() {
      this.showPwd = !this.showPwd
    },
    getURL(hashPart) {
      return baseURL + hashPart
    },
    checkHash() {
      if (this.isValidPwd() && !this.requestPending) {
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
  width: 100%;
  color: rgba(27, 27, 27, 0.5);
  font-size: 12px;
  letter-spacing: -0.29px;
  line-height: 15px;
  text-align: center;
  font-weight: normal;
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

ion-input[type="password"] {
  height: 56px;
  font: small-caption;
  font-size: 70px;
  letter-spacing: -2px;
}

ion-input[type="text"] {
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

.hash-protected {
  position: absolute;
  bottom: 20px;
  padding-left: 7%;
}

.hash-protected-inner {
  line-height: 25px;
  height: 25px;
}

.hash-protected-inner > img {
  float: left;
}

.hash-protected-inner > span {
  margin-left: 5px;
  color: var(--beep-secondary);
  font-size: 18px;
  font-weight: 300;
  letter-spacing: -0.43px;
  line-height: 100%;
  border-bottom: 1px solid var(--beep-secondary);
}
</style>
