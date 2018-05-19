<template>
    <ion-page class="ion-page">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>qqqq</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="content" padding>
            <h1>Acc placeholder</h1>
            <ion-button @click="goToHome">to home</ion-button>
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
        }
    },
}
</script>

<style></style>
