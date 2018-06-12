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

        <ion-content class="content" padding>
            <ion-list>
                <ion-item>
                    <ion-icon name="mail" slot="start"></ion-icon>
                    <ion-input type="email" placehoder="Email" :value="email" @input="email = $event.target.value"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-checkbox @change="toggleIncludeUnverified" :checked="includeUnverified"></ion-checkbox>
                    <ion-label>Include Unverified</ion-label>
                </ion-item>
            </ion-list>

            <ion-button expand="full" @click="checkAccount" :disabled="!validateEmail()">
                <span v-if="requestPending">
                    <ion-spinner></ion-spinner>
                </span>
                <span v-else>Have I been pwned?</span>
            </ion-button>

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
                                    <img :src="getImageURL(breach)">
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
const baseImageURL = 'https://haveibeenpwned.com/Content/Images/PwnedLogos/'

export default {
    name: 'acc',
    data: function () {
        return {
            email: '',
            pwnedSummary: '',
            requestPending: false,
            isSubmitted: false,
            includeUnverified: false,
            breaches: [],
        }
    },
    methods: {
        validateEmail() {
            return !!(this.email = this.email.trim())
        },
        getURL() {
            let url = baseURL + this.email
            if (this.includeUnverified) {
                url += '?includeUnverified=true'
            }
            return url
        },
        getImageURL(breach) {
            return baseImageURL + breach.Name + '.' + breach.LogoType
        },
        toggleIncludeUnverified() {
            this.includeUnverified = !this.includeUnverified
        },
        checkAccount() {
            if (this.validateEmail() && !this.requestPending) {
                this.sendRequest()
            }
        },
        async sendRequest() {
            const loading = await this.$glob.api.newLoadingController({
                content: 'Fetching breach details...',
            })

            loading.present()
            this.requestPending = true

            axios.get(this.getURL())
                .then(response => {
                    this.breaches = response.data
                    this.buildPwnedSummary()
                })
                .catch(error => {
                    this.breaches = []
                    if (error.response.status !== 404) {
                        this.pwnedSummary = 'Oops something went wrong...'
                        return
                    }
                    this.buildPwnedSummary()
                })
                .finally(() => {
                    this.email = ''
                    this.isSubmitted = true
                    this.requestPending = false
                    loading.dismiss()
                })
        },
        formatDate(date) {
            date = new Date(date)
            const monthNames = [
                "Jan", "Feb", "Mar", "Apr",
                "May", "Jun", "Jul", "Aug",
                "Sep", "Oct", "Nov", "Dec"
            ]

            return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`
        },
        buildPwnedSummary() {
            if (this.breaches.length) {
                this.pwnedSummary =
                    `<i>${this.email}</i> is
                    <strong>
                        <ion-badge color="danger">pwned ${this.breaches.length} times</ion-badge>
                    </strong>`
                return
            }

            this.pwnedSummary =
                `<i>${this.email}</i> is
                <strong>
                    <ion-badge color="success">NOT pwned</ion-badge>
                </strong>`
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

ion-spinner * {
    stroke: white !important
}
</style>
