<template>
  <ion-page class="ion-page">
    <ion-content class="content" padding>
      <div class="title">
        Check if you've been hacked
      </div>
      <div class="buttons">
        <div class="btn-holder" @click="goToAcc">
          <div class="square-btn">
            <div class="square-btn-content">
              <div class="square-btn-icon"><img src="../images/Icon-Account.svg" alt="Account"></div>
              <div class="square-btn-text">Account</div>
            </div>
            <div class="square-btn-shadow"></div>
          </div>
        </div>
        <div class="btn-holder" @click="goToPwd">
          <div class="square-btn">
            <div class="square-btn-content">
              <div class="square-btn-icon"><img src="../images/Icon-Password.svg" alt="Account"></div>
              <div class="square-btn-text">Password</div>
            </div>
            <div class="square-btn-shadow"></div>
          </div>
        </div>
      </div>
      <div class="help-message">
        How does it work?
      </div>
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

<style>

.title {
  margin-top: 30vh;
  height: 14vh;
  display: inline-block;
  margin-left: 14%;
  width: 72%;
  color: #1B1B1B;
  font-family: Khula, Arial, serif;
  font-size: 4.8vh;
  font-weight: bold;
  letter-spacing: -1px;
  text-align: center;
}

.buttons {
  display: inline-block;
  margin-top: 7vh;
  height: 19vh;
  margin-left: 8%;
  width: 84%;
  position: relative;
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
  background-color: #FFFFFF;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.1);
  /*box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1), 0 5px 7px rgba(0, 0, 0, 0.2);*/
}

.square-btn:after {
  content: "";
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
  text-align: center;
  margin-bottom: 10%;
  margin-top: 15%;
  width: 100%;
  height: 35%;
}

.square-btn-text {
  width: 100%;
  color: #1B1B1B;
  font-family: Lato, serif;
  font-size: 18px;
  font-weight: 300;
  letter-spacing: -0.48px;
  line-height: 22px;
  text-align: center;
}

.help-message {
  margin-top: 18vh;
  width: 100%;
  height: 10vh;
  color: #5C5C5C;
  font-family: Lato, serif;
  font-weight: 300;
  letter-spacing: -0.48px;
  font-size: 2.5vh;
  text-align: center;
  text-decoration: underline;
}
</style>
