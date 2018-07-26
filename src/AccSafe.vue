<template>
  <ion-page class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button/>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content success-content" padding>
      <h1>Congratulations!</h1>
      <h2>
        Your account <strong>email@website.com</strong><br>
        has not been compromised
      </h2>
      <h3>
        <span>Check another account</span>
      </h3>
      <img src="../images/Icon-Character-Positive.svg">
      <h3>
        <span>Next: Check Password</span>
      </h3>
    </ion-content>
  </ion-page>
</template>

<script>
export default {
  name: 'AccSafe',
}
</script>

<style>
@import '../styles/common-styles.css';
</style>

<style scoped>

ion-page {
  text-align: center;
  --ion-text-color: #FFFFFF;
}

ion-toolbar {
  --background: var(--beep-success);
}

ion-back-button {
  --ion-color-base: #fff;
}

ion-content {
  background-color: var(--beep-success);
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
  font-weight: bold;
  letter-spacing: -1px;
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
