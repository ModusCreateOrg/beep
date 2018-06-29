/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
const{h:t}=window.Ionic;import{e}from"./chunk-770a6cdb.js";import{a as s}from"./chunk-d7be1947.js";class i{constructor(){this.isCancelVisible=!1,this.shouldBlur=!0,this.shouldAlignLeft=!0,this.activated=!1,this.focused=!1,this.animated=!1,this.autocomplete="off",this.autocorrect="off",this.cancelButtonText="Cancel",this.debounce=250,this.placeholder="Search",this.showCancelButton=!1,this.spellcheck=!1,this.type="search",this.value=""}debounceChanged(){this.ionChange=e(this.ionChange,this.debounce)}valueChanged(){const t=this.nativeInput,e=this.value;t&&t.value!==e&&(t.value=e),this.ionChange.emit({value:e})}componentDidLoad(){this.positionElements(),this.debounceChanged()}clearInput(){this.ionClear.emit(),setTimeout(()=>{const t=this.value;void 0!==t&&""!==t&&(this.value="")},64),this.shouldBlur=!1}cancelSearchbar(){this.ionCancel.emit(),this.clearInput(),this.shouldBlur=!0,this.activated=!1}onInput(t){const e=t.target;e&&(this.value=e.value),this.ionInput.emit(t)}inputUpdated(){this.positionElements()}onBlur(){const t=this.el.querySelector(".searchbar-input");if(!1===this.shouldBlur)return t.focus(),this.shouldBlur=!0,this.ionBlur.emit(),void this.inputUpdated();this.focused=!1,this.positionElements()}onFocus(){this.activated=!0,this.focused=!0,this.ionFocus.emit(),this.inputUpdated(),this.positionElements()}positionElements(){const t=this.shouldAlignLeft,e=!this.animated||this.value&&""!==this.value.toString().trim()||!0===this.focused;this.shouldAlignLeft=e,"ios"===this.mode&&(t!==e&&this.positionPlaceholder(),this.animated&&this.positionCancelButton())}positionPlaceholder(){const t="rtl"===this.doc.dir,e=this.el.querySelector(".searchbar-input"),s=this.el.querySelector(".searchbar-search-icon");if(this.shouldAlignLeft)e.removeAttribute("style"),s.removeAttribute("style");else{const i=this.doc,o=i.createElement("span");o.innerHTML=this.placeholder,i.body.appendChild(o);const a=o.offsetWidth;o.remove();const n="calc(50% - "+a/2+"px)",c="calc(50% - "+(a/2+30)+"px)";t?(e.style.paddingRight=n,s.style.marginRight=c):(e.style.paddingLeft=n,s.style.marginLeft=c)}}positionCancelButton(){const t="rtl"===this.doc.dir,e=this.el.querySelector(".searchbar-cancel-button-ios"),s=this.focused;if(s!==this.isCancelVisible){const i=e.style;if(this.isCancelVisible=s,s)t?i.marginLeft="0":i.marginRight="0";else{const s=e.offsetWidth;s>0&&(t?i.marginLeft=-s+"px":i.marginRight=-s+"px")}}}hostData(){return{class:{"searchbar-active":this.activated,"searchbar-animated":this.animated,"searchbar-has-value":""!==this.value,"searchbar-show-cancel":this.showCancelButton,"searchbar-left-aligned":this.shouldAlignLeft,"searchbar-has-focus":this.focused}}}render(){const e=s(this.mode,this.color,"searchbar-cancel-button"),i=s(this.mode,this.color,"searchbar-search-icon"),o=this.showCancelButton?t("button",{type:"button",tabindex:"ios"!==this.mode||this.activated?void 0:-1,onClick:this.cancelSearchbar.bind(this),onMouseDown:this.cancelSearchbar.bind(this),class:e},"md"===this.mode?t("ion-icon",{name:"md-arrow-back"}):this.cancelButtonText):null;return[t("div",{class:"searchbar-input-container"},"md"===this.mode&&o,t("div",{class:i}),t("input",{ref:t=>this.nativeInput=t,class:"searchbar-input",onInput:this.onInput.bind(this),onBlur:this.onBlur.bind(this),onFocus:this.onFocus.bind(this),placeholder:this.placeholder,type:this.type,value:this.value,autoComplete:this.autocomplete,autoCorrect:this.autocorrect,spellCheck:this.spellcheck}),t("button",{type:"button",class:"searchbar-clear-icon",onClick:this.clearInput.bind(this),onMouseDown:this.clearInput.bind(this)})),"ios"===this.mode&&o]}static get is(){return"ion-searchbar"}static get host(){return{theme:"searchbar"}}static get properties(){return{activated:{state:!0},animated:{type:Boolean,attr:"animated"},autocomplete:{type:String,attr:"autocomplete"},autocorrect:{type:String,attr:"autocorrect"},cancelButtonText:{type:String,attr:"cancel-button-text"},color:{type:String,attr:"color"},debounce:{type:Number,attr:"debounce",watchCallbacks:["debounceChanged"]},doc:{context:"document"},el:{elementRef:!0},focused:{state:!0},mode:{type:String,attr:"mode"},placeholder:{type:String,attr:"placeholder"},showCancelButton:{type:Boolean,attr:"show-cancel-button"},spellcheck:{type:Boolean,attr:"spellcheck"},type:{type:String,attr:"type"},value:{type:String,attr:"value",mutable:!0,watchCallbacks:["valueChanged"]}}}static get events(){return[{name:"ionInput",method:"ionInput",bubbles:!0,cancelable:!0,composed:!0},{name:"ionChange",method:"ionChange",bubbles:!0,cancelable:!0,composed:!0},{name:"ionCancel",method:"ionCancel",bubbles:!0,cancelable:!0,composed:!0},{name:"ionClear",method:"ionClear",bubbles:!0,cancelable:!0,composed:!0},{name:"ionBlur",method:"ionBlur",bubbles:!0,cancelable:!0,composed:!0},{name:"ionFocus",method:"ionFocus",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return"ion-searchbar{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:100%}.searchbar-icon{pointer-events:none}.searchbar-input-container{position:relative;display:block;-webkit-flex-shrink:1;-ms-flex-negative:1;flex-shrink:1;width:100%}.searchbar-input{-moz-appearance:none;-ms-appearance:none;-webkit-appearance:none;appearance:none;-webkit-box-sizing:border-box;box-sizing:border-box;display:block;width:100%;border:0;font-family:inherit}.searchbar-input:active,.searchbar-input:focus{outline:0}.searchbar-input::-webkit-search-cancel-button{display:none}.searchbar-clear-icon{margin:0;padding:0;display:none;min-height:0}.searchbar-has-value.searchbar-has-focus .searchbar-clear-icon{display:block}.searchbar-md{padding:8px;font-family:Roboto,\"Helvetica Neue\",sans-serif;background:inherit}.searchbar-search-icon-md{left:16px;top:11px;background-image:url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'><path%20fill='var(--ion-text-md-color-step-400,%20var(--ion-text-color-step-400,%20%23666666))'%20d='M337.509,305.372h-17.501l-6.571-5.486c20.791-25.232,33.922-57.054,33.922-93.257C347.358,127.632,283.896,64,205.135,64C127.452,64,64,127.632,64,206.629s63.452,142.628,142.225,142.628c35.011,0,67.831-13.167,92.991-34.008l6.561,5.487v17.551L415.18,448L448,415.086L337.509,305.372z%20M206.225,305.372c-54.702,0-98.463-43.887-98.463-98.743c0-54.858,43.761-98.742,98.463-98.742c54.7,0,98.462,43.884,98.462,98.742C304.687,261.485,260.925,305.372,206.225,305.372z'/></svg>\");width:21px;height:21px}.searchbar-cancel-button-md{left:10px;top:0;margin:0;display:none;height:100%;border:0;font-size:1.8em;color:var(--ion-text-md-color-step-100,var(--ion-text-color-step-100,#1a1a1a));background-color:transparent}.searchbar-cancel-button-md,.searchbar-search-icon-md{position:absolute;background-repeat:no-repeat;background-size:20px}.searchbar-cancel-button-md.activated,.searchbar-search-icon-md.activated{background-color:transparent}.searchbar-md .searchbar-input{padding:6px 55px;border-radius:2px;background-position:left 8px center;height:auto;font-size:16px;font-weight:400;line-height:30px;color:var(--ion-text-md-color-step-150,var(--ion-text-color-step-150,#262626));background-color:var(--ion-background-md-color,var(--ion-background-color,#fff));-webkit-box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12)}.searchbar-md .searchbar-input::-moz-placeholder{color:var(--ion-placeholder-text-md-color,var(--ion-placeholder-text-color,#999))}.searchbar-md .searchbar-input:-ms-input-placeholder{color:var(--ion-placeholder-text-md-color,var(--ion-placeholder-text-color,#999))}.searchbar-md .searchbar-input::-webkit-input-placeholder{text-indent:0;color:var(--ion-placeholder-text-md-color,var(--ion-placeholder-text-color,#999))}.searchbar-md .searchbar-clear-icon{right:13px;top:0;background-image:url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'><polygon%20fill='var(--ion-text-md-color-step-400,%20var(--ion-text-color-step-400,%20%23666666))'%20points='405,136.798%20375.202,107%20256,226.202%20136.798,107%20107,136.798%20226.202,256%20107,375.202%20136.798,405%20256,285.798%20375.202,405%20405,375.202%20285.798,256'/></svg>\");padding:0;background-position:center;position:absolute;width:22px;height:100%;border:0;background-color:transparent;background-repeat:no-repeat;background-size:22px}.searchbar-md .searchbar-clear-icon.activated{background-color:transparent}.searchbar-has-focus.searchbar-show-cancel .searchbar-search-icon-md{display:none}.searchbar-has-focus.searchbar-show-cancel .searchbar-cancel-button-md{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex}.toolbar .searchbar-md{padding:3px}"}static get styleMode(){return"md"}}export{i as IonSearchbar};