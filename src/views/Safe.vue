  <template>
  <ion-page class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/pwd" />
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content
      class="content"
      padding>
      <h1>Congratulations!</h1>
      <h2 v-html="buildSubtitle()"/>
      <h3 @click="check">
        <span>Check Another {{ isAccount ? 'Account' : 'Password' }}</span>
      </h3>
      <img src="../images/Icon-Character-Positive.svg" alt="Character positive"/>
      <h3 @click="next">
        <span>Next: Check {{ isAccount ? 'Password' : 'Account' }}</span>
      </h3>
    </ion-content>
  </ion-page>
</template>

<script>
import toggleStatusbarColor from '@/mixins/toggleStatusbarColor'

export default {
  name: 'Safe',
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
        return
      }
      this.$router.replace('/acc')
    },
    check() {
      this.$router.back()
    },
  },
}
</script>

<style scoped>
ion-page {
  text-align: center;
  --ion-text-color: var(--beep-light);
  --ion-background-color: var(--beep-success);
}

ion-toolbar {
  --background: var(--beep-success);
}

ion-back-button {
  --color: var(--beep-light);
}

h1 {
  height: 8vh;
  margin-top: 5vh;
  font-size: 35px;
  font-weight: bold;
  letter-spacing: -1px;
  display: inline-block;
}

h2 {
  height: 10vh;
  margin-top: 0;
  margin-bottom: 2vh;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.5;
}

img {
  height: 45vh;
  margin-top: 2vh;
  margin-bottom: 2vh;
}

h3 {
  margin: 0 auto;
  height: 5vh;
  font-size: 16px;
  font-weight: 300;
  letter-spacing: -0.48px;
  line-height: 16px;
}

span {
  border-bottom: 1px solid #fff;
}

@media screen and (min-height: 650px) {
  h1 {
    font-size: 40px;
  }

  h2 {
    font-size: 20px;
  }

  h3 {
    font-size: 20px;
    line-height: 20px;
  }
}
</style>
