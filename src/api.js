import { Delegate } from './framework-delegate'


export default {
    async newNavController(root) {
        const ctrl = await initComponent('ion-nav')
        ctrl.root = root
        return ctrl
    },
    async newAlertController(props) {
        return this.newAbstractController('ion-alert-controller', props)
    },
    async newLoadingController(props) {
        return this.newAbstractController('ion-loading-controller', props)
    },
    async newAbstractController(tag, props) {
        const controller = await initComponent(tag)
        return await controller.create(props)
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

