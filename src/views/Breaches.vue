<template>
  <ion-page class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/acc" />
        </ion-buttons>
        <ion-title v-html="account"/>
      </ion-toolbar>
      <ion-searchbar
        :value="filter"
        type="email"
        @ionChange="filterChanged"/>
    </ion-header>
    <ion-content
      padding
      class="content">
      <div class="counter">{{ breaches.length }} results found</div>
      <ion-list>
        <breach-item
          v-for="(breach, index) in breaches"
          :key="index"
          :breach="breach"/>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import BreachItem from '@/components/BreachItem.vue'
import toggleStatusbarColor from '@/mixins/toggleStatusbarColor'

export default {
  name: 'Breaches',
  components: {
    'breach-item': BreachItem,
  },
  mixins: [toggleStatusbarColor],
  data() {
    return {
      filter: this.$breachesService.filter,
      account: this.$breachesService.account,
      newStatusbarColor: this.$env('UNSAFE_STATUSBAR_COLOR'),
    }
  },
  computed: {
    breaches() {
      if (!this.filter.length) {
        return this.$breachesService.breaches
      }

      return this.$breachesService.breaches.filter(breach => {
        return breach.Title.toLowerCase().startsWith(this.filter.toLowerCase())
      })
    },
  },
  methods: {
    filterChanged(event) {
      this.filter = event.target.value
      this.$breachesService.filter = this.filter
    },
  },
}
</script>

<style>
.searchbar-input {
  color: var(--beep-light) !important;
  background-color: rgba(0, 0, 0, 0.15) !important;
}

.searchbar-search-icon {
  color: var(--beep-light) !important;
}

.searchbar-clear-icon,
.searchbar-clear-button,
.searchbar-input::placeholder {
  color: rgba(255, 255, 255, 0.7) !important;
}
</style>

<style scoped>
ion-toolbar {
  --ion-toolbar-background-color: var(--beep-primary);
  color: var(--beep-light);
}

ion-searchbar {
  background-color: var(--beep-primary);
}

ion-header {
  box-shadow: 0 1px 4px 0 rgba(255, 92, 93, 0.5), 0 1px 4px 0 rgba(0, 0, 0, 0.3);
}

ion-button {
  --ion-color-base: var(--beep-light);
  text-transform: none;
}

ion-back-button {
  --ion-color-base: var(--beep-light);
}

.counter {
  width: 100%;
  background-color: var(--beep-primary);
  color: var(--beep-light);
  font-size: 14px;
  font-weight: 900;
  letter-spacing: -0.34px;
  line-height: 17px;
  padding: 7px 10px;
}
</style>
