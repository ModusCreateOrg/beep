export function applyPolyfill(window, document) {
/*!
Array.prototype.find
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
*/
Array.prototype.find||Object.defineProperty(Array.prototype,"find",{writable:!0,configurable:!0,value:function(c,e){if(null==this)throw new TypeError('"this" is null or not defined');var b=Object(this),f=b.length>>>0;if("function"!==typeof c)throw new TypeError("predicate must be a function");for(var a=0;a<f;){var d=b[a];if(c.call(e,d,a,b))return d;a++}}});
/*!
Array.prototype.includes
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
*/
Array.prototype.includes||Object.defineProperty(Array.prototype,"includes",{writable:!0,configurable:!0,value:function(r,e){if(null==this)throw new TypeError('"this" is null or not defined');var t=Object(this),n=t.length>>>0;if(0===n)return!1;var i,o,a=0|e,u=Math.max(0<=a?a:n-Math.abs(a),0);for(;u<n;){if((i=t[u])===(o=r)||"number"==typeof i&&"number"==typeof o&&isNaN(i)&&isNaN(o))return!0;u++}return!1}});
}