<template>
  <ion-page class="ion-page">
    <ion-header>
      <ion-toolbar>
        <img src="../images/Beep-Logo.svg" class="logo" alt="Beep logo"/>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content">
      <h1>
        Check if you've<br>
        been hacked
      </h1>
      <section class="buttons">
        <mds-square-button text="Account" :icon="iconAccount" />
        <mds-square-button text="Password" :icon="iconPassword" />
      </section>
      <h2 @click="goToHelp"><span>How does it work?</span></h2>
    </ion-content>
  </ion-page>
</template>

<script>
import hasModal from '@/mixins/hasModal'
import { Plugins } from '@capacitor/core'
import iconAccount from '../images/Icon-Account.svg';
import iconPassword from '../images/Icon-Password.svg';

const { App } = Plugins

export default {
  name: 'Home',
  mixins: [hasModal],
  data() {
    return {
      backEvent: null,
      iconAccount,
      iconPassword,
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
      if (this.isModalOpen) {
        return this.$ionic.modalController.dismiss()
      }

      App.exitApp()
    },
    goToHelp() {
      this.toggleModal()
    },
  },
  mounted() {
    this.modal = () => import('@/components/HowDoesItWorkModal.vue')
  },
  created() {
    this.backEvent = App.addListener('backButton', this.handleHardwareBackButton).catch(
      this.$helpers.err
    )
  },
  destroyed() {
    if (this.backEvent && this.backEvent.remove) {
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

mds-square-button {
  float: left;
  width: 45%;
}

mds-square-button + mds-square-button {
  margin-left: 10%;
}

h2 {
  height: 10vh;
  margin-top: 23vh;
  font-size: 18px;
  font-weight: 300;
  letter-spacing: -0.48px;
  display: inline-block;
}

h2 span {
  border-bottom: 1px solid var(--beep-secondary);
}

@media screen and (min-height: 650px) {
  h1 {
    font-size: 40px;
  }
}
</style>
