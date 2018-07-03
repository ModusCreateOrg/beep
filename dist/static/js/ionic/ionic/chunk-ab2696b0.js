/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
const{h:e}=window.Ionic;function n(e,n,o,t,r){if(e)return e.attachViewToDom(n,o,r,t);if("string"!=typeof o&&!(o instanceof HTMLElement))throw new Error("framework delegate is missing");const i="string"==typeof o?n.ownerDocument.createElement(o):o;return t&&t.forEach(e=>i.classList.add(e)),r&&Object.assign(i,r),n.appendChild(i),i.componentOnReady?i.componentOnReady():Promise.resolve(i)}function o(e,n){if(n){if(e){const o=n.parentElement;return e.removeViewFromDom(o,n)}n.remove()}return Promise.resolve()}export{n as a,o as b};