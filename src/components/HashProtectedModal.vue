<template>
  <div>
    <modal
      ref="modal"
      title=""
      v-on:toggleModal="$emit('toggleModal')">
      <div class="content">
        <h1 class="hash-protected">
          <img src="../images/Icon-Hash-Protected.svg" alt="Hash protected"/>
          <span>Hash Protected</span>
        </h1>
        <p>
          We've made sure that Beep won't end up yet another name on the list of data breaches.&nbsp;
          How? We hash all of your passwords and account information.&nbsp;
          In other words, we never store your passwords in plain text.&nbsp;
          Instead, we transform your password into a really, really long code that a hacker can't crack.&nbsp;
          And then, we send only the first five characters of that code to a server.
        </p>
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  name: 'HashProtectedModal',
  components: {
    Modal: () => import('./Modal'),
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

h2 span {
  border-bottom: 1px solid var(--beep-secondary);
}

@media screen and (min-height: 650px) {
  h2 {
    font-size: 20px;
  }
}
</style>
