<template>
  <div
    :id="id"
    class="modal-template">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button class="dismiss-modal">
            <ion-icon size="large" name="close"/>
          </ion-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button
            clear
            class="dismiss-modal">
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
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      id: null,
    }
  },
  mounted() {
    this.id = `modal-${this._uid}`
  },
  methods: {
    createModal() {
      const template = document.getElementById(this.id).cloneNode(true)
      template.classList.remove('modal-template')

      const buttons = template.querySelectorAll('.dismiss-modal')

      this.$ionic
        .newModalController({ component: template })
        .then(modalController => {
          modalController.present()

          buttons.forEach(item => {
            item.addEventListener('click', () => {
              modalController.dismiss()
              this.$emit('toggleModal')
            })
          })
          this.$emit('toggleModal')
          return modalController
        })
        .catch(err => console.error(err))
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

.modal-template {
  visibility: hidden;
}
</style>
