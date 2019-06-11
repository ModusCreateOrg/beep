<template>
  <ion-item
    class="beep-breach-item"
    v-on="breachItemActions"
  >
    <ion-avatar
      slot="start"
      class="beep-breach-avatar"
    >
      <div class="img-holder">
        <img
          :src="breach.LogoPath"
          :alt="breach.Title"
        />
      </div>
      <div class="avatar-shadow" />
    </ion-avatar>
    <ion-label>
      <h1 class="beep-breach-header">
        {{ breach.Title }}
        <img
          v-show="breach.IsVerified"
          class="beep-breach-verified"
          src="../images/Icon-Verified-Checkmark.svg"
          alt="(Breach verified)"
        />
      </h1>
      <p
        v-if="showFullDetails"
        class="beep-breach-date"
        v-html="this.$breachesService.formatDate(breach.BreachDate)"
      />
      <h2
        class="beep-breach-domain"
        v-html="this.$breachesService.formatDomain(breach.Domain)"
      />
    </ion-label>

    <slot name="end" />
  </ion-item>
</template>

<script>
export default {
  name: 'BreachItem',
  props: {
    breach: {
      type: Object,
      default: () => {},
    },
    showFullDetails: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    breachItemActions() {
      return this.showFullDetails ? { click: () => this.goToBreachDetail() } : {}
    },
  },
  methods: {
    goToBreachDetail() {
      this.$router.push('/breaches/' + this.breach.Name)
    },
  },
}
</script>

<style scoped>
.beep-breach-avatar {
  position: relative;
  height: 80px;
  width: 80px;
  margin: 20px;
  border-radius: 5px;
  background-color: #f7f7f7;
  display: table;
}

.beep-breach-avatar .avatar-shadow {
  position: absolute;
  height: 70%;
  width: 70%;
  z-index: -1;
  top: 35%;
  left: 15%;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.2);
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
}

.beep-breach-avatar .img-holder {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.beep-breach-avatar .img-holder > img {
  max-width: 70%;
  min-width: 1px;
  max-height: 70%;
  -o-object-fit: contain;
  object-fit: contain;
  border-radius: 0;
  overflow: visible;
}

.beep-breach-header {
  height: 22px;
  color: var(--beep-light-dark);
  font-size: 18px;
  font-weight: bold;
  letter-spacing: -0.43px;
  line-height: 22px;
}

.beep-breach-header .beep-breach-verified {
  margin-left: 5px;
  margin-bottom: -3px;
  width: 1.25rem;
  font-weight: normal;
  font-size: 80%;
}

.beep-breach-domain {
  height: 26px;
  color: var(--beep-light-dark);
  font-size: 14px;
  letter-spacing: -0.34px;
  line-height: 26px;
}

.beep-breach-date {
  height: 15px;
  color: var(--ion-dark-transparent);
  font-size: 12px;
  letter-spacing: -0.29px;
  line-height: 15px;
  margin-bottom: 10px;
}
</style>
