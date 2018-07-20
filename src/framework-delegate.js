import Vue from 'vue'

export function attachViewToDom(parentElement, vueComponent, propsOrData, classes) {
document.querySelector('ion-page').__vue__.route=vueComponent
  // if (classes) {
    // for (const cls of classes) {
      // page.$el.classList.add(cls)
    // }
  // }
//
  return Promise.resolve(document.querySelector('ion-page'))
}

export function removeViewFromDom(parentElement, childElement) {
  if (childElement.hasOwnProperty('__vue__')) {
    childElement.__vue__.$destroy()
  }

  parentElement.removeChild(childElement)

  return Promise.resolve()
}

const Delegate = {
  attachViewToDom,
  removeViewFromDom,
}

export { Delegate }

function shouldWrapInIonPage(element) {
  return isElementModal(element) || isElementNav(element)
}

function isElementNav(element) {
  return element.tagName.toUpperCase() === 'ION-NAV'
}

function isElementModal(element) {
  return element.classList.contains('modal-wrapper')
}
