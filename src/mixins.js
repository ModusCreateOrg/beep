export default {
    methods: {
        async showAlert(header, sub, msg, btns) {
            const alertController = document.querySelector('ion-alert-controller')
            await alertController.componentOnReady()

            const alert = await alertController.create({
                header: header,
                subHeader: sub,
                message: msg,
                buttons: btns
            })

            return await alert.present()
        },
    }
}
