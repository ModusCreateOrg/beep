<template>
  <BasePageCheckForHack
    title="Check Password"
    :is-valid="isValidPwd"
    :request-pending="requestPending"
    @check-for-hack="sendRequest"
  >
    <template slot="subtitle">
      Don't worry.<br>
      Your password is hash protected and<br>
      we won't store it anywhere.<br>
    </template>

    <template slot="input-form">
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
          @keydown.enter="sendRequest"
        />
        <img
          v-show="isValidPwd"
          slot="end"
          :src="showHideImagePath"
          alt="Show password"
          class="toggle-password-img"
          @click="togglePwdType"
        />
      </ion-item>
    </template>

    <div
      slot="end"
      class="beep-disclaimer beep-link"
      @click="goToHelp"
    >
      <img
        class="beep-inline-icon"
        src="../images/Icon-Hash-Protected.svg"
        alt="Hash protected"
      />
      Hash protected
    </div>
  </BasePageCheckForHack>
</template>

<script>
import sha1 from 'sha1'
import axios from 'axios'
import hasModal from '@/mixins/hasModal'
import reviewAppModal from '@/mixins/reviewAppModal'
import BasePageCheckForHack from './BasePageCheckForHack';

export default {
  name: 'PagePwd',
  components: {
    BasePageCheckForHack,
  },
  mixins: [hasModal, reviewAppModal],
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
    this.modal = () => import('@/components/PagePwdModalHashProtected.vue')
    this.tryPromptAppReview()
    this.$breachesService.clear()
  },
  methods: {
    togglePwdType() {
      this.showPwd = !this.showPwd
    },
    getURL(hashPart) {
      return this.$helpers.env('PROXY_HOST') + '/range/' + hashPart
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
          this.$reviewAppService.registerCheck()
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
.toggle-password-img {
  height: 20px;
}

.beep-disclaimer {
  position: absolute;
  bottom: var(--ion-safe-area-bottom, 20px);
  padding: 0 0 16px 7%;
  font-size: 18px;
  font-weight: 300;
  letter-spacing: -0.43px;
  line-height: 25px;
}
</style>
