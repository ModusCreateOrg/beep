<template>
  <BaseModal>
    <h1>
      <img
        class="beep-inline-icon"
        src="../images/Icon-Hash-Protected.svg"
        alt="Hash protected"
      />
      Hash Protected
    </h1>
    <p>
      We've made sure that Beep won't end up yet another name on the list of data breaches.
      How? We hash all of your passwords and account information.
      In other words, we never store your passwords in plain text.
      Instead, we transform your password into a really, really long code and then, we send only the first five characters of that code to a server.
    </p>
  </BaseModal>
</template>

<script>
import BaseModal from './BaseModal.vue'

export default {
  name: 'PagePwdModalHashProtected',
  components: {
    BaseModal,
  },
}
</script>
