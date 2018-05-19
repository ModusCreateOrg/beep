<template>
    <ion-page class="ion-page">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>account page</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="content" padding>
            <h1>Acc placeholder</h1>
            <ion-button @click="goToHome">go home with history</ion-button>
            <ion-button @click="popToHome">drop all history</ion-button>
        </ion-content>
    </ion-page>
</template>

<script>
import Home from './Home.vue'

export default {
    name: 'acc',
    methods: {
        goToHome() {
            this.$glob.nav.push(Home)
        },
        popToHome() {
            this.$glob.nav.popToRoot()
        }
    },
}
</script>

<style></style>
