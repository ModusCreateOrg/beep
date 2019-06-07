<template>
  <div>
    <ion-header>
      <ion-toolbar class="beep-modal-toolbar">
        <ion-buttons slot="start">
          <ion-button
            @click="closeModal"
            class="beep-toolbar-button"
          >
            <ion-icon
              size="large"
              name="close"
            />
          </ion-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button
            clear
            class="beep-toolbar-button"
            @click="closeModal"
          >
            Done
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content padding class="beep-modal-content">
      <div class="beep-modal-content-padding">
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
  },
  methods: {
    closeModal() {
      this.$ionic.modalController.dismiss()
    },
  },
}
</script>

<style scoped>
.beep-modal-toolbar {
  --ion-color-base: var(--beep-light);
}

.beep-toolbar-button,
.beep-toolbar-button.button-clear {
  --color: var(--beep-primary);
  --color-activated: var(--beep-primary);
  text-transform: none;
}

.beep-modal-content-padding {
  padding: 5vh 20px;
}

/* iPhone support
 * first selector: X/Xs/X-MAX
 * second selector: XR
 */
@media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape),
  only screen and (min-device-width: 414px) and (max-device-width: 767px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
  .beep-modal-content-padding {
    padding-right: env(safe-area-inset-right);
    padding-left: env(safe-area-inset-left);
  }
}
</style>
