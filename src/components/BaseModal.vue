<template>
  <div>
    <ion-header>
      <ion-toolbar :class="className">
        <ion-buttons slot="start">
          <ion-button @click="closeModal" :class="className">
            <ion-icon size="large" name="close"/>
          </ion-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button clear @click="closeModal" :class="className">
            Done
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content padding :class="className">
      <div class="modal-content">
        <slot />
      </div>
    </ion-content>
  </div>
</template>

<script>
export default {
  name: 'BaseModal',
  props: {
    title: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
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

ion-toolbar.feedback-modal {
  --background: var(--beep-secondary);
  color: var(--beep-primary);
}
ion-content.feedback-modal {
  --background: var(--beep-secondary);
  text-align: center;
}
ion-back-button.feedback-modal {
  color: var(--beep-primary);
}
ion-button.feedback-modal {
  color: var(--beep-primary);
}
</style>
