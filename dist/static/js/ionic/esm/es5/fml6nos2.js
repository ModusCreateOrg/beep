/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
import{h}from"./ionic.core.js";import{b as deferEvent}from"./chunk-770a6cdb.js";import{a as createThemedClasses}from"./chunk-d7be1947.js";var Radio=function(){function e(){this.inputId="ion-rb-"+radioButtonIds++,this.keyFocus=!1,this.name=this.inputId,this.disabled=!1,this.checked=!1}return e.prototype.componentWillLoad=function(){this.ionSelect=deferEvent(this.ionSelect),this.ionStyle=deferEvent(this.ionStyle),void 0===this.value&&(this.value=this.inputId),this.emitStyle()},e.prototype.componentDidLoad=function(){this.ionRadioDidLoad.emit(),this.nativeInput.checked=this.checked;var e=this.nativeInput.closest("ion-item");if(e){var t=e.querySelector("ion-label");t&&(t.id=this.inputId+"-lbl",this.nativeInput.setAttribute("aria-labelledby",t.id))}},e.prototype.componentDidUnload=function(){this.ionRadioDidUnload.emit()},e.prototype.colorChanged=function(){this.emitStyle()},e.prototype.checkedChanged=function(e){this.nativeInput.checked!==e&&(this.nativeInput.checked=e),e&&this.ionSelect.emit({checked:!0,value:this.value}),this.emitStyle()},e.prototype.disabledChanged=function(e){this.nativeInput.disabled=e,this.emitStyle()},e.prototype.emitStyle=function(){this.ionStyle.emit(Object.assign({},createThemedClasses(this.mode,this.color,"radio"),{"radio-checked":this.checked,"radio-disabled":this.disabled}))},e.prototype.onClick=function(){this.checkedChanged(!0)},e.prototype.onChange=function(){this.checked=!0,this.nativeInput.focus()},e.prototype.onKeyUp=function(){this.keyFocus=!0},e.prototype.onFocus=function(){this.ionFocus.emit()},e.prototype.onBlur=function(){this.keyFocus=!1,this.ionBlur.emit()},e.prototype.hostData=function(){return{class:{"radio-checked":this.checked,"radio-disabled":this.disabled,"radio-key":this.keyFocus}}},e.prototype.render=function(){var e=this;return[h("div",{class:"radio-icon"},h("div",{class:"radio-inner"})),h("input",{type:"radio",onClick:this.onClick.bind(this),onChange:this.onChange.bind(this),onFocus:this.onFocus.bind(this),onBlur:this.onBlur.bind(this),onKeyUp:this.onKeyUp.bind(this),id:this.inputId,name:this.name,value:this.value,disabled:this.disabled,ref:function(t){return e.nativeInput=t}})]},Object.defineProperty(e,"is",{get:function(){return"ion-radio"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"host",{get:function(){return{theme:"radio"}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{checked:{type:Boolean,attr:"checked",mutable:!0,watchCallbacks:["checkedChanged"]},color:{type:String,attr:"color",watchCallbacks:["colorChanged"]},disabled:{type:Boolean,attr:"disabled",watchCallbacks:["disabledChanged"]},keyFocus:{state:!0},mode:{type:String,attr:"mode"},name:{type:String,attr:"name"},value:{type:String,attr:"value",mutable:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"events",{get:function(){return[{name:"ionRadioDidLoad",method:"ionRadioDidLoad",bubbles:!0,cancelable:!0,composed:!0},{name:"ionRadioDidUnload",method:"ionRadioDidUnload",bubbles:!0,cancelable:!0,composed:!0},{name:"ionStyle",method:"ionStyle",bubbles:!0,cancelable:!0,composed:!0},{name:"ionSelect",method:"ionSelect",bubbles:!0,cancelable:!0,composed:!0},{name:"ionFocus",method:"ionFocus",bubbles:!0,cancelable:!0,composed:!0},{name:"ionBlur",method:"ionBlur",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return"ion-radio{-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:inline-block}ion-radio input{left:0;top:0;margin:0;position:absolute;width:100%;height:100%;border:0;background:0 0;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none}ion-radio input:active,ion-radio input:focus{outline:0}ion-radio .radio-icon{-webkit-box-sizing:border-box;box-sizing:border-box}.radio-md .radio-icon{left:0;top:0;margin:0;border-radius:50%;position:relative;display:block;width:16px;height:16px;border-width:2px;border-style:solid;border-color:var(--ion-text-md-color-step-600,var(--ion-text-color-step-600,#999));contain:layout size style}.radio-md .radio-inner{left:2px;top:2px;border-radius:50%;position:absolute;width:8px;height:8px;background-color:var(--ion-color-md-primary,var(--ion-color-primary,#3880ff));-webkit-transform:scale3d(0,0,0);transform:scale3d(0,0,0);-webkit-transition:-webkit-transform 280ms cubic-bezier(.4,0,.2,1);transition:-webkit-transform 280ms cubic-bezier(.4,0,.2,1);transition:transform 280ms cubic-bezier(.4,0,.2,1);transition:transform 280ms cubic-bezier(.4,0,.2,1),-webkit-transform 280ms cubic-bezier(.4,0,.2,1)}.radio-md.radio-checked .radio-icon{border-color:var(--ion-color-md-primary,var(--ion-color-primary,#3880ff))}.radio-md.radio-checked .radio-inner{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}.item-md.item-radio-disabled ion-label,.radio-md.radio-disabled{opacity:.3;pointer-events:none}.radio-key .radio-icon::after{border-radius:50%;left:-12px;top:-12px;position:absolute;display:block;width:36px;height:36px;background:var(--ion-color-md-primary-tint,var(--ion-color-primary-tint,#4c8dff));content:\"\";opacity:.2}.item-md .radio-md{margin:9px 10px 9px 0;position:static;display:block}.item-md .radio-md[slot=start]{margin:11px 36px 10px 4px}.item-radio.item-md ion-label{margin-left:0}.item-radio-checked.item-md ion-label{color:var(--ion-color-md-primary,var(--ion-color-primary,#3880ff))}.item-radio-md-primary.item-radio-checked ion-label{color:var(--ion-color-md-primary,var(--ion-color-primary,#3880ff))}.radio-md-primary.radio-checked .radio-icon{border-color:var(--ion-color-md-primary,var(--ion-color-primary,#3880ff))}.radio-md-primary .radio-inner{background-color:var(--ion-color-md-primary,var(--ion-color-primary,#3880ff))}.item-radio-md-secondary.item-radio-checked ion-label{color:var(--ion-color-md-secondary,var(--ion-color-secondary,#0cd1e8))}.radio-md-secondary.radio-checked .radio-icon{border-color:var(--ion-color-md-secondary,var(--ion-color-secondary,#0cd1e8))}.radio-md-secondary .radio-inner{background-color:var(--ion-color-md-secondary,var(--ion-color-secondary,#0cd1e8))}.item-radio-md-tertiary.item-radio-checked ion-label{color:var(--ion-color-md-tertiary,var(--ion-color-tertiary,#7044ff))}.radio-md-tertiary.radio-checked .radio-icon{border-color:var(--ion-color-md-tertiary,var(--ion-color-tertiary,#7044ff))}.radio-md-tertiary .radio-inner{background-color:var(--ion-color-md-tertiary,var(--ion-color-tertiary,#7044ff))}.item-radio-md-success.item-radio-checked ion-label{color:var(--ion-color-md-success,var(--ion-color-success,#10dc60))}.radio-md-success.radio-checked .radio-icon{border-color:var(--ion-color-md-success,var(--ion-color-success,#10dc60))}.radio-md-success .radio-inner{background-color:var(--ion-color-md-success,var(--ion-color-success,#10dc60))}.item-radio-md-warning.item-radio-checked ion-label{color:var(--ion-color-md-warning,var(--ion-color-warning,#ffce00))}.radio-md-warning.radio-checked .radio-icon{border-color:var(--ion-color-md-warning,var(--ion-color-warning,#ffce00))}.radio-md-warning .radio-inner{background-color:var(--ion-color-md-warning,var(--ion-color-warning,#ffce00))}.item-radio-md-danger.item-radio-checked ion-label{color:var(--ion-color-md-danger,var(--ion-color-danger,#f04141))}.radio-md-danger.radio-checked .radio-icon{border-color:var(--ion-color-md-danger,var(--ion-color-danger,#f04141))}.radio-md-danger .radio-inner{background-color:var(--ion-color-md-danger,var(--ion-color-danger,#f04141))}.item-radio-md-light.item-radio-checked ion-label{color:var(--ion-color-md-light,var(--ion-color-light,#f4f5f8))}.radio-md-light.radio-checked .radio-icon{border-color:var(--ion-color-md-light,var(--ion-color-light,#f4f5f8))}.radio-md-light .radio-inner{background-color:var(--ion-color-md-light,var(--ion-color-light,#f4f5f8))}.item-radio-md-medium.item-radio-checked ion-label{color:var(--ion-color-md-medium,var(--ion-color-medium,#989aa2))}.radio-md-medium.radio-checked .radio-icon{border-color:var(--ion-color-md-medium,var(--ion-color-medium,#989aa2))}.radio-md-medium .radio-inner{background-color:var(--ion-color-md-medium,var(--ion-color-medium,#989aa2))}.item-radio-md-dark.item-radio-checked ion-label{color:var(--ion-color-md-dark,var(--ion-color-dark,#222428))}.radio-md-dark.radio-checked .radio-icon{border-color:var(--ion-color-md-dark,var(--ion-color-dark,#222428))}.radio-md-dark .radio-inner{background-color:var(--ion-color-md-dark,var(--ion-color-dark,#222428))}"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"styleMode",{get:function(){return"md"},enumerable:!0,configurable:!0}),e}(),radioButtonIds=0,RadioGroup=function(){function e(){this.inputId="ion-rg-"+radioGroupIds++,this.labelId=this.inputId+"-lbl",this.radios=[],this.allowEmptySelection=!1,this.name=this.inputId,this.disabled=!1}return e.prototype.disabledChanged=function(){for(var e=0,t=this.radios;e<t.length;e++)t[e].disabled=this.disabled},e.prototype.valueChanged=function(e){this.updateRadios(),this.ionChange.emit({value:e})},e.prototype.onRadioDidLoad=function(e){var t=e.target;t.name=this.name,this.radios.push(t),void 0===this.value&&t.checked?this.value=t.value:this.updateRadios()},e.prototype.onRadioDidUnload=function(e){var t=this.radios.indexOf(e.target);t>-1&&this.radios.splice(t,1)},e.prototype.onRadioSelect=function(e){var t=e.target;t&&(this.value=t.value)},e.prototype.componentDidLoad=function(){var e=this.el.querySelector("ion-list-header");if(e||(e=this.el.querySelector("ion-item-divider")),e){var t=e.querySelector("ion-label");t&&(this.labelId=t.id=this.name+"-lbl")}this.disabledChanged(),this.updateRadios()},e.prototype.updateRadios=function(){for(var e=this.value,t=!1,i=0,o=this.radios;i<o.length;i++){var n=o[i];t||n.value!==e?n.checked=!1:(t=!0,n.checked=!0)}},e.prototype.hostData=function(){var e={role:"radiogroup"};return this.labelId&&(e["aria-labelledby"]=this.labelId),e},Object.defineProperty(e,"is",{get:function(){return"ion-radio-group"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{allowEmptySelection:{type:Boolean,attr:"allow-empty-selection"},disabled:{type:Boolean,attr:"disabled",watchCallbacks:["disabledChanged"]},el:{elementRef:!0},name:{type:String,attr:"name"},value:{type:String,attr:"value",mutable:!0,watchCallbacks:["valueChanged"]}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"events",{get:function(){return[{name:"ionChange",method:"ionChange",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"listeners",{get:function(){return[{name:"ionRadioDidLoad",method:"onRadioDidLoad"},{name:"ionRadioDidUnload",method:"onRadioDidUnload"},{name:"ionSelect",method:"onRadioSelect"}]},enumerable:!0,configurable:!0}),e}(),radioGroupIds=0;export{Radio as IonRadio,RadioGroup as IonRadioGroup};