<template>
  <ion-page class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/pwd" />
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content
      class="content"
      padding>
      <h1>Caution!</h1>
      <h2>Your password has been<br>compromised across</h2>
      <h1
        class="count"
        v-html="count"/>
      <h2 class="count-text">websites</h2>
      <div id="lottie"></div>
      <what-should-you-do-modal/>
      <h3 @click="goToAcc">
        <span>Next: Check Account</span>
      </h3>
    </ion-content>
  </ion-page>
</template>

<script>
import bodymovin from 'bodymovin/build/player/bodymovin.js'
import animationData from '@/lottie/unsafe/data.json'
import toggleStatusbarColor from '@/mixins/toggleStatusbarColor'

export default {
  name: 'Unsafe',
  components: {
    WhatShouldYouDoModal: () => import('@/components/WhatShouldYouDoModal.vue'),
  },
  mixins: [toggleStatusbarColor],
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      animation: null,
      newStatusbarColor: this.$env('UNSAFE_STATUSBAR_COLOR'),
    }
  },
  mounted() {
    this.loadAnimation()
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
        renderer: 'svg/canvas/html',
        loop: true,
        autoplay: true,
        name: 'unsafe',
      })
    },
  },
}
</script>

<style scoped>
ion-page {
  text-align: center;
  --ion-text-color: var(--beep-light);
}

ion-toolbar {
  --background: var(--beep-danger);
}

ion-back-button {
  --ion-color-base: var(--beep-light);
}

ion-content {
  background-color: var(--beep-danger);
}

h1 {
  height: 8vh;
  margin-top: 5vh;
  margin-bottom: 0;
  font-size: 35px;
  font-weight: bold;
  letter-spacing: -1px;
  display: inline-block;
}

h1.count {
  height: auto;
  margin: 0;
  font-size: 50px;
  font-weight: bold;
  letter-spacing: -1px;
}

h2 {
  height: 10vh;
  margin: 0;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.5;
}

h2.count-text {
  height: auto;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.5;
}

img {
  height: 40vh;
}

h3 {
  margin: 0 auto;
  height: 5vh;
  font-size: 16px;
  font-weight: 300;
  letter-spacing: -0.48px;
  line-height: 16px;
}

h3 span {
  border-bottom: 1px solid #fff;
}

@media screen and (min-height: 650px) {
  h1 {
    font-size: 40px;
  }

  h2,
  h2.count-text {
    font-size: 20px;
  }

  h3 {
    font-size: 20px;
    line-height: 20px;
  }
}
</style>
