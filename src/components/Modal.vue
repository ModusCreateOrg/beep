<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="closeModal">
            <ion-icon size="large" name="close"/>
          </ion-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button clear @click="closeModal">
            Done
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content
      class="content"
      padding>
      <slot/>
    </ion-content>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    title: { type: String, default: '' },
  },
  mounted() {
    this.createModal()
  },
  beforeDestroy() {
    this.closeModal()
  },
  methods: {
    async closeModal() {
      if (this.controller && this.controller.dismiss) {
        await this.controller.dismiss()
        this.$emit('toggleModal')
      }
    },
    async createModal() {
      this.controller = await this.$ionic.newModalController({ component: this.$el })
      this.controller.present()
      this.controller
        .onDidDismiss()
        .then(() => this.closeModal())
        .catch(e => console.error(e))
    },
  },
}
</script>

<style scoped>
ion-toolbar {
  --ion-color-base: var(--beep-light);
}

ion-button,
ion-button.button-clear,
ion-button.button.button-clear.button-md.button-clear-md {
  --ion-color-base: var(--beep-primary);
  text-transform: none;
}
</style>
