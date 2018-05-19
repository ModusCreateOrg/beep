<template>
    <ion-page class="ion-page">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Password checking</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="content" padding>
            <form @submit="checkHash">
                <ion-list>
                    <ion-item>
                        <ion-icon v-show="!showPwd" name="lock" slot="start"></ion-icon>
                        <ion-icon v-show="showPwd" name="unlock" slot="start"></ion-icon>
                        <ion-input :type="pwdType" :value="pwd" @input="pwd=$event.target.value" placeholder="Password"></ion-input>
                        <ion-button v-show="pwd" @click="togglePwdType" slot="end" fill="clear" size="small">
                            {{showPwdText}}
                        </ion-button>
                    </ion-item>
                </ion-list>

                <ion-button expand="full" type="submit" :disabled="!validatePwd()">
                    <span v-if="requestPending">
                        <ion-spinner></ion-spinner>
                    </span>
                    <span v-else>Have I been pwned?</span>
                </ion-button>
                <ion-button @click="goToAcc">check account</ion-button>
            </form>
        </ion-content>
    </ion-page>
</template>

<script>
import sha1 from 'sha1'
import axios from 'axios'
import mixins from './mixins'
import Acc from './Acc.vue'

const baseURL = "https://api.pwnedpasswords.com/range/"

export default {
    name: 'pwd',
    mixins: [mixins],
    data() {
        return {
            pwd: '',
            showPwd: false,
            requestPending: false,
            pwned: false,
        }
    },
    computed: {
        pwdIcon() {
            return this.showPwd ? 'unlock' : 'lock'
        },
        pwdType() {
            return this.showPwd ? 'text' : 'password'
        },
        showPwdText() {
            return this.showPwd ? 'hide' : 'show'
        }
    },
    methods: {
        goToAcc() {
            this.$glob.nav.push(Acc)
        },
        validatePwd() {
            return !!(this.pwd = this.pwd.trim())
        },
        togglePwdType() {
            this.showPwd = !this.showPwd
        },
        checkHash(e) {
            e.preventDefault()

            // Check for empty pwdwords or pending requests
            if (!this.validatePwd() || this.requestPending) {
                return
            }

            const hash = sha1(this.pwd)

            this.requestPending = true

            axios.get(baseURL + hash.substr(0, 5))
                .then(res => {
                    this.pwd = ''
                    this.pwned = !!~res.data.indexOf(hash.substr(5).toUpperCase())
                    this.showAlert(
                        'Alert',
                        'Subtitle',
                        'This is an alert message.',
                        ['OK']
                    )
                })
                .catch(err => {
                    console.log('Error:', err)
                })
                .finally(() => {
                    // Unblock subsequent requests
                    this.requestPending = false
                })
        }
    },
}
</script>

<style>
ion-spinner * {
    stroke: white !important
}
</style>
