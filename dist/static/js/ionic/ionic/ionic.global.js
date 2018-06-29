/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
(function(namespace,resourcesUrl){"use strict";
(function(resourcesUrl){const t=window.Ionic=window.Ionic||{};Object.defineProperty(t,"queue",{get:()=>Context.queue});const e=t.config=Context.config=new class{constructor(t){this.m=new Map(Object.entries(t))}get(t,e){const o=this.m.get(t);return void 0!==o?o:e}getBoolean(t,e=!1){const o=this.m.get(t);return void 0===o?e:"string"==typeof o?"true"===o:!!o}getNumber(t,e){const o=parseFloat(this.m.get(t));return isNaN(o)?void 0!==e?e:NaN:o}set(t,e){this.m.set(t,e)}}(Object.assign({},t.config,function(){const t={};return window.location.search.slice(1).split("&").filter(t=>t.startsWith("ionic:")).map(t=>t.split("=")).forEach(e=>{t[e[0].slice(6)]=decodeURIComponent(e[1])}),t}())),o=document.documentElement,n=e.get("mode",o.getAttribute("mode")||(function(t,e){return/iPad|iPhone|iPod/i.test(t.navigator.userAgent)}(window)?"ios":"md"));t.mode=Context.mode=n,e.set("mode",n),o.setAttribute("mode",t.mode);
})(resourcesUrl);
})("Ionic");