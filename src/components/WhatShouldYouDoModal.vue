<template>
  <div>
    <h3 @click="createModal()">
      <span>What should you do?</span>
    </h3>
    <modal
      ref="modal"
      title="">
      <div class="content">
        <h1>What Should You Do?</h1>
        <p>
          We recommend changing your password on any sites where you used the password you entered.&nbsp;
          Follow these best practices to create a secure password:
        </p>
        <ul>
          <li>Don’t write your passwords down.</li>
          <li>
            Longer passwords are more secure. &nbsp;
            But don’t make your password so long that you’ll be tempted to write it down.
          </li>
          <li>Avoid using dictionary words.</li>
          <li>
            Don’t use the same password for more than one account. &nbsp;
            Sound like too many passwords? Try a password manager like LastPass or OnePassword.
          </li>
          <li>Never use remember password</li>
          <li>Don’t use your name, address, or any other personal information</li>
        </ul>
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from './Modal.vue'

export default {
  name: 'WhatShouldYouDoModal',
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

.content {
  padding: 5vh 20px;
}

p,
ul {
  color: var(--beep-light-dark);
  font-size: 14px;
  letter-spacing: -0.34px;
  line-height: 26px;
  margin-bottom: 15px;
}

ul {
  padding-left: 30px;
}

h1 {
  color: #1b1b1b;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: -0.6px;
  line-height: 1.5;
}

@media screen and (min-height: 650px) {
  h3 {
    font-size: 20px;
    line-height: 20px;
  }
}
</style>
