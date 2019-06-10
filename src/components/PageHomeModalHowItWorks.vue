<template>
  <BaseModal>
    <p class="p-intro">
      Every day, over 4 million online data records are stolen or lost.
      <a
        href="https://labs.moduscreate.com/beep-vue-ionic-hybrid-mobile-app"
        class="beep-link"
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
        class="beep-link"
      >Beep</a> is one of the first apps built on
      <a
        href="https://github.com/ionic-team/ionic/pull/15801"
        class="beep-link"
      >Vue.JS and Ionic Framework</a>.
      With this combination, PHP developers no longer have to struggle with
      Angular to build cross platform Ionic apps. We even built our own router.
    </p>
    <h1>
      <img
        class="beep-inline-icon"
        src="../images/Icon-Hash-Protected.svg"
        alt="Hash protected"
      />
      Hash Protected
    </h1>
    <p>
      We've made sure that
      <a
        href="https://labs.moduscreate.com/beep-vue-ionic-hybrid-mobile-app"
        class="beep-link"
      >Beep</a> won't end up yet another name on the list of data breaches.&nbsp;
      How? We hash all of your passwords and account information.
      In other words, we never store your passwords in plain text.
      Instead, we transform your password into a really, really long code and then, we send only the first five characters of that code to a server.
    </p>
    <div class="crafted-by">
      <h3 class="crafted-by-title">Carefully crafted by</h3>
      <a href="https://labs.moduscreate.com">
        <img
          src="../images/Modus-Labs-Logo.svg"
          class="crafted-by-logo"
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

.p-intro {
  margin-bottom: 0;
}

.crafted-by {
  text-align: center;
}

.crafted-by-title {
  margin-top: 30px;
  color: var(--ion-dark-transparent);
  font-size: 12px;
  font-weight: normal;
  letter-spacing: -0.29px;
  line-height: 15px;
}

.crafted-by-logo {
  width: 9.6825rem;
}
</style>
