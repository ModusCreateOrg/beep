<template>
  <ion-page class="ion-page">
    <ion-header>
      <ion-toolbar class="beep-result-toolbar">`
        <ion-buttons slot="start">
          <ion-back-button
            class="beep-color-light"
            default-href="/pwd"
          />
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content
      padding
      class="content"
    >
      <h1 class="beep-result-title">Congratulations!</h1>
      <h2
        class="beep-result-subtitle"
        v-html="buildSubtitle()"
      />
      <h3
        class="beep-result-action beep-link"
        @click="check"
      >
        Check Another {{ isAccount ? 'Account' : 'Password' }}
      </h3>
      <img
        class="bee"
        src="../images/Icon-Character-Positive.svg"
        alt="Character positive"
      />
      <h3
        class="beep-result-action beep-link"
        @click="next"
      >
        Next: Check {{ isAccount ? 'Password' : 'Account' }}
      </h3>
    </ion-content>
  </ion-page>
</template>

<script>
import toggleStatusbarColor from '@/mixins/toggleStatusbarColor'

export default {
  name: 'PageSafe',
  mixins: [toggleStatusbarColor],
  data() {
    return {
      account: this.$breachesService.account,
      isAccount: this.$breachesService.account.length > 0,
      newStatusbarColor: this.$helpers.env('SAFE_STATUSBAR_COLOR'),
    }
  },
  methods: {
    buildSubtitle() {
      if (this.isAccount) {
        return `This account <strong>${this.account}</strong><br/>has not been compromised`
      }

      return 'This password has not been<br/>compromised'
    },
    next() {
      if (this.isAccount) {
        this.$router.replace('/pwd')
      } else {
        this.$router.replace('/acc')
      }
    },
    check() {
      this.$router.back()
    },
  },
}
</script>

<style scoped>
.ion-page {
  --ion-text-color: var(--beep-light);
  --ion-background-color: var(--beep-success);
  text-align: center;
}

.beep-result-toolbar {
  --background: var(--beep-success);
}

.beep-result-subtitle {
  margin-bottom: 2vh;
}

.bee {
  height: 45vh;
  margin-top: 2vh;
  margin-bottom: 2vh;
}
</style>
