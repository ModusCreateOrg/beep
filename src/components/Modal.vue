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
    <ion-content padding>
      <div class="modal-content">
        <slot/>
      </div>
    </ion-content>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    title: { type: String, default: '' },
  },
  methods: {
    closeModal() {
      this.$ionic.modalController.dismiss()
    },
  },
}
</script>

<style scoped>
.modal-content {
  padding: 5vh 20px;
}

/* iPhone support
 * first selector: X/Xs/X-MAX 
 * second selector: XR
 */
@media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape),
  only screen and (min-device-width: 414px) and (max-device-width: 767px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
  .modal-content {
    padding-right: env(safe-area-inset-right);
    padding-left: env(safe-area-inset-left);
  }
}

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
