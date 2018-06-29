/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
const{h:t}=window.Ionic;import{c as r}from"./chunk-d7be1947.js";class e{render(){return t("a",{href:this.href,onClick:t=>r(this.win,this.href,t,this.routerDirection)},t("slot",null))}static get is(){return"ion-anchor"}static get properties(){return{href:{type:String,attr:"href"},routerDirection:{type:String,attr:"router-direction"},win:{context:"window"}}}}export{e as IonAnchor};