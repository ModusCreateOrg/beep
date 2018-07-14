<template>
  <ion-card no-margin>
    <ion-card-content>
      <ion-card-title>
        <div class="breach-head">
          <div class="breach-name">
            <h1>{{ breach.Title }}</h1>
          </div>
          <div class="breach-image-holder">
            <img :src="getImageURL(breach)">
          </div>
        </div>
      </ion-card-title>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-item>
              <ion-badge color="light">
                {{ formatDate(breach.BreachDate) }}
              </ion-badge>
            </ion-item>
          </ion-col>
          <ion-col>
            <ion-item>
              <ion-icon 
                name="people" 
                color="primary"/>
              <ion-badge>
                {{ breach.PwnCount }}
              </ion-badge>
            </ion-item>
          </ion-col>
        </ion-row>
      </ion-grid>
      <p v-html="breach.Description"/>
    </ion-card-content>
  </ion-card>
</template>

<script>
const baseImageURL = 'https://haveibeenpwned.com/Content/Images/PwnedLogos/'

export default {
  name: 'Breach',
  props: {
    breach: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    getImageURL(breach) {
      return baseImageURL + breach.Name + '.' + breach.LogoType
    },
    formatDate(d) {
      const date = new Date(d)
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]

      return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`
    },
  },
}
</script>

<style>
ion-icon {
  font-size: 25px;
}

ion-card {
  margin: 30px 0 !important;
  width: 100% !important;
}

.breach-head {
  padding-top: 10px;
  width: 100%;
  display: inline-block;
  clear: both;
}

.breach-head .breach-name {
  max-width: calc(100% - 80px);
  float: left;
  height: 40px;
  width: 100%;
  min-height: 90%;
  text-align: center;
  display: table;
  padding-left: 5px;
  padding-right: 5px;
}

.breach-head .breach-name h1 {
  display: table-cell;
  vertical-align: middle;
}

.breach-image-holder {
  float: right;
  width: 80px;
  min-height: 40px;
  height: 100%;
  position: relative;
}

.breach-image-holder img {
  max-height: 40px;
  max-width: 80px;
  position: absolute;
  margin: auto;
  width: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

ion-spinner * {
  stroke: white !important;
}
</style>
