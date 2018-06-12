<template>
    <ion-page class="ion-page">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>home</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="content" padding>
            <ion-button expand="full" type="submit" @click="goToAcc">
                Check Account
            </ion-button>
            <ion-button expand="full" type="submit" @click="goToPwd">
                Check Password
            </ion-button>
        </ion-content>
    </ion-page>
</template>

<script>
    import Pwd from './Pwd.vue'
    import Acc from './Acc.vue'


    export default {
        name: 'home',
        methods: {
            goToAcc() {
                this.$glob.nav.push(Acc)
            },
            goToPwd() {
                this.$glob.nav.push(Pwd)
            }
        },
    }
</script>

<style></style>
