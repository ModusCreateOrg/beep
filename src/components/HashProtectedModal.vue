<template>
  <BaseModal>
    <div>
      <h1 class="hash-protected">
        <img class="hash-protected-img" src="../images/Icon-Hash-Protected.svg" alt="Hash protected"/>
        <span>Hash Protected</span>
      </h1>
      <p>
      We've made sure that Beep won't end up yet another name on the list of data breaches.
      How? We hash all of your passwords and account information.
      In other words, we never store your passwords in plain text.
      Instead, we transform your password into a really, really long code and then, we send only the first five characters of that code to a server.
      </p>
    </div>
  </BaseModal>
</template>

<script>
import BaseModal from './BaseModal.vue'

export default {
  name: 'HashProtectedModal',
  components: {
    BaseModal,
  },
}
</script>

<style scoped>
p {
  color: var(--beep-light-dark);
  font-size: 14px;
  letter-spacing: -0.34px;
  line-height: 26px;
  margin-bottom: 50px;
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

.hash-protected > span {
  margin-left: 5px;
}
</style>
