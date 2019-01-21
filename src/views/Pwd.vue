<template>
  <ion-page class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/" />
        </ion-buttons>
        <ion-title>Check Password</ion-title>
        <ion-buttons slot="end">
          <ion-button :disabled="!isValidPwd" clear @click="checkHash">
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
        Don't worry.<br>
        Your password is hash protected and<br>
        we won't store it anywhere.<br>
      </h1>
      <div class="input-holder">
        <form @submit.prevent="checkHash" action="#">
          <ion-item>
            <ion-label padding>Your password</ion-label>
          </ion-item>
          <ion-item>
            <ion-input
              :type="pwdType"
              :value="pwd"
              large
              placeholder="••••••"
              @input="pwd = $event.target.value"
              @keydown.enter="checkHash"
            />
            <img
              v-show="isValidPwd"
              slot="end"
              @click="togglePwdType"
              :src="showHideImagePath"
              alt="Show password"/>
          </ion-item>
          <input type="submit" class="form-submit-button"/>
        </form>
      </div>
      <div class="hash-protected-holder" @click="goToHelp">
        <div class="hash-protected-inner">
          <img class="hash-protected-img" src="../images/Icon-Hash-Protected.svg" alt="Hash protected"/>
          <span>Hash protected</span>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import sha1 from 'sha1'
import axios from 'axios'
import hasModal from '@/mixins/hasModal'
import network from '@/mixins/network'

const baseURL = 'https://api.pwnedpasswords.com/range/'

export default {
  name: 'Pwd',
  mixins: [hasModal, network],
  data() {
    return {
      pwd: '',
      showPwd: false,
      requestPending: false,
    }
  },
  computed: {
    pwdType() {
      return this.showPwd ? 'text' : 'password'
    },
    isValidPwd() {
      return this.pwd.trim().length > 0
    },
    showHideImagePath() {
      return require(`../images/Icon-Show-Hide${this.showPwd ? '-Salmon' : ''}.svg`)
    },
  },
  mounted() {
    this.modal = () => import('@/components/HashProtectedModal.vue')
    this.$breachesService.clear()
  },
  methods: {
    togglePwdType() {
      this.showPwd = !this.showPwd
    },
    getURL(hashPart) {
      return baseURL + hashPart
    },
    checkHash(event) {
      if (event) {
        event.preventDefault()
      }

      if (!this.checkNetworkStatus()) {
        return this.showNetworkAlert()
      }

      if (this.isValidPwd && !this.requestPending) {
        this.sendRequest()
      }
    },
    async sendRequest() {
      const hash = sha1(this.pwd)
      const loading = await this.$ionic.loadingController.create()

      loading.present()
      this.requestPending = true

      return axios
        .get(this.getURL(hash.substr(0, 5)))
        .then(res => {
          const count = this.search(hash.substr(5).toUpperCase(), res.data)
          if (count > 0) {
            this.$router.push(`/unsafe?count=${count}`)
          } else {
            this.$router.push('/safe')
          }
          return false
        })
        .catch(this.$helpers.err)
        .then(() => {
          // Reset and unblock subsequent requests
          this.pwd = ''
          this.requestPending = false
          loading.dismiss()
          return
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
    goToHelp() {
      this.toggleModal()
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
  --color: var(--beep-danger);
  text-transform: none;
}

ion-back-button {
  --color: var(--beep-danger);
}

h1 {
  width: 100%;
  color: var(--ion-dark-transparent);
  font-size: 12px;
  letter-spacing: -0.29px;
  line-height: 15px;
  text-align: center;
  font-weight: normal;
}

ion-item {
  --border-style: none;
  --padding-start: 7%;
  --ion-text-color: var(--beep-secondary);
  --inner-border-width: 0;
}

ion-input[type='password'] {
  height: 56px;
  font-size: 25px;
  font-weight: 300;
  letter-spacing: -0.63px;
  line-height: 25px;
}

ion-input[type='text'] {
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

.input-holder img {
  height: 20px;
}

.hash-protected-holder {
  position: absolute;
  bottom: var(--ion-safe-area-bottom, 20px);
  padding-left: 7%;
}

.hash-protected-holder .hash-protected-inner {
  line-height: 25px;
  height: 25px;
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
