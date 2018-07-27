<template>
  <ion-page class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button/>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content" padding>
      <h1>Caution!</h1>
      <h2>Your password has been<br/>compromised across</h2>
      <h1 class="count">573</h1>
      <h2 class="count-text">websites</h2>
      <img src="../images/Icon-Character-Negative.svg">
      <h3>
        <span>What should you do?</span>
      </h3>
      <h3>
        <span>Next: Check Account</span>
      </h3>
    </ion-content>
  </ion-page>
</template>

<script>
export default {
  name: 'Unsafe'
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
  --background: var(--beep-danger);
}

ion-back-button {
  --ion-color-base: #fff;
}

ion-content {
  background-color: var(--beep-danger);
}

h1 {
  height: 8vh;
  margin-top: 5vh;
  margin-bottom: 0;
  font-size: 35px;
  font-weight: bold;
  letter-spacing: -1px;
  display: inline-block;
}

h1.count {
  height: auto;
  margin: 0;
  font-size: 50px;
  font-weight: bold;
  letter-spacing: -1px;
}

h2 {
  height: 10vh;
  margin: 0;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.5;
}

h2.count-text {
  height: auto;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.5;
}

img {
  height: 40vh;
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

  h2, h2.count-text {
    font-size: 20px;
  }

  h3 {
    font-size: 20px;
    line-height: 20px;
  }
}
</style>
