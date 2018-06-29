/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
const{h:e}=window.Ionic;class t{pop(){const e=this.el.closest("ion-nav");return e?e.pop():Promise.resolve(null)}static get is(){return"ion-nav-pop"}static get properties(){return{el:{elementRef:!0}}}static get listeners(){return[{name:"child:click",method:"pop"}]}}export{t as IonNavPop};