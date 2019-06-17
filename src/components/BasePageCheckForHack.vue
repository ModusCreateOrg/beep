<template>
  <ion-page class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/" />
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button
            clear
            class="check-button"
            :disabled="!isValid"
            @click="checkForHack"
          >
            <ion-spinner v-if="requestPending" />
            <template v-else>Check</template>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content
      padding
      class="check-hack-content"
    >
      <div class="check-hack-subtitle">
        <slot name="subtitle" />
      </div>
      <div class="input-holder">
        <form
          action="#"
          @submit.prevent="checkForHack"
        >
          <slot name="input-form" />

          <input
            type="submit"
            class="check-hack-submit"
          />
        </form>
      </div>

      <slot name="end" />
    </ion-content>
  </ion-page>
</template>

<script>
import network from '@/mixins/network'

export default {
  mixins: [network],
  props: {
    title: {
      type: String,
      required: true,
    },
    isValid: {
      type: Boolean,
      required: true,
    },
    requestPending: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    checkForHack(event) {
      if (event) {
        event.preventDefault()
      }

      if (!this.checkNetworkStatus()) {
        return this.showNetworkAlert()
      }

      if (this.isValid && !this.requestPending) {
        this.$emit('check-for-hack')
      }
    },
  },
}
</script>

<style scoped>
.check-button.button-disabled {
  --color: var(--beep-light-dark);
}

.check-hack-subtitle {
  color: var(--ion-dark-transparent);
  width: 100%;
  font-size: 12px;
  font-weight: normal;
  letter-spacing: -0.29px;
  line-height: 1.4;
  text-align: center;
}

.check-hack-content ion-item.item {
  --border-style: none;
  --padding-start: 7%;
  --ion-text-color: var(--beep-secondary);
  --inner-border-width: 0;
}

.check-hack-content .item-label > ion-label {
  width: 100%;
  margin: 10px 8px -15px 0;
  color: var(--beep-secondary);
  font-size: 18px;
  letter-spacing: -0.43px;
  line-height: 18px;
}

.check-hack-content .item-input > ion-input {
  height: 56px;
  font-size: 25px;
  color: var(--beep-secondary);
  font-weight: 300;
  letter-spacing: -0.63px;
  line-height: 25px;
}

.check-hack-submit {
  visibility: hidden;
  position: absolute;
}
</style>
