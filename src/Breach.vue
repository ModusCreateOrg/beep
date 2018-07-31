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
      <ion-list>
        <ion-item>
          <ion-avatar slot="start">
            <div class="img-holder">
              <img :src="this.$breachesService.getImageURL(breach)"/>
          </div>
            <div class="avatar-shadow"></div>
          </ion-avatar>
          <ion-label>
            <h1>{{breach.Title}}&nbsp;<img v-show="breach.IsVerified" src="../images/Icon-Verified-Checkmark.svg"/></h1>
            <h2 v-html="this.$breachesService.formatDomain(breach.Domain)"></h2>
          </ion-label>
        </ion-item>
      </ion-list>
      <div class="information-content">
        <h1>Information</h1>
        <ion-list>
          <ion-item class="info-item">
            <span slot="start">Date of breach</span>
            <span class="info-date" slot="end" v-html="this.$breachesService.formatDate(breach.BreachDate)"></span>
          </ion-item>
          <ion-item class="info-item">
            <span slot="start">Date added</span>
            <span class="info-date" slot="end" v-html="this.$breachesService.formatDate(breach.AddedDate)"></span>
          </ion-item>
          <ion-item class="info-item">
            <span slot="start">Date of change</span>
            <span class="info-date" slot="end" v-html="this.$breachesService.formatDate(breach.ModifiedDate)"></span>
          </ion-item>
          <ion-item class="info-item">
            <span slot="start">Number of breached accounts</span>
            <span class="info-date" slot="end" v-html="breach.PwnCount"></span>
          </ion-item>
        </ion-list>
        <h1>Description</h1>
        <p v-html="breach.Description"></p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
export default {
  name: 'Breach',
  props: ['breach_name'],
  data() {
    return {
      breach: this.$breachesService.breaches.find((breach) => {
        return breach.Name === this.breach_name
      })
    }
  }
}
</script>

<style scoped>
ion-toolbar {
  --ion-color-base: #FFFFFF;
}

ion-button {
  --ion-color-base: var(--beep-primary);
  text-transform: none;
}

ion-back-button {
  --ion-color-base: var(--beep-primary);
}

ion-list {
  margin-bottom: 10px;
}

ion-item {
  --padding-start: 0;
  --inner-padding-end: 0;
  --ion-color-shade: rgba(0, 0, 0, 0.15);
  --inner-border-width: 0;
  --border-width: 0 0 0.55px 0;
}

ion-avatar {
  position: relative;
  height: 120px;
  width: 120px;
  margin: 20px;
  border-radius: 5px;
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
  color: #555555;
  font-size: 14px;
  letter-spacing: -0.34px;
  line-height: 26px;
}

h2 {
  height: 26px;
  color: #555555;
  font-size: 14px;
  letter-spacing: -0.34px;
  line-height: 26px;
}

.information-content {
  padding: 20px;
}

.info-item {
  color: rgba(1, 1, 1, 0.5);
  font-size: 14px;
  letter-spacing: -0.34px;
  line-height: 17px;
}

.info-date {
  color: #555555;
}
</style>
