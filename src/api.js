import { Delegate } from './framework-delegate'


export default {
    async newNavController(root) {
        const ctrl = await initComponent('ion-nav')
        ctrl.root = root
        return ctrl
    },
    async newAlertController(props) {
        const ctrl = await initComponent('ion-alert-controller')
        const alert = await ctrl.create(props)
        return await alert.present()
    }
}

function initComponent(tag) {
    const element = getOrAppendElement(tag)
    element.delegate = Delegate
    return element.componentOnReady()
}

function getOrAppendElement(tag) {
    var element

    if (element = document.querySelector(tag)) {
        return element
    }

    return document.body.appendChild(document.createElement(tag));
}

