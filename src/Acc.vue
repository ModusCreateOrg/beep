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
                    <ion-input type="email" :value="email" @input="email = $event.target.value.trim()"></ion-input>
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
                <breach v-for="(breach, index) in breaches" :key="index" :breach="breach"></breach>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import axios from 'axios'

export default {
    name: 'acc',
    data() {
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
            const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            return re.test(String(this.email).toLowerCase());
        },
        getURL() {
            const baseURL = 'https://haveibeenpwned.com/api/v2/breachedaccount/'
            let url = baseURL + this.email
            if (this.includeUnverified) {
                url += '?includeUnverified=true'
            }
            return url
        },
        toggleIncludeUnverified() {
            this.includeUnverified = !this.includeUnverified
        },
        checkAccount() {
            if (this.email.length && !this.requestPending) {
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

ion-spinner * {
    stroke: white !important
}
</style>
