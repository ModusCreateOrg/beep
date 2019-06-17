<template>
  <BaseModal class="feedback-modal">
    <div>
      <h1 class="feedback-title">Did you like<br/>using BEEP?</h1>
      <h3 class="feedback-subtitle">Please help us improve<br/>by leaving your feedback</h3>
      <div class="feedback-options-container">
        <a
          class="feedback-option"
          @click="badExperience"
        >
          <img src="../images/Bee-Not-Happy-Avatar@2x.svg" />
          <div>Not Really</div>
        </a>
        <a
          class="feedback-option"
          @click="goodExperience"
        >
          <img src="../images/Bee-Happy-Avatar@2x.svg" />
          <div>Love It!</div>
        </a>
      </div>
    </div>
  </BaseModal>
</template>

<script>
import BaseModal from './BaseModal.vue'
import helpers from '../helpers'

export default {
  name: 'ModalReviewApp',
  components: {
    BaseModal,
  },
  data() {
    return {
      isWeb: helpers.isWeb(),
    }
  },
  methods: {
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
.feedback-title {
  color: var(--beep-light);
  font-size: 34px;
  font-weight: bold;
  letter-spacing: -0.6px;
  line-height: 1.3;
  margin-bottom: 25px;
}

.feedback-subtitle {
  margin: 0 auto;
  color: var(--beep-light);
  height: 5vh;
  font-size: 19px;
  font-weight: 300;
  letter-spacing: -0.48px;
  line-height: 22px;
}

.feedback-options-container {
  margin-top: 80px;
  width: 100%;
}

.feedback-option {
  float: left;
  width: 50%;
  cursor: pointer;
}

.feedback-option > img {
  height: 125px;
}

.feedback-option > div {
  margin-top: 10px;
  color: var(--beep-light);
  font-weight: lighter;
}
</style>

<style>
.feedback-modal .beep-modal-toolbar {
  --background: var(--beep-secondary);
  --color: var(--beep-primary);
}

.feedback-modal .beep-modal-content {
  --background: var(--beep-secondary);
  text-align: center;
}

.feedback-modal ion-back-button.activated {
  --color: var(--beep-primary);
}
</style>
