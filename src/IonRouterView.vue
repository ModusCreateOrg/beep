<template>
    <ion-router-outlet ref="ionRouterOutlet" @click="catchIonicGoBack">
        <transition
            mode="in-out"
            v-bind:css="false"
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:after-enter="afterEnter"
            v-on:enter-cancelled="enterCancelled"
            v-on:before-leave="beforeLeave"
            v-on:leave="leave"
            v-on:after-leave="afterLeave"
            v-on:leave-cancelled="leaveCancelled"
        >
            <router-view></router-view>
        </transition>
    </ion-router-outlet>
</template>

<script>
export default {
    name: 'IonRouterView',
    data() {
        return {
            leavingEl: null,
            enteringEl: null,
        }
    },
    props: {
        animated: {
            type: Boolean,
            default: true,
        },
    },
    methods: {
        catchIonicGoBack(event) {
            if (!event.target) {
                return
            }

            const backButton = event.target.closest('ion-back-button')
            let defaultHref

            if (!backButton) {
                return
            }

            if (this.$router.canGoBack()) {
                event.preventDefault()
                this.$router.back()
            } else if (undefined !== (defaultHref = backButton.defaultHref)) {
                event.preventDefault()
                this.$router.push(defaultHref)
            }
        },
        async transition(enteringEl, leavingEl) {
            const ionRouterOutlet = this.$refs.ionRouterOutlet

            if (!enteringEl || enteringEl === leavingEl) {
                return
            }

            await ionRouterOutlet.componentOnReady()
            await ionRouterOutlet.commit(enteringEl, leavingEl, {
                duration: !this.animated ? 0 : undefined,
                direction: this.$router.direction === 1 ? 'forward' : 'back',
                deepWait: true,
                showGoBack: this.$router.canGoBack(),
            })
        },
        beforeEnter(element) {
            this.enteringEl = element
        },
        beforeLeave(element) {
            this.leavingEl = element

            if (this.animated && this.$router.direction > 0) {
                this.enteringEl.style.opacity = 0
            }
        },
        leave(element, done) {
            if (!this.animated) {
                return done()
            }

            this.transition(this.enteringEl, element).then(() => {
                this.enteringEl.style.opacity = 1
                done()
            })
        },
        enter(element, done) {
            done()
        },
        afterEnter(el) {},
        enterCancelled(el) {},
        afterLeave(el) {},
        leaveCancelled(el) {},
    },
}
</script>
