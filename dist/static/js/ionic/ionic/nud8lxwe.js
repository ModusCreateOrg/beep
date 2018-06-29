/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
const{h:t}=window.Ionic;class e{push(){const t=this.el.closest("ion-nav"),e=this.component;return t&&e?t.push(e,this.componentProps):Promise.resolve(null)}static get is(){return"ion-nav-push"}static get properties(){return{component:{type:String,attr:"component"},componentProps:{type:"Any",attr:"component-props"},el:{elementRef:!0}}}static get listeners(){return[{name:"child:click",method:"push"}]}}export{e as IonNavPush};