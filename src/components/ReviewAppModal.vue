<template>
  <modal className="feedback-modal">
    <div>
      <h1>Did you like<br/>using BEEP?</h1>
      <h3>Please help us improve<br/>by leaving your feedback</h3>
      <div class="bees-container">
        <a @click="badExperience">
          <img src="../images/Bee-Not-Happy-Avatar@2x.svg"/>
          <div>Not Really</div>
        </a>
        <a @click="goodExperience">
          <img src="../images/Bee-Happy-Avatar@2x.svg"/>
          <div>Love It!</div>
        </a>
      </div>
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
      isWeb: helpers.isWeb(),
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
    async badExperience() {
      return this.$ionic.alertController
        .create({
          header: 'Please help use improve!',
          message: 'We love feedback. How can we make our app better?',
          buttons: [
            'Cancel',
            {
              text: 'Feedback',
              handler: () => {
                this.$reviewAppService.provideAppFeedback()
                this.$ionic.modalController.dismiss()
              },
            },
          ],
        })
        .then(a => a.present())
    },
    async goodExperience() {
      if (!this.isWeb) {
        return this.$ionic.alertController
          .create({
            header: 'Rate & Review',
            message: 'Please, rate our app and write a review to help us reach more people',
            buttons: [
              {
                text: 'No, Thanks',
                handler: () => {
                  this.$reviewAppService.setReviewDone()
                  this.$ionic.modalController.dismiss()
                },
              },
              'Maybe later',
              {
                text: 'Write Review',
                handler: () => {
                  this.$reviewAppService.suggestAppReview()
                  this.$ionic.modalController.dismiss()
                },
              },
            ],
          })
          .then(a => a.present())
      } else {
        this.$reviewAppService.setReviewDone()
        this.$ionic.modalController.dismiss()
      }
    },
  },
}
</script>

<style scoped>
h1 {
  color: var(--beep-light);
  font-size: 34px;
  font-weight: bold;
  letter-spacing: -0.6px;
  line-height: 1.3;
  margin-bottom: 25px;
}
h3 {
  margin: 0 auto;
  color: var(--beep-light);
  height: 5vh;
  font-size: 19px;
  font-weight: 300;
  letter-spacing: -0.48px;
  line-height: 22px;
}
.bees-container {
  margin-top: 80px;
  width: 100%;
}
a {
  float: left;
  width: 50%;
  cursor: pointer;
}
a img {
  height: 125px;
}
a div {
  margin-top: 10px;
  color: var(--beep-light);
  font-weight: lighter;
}
</style>
