<template>
    <ion-router-outlet>
        <transition v-bind:css="false" v-on:before-enter="beforeEnter" v-on:before-leave="beforeLeave">
            <router-view></router-view>
        </transition>
    </ion-router-outlet>
</template>

<script>
export default {
    name: 'IonRouterView',
    data() {
        return {
            views: 0,
            animated: true,
            enteringEl: null,
        }
    },
    methods: {
        beforeEnter(element) {
            if (this.animated) {
                element.style.opacity = 0
            }
            this.enteringEl = element
        },
        beforeLeave(element) {
            this.transition(this.enteringEl, element)
            this.views++
        },
        canGoBack() {
            return this.views > 0 && this.$router.currentRoute.path.length > 1
        },
        async transition(enteringEl, leavingEl) {
            const ionRouter = document.querySelector('ion-router-outlet')

            if (!enteringEl || enteringEl === leavingEl) {
                return
            }

            await ionRouter.componentOnReady()
            await ionRouter.commit(enteringEl, leavingEl, {
                duration: !this.animated ? 0 : undefined,
                showGoBack: this.canGoBack(),
            })
        },
    },
}
</script>
