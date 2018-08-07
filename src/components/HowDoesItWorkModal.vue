<template>
  <div>
    <h2 @click="createModal()"><span>How does it work?</span></h2>
    <modal
      ref="modal"
      title="How does it work?">
      <div class="content">
        <p>
          Every day, over 4 million online data records are stolen or lost.&nbsp;
          Beep tells you if your online accounts have been stolen in any of these data breaches.&nbsp;
          Just enter your email address, username, or password, and we’ll tell you if it’s been hacked.
        </p>

        <img
          src="../images/Icon-Character-Swarm.svg"
          class="bee">

        <h1>Pioneering Vue.js as a New Backend for Ionic</h1>
        <p>
          Beep is one of the first apps built on Vue.JS and Ionic Framework.&nbsp;
          With this combination, PHP developers no longer have to struggle with&nbsp;
          Angular to build cross platform Ionic apps. We even built our own router.
        </p>
        <h1 class="hash-protected">
          <img src="../images/Icon-Hash-Protected.svg">
          <span>Hash Protected</span>
        </h1>
        <p>
          We’ve made sure that Beep won’t end up yet another name on the list of data breaches.&nbsp;
          How? We hash all of your passwords and account information.&nbsp;
          In other words, we never store your passwords in plain text.&nbsp;
          Instead, we transform your password into a really, really long code that a hacker can’t crack.&nbsp;
          And then, we send only the first five characters of that code to a server.
        </p>
        <h3>Carefully crafted by</h3>
        <img
          src="../images/Modus-Labs-Logo.svg"
          class="modus-labs-logo">
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from './Modal.vue'

export default {
  name: 'HowDoesItWorkModal',
  components: {
    modal: Modal,
  },
  methods: {
    createModal() {
      this.$refs.modal.createModal()
    },
  },
}
</script>

<style scoped>
.content {
  padding: 5vh 20px;
}

.bee {
  width: 100%;
}

p {
  color: var(--beep-light-dark);
  font-size: 14px;
  letter-spacing: -0.34px;
  line-height: 26px;
  margin-bottom: 50px;
}

p:first-child {
  margin-bottom: 0;
}

h1 {
  color: #1b1b1b;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: -0.6px;
  line-height: 1.5;
}

h2 {
  height: 10vh;
  margin-top: 23vh;
  font-size: 18px;
  font-weight: 300;
  letter-spacing: -0.48px;
}

.hash-protected {
  line-height: 25px;
}

.hash-protected > img {
  float: left;
}

.hash-protected > span {
  margin-left: 5px;
}

h2 span {
  border-bottom: 1px solid var(--beep-secondary);
}

h3 {
  font-size: 12px;
  color: var(--ion-dark-transparent);
  letter-spacing: -0.29px;
  line-height: 15px;
  font-weight: normal;
  text-align: center;
  margin-top: 30px;
  display: inline-block;
  width: 100%;
}

.modus-labs-logo {
  display: block;
  margin: 0 auto;
}

@media screen and (min-height: 650px) {
  h2 {
    font-size: 20px;
  }
}
</style>
