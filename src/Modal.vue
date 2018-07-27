<template>
  <div class="modal-template" :id="id">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button icon-only class="dismiss-modal">
            <ion-icon size="large" name="close"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{title}}</ion-title>
        <ion-buttons slot="end">
          <ion-button clear class="dismiss-modal">
            Done
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content" padding>
      <slot/>
    </ion-content>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: ['title'],
  data() {
    return {
      id: null
    }
  },
  mounted() {
    this.id = `modal-${this._uid}`
  },
  methods: {
    createModal() {
      const template = document.getElementById(this.id).cloneNode(true)
      template.classList.remove('modal-template')

      this.$ionic
        .newModalController({
          component: template
        })
        .then(o => o.present())
        .catch(err => console.error(err))
    }
  }
}
</script>

<style>
@import '../styles/common-styles.css';
</style>

<style scoped>
ion-toolbar {
  --ion-color-base: #FFFFFF;
}

ion-button {
  --ion-color-base: var(--beep-primary);
  text-transform: none;
}

.modal-template {
  display: none;
}
</style>
