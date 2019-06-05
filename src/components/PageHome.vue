<template>
  <ion-page class="ion-page">
    <ion-header>
      <ion-toolbar>
        <img src="../images/Beep-Logo.svg" class="logo" alt="Beep logo">
      </ion-toolbar>
    </ion-header>
    <ion-content class="content">
      <h1>Check if you've
        <br>been hacked
      </h1>
      <div class="buttons">
        <div class="btn-holder" @click="goToAcc">
          <div class="square-btn">
            <div class="square-btn-content">
              <div class="square-btn-icon">
                <img src="../images/Icon-Account.svg" alt="Account logo">
              </div>
              <div class="square-btn-text">Account</div>
            </div>
            <div class="square-btn-shadow"/>
          </div>
        </div>
        <div class="btn-holder" @click="goToPwd">
          <div class="square-btn">
            <div class="square-btn-content">
              <div class="square-btn-icon">
                <img src="../images/Icon-Password.svg" alt="Password logo">
              </div>
              <div class="square-btn-text">Password</div>
            </div>
            <div class="square-btn-shadow"/>
          </div>
        </div>
      </div>
      <div class="footer">
        <h2 @click="goToHelp"><span class="link">How does it work?</span></h2>
        <h2 @click="share" v-if="!$isWeb"><span>Share this app</span></h2>
      </div>
      <div class="app-store-btns" v-if="$isWeb">
        <a href="https://mdus.co/beepios" target="_blank">
            <img src="../images/app-store-badge.svg" class="ios" />
        </a>
        <a href="https://mdus.co/beepandroid" target="_blank">
            <img src="../images/google-play-badge.png" />
        </a>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import hasModal from '@/mixins/hasModal'
import { Plugins } from '@capacitor/core'
const { App, Share } = Plugins

export default {
  name: 'PageHome',
  mixins: [hasModal],
  data() {
    return {
      backEvent: {},
    }
  },
  methods: {
    goToAcc() {
      this.$router.push('/acc')
    },
    goToPwd() {
      this.$router.push('/pwd')
    },
    handleHardwareBackButton() {
      if (!this.isModalOpen) {
        App.exitApp()
      }
    },
    goToHelp() {
      this.toggleModal()
    },
    async share() {
      await Share.share({
        title: 'Share Beep!',
        text: 'Help others to keep safe',
        url: 'https://beep.modus.app/',
        dialogTitle: 'Spread the word',
      })
    },
  },
  mounted() {
    this.modal = () => import('@/components/PageHomeModalHowItWorks.vue')
  },
  created() {
    this.backEvent = App.addListener('backButton', this.handleHardwareBackButton)
    this.backEvent.catch(this.$helpers.err)
  },
  beforeDestroy() {
    if (this.backEvent.remove) {
      this.backEvent.remove()
    }
  },
}
</script>

<style scoped>
ion-page {
  text-align: center;
  --ion-text-color: var(--beep-secondary);
}

.logo {
  display: inline-block;
  width: 2.8125rem;
}

h1 {
  height: 14vh;
  margin-top: 15vh;
  color: var(--beep-dark);
  font-size: 32px;
  font-weight: bolder;
  letter-spacing: -1px;
}

.buttons {
  position: relative;
  height: 19vh;
  margin-top: 7vh;
  margin-left: 8%;
  width: 84%;
  clear: both;
}

.btn-holder {
  position: relative;
  float: left;
  width: 45%;
}

.btn-holder + .btn-holder {
  margin-left: 10%;
}

.square-btn {
  position: relative;
  width: 100%;
  border-radius: 5px;
  background-color: var(--beep-light);
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.1);
}

.square-btn:after {
  content: '';
  display: block;
  padding-bottom: 100%;
}

.square-btn-shadow {
  position: absolute;
  height: 80%;
  width: 80%;
  z-index: -1;
  top: 25%;
  left: 10%;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.15);
  -webkit-filter: blur(10px);
  -moz-filter: blur(10px);
  -o-filter: blur(10px);
  -ms-filter: blur(10px);
  filter: blur(10px);
}

.square-btn-content {
  position: absolute;
  width: 100%;
  height: 100%;
}

.square-btn-icon {
  margin-bottom: 10%;
  margin-top: 15%;
  width: 100%;
  height: 35%;
}

.square-btn-icon img {
  height: 100%;
}

.square-btn-text {
  width: 100%;
  color: var(--beep-dark);
  font-size: 15px;
  font-weight: 300;
  letter-spacing: -0.48px;
  line-height: 22px;
}

h2 {
  height: 10vh;
  margin-top: 13vh;
  font-size: 18px;
  font-weight: 300;
  letter-spacing: -0.48px;
  display: inline-block;
}

h2 span {
  border-bottom: 1px solid var(--beep-secondary);
}

.footer,
.app-store-btns {
  display: inline-flex;
  width: 100%;
  justify-content: center;
}

.footer h2 {
  text-align: center;
  flex: 1;
}

.app-store-btns a {
  /* width: 200px; */
  flex: 1;
  max-width: 160px;
  margin-bottom: 25px;
}

.app-store-btns a img {
  width: 150px;
}

.app-store-btns a img.ios {
  width: 135px;
}

@media screen and (min-height: 650px) {
  h1 {
    font-size: 40px;
  }
}

/* Small Devices, Tablets */
@media only screen and (min-width: 768px) {
  .app-store-btns a {
    max-width: 260px;
  }
  .app-store-btns a img {
    width: 250px;
  }

  .app-store-btns a img.ios {
    width: 235px;
  }
}

/* Medium Devices, Desktops */
@media only screen and (min-width: 992px) {
}

/* Large Devices, Wide Screens */
@media only screen and (min-width: 1200px) {
}
</style>
