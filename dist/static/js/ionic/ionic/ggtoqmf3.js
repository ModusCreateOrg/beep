/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
const{h:t}=window.Ionic;class n{constructor(){this.duration=300}onStatusTap(){this.queue.read(()=>{const t=this.win.innerWidth,n=this.win.innerWidth,e=this.win.document.elementFromPoint(t/2,n/2);if(!e)return;const i=e.closest("ion-scroll");i&&i.componentOnReady().then(()=>{this.queue.write(()=>{i.scrollToTop(this.duration)})})})}static get is(){return"ion-status-tap"}static get properties(){return{duration:{type:Number,attr:"duration"},queue:{context:"queue"},win:{context:"window"}}}static get listeners(){return[{name:"window:statusTap",method:"onStatusTap"}]}}export{n as IonStatusTap};