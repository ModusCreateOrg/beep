<template>
  <BaseModal>
    <h1 class="beep-suggestion-title">What Should You Do?</h1>
    <p class="beep-suggestion-description">
      We recommend changing your password on any sites where you used the password you entered.
      Follow these best practices to create a secure password:
    </p>
    <ul class="beep-suggestion-list">
      <li>Don't write your passwords down.</li>
      <li>
        Longer passwords are more secure.
        But don’t make your password so long that you’ll be tempted to write it down.
      </li>
      <li>Avoid using dictionary words.</li>
      <li>
        Don't use the same password for more than one account.
        Sound like too many passwords? Try a password manager like LastPass or OnePassword.
      </li>
      <li>Never use remember password</li>
      <li>Don't use your name, address, or any other personal information</li>
    </ul>
  </BaseModal>
</template>

<script>
import BaseModal from './BaseModal.vue'

export default {
  name: 'PageUnsafeModalSuggestions',
  components: {
    BaseModal,
  },
}
</script>

<style scoped>
.beep-suggestion-title {
  line-height: 1.5;
}

.beep-suggestion-description {
  margin-bottom: 15px;
}

.beep-suggestion-list {
  padding-left: 30px;
}
</style>
