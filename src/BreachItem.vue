<template>
  <ion-item @click="viewBreach">
    <ion-avatar slot="start">
      <div class="img-holder">
        <img :src="this.$breachesService.getImageURL(breach)"/>
      </div>
      <div class="avatar-shadow"></div>
    </ion-avatar>
    <ion-label>
      <h1>{{breach.Title}}&nbsp;<img v-show="breach.IsVerified" src="../images/Icon-Verified-Checkmark.svg"/></h1>
      <p v-html="this.$breachesService.formatDate(breach.BreachDate)"></p>
      <h2 v-html="this.$breachesService.formatDomain(breach.Domain)"></h2>
    </ion-label>
    <ion-icon name="arrow-forward" slot="end"></ion-icon>
  </ion-item>
</template>

<script>
export default {
  name: 'BreachItem',
  props: ['breach'],
  methods: {
    viewBreach() {
      this.$router.push('/breaches/' + this.breach.Name)
    },
  }
}
</script>

<style scoped>
ion-item {
  --padding-start: 0;
  --inner-padding-end: 0;
  --ion-color-shade: rgba(0, 0, 0, 0.15);
  --inner-border-width: 0;
  --border-width: 0 0 0.55px 0;
}

ion-avatar {
  position: relative;
  height: 80px;
  width: 80px;
  margin: 20px;
  border-radius: 5px;
  /*background-color: #E0E0E0;*/
  background-color: #F7F7F7;
  display: table;
}

.avatar-shadow {
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

ion-avatar .img-holder {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

ion-avatar .img-holder img {
  max-width: 70%;
  min-width: 1px;
  max-height: 70%;
  -o-object-fit: contain;
  object-fit: contain;
  border-radius: 0;
  overflow: visible;
}

h1 {
  height: 22px;
  color: #555555;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: -0.43px;
  line-height: 22px;
}

h1 img {
  margin-left: 5px;
  margin-bottom: -3px;
}

p {
  height: 15px;
  color: rgba(27, 27, 27, 0.5);
  font-size: 12px;
  letter-spacing: -0.29px;
  line-height: 15px;
  margin-bottom: 10px;
}

h2 {
  height: 26px;
  color: #555555;
  font-size: 14px;
  letter-spacing: -0.34px;
  line-height: 26px;
}

ion-icon {
  --ion-color-base: #C7C7CC;
}
</style>
