<template>
    <ion-page class="ion-page">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Account page</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content padding>
            <form @submit="checkAccount" autocomplete="off">
                <ion-input type="email" placehoder="Email" :value="email"
                           @input="email = $event.target.value"></ion-input>
                <ion-button expand="full" type="submit" :disabled="!validateEmail()">
                    <span v-if="requestPending">
                        <ion-spinner></ion-spinner>
                    </span>
                    <span v-else>Have I been pwned?</span>
                </ion-button>
            </form>
            <div>
                <ion-card no-margin v-if="isSubmitted">
                    <ion-card-content>
                        <p v-html="pwnedSummary" text-center></p>
                    </ion-card-content>
                </ion-card>
                <ion-card v-for="(breach,index) in breaches" :key="index" no-margin>
                    <ion-card-content>
                        <ion-card-title>
                            <div class="breach-head">
                                <div class="breach-name">
                                    <h1>{{breach.Title}}</h1>
                                </div>
                                <div class="breach-image-holder">
                                    <img :src="baseImageUrl + breach.Name + '.' + breach.LogoType">
                                </div>
                            </div>
                        </ion-card-title>
                        <ion-grid>
                            <ion-row>
                                <ion-col>
                                    <ion-item>
                                        <ion-badge color="light">
                                            {{formatDate(breach.BreachDate)}}
                                        </ion-badge>
                                    </ion-item>
                                </ion-col>
                                <ion-col>
                                    <ion-item>
                                        <ion-icon name="people" color="primary"></ion-icon>
                                        <ion-badge>
                                            {{breach.PwnCount}}
                                        </ion-badge>
                                    </ion-item>
                                </ion-col>
                            </ion-row>
                        </ion-grid>
                        <p v-html="breach.Description"></p>
                    </ion-card-content>
                </ion-card>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
    import axios from 'axios'

    const baseURL = "https://haveibeenpwned.com/api/v2/breachedaccount/"

    export default {
        name: 'acc',
        data: function () {
            return {
                email: '',
                requestPending: false,
                isSubmitted: false,
                pwnedSummary: '',
                baseImageUrl: 'https://haveibeenpwned.com/Content/Images/PwnedLogos/',
                breaches: []
            }
        },
        methods: {
            validateEmail() {
                return !!(this.email = this.email.trim())
            },
            async checkAccount(e) {
                e.preventDefault()

                // Check for empty passwords or pending requests
                if (!this.validateEmail() || this.requestPending) {
                    return
                }

                this.requestPending = true

                const loading = await this.$glob.api.newLoadingController({
                    content: 'Fetching breach details...',
                })
                loading.present()

                axios.get(baseURL + this.email + '?includeUnverified=true')
                    .then(response => {
                        this.breaches = response.data
                        this.pwnedSummary =
                            `<i>${this.email}</i> is
                            <strong>
                               <ion-badge color="danger">pwned ${this.breaches.length} times</ion-badge>
                            </strong>`
                    })
                    .catch(error => {
                        this.breaches = [];
                        if (error.response.status !== 404) {
                            this.pwnedSummary = 'Oops something went wrong...'
                            return
                        }

                        this.pwnedSummary =
                            `<i>${this.email}</i> is
                            <strong>
                               <ion-badge color="success">NOT pwned</ion-badge>
                            </strong>`
                    })
                    .finally(() => {
                        this.email = ''
                        this.isSubmitted = true
                        this.requestPending = false
                        loading.dismiss()
                    })
            }, formatDate(date) {
                date = new Date(date);
                const monthNames = [
                    "Jan", "Feb", "Mar", "Apr",
                    "May", "Jun", "Jul", "Aug",
                    "Sep", "Oct", "Nov", "Dec"
                ];

                let day = date.getDate();
                let monthIndex = date.getMonth();
                let year = date.getFullYear();

                return day + ' ' + monthNames[monthIndex] + ' ' + year;
            }
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
</style>
