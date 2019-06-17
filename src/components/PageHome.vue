<template>
  <ion-page class="ion-page">
    <ion-header>
      <ion-toolbar>
        <img
          src="../images/Beep-Logo.svg"
          class="logo"
          alt="Beep logo"
        />
      </ion-toolbar>
    </ion-header>
    <ion-content class="content">
      <h1 class="beep-header">Check if you've<br>been hacked</h1>
      <div class="beep-tiles">
        <div
          class="beep-tile"
          @click="goToAcc"
        >
          <div class="beep-tile-content">
            <img
              class="beep-tile-icon"
              src="../images/Icon-Account.svg"
              alt="Account logo"
            />
            Account
          </div>
          <div class="beep-tile-shadow" />
        </div>
        <div
          class="beep-tile"
          @click="goToPwd"
        >
          <div class="beep-tile-content">
            <img
              class="beep-tile-icon"
              src="../images/Icon-Password.svg"
              alt="Password logo"
            />
            Password
          </div>
          <div class="beep-tile-shadow" />
        </div>
      </div>
      <div class="footer">
        <h2
          class="beep-footer-link"
          @click="goToHelp"
        >
          <span class="beep-link">How does it work?</span>
        </h2>
        <h2
          v-if="!$isWeb"
          @click="share"
        >
          <span>Share this app</span>
        </h2>
      </div>
      <div
        v-if="$isWeb"
        class="app-store-btns"
      >
        <a
          class="app-store-link"
          href="https://mdus.co/beepios"
          target="_blank"
        >
          <img
            class="app-store-btn ios"
            src="../images/app-store-badge.svg"
          />
        </a>
        <a
          class="app-store-link"
          href="https://mdus.co/beepandroid"
          target="_blank"
        >
          <img
            class="app-store-btn"
            src="../images/google-play-badge.png"
          />
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
  created() {
    this.backEvent = App.addListener('backButton', this.handleHardwareBackButton)
    this.backEvent.catch(this.$helpers.err)
  },
  mounted() {
    this.modal = () => import('@/components/PageHomeModalHowItWorks.vue')
  },
  beforeDestroy() {
    if (this.backEvent.remove) {
      this.backEvent.remove()
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
}
</script>

<style scoped>
.ion-page {
  text-align: center;
  --ion-text-color: var(--beep-secondary);
}

.logo {
  display: inline-block;
  width: 2.8125rem;
}

.beep-header {
  height: 14vh;
  margin-top: 15vh;
  color: var(--beep-dark);
  font-size: 32px;
  font-weight: bolder;
  letter-spacing: -1px;
}

.beep-tiles {
  display: flex;
  justify-content: space-between;
  min-height: 19vh;
  width: 84%;
  max-width: 960px;
  margin: 7vh auto 0;
}

.beep-tile {
  position: relative;
  width: 45%;
}

.beep-tile:after {
  content: '';
  display: block;
  padding-bottom: 100%;
}

.beep-tile-content {
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: var(--beep-light);
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.1);
  color: var(--beep-dark);
  font-size: calc(1.5vw + 1.5vh);
  font-weight: 300;
  letter-spacing: -0.48px;
  text-align: center;
}

.beep-tile-icon {
  display: block;
  margin: 18% auto 10%;
  height: 35%;
}

.beep-tile-shadow {
  position: absolute;
  z-index: 0;
  height: 80%;
  width: 80%;
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

.beep-footer-link {
  display: inline-block;
  flex: 1;
  height: 10vh;
  margin-top: 13vh;
  font-size: 18px;
  font-weight: 300;
  letter-spacing: -0.48px;
  text-align: center;
}

.footer,
.app-store-btns {
  width: 100%;
  text-align: center;
}

.app-store-link {
  display: inline-block;
  width: 160px;
  margin-bottom: 25px;
}

.app-store-btn {
  height: 45px;
}

@media screen and (min-height: 650px) {
  .beep-header {
    font-size: 40px;
  }
}

/* Small Devices, Tablets */
@media only screen and (min-width: 768px) {
  .app-store-link {
    width: 260px;
  }

  .app-store-btn {
    height: 75px;
  }
}

/* Medium Devices, Desktops */
@media only screen and (min-width: 992px) {
}

/* Large Devices, Wide Screens */
@media only screen and (min-width: 1200px) {
}
</style>
