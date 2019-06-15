<template>
  <ion-page class="ion-page">
    <ion-header>
      <ion-toolbar class="beep-result-toolbar">
        <ion-buttons slot="start">
          <ion-back-button
            class="beep-color-light"
            default-href="/pwd"
          />
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content
      padding
      class="content"
    >
      <h1 class="beep-result-title">Caution!</h1>
      <h2 class="beep-result-subtitle">This password has been<br>compromised across</h2>
      <h1
        class="beep-result-title count"
        v-html="count"
      />
      <h2 class="beep-result-subtitle count-text">websites</h2>
      <div id="lottie" />
      <h3
        class="beep-result-action beep-link"
        @click="goToHelp"
      >
        <span>What should you do?</span>
      </h3>
      <h3
        class="beep-result-action beep-link"
        @click="goToAcc"
      >
        <span>Next: Check Account</span>
      </h3>
    </ion-content>
  </ion-page>
</template>

<script>
import bodymovin from 'bodymovin/build/player/bodymovin.js'
import animationData from '@/lottie/unsafe/data.json'
import toggleStatusbarColor from '@/mixins/toggleStatusbarColor'
import hasModal from '@/mixins/hasModal'

export default {
  name: 'PageUnsafe',
  mixins: [hasModal, toggleStatusbarColor],
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      animation: null,
      newStatusbarColor: this.$helpers.env('UNSAFE_STATUSBAR_COLOR'),
    }
  },
  mounted() {
    this.loadAnimation()
    this.modal = () => import('@/components/PageUnsafeModalSuggestions.vue')
    document.querySelector('meta[name="theme-color"]').content = '#FF5C5D'
  },
  beforeRouteLeave(to, from, next) {
    setTimeout(() => {
      this.animation.destroy()
    }, 420)
    document.querySelector('meta[name="theme-color"]').content = '#FFFFFF'
    next()
  },
  methods: {
    goToAcc() {
      this.$router.push('/acc')
    },
    loadAnimation() {
      this.animation = bodymovin.loadAnimation({
        animationData,
        container: document.getElementById('lottie'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        name: 'unsafe',
      })
    },
    goToHelp() {
      this.toggleModal()
    },
  },
}
</script>

<style scoped>
.ion-page {
  --ion-text-color: var(--beep-light);
  --ion-background-color: var(--beep-danger);
  text-align: center;
}

.beep-result-toolbar {
  --background: var(--beep-danger);
}

h1.count {
  height: auto;
  margin: 0;
  font-size: 50px;
  font-weight: bold;
  letter-spacing: -1px;
}

h2.count-text {
  height: auto;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.5;
}

@media screen and (min-height: 650px) {
  h2.count-text {
    font-size: 20px;
  }
}
</style>
