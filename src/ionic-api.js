import { Delegate } from './framework-delegate'

const api = {
  async newNavController(root) {
    const ctrl = await initComponent('ion-nav', 'ion-app')
    ctrl.root = root
    return ctrl
  },
  newAlertController(props) {
    return this.newAbstractController('ion-alert-controller', props)
  },
  newLoadingController(props) {
    return this.newAbstractController('ion-loading-controller', props)
  },
  async newAbstractController(tag, props) {
    const controller = await initComponent(tag)
    return await controller.create(props)
  },
}

export default api

api.install = function(Vue) {
  if (api.install.installed) return
  api.install.installed = true

  Vue.config.ignoredElements.push(/^ion-/)

  Object.defineProperty(Vue.prototype, '$ionic', {
    get() {
      return api
    },
  })
}

function initComponent(tag, wrapper = 'body') {
  const element = getOrAppendElement(tag, document.querySelector(wrapper))
  element.delegate = Delegate
  return element.componentOnReady()
}

function getOrAppendElement(tag, wrapper) {
  let element = document.querySelector(tag)

  if (element) {
    return element
  }

  return wrapper.appendChild(document.createElement(tag))
}
