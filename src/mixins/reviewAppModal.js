import reviewAppModal from '@/components/ReviewAppModal.vue'

export default {
  data() {
    return {
      reviewAppModal,
    }
  },
  methods: {
    async tryPromptAppReview() {
      if (this.$reviewAppService.shouldPromptAppReview()) {
        await this.toggleModal(this.reviewAppModal)
        this.$reviewAppService.storeReviewRejected = true
      }
    },
  },
}
