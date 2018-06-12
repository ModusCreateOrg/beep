import { Delegate } from './framework-delegate'


export default {
    async newNavController(root) {
        const ctrl = await initComponent('ion-nav', 'ion-app')
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

function initComponent(tag, wrapper = 'body') {
    const element = getOrAppendElement(tag, document.querySelector(wrapper))
    element.delegate = Delegate
    return element.componentOnReady()
}

function getOrAppendElement(tag, wrapper) {
    let element

    if (element = document.querySelector(tag)) {
        return element
    }

    return wrapper.appendChild(document.createElement(tag));
}

