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
                <ion-button expand="full" type="submit" @click="goToPwd">
                    check password
                </ion-button>
        </ion-content>
    </ion-page>

</template>

<script>
import Pwd from './Pwd.vue'


export default {
    name: 'home',
     methods: {
         goToPwd() {
             this.$glob.nav.push(Pwd)
         }
     },
}
</script>

<style></style>
