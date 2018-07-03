/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
import{h}from"./ionic.core.js";import{c as openURL}from"./chunk-d7be1947.js";var Anchor=function(){function r(){}return r.prototype.render=function(){var r=this;return h("a",{href:this.href,onClick:function(e){return openURL(r.win,r.href,e,r.routerDirection)}},h("slot",null))},Object.defineProperty(r,"is",{get:function(){return"ion-anchor"},enumerable:!0,configurable:!0}),Object.defineProperty(r,"properties",{get:function(){return{href:{type:String,attr:"href"},routerDirection:{type:String,attr:"router-direction"},win:{context:"window"}}},enumerable:!0,configurable:!0}),r}();export{Anchor as IonAnchor};