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
            <form @submit="checkHash" autocomplete="off">
                <ion-list>
                    <ion-item>
                        <ion-icon v-show="!showPwd" name="lock" slot="start"></ion-icon>
                        <ion-icon v-show="showPwd" name="unlock" slot="start"></ion-icon>
                        <ion-input :type="pwdType" :value="pwd" @input="pwd = $event.target.value" placeholder="Password"></ion-input>
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
                <ion-button @click="goToAcc">go to account page</ion-button>
            </form>
        </ion-content>
    </ion-page>
</template>

<script>
import sha1 from 'sha1'
import axios from 'axios'
import Acc from './Acc.vue'

const baseURL = "https://api.pwnedpasswords.com/range/"

export default {
    name: 'pwd',
    data() {
        return {
            pwd: '',
            showPwd: false,
            requestPending: false,
            pwned: false,
            count: 0,
        }
    },
    computed: {
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

            // Check for empty passwords or pending requests
            if (!this.validatePwd() || this.requestPending) {
                return
            }

            const hash = sha1(this.pwd)

            this.requestPending = true

            axios.get(baseURL + hash.substr(0, 5))
                .then(res => {
                    this.count = this.search(hash.substr(5).toUpperCase(), res.data)
                    this.pwned = this.count > 0
                    this.notify()
                })
                .catch(err => {
                    console.log('Error:', err)
                })
                .finally(() => {
                    // Reset and unblock subsequent requests
                    this.pwd = ''
                    this.requestPending = false
                })
        },
        search(hash, text) {
            var i = 0
            var row = ''

            while (i < text.length) {
                var j = text.indexOf("\n", i)

                if (j === -1) {
                    j = text.length;
                }

                row = text.substr(i, j - i)

                if (row.indexOf(hash) > -1) {
                    var breachData = row.split(':')

                    if (breachData.length !== 2) {
                        throw new Error("Unexpected data")
                    }

                    return breachData[1]
                }

                i = j + 1;
            }

            return 0
        },
        notify() {
            var btns = ['Yay!']
            var msg = 'You are secure, for now...'

            if (this.pwned) {
                btns = ['Doh!']
                msg = `You've been pwned across ${this.count} domains`
            }

            this.$glob.api.newAlertController({
                header: 'Beep',
                subHeader: null,
                message: msg,
                buttons: btns,
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
