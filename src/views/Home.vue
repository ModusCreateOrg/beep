<template>
  <ion-page class="ion-page">
    <ion-header>
      <ion-toolbar>
        <img src="../images/Beep-Logo.svg" class="logo" alt="Beep logo"/>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content">
      <h1>
        Check if you've<br>
        been hacked
      </h1>
      <div class="buttons">
        <div class="btn-holder" @click="goToAcc">
          <div class="square-btn">
            <div class="square-btn-content">
              <div class="square-btn-icon">
                <img src="../images/Icon-Account.svg" alt="Account logo"/>
              </div>
              <div class="square-btn-text">Account</div>
            </div>
            <div class="square-btn-shadow"/>
          </div>
        </div>
        <div class="btn-holder" @click="goToPwd">
          <div class="square-btn">
            <div class="square-btn-content">
              <div class="square-btn-icon">
                <img src="../images/Icon-Password.svg" alt="Password logo"/>
              </div>
              <div class="square-btn-text">Password</div>
            </div>
            <div class="square-btn-shadow"/>
          </div>
        </div>
      </div>
      <h2 @click="toggleModal"><span>How does it work?</span></h2>
    </ion-content>
  </ion-page>
</template>

<script>
import hasModal from '@/mixins/hasModal'

export default {
  name: 'Home',
  mixins: [hasModal],
  methods: {
    goToAcc() {
      this.$router.push('/acc')
    },
    goToPwd() {
      this.$router.push('/pwd')
    },
  },
  mounted() {
    this.modal = () => import('@/components/HowDoesItWorkModal.vue')
  },
}
</script>

<style scoped>
ion-page {
  text-align: center;
  --ion-text-color: var(--beep-secondary);
}

.logo {
  display: inline-block;
  width: 2.8125rem;
}

h1 {
  height: 14vh;
  margin-top: 15vh;
  color: var(--beep-dark);
  font-size: 32px;
  font-weight: bolder;
  letter-spacing: -1px;
}

.buttons {
  position: relative;
  height: 19vh;
  margin-top: 7vh;
  margin-left: 8%;
  width: 84%;
  clear: both;
}

.btn-holder {
  position: relative;
  float: left;
  width: 45%;
}

.btn-holder + .btn-holder {
  margin-left: 10%;
}

.square-btn {
  position: relative;
  width: 100%;
  border-radius: 5px;
  background-color: var(--beep-light);
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.1);
}

.square-btn:after {
  content: '';
  display: block;
  padding-bottom: 100%;
}

.square-btn-shadow {
  position: absolute;
  height: 80%;
  width: 80%;
  z-index: -1;
  top: 25%;
  left: 10%;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.15);
  -webkit-filter: blur(10px);
  -moz-filter: blur(10px);
  -o-filter: blur(10px);
  -ms-filter: blur(10px);
  filter: blur(10px);
}

.square-btn-content {
  position: absolute;
  width: 100%;
  height: 100%;
}

.square-btn-icon {
  margin-bottom: 10%;
  margin-top: 15%;
  width: 100%;
  height: 35%;
}

.square-btn-icon img {
  height: 100%;
}

.square-btn-text {
  width: 100%;
  color: var(--beep-dark);
  font-size: 15px;
  font-weight: 300;
  letter-spacing: -0.48px;
  line-height: 22px;
}

h2 {
  height: 10vh;
  margin-top: 23vh;
  font-size: 18px;
  font-weight: 300;
  letter-spacing: -0.48px;
  display: inline-block;
}

h2 span {
  border-bottom: 1px solid var(--beep-secondary);
}

@media screen and (min-height: 650px) {
  h1 {
    font-size: 40px;
  }
}
</style>
