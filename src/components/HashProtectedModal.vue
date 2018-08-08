<template>
  <div>
    <div class="hash-protected-holder" @click="createModal()">
      <div class="hash-protected-inner">
        <img src="../images/Icon-Hash-Protected.svg">
        <span>Hash protected</span>
      </div>
    </div>
    <modal ref="modal" title="">
      <div class="content">
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
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from './Modal.vue'

export default {
  name: 'HashProtectedModal',
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
.hash-protected-holder {
  position: absolute;
  bottom: 20px;
  padding-left: 7%;
}

.hash-protected-holder .hash-protected-inner {
  line-height: 25px;
  height: 25px;
}

.hash-protected-inner > img,
.hash-protected > img {
  float: left;
  width: 1.25rem;
}

.hash-protected-inner > span {
  margin-left: 5px;
  color: var(--beep-secondary);
  font-size: 18px;
  font-weight: 300;
  letter-spacing: -0.43px;
  line-height: 100%;
  border-bottom: 1px solid var(--beep-secondary);
}

.content {
  padding: 5vh 20px;
}

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

h2 span {
  border-bottom: 1px solid var(--beep-secondary);
}

@media screen and (min-height: 650px) {
  h2 {
    font-size: 20px;
  }
}
</style>
