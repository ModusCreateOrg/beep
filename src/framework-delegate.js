import Vue from 'vue'

export function attachViewToDom(parentElement, vueComponent, propsOrData, classesToAdd) {
  const wrappingDiv = shouldWrapInIonPage(parentElement)
    ? document.createElement('ion-page')
    : document.createElement('div');

        console.log('FW--')
    // console.log(parentElement, vueComponent, propsOrData, classesToAdd, wrappingDiv)
        console.log('FW--')

  parentElement.appendChild(wrappingDiv);

  // mount the Vue component
    const vueElement = Vue.extend(vueComponent)
    const page = new vueElement().$mount(wrappingDiv)
    console.log(page.$el)

  if (classesToAdd) {
    for (const clazz of classesToAdd) {
      page.$el.classList.add(clazz);
    }
  }

  return Promise.resolve(page.$el);
}

export function removeViewFromDom(parentElement, childElement){
    console.log(parentElement, childElement)
    // ReactDOM.unmountComponentAtNode(childElement);
parentElement.removeChild(childElement);
  return Promise.resolve();
}

const Delegate = {
  attachViewToDom: attachViewToDom,
  removeViewFromDom: removeViewFromDom,
};

export { Delegate }


export function shouldWrapInIonPage(element) {
  return isElementModal(element) || isElementNav(element);
}


function getOrAppendElement(tagName){
  const element = document.querySelector(tagName);
  if (element) {
    return element;
  }
  const tmp = document.createElement(tagName);
  document.body.appendChild(tmp);
  return tmp;
}

function isElementNav(element) {
  return element.tagName.toUpperCase() === 'ION-NAV';
}

function isElementModal(element) {
  return element.classList.contains('modal-wrapper');
}

