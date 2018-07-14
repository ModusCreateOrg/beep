<template>
  <ion-page class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button/>
        </ion-buttons>
        <ion-title>home</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content
      class="content"
      padding>
      <ion-button
        expand="full"
        type="submit"
        @click="goToAcc">
        Check Account
      </ion-button>
      <ion-button
        expand="full"
        type="submit"
        @click="goToPwd">
        Check Password
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    goToAcc() {
      this.$router.push('/acc')
    },
    goToPwd() {
      this.$router.push('/pwd')
    },
  },
}
</script>
