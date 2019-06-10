<template>
  <ion-page class="ion-page beep-breach">
    <ion-header>
      <ion-toolbar class="beep-breach-toolbar">
        <ion-buttons slot="start">
          <ion-back-button class="beep-back-button" />
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <ion-list>
        <BreachItem :breach="breach" />
      </ion-list>
      <div class="information-content">
        <h1 class="beep-breach-header">Information</h1>
        <ion-list class="beep-breach-info">
          <ion-item class="beep-breach-item beep-breach-info-item">
            <span slot="start">Date of breach</span>
            <span
              slot="end"
              class="info-date"
              v-html="this.$breachesService.formatDate(breach.BreachDate)"
            />
          </ion-item>
          <ion-item class="beep-breach-item beep-breach-info-item">
            <span slot="start">Date added</span>
            <span
              slot="end"
              class="info-date"
              v-html="this.$breachesService.formatDate(breach.AddedDate)"
            />
          </ion-item>
          <ion-item class="beep-breach-item beep-breach-info-item">
            <span slot="start">Date of change</span>
            <span
              slot="end"
              class="info-date"
              v-html="this.$breachesService.formatDate(breach.ModifiedDate)"
            />
          </ion-item>
          <ion-item class="beep-breach-item beep-breach-info-item">
            <span slot="start">Number of breached accounts</span>
            <span
              slot="end"
              class="info-date"
              v-html="breach.PwnCount"
            />
          </ion-item>
        </ion-list>
        <h1 class="beep-breach-header">Description</h1>
        <p
          class="beep-breach-description"
          v-html="breach.Description"
        />
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
export default {
  name: 'PageBreach',
  components: {
    BreachItem: () => import('@/components/BreachItem.vue'),
  },
  props: {
    breachName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      breach: this.$breachesService.breaches.find(breach => {
        return breach.Name === this.breachName
      }),
    }
  },
}
</script>

<style>
.beep-breach .beep-breach-avatar {
  height: 120px;
  width: 120px;
}
</style>

<style scoped>
.beep-breach-toolbar {
  --ion-color-base: var(--beep-light);
}

.beep-back-button {
  --color: var(--beep-danger);
}

.beep-breach-info {
  margin-bottom: 10px;
}

.beep-breach-info-item {
  color: rgba(1, 1, 1, 0.5);
  font-size: 14px;
  letter-spacing: -0.34px;
  line-height: 17px;
}

.beep-breach-item {
  --inner-padding-end: 0;
}

.beep-breach-description {
  color: var(--beep-light-dark);
  font-size: 14px;
  letter-spacing: -0.34px;
  line-height: 26px;
}

.information-content {
  padding: 20px;
}

.info-date {
  color: var(--beep-light-dark);
}

/* iPhone support
 * first selector: X/Xs/X-MAX
 * second selector: XR
 */
@media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape),
  only screen and (min-device-width: 414px) and (max-device-width: 767px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
  ion-list {
    padding-right: env(safe-area-inset-right);
    padding-left: env(safe-area-inset-left);
  }
  .information-content {
    padding: 20px env(safe-area-inset-right) 20px env(safe-area-inset-left);
  }
}
</style>
