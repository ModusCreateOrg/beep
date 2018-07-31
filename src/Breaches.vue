<template>
  <ion-page class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button/>
        </ion-buttons>
        <ion-title v-html="account"></ion-title>
        <ion-buttons slot="end">
        </ion-buttons>
      </ion-toolbar>
      <ion-searchbar type="email" :value="filter" v-on:ionChange="filterChanged">
      </ion-searchbar>
    </ion-header>
    <ion-content class="content" padding>
      <div class="counter">{{breaches.length}} results found</div>
      <ion-list>
        <breach-item v-for="(breach, index) in breaches" :key="index" :breach="breach"/>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import BreachItem from './BreachItem.vue'

export default {
  name: 'Breaches',
  components: {
    'breach-item': BreachItem
  },
  data() {
    return {
      filter: this.$breachesService.filter,
      account: this.$breachesService.account,
    }
  },
  methods: {
    filterChanged(event) {
      this.filter = event.target.value
      this.$breachesService.filter = this.filter
    }
  },
  computed: {
    breaches() {
      if (!this.filter.length) {
        return this.$breachesService.breaches
      }

      return this.$breachesService.breaches.filter((breach) => {
        return breach.Title.toLowerCase().startsWith(this.filter.toLowerCase())
      });
    }
  },
}
</script>

<style>
.searchbar-input {
  color: #FFFFFF !important;
  background-color: rgba(0, 0, 0, 0.15) !important;
}

.searchbar-search-icon {
  color: #FFFFFF !important;
}

.searchbar-clear-icon,
.searchbar-clear-button,
.searchbar-input::placeholder {
  color: rgba(255, 255, 255, 0.7) !important;
}
</style>

<style scoped>
ion-toolbar {
  --ion-color-base: var(--beep-primary);
  color: #FFFFFF;
}

ion-searchbar {
  background-color: var(--beep-primary);
}

ion-header {
  box-shadow: 0 1px 4px 0 rgba(255, 92, 93, 0.5), 0 1px 4px 0 rgba(0, 0, 0, 0.3);
}

ion-button {
  --ion-color-base: #FFFFFF;
  text-transform: none;
}

ion-back-button {
  --ion-color-base: #FFFFFF;
}

.counter {
  height: 17px;
  width: 100%;
  background-color: var(--beep-primary);
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 900;
  letter-spacing: -0.34px;
  line-height: 17px;
  padding: 7px 10px;
}
</style>
