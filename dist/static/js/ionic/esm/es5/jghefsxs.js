/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
import{h}from"./ionic.core.js";var Icon=function(){function e(){this.svgContent=null,this.ariaLabel="",this.ios="",this.md="",this.name="",this.src="",this.icon=""}return e.prototype.componentWillLoad=function(){var e=this;this.waitUntilVisible(this.el,"50px",function(){e.isVisible=!0,e.loadIcon()})},e.prototype.waitUntilVisible=function(e,t,n){if(this.win.IntersectionObserver){var i=new this.win.IntersectionObserver(function(e){e[0].isIntersecting&&(i.disconnect(),n())},{rootMargin:t});i.observe(e)}else n()},e.prototype.loadIcon=function(){var e=this;if(!this.isServer&&this.isVisible){var t=this.getUrl();t&&getSvgContent(t).then(function(t){e.svgContent=t})}},e.prototype.getUrl=function(){var e=getSrc(this.src);return e||((e=getName(this.name,this.mode,this.ios,this.md))?this.getNamedUrl(e):(e=getSrc(this.icon))?e:(e=getName(this.icon,this.mode,this.ios,this.md))?this.getNamedUrl(e):null)},e.prototype.getNamedUrl=function(e){return this.resourcesUrl+"svg/"+e+".svg"},e.prototype.hostData=function(){var e={role:"img"};this.ariaLabel||getName(this.name,this.mode,this.ios,this.md)&&(e["aria-label"]=this.name.replace("ios-","").replace("md-","").replace(/\-/g," "));var t={};return this.size&&(t["icon-"+this.size]=!0),Object.assign({},e,{class:t})},e.prototype.render=function(){return!this.isServer&&this.svgContent?h("div",{class:"icon-inner",innerHTML:validateContent(this.doc,this.svgContent)}):h("div",{class:"icon-inner"})},Object.defineProperty(e,"is",{get:function(){return"ion-icon"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"host",{get:function(){return{theme:"icon"}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{ariaLabel:{type:String,attr:"aria-label"},color:{type:String,attr:"color"},doc:{context:"document"},el:{elementRef:!0},icon:{type:String,attr:"icon",watchCallbacks:["loadIcon"]},ios:{type:String,attr:"ios"},isServer:{context:"isServer"},isVisible:{state:!0},md:{type:String,attr:"md"},mode:{context:"mode"},name:{type:String,attr:"name",watchCallbacks:["loadIcon"]},resourcesUrl:{context:"resourcesUrl"},size:{type:String,attr:"size"},src:{type:String,attr:"src",watchCallbacks:["loadIcon"]},svgContent:{state:!0},win:{context:"window"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return"ion-icon{display:inline-block;font-size:inherit}ion-icon .icon-inner{height:1em;width:1em}ion-icon svg{fill:currentColor;stroke:currentColor}.icon-small .icon-inner{font-size:18px}.icon-large .icon-inner{font-size:32px}.icon-ios-primary svg{fill:var(--ion-color-ios-primary,var(--ion-color-primary,#3880ff));stroke:var(--ion-color-ios-primary,var(--ion-color-primary,#3880ff))}.icon-ios-secondary svg{fill:var(--ion-color-ios-secondary,var(--ion-color-secondary,#0cd1e8));stroke:var(--ion-color-ios-secondary,var(--ion-color-secondary,#0cd1e8))}.icon-ios-tertiary svg{fill:var(--ion-color-ios-tertiary,var(--ion-color-tertiary,#f4a942));stroke:var(--ion-color-ios-tertiary,var(--ion-color-tertiary,#f4a942))}.icon-ios-success svg{fill:var(--ion-color-ios-success,var(--ion-color-success,#10dc60));stroke:var(--ion-color-ios-success,var(--ion-color-success,#10dc60))}.icon-ios-warning svg{fill:var(--ion-color-ios-warning,var(--ion-color-warning,#ffce00));stroke:var(--ion-color-ios-warning,var(--ion-color-warning,#ffce00))}.icon-ios-danger svg{fill:var(--ion-color-ios-danger,var(--ion-color-danger,#f14141));stroke:var(--ion-color-ios-danger,var(--ion-color-danger,#f14141))}.icon-ios-light svg{fill:var(--ion-color-ios-light,var(--ion-color-light,#f4f5f8));stroke:var(--ion-color-ios-light,var(--ion-color-light,#f4f5f8))}.icon-ios-medium svg{fill:var(--ion-color-ios-medium,var(--ion-color-medium,#989aa2));stroke:var(--ion-color-ios-medium,var(--ion-color-medium,#989aa2))}.icon-ios-dark svg{fill:var(--ion-color-ios-dark,var(--ion-color-dark,#222428));stroke:var(--ion-color-ios-dark,var(--ion-color-dark,#222428))}.icon-md-primary svg{fill:var(--ion-color-md-primary,var(--ion-color-primary,#3880ff));stroke:var(--ion-color-md-primary,var(--ion-color-primary,#3880ff))}.icon-md-secondary svg{fill:var(--ion-color-md-secondary,var(--ion-color-secondary,#0cd1e8));stroke:var(--ion-color-md-secondary,var(--ion-color-secondary,#0cd1e8))}.icon-md-tertiary svg{fill:var(--ion-color-md-tertiary,var(--ion-color-tertiary,#f4a942));stroke:var(--ion-color-md-tertiary,var(--ion-color-tertiary,#f4a942))}.icon-md-success svg{fill:var(--ion-color-md-success,var(--ion-color-success,#10dc60));stroke:var(--ion-color-md-success,var(--ion-color-success,#10dc60))}.icon-md-warning svg{fill:var(--ion-color-md-warning,var(--ion-color-warning,#ffce00));stroke:var(--ion-color-md-warning,var(--ion-color-warning,#ffce00))}.icon-md-danger svg{fill:var(--ion-color-md-danger,var(--ion-color-danger,#f14141));stroke:var(--ion-color-md-danger,var(--ion-color-danger,#f14141))}.icon-md-light svg{fill:var(--ion-color-md-light,var(--ion-color-light,#f4f5f8));stroke:var(--ion-color-md-light,var(--ion-color-light,#f4f5f8))}.icon-md-medium svg{fill:var(--ion-color-md-medium,var(--ion-color-medium,#989aa2));stroke:var(--ion-color-md-medium,var(--ion-color-medium,#989aa2))}.icon-md-dark svg{fill:var(--ion-color-md-dark,var(--ion-color-dark,#222428));stroke:var(--ion-color-md-dark,var(--ion-color-dark,#222428))}"},enumerable:!0,configurable:!0}),e}(),requests=new Map;function getSvgContent(e){var t=requests.get(e);return t||(t=fetch(e,{keepalive:!0,cache:"force-cache"}).then(function(e){return e.ok?e.text():Promise.resolve(null)}),requests.set(e,t)),t}function getName(e,t,n,i){return t=t||"md",n&&"ios"===t?e=n.toLowerCase():i&&"md"===t?e=i.toLowerCase():e&&!/^md-|^ios-|^logo-/.test(e)&&(e=t+"-"+e),"string"!=typeof e||""===e.trim()?null:""!==e.replace(/[a-z]|-|\d/g,"")?null:e}function getSrc(e){return"string"==typeof e&&(e=e.trim()).length>0&&/(\/|\.)/.test(e)?e:null}function validateContent(e,t){if(t){var n=e.createDocumentFragment(),i=e.createElement("div");i.innerHTML=t,n.appendChild(i);for(var r=i.childNodes.length-1;r>=0;r--)"svg"!==i.childNodes[r].nodeName.toLowerCase()&&i.removeChild(i.childNodes[r]);var o=i.firstElementChild;if(o&&"svg"===o.nodeName.toLowerCase()&&isValid(o))return i.innerHTML}return""}function isValid(e){if(1===e.nodeType){if("script"===e.nodeName.toLowerCase())return!1;for(var t=0;t<e.attributes.length;t++){var n=e.attributes[t].value;if("string"==typeof n&&0===n.toLowerCase().indexOf("on"))return!1}for(t=0;t<e.childNodes.length;t++)if(!isValid(e.childNodes[t]))return!1}return!0}export{Icon as IonIcon};