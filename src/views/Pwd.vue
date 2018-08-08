<template>
  <ion-page class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start" @click="goHome">
          <ion-back-button />
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
        <form @submit.prevent="checkHash">
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
            <ion-button
              v-show="isValidPwd"
              slot="end"
              type="button"
              fill="clear"
              size="large"
              @click="togglePwdType">
              <img src="../images/Icon-Show-Hide.svg">
            </ion-button>
          </ion-item>
          <input type="submit" class="form-submit-button"/>
        </form>
      </div>
      <has-protected-modal/>
    </ion-content>
  </ion-page>
</template>

<script>
import sha1 from 'sha1'
import axios from 'axios'
import HashProtectedModal from '@/components/HashProtectedModal.vue'

const baseURL = 'https://api.pwnedpasswords.com/range/'

export default {
  name: 'Pwd',
  components: {
    'has-protected-modal': HashProtectedModal,
  },
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
  },
  mounted() {
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
      if (this.isValidPwd && !this.requestPending) {
        this.sendRequest()
      }
    },
    async sendRequest() {
      const hash = sha1(this.pwd)
      const loading = await this.$ionic.newLoadingController()

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
    goHome(event) {
      if (event) {
        event.preventDefault()
      }
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
ion-spinner * {
  stroke: white;
}

ion-toolbar {
  --ion-color-base: var(--beep-light);
}

ion-button,
ion-button.button-clear {
  --ion-color-base: var(--beep-primary);
  text-transform: none;
}

ion-back-button {
  --ion-color-base: var(--beep-primary);
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

ion-input[type='password'] {
  height: 56px;
  font: small-caption;
  font-size: 40px;
  letter-spacing: -2px;
}

ion-input[type='text'] {
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

.form-submit-button {
  visibility: hidden;
  position: absolute;
}
</style>
