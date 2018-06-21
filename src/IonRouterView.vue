<template>
    <ion-router-outlet>
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
            animated: true,
            enteringEl: null,
            leavingEl: null,
        }
    },
    methods: {
        beforeEnter(element) {
            this.enteringEl = element
        },
        enter(element, done) {
            done()
        },
        afterEnter(el) {},
        enterCancelled(el) {},
        beforeLeave(element) {
            this.leavingEl = element
        },
        leave(element, done) {
            element.style.opacity=0
            this.transition(this.enteringEl, element).then(() => done())
        },
        afterLeave(el) {},
        leaveCancelled(el) {},
        async transition(enteringEl, leavingEl) {
            const ionRouter = document.querySelector('ion-router-outlet')

            if (!enteringEl || enteringEl === leavingEl) {
                return
            }

            await ionRouter.componentOnReady()
            await ionRouter.commit(enteringEl, leavingEl, {
                duration: !this.animated ? 0 : undefined,
                direction: this.$router.direction === 1 ? 'forward' : 'back',
                deepWait: true,
                showGoBack: this.$router.canGoBack(),
            })
        },
    },
}
</script>
