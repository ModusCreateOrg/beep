<template>
  <modal>
    <div>
      <h1>Did you like using BEEP?</h1>
      <h3 @click="goToReview" v-if="!isWeb">
        <span>Would you mind rating BEEP?</span>
      </h3>
      <h3 @click="provideFeedback">
        <span>We would love to learn from your experience. Can you give us feedback, please? </span>
      </h3>
    </div>
  </modal>
</template>

<script>
import Modal from './Modal.vue'
import helpers from '../helpers'

export default {
  name: 'ReviewAppModal',
  components: {
    Modal,
  },
  data() {
    return {
      isWeb: helpers.isWeb()
    }
  },
  methods: {
    async goToReview() {
      await this.$reviewAppService.suggestAppReview()
      this.$ionic.modalController.dismiss()
    },
    async provideFeedback() {
      await this.$reviewAppService.provideAppFeedback()
      this.$ionic.modalController.dismiss()
    },
  },
}
</script>

<style scoped>
h1 {
  color: var(--beep-dark);
  font-size: 24px;
  font-weight: bold;
  letter-spacing: -0.6px;
  line-height: 1.5;
  margin-bottom: 25px; 
}
h3 {
  margin: 0 auto;
  height: 5vh;
  font-size: 16px;
  font-weight: 300;
  letter-spacing: -0.48px;
  line-height: 22px;
}

h3 span {
  border-bottom: 1px solid var(--beep-dark);
}
</style>
