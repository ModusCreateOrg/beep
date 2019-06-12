<template>
  <BaseModal>
    <div>
      <p>
        Every day, over 4 million online data records are stolen or lost.
        <a
          href="https://labs.moduscreate.com/beep-vue-ionic-hybrid-mobile-app"
          class="link"
        >Beep</a> tells you if your online accounts have been stolen in any of these data breaches.
        Just enter your email address, username, or password, and we’ll tell you if it's been hacked.
      </p>

      <img
        src="../images/Icon-Character-Swarm.svg"
        class="bee"
        alt="Swarm Character"
      />

      <h1>Pioneering Vue.js as a New Backend for Ionic</h1>
      <p>
        <a
          href="https://labs.moduscreate.com/beep-vue-ionic-hybrid-mobile-app"
          class="link"
        >Beep</a> is one of the first apps built on
        <a
          href="https://github.com/ionic-team/ionic/pull/15801"
          class="link"
        >Vue.JS and Ionic Framework</a>.
        With this combination, PHP developers no longer have to struggle with
        Angular to build cross platform Ionic apps. We even built our own router.
      </p>
      <h1 class="hash-protected">
        <img
          src="../images/Icon-Hash-Protected.svg"
          alt="Hash protected"
        />
        <span>Hash Protected</span>
      </h1>
      <p>
        We've made sure that
        <a
          href="https://labs.moduscreate.com/beep-vue-ionic-hybrid-mobile-app"
          class="link"
        >Beep</a> won't end up yet another name on the list of data breaches.&nbsp;
        How? We hash all of your passwords and account information.
        In other words, we never store your passwords in plain text.
        Instead, we transform your password into a really, really long code and then, we send only the first five characters of that code to a server.
      </p>
      <h3>Carefully crafted by</h3>
      <a href="https://labs.moduscreate.com">
        <img
          src="../images/Modus-Labs-Logo.svg"
          class="modus-labs-logo"
          alt="Modus Labs Logo"
        />
      </a>
    </div>
  </BaseModal>
</template>

<script>
import BaseModal from './BaseModal.vue'

export default {
  name: 'PageHomeModalHowItWorks',
  components: {
    BaseModal,
  },
}
</script>

<style scoped>
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
  color: var(--beep-dark);
  font-size: 24px;
  font-weight: bold;
  letter-spacing: -0.6px;
  line-height: 1.5;
}

.hash-protected {
  line-height: 25px;
}

.hash-protected > img {
  float: left;
  width: 1.25rem;
}

.hash-protected > span {
  margin-left: 5px;
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
  width: 9.6825rem;
}

@media screen and (min-height: 650px) {
  h2 {
    font-size: 20px;
  }
}
</style>
