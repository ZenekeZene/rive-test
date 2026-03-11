var ag=Object.defineProperty;var cg=(t,e,n)=>e in t?ag(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var xc=(t,e,n)=>(cg(t,typeof e!="symbol"?e+"":e,n),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerpolicy&&(i.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?i.credentials="include":s.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();class ug{constructor(e,n){this.x=e,this.y=n}}class zl extends ug{constructor(e,n,r){super(e,n),this.middleWidth=r.frameWidth*.5,this.middleHeight=r.frameHeight*.5,this.x=e-this.middleWidth,this.y=n-this.middleHeight}get position(){return{x:this.positionX,y:this.positionY}}set position({x:e,y:n}){return this.x=e-this.middleWidth,this.y=n-this.middleHeight,this}}class Hl{constructor(e,n,r){this.numColumns=e,this.numRows=n,this.image=r,this.width=r.width,this.height=r.height,this.setDimensions()}setDimensions(){this.frameWidth=this.width/this.numColumns,this.frameHeight=this.height/this.numRows}get numFrames(){return this.numColumns*this.numRows}get length(){return this.numFrames-1}getSlide(e){const n=e%this.numColumns,r=Math.floor(e/this.numColumns);return{column:n,row:r}}}const Ue={IDDLE:"iddle",FORWARD:"forward",BACKWARD:"backward"};class Gl{constructor(e,n,r){this.target=e,this.drawFrame(n),this.width=r.frameWidth,this.height=r.frameHeight,this.sprite=r}get value(){return this.currentFrame}set value(e){if(e>this.length)throw new Error("frame can not be > of size of sprite");this.drawFrame(e)}drawFrame(e){this.currentFrame=e,setTimeout(()=>{this.target.draw(this.currentFrame,0)},0)}isLimit({isReverse:e,limit:n}={isReverse:!1}){return n?e?this.value<=n:this.value>n:e?this.value<=1:this.value>this.sprite.length}isLimitPingPong({direction:e}){return e===Ue.FORWARD?this.value>=this.sprite.length:this.value<1}}function Wl(){return"ontouchstart"in document.documentElement}function Kl(t,e){t instanceof Array?Yl(t,e):e instanceof Array?t.classList.add(...e):t.classList.add(e)}function Ql(t,e){t instanceof Array?Xl(t,e):e instanceof Array?t.classList.remove(...e):t.classList.remove(e)}function Yl(t,e){if(!t instanceof Array)throw new Error("Invalid element");t.forEach(n=>{Kl(n,e)})}function Xl(t,e){if(!t instanceof Array)throw new Error("Invalid element");t.forEach(n=>{Ql(n,e)})}function lg(t,e){t.classList.toggle(e)}function hg(t,e,n){if(t instanceof Element)n(t,e);else if(t instanceof NodeList)t.forEach(r=>{n(r,e)});else if(t instanceof Object)Object.values(t).forEach(r=>{n(r,e)});else throw new Error("Invalid element")}function dg(t,e){return t.classList.contains(e)}const fg={show:"add",hide:"remove"},A=Object.freeze(Object.defineProperty({__proto__:null,add:Kl,addAll:Yl,contains:dg,forEach:hg,remove:Ql,removeAll:Xl,toggle:lg,toggleActions:fg},Symbol.toStringTag,{value:"Module"})),U=t=>document.getElementById(t),Mn=t=>document.querySelectorAll(t),Jl=t=>document.querySelector(t),Tn=t=>document.getElementsByClassName(t),Ws=()=>document.body,Zl=(t,e)=>{Array.isArray(e)?e.forEach(n=>{t.classList.add(n)}):t.classList.add(e)},pg=({src:t,alt:e,classNames:n=[],target:r,insertMode:s="append"})=>{if(!r)throw new Error("You have to specify a target");const i=document.createElement("img");return i.src=t,i.alt=e,Zl(i,n),r[s](i),i},Ne=({tag:t="p",classNames:e=[],target:n,text:r="",insertMode:s="append"})=>{if(!n)throw new Error("You have to specify a target");const i=document.createElement(t);return Zl(i,e),i.textContent=r,n[s](i),i};function Ho(t){const e="visible",n=t.classList.contains(e)?"remove":"add";t.classList[n](e)}function ce(t,e){if(typeof t!="string")throw new Error("Event name must be a string");const n=new CustomEvent(t,{detail:e});document.dispatchEvent(n)}function X(t,e){if(typeof t!="string")throw new Error("Event name must be a string");document.addEventListener(t,e)}const gg=t=>t*(Math.PI/180),oo=(t,e)=>Math.random()*(e-t)+t;function mg(t,e=.5){if(!Array.isArray(t))throw new TypeError("Input are not an array");return t.sort(()=>Math.random()-e)}const yg={duration:1e3,countdownToZero:!0,interval:1e3};function vg(t=yg){const{duration:e,countdownToZero:n,interval:r,callback:s}=t;if(!s)throw new Error("[interval error]: callback is required");let i=null,o=0,a=null,u=!1;function d(f){if(u)return;i||(i=f,a=Math.ceil(e/r),s&&s(a)),o=f-i;const g=n?Math.ceil(e/r)-Math.floor(o/r):Math.max(Math.ceil(e/r)-Math.floor(o/r),1);g!==a&&g>=0&&(a=g,s&&s(a)),o<e&&(n?g>=0:g>1)&&requestAnimationFrame(d)}return requestAnimationFrame(d),{pause:()=>{u=!0},resume:()=>{u=!1,requestAnimationFrame(d)}}}const rn=(t=1e3)=>new Promise(e=>setTimeout(e,t));function wg(t,e="css"){if(window.Prism=window.Prism||{},window.Prism.manual=!0,!t)throw new Error("Invalid code");if(!Prism.languages[e])throw new Error(`Invalid language: ${e}`);return Prism.highlight(t,Prism.languages[e],e)}const $e=(t,e=!1)=>{const n={};return r=>n[r]?(e&&console.log("cache hit",r),n[r]):(e&&console.log("cache miss",r),n[r]=t(r),n[r])},Eg=t=>t.split("").join(","),Ig=t=>t.split(",").join("");var eh={},Ks={};Ks.byteLength=Sg;Ks.toByteArray=Cg;Ks.fromByteArray=kg;var Ke=[],Ve=[],_g=typeof Uint8Array<"u"?Uint8Array:Array,Di="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(var ln=0,Tg=Di.length;ln<Tg;++ln)Ke[ln]=Di[ln],Ve[Di.charCodeAt(ln)]=ln;Ve["-".charCodeAt(0)]=62;Ve["_".charCodeAt(0)]=63;function th(t){var e=t.length;if(e%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var n=t.indexOf("=");n===-1&&(n=e);var r=n===e?0:4-n%4;return[n,r]}function Sg(t){var e=th(t),n=e[0],r=e[1];return(n+r)*3/4-r}function Ag(t,e,n){return(e+n)*3/4-n}function Cg(t){var e,n=th(t),r=n[0],s=n[1],i=new _g(Ag(t,r,s)),o=0,a=s>0?r-4:r,u;for(u=0;u<a;u+=4)e=Ve[t.charCodeAt(u)]<<18|Ve[t.charCodeAt(u+1)]<<12|Ve[t.charCodeAt(u+2)]<<6|Ve[t.charCodeAt(u+3)],i[o++]=e>>16&255,i[o++]=e>>8&255,i[o++]=e&255;return s===2&&(e=Ve[t.charCodeAt(u)]<<2|Ve[t.charCodeAt(u+1)]>>4,i[o++]=e&255),s===1&&(e=Ve[t.charCodeAt(u)]<<10|Ve[t.charCodeAt(u+1)]<<4|Ve[t.charCodeAt(u+2)]>>2,i[o++]=e>>8&255,i[o++]=e&255),i}function bg(t){return Ke[t>>18&63]+Ke[t>>12&63]+Ke[t>>6&63]+Ke[t&63]}function Rg(t,e,n){for(var r,s=[],i=e;i<n;i+=3)r=(t[i]<<16&16711680)+(t[i+1]<<8&65280)+(t[i+2]&255),s.push(bg(r));return s.join("")}function kg(t){for(var e,n=t.length,r=n%3,s=[],i=16383,o=0,a=n-r;o<a;o+=i)s.push(Rg(t,o,o+i>a?a:o+i));return r===1?(e=t[n-1],s.push(Ke[e>>2]+Ke[e<<4&63]+"==")):r===2&&(e=(t[n-2]<<8)+t[n-1],s.push(Ke[e>>10]+Ke[e>>4&63]+Ke[e<<2&63]+"=")),s.join("")}var Go={};/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */Go.read=function(t,e,n,r,s){var i,o,a=s*8-r-1,u=(1<<a)-1,d=u>>1,f=-7,g=n?s-1:0,y=n?-1:1,v=t[e+g];for(g+=y,i=v&(1<<-f)-1,v>>=-f,f+=a;f>0;i=i*256+t[e+g],g+=y,f-=8);for(o=i&(1<<-f)-1,i>>=-f,f+=r;f>0;o=o*256+t[e+g],g+=y,f-=8);if(i===0)i=1-d;else{if(i===u)return o?NaN:(v?-1:1)*(1/0);o=o+Math.pow(2,r),i=i-d}return(v?-1:1)*o*Math.pow(2,i-r)};Go.write=function(t,e,n,r,s,i){var o,a,u,d=i*8-s-1,f=(1<<d)-1,g=f>>1,y=s===23?Math.pow(2,-24)-Math.pow(2,-77):0,v=r?0:i-1,T=r?1:-1,b=e<0||e===0&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(a=isNaN(e)?1:0,o=f):(o=Math.floor(Math.log(e)/Math.LN2),e*(u=Math.pow(2,-o))<1&&(o--,u*=2),o+g>=1?e+=y/u:e+=y*Math.pow(2,1-g),e*u>=2&&(o++,u/=2),o+g>=f?(a=0,o=f):o+g>=1?(a=(e*u-1)*Math.pow(2,s),o=o+g):(a=e*Math.pow(2,g-1)*Math.pow(2,s),o=0));s>=8;t[n+v]=a&255,v+=T,a/=256,s-=8);for(o=o<<s|a,d+=s;d>0;t[n+v]=o&255,v+=T,o/=256,d-=8);t[n+v-T]|=b*128};/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */(function(t){const e=Ks,n=Go,r=typeof Symbol=="function"&&typeof Symbol.for=="function"?Symbol.for("nodejs.util.inspect.custom"):null;t.Buffer=a,t.SlowBuffer=F,t.INSPECT_MAX_BYTES=50;const s=2147483647;t.kMaxLength=s,a.TYPED_ARRAY_SUPPORT=i(),!a.TYPED_ARRAY_SUPPORT&&typeof console<"u"&&typeof console.error=="function"&&console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");function i(){try{const c=new Uint8Array(1),l={foo:function(){return 42}};return Object.setPrototypeOf(l,Uint8Array.prototype),Object.setPrototypeOf(c,l),c.foo()===42}catch{return!1}}Object.defineProperty(a.prototype,"parent",{enumerable:!0,get:function(){if(a.isBuffer(this))return this.buffer}}),Object.defineProperty(a.prototype,"offset",{enumerable:!0,get:function(){if(a.isBuffer(this))return this.byteOffset}});function o(c){if(c>s)throw new RangeError('The value "'+c+'" is invalid for option "size"');const l=new Uint8Array(c);return Object.setPrototypeOf(l,a.prototype),l}function a(c,l,h){if(typeof c=="number"){if(typeof l=="string")throw new TypeError('The "string" argument must be of type string. Received type number');return g(c)}return u(c,l,h)}a.poolSize=8192;function u(c,l,h){if(typeof c=="string")return y(c,l);if(ArrayBuffer.isView(c))return T(c);if(c==null)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof c);if(Ge(c,ArrayBuffer)||c&&Ge(c.buffer,ArrayBuffer)||typeof SharedArrayBuffer<"u"&&(Ge(c,SharedArrayBuffer)||c&&Ge(c.buffer,SharedArrayBuffer)))return b(c,l,h);if(typeof c=="number")throw new TypeError('The "value" argument must not be of type number. Received type number');const p=c.valueOf&&c.valueOf();if(p!=null&&p!==c)return a.from(p,l,h);const m=R(c);if(m)return m;if(typeof Symbol<"u"&&Symbol.toPrimitive!=null&&typeof c[Symbol.toPrimitive]=="function")return a.from(c[Symbol.toPrimitive]("string"),l,h);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof c)}a.from=function(c,l,h){return u(c,l,h)},Object.setPrototypeOf(a.prototype,Uint8Array.prototype),Object.setPrototypeOf(a,Uint8Array);function d(c){if(typeof c!="number")throw new TypeError('"size" argument must be of type number');if(c<0)throw new RangeError('The value "'+c+'" is invalid for option "size"')}function f(c,l,h){return d(c),c<=0?o(c):l!==void 0?typeof h=="string"?o(c).fill(l,h):o(c).fill(l):o(c)}a.alloc=function(c,l,h){return f(c,l,h)};function g(c){return d(c),o(c<0?0:B(c)|0)}a.allocUnsafe=function(c){return g(c)},a.allocUnsafeSlow=function(c){return g(c)};function y(c,l){if((typeof l!="string"||l==="")&&(l="utf8"),!a.isEncoding(l))throw new TypeError("Unknown encoding: "+l);const h=q(c,l)|0;let p=o(h);const m=p.write(c,l);return m!==h&&(p=p.slice(0,m)),p}function v(c){const l=c.length<0?0:B(c.length)|0,h=o(l);for(let p=0;p<l;p+=1)h[p]=c[p]&255;return h}function T(c){if(Ge(c,Uint8Array)){const l=new Uint8Array(c);return b(l.buffer,l.byteOffset,l.byteLength)}return v(c)}function b(c,l,h){if(l<0||c.byteLength<l)throw new RangeError('"offset" is outside of buffer bounds');if(c.byteLength<l+(h||0))throw new RangeError('"length" is outside of buffer bounds');let p;return l===void 0&&h===void 0?p=new Uint8Array(c):h===void 0?p=new Uint8Array(c,l):p=new Uint8Array(c,l,h),Object.setPrototypeOf(p,a.prototype),p}function R(c){if(a.isBuffer(c)){const l=B(c.length)|0,h=o(l);return h.length===0||c.copy(h,0,0,l),h}if(c.length!==void 0)return typeof c.length!="number"||Oi(c.length)?o(0):v(c);if(c.type==="Buffer"&&Array.isArray(c.data))return v(c.data)}function B(c){if(c>=s)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+s.toString(16)+" bytes");return c|0}function F(c){return+c!=c&&(c=0),a.alloc(+c)}a.isBuffer=function(c){return c!=null&&c._isBuffer===!0&&c!==a.prototype},a.compare=function(c,l){if(Ge(c,Uint8Array)&&(c=a.from(c,c.offset,c.byteLength)),Ge(l,Uint8Array)&&(l=a.from(l,l.offset,l.byteLength)),!a.isBuffer(c)||!a.isBuffer(l))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(c===l)return 0;let h=c.length,p=l.length;for(let m=0,w=Math.min(h,p);m<w;++m)if(c[m]!==l[m]){h=c[m],p=l[m];break}return h<p?-1:p<h?1:0},a.isEncoding=function(c){switch(String(c).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},a.concat=function(c,l){if(!Array.isArray(c))throw new TypeError('"list" argument must be an Array of Buffers');if(c.length===0)return a.alloc(0);let h;if(l===void 0)for(l=0,h=0;h<c.length;++h)l+=c[h].length;const p=a.allocUnsafe(l);let m=0;for(h=0;h<c.length;++h){let w=c[h];if(Ge(w,Uint8Array))m+w.length>p.length?(a.isBuffer(w)||(w=a.from(w)),w.copy(p,m)):Uint8Array.prototype.set.call(p,w,m);else if(a.isBuffer(w))w.copy(p,m);else throw new TypeError('"list" argument must be an Array of Buffers');m+=w.length}return p};function q(c,l){if(a.isBuffer(c))return c.length;if(ArrayBuffer.isView(c)||Ge(c,ArrayBuffer))return c.byteLength;if(typeof c!="string")throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof c);const h=c.length,p=arguments.length>2&&arguments[2]===!0;if(!p&&h===0)return 0;let m=!1;for(;;)switch(l){case"ascii":case"latin1":case"binary":return h;case"utf8":case"utf-8":return Li(c).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return h*2;case"hex":return h>>>1;case"base64":return Pc(c).length;default:if(m)return p?-1:Li(c).length;l=(""+l).toLowerCase(),m=!0}}a.byteLength=q;function ne(c,l,h){let p=!1;if((l===void 0||l<0)&&(l=0),l>this.length||((h===void 0||h>this.length)&&(h=this.length),h<=0)||(h>>>=0,l>>>=0,h<=l))return"";for(c||(c="utf8");;)switch(c){case"hex":return Jp(this,l,h);case"utf8":case"utf-8":return Cc(this,l,h);case"ascii":return Yp(this,l,h);case"latin1":case"binary":return Xp(this,l,h);case"base64":return Kp(this,l,h);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Zp(this,l,h);default:if(p)throw new TypeError("Unknown encoding: "+c);c=(c+"").toLowerCase(),p=!0}}a.prototype._isBuffer=!0;function ue(c,l,h){const p=c[l];c[l]=c[h],c[h]=p}a.prototype.swap16=function(){const c=this.length;if(c%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(let l=0;l<c;l+=2)ue(this,l,l+1);return this},a.prototype.swap32=function(){const c=this.length;if(c%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(let l=0;l<c;l+=4)ue(this,l,l+3),ue(this,l+1,l+2);return this},a.prototype.swap64=function(){const c=this.length;if(c%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(let l=0;l<c;l+=8)ue(this,l,l+7),ue(this,l+1,l+6),ue(this,l+2,l+5),ue(this,l+3,l+4);return this},a.prototype.toString=function(){const c=this.length;return c===0?"":arguments.length===0?Cc(this,0,c):ne.apply(this,arguments)},a.prototype.toLocaleString=a.prototype.toString,a.prototype.equals=function(c){if(!a.isBuffer(c))throw new TypeError("Argument must be a Buffer");return this===c?!0:a.compare(this,c)===0},a.prototype.inspect=function(){let c="";const l=t.INSPECT_MAX_BYTES;return c=this.toString("hex",0,l).replace(/(.{2})/g,"$1 ").trim(),this.length>l&&(c+=" ... "),"<Buffer "+c+">"},r&&(a.prototype[r]=a.prototype.inspect),a.prototype.compare=function(c,l,h,p,m){if(Ge(c,Uint8Array)&&(c=a.from(c,c.offset,c.byteLength)),!a.isBuffer(c))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof c);if(l===void 0&&(l=0),h===void 0&&(h=c?c.length:0),p===void 0&&(p=0),m===void 0&&(m=this.length),l<0||h>c.length||p<0||m>this.length)throw new RangeError("out of range index");if(p>=m&&l>=h)return 0;if(p>=m)return-1;if(l>=h)return 1;if(l>>>=0,h>>>=0,p>>>=0,m>>>=0,this===c)return 0;let w=m-p,_=h-l;const W=Math.min(w,_),ge=this.slice(p,m),Z=c.slice(l,h);for(let K=0;K<W;++K)if(ge[K]!==Z[K]){w=ge[K],_=Z[K];break}return w<_?-1:_<w?1:0};function He(c,l,h,p,m){if(c.length===0)return-1;if(typeof h=="string"?(p=h,h=0):h>2147483647?h=2147483647:h<-2147483648&&(h=-2147483648),h=+h,Oi(h)&&(h=m?0:c.length-1),h<0&&(h=c.length+h),h>=c.length){if(m)return-1;h=c.length-1}else if(h<0)if(m)h=0;else return-1;if(typeof l=="string"&&(l=a.from(l,p)),a.isBuffer(l))return l.length===0?-1:vt(c,l,h,p,m);if(typeof l=="number")return l=l&255,typeof Uint8Array.prototype.indexOf=="function"?m?Uint8Array.prototype.indexOf.call(c,l,h):Uint8Array.prototype.lastIndexOf.call(c,l,h):vt(c,[l],h,p,m);throw new TypeError("val must be string, number or Buffer")}function vt(c,l,h,p,m){let w=1,_=c.length,W=l.length;if(p!==void 0&&(p=String(p).toLowerCase(),p==="ucs2"||p==="ucs-2"||p==="utf16le"||p==="utf-16le")){if(c.length<2||l.length<2)return-1;w=2,_/=2,W/=2,h/=2}function ge(K,re){return w===1?K[re]:K.readUInt16BE(re*w)}let Z;if(m){let K=-1;for(Z=h;Z<_;Z++)if(ge(c,Z)===ge(l,K===-1?0:Z-K)){if(K===-1&&(K=Z),Z-K+1===W)return K*w}else K!==-1&&(Z-=Z-K),K=-1}else for(h+W>_&&(h=_-W),Z=h;Z>=0;Z--){let K=!0;for(let re=0;re<W;re++)if(ge(c,Z+re)!==ge(l,re)){K=!1;break}if(K)return Z}return-1}a.prototype.includes=function(c,l,h){return this.indexOf(c,l,h)!==-1},a.prototype.indexOf=function(c,l,h){return He(this,c,l,h,!0)},a.prototype.lastIndexOf=function(c,l,h){return He(this,c,l,h,!1)};function qn(c,l,h,p){h=Number(h)||0;const m=c.length-h;p?(p=Number(p),p>m&&(p=m)):p=m;const w=l.length;p>w/2&&(p=w/2);let _;for(_=0;_<p;++_){const W=parseInt(l.substr(_*2,2),16);if(Oi(W))return _;c[h+_]=W}return _}function wt(c,l,h,p){return Zr(Li(l,c.length-h),c,h,p)}function ki(c,l,h,p){return Zr(rg(l),c,h,p)}function Gp(c,l,h,p){return Zr(Pc(l),c,h,p)}function Wp(c,l,h,p){return Zr(sg(l,c.length-h),c,h,p)}a.prototype.write=function(c,l,h,p){if(l===void 0)p="utf8",h=this.length,l=0;else if(h===void 0&&typeof l=="string")p=l,h=this.length,l=0;else if(isFinite(l))l=l>>>0,isFinite(h)?(h=h>>>0,p===void 0&&(p="utf8")):(p=h,h=void 0);else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");const m=this.length-l;if((h===void 0||h>m)&&(h=m),c.length>0&&(h<0||l<0)||l>this.length)throw new RangeError("Attempt to write outside buffer bounds");p||(p="utf8");let w=!1;for(;;)switch(p){case"hex":return qn(this,c,l,h);case"utf8":case"utf-8":return wt(this,c,l,h);case"ascii":case"latin1":case"binary":return ki(this,c,l,h);case"base64":return Gp(this,c,l,h);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Wp(this,c,l,h);default:if(w)throw new TypeError("Unknown encoding: "+p);p=(""+p).toLowerCase(),w=!0}},a.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function Kp(c,l,h){return l===0&&h===c.length?e.fromByteArray(c):e.fromByteArray(c.slice(l,h))}function Cc(c,l,h){h=Math.min(c.length,h);const p=[];let m=l;for(;m<h;){const w=c[m];let _=null,W=w>239?4:w>223?3:w>191?2:1;if(m+W<=h){let ge,Z,K,re;switch(W){case 1:w<128&&(_=w);break;case 2:ge=c[m+1],(ge&192)===128&&(re=(w&31)<<6|ge&63,re>127&&(_=re));break;case 3:ge=c[m+1],Z=c[m+2],(ge&192)===128&&(Z&192)===128&&(re=(w&15)<<12|(ge&63)<<6|Z&63,re>2047&&(re<55296||re>57343)&&(_=re));break;case 4:ge=c[m+1],Z=c[m+2],K=c[m+3],(ge&192)===128&&(Z&192)===128&&(K&192)===128&&(re=(w&15)<<18|(ge&63)<<12|(Z&63)<<6|K&63,re>65535&&re<1114112&&(_=re))}}_===null?(_=65533,W=1):_>65535&&(_-=65536,p.push(_>>>10&1023|55296),_=56320|_&1023),p.push(_),m+=W}return Qp(p)}const bc=4096;function Qp(c){const l=c.length;if(l<=bc)return String.fromCharCode.apply(String,c);let h="",p=0;for(;p<l;)h+=String.fromCharCode.apply(String,c.slice(p,p+=bc));return h}function Yp(c,l,h){let p="";h=Math.min(c.length,h);for(let m=l;m<h;++m)p+=String.fromCharCode(c[m]&127);return p}function Xp(c,l,h){let p="";h=Math.min(c.length,h);for(let m=l;m<h;++m)p+=String.fromCharCode(c[m]);return p}function Jp(c,l,h){const p=c.length;(!l||l<0)&&(l=0),(!h||h<0||h>p)&&(h=p);let m="";for(let w=l;w<h;++w)m+=ig[c[w]];return m}function Zp(c,l,h){const p=c.slice(l,h);let m="";for(let w=0;w<p.length-1;w+=2)m+=String.fromCharCode(p[w]+p[w+1]*256);return m}a.prototype.slice=function(c,l){const h=this.length;c=~~c,l=l===void 0?h:~~l,c<0?(c+=h,c<0&&(c=0)):c>h&&(c=h),l<0?(l+=h,l<0&&(l=0)):l>h&&(l=h),l<c&&(l=c);const p=this.subarray(c,l);return Object.setPrototypeOf(p,a.prototype),p};function le(c,l,h){if(c%1!==0||c<0)throw new RangeError("offset is not uint");if(c+l>h)throw new RangeError("Trying to access beyond buffer length")}a.prototype.readUintLE=a.prototype.readUIntLE=function(c,l,h){c=c>>>0,l=l>>>0,h||le(c,l,this.length);let p=this[c],m=1,w=0;for(;++w<l&&(m*=256);)p+=this[c+w]*m;return p},a.prototype.readUintBE=a.prototype.readUIntBE=function(c,l,h){c=c>>>0,l=l>>>0,h||le(c,l,this.length);let p=this[c+--l],m=1;for(;l>0&&(m*=256);)p+=this[c+--l]*m;return p},a.prototype.readUint8=a.prototype.readUInt8=function(c,l){return c=c>>>0,l||le(c,1,this.length),this[c]},a.prototype.readUint16LE=a.prototype.readUInt16LE=function(c,l){return c=c>>>0,l||le(c,2,this.length),this[c]|this[c+1]<<8},a.prototype.readUint16BE=a.prototype.readUInt16BE=function(c,l){return c=c>>>0,l||le(c,2,this.length),this[c]<<8|this[c+1]},a.prototype.readUint32LE=a.prototype.readUInt32LE=function(c,l){return c=c>>>0,l||le(c,4,this.length),(this[c]|this[c+1]<<8|this[c+2]<<16)+this[c+3]*16777216},a.prototype.readUint32BE=a.prototype.readUInt32BE=function(c,l){return c=c>>>0,l||le(c,4,this.length),this[c]*16777216+(this[c+1]<<16|this[c+2]<<8|this[c+3])},a.prototype.readBigUInt64LE=Et(function(c){c=c>>>0,un(c,"offset");const l=this[c],h=this[c+7];(l===void 0||h===void 0)&&zn(c,this.length-8);const p=l+this[++c]*2**8+this[++c]*2**16+this[++c]*2**24,m=this[++c]+this[++c]*2**8+this[++c]*2**16+h*2**24;return BigInt(p)+(BigInt(m)<<BigInt(32))}),a.prototype.readBigUInt64BE=Et(function(c){c=c>>>0,un(c,"offset");const l=this[c],h=this[c+7];(l===void 0||h===void 0)&&zn(c,this.length-8);const p=l*2**24+this[++c]*2**16+this[++c]*2**8+this[++c],m=this[++c]*2**24+this[++c]*2**16+this[++c]*2**8+h;return(BigInt(p)<<BigInt(32))+BigInt(m)}),a.prototype.readIntLE=function(c,l,h){c=c>>>0,l=l>>>0,h||le(c,l,this.length);let p=this[c],m=1,w=0;for(;++w<l&&(m*=256);)p+=this[c+w]*m;return m*=128,p>=m&&(p-=Math.pow(2,8*l)),p},a.prototype.readIntBE=function(c,l,h){c=c>>>0,l=l>>>0,h||le(c,l,this.length);let p=l,m=1,w=this[c+--p];for(;p>0&&(m*=256);)w+=this[c+--p]*m;return m*=128,w>=m&&(w-=Math.pow(2,8*l)),w},a.prototype.readInt8=function(c,l){return c=c>>>0,l||le(c,1,this.length),this[c]&128?(255-this[c]+1)*-1:this[c]},a.prototype.readInt16LE=function(c,l){c=c>>>0,l||le(c,2,this.length);const h=this[c]|this[c+1]<<8;return h&32768?h|4294901760:h},a.prototype.readInt16BE=function(c,l){c=c>>>0,l||le(c,2,this.length);const h=this[c+1]|this[c]<<8;return h&32768?h|4294901760:h},a.prototype.readInt32LE=function(c,l){return c=c>>>0,l||le(c,4,this.length),this[c]|this[c+1]<<8|this[c+2]<<16|this[c+3]<<24},a.prototype.readInt32BE=function(c,l){return c=c>>>0,l||le(c,4,this.length),this[c]<<24|this[c+1]<<16|this[c+2]<<8|this[c+3]},a.prototype.readBigInt64LE=Et(function(c){c=c>>>0,un(c,"offset");const l=this[c],h=this[c+7];(l===void 0||h===void 0)&&zn(c,this.length-8);const p=this[c+4]+this[c+5]*2**8+this[c+6]*2**16+(h<<24);return(BigInt(p)<<BigInt(32))+BigInt(l+this[++c]*2**8+this[++c]*2**16+this[++c]*2**24)}),a.prototype.readBigInt64BE=Et(function(c){c=c>>>0,un(c,"offset");const l=this[c],h=this[c+7];(l===void 0||h===void 0)&&zn(c,this.length-8);const p=(l<<24)+this[++c]*2**16+this[++c]*2**8+this[++c];return(BigInt(p)<<BigInt(32))+BigInt(this[++c]*2**24+this[++c]*2**16+this[++c]*2**8+h)}),a.prototype.readFloatLE=function(c,l){return c=c>>>0,l||le(c,4,this.length),n.read(this,c,!0,23,4)},a.prototype.readFloatBE=function(c,l){return c=c>>>0,l||le(c,4,this.length),n.read(this,c,!1,23,4)},a.prototype.readDoubleLE=function(c,l){return c=c>>>0,l||le(c,8,this.length),n.read(this,c,!0,52,8)},a.prototype.readDoubleBE=function(c,l){return c=c>>>0,l||le(c,8,this.length),n.read(this,c,!1,52,8)};function Me(c,l,h,p,m,w){if(!a.isBuffer(c))throw new TypeError('"buffer" argument must be a Buffer instance');if(l>m||l<w)throw new RangeError('"value" argument is out of bounds');if(h+p>c.length)throw new RangeError("Index out of range")}a.prototype.writeUintLE=a.prototype.writeUIntLE=function(c,l,h,p){if(c=+c,l=l>>>0,h=h>>>0,!p){const _=Math.pow(2,8*h)-1;Me(this,c,l,h,_,0)}let m=1,w=0;for(this[l]=c&255;++w<h&&(m*=256);)this[l+w]=c/m&255;return l+h},a.prototype.writeUintBE=a.prototype.writeUIntBE=function(c,l,h,p){if(c=+c,l=l>>>0,h=h>>>0,!p){const _=Math.pow(2,8*h)-1;Me(this,c,l,h,_,0)}let m=h-1,w=1;for(this[l+m]=c&255;--m>=0&&(w*=256);)this[l+m]=c/w&255;return l+h},a.prototype.writeUint8=a.prototype.writeUInt8=function(c,l,h){return c=+c,l=l>>>0,h||Me(this,c,l,1,255,0),this[l]=c&255,l+1},a.prototype.writeUint16LE=a.prototype.writeUInt16LE=function(c,l,h){return c=+c,l=l>>>0,h||Me(this,c,l,2,65535,0),this[l]=c&255,this[l+1]=c>>>8,l+2},a.prototype.writeUint16BE=a.prototype.writeUInt16BE=function(c,l,h){return c=+c,l=l>>>0,h||Me(this,c,l,2,65535,0),this[l]=c>>>8,this[l+1]=c&255,l+2},a.prototype.writeUint32LE=a.prototype.writeUInt32LE=function(c,l,h){return c=+c,l=l>>>0,h||Me(this,c,l,4,4294967295,0),this[l+3]=c>>>24,this[l+2]=c>>>16,this[l+1]=c>>>8,this[l]=c&255,l+4},a.prototype.writeUint32BE=a.prototype.writeUInt32BE=function(c,l,h){return c=+c,l=l>>>0,h||Me(this,c,l,4,4294967295,0),this[l]=c>>>24,this[l+1]=c>>>16,this[l+2]=c>>>8,this[l+3]=c&255,l+4};function Rc(c,l,h,p,m){Mc(l,p,m,c,h,7);let w=Number(l&BigInt(4294967295));c[h++]=w,w=w>>8,c[h++]=w,w=w>>8,c[h++]=w,w=w>>8,c[h++]=w;let _=Number(l>>BigInt(32)&BigInt(4294967295));return c[h++]=_,_=_>>8,c[h++]=_,_=_>>8,c[h++]=_,_=_>>8,c[h++]=_,h}function kc(c,l,h,p,m){Mc(l,p,m,c,h,7);let w=Number(l&BigInt(4294967295));c[h+7]=w,w=w>>8,c[h+6]=w,w=w>>8,c[h+5]=w,w=w>>8,c[h+4]=w;let _=Number(l>>BigInt(32)&BigInt(4294967295));return c[h+3]=_,_=_>>8,c[h+2]=_,_=_>>8,c[h+1]=_,_=_>>8,c[h]=_,h+8}a.prototype.writeBigUInt64LE=Et(function(c,l=0){return Rc(this,c,l,BigInt(0),BigInt("0xffffffffffffffff"))}),a.prototype.writeBigUInt64BE=Et(function(c,l=0){return kc(this,c,l,BigInt(0),BigInt("0xffffffffffffffff"))}),a.prototype.writeIntLE=function(c,l,h,p){if(c=+c,l=l>>>0,!p){const W=Math.pow(2,8*h-1);Me(this,c,l,h,W-1,-W)}let m=0,w=1,_=0;for(this[l]=c&255;++m<h&&(w*=256);)c<0&&_===0&&this[l+m-1]!==0&&(_=1),this[l+m]=(c/w>>0)-_&255;return l+h},a.prototype.writeIntBE=function(c,l,h,p){if(c=+c,l=l>>>0,!p){const W=Math.pow(2,8*h-1);Me(this,c,l,h,W-1,-W)}let m=h-1,w=1,_=0;for(this[l+m]=c&255;--m>=0&&(w*=256);)c<0&&_===0&&this[l+m+1]!==0&&(_=1),this[l+m]=(c/w>>0)-_&255;return l+h},a.prototype.writeInt8=function(c,l,h){return c=+c,l=l>>>0,h||Me(this,c,l,1,127,-128),c<0&&(c=255+c+1),this[l]=c&255,l+1},a.prototype.writeInt16LE=function(c,l,h){return c=+c,l=l>>>0,h||Me(this,c,l,2,32767,-32768),this[l]=c&255,this[l+1]=c>>>8,l+2},a.prototype.writeInt16BE=function(c,l,h){return c=+c,l=l>>>0,h||Me(this,c,l,2,32767,-32768),this[l]=c>>>8,this[l+1]=c&255,l+2},a.prototype.writeInt32LE=function(c,l,h){return c=+c,l=l>>>0,h||Me(this,c,l,4,2147483647,-2147483648),this[l]=c&255,this[l+1]=c>>>8,this[l+2]=c>>>16,this[l+3]=c>>>24,l+4},a.prototype.writeInt32BE=function(c,l,h){return c=+c,l=l>>>0,h||Me(this,c,l,4,2147483647,-2147483648),c<0&&(c=4294967295+c+1),this[l]=c>>>24,this[l+1]=c>>>16,this[l+2]=c>>>8,this[l+3]=c&255,l+4},a.prototype.writeBigInt64LE=Et(function(c,l=0){return Rc(this,c,l,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))}),a.prototype.writeBigInt64BE=Et(function(c,l=0){return kc(this,c,l,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))});function Nc(c,l,h,p,m,w){if(h+p>c.length)throw new RangeError("Index out of range");if(h<0)throw new RangeError("Index out of range")}function Lc(c,l,h,p,m){return l=+l,h=h>>>0,m||Nc(c,l,h,4),n.write(c,l,h,p,23,4),h+4}a.prototype.writeFloatLE=function(c,l,h){return Lc(this,c,l,!0,h)},a.prototype.writeFloatBE=function(c,l,h){return Lc(this,c,l,!1,h)};function Oc(c,l,h,p,m){return l=+l,h=h>>>0,m||Nc(c,l,h,8),n.write(c,l,h,p,52,8),h+8}a.prototype.writeDoubleLE=function(c,l,h){return Oc(this,c,l,!0,h)},a.prototype.writeDoubleBE=function(c,l,h){return Oc(this,c,l,!1,h)},a.prototype.copy=function(c,l,h,p){if(!a.isBuffer(c))throw new TypeError("argument should be a Buffer");if(h||(h=0),!p&&p!==0&&(p=this.length),l>=c.length&&(l=c.length),l||(l=0),p>0&&p<h&&(p=h),p===h||c.length===0||this.length===0)return 0;if(l<0)throw new RangeError("targetStart out of bounds");if(h<0||h>=this.length)throw new RangeError("Index out of range");if(p<0)throw new RangeError("sourceEnd out of bounds");p>this.length&&(p=this.length),c.length-l<p-h&&(p=c.length-l+h);const m=p-h;return this===c&&typeof Uint8Array.prototype.copyWithin=="function"?this.copyWithin(l,h,p):Uint8Array.prototype.set.call(c,this.subarray(h,p),l),m},a.prototype.fill=function(c,l,h,p){if(typeof c=="string"){if(typeof l=="string"?(p=l,l=0,h=this.length):typeof h=="string"&&(p=h,h=this.length),p!==void 0&&typeof p!="string")throw new TypeError("encoding must be a string");if(typeof p=="string"&&!a.isEncoding(p))throw new TypeError("Unknown encoding: "+p);if(c.length===1){const w=c.charCodeAt(0);(p==="utf8"&&w<128||p==="latin1")&&(c=w)}}else typeof c=="number"?c=c&255:typeof c=="boolean"&&(c=Number(c));if(l<0||this.length<l||this.length<h)throw new RangeError("Out of range index");if(h<=l)return this;l=l>>>0,h=h===void 0?this.length:h>>>0,c||(c=0);let m;if(typeof c=="number")for(m=l;m<h;++m)this[m]=c;else{const w=a.isBuffer(c)?c:a.from(c,p),_=w.length;if(_===0)throw new TypeError('The value "'+c+'" is invalid for argument "value"');for(m=0;m<h-l;++m)this[m+l]=w[m%_]}return this};const cn={};function Ni(c,l,h){cn[c]=class extends h{constructor(){super(),Object.defineProperty(this,"message",{value:l.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${c}]`,this.stack,delete this.name}get code(){return c}set code(p){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:p,writable:!0})}toString(){return`${this.name} [${c}]: ${this.message}`}}}Ni("ERR_BUFFER_OUT_OF_BOUNDS",function(c){return c?`${c} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"},RangeError),Ni("ERR_INVALID_ARG_TYPE",function(c,l){return`The "${c}" argument must be of type number. Received type ${typeof l}`},TypeError),Ni("ERR_OUT_OF_RANGE",function(c,l,h){let p=`The value of "${c}" is out of range.`,m=h;return Number.isInteger(h)&&Math.abs(h)>2**32?m=Dc(String(h)):typeof h=="bigint"&&(m=String(h),(h>BigInt(2)**BigInt(32)||h<-(BigInt(2)**BigInt(32)))&&(m=Dc(m)),m+="n"),p+=` It must be ${l}. Received ${m}`,p},RangeError);function Dc(c){let l="",h=c.length;const p=c[0]==="-"?1:0;for(;h>=p+4;h-=3)l=`_${c.slice(h-3,h)}${l}`;return`${c.slice(0,h)}${l}`}function eg(c,l,h){un(l,"offset"),(c[l]===void 0||c[l+h]===void 0)&&zn(l,c.length-(h+1))}function Mc(c,l,h,p,m,w){if(c>h||c<l){const _=typeof l=="bigint"?"n":"";let W;throw w>3?l===0||l===BigInt(0)?W=`>= 0${_} and < 2${_} ** ${(w+1)*8}${_}`:W=`>= -(2${_} ** ${(w+1)*8-1}${_}) and < 2 ** ${(w+1)*8-1}${_}`:W=`>= ${l}${_} and <= ${h}${_}`,new cn.ERR_OUT_OF_RANGE("value",W,c)}eg(p,m,w)}function un(c,l){if(typeof c!="number")throw new cn.ERR_INVALID_ARG_TYPE(l,"number",c)}function zn(c,l,h){throw Math.floor(c)!==c?(un(c,h),new cn.ERR_OUT_OF_RANGE(h||"offset","an integer",c)):l<0?new cn.ERR_BUFFER_OUT_OF_BOUNDS:new cn.ERR_OUT_OF_RANGE(h||"offset",`>= ${h?1:0} and <= ${l}`,c)}const tg=/[^+/0-9A-Za-z-_]/g;function ng(c){if(c=c.split("=")[0],c=c.trim().replace(tg,""),c.length<2)return"";for(;c.length%4!==0;)c=c+"=";return c}function Li(c,l){l=l||1/0;let h;const p=c.length;let m=null;const w=[];for(let _=0;_<p;++_){if(h=c.charCodeAt(_),h>55295&&h<57344){if(!m){if(h>56319){(l-=3)>-1&&w.push(239,191,189);continue}else if(_+1===p){(l-=3)>-1&&w.push(239,191,189);continue}m=h;continue}if(h<56320){(l-=3)>-1&&w.push(239,191,189),m=h;continue}h=(m-55296<<10|h-56320)+65536}else m&&(l-=3)>-1&&w.push(239,191,189);if(m=null,h<128){if((l-=1)<0)break;w.push(h)}else if(h<2048){if((l-=2)<0)break;w.push(h>>6|192,h&63|128)}else if(h<65536){if((l-=3)<0)break;w.push(h>>12|224,h>>6&63|128,h&63|128)}else if(h<1114112){if((l-=4)<0)break;w.push(h>>18|240,h>>12&63|128,h>>6&63|128,h&63|128)}else throw new Error("Invalid code point")}return w}function rg(c){const l=[];for(let h=0;h<c.length;++h)l.push(c.charCodeAt(h)&255);return l}function sg(c,l){let h,p,m;const w=[];for(let _=0;_<c.length&&!((l-=2)<0);++_)h=c.charCodeAt(_),p=h>>8,m=h%256,w.push(m),w.push(p);return w}function Pc(c){return e.toByteArray(ng(c))}function Zr(c,l,h,p){let m;for(m=0;m<p&&!(m+h>=l.length||m>=c.length);++m)l[m+h]=c[m];return m}function Ge(c,l){return c instanceof l||c!=null&&c.constructor!=null&&c.constructor.name!=null&&c.constructor.name===l.name}function Oi(c){return c!==c}const ig=function(){const c="0123456789abcdef",l=new Array(256);for(let h=0;h<16;++h){const p=h*16;for(let m=0;m<16;++m)l[p+m]=c[h]+c[m]}return l}();function Et(c){return typeof BigInt>"u"?og:c}function og(){throw new Error("BigInt not supported")}})(eh);const Uc=t=>new eh.Buffer(t,"base64").toString("utf-8"),ao=Object.freeze({CIRCLE:"circle",SQUARE:"square"}),nh={columns:3,rows:3,shape:ao.SQUARE,totalEyesInCircle:9,pupil:{color:"#b95377",size:.2,minSize:.1,maxSize:.2,step:.05},wave:!1,sizeColision:.1,sound:!1},rh=Object.freeze({ANSWERED_CORRECT:"answeredCorrect",FIRST_CLICK:"firstClick",END_TIMER:"endTimer",INACTIVE_TAB:"inactiveTab",CHANGES_IN_SETTINGS:"changesInSettings",USER_LOGGED:"userLogged",USER_NOT_LOGGED:"userNotLogged",GO_TO_LEADERBOARD:"leaderboard",NEW_RECORD:"newRecord",NO_INTERNET:"noInternet",ERROR_WITH_SIGN_IN:"errorWithSignIn",MODAL_OPEN:"modalOpen",MODAL_CLOSE:"modalClose"}),Ng={get(t,e){if(!rh.hasOwnProperty(e))throw new Error(`Event ${e} does not exist.`);return Reflect.get(...arguments)}},D=new Proxy(rh,Ng),Bc=t=>Number(Math.round(t)),Lg=function(){let t;function e(){if(t)return t;t=this,this.value=0,this.increment=function(n=1){this.value+=Bc(n)},this.update=function(n){this.value=Bc(n)}}return e}(),Og=function(){let t;function e(){if(t)return t;t=this,this.isLogged=!1,this.user=null,this.setUser=function(n){this.user=n,this.isLogged=Boolean(n)},X(D.USER_LOGGED,({detail:n})=>{this.setUser(n.user)}),X(D.USER_NOT_LOGGED,()=>{this.setUser(null)})}return e}(),de={awakening:new Lg,auth:new Og};let Fc=!1;function Dg(){U("collider").addEventListener("click",async e=>{Fc||(Fc=!0,ce(D.FIRST_CLICK))})}const G="hidden",Es="invisible",st="visible",$c="transparent",Hn=$e(U),Mg=t=>A.add(t,st),Pg=t=>A.remove(t,st),Ar=()=>{const t={trigger:Hn("info-icon"),modal:Hn("info-modal"),closers:Mn(".info-modal-trigger")},e={button:Hn("logout-info-modal"),successMessage:Hn("logout-success-info-modal")};return{backdrop:Hn("modal-backdrop"),info:t,logout:e}};let Is=!1;const xg=(t,e)=>{const n=r=>{r.stopPropagation(),Pg(t),ce(D.MODAL_CLOSE)};!(e!=null&&e.length)||e.length===0||e.forEach(r=>{r.addEventListener("click",n)})},Ug=()=>{if(Is)return;const{backdrop:t}=Ar();Is=!0,A.remove(t,G)},Bg=()=>{if(!Is)return;const{backdrop:t,logout:e}=Ar();Is=!1,A.add(t,G),A.add(e.successMessage,G)},Fg=()=>{const{info:t}=Ar();xg(t.modal,t.closers)},$g=t=>{const{info:e}=Ar();t.stopPropagation(),ce(D.MODAL_OPEN),Mg(e.modal)};function Vg(){const{info:t}=Ar();Fg(),t.trigger.addEventListener("click",$g),X(D.MODAL_OPEN,Ug),X(D.MODAL_CLOSE,Bg)}const jg=t=>A.add(t,st),qg=t=>A.remove(t,st),Mi=$e(U),sh=()=>({trigger:Mi("share-info-modal"),trigger2:Mi("share"),modal:Mi("share-modal"),closers:Mn(".share-modal-trigger")}),zg=(t,e)=>{const n=r=>{r.stopPropagation(),qg(t)};!(e!=null&&e.length)||e.length===0||e.forEach(r=>{r.addEventListener("click",n)})},Vc=(t,e)=>{const{modal:n}=sh();t.stopPropagation(),jg(n),A.add(n,e)};function Hg(){const{modal:t,closers:e,trigger:n,trigger2:r}=sh();zg(t,e),n.addEventListener("click",s=>Vc(s,"--info-modal")),r.addEventListener("click",s=>Vc(s,"--final-screen"))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ih=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Gg=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],a=t[n++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},oh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,a=o?t[s+1]:0,u=s+2<t.length,d=u?t[s+2]:0,f=i>>2,g=(i&3)<<4|a>>4;let y=(a&15)<<2|d>>6,v=d&63;u||(v=64,o||(y=64)),r.push(n[f],n[g],n[y],n[v])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(ih(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Gg(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;const d=s<t.length?n[t.charAt(s)]:64;++s;const g=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||a==null||d==null||g==null)throw new Wg;const y=i<<2|a>>4;if(r.push(y),d!==64){const v=a<<4&240|d>>2;if(r.push(v),g!==64){const T=d<<6&192|g;r.push(T)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Wg extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Kg=function(t){const e=ih(t);return oh.encodeByteArray(e,!0)},_s=function(t){return Kg(t).replace(/\./g,"")},ah=function(t){try{return oh.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qg(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yg=()=>Qg().__FIREBASE_DEFAULTS__,Xg=()=>{if(typeof process>"u"||typeof process.env>"u")return;const t={}.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Jg=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&ah(t[1]);return e&&JSON.parse(e)},Wo=()=>{try{return Yg()||Xg()||Jg()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},ch=t=>{var e,n;return(n=(e=Wo())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},Zg=t=>{const e=ch(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},uh=()=>{var t;return(t=Wo())===null||t===void 0?void 0:t.config},lh=t=>{var e;return(e=Wo())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class em{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tm(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t),a="";return[_s(JSON.stringify(n)),_s(JSON.stringify(o)),a].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ce(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function nm(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ce())}function rm(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function sm(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function im(){const t=Ce();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function om(){try{return typeof indexedDB=="object"}catch{return!1}}function am(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cm="FirebaseError";class yt extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=cm,Object.setPrototypeOf(this,yt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Cr.prototype.create)}}class Cr{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?um(i,r):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new yt(s,a,r)}}function um(t,e){return t.replace(lm,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const lm=/\{\$([^}]+)}/g;function hm(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Ts(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(jc(i)&&jc(o)){if(!Ts(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function jc(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function br(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function dm(t,e){const n=new fm(t,e);return n.subscribe.bind(n)}class fm{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");pm(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=Pi),s.error===void 0&&(s.error=Pi),s.complete===void 0&&(s.complete=Pi);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function pm(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Pi(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function De(t){return t&&t._delegate?t._delegate:t}class Xt{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gm{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new em;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(ym(e))try{this.getOrInitializeService({instanceIdentifier:Vt})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Vt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Vt){return this.instances.has(e)}getOptions(e=Vt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);r===a&&o.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(!!r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:mm(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Vt){return this.component?this.component.multipleInstances?e:Vt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function mm(t){return t===Vt?void 0:t}function ym(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vm{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new gm(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var j;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(j||(j={}));const wm={debug:j.DEBUG,verbose:j.VERBOSE,info:j.INFO,warn:j.WARN,error:j.ERROR,silent:j.SILENT},Em=j.INFO,Im={[j.DEBUG]:"log",[j.VERBOSE]:"log",[j.INFO]:"info",[j.WARN]:"warn",[j.ERROR]:"error"},_m=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=Im[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ko{constructor(e){this.name=e,this._logLevel=Em,this._logHandler=_m,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in j))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?wm[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,j.DEBUG,...e),this._logHandler(this,j.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,j.VERBOSE,...e),this._logHandler(this,j.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,j.INFO,...e),this._logHandler(this,j.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,j.WARN,...e),this._logHandler(this,j.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,j.ERROR,...e),this._logHandler(this,j.ERROR,...e)}}const Tm=(t,e)=>e.some(n=>t instanceof n);let qc,zc;function Sm(){return qc||(qc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Am(){return zc||(zc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const hh=new WeakMap,co=new WeakMap,dh=new WeakMap,xi=new WeakMap,Qo=new WeakMap;function Cm(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(Rt(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&hh.set(n,t)}).catch(()=>{}),Qo.set(e,t),e}function bm(t){if(co.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});co.set(t,e)}let uo={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return co.get(t);if(e==="objectStoreNames")return t.objectStoreNames||dh.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Rt(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Rm(t){uo=t(uo)}function km(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Ui(this),e,...n);return dh.set(r,e.sort?e.sort():[e]),Rt(r)}:Am().includes(t)?function(...e){return t.apply(Ui(this),e),Rt(hh.get(this))}:function(...e){return Rt(t.apply(Ui(this),e))}}function Nm(t){return typeof t=="function"?km(t):(t instanceof IDBTransaction&&bm(t),Tm(t,Sm())?new Proxy(t,uo):t)}function Rt(t){if(t instanceof IDBRequest)return Cm(t);if(xi.has(t))return xi.get(t);const e=Nm(t);return e!==t&&(xi.set(t,e),Qo.set(e,t)),e}const Ui=t=>Qo.get(t);function Lm(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),a=Rt(o);return r&&o.addEventListener("upgradeneeded",u=>{r(Rt(o.result),u.oldVersion,u.newVersion,Rt(o.transaction),u)}),n&&o.addEventListener("blocked",u=>n(u.oldVersion,u.newVersion,u)),a.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),a}const Om=["get","getKey","getAll","getAllKeys","count"],Dm=["put","add","delete","clear"],Bi=new Map;function Hc(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Bi.get(e))return Bi.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=Dm.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Om.includes(n)))return;const i=async function(o,...a){const u=this.transaction(o,s?"readwrite":"readonly");let d=u.store;return r&&(d=d.index(a.shift())),(await Promise.all([d[n](...a),s&&u.done]))[0]};return Bi.set(e,i),i}Rm(t=>({...t,get:(e,n,r)=>Hc(e,n)||t.get(e,n,r),has:(e,n)=>!!Hc(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mm{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Pm(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function Pm(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const lo="@firebase/app",Gc="0.9.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jt=new Ko("@firebase/app"),xm="@firebase/app-compat",Um="@firebase/analytics-compat",Bm="@firebase/analytics",Fm="@firebase/app-check-compat",$m="@firebase/app-check",Vm="@firebase/auth",jm="@firebase/auth-compat",qm="@firebase/database",zm="@firebase/database-compat",Hm="@firebase/functions",Gm="@firebase/functions-compat",Wm="@firebase/installations",Km="@firebase/installations-compat",Qm="@firebase/messaging",Ym="@firebase/messaging-compat",Xm="@firebase/performance",Jm="@firebase/performance-compat",Zm="@firebase/remote-config",ey="@firebase/remote-config-compat",ty="@firebase/storage",ny="@firebase/storage-compat",ry="@firebase/firestore",sy="@firebase/firestore-compat",iy="firebase",oy="9.23.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ho="[DEFAULT]",ay={[lo]:"fire-core",[xm]:"fire-core-compat",[Bm]:"fire-analytics",[Um]:"fire-analytics-compat",[$m]:"fire-app-check",[Fm]:"fire-app-check-compat",[Vm]:"fire-auth",[jm]:"fire-auth-compat",[qm]:"fire-rtdb",[zm]:"fire-rtdb-compat",[Hm]:"fire-fn",[Gm]:"fire-fn-compat",[Wm]:"fire-iid",[Km]:"fire-iid-compat",[Qm]:"fire-fcm",[Ym]:"fire-fcm-compat",[Xm]:"fire-perf",[Jm]:"fire-perf-compat",[Zm]:"fire-rc",[ey]:"fire-rc-compat",[ty]:"fire-gcs",[ny]:"fire-gcs-compat",[ry]:"fire-fst",[sy]:"fire-fst-compat","fire-js":"fire-js",[iy]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ss=new Map,fo=new Map;function cy(t,e){try{t.container.addComponent(e)}catch(n){Jt.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Sn(t){const e=t.name;if(fo.has(e))return Jt.debug(`There were multiple attempts to register component ${e}.`),!1;fo.set(e,t);for(const n of Ss.values())cy(n,t);return!0}function Yo(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uy={["no-app"]:"No Firebase App '{$appName}' has been created - call initializeApp() first",["bad-app-name"]:"Illegal App name: '{$appName}",["duplicate-app"]:"Firebase App named '{$appName}' already exists with different options or config",["app-deleted"]:"Firebase App named '{$appName}' already deleted",["no-options"]:"Need to provide options, when not being deployed to hosting via source.",["invalid-app-argument"]:"firebase.{$appName}() takes either no argument or a Firebase App instance.",["invalid-log-argument"]:"First argument to `onLog` must be null or a function.",["idb-open"]:"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",["idb-get"]:"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",["idb-set"]:"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",["idb-delete"]:"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},kt=new Cr("app","Firebase",uy);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ly{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Xt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw kt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pn=oy;function fh(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:ho,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw kt.create("bad-app-name",{appName:String(s)});if(n||(n=uh()),!n)throw kt.create("no-options");const i=Ss.get(s);if(i){if(Ts(n,i.options)&&Ts(r,i.config))return i;throw kt.create("duplicate-app",{appName:s})}const o=new vm(s);for(const u of fo.values())o.addComponent(u);const a=new ly(n,r,o);return Ss.set(s,a),a}function ph(t=ho){const e=Ss.get(t);if(!e&&t===ho&&uh())return fh();if(!e)throw kt.create("no-app",{appName:t});return e}function Nt(t,e,n){var r;let s=(r=ay[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const a=[`Unable to register library "${s}" with version "${e}":`];i&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Jt.warn(a.join(" "));return}Sn(new Xt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hy="firebase-heartbeat-database",dy=1,or="firebase-heartbeat-store";let Fi=null;function gh(){return Fi||(Fi=Lm(hy,dy,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(or)}}}).catch(t=>{throw kt.create("idb-open",{originalErrorMessage:t.message})})),Fi}async function fy(t){try{return await(await gh()).transaction(or).objectStore(or).get(mh(t))}catch(e){if(e instanceof yt)Jt.warn(e.message);else{const n=kt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Jt.warn(n.message)}}}async function Wc(t,e){try{const r=(await gh()).transaction(or,"readwrite");await r.objectStore(or).put(e,mh(t)),await r.done}catch(n){if(n instanceof yt)Jt.warn(n.message);else{const r=kt.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Jt.warn(r.message)}}}function mh(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const py=1024,gy=30*24*60*60*1e3;class my{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new vy(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Kc();if(this._heartbeatsCache===null&&(this._heartbeatsCache=await this._heartbeatsCachePromise),!(this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r)))return this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(s=>{const i=new Date(s.date).valueOf();return Date.now()-i<=gy}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache===null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Kc(),{heartbeatsToSend:n,unsentEntries:r}=yy(this._heartbeatsCache.heartbeats),s=_s(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}}function Kc(){return new Date().toISOString().substring(0,10)}function yy(t,e=py){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),Qc(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Qc(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class vy{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return om()?am().then(()=>!0).catch(()=>!1):!1}async read(){return await this._canUseIndexedDBPromise?await fy(this.app)||{heartbeats:[]}:{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Wc(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Wc(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Qc(t){return _s(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wy(t){Sn(new Xt("platform-logger",e=>new Mm(e),"PRIVATE")),Sn(new Xt("heartbeat",e=>new my(e),"PRIVATE")),Nt(lo,Gc,t),Nt(lo,Gc,"esm2017"),Nt("fire-js","")}wy("");function Xo(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function yh(){return{["dependent-sdk-initialized-before-auth"]:"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Ey=yh,vh=new Cr("auth","Firebase",yh());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const As=new Ko("@firebase/auth");function Iy(t,...e){As.logLevel<=j.WARN&&As.warn(`Auth (${Pn}): ${t}`,...e)}function ds(t,...e){As.logLevel<=j.ERROR&&As.error(`Auth (${Pn}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nt(t,...e){throw Jo(t,...e)}function Je(t,...e){return Jo(t,...e)}function wh(t,e,n){const r=Object.assign(Object.assign({},Ey()),{[e]:n});return new Cr("auth","Firebase",r).create(e,{appName:t.name})}function _y(t,e,n){const r=n;if(!(e instanceof r))throw r.name!==e.constructor.name&&nt(t,"argument-error"),wh(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Jo(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return vh.create(t,...e)}function P(t,e,...n){if(!t)throw Jo(e,...n)}function at(t){const e="INTERNAL ASSERTION FAILED: "+t;throw ds(e),new Error(e)}function ht(t,e){t||at(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function po(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function Ty(){return Yc()==="http:"||Yc()==="https:"}function Yc(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sy(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Ty()||rm()||"connection"in navigator)?navigator.onLine:!0}function Ay(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rr{constructor(e,n){this.shortDelay=e,this.longDelay=n,ht(n>e,"Short delay should be less than long delay!"),this.isMobile=nm()||sm()}get(){return Sy()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zo(t,e){ht(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eh{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;at("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;at("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;at("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cy={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const by=new Rr(3e4,6e4);function Ih(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function kr(t,e,n,r,s={}){return _h(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const a=br(Object.assign({key:t.config.apiKey},o)).slice(1),u=await t._getAdditionalHeaders();return u["Content-Type"]="application/json",t.languageCode&&(u["X-Firebase-Locale"]=t.languageCode),Eh.fetch()(Th(t,t.config.apiHost,n,a),Object.assign({method:e,headers:u,referrerPolicy:"no-referrer"},i))})}async function _h(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},Cy),e);try{const s=new ky(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw es(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const a=i.ok?o.errorMessage:o.error.message,[u,d]=a.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw es(t,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw es(t,"email-already-in-use",o);if(u==="USER_DISABLED")throw es(t,"user-disabled",o);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw wh(t,f,d);nt(t,f)}}catch(s){if(s instanceof yt)throw s;nt(t,"network-request-failed",{message:String(s)})}}async function Ry(t,e,n,r,s={}){const i=await kr(t,e,n,r,s);return"mfaPendingCredential"in i&&nt(t,"multi-factor-auth-required",{_serverResponse:i}),i}function Th(t,e,n,r){const s=`${e}${n}?${r}`;return t.config.emulator?Zo(t.config,s):`${t.config.apiScheme}://${s}`}class ky{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(Je(this.auth,"network-request-failed")),by.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function es(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=Je(t,e,r);return s.customData._tokenResponse=n,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ny(t,e){return kr(t,"POST","/v1/accounts:delete",e)}async function Ly(t,e){return kr(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function er(t){if(!!t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Oy(t,e=!1){const n=De(t),r=await n.getIdToken(e),s=ea(r);P(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:er($i(s.auth_time)),issuedAtTime:er($i(s.iat)),expirationTime:er($i(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function $i(t){return Number(t)*1e3}function ea(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return ds("JWT malformed, contained fewer than 3 sections"),null;try{const s=ah(n);return s?JSON.parse(s):(ds("Failed to decode base64 JWT payload"),null)}catch(s){return ds("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Dy(t){const e=ea(t);return P(e,"internal-error"),P(typeof e.exp<"u","internal-error"),P(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ar(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof yt&&My(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function My({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Py{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){!this.isRunning||(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sh{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=er(this.lastLoginAt),this.creationTime=er(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cs(t){var e;const n=t.auth,r=await t.getIdToken(),s=await ar(t,Ly(n,{idToken:r}));P(s==null?void 0:s.users.length,n,"internal-error");const i=s.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?By(i.providerUserInfo):[],a=Uy(t.providerData,o),u=t.isAnonymous,d=!(t.email&&i.passwordHash)&&!(a!=null&&a.length),f=u?d:!1,g={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new Sh(i.createdAt,i.lastLoginAt),isAnonymous:f};Object.assign(t,g)}async function xy(t){const e=De(t);await Cs(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Uy(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function By(t){return t.map(e=>{var{providerId:n}=e,r=Xo(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fy(t,e){const n=await _h(t,{},async()=>{const r=br({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=Th(t,s,"/v1/token",`key=${i}`),a=await t._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",Eh.fetch()(o,{method:"POST",headers:a,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){P(e.idToken,"internal-error"),P(typeof e.idToken<"u","internal-error"),P(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Dy(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}async getToken(e,n=!1){return P(!this.accessToken||this.refreshToken,e,"user-token-expired"),!n&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await Fy(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new cr;return r&&(P(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(P(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(P(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new cr,this.toJSON())}_performRefresh(){return at("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function It(t,e){P(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Wt{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,i=Xo(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Py(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Sh(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await ar(this,this.stsTokenManager.getToken(this.auth,e));return P(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return Oy(this,e)}reload(){return xy(this)}_assign(e){this!==e&&(P(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Wt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){P(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Cs(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await ar(this,Ny(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,i,o,a,u,d,f;const g=(r=n.displayName)!==null&&r!==void 0?r:void 0,y=(s=n.email)!==null&&s!==void 0?s:void 0,v=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,T=(o=n.photoURL)!==null&&o!==void 0?o:void 0,b=(a=n.tenantId)!==null&&a!==void 0?a:void 0,R=(u=n._redirectEventId)!==null&&u!==void 0?u:void 0,B=(d=n.createdAt)!==null&&d!==void 0?d:void 0,F=(f=n.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:q,emailVerified:ne,isAnonymous:ue,providerData:He,stsTokenManager:vt}=n;P(q&&vt,e,"internal-error");const qn=cr.fromJSON(this.name,vt);P(typeof q=="string",e,"internal-error"),It(g,e.name),It(y,e.name),P(typeof ne=="boolean",e,"internal-error"),P(typeof ue=="boolean",e,"internal-error"),It(v,e.name),It(T,e.name),It(b,e.name),It(R,e.name),It(B,e.name),It(F,e.name);const wt=new Wt({uid:q,auth:e,email:y,emailVerified:ne,displayName:g,isAnonymous:ue,photoURL:T,phoneNumber:v,tenantId:b,stsTokenManager:qn,createdAt:B,lastLoginAt:F});return He&&Array.isArray(He)&&(wt.providerData=He.map(ki=>Object.assign({},ki))),R&&(wt._redirectEventId=R),wt}static async _fromIdTokenResponse(e,n,r=!1){const s=new cr;s.updateFromServerResponse(n);const i=new Wt({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Cs(i),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xc=new Map;function ct(t){ht(t instanceof Function,"Expected a class definition");let e=Xc.get(t);return e?(ht(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Xc.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ah{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Ah.type="NONE";const Jc=Ah;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fs(t,e,n){return`firebase:${t}:${e}:${n}`}class mn{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=fs(this.userKey,s.apiKey,i),this.fullPersistenceKey=fs("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Wt._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new mn(ct(Jc),e,r);const s=(await Promise.all(n.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let i=s[0]||ct(Jc);const o=fs(r,e.config.apiKey,e.name);let a=null;for(const d of n)try{const f=await d._get(o);if(f){const g=Wt._fromJSON(e,f);d!==i&&(a=g),i=d;break}}catch{}const u=s.filter(d=>d._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new mn(i,e,r):(i=u[0],a&&await i._set(o,a.toJSON()),await Promise.all(n.map(async d=>{if(d!==i)try{await d._remove(o)}catch{}})),new mn(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zc(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Rh(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Ch(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Nh(e))return"Blackberry";if(Lh(e))return"Webos";if(ta(e))return"Safari";if((e.includes("chrome/")||bh(e))&&!e.includes("edge/"))return"Chrome";if(kh(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Ch(t=Ce()){return/firefox\//i.test(t)}function ta(t=Ce()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function bh(t=Ce()){return/crios\//i.test(t)}function Rh(t=Ce()){return/iemobile/i.test(t)}function kh(t=Ce()){return/android/i.test(t)}function Nh(t=Ce()){return/blackberry/i.test(t)}function Lh(t=Ce()){return/webos/i.test(t)}function Qs(t=Ce()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function $y(t=Ce()){var e;return Qs(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Vy(){return im()&&document.documentMode===10}function Oh(t=Ce()){return Qs(t)||kh(t)||Lh(t)||Nh(t)||/windows phone/i.test(t)||Rh(t)}function jy(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dh(t,e=[]){let n;switch(t){case"Browser":n=Zc(Ce());break;case"Worker":n=`${Zc(Ce())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Pn}/${r}`}async function Mh(t,e){return kr(t,"GET","/v2/recaptchaConfig",Ih(t,e))}function eu(t){return t!==void 0&&t.enterprise!==void 0}class Ph{constructor(e){if(this.siteKey="",this.emailPasswordEnabled=!1,e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.emailPasswordEnabled=e.recaptchaEnforcementState.some(n=>n.provider==="EMAIL_PASSWORD_PROVIDER"&&n.enforcementState!=="OFF")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qy(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}function xh(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=Je("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",qy().appendChild(r)})}function zy(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const Hy="https://www.google.com/recaptcha/enterprise.js?render=",Gy="recaptcha-enterprise",Wy="NO_RECAPTCHA";class Ky{constructor(e){this.type=Gy,this.auth=Nr(e)}async verify(e="verify",n=!1){async function r(i){if(!n){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,a)=>{Mh(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const d=new Ph(u);return i.tenantId==null?i._agentRecaptchaConfig=d:i._tenantRecaptchaConfigs[i.tenantId]=d,o(d.siteKey)}}).catch(u=>{a(u)})})}function s(i,o,a){const u=window.grecaptcha;eu(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(d=>{o(d)}).catch(()=>{o(Wy)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((i,o)=>{r(this.auth).then(a=>{if(!n&&eu(window.grecaptcha))s(a,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}xh(Hy+a).then(()=>{s(a,i,o)}).catch(u=>{o(u)})}}).catch(a=>{o(a)})})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qy{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((o,a)=>{try{const u=e(i);o(u)}catch(u){a(u)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yy{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new tu(this),this.idTokenSubscription=new tu(this),this.beforeStateQueue=new Qy(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=vh,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=ct(n)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await mn.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUser(e){var n;const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,a=s==null?void 0:s._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===a)&&(u==null?void 0:u.user)&&(s=u.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return P(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Cs(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Ay()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const n=e?De(e):null;return n&&P(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&P(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(ct(e))})}async initializeRecaptchaConfig(){const e=await Mh(this,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),n=new Ph(e);this.tenantId==null?this._agentRecaptchaConfig=n:this._tenantRecaptchaConfigs[this.tenantId]=n,n.emailPasswordEnabled&&new Ky(this).verify()}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Cr("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&ct(e)||this._popupRedirectResolver;P(n,this,"argument-error"),this.redirectPersistenceManager=await mn.create(this,[ct(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n),o=this._isInitialized?Promise.resolve():this._initializationPromise;return P(o,this,"internal-error"),o.then(()=>i(this.currentUser)),typeof n=="function"?e.addObserver(n,r,s):e.addObserver(n)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return P(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Dh(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={["X-Client-Version"]:this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&Iy(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function Nr(t){return De(t)}class tu{constructor(e){this.auth=e,this.observer=null,this.addObserver=dm(n=>this.observer=n)}get next(){return P(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xy(t,e){const n=Yo(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(Ts(i,e!=null?e:{}))return s;nt(s,"already-initialized")}return n.initialize({options:e})}function Jy(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(ct);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Zy(t,e,n){const r=Nr(t);P(r._canInitEmulator,r,"emulator-config-failed"),P(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!!(n!=null&&n.disableWarnings),i=Uh(e),{host:o,port:a}=ev(e),u=a===null?"":`:${a}`;r.config.emulator={url:`${i}//${o}${u}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:a,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),s||tv()}function Uh(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function ev(t){const e=Uh(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:nu(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:nu(o)}}}function nu(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function tv(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bh{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return at("not implemented")}_getIdTokenResponse(e){return at("not implemented")}_linkToIdToken(e,n){return at("not implemented")}_getReauthenticationResolver(e){return at("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yn(t,e){return Ry(t,"POST","/v1/accounts:signInWithIdp",Ih(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nv="http://localhost";class Zt extends Bh{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Zt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):nt("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,i=Xo(n,["providerId","signInMethod"]);if(!r||!s)return null;const o=new Zt(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return yn(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,yn(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,yn(e,n)}buildRequest(){const e={requestUri:nv,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=br(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class na{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lr extends na{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St extends Lr{constructor(){super("facebook.com")}static credential(e){return Zt._fromParams({providerId:St.PROVIDER_ID,signInMethod:St.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return St.credentialFromTaggedObject(e)}static credentialFromError(e){return St.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return St.credential(e.oauthAccessToken)}catch{return null}}}St.FACEBOOK_SIGN_IN_METHOD="facebook.com";St.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At extends Lr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Zt._fromParams({providerId:At.PROVIDER_ID,signInMethod:At.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return At.credentialFromTaggedObject(e)}static credentialFromError(e){return At.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return At.credential(n,r)}catch{return null}}}At.GOOGLE_SIGN_IN_METHOD="google.com";At.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct extends Lr{constructor(){super("github.com")}static credential(e){return Zt._fromParams({providerId:Ct.PROVIDER_ID,signInMethod:Ct.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ct.credentialFromTaggedObject(e)}static credentialFromError(e){return Ct.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ct.credential(e.oauthAccessToken)}catch{return null}}}Ct.GITHUB_SIGN_IN_METHOD="github.com";Ct.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot extends Lr{constructor(){super("twitter.com")}static credential(e,n){return Zt._fromParams({providerId:ot.PROVIDER_ID,signInMethod:ot.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return ot.credentialFromTaggedObject(e)}static credentialFromError(e){return ot.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return ot.credential(n,r)}catch{return null}}}ot.TWITTER_SIGN_IN_METHOD="twitter.com";ot.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class An{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await Wt._fromIdTokenResponse(e,r,s),o=ru(r);return new An({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=ru(r);return new An({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function ru(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bs extends yt{constructor(e,n,r,s){var i;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,bs.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new bs(e,n,r,s)}}function Fh(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?bs._fromErrorAndOperation(t,i,e,r):i})}async function rv(t,e,n=!1){const r=await ar(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return An._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sv(t,e,n=!1){const{auth:r}=t,s="reauthenticate";try{const i=await ar(t,Fh(r,s,e,t),n);P(i.idToken,r,"internal-error");const o=ea(i.idToken);P(o,r,"internal-error");const{sub:a}=o;return P(t.uid===a,r,"user-mismatch"),An._forOperation(t,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&nt(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function iv(t,e,n=!1){const r="signIn",s=await Fh(t,r,e),i=await An._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}function ov(t,e,n,r){return De(t).onIdTokenChanged(e,n,r)}function av(t,e,n){return De(t).beforeAuthStateChanged(e,n)}const Rs="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $h{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Rs,"1"),this.storage.removeItem(Rs),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cv(){const t=Ce();return ta(t)||Qs(t)}const uv=1e3,lv=10;class Vh extends $h{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=cv()&&jy(),this.fallbackToPolling=Oh(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,u)=>{this.notifyListeners(o,u)});return}const r=e.key;if(n?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const o=this.storage.getItem(r);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(r,e.newValue):this.storage.removeItem(r);else if(this.localCache[r]===e.newValue&&!n)return}const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);Vy()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,lv):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},uv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Vh.type="LOCAL";const hv=Vh;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jh extends $h{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}jh.type="SESSION";const qh=jh;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dv(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ys{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new Ys(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const a=Array.from(o).map(async d=>d(n.origin,i)),u=await dv(a);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ys.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ra(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fv{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((a,u)=>{const d=ra("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(g){const y=g;if(y.data.eventId===d)switch(y.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(y.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:d,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ze(){return window}function pv(t){Ze().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zh(){return typeof Ze().WorkerGlobalScope<"u"&&typeof Ze().importScripts=="function"}async function gv(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function mv(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function yv(){return zh()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hh="firebaseLocalStorageDb",vv=1,ks="firebaseLocalStorage",Gh="fbase_key";class Or{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Xs(t,e){return t.transaction([ks],e?"readwrite":"readonly").objectStore(ks)}function wv(){const t=indexedDB.deleteDatabase(Hh);return new Or(t).toPromise()}function go(){const t=indexedDB.open(Hh,vv);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(ks,{keyPath:Gh})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(ks)?e(r):(r.close(),await wv(),e(await go()))})})}async function su(t,e,n){const r=Xs(t,!0).put({[Gh]:e,value:n});return new Or(r).toPromise()}async function Ev(t,e){const n=Xs(t,!1).get(e),r=await new Or(n).toPromise();return r===void 0?null:r.value}function iu(t,e){const n=Xs(t,!0).delete(e);return new Or(n).toPromise()}const Iv=800,_v=3;class Wh{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await go(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>_v)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return zh()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ys._getInstance(yv()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await gv(),!this.activeServiceWorker)return;this.sender=new fv(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);!r||((e=r[0])===null||e===void 0?void 0:e.fulfilled)&&((n=r[0])===null||n===void 0?void 0:n.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||mv()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await go();return await su(e,Rs,"1"),await iu(e,Rs),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>su(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>Ev(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>iu(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Xs(s,!1).getAll();return new Or(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Iv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Wh.type="LOCAL";const Tv=Wh;new Rr(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kh(t,e){return e?ct(e):(P(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sa extends Bh{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return yn(e,this._buildIdpRequest())}_linkToIdToken(e,n){return yn(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return yn(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function Sv(t){return iv(t.auth,new sa(t),t.bypassAuthState)}function Av(t){const{auth:e,user:n}=t;return P(n,e,"internal-error"),sv(n,new sa(t),t.bypassAuthState)}async function Cv(t){const{auth:e,user:n}=t;return P(n,e,"internal-error"),rv(n,new sa(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qh{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:a}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(u))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Sv;case"linkViaPopup":case"linkViaRedirect":return Cv;case"reauthViaPopup":case"reauthViaRedirect":return Av;default:nt(this.auth,"internal-error")}}resolve(e){ht(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ht(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bv=new Rr(2e3,1e4);async function Rv(t,e,n){const r=Nr(t);_y(t,e,na);const s=Kh(r,n);return new jt(r,"signInViaPopup",e,s).executeNotNull()}class jt extends Qh{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,jt.currentPopupAction&&jt.currentPopupAction.cancel(),jt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return P(e,this.auth,"internal-error"),e}async onExecution(){ht(this.filter.length===1,"Popup operations only handle one event");const e=ra();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Je(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Je(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,jt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Je(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,bv.get())};e()}}jt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kv="pendingRedirect",ps=new Map;class Nv extends Qh{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=ps.get(this.auth._key());if(!e){try{const r=await Lv(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}ps.set(this.auth._key(),e)}return this.bypassAuthState||ps.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Lv(t,e){const n=Mv(e),r=Dv(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function Ov(t,e){ps.set(t._key(),e)}function Dv(t){return ct(t._redirectPersistence)}function Mv(t){return fs(kv,t.config.apiKey,t.name)}async function Pv(t,e,n=!1){const r=Nr(t),s=Kh(r,e),o=await new Nv(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xv=10*60*1e3;class Uv{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Bv(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!Yh(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(Je(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=xv&&this.cachedEventUids.clear(),this.cachedEventUids.has(ou(e))}saveEventToCache(e){this.cachedEventUids.add(ou(e)),this.lastProcessedEventTime=Date.now()}}function ou(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Yh({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Bv(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Yh(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fv(t,e={}){return kr(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $v=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Vv=/^https?/;async function jv(t){if(t.config.emulator)return;const{authorizedDomains:e}=await Fv(t);for(const n of e)try{if(qv(n))return}catch{}nt(t,"unauthorized-domain")}function qv(t){const e=po(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!Vv.test(n))return!1;if($v.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zv=new Rr(3e4,6e4);function au(){const t=Ze().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function Hv(t){return new Promise((e,n)=>{var r,s,i;function o(){au(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{au(),n(Je(t,"network-request-failed"))},timeout:zv.get()})}if(!((s=(r=Ze().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=Ze().gapi)===null||i===void 0)&&i.load)o();else{const a=zy("iframefcb");return Ze()[a]=()=>{gapi.load?o():n(Je(t,"network-request-failed"))},xh(`https://apis.google.com/js/api.js?onload=${a}`).catch(u=>n(u))}}).catch(e=>{throw gs=null,e})}let gs=null;function Gv(t){return gs=gs||Hv(t),gs}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wv=new Rr(5e3,15e3),Kv="__/auth/iframe",Qv="emulator/auth/iframe",Yv={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Xv=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Jv(t){const e=t.config;P(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Zo(e,Qv):`https://${t.config.authDomain}/${Kv}`,r={apiKey:e.apiKey,appName:t.name,v:Pn},s=Xv.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${br(r).slice(1)}`}async function Zv(t){const e=await Gv(t),n=Ze().gapi;return P(n,t,"internal-error"),e.open({where:document.body,url:Jv(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Yv,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=Je(t,"network-request-failed"),a=Ze().setTimeout(()=>{i(o)},Wv.get());function u(){Ze().clearTimeout(a),s(r)}r.ping(u).then(u,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ew={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},tw=500,nw=600,rw="_blank",sw="http://localhost";class cu{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function iw(t,e,n,r=tw,s=nw){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const u=Object.assign(Object.assign({},ew),{width:r.toString(),height:s.toString(),top:i,left:o}),d=Ce().toLowerCase();n&&(a=bh(d)?rw:n),Ch(d)&&(e=e||sw,u.scrollbars="yes");const f=Object.entries(u).reduce((y,[v,T])=>`${y}${v}=${T},`,"");if($y(d)&&a!=="_self")return ow(e||"",a),new cu(null);const g=window.open(e||"",a,f);P(g,t,"popup-blocked");try{g.focus()}catch{}return new cu(g)}function ow(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aw="__/auth/handler",cw="emulator/auth/handler",uw=encodeURIComponent("fac");async function uu(t,e,n,r,s,i){P(t.config.authDomain,t,"auth-domain-config-required"),P(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Pn,eventId:s};if(e instanceof na){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",hm(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,g]of Object.entries(i||{}))o[f]=g}if(e instanceof Lr){const f=e.getScopes().filter(g=>g!=="");f.length>0&&(o.scopes=f.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const f of Object.keys(a))a[f]===void 0&&delete a[f];const u=await t._getAppCheckToken(),d=u?`#${uw}=${encodeURIComponent(u)}`:"";return`${lw(t)}?${br(a).slice(1)}${d}`}function lw({config:t}){return t.emulator?Zo(t,cw):`https://${t.authDomain}/${aw}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vi="webStorageSupport";class hw{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=qh,this._completeRedirectFn=Pv,this._overrideRedirectResult=Ov}async _openPopup(e,n,r,s){var i;ht((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await uu(e,n,r,po(),s);return iw(e,o,ra())}async _openRedirect(e,n,r,s){await this._originValidation(e);const i=await uu(e,n,r,po(),s);return pv(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(ht(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await Zv(e),r=new Uv(e);return n.register("authEvent",s=>(P(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Vi,{type:Vi},s=>{var i;const o=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[Vi];o!==void 0&&n(!!o),nt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=jv(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Oh()||ta()||Qs()}}const dw=hw;var lu="@firebase/auth",hu="0.23.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fw{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);!n||(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){P(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pw(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function gw(t){Sn(new Xt("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;P(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Dh(t)},d=new Yy(r,s,i,u);return Jy(d,n),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Sn(new Xt("auth-internal",e=>{const n=Nr(e.getProvider("auth").getImmediate());return(r=>new fw(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Nt(lu,hu,pw(t)),Nt(lu,hu,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mw=5*60,yw=lh("authIdTokenMaxAge")||mw;let du=null;const vw=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>yw)return;const s=n==null?void 0:n.token;du!==s&&(du=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function ww(t=ph()){const e=Yo(t,"auth");if(e.isInitialized())return e.getImmediate();const n=Xy(t,{popupRedirectResolver:dw,persistence:[Tv,hv,qh]}),r=lh("authTokenSyncURL");if(r){const i=vw(r);av(n,i,()=>i(n.currentUser)),ov(n,o=>i(o))}const s=ch("auth");return s&&Zy(n,`http://${s}`),n}gw("Browser");const ia=t=>({isOk(){return!1},isFail(){return!0},containsValue(e){return!1},map(e){return this},flatMap(e){return this},resolve(){return Promise.reject(t)},mapErr(e){return ia(e(t))},mapOr(e,n){return e},mapOrElse(e,n){return e(t)},unwrapOr(e){return e}}),tr=t=>({isOk(){return!0},isFail(){return!1},containsValue(e){return t===e},map(e){return tr(e(t))},flatMap(e){return e(t)},mapErr(){return this},resolve(){return Promise.resolve(t)},mapOr(e,n){return tr(n(t))},mapOrElse(e,n){return tr(n(t))},unwrapOr(e){return t}});var Ew="firebase",Iw="9.23.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Nt(Ew,Iw,"app");const _w={apiKey:"AIzaSyAs2wqgTz_KwNN-KRElHWSXI6TAuefQB84",authDomain:"sleepy-spider.firebaseapp.com",projectId:"sleepy-spider",storageBucket:"sleepy-spider.appspot.com",messagingSenderId:"146527522996",appId:"1:146527522996:web:139660912fa4c6aeb007e1"},Tw=()=>fh(_w);var Sw=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},S,oa=oa||{},O=Sw||self;function Js(t){var e=typeof t;return e=e!="object"?e:t?Array.isArray(t)?"array":e:"null",e=="array"||e=="object"&&typeof t.length=="number"}function Dr(t){var e=typeof t;return e=="object"&&t!=null||e=="function"}function Aw(t){return Object.prototype.hasOwnProperty.call(t,ji)&&t[ji]||(t[ji]=++Cw)}var ji="closure_uid_"+(1e9*Math.random()>>>0),Cw=0;function bw(t,e,n){return t.call.apply(t.bind,arguments)}function Rw(t,e,n){if(!t)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var s=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(s,r),t.apply(e,s)}}return function(){return t.apply(e,arguments)}}function Te(t,e,n){return Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?Te=bw:Te=Rw,Te.apply(null,arguments)}function ts(t,e){var n=Array.prototype.slice.call(arguments,1);return function(){var r=n.slice();return r.push.apply(r,arguments),t.apply(this,r)}}function pe(t,e){function n(){}n.prototype=e.prototype,t.$=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.ac=function(r,s,i){for(var o=Array(arguments.length-2),a=2;a<arguments.length;a++)o[a-2]=arguments[a];return e.prototype[s].apply(r,o)}}function xt(){this.s=this.s,this.o=this.o}var kw=0;xt.prototype.s=!1;xt.prototype.sa=function(){!this.s&&(this.s=!0,this.N(),kw!=0)&&Aw(this)};xt.prototype.N=function(){if(this.o)for(;this.o.length;)this.o.shift()()};const Xh=Array.prototype.indexOf?function(t,e){return Array.prototype.indexOf.call(t,e,void 0)}:function(t,e){if(typeof t=="string")return typeof e!="string"||e.length!=1?-1:t.indexOf(e,0);for(let n=0;n<t.length;n++)if(n in t&&t[n]===e)return n;return-1};function aa(t){const e=t.length;if(0<e){const n=Array(e);for(let r=0;r<e;r++)n[r]=t[r];return n}return[]}function fu(t,e){for(let n=1;n<arguments.length;n++){const r=arguments[n];if(Js(r)){const s=t.length||0,i=r.length||0;t.length=s+i;for(let o=0;o<i;o++)t[s+o]=r[o]}else t.push(r)}}function Se(t,e){this.type=t,this.g=this.target=e,this.defaultPrevented=!1}Se.prototype.h=function(){this.defaultPrevented=!0};var Nw=function(){if(!O.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{O.addEventListener("test",()=>{},e),O.removeEventListener("test",()=>{},e)}catch{}return t}();function ur(t){return/^[\s\xa0]*$/.test(t)}function Zs(){var t=O.navigator;return t&&(t=t.userAgent)?t:""}function Qe(t){return Zs().indexOf(t)!=-1}function ca(t){return ca[" "](t),t}ca[" "]=function(){};function Lw(t,e){var n=T0;return Object.prototype.hasOwnProperty.call(n,t)?n[t]:n[t]=e(t)}var Ow=Qe("Opera"),Cn=Qe("Trident")||Qe("MSIE"),Jh=Qe("Edge"),mo=Jh||Cn,Zh=Qe("Gecko")&&!(Zs().toLowerCase().indexOf("webkit")!=-1&&!Qe("Edge"))&&!(Qe("Trident")||Qe("MSIE"))&&!Qe("Edge"),Dw=Zs().toLowerCase().indexOf("webkit")!=-1&&!Qe("Edge");function ed(){var t=O.document;return t?t.documentMode:void 0}var yo;e:{var qi="",zi=function(){var t=Zs();if(Zh)return/rv:([^\);]+)(\)|;)/.exec(t);if(Jh)return/Edge\/([\d\.]+)/.exec(t);if(Cn)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(t);if(Dw)return/WebKit\/(\S+)/.exec(t);if(Ow)return/(?:Version)[ \/]?(\S+)/.exec(t)}();if(zi&&(qi=zi?zi[1]:""),Cn){var Hi=ed();if(Hi!=null&&Hi>parseFloat(qi)){yo=String(Hi);break e}}yo=qi}var vo;if(O.document&&Cn){var pu=ed();vo=pu||parseInt(yo,10)||void 0}else vo=void 0;var Mw=vo;function lr(t,e){if(Se.call(this,t?t.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,t){var n=this.type=t.type,r=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.g=e,e=t.relatedTarget){if(Zh){e:{try{ca(e.nodeName);var s=!0;break e}catch{}s=!1}s||(e=null)}}else n=="mouseover"?e=t.fromElement:n=="mouseout"&&(e=t.toElement);this.relatedTarget=e,r?(this.clientX=r.clientX!==void 0?r.clientX:r.pageX,this.clientY=r.clientY!==void 0?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=t.clientX!==void 0?t.clientX:t.pageX,this.clientY=t.clientY!==void 0?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType=typeof t.pointerType=="string"?t.pointerType:Pw[t.pointerType]||"",this.state=t.state,this.i=t,t.defaultPrevented&&lr.$.h.call(this)}}pe(lr,Se);var Pw={2:"touch",3:"pen",4:"mouse"};lr.prototype.h=function(){lr.$.h.call(this);var t=this.i;t.preventDefault?t.preventDefault():t.returnValue=!1};var Mr="closure_listenable_"+(1e6*Math.random()|0),xw=0;function Uw(t,e,n,r,s){this.listener=t,this.proxy=null,this.src=e,this.type=n,this.capture=!!r,this.la=s,this.key=++xw,this.fa=this.ia=!1}function ei(t){t.fa=!0,t.listener=null,t.proxy=null,t.src=null,t.la=null}function ua(t,e,n){for(const r in t)e.call(n,t[r],r,t)}function Bw(t,e){for(const n in t)e.call(void 0,t[n],n,t)}function td(t){const e={};for(const n in t)e[n]=t[n];return e}const gu="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function nd(t,e){let n,r;for(let s=1;s<arguments.length;s++){r=arguments[s];for(n in r)t[n]=r[n];for(let i=0;i<gu.length;i++)n=gu[i],Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}}function ti(t){this.src=t,this.g={},this.h=0}ti.prototype.add=function(t,e,n,r,s){var i=t.toString();t=this.g[i],t||(t=this.g[i]=[],this.h++);var o=Eo(t,e,r,s);return-1<o?(e=t[o],n||(e.ia=!1)):(e=new Uw(e,this.src,i,!!r,s),e.ia=n,t.push(e)),e};function wo(t,e){var n=e.type;if(n in t.g){var r=t.g[n],s=Xh(r,e),i;(i=0<=s)&&Array.prototype.splice.call(r,s,1),i&&(ei(e),t.g[n].length==0&&(delete t.g[n],t.h--))}}function Eo(t,e,n,r){for(var s=0;s<t.length;++s){var i=t[s];if(!i.fa&&i.listener==e&&i.capture==!!n&&i.la==r)return s}return-1}var la="closure_lm_"+(1e6*Math.random()|0),Gi={};function rd(t,e,n,r,s){if(r&&r.once)return id(t,e,n,r,s);if(Array.isArray(e)){for(var i=0;i<e.length;i++)rd(t,e[i],n,r,s);return null}return n=fa(n),t&&t[Mr]?t.O(e,n,Dr(r)?!!r.capture:!!r,s):sd(t,e,n,!1,r,s)}function sd(t,e,n,r,s,i){if(!e)throw Error("Invalid event type");var o=Dr(s)?!!s.capture:!!s,a=da(t);if(a||(t[la]=a=new ti(t)),n=a.add(e,n,r,o,i),n.proxy)return n;if(r=Fw(),n.proxy=r,r.src=t,r.listener=n,t.addEventListener)Nw||(s=o),s===void 0&&(s=!1),t.addEventListener(e.toString(),r,s);else if(t.attachEvent)t.attachEvent(ad(e.toString()),r);else if(t.addListener&&t.removeListener)t.addListener(r);else throw Error("addEventListener and attachEvent are unavailable.");return n}function Fw(){function t(n){return e.call(t.src,t.listener,n)}const e=$w;return t}function id(t,e,n,r,s){if(Array.isArray(e)){for(var i=0;i<e.length;i++)id(t,e[i],n,r,s);return null}return n=fa(n),t&&t[Mr]?t.P(e,n,Dr(r)?!!r.capture:!!r,s):sd(t,e,n,!0,r,s)}function od(t,e,n,r,s){if(Array.isArray(e))for(var i=0;i<e.length;i++)od(t,e[i],n,r,s);else r=Dr(r)?!!r.capture:!!r,n=fa(n),t&&t[Mr]?(t=t.i,e=String(e).toString(),e in t.g&&(i=t.g[e],n=Eo(i,n,r,s),-1<n&&(ei(i[n]),Array.prototype.splice.call(i,n,1),i.length==0&&(delete t.g[e],t.h--)))):t&&(t=da(t))&&(e=t.g[e.toString()],t=-1,e&&(t=Eo(e,n,r,s)),(n=-1<t?e[t]:null)&&ha(n))}function ha(t){if(typeof t!="number"&&t&&!t.fa){var e=t.src;if(e&&e[Mr])wo(e.i,t);else{var n=t.type,r=t.proxy;e.removeEventListener?e.removeEventListener(n,r,t.capture):e.detachEvent?e.detachEvent(ad(n),r):e.addListener&&e.removeListener&&e.removeListener(r),(n=da(e))?(wo(n,t),n.h==0&&(n.src=null,e[la]=null)):ei(t)}}}function ad(t){return t in Gi?Gi[t]:Gi[t]="on"+t}function $w(t,e){if(t.fa)t=!0;else{e=new lr(e,this);var n=t.listener,r=t.la||t.src;t.ia&&ha(t),t=n.call(r,e)}return t}function da(t){return t=t[la],t instanceof ti?t:null}var Wi="__closure_events_fn_"+(1e9*Math.random()>>>0);function fa(t){return typeof t=="function"?t:(t[Wi]||(t[Wi]=function(e){return t.handleEvent(e)}),t[Wi])}function fe(){xt.call(this),this.i=new ti(this),this.S=this,this.J=null}pe(fe,xt);fe.prototype[Mr]=!0;fe.prototype.removeEventListener=function(t,e,n,r){od(this,t,e,n,r)};function ve(t,e){var n,r=t.J;if(r)for(n=[];r;r=r.J)n.push(r);if(t=t.S,r=e.type||e,typeof e=="string")e=new Se(e,t);else if(e instanceof Se)e.target=e.target||t;else{var s=e;e=new Se(r,t),nd(e,s)}if(s=!0,n)for(var i=n.length-1;0<=i;i--){var o=e.g=n[i];s=ns(o,r,!0,e)&&s}if(o=e.g=t,s=ns(o,r,!0,e)&&s,s=ns(o,r,!1,e)&&s,n)for(i=0;i<n.length;i++)o=e.g=n[i],s=ns(o,r,!1,e)&&s}fe.prototype.N=function(){if(fe.$.N.call(this),this.i){var t=this.i,e;for(e in t.g){for(var n=t.g[e],r=0;r<n.length;r++)ei(n[r]);delete t.g[e],t.h--}}this.J=null};fe.prototype.O=function(t,e,n,r){return this.i.add(String(t),e,!1,n,r)};fe.prototype.P=function(t,e,n,r){return this.i.add(String(t),e,!0,n,r)};function ns(t,e,n,r){if(e=t.i.g[String(e)],!e)return!0;e=e.concat();for(var s=!0,i=0;i<e.length;++i){var o=e[i];if(o&&!o.fa&&o.capture==n){var a=o.listener,u=o.la||o.src;o.ia&&wo(t.i,o),s=a.call(u,r)!==!1&&s}}return s&&!r.defaultPrevented}var pa=O.JSON.stringify;class Vw{constructor(e,n){this.i=e,this.j=n,this.h=0,this.g=null}get(){let e;return 0<this.h?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}function jw(){var t=ga;let e=null;return t.g&&(e=t.g,t.g=t.g.next,t.g||(t.h=null),e.next=null),e}class qw{constructor(){this.h=this.g=null}add(e,n){const r=cd.get();r.set(e,n),this.h?this.h.next=r:this.g=r,this.h=r}}var cd=new Vw(()=>new zw,t=>t.reset());class zw{constructor(){this.next=this.g=this.h=null}set(e,n){this.h=e,this.g=n,this.next=null}reset(){this.next=this.g=this.h=null}}function Hw(t){var e=1;t=t.split(":");const n=[];for(;0<e&&t.length;)n.push(t.shift()),e--;return t.length&&n.push(t.join(":")),n}function Gw(t){O.setTimeout(()=>{throw t},0)}let hr,dr=!1,ga=new qw,ud=()=>{const t=O.Promise.resolve(void 0);hr=()=>{t.then(Ww)}};var Ww=()=>{for(var t;t=jw();){try{t.h.call(t.g)}catch(n){Gw(n)}var e=cd;e.j(t),100>e.h&&(e.h++,t.next=e.g,e.g=t)}dr=!1};function ni(t,e){fe.call(this),this.h=t||1,this.g=e||O,this.j=Te(this.qb,this),this.l=Date.now()}pe(ni,fe);S=ni.prototype;S.ga=!1;S.T=null;S.qb=function(){if(this.ga){var t=Date.now()-this.l;0<t&&t<.8*this.h?this.T=this.g.setTimeout(this.j,this.h-t):(this.T&&(this.g.clearTimeout(this.T),this.T=null),ve(this,"tick"),this.ga&&(ma(this),this.start()))}};S.start=function(){this.ga=!0,this.T||(this.T=this.g.setTimeout(this.j,this.h),this.l=Date.now())};function ma(t){t.ga=!1,t.T&&(t.g.clearTimeout(t.T),t.T=null)}S.N=function(){ni.$.N.call(this),ma(this),delete this.g};function ya(t,e,n){if(typeof t=="function")n&&(t=Te(t,n));else if(t&&typeof t.handleEvent=="function")t=Te(t.handleEvent,t);else throw Error("Invalid listener argument");return 2147483647<Number(e)?-1:O.setTimeout(t,e||0)}function ld(t){t.g=ya(()=>{t.g=null,t.i&&(t.i=!1,ld(t))},t.j);const e=t.h;t.h=null,t.m.apply(null,e)}class Kw extends xt{constructor(e,n){super(),this.m=e,this.j=n,this.h=null,this.i=!1,this.g=null}l(e){this.h=arguments,this.g?this.i=!0:ld(this)}N(){super.N(),this.g&&(O.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function fr(t){xt.call(this),this.h=t,this.g={}}pe(fr,xt);var mu=[];function hd(t,e,n,r){Array.isArray(n)||(n&&(mu[0]=n.toString()),n=mu);for(var s=0;s<n.length;s++){var i=rd(e,n[s],r||t.handleEvent,!1,t.h||t);if(!i)break;t.g[i.key]=i}}function dd(t){ua(t.g,function(e,n){this.g.hasOwnProperty(n)&&ha(e)},t),t.g={}}fr.prototype.N=function(){fr.$.N.call(this),dd(this)};fr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};function ri(){this.g=!0}ri.prototype.Ea=function(){this.g=!1};function Qw(t,e,n,r,s,i){t.info(function(){if(t.g)if(i)for(var o="",a=i.split("&"),u=0;u<a.length;u++){var d=a[u].split("=");if(1<d.length){var f=d[0];d=d[1];var g=f.split("_");o=2<=g.length&&g[1]=="type"?o+(f+"="+d+"&"):o+(f+"=redacted&")}}else o=null;else o=i;return"XMLHTTP REQ ("+r+") [attempt "+s+"]: "+e+`
`+n+`
`+o})}function Yw(t,e,n,r,s,i,o){t.info(function(){return"XMLHTTP RESP ("+r+") [ attempt "+s+"]: "+e+`
`+n+`
`+i+" "+o})}function pn(t,e,n,r){t.info(function(){return"XMLHTTP TEXT ("+e+"): "+Jw(t,n)+(r?" "+r:"")})}function Xw(t,e){t.info(function(){return"TIMEOUT: "+e})}ri.prototype.info=function(){};function Jw(t,e){if(!t.g)return e;if(!e)return null;try{var n=JSON.parse(e);if(n){for(t=0;t<n.length;t++)if(Array.isArray(n[t])){var r=n[t];if(!(2>r.length)){var s=r[1];if(Array.isArray(s)&&!(1>s.length)){var i=s[0];if(i!="noop"&&i!="stop"&&i!="close")for(var o=1;o<s.length;o++)s[o]=""}}}}return pa(n)}catch{return e}}var sn={},yu=null;function si(){return yu=yu||new fe}sn.Ta="serverreachability";function fd(t){Se.call(this,sn.Ta,t)}pe(fd,Se);function pr(t){const e=si();ve(e,new fd(e))}sn.STAT_EVENT="statevent";function pd(t,e){Se.call(this,sn.STAT_EVENT,t),this.stat=e}pe(pd,Se);function Le(t){const e=si();ve(e,new pd(e,t))}sn.Ua="timingevent";function gd(t,e){Se.call(this,sn.Ua,t),this.size=e}pe(gd,Se);function Pr(t,e){if(typeof t!="function")throw Error("Fn must not be null and must be a function");return O.setTimeout(function(){t()},e)}var ii={NO_ERROR:0,rb:1,Eb:2,Db:3,yb:4,Cb:5,Fb:6,Qa:7,TIMEOUT:8,Ib:9},md={wb:"complete",Sb:"success",Ra:"error",Qa:"abort",Kb:"ready",Lb:"readystatechange",TIMEOUT:"timeout",Gb:"incrementaldata",Jb:"progress",zb:"downloadprogress",$b:"uploadprogress"};function va(){}va.prototype.h=null;function vu(t){return t.h||(t.h=t.i())}function yd(){}var xr={OPEN:"a",vb:"b",Ra:"c",Hb:"d"};function wa(){Se.call(this,"d")}pe(wa,Se);function Ea(){Se.call(this,"c")}pe(Ea,Se);var Io;function oi(){}pe(oi,va);oi.prototype.g=function(){return new XMLHttpRequest};oi.prototype.i=function(){return{}};Io=new oi;function Ur(t,e,n,r){this.l=t,this.j=e,this.m=n,this.W=r||1,this.U=new fr(this),this.P=Zw,t=mo?125:void 0,this.V=new ni(t),this.I=null,this.i=!1,this.s=this.A=this.v=this.L=this.G=this.Y=this.B=null,this.F=[],this.g=null,this.C=0,this.o=this.u=null,this.ca=-1,this.J=!1,this.O=0,this.M=null,this.ba=this.K=this.aa=this.S=!1,this.h=new vd}function vd(){this.i=null,this.g="",this.h=!1}var Zw=45e3,_o={},Ns={};S=Ur.prototype;S.setTimeout=function(t){this.P=t};function To(t,e,n){t.L=1,t.v=ci(dt(e)),t.s=n,t.S=!0,wd(t,null)}function wd(t,e){t.G=Date.now(),Br(t),t.A=dt(t.v);var n=t.A,r=t.W;Array.isArray(r)||(r=[String(r)]),bd(n.i,"t",r),t.C=0,n=t.l.J,t.h=new vd,t.g=Kd(t.l,n?e:null,!t.s),0<t.O&&(t.M=new Kw(Te(t.Pa,t,t.g),t.O)),hd(t.U,t.g,"readystatechange",t.nb),e=t.I?td(t.I):{},t.s?(t.u||(t.u="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.g.ha(t.A,t.u,t.s,e)):(t.u="GET",t.g.ha(t.A,t.u,null,e)),pr(),Qw(t.j,t.u,t.A,t.m,t.W,t.s)}S.nb=function(t){t=t.target;const e=this.M;e&&Ye(t)==3?e.l():this.Pa(t)};S.Pa=function(t){try{if(t==this.g)e:{const f=Ye(this.g);var e=this.g.Ia();const g=this.g.da();if(!(3>f)&&(f!=3||mo||this.g&&(this.h.h||this.g.ja()||_u(this.g)))){this.J||f!=4||e==7||(e==8||0>=g?pr(3):pr(2)),ai(this);var n=this.g.da();this.ca=n;t:if(Ed(this)){var r=_u(this.g);t="";var s=r.length,i=Ye(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){qt(this),nr(this);var o="";break t}this.h.i=new O.TextDecoder}for(e=0;e<s;e++)this.h.h=!0,t+=this.h.i.decode(r[e],{stream:i&&e==s-1});r.splice(0,s),this.h.g+=t,this.C=0,o=this.h.g}else o=this.g.ja();if(this.i=n==200,Yw(this.j,this.u,this.A,this.m,this.W,f,n),this.i){if(this.aa&&!this.K){t:{if(this.g){var a,u=this.g;if((a=u.g?u.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!ur(a)){var d=a;break t}}d=null}if(n=d)pn(this.j,this.m,n,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,So(this,n);else{this.i=!1,this.o=3,Le(12),qt(this),nr(this);break e}}this.S?(Id(this,f,o),mo&&this.i&&f==3&&(hd(this.U,this.V,"tick",this.mb),this.V.start())):(pn(this.j,this.m,o,null),So(this,o)),f==4&&qt(this),this.i&&!this.J&&(f==4?zd(this.l,this):(this.i=!1,Br(this)))}else E0(this.g),n==400&&0<o.indexOf("Unknown SID")?(this.o=3,Le(12)):(this.o=0,Le(13)),qt(this),nr(this)}}}catch{}finally{}};function Ed(t){return t.g?t.u=="GET"&&t.L!=2&&t.l.Ha:!1}function Id(t,e,n){let r=!0,s;for(;!t.J&&t.C<n.length;)if(s=e0(t,n),s==Ns){e==4&&(t.o=4,Le(14),r=!1),pn(t.j,t.m,null,"[Incomplete Response]");break}else if(s==_o){t.o=4,Le(15),pn(t.j,t.m,n,"[Invalid Chunk]"),r=!1;break}else pn(t.j,t.m,s,null),So(t,s);Ed(t)&&s!=Ns&&s!=_o&&(t.h.g="",t.C=0),e!=4||n.length!=0||t.h.h||(t.o=1,Le(16),r=!1),t.i=t.i&&r,r?0<n.length&&!t.ba&&(t.ba=!0,e=t.l,e.g==t&&e.ca&&!e.M&&(e.l.info("Great, no buffering proxy detected. Bytes received: "+n.length),Ca(e),e.M=!0,Le(11))):(pn(t.j,t.m,n,"[Invalid Chunked Response]"),qt(t),nr(t))}S.mb=function(){if(this.g){var t=Ye(this.g),e=this.g.ja();this.C<e.length&&(ai(this),Id(this,t,e),this.i&&t!=4&&Br(this))}};function e0(t,e){var n=t.C,r=e.indexOf(`
`,n);return r==-1?Ns:(n=Number(e.substring(n,r)),isNaN(n)?_o:(r+=1,r+n>e.length?Ns:(e=e.slice(r,r+n),t.C=r+n,e)))}S.cancel=function(){this.J=!0,qt(this)};function Br(t){t.Y=Date.now()+t.P,_d(t,t.P)}function _d(t,e){if(t.B!=null)throw Error("WatchDog timer not null");t.B=Pr(Te(t.lb,t),e)}function ai(t){t.B&&(O.clearTimeout(t.B),t.B=null)}S.lb=function(){this.B=null;const t=Date.now();0<=t-this.Y?(Xw(this.j,this.A),this.L!=2&&(pr(),Le(17)),qt(this),this.o=2,nr(this)):_d(this,this.Y-t)};function nr(t){t.l.H==0||t.J||zd(t.l,t)}function qt(t){ai(t);var e=t.M;e&&typeof e.sa=="function"&&e.sa(),t.M=null,ma(t.V),dd(t.U),t.g&&(e=t.g,t.g=null,e.abort(),e.sa())}function So(t,e){try{var n=t.l;if(n.H!=0&&(n.g==t||Ao(n.i,t))){if(!t.K&&Ao(n.i,t)&&n.H==3){try{var r=n.Ja.g.parse(e)}catch{r=null}if(Array.isArray(r)&&r.length==3){var s=r;if(s[0]==0){e:if(!n.u){if(n.g)if(n.g.G+3e3<t.G)Ds(n),hi(n);else break e;Aa(n),Le(18)}}else n.Fa=s[1],0<n.Fa-n.V&&37500>s[2]&&n.G&&n.A==0&&!n.v&&(n.v=Pr(Te(n.ib,n),6e3));if(1>=Nd(n.i)&&n.oa){try{n.oa()}catch{}n.oa=void 0}}else zt(n,11)}else if((t.K||n.g==t)&&Ds(n),!ur(e))for(s=n.Ja.g.parse(e),e=0;e<s.length;e++){let d=s[e];if(n.V=d[0],d=d[1],n.H==2)if(d[0]=="c"){n.K=d[1],n.pa=d[2];const f=d[3];f!=null&&(n.ra=f,n.l.info("VER="+n.ra));const g=d[4];g!=null&&(n.Ga=g,n.l.info("SVER="+n.Ga));const y=d[5];y!=null&&typeof y=="number"&&0<y&&(r=1.5*y,n.L=r,n.l.info("backChannelRequestTimeoutMs_="+r)),r=n;const v=t.g;if(v){const T=v.g?v.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(T){var i=r.i;i.g||T.indexOf("spdy")==-1&&T.indexOf("quic")==-1&&T.indexOf("h2")==-1||(i.j=i.l,i.g=new Set,i.h&&(Ia(i,i.h),i.h=null))}if(r.F){const b=v.g?v.g.getResponseHeader("X-HTTP-Session-Id"):null;b&&(r.Da=b,Q(r.I,r.F,b))}}n.H=3,n.h&&n.h.Ba(),n.ca&&(n.S=Date.now()-t.G,n.l.info("Handshake RTT: "+n.S+"ms")),r=n;var o=t;if(r.wa=Wd(r,r.J?r.pa:null,r.Y),o.K){Ld(r.i,o);var a=o,u=r.L;u&&a.setTimeout(u),a.B&&(ai(a),Br(a)),r.g=o}else jd(r);0<n.j.length&&di(n)}else d[0]!="stop"&&d[0]!="close"||zt(n,7);else n.H==3&&(d[0]=="stop"||d[0]=="close"?d[0]=="stop"?zt(n,7):Sa(n):d[0]!="noop"&&n.h&&n.h.Aa(d),n.A=0)}}pr(4)}catch{}}function t0(t){if(t.Z&&typeof t.Z=="function")return t.Z();if(typeof Map<"u"&&t instanceof Map||typeof Set<"u"&&t instanceof Set)return Array.from(t.values());if(typeof t=="string")return t.split("");if(Js(t)){for(var e=[],n=t.length,r=0;r<n;r++)e.push(t[r]);return e}e=[],n=0;for(r in t)e[n++]=t[r];return e}function n0(t){if(t.ta&&typeof t.ta=="function")return t.ta();if(!t.Z||typeof t.Z!="function"){if(typeof Map<"u"&&t instanceof Map)return Array.from(t.keys());if(!(typeof Set<"u"&&t instanceof Set)){if(Js(t)||typeof t=="string"){var e=[];t=t.length;for(var n=0;n<t;n++)e.push(n);return e}e=[],n=0;for(const r in t)e[n++]=r;return e}}}function Td(t,e){if(t.forEach&&typeof t.forEach=="function")t.forEach(e,void 0);else if(Js(t)||typeof t=="string")Array.prototype.forEach.call(t,e,void 0);else for(var n=n0(t),r=t0(t),s=r.length,i=0;i<s;i++)e.call(void 0,r[i],n&&n[i],t)}var Sd=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function r0(t,e){if(t){t=t.split("&");for(var n=0;n<t.length;n++){var r=t[n].indexOf("="),s=null;if(0<=r){var i=t[n].substring(0,r);s=t[n].substring(r+1)}else i=t[n];e(i,s?decodeURIComponent(s.replace(/\+/g," ")):"")}}}function Kt(t){if(this.g=this.s=this.j="",this.m=null,this.o=this.l="",this.h=!1,t instanceof Kt){this.h=t.h,Ls(this,t.j),this.s=t.s,this.g=t.g,Os(this,t.m),this.l=t.l;var e=t.i,n=new gr;n.i=e.i,e.g&&(n.g=new Map(e.g),n.h=e.h),wu(this,n),this.o=t.o}else t&&(e=String(t).match(Sd))?(this.h=!1,Ls(this,e[1]||"",!0),this.s=Qn(e[2]||""),this.g=Qn(e[3]||"",!0),Os(this,e[4]),this.l=Qn(e[5]||"",!0),wu(this,e[6]||"",!0),this.o=Qn(e[7]||"")):(this.h=!1,this.i=new gr(null,this.h))}Kt.prototype.toString=function(){var t=[],e=this.j;e&&t.push(Yn(e,Eu,!0),":");var n=this.g;return(n||e=="file")&&(t.push("//"),(e=this.s)&&t.push(Yn(e,Eu,!0),"@"),t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),n=this.m,n!=null&&t.push(":",String(n))),(n=this.l)&&(this.g&&n.charAt(0)!="/"&&t.push("/"),t.push(Yn(n,n.charAt(0)=="/"?o0:i0,!0))),(n=this.i.toString())&&t.push("?",n),(n=this.o)&&t.push("#",Yn(n,c0)),t.join("")};function dt(t){return new Kt(t)}function Ls(t,e,n){t.j=n?Qn(e,!0):e,t.j&&(t.j=t.j.replace(/:$/,""))}function Os(t,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);t.m=e}else t.m=null}function wu(t,e,n){e instanceof gr?(t.i=e,u0(t.i,t.h)):(n||(e=Yn(e,a0)),t.i=new gr(e,t.h))}function Q(t,e,n){t.i.set(e,n)}function ci(t){return Q(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),t}function Qn(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function Yn(t,e,n){return typeof t=="string"?(t=encodeURI(t).replace(e,s0),n&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function s0(t){return t=t.charCodeAt(0),"%"+(t>>4&15).toString(16)+(t&15).toString(16)}var Eu=/[#\/\?@]/g,i0=/[#\?:]/g,o0=/[#\?]/g,a0=/[#\?@]/g,c0=/#/g;function gr(t,e){this.h=this.g=null,this.i=t||null,this.j=!!e}function Ut(t){t.g||(t.g=new Map,t.h=0,t.i&&r0(t.i,function(e,n){t.add(decodeURIComponent(e.replace(/\+/g," ")),n)}))}S=gr.prototype;S.add=function(t,e){Ut(this),this.i=null,t=xn(this,t);var n=this.g.get(t);return n||this.g.set(t,n=[]),n.push(e),this.h+=1,this};function Ad(t,e){Ut(t),e=xn(t,e),t.g.has(e)&&(t.i=null,t.h-=t.g.get(e).length,t.g.delete(e))}function Cd(t,e){return Ut(t),e=xn(t,e),t.g.has(e)}S.forEach=function(t,e){Ut(this),this.g.forEach(function(n,r){n.forEach(function(s){t.call(e,s,r,this)},this)},this)};S.ta=function(){Ut(this);const t=Array.from(this.g.values()),e=Array.from(this.g.keys()),n=[];for(let r=0;r<e.length;r++){const s=t[r];for(let i=0;i<s.length;i++)n.push(e[r])}return n};S.Z=function(t){Ut(this);let e=[];if(typeof t=="string")Cd(this,t)&&(e=e.concat(this.g.get(xn(this,t))));else{t=Array.from(this.g.values());for(let n=0;n<t.length;n++)e=e.concat(t[n])}return e};S.set=function(t,e){return Ut(this),this.i=null,t=xn(this,t),Cd(this,t)&&(this.h-=this.g.get(t).length),this.g.set(t,[e]),this.h+=1,this};S.get=function(t,e){return t?(t=this.Z(t),0<t.length?String(t[0]):e):e};function bd(t,e,n){Ad(t,e),0<n.length&&(t.i=null,t.g.set(xn(t,e),aa(n)),t.h+=n.length)}S.toString=function(){if(this.i)return this.i;if(!this.g)return"";const t=[],e=Array.from(this.g.keys());for(var n=0;n<e.length;n++){var r=e[n];const i=encodeURIComponent(String(r)),o=this.Z(r);for(r=0;r<o.length;r++){var s=i;o[r]!==""&&(s+="="+encodeURIComponent(String(o[r]))),t.push(s)}}return this.i=t.join("&")};function xn(t,e){return e=String(e),t.j&&(e=e.toLowerCase()),e}function u0(t,e){e&&!t.j&&(Ut(t),t.i=null,t.g.forEach(function(n,r){var s=r.toLowerCase();r!=s&&(Ad(this,r),bd(this,s,n))},t)),t.j=e}var l0=class{constructor(t,e){this.g=t,this.map=e}};function Rd(t){this.l=t||h0,O.PerformanceNavigationTiming?(t=O.performance.getEntriesByType("navigation"),t=0<t.length&&(t[0].nextHopProtocol=="hq"||t[0].nextHopProtocol=="h2")):t=!!(O.g&&O.g.Ka&&O.g.Ka()&&O.g.Ka().ec),this.j=t?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var h0=10;function kd(t){return t.h?!0:t.g?t.g.size>=t.j:!1}function Nd(t){return t.h?1:t.g?t.g.size:0}function Ao(t,e){return t.h?t.h==e:t.g?t.g.has(e):!1}function Ia(t,e){t.g?t.g.add(e):t.h=e}function Ld(t,e){t.h&&t.h==e?t.h=null:t.g&&t.g.has(e)&&t.g.delete(e)}Rd.prototype.cancel=function(){if(this.i=Od(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const t of this.g.values())t.cancel();this.g.clear()}};function Od(t){if(t.h!=null)return t.i.concat(t.h.F);if(t.g!=null&&t.g.size!==0){let e=t.i;for(const n of t.g.values())e=e.concat(n.F);return e}return aa(t.i)}var d0=class{stringify(t){return O.JSON.stringify(t,void 0)}parse(t){return O.JSON.parse(t,void 0)}};function f0(){this.g=new d0}function p0(t,e,n){const r=n||"";try{Td(t,function(s,i){let o=s;Dr(s)&&(o=pa(s)),e.push(r+i+"="+encodeURIComponent(o))})}catch(s){throw e.push(r+"type="+encodeURIComponent("_badmap")),s}}function g0(t,e){const n=new ri;if(O.Image){const r=new Image;r.onload=ts(rs,n,r,"TestLoadImage: loaded",!0,e),r.onerror=ts(rs,n,r,"TestLoadImage: error",!1,e),r.onabort=ts(rs,n,r,"TestLoadImage: abort",!1,e),r.ontimeout=ts(rs,n,r,"TestLoadImage: timeout",!1,e),O.setTimeout(function(){r.ontimeout&&r.ontimeout()},1e4),r.src=t}else e(!1)}function rs(t,e,n,r,s){try{e.onload=null,e.onerror=null,e.onabort=null,e.ontimeout=null,s(r)}catch{}}function Fr(t){this.l=t.fc||null,this.j=t.ob||!1}pe(Fr,va);Fr.prototype.g=function(){return new ui(this.l,this.j)};Fr.prototype.i=function(t){return function(){return t}}({});function ui(t,e){fe.call(this),this.F=t,this.u=e,this.m=void 0,this.readyState=_a,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}pe(ui,fe);var _a=0;S=ui.prototype;S.open=function(t,e){if(this.readyState!=_a)throw this.abort(),Error("Error reopening a connection");this.C=t,this.B=e,this.readyState=1,mr(this)};S.send=function(t){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const e={headers:this.v,method:this.C,credentials:this.m,cache:void 0};t&&(e.body=t),(this.F||O).fetch(new Request(this.B,e)).then(this.$a.bind(this),this.ka.bind(this))};S.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,$r(this)),this.readyState=_a};S.$a=function(t){if(this.g&&(this.l=t,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=t.headers,this.readyState=2,mr(this)),this.g&&(this.readyState=3,mr(this),this.g)))if(this.responseType==="arraybuffer")t.arrayBuffer().then(this.Ya.bind(this),this.ka.bind(this));else if(typeof O.ReadableStream<"u"&&"body"in t){if(this.j=t.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;Dd(this)}else t.text().then(this.Za.bind(this),this.ka.bind(this))};function Dd(t){t.j.read().then(t.Xa.bind(t)).catch(t.ka.bind(t))}S.Xa=function(t){if(this.g){if(this.u&&t.value)this.response.push(t.value);else if(!this.u){var e=t.value?t.value:new Uint8Array(0);(e=this.A.decode(e,{stream:!t.done}))&&(this.response=this.responseText+=e)}t.done?$r(this):mr(this),this.readyState==3&&Dd(this)}};S.Za=function(t){this.g&&(this.response=this.responseText=t,$r(this))};S.Ya=function(t){this.g&&(this.response=t,$r(this))};S.ka=function(){this.g&&$r(this)};function $r(t){t.readyState=4,t.l=null,t.j=null,t.A=null,mr(t)}S.setRequestHeader=function(t,e){this.v.append(t,e)};S.getResponseHeader=function(t){return this.h&&this.h.get(t.toLowerCase())||""};S.getAllResponseHeaders=function(){if(!this.h)return"";const t=[],e=this.h.entries();for(var n=e.next();!n.done;)n=n.value,t.push(n[0]+": "+n[1]),n=e.next();return t.join(`\r
`)};function mr(t){t.onreadystatechange&&t.onreadystatechange.call(t)}Object.defineProperty(ui.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(t){this.m=t?"include":"same-origin"}});var m0=O.JSON.parse;function te(t){fe.call(this),this.headers=new Map,this.u=t||null,this.h=!1,this.C=this.g=null,this.I="",this.m=0,this.j="",this.l=this.G=this.v=this.F=!1,this.B=0,this.A=null,this.K=Md,this.L=this.M=!1}pe(te,fe);var Md="",y0=/^https?$/i,v0=["POST","PUT"];S=te.prototype;S.Oa=function(t){this.M=t};S.ha=function(t,e,n,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.I+"; newUri="+t);e=e?e.toUpperCase():"GET",this.I=t,this.j="",this.m=0,this.F=!1,this.h=!0,this.g=this.u?this.u.g():Io.g(),this.C=this.u?vu(this.u):vu(Io),this.g.onreadystatechange=Te(this.La,this);try{this.G=!0,this.g.open(e,String(t),!0),this.G=!1}catch(i){Iu(this,i);return}if(t=n||"",n=new Map(this.headers),r)if(Object.getPrototypeOf(r)===Object.prototype)for(var s in r)n.set(s,r[s]);else if(typeof r.keys=="function"&&typeof r.get=="function")for(const i of r.keys())n.set(i,r.get(i));else throw Error("Unknown input type for opt_headers: "+String(r));r=Array.from(n.keys()).find(i=>i.toLowerCase()=="content-type"),s=O.FormData&&t instanceof O.FormData,!(0<=Xh(v0,e))||r||s||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[i,o]of n)this.g.setRequestHeader(i,o);this.K&&(this.g.responseType=this.K),"withCredentials"in this.g&&this.g.withCredentials!==this.M&&(this.g.withCredentials=this.M);try{Ud(this),0<this.B&&((this.L=w0(this.g))?(this.g.timeout=this.B,this.g.ontimeout=Te(this.ua,this)):this.A=ya(this.ua,this.B,this)),this.v=!0,this.g.send(t),this.v=!1}catch(i){Iu(this,i)}};function w0(t){return Cn&&typeof t.timeout=="number"&&t.ontimeout!==void 0}S.ua=function(){typeof oa<"u"&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,ve(this,"timeout"),this.abort(8))};function Iu(t,e){t.h=!1,t.g&&(t.l=!0,t.g.abort(),t.l=!1),t.j=e,t.m=5,Pd(t),li(t)}function Pd(t){t.F||(t.F=!0,ve(t,"complete"),ve(t,"error"))}S.abort=function(t){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=t||7,ve(this,"complete"),ve(this,"abort"),li(this))};S.N=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),li(this,!0)),te.$.N.call(this)};S.La=function(){this.s||(this.G||this.v||this.l?xd(this):this.kb())};S.kb=function(){xd(this)};function xd(t){if(t.h&&typeof oa<"u"&&(!t.C[1]||Ye(t)!=4||t.da()!=2)){if(t.v&&Ye(t)==4)ya(t.La,0,t);else if(ve(t,"readystatechange"),Ye(t)==4){t.h=!1;try{const o=t.da();e:switch(o){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break e;default:e=!1}var n;if(!(n=e)){var r;if(r=o===0){var s=String(t.I).match(Sd)[1]||null;!s&&O.self&&O.self.location&&(s=O.self.location.protocol.slice(0,-1)),r=!y0.test(s?s.toLowerCase():"")}n=r}if(n)ve(t,"complete"),ve(t,"success");else{t.m=6;try{var i=2<Ye(t)?t.g.statusText:""}catch{i=""}t.j=i+" ["+t.da()+"]",Pd(t)}}finally{li(t)}}}}function li(t,e){if(t.g){Ud(t);const n=t.g,r=t.C[0]?()=>{}:null;t.g=null,t.C=null,e||ve(t,"ready");try{n.onreadystatechange=r}catch{}}}function Ud(t){t.g&&t.L&&(t.g.ontimeout=null),t.A&&(O.clearTimeout(t.A),t.A=null)}S.isActive=function(){return!!this.g};function Ye(t){return t.g?t.g.readyState:0}S.da=function(){try{return 2<Ye(this)?this.g.status:-1}catch{return-1}};S.ja=function(){try{return this.g?this.g.responseText:""}catch{return""}};S.Wa=function(t){if(this.g){var e=this.g.responseText;return t&&e.indexOf(t)==0&&(e=e.substring(t.length)),m0(e)}};function _u(t){try{if(!t.g)return null;if("response"in t.g)return t.g.response;switch(t.K){case Md:case"text":return t.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in t.g)return t.g.mozResponseArrayBuffer}return null}catch{return null}}function E0(t){const e={};t=(t.g&&2<=Ye(t)&&t.g.getAllResponseHeaders()||"").split(`\r
`);for(let r=0;r<t.length;r++){if(ur(t[r]))continue;var n=Hw(t[r]);const s=n[0];if(n=n[1],typeof n!="string")continue;n=n.trim();const i=e[s]||[];e[s]=i,i.push(n)}Bw(e,function(r){return r.join(", ")})}S.Ia=function(){return this.m};S.Sa=function(){return typeof this.j=="string"?this.j:String(this.j)};function Bd(t){let e="";return ua(t,function(n,r){e+=r,e+=":",e+=n,e+=`\r
`}),e}function Ta(t,e,n){e:{for(r in n){var r=!1;break e}r=!0}r||(n=Bd(n),typeof t=="string"?n!=null&&encodeURIComponent(String(n)):Q(t,e,n))}function Gn(t,e,n){return n&&n.internalChannelParams&&n.internalChannelParams[t]||e}function Fd(t){this.Ga=0,this.j=[],this.l=new ri,this.pa=this.wa=this.I=this.Y=this.g=this.Da=this.F=this.na=this.o=this.U=this.s=null,this.fb=this.W=0,this.cb=Gn("failFast",!1,t),this.G=this.v=this.u=this.m=this.h=null,this.aa=!0,this.Fa=this.V=-1,this.ba=this.A=this.C=0,this.ab=Gn("baseRetryDelayMs",5e3,t),this.hb=Gn("retryDelaySeedMs",1e4,t),this.eb=Gn("forwardChannelMaxRetries",2,t),this.xa=Gn("forwardChannelRequestTimeoutMs",2e4,t),this.va=t&&t.xmlHttpFactory||void 0,this.Ha=t&&t.dc||!1,this.L=void 0,this.J=t&&t.supportsCrossDomainXhr||!1,this.K="",this.i=new Rd(t&&t.concurrentRequestLimit),this.Ja=new f0,this.P=t&&t.fastHandshake||!1,this.O=t&&t.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.bb=t&&t.bc||!1,t&&t.Ea&&this.l.Ea(),t&&t.forceLongPolling&&(this.aa=!1),this.ca=!this.P&&this.aa&&t&&t.detectBufferingProxy||!1,this.qa=void 0,t&&t.longPollingTimeout&&0<t.longPollingTimeout&&(this.qa=t.longPollingTimeout),this.oa=void 0,this.S=0,this.M=!1,this.ma=this.B=null}S=Fd.prototype;S.ra=8;S.H=1;function Sa(t){if($d(t),t.H==3){var e=t.W++,n=dt(t.I);if(Q(n,"SID",t.K),Q(n,"RID",e),Q(n,"TYPE","terminate"),Vr(t,n),e=new Ur(t,t.l,e),e.L=2,e.v=ci(dt(n)),n=!1,O.navigator&&O.navigator.sendBeacon)try{n=O.navigator.sendBeacon(e.v.toString(),"")}catch{}!n&&O.Image&&(new Image().src=e.v,n=!0),n||(e.g=Kd(e.l,null),e.g.ha(e.v)),e.G=Date.now(),Br(e)}Gd(t)}function hi(t){t.g&&(Ca(t),t.g.cancel(),t.g=null)}function $d(t){hi(t),t.u&&(O.clearTimeout(t.u),t.u=null),Ds(t),t.i.cancel(),t.m&&(typeof t.m=="number"&&O.clearTimeout(t.m),t.m=null)}function di(t){if(!kd(t.i)&&!t.m){t.m=!0;var e=t.Na;hr||ud(),dr||(hr(),dr=!0),ga.add(e,t),t.C=0}}function I0(t,e){return Nd(t.i)>=t.i.j-(t.m?1:0)?!1:t.m?(t.j=e.F.concat(t.j),!0):t.H==1||t.H==2||t.C>=(t.cb?0:t.eb)?!1:(t.m=Pr(Te(t.Na,t,e),Hd(t,t.C)),t.C++,!0)}S.Na=function(t){if(this.m)if(this.m=null,this.H==1){if(!t){this.W=Math.floor(1e5*Math.random()),t=this.W++;const s=new Ur(this,this.l,t);let i=this.s;if(this.U&&(i?(i=td(i),nd(i,this.U)):i=this.U),this.o!==null||this.O||(s.I=i,i=null),this.P)e:{for(var e=0,n=0;n<this.j.length;n++){t:{var r=this.j[n];if("__data__"in r.map&&(r=r.map.__data__,typeof r=="string")){r=r.length;break t}r=void 0}if(r===void 0)break;if(e+=r,4096<e){e=n;break e}if(e===4096||n===this.j.length-1){e=n+1;break e}}e=1e3}else e=1e3;e=Vd(this,s,e),n=dt(this.I),Q(n,"RID",t),Q(n,"CVER",22),this.F&&Q(n,"X-HTTP-Session-Id",this.F),Vr(this,n),i&&(this.O?e="headers="+encodeURIComponent(String(Bd(i)))+"&"+e:this.o&&Ta(n,this.o,i)),Ia(this.i,s),this.bb&&Q(n,"TYPE","init"),this.P?(Q(n,"$req",e),Q(n,"SID","null"),s.aa=!0,To(s,n,null)):To(s,n,e),this.H=2}}else this.H==3&&(t?Tu(this,t):this.j.length==0||kd(this.i)||Tu(this))};function Tu(t,e){var n;e?n=e.m:n=t.W++;const r=dt(t.I);Q(r,"SID",t.K),Q(r,"RID",n),Q(r,"AID",t.V),Vr(t,r),t.o&&t.s&&Ta(r,t.o,t.s),n=new Ur(t,t.l,n,t.C+1),t.o===null&&(n.I=t.s),e&&(t.j=e.F.concat(t.j)),e=Vd(t,n,1e3),n.setTimeout(Math.round(.5*t.xa)+Math.round(.5*t.xa*Math.random())),Ia(t.i,n),To(n,r,e)}function Vr(t,e){t.na&&ua(t.na,function(n,r){Q(e,r,n)}),t.h&&Td({},function(n,r){Q(e,r,n)})}function Vd(t,e,n){n=Math.min(t.j.length,n);var r=t.h?Te(t.h.Va,t.h,t):null;e:{var s=t.j;let i=-1;for(;;){const o=["count="+n];i==-1?0<n?(i=s[0].g,o.push("ofs="+i)):i=0:o.push("ofs="+i);let a=!0;for(let u=0;u<n;u++){let d=s[u].g;const f=s[u].map;if(d-=i,0>d)i=Math.max(0,s[u].g-100),a=!1;else try{p0(f,o,"req"+d+"_")}catch{r&&r(f)}}if(a){r=o.join("&");break e}}}return t=t.j.splice(0,n),e.F=t,r}function jd(t){if(!t.g&&!t.u){t.ba=1;var e=t.Ma;hr||ud(),dr||(hr(),dr=!0),ga.add(e,t),t.A=0}}function Aa(t){return t.g||t.u||3<=t.A?!1:(t.ba++,t.u=Pr(Te(t.Ma,t),Hd(t,t.A)),t.A++,!0)}S.Ma=function(){if(this.u=null,qd(this),this.ca&&!(this.M||this.g==null||0>=this.S)){var t=2*this.S;this.l.info("BP detection timer enabled: "+t),this.B=Pr(Te(this.jb,this),t)}};S.jb=function(){this.B&&(this.B=null,this.l.info("BP detection timeout reached."),this.l.info("Buffering proxy detected and switch to long-polling!"),this.G=!1,this.M=!0,Le(10),hi(this),qd(this))};function Ca(t){t.B!=null&&(O.clearTimeout(t.B),t.B=null)}function qd(t){t.g=new Ur(t,t.l,"rpc",t.ba),t.o===null&&(t.g.I=t.s),t.g.O=0;var e=dt(t.wa);Q(e,"RID","rpc"),Q(e,"SID",t.K),Q(e,"AID",t.V),Q(e,"CI",t.G?"0":"1"),!t.G&&t.qa&&Q(e,"TO",t.qa),Q(e,"TYPE","xmlhttp"),Vr(t,e),t.o&&t.s&&Ta(e,t.o,t.s),t.L&&t.g.setTimeout(t.L);var n=t.g;t=t.pa,n.L=1,n.v=ci(dt(e)),n.s=null,n.S=!0,wd(n,t)}S.ib=function(){this.v!=null&&(this.v=null,hi(this),Aa(this),Le(19))};function Ds(t){t.v!=null&&(O.clearTimeout(t.v),t.v=null)}function zd(t,e){var n=null;if(t.g==e){Ds(t),Ca(t),t.g=null;var r=2}else if(Ao(t.i,e))n=e.F,Ld(t.i,e),r=1;else return;if(t.H!=0){if(e.i)if(r==1){n=e.s?e.s.length:0,e=Date.now()-e.G;var s=t.C;r=si(),ve(r,new gd(r,n)),di(t)}else jd(t);else if(s=e.o,s==3||s==0&&0<e.ca||!(r==1&&I0(t,e)||r==2&&Aa(t)))switch(n&&0<n.length&&(e=t.i,e.i=e.i.concat(n)),s){case 1:zt(t,5);break;case 4:zt(t,10);break;case 3:zt(t,6);break;default:zt(t,2)}}}function Hd(t,e){let n=t.ab+Math.floor(Math.random()*t.hb);return t.isActive()||(n*=2),n*e}function zt(t,e){if(t.l.info("Error code "+e),e==2){var n=null;t.h&&(n=null);var r=Te(t.pb,t);n||(n=new Kt("//www.google.com/images/cleardot.gif"),O.location&&O.location.protocol=="http"||Ls(n,"https"),ci(n)),g0(n.toString(),r)}else Le(2);t.H=0,t.h&&t.h.za(e),Gd(t),$d(t)}S.pb=function(t){t?(this.l.info("Successfully pinged google.com"),Le(2)):(this.l.info("Failed to ping google.com"),Le(1))};function Gd(t){if(t.H=0,t.ma=[],t.h){const e=Od(t.i);(e.length!=0||t.j.length!=0)&&(fu(t.ma,e),fu(t.ma,t.j),t.i.i.length=0,aa(t.j),t.j.length=0),t.h.ya()}}function Wd(t,e,n){var r=n instanceof Kt?dt(n):new Kt(n);if(r.g!="")e&&(r.g=e+"."+r.g),Os(r,r.m);else{var s=O.location;r=s.protocol,e=e?e+"."+s.hostname:s.hostname,s=+s.port;var i=new Kt(null);r&&Ls(i,r),e&&(i.g=e),s&&Os(i,s),n&&(i.l=n),r=i}return n=t.F,e=t.Da,n&&e&&Q(r,n,e),Q(r,"VER",t.ra),Vr(t,r),r}function Kd(t,e,n){if(e&&!t.J)throw Error("Can't create secondary domain capable XhrIo object.");return e=n&&t.Ha&&!t.va?new te(new Fr({ob:!0})):new te(t.va),e.Oa(t.J),e}S.isActive=function(){return!!this.h&&this.h.isActive(this)};function Qd(){}S=Qd.prototype;S.Ba=function(){};S.Aa=function(){};S.za=function(){};S.ya=function(){};S.isActive=function(){return!0};S.Va=function(){};function Ms(){if(Cn&&!(10<=Number(Mw)))throw Error("Environmental error: no available transport.")}Ms.prototype.g=function(t,e){return new Fe(t,e)};function Fe(t,e){fe.call(this),this.g=new Fd(e),this.l=t,this.h=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.g.s=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.Ca&&(t?t["X-WebChannel-Client-Profile"]=e.Ca:t={"X-WebChannel-Client-Profile":e.Ca}),this.g.U=t,(t=e&&e.cc)&&!ur(t)&&(this.g.o=t),this.A=e&&e.supportsCrossDomainXhr||!1,this.v=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!ur(e)&&(this.g.F=e,t=this.h,t!==null&&e in t&&(t=this.h,e in t&&delete t[e])),this.j=new Un(this)}pe(Fe,fe);Fe.prototype.m=function(){this.g.h=this.j,this.A&&(this.g.J=!0);var t=this.g,e=this.l,n=this.h||void 0;Le(0),t.Y=e,t.na=n||{},t.G=t.aa,t.I=Wd(t,null,t.Y),di(t)};Fe.prototype.close=function(){Sa(this.g)};Fe.prototype.u=function(t){var e=this.g;if(typeof t=="string"){var n={};n.__data__=t,t=n}else this.v&&(n={},n.__data__=pa(t),t=n);e.j.push(new l0(e.fb++,t)),e.H==3&&di(e)};Fe.prototype.N=function(){this.g.h=null,delete this.j,Sa(this.g),delete this.g,Fe.$.N.call(this)};function Yd(t){wa.call(this),t.__headers__&&(this.headers=t.__headers__,this.statusCode=t.__status__,delete t.__headers__,delete t.__status__);var e=t.__sm__;if(e){e:{for(const n in e){t=n;break e}t=void 0}(this.i=t)&&(t=this.i,e=e!==null&&t in e?e[t]:void 0),this.data=e}else this.data=t}pe(Yd,wa);function Xd(){Ea.call(this),this.status=1}pe(Xd,Ea);function Un(t){this.g=t}pe(Un,Qd);Un.prototype.Ba=function(){ve(this.g,"a")};Un.prototype.Aa=function(t){ve(this.g,new Yd(t))};Un.prototype.za=function(t){ve(this.g,new Xd)};Un.prototype.ya=function(){ve(this.g,"b")};function _0(){this.blockSize=-1}function qe(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.m=Array(this.blockSize),this.i=this.h=0,this.reset()}pe(qe,_0);qe.prototype.reset=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.i=this.h=0};function Ki(t,e,n){n||(n=0);var r=Array(16);if(typeof e=="string")for(var s=0;16>s;++s)r[s]=e.charCodeAt(n++)|e.charCodeAt(n++)<<8|e.charCodeAt(n++)<<16|e.charCodeAt(n++)<<24;else for(s=0;16>s;++s)r[s]=e[n++]|e[n++]<<8|e[n++]<<16|e[n++]<<24;e=t.g[0],n=t.g[1],s=t.g[2];var i=t.g[3],o=e+(i^n&(s^i))+r[0]+3614090360&4294967295;e=n+(o<<7&4294967295|o>>>25),o=i+(s^e&(n^s))+r[1]+3905402710&4294967295,i=e+(o<<12&4294967295|o>>>20),o=s+(n^i&(e^n))+r[2]+606105819&4294967295,s=i+(o<<17&4294967295|o>>>15),o=n+(e^s&(i^e))+r[3]+3250441966&4294967295,n=s+(o<<22&4294967295|o>>>10),o=e+(i^n&(s^i))+r[4]+4118548399&4294967295,e=n+(o<<7&4294967295|o>>>25),o=i+(s^e&(n^s))+r[5]+1200080426&4294967295,i=e+(o<<12&4294967295|o>>>20),o=s+(n^i&(e^n))+r[6]+2821735955&4294967295,s=i+(o<<17&4294967295|o>>>15),o=n+(e^s&(i^e))+r[7]+4249261313&4294967295,n=s+(o<<22&4294967295|o>>>10),o=e+(i^n&(s^i))+r[8]+1770035416&4294967295,e=n+(o<<7&4294967295|o>>>25),o=i+(s^e&(n^s))+r[9]+2336552879&4294967295,i=e+(o<<12&4294967295|o>>>20),o=s+(n^i&(e^n))+r[10]+4294925233&4294967295,s=i+(o<<17&4294967295|o>>>15),o=n+(e^s&(i^e))+r[11]+2304563134&4294967295,n=s+(o<<22&4294967295|o>>>10),o=e+(i^n&(s^i))+r[12]+1804603682&4294967295,e=n+(o<<7&4294967295|o>>>25),o=i+(s^e&(n^s))+r[13]+4254626195&4294967295,i=e+(o<<12&4294967295|o>>>20),o=s+(n^i&(e^n))+r[14]+2792965006&4294967295,s=i+(o<<17&4294967295|o>>>15),o=n+(e^s&(i^e))+r[15]+1236535329&4294967295,n=s+(o<<22&4294967295|o>>>10),o=e+(s^i&(n^s))+r[1]+4129170786&4294967295,e=n+(o<<5&4294967295|o>>>27),o=i+(n^s&(e^n))+r[6]+3225465664&4294967295,i=e+(o<<9&4294967295|o>>>23),o=s+(e^n&(i^e))+r[11]+643717713&4294967295,s=i+(o<<14&4294967295|o>>>18),o=n+(i^e&(s^i))+r[0]+3921069994&4294967295,n=s+(o<<20&4294967295|o>>>12),o=e+(s^i&(n^s))+r[5]+3593408605&4294967295,e=n+(o<<5&4294967295|o>>>27),o=i+(n^s&(e^n))+r[10]+38016083&4294967295,i=e+(o<<9&4294967295|o>>>23),o=s+(e^n&(i^e))+r[15]+3634488961&4294967295,s=i+(o<<14&4294967295|o>>>18),o=n+(i^e&(s^i))+r[4]+3889429448&4294967295,n=s+(o<<20&4294967295|o>>>12),o=e+(s^i&(n^s))+r[9]+568446438&4294967295,e=n+(o<<5&4294967295|o>>>27),o=i+(n^s&(e^n))+r[14]+3275163606&4294967295,i=e+(o<<9&4294967295|o>>>23),o=s+(e^n&(i^e))+r[3]+4107603335&4294967295,s=i+(o<<14&4294967295|o>>>18),o=n+(i^e&(s^i))+r[8]+1163531501&4294967295,n=s+(o<<20&4294967295|o>>>12),o=e+(s^i&(n^s))+r[13]+2850285829&4294967295,e=n+(o<<5&4294967295|o>>>27),o=i+(n^s&(e^n))+r[2]+4243563512&4294967295,i=e+(o<<9&4294967295|o>>>23),o=s+(e^n&(i^e))+r[7]+1735328473&4294967295,s=i+(o<<14&4294967295|o>>>18),o=n+(i^e&(s^i))+r[12]+2368359562&4294967295,n=s+(o<<20&4294967295|o>>>12),o=e+(n^s^i)+r[5]+4294588738&4294967295,e=n+(o<<4&4294967295|o>>>28),o=i+(e^n^s)+r[8]+2272392833&4294967295,i=e+(o<<11&4294967295|o>>>21),o=s+(i^e^n)+r[11]+1839030562&4294967295,s=i+(o<<16&4294967295|o>>>16),o=n+(s^i^e)+r[14]+4259657740&4294967295,n=s+(o<<23&4294967295|o>>>9),o=e+(n^s^i)+r[1]+2763975236&4294967295,e=n+(o<<4&4294967295|o>>>28),o=i+(e^n^s)+r[4]+1272893353&4294967295,i=e+(o<<11&4294967295|o>>>21),o=s+(i^e^n)+r[7]+4139469664&4294967295,s=i+(o<<16&4294967295|o>>>16),o=n+(s^i^e)+r[10]+3200236656&4294967295,n=s+(o<<23&4294967295|o>>>9),o=e+(n^s^i)+r[13]+681279174&4294967295,e=n+(o<<4&4294967295|o>>>28),o=i+(e^n^s)+r[0]+3936430074&4294967295,i=e+(o<<11&4294967295|o>>>21),o=s+(i^e^n)+r[3]+3572445317&4294967295,s=i+(o<<16&4294967295|o>>>16),o=n+(s^i^e)+r[6]+76029189&4294967295,n=s+(o<<23&4294967295|o>>>9),o=e+(n^s^i)+r[9]+3654602809&4294967295,e=n+(o<<4&4294967295|o>>>28),o=i+(e^n^s)+r[12]+3873151461&4294967295,i=e+(o<<11&4294967295|o>>>21),o=s+(i^e^n)+r[15]+530742520&4294967295,s=i+(o<<16&4294967295|o>>>16),o=n+(s^i^e)+r[2]+3299628645&4294967295,n=s+(o<<23&4294967295|o>>>9),o=e+(s^(n|~i))+r[0]+4096336452&4294967295,e=n+(o<<6&4294967295|o>>>26),o=i+(n^(e|~s))+r[7]+1126891415&4294967295,i=e+(o<<10&4294967295|o>>>22),o=s+(e^(i|~n))+r[14]+2878612391&4294967295,s=i+(o<<15&4294967295|o>>>17),o=n+(i^(s|~e))+r[5]+4237533241&4294967295,n=s+(o<<21&4294967295|o>>>11),o=e+(s^(n|~i))+r[12]+1700485571&4294967295,e=n+(o<<6&4294967295|o>>>26),o=i+(n^(e|~s))+r[3]+2399980690&4294967295,i=e+(o<<10&4294967295|o>>>22),o=s+(e^(i|~n))+r[10]+4293915773&4294967295,s=i+(o<<15&4294967295|o>>>17),o=n+(i^(s|~e))+r[1]+2240044497&4294967295,n=s+(o<<21&4294967295|o>>>11),o=e+(s^(n|~i))+r[8]+1873313359&4294967295,e=n+(o<<6&4294967295|o>>>26),o=i+(n^(e|~s))+r[15]+4264355552&4294967295,i=e+(o<<10&4294967295|o>>>22),o=s+(e^(i|~n))+r[6]+2734768916&4294967295,s=i+(o<<15&4294967295|o>>>17),o=n+(i^(s|~e))+r[13]+1309151649&4294967295,n=s+(o<<21&4294967295|o>>>11),o=e+(s^(n|~i))+r[4]+4149444226&4294967295,e=n+(o<<6&4294967295|o>>>26),o=i+(n^(e|~s))+r[11]+3174756917&4294967295,i=e+(o<<10&4294967295|o>>>22),o=s+(e^(i|~n))+r[2]+718787259&4294967295,s=i+(o<<15&4294967295|o>>>17),o=n+(i^(s|~e))+r[9]+3951481745&4294967295,t.g[0]=t.g[0]+e&4294967295,t.g[1]=t.g[1]+(s+(o<<21&4294967295|o>>>11))&4294967295,t.g[2]=t.g[2]+s&4294967295,t.g[3]=t.g[3]+i&4294967295}qe.prototype.j=function(t,e){e===void 0&&(e=t.length);for(var n=e-this.blockSize,r=this.m,s=this.h,i=0;i<e;){if(s==0)for(;i<=n;)Ki(this,t,i),i+=this.blockSize;if(typeof t=="string"){for(;i<e;)if(r[s++]=t.charCodeAt(i++),s==this.blockSize){Ki(this,r),s=0;break}}else for(;i<e;)if(r[s++]=t[i++],s==this.blockSize){Ki(this,r),s=0;break}}this.h=s,this.i+=e};qe.prototype.l=function(){var t=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);t[0]=128;for(var e=1;e<t.length-8;++e)t[e]=0;var n=8*this.i;for(e=t.length-8;e<t.length;++e)t[e]=n&255,n/=256;for(this.j(t),t=Array(16),e=n=0;4>e;++e)for(var r=0;32>r;r+=8)t[n++]=this.g[e]>>>r&255;return t};function H(t,e){this.h=e;for(var n=[],r=!0,s=t.length-1;0<=s;s--){var i=t[s]|0;r&&i==e||(n[s]=i,r=!1)}this.g=n}var T0={};function ba(t){return-128<=t&&128>t?Lw(t,function(e){return new H([e|0],0>e?-1:0)}):new H([t|0],0>t?-1:0)}function Xe(t){if(isNaN(t)||!isFinite(t))return vn;if(0>t)return ye(Xe(-t));for(var e=[],n=1,r=0;t>=n;r++)e[r]=t/n|0,n*=Co;return new H(e,0)}function Jd(t,e){if(t.length==0)throw Error("number format error: empty string");if(e=e||10,2>e||36<e)throw Error("radix out of range: "+e);if(t.charAt(0)=="-")return ye(Jd(t.substring(1),e));if(0<=t.indexOf("-"))throw Error('number format error: interior "-" character');for(var n=Xe(Math.pow(e,8)),r=vn,s=0;s<t.length;s+=8){var i=Math.min(8,t.length-s),o=parseInt(t.substring(s,s+i),e);8>i?(i=Xe(Math.pow(e,i)),r=r.R(i).add(Xe(o))):(r=r.R(n),r=r.add(Xe(o)))}return r}var Co=4294967296,vn=ba(0),bo=ba(1),Su=ba(16777216);S=H.prototype;S.ea=function(){if(je(this))return-ye(this).ea();for(var t=0,e=1,n=0;n<this.g.length;n++){var r=this.D(n);t+=(0<=r?r:Co+r)*e,e*=Co}return t};S.toString=function(t){if(t=t||10,2>t||36<t)throw Error("radix out of range: "+t);if(ut(this))return"0";if(je(this))return"-"+ye(this).toString(t);for(var e=Xe(Math.pow(t,6)),n=this,r="";;){var s=xs(n,e).g;n=Ps(n,s.R(e));var i=((0<n.g.length?n.g[0]:n.h)>>>0).toString(t);if(n=s,ut(n))return i+r;for(;6>i.length;)i="0"+i;r=i+r}};S.D=function(t){return 0>t?0:t<this.g.length?this.g[t]:this.h};function ut(t){if(t.h!=0)return!1;for(var e=0;e<t.g.length;e++)if(t.g[e]!=0)return!1;return!0}function je(t){return t.h==-1}S.X=function(t){return t=Ps(this,t),je(t)?-1:ut(t)?0:1};function ye(t){for(var e=t.g.length,n=[],r=0;r<e;r++)n[r]=~t.g[r];return new H(n,~t.h).add(bo)}S.abs=function(){return je(this)?ye(this):this};S.add=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],r=0,s=0;s<=e;s++){var i=r+(this.D(s)&65535)+(t.D(s)&65535),o=(i>>>16)+(this.D(s)>>>16)+(t.D(s)>>>16);r=o>>>16,i&=65535,o&=65535,n[s]=o<<16|i}return new H(n,n[n.length-1]&-2147483648?-1:0)};function Ps(t,e){return t.add(ye(e))}S.R=function(t){if(ut(this)||ut(t))return vn;if(je(this))return je(t)?ye(this).R(ye(t)):ye(ye(this).R(t));if(je(t))return ye(this.R(ye(t)));if(0>this.X(Su)&&0>t.X(Su))return Xe(this.ea()*t.ea());for(var e=this.g.length+t.g.length,n=[],r=0;r<2*e;r++)n[r]=0;for(r=0;r<this.g.length;r++)for(var s=0;s<t.g.length;s++){var i=this.D(r)>>>16,o=this.D(r)&65535,a=t.D(s)>>>16,u=t.D(s)&65535;n[2*r+2*s]+=o*u,ss(n,2*r+2*s),n[2*r+2*s+1]+=i*u,ss(n,2*r+2*s+1),n[2*r+2*s+1]+=o*a,ss(n,2*r+2*s+1),n[2*r+2*s+2]+=i*a,ss(n,2*r+2*s+2)}for(r=0;r<e;r++)n[r]=n[2*r+1]<<16|n[2*r];for(r=e;r<2*e;r++)n[r]=0;return new H(n,0)};function ss(t,e){for(;(t[e]&65535)!=t[e];)t[e+1]+=t[e]>>>16,t[e]&=65535,e++}function Wn(t,e){this.g=t,this.h=e}function xs(t,e){if(ut(e))throw Error("division by zero");if(ut(t))return new Wn(vn,vn);if(je(t))return e=xs(ye(t),e),new Wn(ye(e.g),ye(e.h));if(je(e))return e=xs(t,ye(e)),new Wn(ye(e.g),e.h);if(30<t.g.length){if(je(t)||je(e))throw Error("slowDivide_ only works with positive integers.");for(var n=bo,r=e;0>=r.X(t);)n=Au(n),r=Au(r);var s=hn(n,1),i=hn(r,1);for(r=hn(r,2),n=hn(n,2);!ut(r);){var o=i.add(r);0>=o.X(t)&&(s=s.add(n),i=o),r=hn(r,1),n=hn(n,1)}return e=Ps(t,s.R(e)),new Wn(s,e)}for(s=vn;0<=t.X(e);){for(n=Math.max(1,Math.floor(t.ea()/e.ea())),r=Math.ceil(Math.log(n)/Math.LN2),r=48>=r?1:Math.pow(2,r-48),i=Xe(n),o=i.R(e);je(o)||0<o.X(t);)n-=r,i=Xe(n),o=i.R(e);ut(i)&&(i=bo),s=s.add(i),t=Ps(t,o)}return new Wn(s,t)}S.gb=function(t){return xs(this,t).h};S.and=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],r=0;r<e;r++)n[r]=this.D(r)&t.D(r);return new H(n,this.h&t.h)};S.or=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],r=0;r<e;r++)n[r]=this.D(r)|t.D(r);return new H(n,this.h|t.h)};S.xor=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],r=0;r<e;r++)n[r]=this.D(r)^t.D(r);return new H(n,this.h^t.h)};function Au(t){for(var e=t.g.length+1,n=[],r=0;r<e;r++)n[r]=t.D(r)<<1|t.D(r-1)>>>31;return new H(n,t.h)}function hn(t,e){var n=e>>5;e%=32;for(var r=t.g.length-n,s=[],i=0;i<r;i++)s[i]=0<e?t.D(i+n)>>>e|t.D(i+n+1)<<32-e:t.D(i+n);return new H(s,t.h)}Ms.prototype.createWebChannel=Ms.prototype.g;Fe.prototype.send=Fe.prototype.u;Fe.prototype.open=Fe.prototype.m;Fe.prototype.close=Fe.prototype.close;ii.NO_ERROR=0;ii.TIMEOUT=8;ii.HTTP_ERROR=6;md.COMPLETE="complete";yd.EventType=xr;xr.OPEN="a";xr.CLOSE="b";xr.ERROR="c";xr.MESSAGE="d";fe.prototype.listen=fe.prototype.O;te.prototype.listenOnce=te.prototype.P;te.prototype.getLastError=te.prototype.Sa;te.prototype.getLastErrorCode=te.prototype.Ia;te.prototype.getStatus=te.prototype.da;te.prototype.getResponseJson=te.prototype.Wa;te.prototype.getResponseText=te.prototype.ja;te.prototype.send=te.prototype.ha;te.prototype.setWithCredentials=te.prototype.Oa;qe.prototype.digest=qe.prototype.l;qe.prototype.reset=qe.prototype.reset;qe.prototype.update=qe.prototype.j;H.prototype.add=H.prototype.add;H.prototype.multiply=H.prototype.R;H.prototype.modulo=H.prototype.gb;H.prototype.compare=H.prototype.X;H.prototype.toNumber=H.prototype.ea;H.prototype.toString=H.prototype.toString;H.prototype.getBits=H.prototype.D;H.fromNumber=Xe;H.fromString=Jd;var S0=function(){return new Ms},A0=function(){return si()},Qi=ii,C0=md,b0=sn,Cu={xb:0,Ab:1,Bb:2,Ub:3,Zb:4,Wb:5,Xb:6,Vb:7,Tb:8,Yb:9,PROXY:10,NOPROXY:11,Rb:12,Nb:13,Ob:14,Mb:15,Pb:16,Qb:17,tb:18,sb:19,ub:20},R0=Fr,is=yd,k0=te,N0=qe,wn=H;const bu="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ee.UNAUTHENTICATED=new Ee(null),Ee.GOOGLE_CREDENTIALS=new Ee("google-credentials-uid"),Ee.FIRST_PARTY=new Ee("first-party-uid"),Ee.MOCK_USER=new Ee("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Bn="9.23.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const en=new Ko("@firebase/firestore");function Ru(){return en.logLevel}function k(t,...e){if(en.logLevel<=j.DEBUG){const n=e.map(Ra);en.debug(`Firestore (${Bn}): ${t}`,...n)}}function ft(t,...e){if(en.logLevel<=j.ERROR){const n=e.map(Ra);en.error(`Firestore (${Bn}): ${t}`,...n)}}function bn(t,...e){if(en.logLevel<=j.WARN){const n=e.map(Ra);en.warn(`Firestore (${Bn}): ${t}`,...n)}}function Ra(t){if(typeof t=="string")return t;try{return e=t,JSON.stringify(e)}catch{return t}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L(t="Unexpected state"){const e=`FIRESTORE (${Bn}) INTERNAL ASSERTION FAILED: `+t;throw ft(e),new Error(e)}function J(t,e){t||L()}function x(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class C extends yt{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zd{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class L0{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(Ee.UNAUTHENTICATED))}shutdown(){}}class O0{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class D0{constructor(e){this.t=e,this.currentUser=Ee.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){let r=this.i;const s=u=>this.i!==r?(r=this.i,n(u)):Promise.resolve();let i=new lt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new lt,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},a=u=>{k("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.auth.addAuthTokenListener(this.o),o()};this.t.onInit(u=>a(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?a(u):(k("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new lt)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(k("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(J(typeof r.accessToken=="string"),new Zd(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const e=this.auth&&this.auth.getUid();return J(e===null||typeof e=="string"),new Ee(e)}}class M0{constructor(e,n,r){this.h=e,this.l=n,this.m=r,this.type="FirstParty",this.user=Ee.FIRST_PARTY,this.g=new Map}p(){return this.m?this.m():null}get headers(){this.g.set("X-Goog-AuthUser",this.h);const e=this.p();return e&&this.g.set("Authorization",e),this.l&&this.g.set("X-Goog-Iam-Authorization-Token",this.l),this.g}}class P0{constructor(e,n,r){this.h=e,this.l=n,this.m=r}getToken(){return Promise.resolve(new M0(this.h,this.l,this.m))}start(e,n){e.enqueueRetryable(()=>n(Ee.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class x0{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class U0{constructor(e){this.I=e,this.forceRefresh=!1,this.appCheck=null,this.T=null}start(e,n){const r=i=>{i.error!=null&&k("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.T;return this.T=i.token,k("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{k("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.appCheck.addTokenListener(this.o)};this.I.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.I.getImmediate({optional:!0});i?s(i):k("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(J(typeof n.token=="string"),this.T=n.token,new x0(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B0(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ef{static A(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const s=B0(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<n&&(r+=e.charAt(s[i]%e.length))}return r}}function z(t,e){return t<e?-1:t>e?1:0}function Rn(t,e,n){return t.length===e.length&&t.every((r,s)=>n(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new C(E.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new C(E.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new C(E.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new C(E.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return ae.fromMillis(Date.now())}static fromDate(e){return ae.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*n));return new ae(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?z(this.nanoseconds,e.nanoseconds):z(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(e){this.timestamp=e}static fromTimestamp(e){return new M(e)}static min(){return new M(new ae(0,0))}static max(){return new M(new ae(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yr{constructor(e,n,r){n===void 0?n=0:n>e.length&&L(),r===void 0?r=e.length-n:r>e.length-n&&L(),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return yr.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof yr?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let s=0;s<r;s++){const i=e.get(s),o=n.get(s);if(i<o)return-1;if(i>o)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class Y extends yr{construct(e,n,r){return new Y(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new C(E.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(s=>s.length>0))}return new Y(n)}static emptyPath(){return new Y([])}}const F0=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class _e extends yr{construct(e,n,r){return new _e(e,n,r)}static isValidIdentifier(e){return F0.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),_e.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new _e(["__name__"])}static fromServerFormat(e){const n=[];let r="",s=0;const i=()=>{if(r.length===0)throw new C(E.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;s<e.length;){const a=e[s];if(a==="\\"){if(s+1===e.length)throw new C(E.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new C(E.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else a==="`"?(o=!o,s++):a!=="."||o?(r+=a,s++):(i(),s++)}if(i(),o)throw new C(E.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new _e(n)}static emptyPath(){return new _e([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N{constructor(e){this.path=e}static fromPath(e){return new N(Y.fromString(e))}static fromName(e){return new N(Y.fromString(e).popFirst(5))}static empty(){return new N(Y.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Y.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return Y.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new N(new Y(e.slice()))}}function $0(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,s=M.fromTimestamp(r===1e9?new ae(n+1,0):new ae(n,r));return new Dt(s,N.empty(),e)}function V0(t){return new Dt(t.readTime,t.key,-1)}class Dt{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new Dt(M.min(),N.empty(),-1)}static max(){return new Dt(M.max(),N.empty(),-1)}}function j0(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=N.comparator(t.documentKey,e.documentKey),n!==0?n:z(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const q0="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class z0{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jr(t){if(t.code!==E.FAILED_PRECONDITION||t.message!==q0)throw t;k("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&L(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new I((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(n,i).next(r,s)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof I?n:I.resolve(n)}catch(n){return I.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):I.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):I.reject(n)}static resolve(e){return new I((n,r)=>{n(e)})}static reject(e){return new I((n,r)=>{r(e)})}static waitFor(e){return new I((n,r)=>{let s=0,i=0,o=!1;e.forEach(a=>{++s,a.next(()=>{++i,o&&i===s&&n()},u=>r(u))}),o=!0,i===s&&n()})}static or(e){let n=I.resolve(!1);for(const r of e)n=n.next(s=>s?I.resolve(s):r());return n}static forEach(e,n){const r=[];return e.forEach((s,i)=>{r.push(n.call(this,s,i))}),this.waitFor(r)}static mapArray(e,n){return new I((r,s)=>{const i=e.length,o=new Array(i);let a=0;for(let u=0;u<i;u++){const d=u;n(e[d]).next(f=>{o[d]=f,++a,a===i&&r(o)},f=>s(f))}})}static doWhile(e,n){return new I((r,s)=>{const i=()=>{e()===!0?n().next(()=>{i()},s):r()};i()})}}function qr(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ka{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ot(r),this.ut=r=>n.writeSequenceNumber(r))}ot(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ut&&this.ut(e),e}}ka.ct=-1;function fi(t){return t==null}function Us(t){return t===0&&1/t==-1/0}function H0(t){return typeof t=="number"&&Number.isInteger(t)&&!Us(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ku(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function on(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function tf(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ee{constructor(e,n){this.comparator=e,this.root=n||me.EMPTY}insert(e,n){return new ee(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,me.BLACK,null,null))}remove(e){return new ee(this.comparator,this.root.remove(e,this.comparator).copy(null,null,me.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return n+r.left.size;s<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new os(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new os(this.root,e,this.comparator,!1)}getReverseIterator(){return new os(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new os(this.root,e,this.comparator,!0)}}class os{constructor(e,n,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?r(e.key,n):1,n&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class me{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r!=null?r:me.RED,this.left=s!=null?s:me.EMPTY,this.right=i!=null?i:me.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,s,i){return new me(e!=null?e:this.key,n!=null?n:this.value,r!=null?r:this.color,s!=null?s:this.left,i!=null?i:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return me.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,s=this;if(n(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(e,s.key)===0){if(s.right.isEmpty())return me.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,me.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,me.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw L();const e=this.left.check();if(e!==this.right.check())throw L();return e+(this.isRed()?0:1)}}me.EMPTY=null,me.RED=!0,me.BLACK=!1;me.EMPTY=new class{constructor(){this.size=0}get key(){throw L()}get value(){throw L()}get color(){throw L()}get left(){throw L()}get right(){throw L()}copy(t,e,n,r,s){return this}insert(t,e,n){return new me(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae{constructor(e){this.comparator=e,this.data=new ee(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;n(s.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new Nu(this.data.getIterator())}getIteratorFrom(e){return new Nu(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof Ae)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new Ae(this.comparator);return n.data=e,n}}class Nu{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(e){this.fields=e,e.sort(_e.comparator)}static empty(){return new Be([])}unionWith(e){let n=new Ae(_e.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new Be(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return Rn(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nf extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class be{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(r){try{return atob(r)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new nf("Invalid base64 string: "+s):s}}(e);return new be(n)}static fromUint8Array(e){const n=function(r){let s="";for(let i=0;i<r.length;++i)s+=String.fromCharCode(r[i]);return s}(e);return new be(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return e=this.binaryString,btoa(e);var e}toUint8Array(){return function(e){const n=new Uint8Array(e.length);for(let r=0;r<e.length;r++)n[r]=e.charCodeAt(r);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return z(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}be.EMPTY_BYTE_STRING=new be("");const G0=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Mt(t){if(J(!!t),typeof t=="string"){let e=0;const n=G0.exec(t);if(J(!!n),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ie(t.seconds),nanos:ie(t.nanos)}}function ie(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function tn(t){return typeof t=="string"?be.fromBase64String(t):be.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Na(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function La(t){const e=t.mapValue.fields.__previous_value__;return Na(e)?La(e):e}function vr(t){const e=Mt(t.mapValue.fields.__local_write_time__.timestampValue);return new ae(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W0{constructor(e,n,r,s,i,o,a,u,d){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=u,this.useFetchStreams=d}}class wr{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new wr("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof wr&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const as={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function nn(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Na(t)?4:K0(t)?9007199254740991:10:L()}function rt(t,e){if(t===e)return!0;const n=nn(t);if(n!==nn(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return vr(t).isEqual(vr(e));case 3:return function(r,s){if(typeof r.timestampValue=="string"&&typeof s.timestampValue=="string"&&r.timestampValue.length===s.timestampValue.length)return r.timestampValue===s.timestampValue;const i=Mt(r.timestampValue),o=Mt(s.timestampValue);return i.seconds===o.seconds&&i.nanos===o.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(r,s){return tn(r.bytesValue).isEqual(tn(s.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(r,s){return ie(r.geoPointValue.latitude)===ie(s.geoPointValue.latitude)&&ie(r.geoPointValue.longitude)===ie(s.geoPointValue.longitude)}(t,e);case 2:return function(r,s){if("integerValue"in r&&"integerValue"in s)return ie(r.integerValue)===ie(s.integerValue);if("doubleValue"in r&&"doubleValue"in s){const i=ie(r.doubleValue),o=ie(s.doubleValue);return i===o?Us(i)===Us(o):isNaN(i)&&isNaN(o)}return!1}(t,e);case 9:return Rn(t.arrayValue.values||[],e.arrayValue.values||[],rt);case 10:return function(r,s){const i=r.mapValue.fields||{},o=s.mapValue.fields||{};if(ku(i)!==ku(o))return!1;for(const a in i)if(i.hasOwnProperty(a)&&(o[a]===void 0||!rt(i[a],o[a])))return!1;return!0}(t,e);default:return L()}}function Er(t,e){return(t.values||[]).find(n=>rt(n,e))!==void 0}function kn(t,e){if(t===e)return 0;const n=nn(t),r=nn(e);if(n!==r)return z(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return z(t.booleanValue,e.booleanValue);case 2:return function(s,i){const o=ie(s.integerValue||s.doubleValue),a=ie(i.integerValue||i.doubleValue);return o<a?-1:o>a?1:o===a?0:isNaN(o)?isNaN(a)?0:-1:1}(t,e);case 3:return Lu(t.timestampValue,e.timestampValue);case 4:return Lu(vr(t),vr(e));case 5:return z(t.stringValue,e.stringValue);case 6:return function(s,i){const o=tn(s),a=tn(i);return o.compareTo(a)}(t.bytesValue,e.bytesValue);case 7:return function(s,i){const o=s.split("/"),a=i.split("/");for(let u=0;u<o.length&&u<a.length;u++){const d=z(o[u],a[u]);if(d!==0)return d}return z(o.length,a.length)}(t.referenceValue,e.referenceValue);case 8:return function(s,i){const o=z(ie(s.latitude),ie(i.latitude));return o!==0?o:z(ie(s.longitude),ie(i.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return function(s,i){const o=s.values||[],a=i.values||[];for(let u=0;u<o.length&&u<a.length;++u){const d=kn(o[u],a[u]);if(d)return d}return z(o.length,a.length)}(t.arrayValue,e.arrayValue);case 10:return function(s,i){if(s===as.mapValue&&i===as.mapValue)return 0;if(s===as.mapValue)return 1;if(i===as.mapValue)return-1;const o=s.fields||{},a=Object.keys(o),u=i.fields||{},d=Object.keys(u);a.sort(),d.sort();for(let f=0;f<a.length&&f<d.length;++f){const g=z(a[f],d[f]);if(g!==0)return g;const y=kn(o[a[f]],u[d[f]]);if(y!==0)return y}return z(a.length,d.length)}(t.mapValue,e.mapValue);default:throw L()}}function Lu(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return z(t,e);const n=Mt(t),r=Mt(e),s=z(n.seconds,r.seconds);return s!==0?s:z(n.nanos,r.nanos)}function Nn(t){return Ro(t)}function Ro(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(r){const s=Mt(r);return`time(${s.seconds},${s.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?tn(t.bytesValue).toBase64():"referenceValue"in t?(n=t.referenceValue,N.fromName(n).toString()):"geoPointValue"in t?`geo(${(e=t.geoPointValue).latitude},${e.longitude})`:"arrayValue"in t?function(r){let s="[",i=!0;for(const o of r.values||[])i?i=!1:s+=",",s+=Ro(o);return s+"]"}(t.arrayValue):"mapValue"in t?function(r){const s=Object.keys(r.fields||{}).sort();let i="{",o=!0;for(const a of s)o?o=!1:i+=",",i+=`${a}:${Ro(r.fields[a])}`;return i+"}"}(t.mapValue):L();var e,n}function Ou(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function ko(t){return!!t&&"integerValue"in t}function Oa(t){return!!t&&"arrayValue"in t}function Du(t){return!!t&&"nullValue"in t}function Mu(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function ms(t){return!!t&&"mapValue"in t}function rr(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return on(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=rr(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=rr(t.arrayValue.values[n]);return e}return Object.assign({},t)}function K0(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e){this.value=e}static empty(){return new xe({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!ms(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=rr(n)}setAll(e){let n=_e.emptyPath(),r={},s=[];e.forEach((o,a)=>{if(!n.isImmediateParentOf(a)){const u=this.getFieldsMap(n);this.applyChanges(u,r,s),r={},s=[],n=a.popLast()}o?r[a.lastSegment()]=rr(o):s.push(a.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,r,s)}delete(e){const n=this.field(e.popLast());ms(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return rt(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=n.mapValue.fields[e.get(r)];ms(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=s),n=s}return n.mapValue.fields}applyChanges(e,n,r){on(n,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new xe(rr(this.value))}}function rf(t){const e=[];return on(t.fields,(n,r)=>{const s=new _e([n]);if(ms(r)){const i=rf(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new Be(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ie{constructor(e,n,r,s,i,o,a){this.key=e,this.documentType=n,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=a}static newInvalidDocument(e){return new Ie(e,0,M.min(),M.min(),M.min(),xe.empty(),0)}static newFoundDocument(e,n,r,s){return new Ie(e,1,n,M.min(),r,s,0)}static newNoDocument(e,n){return new Ie(e,2,n,M.min(),M.min(),xe.empty(),0)}static newUnknownDocument(e,n){return new Ie(e,3,n,M.min(),M.min(),xe.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(M.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=xe.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=xe.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=M.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ie&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ie(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bs{constructor(e,n){this.position=e,this.inclusive=n}}function Pu(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(i.field.isKeyField()?r=N.comparator(N.fromName(o.referenceValue),n.key):r=kn(o,n.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function xu(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!rt(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class En{constructor(e,n="asc"){this.field=e,this.dir=n}}function Q0(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sf{}class oe extends sf{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new X0(e,n,r):n==="array-contains"?new eE(e,r):n==="in"?new tE(e,r):n==="not-in"?new nE(e,r):n==="array-contains-any"?new rE(e,r):new oe(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new J0(e,r):new Z0(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(kn(n,this.value)):n!==null&&nn(this.value)===nn(n)&&this.matchesComparison(kn(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return L()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}getFirstInequalityField(){return this.isInequality()?this.field:null}}class ze extends sf{constructor(e,n){super(),this.filters=e,this.op=n,this.lt=null}static create(e,n){return new ze(e,n)}matches(e){return of(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.lt!==null||(this.lt=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.lt}getFilters(){return Object.assign([],this.filters)}getFirstInequalityField(){const e=this.ft(n=>n.isInequality());return e!==null?e.field:null}ft(e){for(const n of this.getFlattenedFilters())if(e(n))return n;return null}}function of(t){return t.op==="and"}function af(t){return Y0(t)&&of(t)}function Y0(t){for(const e of t.filters)if(e instanceof ze)return!1;return!0}function No(t){if(t instanceof oe)return t.field.canonicalString()+t.op.toString()+Nn(t.value);if(af(t))return t.filters.map(e=>No(e)).join(",");{const e=t.filters.map(n=>No(n)).join(",");return`${t.op}(${e})`}}function cf(t,e){return t instanceof oe?function(n,r){return r instanceof oe&&n.op===r.op&&n.field.isEqual(r.field)&&rt(n.value,r.value)}(t,e):t instanceof ze?function(n,r){return r instanceof ze&&n.op===r.op&&n.filters.length===r.filters.length?n.filters.reduce((s,i,o)=>s&&cf(i,r.filters[o]),!0):!1}(t,e):void L()}function uf(t){return t instanceof oe?function(e){return`${e.field.canonicalString()} ${e.op} ${Nn(e.value)}`}(t):t instanceof ze?function(e){return e.op.toString()+" {"+e.getFilters().map(uf).join(" ,")+"}"}(t):"Filter"}class X0 extends oe{constructor(e,n,r){super(e,n,r),this.key=N.fromName(r.referenceValue)}matches(e){const n=N.comparator(e.key,this.key);return this.matchesComparison(n)}}class J0 extends oe{constructor(e,n){super(e,"in",n),this.keys=lf("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class Z0 extends oe{constructor(e,n){super(e,"not-in",n),this.keys=lf("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function lf(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>N.fromName(r.referenceValue))}class eE extends oe{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return Oa(n)&&Er(n.arrayValue,this.value)}}class tE extends oe{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&Er(this.value.arrayValue,n)}}class nE extends oe{constructor(e,n){super(e,"not-in",n)}matches(e){if(Er(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!Er(this.value.arrayValue,n)}}class rE extends oe{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!Oa(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>Er(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sE{constructor(e,n=null,r=[],s=[],i=null,o=null,a=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=a,this.dt=null}}function Uu(t,e=null,n=[],r=[],s=null,i=null,o=null){return new sE(t,e,n,r,s,i,o)}function Da(t){const e=x(t);if(e.dt===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>No(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),fi(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>Nn(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>Nn(r)).join(",")),e.dt=n}return e.dt}function Ma(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!Q0(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!cf(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!xu(t.startAt,e.startAt)&&xu(t.endAt,e.endAt)}function Lo(t){return N.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fn{constructor(e,n=null,r=[],s=[],i=null,o="F",a=null,u=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=a,this.endAt=u,this.wt=null,this._t=null,this.startAt,this.endAt}}function iE(t,e,n,r,s,i,o,a){return new Fn(t,e,n,r,s,i,o,a)}function Pa(t){return new Fn(t)}function Bu(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function xa(t){return t.explicitOrderBy.length>0?t.explicitOrderBy[0].field:null}function pi(t){for(const e of t.filters){const n=e.getFirstInequalityField();if(n!==null)return n}return null}function hf(t){return t.collectionGroup!==null}function In(t){const e=x(t);if(e.wt===null){e.wt=[];const n=pi(e),r=xa(e);if(n!==null&&r===null)n.isKeyField()||e.wt.push(new En(n)),e.wt.push(new En(_e.keyField(),"asc"));else{let s=!1;for(const i of e.explicitOrderBy)e.wt.push(i),i.field.isKeyField()&&(s=!0);if(!s){const i=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";e.wt.push(new En(_e.keyField(),i))}}}return e.wt}function pt(t){const e=x(t);if(!e._t)if(e.limitType==="F")e._t=Uu(e.path,e.collectionGroup,In(e),e.filters,e.limit,e.startAt,e.endAt);else{const n=[];for(const i of In(e)){const o=i.dir==="desc"?"asc":"desc";n.push(new En(i.field,o))}const r=e.endAt?new Bs(e.endAt.position,e.endAt.inclusive):null,s=e.startAt?new Bs(e.startAt.position,e.startAt.inclusive):null;e._t=Uu(e.path,e.collectionGroup,n,e.filters,e.limit,r,s)}return e._t}function Oo(t,e){e.getFirstInequalityField(),pi(t);const n=t.filters.concat([e]);return new Fn(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function Fs(t,e,n){return new Fn(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function gi(t,e){return Ma(pt(t),pt(e))&&t.limitType===e.limitType}function df(t){return`${Da(pt(t))}|lt:${t.limitType}`}function Do(t){return`Query(target=${function(e){let n=e.path.canonicalString();return e.collectionGroup!==null&&(n+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(n+=`, filters: [${e.filters.map(r=>uf(r)).join(", ")}]`),fi(e.limit)||(n+=", limit: "+e.limit),e.orderBy.length>0&&(n+=`, orderBy: [${e.orderBy.map(r=>function(s){return`${s.field.canonicalString()} (${s.dir})`}(r)).join(", ")}]`),e.startAt&&(n+=", startAt: ",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>Nn(r)).join(",")),e.endAt&&(n+=", endAt: ",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>Nn(r)).join(",")),`Target(${n})`}(pt(t))}; limitType=${t.limitType})`}function mi(t,e){return e.isFoundDocument()&&function(n,r){const s=r.key.path;return n.collectionGroup!==null?r.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(s):N.isDocumentKey(n.path)?n.path.isEqual(s):n.path.isImmediateParentOf(s)}(t,e)&&function(n,r){for(const s of In(n))if(!s.field.isKeyField()&&r.data.field(s.field)===null)return!1;return!0}(t,e)&&function(n,r){for(const s of n.filters)if(!s.matches(r))return!1;return!0}(t,e)&&function(n,r){return!(n.startAt&&!function(s,i,o){const a=Pu(s,i,o);return s.inclusive?a<=0:a<0}(n.startAt,In(n),r)||n.endAt&&!function(s,i,o){const a=Pu(s,i,o);return s.inclusive?a>=0:a>0}(n.endAt,In(n),r))}(t,e)}function oE(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function ff(t){return(e,n)=>{let r=!1;for(const s of In(t)){const i=aE(s,e,n);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function aE(t,e,n){const r=t.field.isKeyField()?N.comparator(e.key,n.key):function(s,i,o){const a=i.data.field(s),u=o.data.field(s);return a!==null&&u!==null?kn(a,u):L()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return L()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $n{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,n]);s.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[n]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){on(this.inner,(n,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return tf(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cE=new ee(N.comparator);function gt(){return cE}const pf=new ee(N.comparator);function Xn(...t){let e=pf;for(const n of t)e=e.insert(n.key,n);return e}function gf(t){let e=pf;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function Ht(){return sr()}function mf(){return sr()}function sr(){return new $n(t=>t.toString(),(t,e)=>t.isEqual(e))}const uE=new ee(N.comparator),lE=new Ae(N.comparator);function $(...t){let e=lE;for(const n of t)e=e.add(n);return e}const hE=new Ae(z);function dE(){return hE}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yf(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Us(e)?"-0":e}}function vf(t){return{integerValue:""+t}}function fE(t,e){return H0(e)?vf(e):yf(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yi{constructor(){this._=void 0}}function pE(t,e,n){return t instanceof $s?function(r,s){const i={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:r.seconds,nanos:r.nanoseconds}}}};return s&&Na(s)&&(s=La(s)),s&&(i.fields.__previous_value__=s),{mapValue:i}}(n,e):t instanceof Ir?Ef(t,e):t instanceof _r?If(t,e):function(r,s){const i=wf(r,s),o=Fu(i)+Fu(r.gt);return ko(i)&&ko(r.gt)?vf(o):yf(r.serializer,o)}(t,e)}function gE(t,e,n){return t instanceof Ir?Ef(t,e):t instanceof _r?If(t,e):n}function wf(t,e){return t instanceof Vs?ko(n=e)||function(r){return!!r&&"doubleValue"in r}(n)?e:{integerValue:0}:null;var n}class $s extends yi{}class Ir extends yi{constructor(e){super(),this.elements=e}}function Ef(t,e){const n=_f(e);for(const r of t.elements)n.some(s=>rt(s,r))||n.push(r);return{arrayValue:{values:n}}}class _r extends yi{constructor(e){super(),this.elements=e}}function If(t,e){let n=_f(e);for(const r of t.elements)n=n.filter(s=>!rt(s,r));return{arrayValue:{values:n}}}class Vs extends yi{constructor(e,n){super(),this.serializer=e,this.gt=n}}function Fu(t){return ie(t.integerValue||t.doubleValue)}function _f(t){return Oa(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}function mE(t,e){return t.field.isEqual(e.field)&&function(n,r){return n instanceof Ir&&r instanceof Ir||n instanceof _r&&r instanceof _r?Rn(n.elements,r.elements,rt):n instanceof Vs&&r instanceof Vs?rt(n.gt,r.gt):n instanceof $s&&r instanceof $s}(t.transform,e.transform)}class yE{constructor(e,n){this.version=e,this.transformResults=n}}class et{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new et}static exists(e){return new et(void 0,e)}static updateTime(e){return new et(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ys(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class vi{}function Tf(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new Af(t.key,et.none()):new zr(t.key,t.data,et.none());{const n=t.data,r=xe.empty();let s=new Ae(_e.comparator);for(let i of e.fields)if(!s.has(i)){let o=n.field(i);o===null&&i.length>1&&(i=i.popLast(),o=n.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new Bt(t.key,r,new Be(s.toArray()),et.none())}}function vE(t,e,n){t instanceof zr?function(r,s,i){const o=r.value.clone(),a=Vu(r.fieldTransforms,s,i.transformResults);o.setAll(a),s.convertToFoundDocument(i.version,o).setHasCommittedMutations()}(t,e,n):t instanceof Bt?function(r,s,i){if(!ys(r.precondition,s))return void s.convertToUnknownDocument(i.version);const o=Vu(r.fieldTransforms,s,i.transformResults),a=s.data;a.setAll(Sf(r)),a.setAll(o),s.convertToFoundDocument(i.version,a).setHasCommittedMutations()}(t,e,n):function(r,s,i){s.convertToNoDocument(i.version).setHasCommittedMutations()}(0,e,n)}function ir(t,e,n,r){return t instanceof zr?function(s,i,o,a){if(!ys(s.precondition,i))return o;const u=s.value.clone(),d=ju(s.fieldTransforms,a,i);return u.setAll(d),i.convertToFoundDocument(i.version,u).setHasLocalMutations(),null}(t,e,n,r):t instanceof Bt?function(s,i,o,a){if(!ys(s.precondition,i))return o;const u=ju(s.fieldTransforms,a,i),d=i.data;return d.setAll(Sf(s)),d.setAll(u),i.convertToFoundDocument(i.version,d).setHasLocalMutations(),o===null?null:o.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(f=>f.field))}(t,e,n,r):function(s,i,o){return ys(s.precondition,i)?(i.convertToNoDocument(i.version).setHasLocalMutations(),null):o}(t,e,n)}function wE(t,e){let n=null;for(const r of t.fieldTransforms){const s=e.data.field(r.field),i=wf(r.transform,s||null);i!=null&&(n===null&&(n=xe.empty()),n.set(r.field,i))}return n||null}function $u(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(n,r){return n===void 0&&r===void 0||!(!n||!r)&&Rn(n,r,(s,i)=>mE(s,i))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class zr extends vi{constructor(e,n,r,s=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Bt extends vi{constructor(e,n,r,s,i=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Sf(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function Vu(t,e,n){const r=new Map;J(t.length===n.length);for(let s=0;s<n.length;s++){const i=t[s],o=i.transform,a=e.data.field(i.field);r.set(i.field,gE(o,a,n[s]))}return r}function ju(t,e,n){const r=new Map;for(const s of t){const i=s.transform,o=n.data.field(s.field);r.set(s.field,pE(i,o,e))}return r}class Af extends vi{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class EE extends vi{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IE{constructor(e,n,r,s){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&vE(i,e,r[s])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=ir(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=ir(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=mf();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let a=this.applyToLocalView(o,i.mutatedFields);a=n.has(s.key)?null:a;const u=Tf(o,a);u!==null&&r.set(s.key,u),o.isValidDocument()||o.convertToNoDocument(M.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),$())}isEqual(e){return this.batchId===e.batchId&&Rn(this.mutations,e.mutations,(n,r)=>$u(n,r))&&Rn(this.baseMutations,e.baseMutations,(n,r)=>$u(n,r))}}class Ua{constructor(e,n,r,s){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=s}static from(e,n,r){J(e.mutations.length===r.length);let s=uE;const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new Ua(e,n,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _E{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TE{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var se,V;function SE(t){switch(t){default:return L();case E.CANCELLED:case E.UNKNOWN:case E.DEADLINE_EXCEEDED:case E.RESOURCE_EXHAUSTED:case E.INTERNAL:case E.UNAVAILABLE:case E.UNAUTHENTICATED:return!1;case E.INVALID_ARGUMENT:case E.NOT_FOUND:case E.ALREADY_EXISTS:case E.PERMISSION_DENIED:case E.FAILED_PRECONDITION:case E.ABORTED:case E.OUT_OF_RANGE:case E.UNIMPLEMENTED:case E.DATA_LOSS:return!0}}function Cf(t){if(t===void 0)return ft("GRPC error has no .code"),E.UNKNOWN;switch(t){case se.OK:return E.OK;case se.CANCELLED:return E.CANCELLED;case se.UNKNOWN:return E.UNKNOWN;case se.DEADLINE_EXCEEDED:return E.DEADLINE_EXCEEDED;case se.RESOURCE_EXHAUSTED:return E.RESOURCE_EXHAUSTED;case se.INTERNAL:return E.INTERNAL;case se.UNAVAILABLE:return E.UNAVAILABLE;case se.UNAUTHENTICATED:return E.UNAUTHENTICATED;case se.INVALID_ARGUMENT:return E.INVALID_ARGUMENT;case se.NOT_FOUND:return E.NOT_FOUND;case se.ALREADY_EXISTS:return E.ALREADY_EXISTS;case se.PERMISSION_DENIED:return E.PERMISSION_DENIED;case se.FAILED_PRECONDITION:return E.FAILED_PRECONDITION;case se.ABORTED:return E.ABORTED;case se.OUT_OF_RANGE:return E.OUT_OF_RANGE;case se.UNIMPLEMENTED:return E.UNIMPLEMENTED;case se.DATA_LOSS:return E.DATA_LOSS;default:return L()}}(V=se||(se={}))[V.OK=0]="OK",V[V.CANCELLED=1]="CANCELLED",V[V.UNKNOWN=2]="UNKNOWN",V[V.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",V[V.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",V[V.NOT_FOUND=5]="NOT_FOUND",V[V.ALREADY_EXISTS=6]="ALREADY_EXISTS",V[V.PERMISSION_DENIED=7]="PERMISSION_DENIED",V[V.UNAUTHENTICATED=16]="UNAUTHENTICATED",V[V.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",V[V.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",V[V.ABORTED=10]="ABORTED",V[V.OUT_OF_RANGE=11]="OUT_OF_RANGE",V[V.UNIMPLEMENTED=12]="UNIMPLEMENTED",V[V.INTERNAL=13]="INTERNAL",V[V.UNAVAILABLE=14]="UNAVAILABLE",V[V.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ba{constructor(){this.onExistenceFilterMismatchCallbacks=new Map}static get instance(){return cs}static getOrCreateInstance(){return cs===null&&(cs=new Ba),cs}onExistenceFilterMismatch(e){const n=Symbol();return this.onExistenceFilterMismatchCallbacks.set(n,e),()=>this.onExistenceFilterMismatchCallbacks.delete(n)}notifyOnExistenceFilterMismatch(e){this.onExistenceFilterMismatchCallbacks.forEach(n=>n(e))}}let cs=null;/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AE(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CE=new wn([4294967295,4294967295],0);function qu(t){const e=AE().encode(t),n=new N0;return n.update(e),new Uint8Array(n.digest())}function zu(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new wn([n,r],0),new wn([s,i],0)]}class Fa{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new Jn(`Invalid padding: ${n}`);if(r<0)throw new Jn(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Jn(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new Jn(`Invalid padding when bitmap length is 0: ${n}`);this.It=8*e.length-n,this.Tt=wn.fromNumber(this.It)}Et(e,n,r){let s=e.add(n.multiply(wn.fromNumber(r)));return s.compare(CE)===1&&(s=new wn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Tt).toNumber()}At(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}vt(e){if(this.It===0)return!1;const n=qu(e),[r,s]=zu(n);for(let i=0;i<this.hashCount;i++){const o=this.Et(r,s,i);if(!this.At(o))return!1}return!0}static create(e,n,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Fa(i,s,n);return r.forEach(a=>o.insert(a)),o}insert(e){if(this.It===0)return;const n=qu(e),[r,s]=zu(n);for(let i=0;i<this.hashCount;i++){const o=this.Et(r,s,i);this.Rt(o)}}Rt(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class Jn extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wi{constructor(e,n,r,s,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const s=new Map;return s.set(e,Hr.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new wi(M.min(),s,new ee(z),gt(),$())}}class Hr{constructor(e,n,r,s,i){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new Hr(r,n,$(),$(),$())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vs{constructor(e,n,r,s){this.Pt=e,this.removedTargetIds=n,this.key=r,this.bt=s}}class bf{constructor(e,n){this.targetId=e,this.Vt=n}}class Rf{constructor(e,n,r=be.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=s}}class Hu{constructor(){this.St=0,this.Dt=Wu(),this.Ct=be.EMPTY_BYTE_STRING,this.xt=!1,this.Nt=!0}get current(){return this.xt}get resumeToken(){return this.Ct}get kt(){return this.St!==0}get Mt(){return this.Nt}$t(e){e.approximateByteSize()>0&&(this.Nt=!0,this.Ct=e)}Ot(){let e=$(),n=$(),r=$();return this.Dt.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:n=n.add(s);break;case 1:r=r.add(s);break;default:L()}}),new Hr(this.Ct,this.xt,e,n,r)}Ft(){this.Nt=!1,this.Dt=Wu()}Bt(e,n){this.Nt=!0,this.Dt=this.Dt.insert(e,n)}Lt(e){this.Nt=!0,this.Dt=this.Dt.remove(e)}qt(){this.St+=1}Ut(){this.St-=1}Kt(){this.Nt=!0,this.xt=!0}}class bE{constructor(e){this.Gt=e,this.Qt=new Map,this.jt=gt(),this.zt=Gu(),this.Wt=new ee(z)}Ht(e){for(const n of e.Pt)e.bt&&e.bt.isFoundDocument()?this.Jt(n,e.bt):this.Yt(n,e.key,e.bt);for(const n of e.removedTargetIds)this.Yt(n,e.key,e.bt)}Xt(e){this.forEachTarget(e,n=>{const r=this.Zt(n);switch(e.state){case 0:this.te(n)&&r.$t(e.resumeToken);break;case 1:r.Ut(),r.kt||r.Ft(),r.$t(e.resumeToken);break;case 2:r.Ut(),r.kt||this.removeTarget(n);break;case 3:this.te(n)&&(r.Kt(),r.$t(e.resumeToken));break;case 4:this.te(n)&&(this.ee(n),r.$t(e.resumeToken));break;default:L()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Qt.forEach((r,s)=>{this.te(s)&&n(s)})}ne(e){var n;const r=e.targetId,s=e.Vt.count,i=this.se(r);if(i){const o=i.target;if(Lo(o))if(s===0){const a=new N(o.path);this.Yt(r,a,Ie.newNoDocument(a,M.min()))}else J(s===1);else{const a=this.ie(r);if(a!==s){const u=this.re(e,a);if(u!==0){this.ee(r);const d=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Wt=this.Wt.insert(r,d)}(n=Ba.instance)===null||n===void 0||n.notifyOnExistenceFilterMismatch(function(d,f,g){var y,v,T,b,R,B;const F={localCacheCount:f,existenceFilterCount:g.count},q=g.unchangedNames;return q&&(F.bloomFilter={applied:d===0,hashCount:(y=q==null?void 0:q.hashCount)!==null&&y!==void 0?y:0,bitmapLength:(b=(T=(v=q==null?void 0:q.bits)===null||v===void 0?void 0:v.bitmap)===null||T===void 0?void 0:T.length)!==null&&b!==void 0?b:0,padding:(B=(R=q==null?void 0:q.bits)===null||R===void 0?void 0:R.padding)!==null&&B!==void 0?B:0}),F}(u,a,e.Vt))}}}}re(e,n){const{unchangedNames:r,count:s}=e.Vt;if(!r||!r.bits)return 1;const{bits:{bitmap:i="",padding:o=0},hashCount:a=0}=r;let u,d;try{u=tn(i).toUint8Array()}catch(f){if(f instanceof nf)return bn("Decoding the base64 bloom filter in existence filter failed ("+f.message+"); ignoring the bloom filter and falling back to full re-query."),1;throw f}try{d=new Fa(u,o,a)}catch(f){return bn(f instanceof Jn?"BloomFilter error: ":"Applying bloom filter failed: ",f),1}return d.It===0?1:s!==n-this.oe(e.targetId,d)?2:0}oe(e,n){const r=this.Gt.getRemoteKeysForTarget(e);let s=0;return r.forEach(i=>{const o=this.Gt.ue(),a=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;n.vt(a)||(this.Yt(e,i,null),s++)}),s}ce(e){const n=new Map;this.Qt.forEach((i,o)=>{const a=this.se(o);if(a){if(i.current&&Lo(a.target)){const u=new N(a.target.path);this.jt.get(u)!==null||this.ae(o,u)||this.Yt(o,u,Ie.newNoDocument(u,e))}i.Mt&&(n.set(o,i.Ot()),i.Ft())}});let r=$();this.zt.forEach((i,o)=>{let a=!0;o.forEachWhile(u=>{const d=this.se(u);return!d||d.purpose==="TargetPurposeLimboResolution"||(a=!1,!1)}),a&&(r=r.add(i))}),this.jt.forEach((i,o)=>o.setReadTime(e));const s=new wi(e,n,this.Wt,this.jt,r);return this.jt=gt(),this.zt=Gu(),this.Wt=new ee(z),s}Jt(e,n){if(!this.te(e))return;const r=this.ae(e,n.key)?2:0;this.Zt(e).Bt(n.key,r),this.jt=this.jt.insert(n.key,n),this.zt=this.zt.insert(n.key,this.he(n.key).add(e))}Yt(e,n,r){if(!this.te(e))return;const s=this.Zt(e);this.ae(e,n)?s.Bt(n,1):s.Lt(n),this.zt=this.zt.insert(n,this.he(n).delete(e)),r&&(this.jt=this.jt.insert(n,r))}removeTarget(e){this.Qt.delete(e)}ie(e){const n=this.Zt(e).Ot();return this.Gt.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}qt(e){this.Zt(e).qt()}Zt(e){let n=this.Qt.get(e);return n||(n=new Hu,this.Qt.set(e,n)),n}he(e){let n=this.zt.get(e);return n||(n=new Ae(z),this.zt=this.zt.insert(e,n)),n}te(e){const n=this.se(e)!==null;return n||k("WatchChangeAggregator","Detected inactive target",e),n}se(e){const n=this.Qt.get(e);return n&&n.kt?null:this.Gt.le(e)}ee(e){this.Qt.set(e,new Hu),this.Gt.getRemoteKeysForTarget(e).forEach(n=>{this.Yt(e,n,null)})}ae(e,n){return this.Gt.getRemoteKeysForTarget(e).has(n)}}function Gu(){return new ee(N.comparator)}function Wu(){return new ee(N.comparator)}const RE=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),kE=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))(),NE=(()=>({and:"AND",or:"OR"}))();class LE{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function Mo(t,e){return t.useProto3Json||fi(e)?e:{value:e}}function js(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function kf(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function OE(t,e){return js(t,e.toTimestamp())}function tt(t){return J(!!t),M.fromTimestamp(function(e){const n=Mt(e);return new ae(n.seconds,n.nanos)}(t))}function $a(t,e){return function(n){return new Y(["projects",n.projectId,"databases",n.database])}(t).child("documents").child(e).canonicalString()}function Nf(t){const e=Y.fromString(t);return J(Mf(e)),e}function Po(t,e){return $a(t.databaseId,e.path)}function Yi(t,e){const n=Nf(e);if(n.get(1)!==t.databaseId.projectId)throw new C(E.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new C(E.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new N(Lf(n))}function xo(t,e){return $a(t.databaseId,e)}function DE(t){const e=Nf(t);return e.length===4?Y.emptyPath():Lf(e)}function Uo(t){return new Y(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function Lf(t){return J(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function Ku(t,e,n){return{name:Po(t,e),fields:n.value.mapValue.fields}}function ME(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(u){return u==="NO_CHANGE"?0:u==="ADD"?1:u==="REMOVE"?2:u==="CURRENT"?3:u==="RESET"?4:L()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(u,d){return u.useProto3Json?(J(d===void 0||typeof d=="string"),be.fromBase64String(d||"")):(J(d===void 0||d instanceof Uint8Array),be.fromUint8Array(d||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&function(u){const d=u.code===void 0?E.UNKNOWN:Cf(u.code);return new C(d,u.message||"")}(o);n=new Rf(r,s,i,a||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Yi(t,r.document.name),i=tt(r.document.updateTime),o=r.document.createTime?tt(r.document.createTime):M.min(),a=new xe({mapValue:{fields:r.document.fields}}),u=Ie.newFoundDocument(s,i,o,a),d=r.targetIds||[],f=r.removedTargetIds||[];n=new vs(d,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Yi(t,r.document),i=r.readTime?tt(r.readTime):M.min(),o=Ie.newNoDocument(s,i),a=r.removedTargetIds||[];n=new vs([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Yi(t,r.document),i=r.removedTargetIds||[];n=new vs([],i,s,null)}else{if(!("filter"in e))return L();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new TE(s,i),a=r.targetId;n=new bf(a,o)}}return n}function PE(t,e){let n;if(e instanceof zr)n={update:Ku(t,e.key,e.value)};else if(e instanceof Af)n={delete:Po(t,e.key)};else if(e instanceof Bt)n={update:Ku(t,e.key,e.data),updateMask:zE(e.fieldMask)};else{if(!(e instanceof EE))return L();n={verify:Po(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(s,i){const o=i.transform;if(o instanceof $s)return{fieldPath:i.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(o instanceof Ir)return{fieldPath:i.field.canonicalString(),appendMissingElements:{values:o.elements}};if(o instanceof _r)return{fieldPath:i.field.canonicalString(),removeAllFromArray:{values:o.elements}};if(o instanceof Vs)return{fieldPath:i.field.canonicalString(),increment:o.gt};throw L()}(0,r))),e.precondition.isNone||(n.currentDocument=function(r,s){return s.updateTime!==void 0?{updateTime:OE(r,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:L()}(t,e.precondition)),n}function xE(t,e){return t&&t.length>0?(J(e!==void 0),t.map(n=>function(r,s){let i=r.updateTime?tt(r.updateTime):tt(s);return i.isEqual(M.min())&&(i=tt(s)),new yE(i,r.transformResults||[])}(n,e))):[]}function UE(t,e){return{documents:[xo(t,e.path)]}}function BE(t,e){const n={structuredQuery:{}},r=e.path;e.collectionGroup!==null?(n.parent=xo(t,r),n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(n.parent=xo(t,r.popLast()),n.structuredQuery.from=[{collectionId:r.lastSegment()}]);const s=function(u){if(u.length!==0)return Df(ze.create(u,"and"))}(e.filters);s&&(n.structuredQuery.where=s);const i=function(u){if(u.length!==0)return u.map(d=>function(f){return{field:dn(f.field),direction:VE(f.dir)}}(d))}(e.orderBy);i&&(n.structuredQuery.orderBy=i);const o=Mo(t,e.limit);var a;return o!==null&&(n.structuredQuery.limit=o),e.startAt&&(n.structuredQuery.startAt={before:(a=e.startAt).inclusive,values:a.position}),e.endAt&&(n.structuredQuery.endAt=function(u){return{before:!u.inclusive,values:u.position}}(e.endAt)),n}function FE(t){let e=DE(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){J(r===1);const f=n.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];n.where&&(i=function(f){const g=Of(f);return g instanceof ze&&af(g)?g.getFilters():[g]}(n.where));let o=[];n.orderBy&&(o=n.orderBy.map(f=>function(g){return new En(fn(g.field),function(y){switch(y){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(g.direction))}(f)));let a=null;n.limit&&(a=function(f){let g;return g=typeof f=="object"?f.value:f,fi(g)?null:g}(n.limit));let u=null;n.startAt&&(u=function(f){const g=!!f.before,y=f.values||[];return new Bs(y,g)}(n.startAt));let d=null;return n.endAt&&(d=function(f){const g=!f.before,y=f.values||[];return new Bs(y,g)}(n.endAt)),iE(e,s,o,i,a,"F",u,d)}function $E(t,e){const n=function(r){switch(r){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return L()}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function Of(t){return t.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const n=fn(e.unaryFilter.field);return oe.create(n,"==",{doubleValue:NaN});case"IS_NULL":const r=fn(e.unaryFilter.field);return oe.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=fn(e.unaryFilter.field);return oe.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const i=fn(e.unaryFilter.field);return oe.create(i,"!=",{nullValue:"NULL_VALUE"});default:return L()}}(t):t.fieldFilter!==void 0?function(e){return oe.create(fn(e.fieldFilter.field),function(n){switch(n){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return L()}}(e.fieldFilter.op),e.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(e){return ze.create(e.compositeFilter.filters.map(n=>Of(n)),function(n){switch(n){case"AND":return"and";case"OR":return"or";default:return L()}}(e.compositeFilter.op))}(t):L()}function VE(t){return RE[t]}function jE(t){return kE[t]}function qE(t){return NE[t]}function dn(t){return{fieldPath:t.canonicalString()}}function fn(t){return _e.fromServerFormat(t.fieldPath)}function Df(t){return t instanceof oe?function(e){if(e.op==="=="){if(Mu(e.value))return{unaryFilter:{field:dn(e.field),op:"IS_NAN"}};if(Du(e.value))return{unaryFilter:{field:dn(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(Mu(e.value))return{unaryFilter:{field:dn(e.field),op:"IS_NOT_NAN"}};if(Du(e.value))return{unaryFilter:{field:dn(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:dn(e.field),op:jE(e.op),value:e.value}}}(t):t instanceof ze?function(e){const n=e.getFilters().map(r=>Df(r));return n.length===1?n[0]:{compositeFilter:{op:qE(e.op),filters:n}}}(t):L()}function zE(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function Mf(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt{constructor(e,n,r,s,i=M.min(),o=M.min(),a=be.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a,this.expectedCount=u}withSequenceNumber(e){return new bt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new bt(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new bt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new bt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HE{constructor(e){this.fe=e}}function GE(t){const e=FE({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?Fs(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WE{constructor(){this.rn=new KE}addToCollectionParentIndex(e,n){return this.rn.add(n),I.resolve()}getCollectionParents(e,n){return I.resolve(this.rn.getEntries(n))}addFieldIndex(e,n){return I.resolve()}deleteFieldIndex(e,n){return I.resolve()}getDocumentsMatchingTarget(e,n){return I.resolve(null)}getIndexType(e,n){return I.resolve(0)}getFieldIndexes(e,n){return I.resolve([])}getNextCollectionGroupToUpdate(e){return I.resolve(null)}getMinOffset(e,n){return I.resolve(Dt.min())}getMinOffsetFromCollectionGroup(e,n){return I.resolve(Dt.min())}updateCollectionGroup(e,n,r){return I.resolve()}updateIndexEntries(e,n){return I.resolve()}}class KE{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n]||new Ae(Y.comparator),i=!s.has(r);return this.index[n]=s.add(r),i}has(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Ae(Y.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ln{constructor(e){this.Nn=e}next(){return this.Nn+=2,this.Nn}static kn(){return new Ln(0)}static Mn(){return new Ln(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QE{constructor(){this.changes=new $n(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,Ie.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?I.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YE{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XE{constructor(e,n,r,s){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,n))).next(s=>(r!==null&&ir(r.mutation,s,Be.empty(),ae.now()),s))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,$()).next(()=>r))}getLocalViewOfDocuments(e,n,r=$()){const s=Ht();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,r).next(i=>{let o=Xn();return i.forEach((a,u)=>{o=o.insert(a,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const r=Ht();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,$()))}populateOverlays(e,n,r){const s=[];return r.forEach(i=>{n.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,a)=>{n.set(o,a)})})}computeViews(e,n,r,s){let i=gt();const o=sr(),a=sr();return n.forEach((u,d)=>{const f=r.get(d.key);s.has(d.key)&&(f===void 0||f.mutation instanceof Bt)?i=i.insert(d.key,d):f!==void 0?(o.set(d.key,f.mutation.getFieldMask()),ir(f.mutation,d,f.mutation.getFieldMask(),ae.now())):o.set(d.key,Be.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((d,f)=>o.set(d,f)),n.forEach((d,f)=>{var g;return a.set(d,new YE(f,(g=o.get(d))!==null&&g!==void 0?g:null))}),a))}recalculateAndSaveOverlays(e,n){const r=sr();let s=new ee((o,a)=>o-a),i=$();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const a of o)a.keys().forEach(u=>{const d=n.get(u);if(d===null)return;let f=r.get(u)||Be.empty();f=a.applyToLocalView(d,f),r.set(u,f);const g=(s.get(a.batchId)||$()).add(u);s=s.insert(a.batchId,g)})}).next(()=>{const o=[],a=s.getReverseIterator();for(;a.hasNext();){const u=a.getNext(),d=u.key,f=u.value,g=mf();f.forEach(y=>{if(!i.has(y)){const v=Tf(n.get(y),r.get(y));v!==null&&g.set(y,v),i=i.add(y)}}),o.push(this.documentOverlayCache.saveOverlays(e,d,g))}return I.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r){return function(s){return N.isDocumentKey(s.path)&&s.collectionGroup===null&&s.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):hf(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r):this.getDocumentsMatchingCollectionQuery(e,n,r)}getNextDocuments(e,n,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,s-i.size):I.resolve(Ht());let a=-1,u=i;return o.next(d=>I.forEach(d,(f,g)=>(a<g.largestBatchId&&(a=g.largestBatchId),i.get(f)?I.resolve():this.remoteDocumentCache.getEntry(e,f).next(y=>{u=u.insert(f,y)}))).next(()=>this.populateOverlays(e,d,i)).next(()=>this.computeViews(e,u,d,$())).next(f=>({batchId:a,changes:gf(f)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new N(n)).next(r=>{let s=Xn();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,n,r){const s=n.collectionGroup;let i=Xn();return this.indexManager.getCollectionParents(e,s).next(o=>I.forEach(o,a=>{const u=function(d,f){return new Fn(f,null,d.explicitOrderBy.slice(),d.filters.slice(),d.limit,d.limitType,d.startAt,d.endAt)}(n,a.child(s));return this.getDocumentsMatchingCollectionQuery(e,u,r).next(d=>{d.forEach((f,g)=>{i=i.insert(f,g)})})}).next(()=>i))}getDocumentsMatchingCollectionQuery(e,n,r){let s;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(i=>(s=i,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,s))).next(i=>{s.forEach((a,u)=>{const d=u.getKey();i.get(d)===null&&(i=i.insert(d,Ie.newInvalidDocument(d)))});let o=Xn();return i.forEach((a,u)=>{const d=s.get(a);d!==void 0&&ir(d.mutation,u,Be.empty(),ae.now()),mi(n,u)&&(o=o.insert(a,u))}),o})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JE{constructor(e){this.serializer=e,this.cs=new Map,this.hs=new Map}getBundleMetadata(e,n){return I.resolve(this.cs.get(n))}saveBundleMetadata(e,n){var r;return this.cs.set(n.id,{id:(r=n).id,version:r.version,createTime:tt(r.createTime)}),I.resolve()}getNamedQuery(e,n){return I.resolve(this.hs.get(n))}saveNamedQuery(e,n){return this.hs.set(n.name,function(r){return{name:r.name,query:GE(r.bundledQuery),readTime:tt(r.readTime)}}(n)),I.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZE{constructor(){this.overlays=new ee(N.comparator),this.ls=new Map}getOverlay(e,n){return I.resolve(this.overlays.get(n))}getOverlays(e,n){const r=Ht();return I.forEach(n,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((s,i)=>{this.we(e,n,i)}),I.resolve()}removeOverlaysForBatchId(e,n,r){const s=this.ls.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.ls.delete(r)),I.resolve()}getOverlaysForCollection(e,n,r){const s=Ht(),i=n.length+1,o=new N(n.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const u=a.getNext().value,d=u.getKey();if(!n.isPrefixOf(d.path))break;d.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return I.resolve(s)}getOverlaysForCollectionGroup(e,n,r,s){let i=new ee((d,f)=>d-f);const o=this.overlays.getIterator();for(;o.hasNext();){const d=o.getNext().value;if(d.getKey().getCollectionGroup()===n&&d.largestBatchId>r){let f=i.get(d.largestBatchId);f===null&&(f=Ht(),i=i.insert(d.largestBatchId,f)),f.set(d.getKey(),d)}}const a=Ht(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((d,f)=>a.set(d,f)),!(a.size()>=s)););return I.resolve(a)}we(e,n,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.ls.get(s.largestBatchId).delete(r.key);this.ls.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new _E(n,r));let i=this.ls.get(n);i===void 0&&(i=$(),this.ls.set(n,i)),this.ls.set(n,i.add(r.key))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Va{constructor(){this.fs=new Ae(he.ds),this.ws=new Ae(he._s)}isEmpty(){return this.fs.isEmpty()}addReference(e,n){const r=new he(e,n);this.fs=this.fs.add(r),this.ws=this.ws.add(r)}gs(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.ys(new he(e,n))}ps(e,n){e.forEach(r=>this.removeReference(r,n))}Is(e){const n=new N(new Y([])),r=new he(n,e),s=new he(n,e+1),i=[];return this.ws.forEachInRange([r,s],o=>{this.ys(o),i.push(o.key)}),i}Ts(){this.fs.forEach(e=>this.ys(e))}ys(e){this.fs=this.fs.delete(e),this.ws=this.ws.delete(e)}Es(e){const n=new N(new Y([])),r=new he(n,e),s=new he(n,e+1);let i=$();return this.ws.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){const n=new he(e,0),r=this.fs.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class he{constructor(e,n){this.key=e,this.As=n}static ds(e,n){return N.comparator(e.key,n.key)||z(e.As,n.As)}static _s(e,n){return z(e.As,n.As)||N.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eI{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.vs=1,this.Rs=new Ae(he.ds)}checkEmpty(e){return I.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,s){const i=this.vs;this.vs++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new IE(i,n,r,s);this.mutationQueue.push(o);for(const a of s)this.Rs=this.Rs.add(new he(a.key,i)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return I.resolve(o)}lookupMutationBatch(e,n){return I.resolve(this.Ps(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,s=this.bs(r),i=s<0?0:s;return I.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return I.resolve(this.mutationQueue.length===0?-1:this.vs-1)}getAllMutationBatches(e){return I.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new he(n,0),s=new he(n,Number.POSITIVE_INFINITY),i=[];return this.Rs.forEachInRange([r,s],o=>{const a=this.Ps(o.As);i.push(a)}),I.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new Ae(z);return n.forEach(s=>{const i=new he(s,0),o=new he(s,Number.POSITIVE_INFINITY);this.Rs.forEachInRange([i,o],a=>{r=r.add(a.As)})}),I.resolve(this.Vs(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,s=r.length+1;let i=r;N.isDocumentKey(i)||(i=i.child(""));const o=new he(new N(i),0);let a=new Ae(z);return this.Rs.forEachWhile(u=>{const d=u.key.path;return!!r.isPrefixOf(d)&&(d.length===s&&(a=a.add(u.As)),!0)},o),I.resolve(this.Vs(a))}Vs(e){const n=[];return e.forEach(r=>{const s=this.Ps(r);s!==null&&n.push(s)}),n}removeMutationBatch(e,n){J(this.Ss(n.batchId,"removed")===0),this.mutationQueue.shift();let r=this.Rs;return I.forEach(n.mutations,s=>{const i=new he(s.key,n.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Rs=r})}Cn(e){}containsKey(e,n){const r=new he(n,0),s=this.Rs.firstAfterOrEqual(r);return I.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,I.resolve()}Ss(e,n){return this.bs(e)}bs(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Ps(e){const n=this.bs(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tI{constructor(e){this.Ds=e,this.docs=new ee(N.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,s=this.docs.get(r),i=s?s.size:0,o=this.Ds(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return I.resolve(r?r.document.mutableCopy():Ie.newInvalidDocument(n))}getEntries(e,n){let r=gt();return n.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Ie.newInvalidDocument(s))}),I.resolve(r)}getDocumentsMatchingQuery(e,n,r,s){let i=gt();const o=n.path,a=new N(o.child("")),u=this.docs.getIteratorFrom(a);for(;u.hasNext();){const{key:d,value:{document:f}}=u.getNext();if(!o.isPrefixOf(d.path))break;d.path.length>o.length+1||j0(V0(f),r)<=0||(s.has(f.key)||mi(n,f))&&(i=i.insert(f.key,f.mutableCopy()))}return I.resolve(i)}getAllFromCollectionGroup(e,n,r,s){L()}Cs(e,n){return I.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new nI(this)}getSize(e){return I.resolve(this.size)}}class nI extends QE{constructor(e){super(),this.os=e}applyChanges(e){const n=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?n.push(this.os.addEntry(e,s)):this.os.removeEntry(r)}),I.waitFor(n)}getFromCache(e,n){return this.os.getEntry(e,n)}getAllFromCache(e,n){return this.os.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rI{constructor(e){this.persistence=e,this.xs=new $n(n=>Da(n),Ma),this.lastRemoteSnapshotVersion=M.min(),this.highestTargetId=0,this.Ns=0,this.ks=new Va,this.targetCount=0,this.Ms=Ln.kn()}forEachTarget(e,n){return this.xs.forEach((r,s)=>n(s)),I.resolve()}getLastRemoteSnapshotVersion(e){return I.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return I.resolve(this.Ns)}allocateTargetId(e){return this.highestTargetId=this.Ms.next(),I.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.Ns&&(this.Ns=n),I.resolve()}Fn(e){this.xs.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.Ms=new Ln(n),this.highestTargetId=n),e.sequenceNumber>this.Ns&&(this.Ns=e.sequenceNumber)}addTargetData(e,n){return this.Fn(n),this.targetCount+=1,I.resolve()}updateTargetData(e,n){return this.Fn(n),I.resolve()}removeTargetData(e,n){return this.xs.delete(n.target),this.ks.Is(n.targetId),this.targetCount-=1,I.resolve()}removeTargets(e,n,r){let s=0;const i=[];return this.xs.forEach((o,a)=>{a.sequenceNumber<=n&&r.get(a.targetId)===null&&(this.xs.delete(o),i.push(this.removeMatchingKeysForTargetId(e,a.targetId)),s++)}),I.waitFor(i).next(()=>s)}getTargetCount(e){return I.resolve(this.targetCount)}getTargetData(e,n){const r=this.xs.get(n)||null;return I.resolve(r)}addMatchingKeys(e,n,r){return this.ks.gs(n,r),I.resolve()}removeMatchingKeys(e,n,r){this.ks.ps(n,r);const s=this.persistence.referenceDelegate,i=[];return s&&n.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),I.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this.ks.Is(n),I.resolve()}getMatchingKeysForTargetId(e,n){const r=this.ks.Es(n);return I.resolve(r)}containsKey(e,n){return I.resolve(this.ks.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sI{constructor(e,n){this.$s={},this.overlays={},this.Os=new ka(0),this.Fs=!1,this.Fs=!0,this.referenceDelegate=e(this),this.Bs=new rI(this),this.indexManager=new WE,this.remoteDocumentCache=function(r){return new tI(r)}(r=>this.referenceDelegate.Ls(r)),this.serializer=new HE(n),this.qs=new JE(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Fs=!1,Promise.resolve()}get started(){return this.Fs}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new ZE,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.$s[e.toKey()];return r||(r=new eI(n,this.referenceDelegate),this.$s[e.toKey()]=r),r}getTargetCache(){return this.Bs}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.qs}runTransaction(e,n,r){k("MemoryPersistence","Starting transaction:",e);const s=new iI(this.Os.next());return this.referenceDelegate.Us(),r(s).next(i=>this.referenceDelegate.Ks(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Gs(e,n){return I.or(Object.values(this.$s).map(r=>()=>r.containsKey(e,n)))}}class iI extends z0{constructor(e){super(),this.currentSequenceNumber=e}}class ja{constructor(e){this.persistence=e,this.Qs=new Va,this.js=null}static zs(e){return new ja(e)}get Ws(){if(this.js)return this.js;throw L()}addReference(e,n,r){return this.Qs.addReference(r,n),this.Ws.delete(r.toString()),I.resolve()}removeReference(e,n,r){return this.Qs.removeReference(r,n),this.Ws.add(r.toString()),I.resolve()}markPotentiallyOrphaned(e,n){return this.Ws.add(n.toString()),I.resolve()}removeTarget(e,n){this.Qs.Is(n.targetId).forEach(s=>this.Ws.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(s=>{s.forEach(i=>this.Ws.add(i.toString()))}).next(()=>r.removeTargetData(e,n))}Us(){this.js=new Set}Ks(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return I.forEach(this.Ws,r=>{const s=N.fromPath(r);return this.Hs(e,s).next(i=>{i||n.removeEntry(s,M.min())})}).next(()=>(this.js=null,n.apply(e)))}updateLimboDocument(e,n){return this.Hs(e,n).next(r=>{r?this.Ws.delete(n.toString()):this.Ws.add(n.toString())})}Ls(e){return 0}Hs(e,n){return I.or([()=>I.resolve(this.Qs.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Gs(e,n)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qa{constructor(e,n,r,s){this.targetId=e,this.fromCache=n,this.Fi=r,this.Bi=s}static Li(e,n){let r=$(),s=$();for(const i of n.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new qa(e,n.fromCache,r,s)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oI{constructor(){this.qi=!1}initialize(e,n){this.Ui=e,this.indexManager=n,this.qi=!0}getDocumentsMatchingQuery(e,n,r,s){return this.Ki(e,n).next(i=>i||this.Gi(e,n,s,r)).next(i=>i||this.Qi(e,n))}Ki(e,n){if(Bu(n))return I.resolve(null);let r=pt(n);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(n.limit!==null&&s===1&&(n=Fs(n,null,"F"),r=pt(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const o=$(...i);return this.Ui.getDocuments(e,o).next(a=>this.indexManager.getMinOffset(e,r).next(u=>{const d=this.ji(n,a);return this.zi(n,d,o,u.readTime)?this.Ki(e,Fs(n,null,"F")):this.Wi(e,d,n,u)}))})))}Gi(e,n,r,s){return Bu(n)||s.isEqual(M.min())?this.Qi(e,n):this.Ui.getDocuments(e,r).next(i=>{const o=this.ji(n,i);return this.zi(n,o,r,s)?this.Qi(e,n):(Ru()<=j.DEBUG&&k("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Do(n)),this.Wi(e,o,n,$0(s,-1)))})}ji(e,n){let r=new Ae(ff(e));return n.forEach((s,i)=>{mi(e,i)&&(r=r.add(i))}),r}zi(e,n,r,s){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Qi(e,n){return Ru()<=j.DEBUG&&k("QueryEngine","Using full collection scan to execute query:",Do(n)),this.Ui.getDocumentsMatchingQuery(e,n,Dt.min())}Wi(e,n,r,s){return this.Ui.getDocumentsMatchingQuery(e,r,s).next(i=>(n.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aI{constructor(e,n,r,s){this.persistence=e,this.Hi=n,this.serializer=s,this.Ji=new ee(z),this.Yi=new $n(i=>Da(i),Ma),this.Xi=new Map,this.Zi=e.getRemoteDocumentCache(),this.Bs=e.getTargetCache(),this.qs=e.getBundleCache(),this.tr(r)}tr(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new XE(this.Zi,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Zi.setIndexManager(this.indexManager),this.Hi.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.Ji))}}function cI(t,e,n,r){return new aI(t,e,n,r)}async function Pf(t,e){const n=x(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let s;return n.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,n.tr(e),n.mutationQueue.getAllMutationBatches(r))).next(i=>{const o=[],a=[];let u=$();for(const d of s){o.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}for(const d of i){a.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}return n.localDocuments.getDocuments(r,u).next(d=>({er:d,removedBatchIds:o,addedBatchIds:a}))})})}function uI(t,e){const n=x(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=n.Zi.newChangeBuffer({trackRemovals:!0});return function(o,a,u,d){const f=u.batch,g=f.keys();let y=I.resolve();return g.forEach(v=>{y=y.next(()=>d.getEntry(a,v)).next(T=>{const b=u.docVersions.get(v);J(b!==null),T.version.compareTo(b)<0&&(f.applyToRemoteDocument(T,u),T.isValidDocument()&&(T.setReadTime(u.commitVersion),d.addEntry(T)))})}),y.next(()=>o.mutationQueue.removeMutationBatch(a,f))}(n,r,e,i).next(()=>i.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(o){let a=$();for(let u=0;u<o.mutationResults.length;++u)o.mutationResults[u].transformResults.length>0&&(a=a.add(o.batch.mutations[u].key));return a}(e))).next(()=>n.localDocuments.getDocuments(r,s))})}function xf(t){const e=x(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Bs.getLastRemoteSnapshotVersion(n))}function lI(t,e){const n=x(t),r=e.snapshotVersion;let s=n.Ji;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=n.Zi.newChangeBuffer({trackRemovals:!0});s=n.Ji;const a=[];e.targetChanges.forEach((f,g)=>{const y=s.get(g);if(!y)return;a.push(n.Bs.removeMatchingKeys(i,f.removedDocuments,g).next(()=>n.Bs.addMatchingKeys(i,f.addedDocuments,g)));let v=y.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(g)!==null?v=v.withResumeToken(be.EMPTY_BYTE_STRING,M.min()).withLastLimboFreeSnapshotVersion(M.min()):f.resumeToken.approximateByteSize()>0&&(v=v.withResumeToken(f.resumeToken,r)),s=s.insert(g,v),function(T,b,R){return T.resumeToken.approximateByteSize()===0||b.snapshotVersion.toMicroseconds()-T.snapshotVersion.toMicroseconds()>=3e8?!0:R.addedDocuments.size+R.modifiedDocuments.size+R.removedDocuments.size>0}(y,v,f)&&a.push(n.Bs.updateTargetData(i,v))});let u=gt(),d=$();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&a.push(n.persistence.referenceDelegate.updateLimboDocument(i,f))}),a.push(hI(i,o,e.documentUpdates).next(f=>{u=f.nr,d=f.sr})),!r.isEqual(M.min())){const f=n.Bs.getLastRemoteSnapshotVersion(i).next(g=>n.Bs.setTargetsMetadata(i,i.currentSequenceNumber,r));a.push(f)}return I.waitFor(a).next(()=>o.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,u,d)).next(()=>u)}).then(i=>(n.Ji=s,i))}function hI(t,e,n){let r=$(),s=$();return n.forEach(i=>r=r.add(i)),e.getEntries(t,r).next(i=>{let o=gt();return n.forEach((a,u)=>{const d=i.get(a);u.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(a)),u.isNoDocument()&&u.version.isEqual(M.min())?(e.removeEntry(a,u.readTime),o=o.insert(a,u)):!d.isValidDocument()||u.version.compareTo(d.version)>0||u.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(u),o=o.insert(a,u)):k("LocalStore","Ignoring outdated watch update for ",a,". Current version:",d.version," Watch version:",u.version)}),{nr:o,sr:s}})}function dI(t,e){const n=x(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function fI(t,e){const n=x(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return n.Bs.getTargetData(r,e).next(i=>i?(s=i,I.resolve(s)):n.Bs.allocateTargetId(r).next(o=>(s=new bt(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.Bs.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=n.Ji.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.Ji=n.Ji.insert(r.targetId,r),n.Yi.set(e,r.targetId)),r})}async function Bo(t,e,n){const r=x(t),s=r.Ji.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!qr(o))throw o;k("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.Ji=r.Ji.remove(e),r.Yi.delete(s.target)}function Qu(t,e,n){const r=x(t);let s=M.min(),i=$();return r.persistence.runTransaction("Execute query","readonly",o=>function(a,u,d){const f=x(a),g=f.Yi.get(d);return g!==void 0?I.resolve(f.Ji.get(g)):f.Bs.getTargetData(u,d)}(r,o,pt(e)).next(a=>{if(a)return s=a.lastLimboFreeSnapshotVersion,r.Bs.getMatchingKeysForTargetId(o,a.targetId).next(u=>{i=u})}).next(()=>r.Hi.getDocumentsMatchingQuery(o,e,n?s:M.min(),n?i:$())).next(a=>(pI(r,oE(e),a),{documents:a,ir:i})))}function pI(t,e,n){let r=t.Xi.get(e)||M.min();n.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),t.Xi.set(e,r)}class Yu{constructor(){this.activeTargetIds=dE()}lr(e){this.activeTargetIds=this.activeTargetIds.add(e)}dr(e){this.activeTargetIds=this.activeTargetIds.delete(e)}hr(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class gI{constructor(){this.Hr=new Yu,this.Jr={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e){return this.Hr.lr(e),this.Jr[e]||"not-current"}updateQueryState(e,n,r){this.Jr[e]=n}removeLocalQueryTarget(e){this.Hr.dr(e)}isLocalQueryTarget(e){return this.Hr.activeTargetIds.has(e)}clearQueryState(e){delete this.Jr[e]}getAllActiveQueryTargets(){return this.Hr.activeTargetIds}isActiveQueryTarget(e){return this.Hr.activeTargetIds.has(e)}start(){return this.Hr=new Yu,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mI{Yr(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xu{constructor(){this.Xr=()=>this.Zr(),this.eo=()=>this.no(),this.so=[],this.io()}Yr(e){this.so.push(e)}shutdown(){window.removeEventListener("online",this.Xr),window.removeEventListener("offline",this.eo)}io(){window.addEventListener("online",this.Xr),window.addEventListener("offline",this.eo)}Zr(){k("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.so)e(0)}no(){k("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.so)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let us=null;function Xi(){return us===null?us=268435456+Math.round(2147483648*Math.random()):us++,"0x"+us.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yI={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vI{constructor(e){this.ro=e.ro,this.oo=e.oo}uo(e){this.co=e}ao(e){this.ho=e}onMessage(e){this.lo=e}close(){this.oo()}send(e){this.ro(e)}fo(){this.co()}wo(e){this.ho(e)}_o(e){this.lo(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const we="WebChannelConnection";class wI extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http";this.mo=n+"://"+e.host,this.yo="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}get po(){return!1}Io(e,n,r,s,i){const o=Xi(),a=this.To(e,n);k("RestConnection",`Sending RPC '${e}' ${o}:`,a,r);const u={};return this.Eo(u,s,i),this.Ao(e,a,u,r).then(d=>(k("RestConnection",`Received RPC '${e}' ${o}: `,d),d),d=>{throw bn("RestConnection",`RPC '${e}' ${o} failed with error: `,d,"url: ",a,"request:",r),d})}vo(e,n,r,s,i,o){return this.Io(e,n,r,s,i)}Eo(e,n,r){e["X-Goog-Api-Client"]="gl-js/ fire/"+Bn,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}To(e,n){const r=yI[e];return`${this.mo}/v1/${n}:${r}`}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Ao(e,n,r,s){const i=Xi();return new Promise((o,a)=>{const u=new k0;u.setWithCredentials(!0),u.listenOnce(C0.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case Qi.NO_ERROR:const f=u.getResponseJson();k(we,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(f)),o(f);break;case Qi.TIMEOUT:k(we,`RPC '${e}' ${i} timed out`),a(new C(E.DEADLINE_EXCEEDED,"Request time out"));break;case Qi.HTTP_ERROR:const g=u.getStatus();if(k(we,`RPC '${e}' ${i} failed with status:`,g,"response text:",u.getResponseText()),g>0){let y=u.getResponseJson();Array.isArray(y)&&(y=y[0]);const v=y==null?void 0:y.error;if(v&&v.status&&v.message){const T=function(b){const R=b.toLowerCase().replace(/_/g,"-");return Object.values(E).indexOf(R)>=0?R:E.UNKNOWN}(v.status);a(new C(T,v.message))}else a(new C(E.UNKNOWN,"Server responded with status "+u.getStatus()))}else a(new C(E.UNAVAILABLE,"Connection failed."));break;default:L()}}finally{k(we,`RPC '${e}' ${i} completed.`)}});const d=JSON.stringify(s);k(we,`RPC '${e}' ${i} sending request:`,s),u.send(n,"POST",d,r,15)})}Ro(e,n,r){const s=Xi(),i=[this.mo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=S0(),a=A0(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(u.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(u.xmlHttpFactory=new R0({})),this.Eo(u.initMessageHeaders,n,r),u.encodeInitMessageHeaders=!0;const f=i.join("");k(we,`Creating RPC '${e}' stream ${s}: ${f}`,u);const g=o.createWebChannel(f,u);let y=!1,v=!1;const T=new vI({ro:R=>{v?k(we,`Not sending because RPC '${e}' stream ${s} is closed:`,R):(y||(k(we,`Opening RPC '${e}' stream ${s} transport.`),g.open(),y=!0),k(we,`RPC '${e}' stream ${s} sending:`,R),g.send(R))},oo:()=>g.close()}),b=(R,B,F)=>{R.listen(B,q=>{try{F(q)}catch(ne){setTimeout(()=>{throw ne},0)}})};return b(g,is.EventType.OPEN,()=>{v||k(we,`RPC '${e}' stream ${s} transport opened.`)}),b(g,is.EventType.CLOSE,()=>{v||(v=!0,k(we,`RPC '${e}' stream ${s} transport closed`),T.wo())}),b(g,is.EventType.ERROR,R=>{v||(v=!0,bn(we,`RPC '${e}' stream ${s} transport errored:`,R),T.wo(new C(E.UNAVAILABLE,"The operation could not be completed")))}),b(g,is.EventType.MESSAGE,R=>{var B;if(!v){const F=R.data[0];J(!!F);const q=F,ne=q.error||((B=q[0])===null||B===void 0?void 0:B.error);if(ne){k(we,`RPC '${e}' stream ${s} received error:`,ne);const ue=ne.status;let He=function(qn){const wt=se[qn];if(wt!==void 0)return Cf(wt)}(ue),vt=ne.message;He===void 0&&(He=E.INTERNAL,vt="Unknown error status: "+ue+" with message "+ne.message),v=!0,T.wo(new C(He,vt)),g.close()}else k(we,`RPC '${e}' stream ${s} received:`,F),T._o(F)}}),b(a,b0.STAT_EVENT,R=>{R.stat===Cu.PROXY?k(we,`RPC '${e}' stream ${s} detected buffering proxy`):R.stat===Cu.NOPROXY&&k(we,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{T.fo()},0),T}}function Ji(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ei(t){return new LE(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uf{constructor(e,n,r=1e3,s=1.5,i=6e4){this.ii=e,this.timerId=n,this.Po=r,this.bo=s,this.Vo=i,this.So=0,this.Do=null,this.Co=Date.now(),this.reset()}reset(){this.So=0}xo(){this.So=this.Vo}No(e){this.cancel();const n=Math.floor(this.So+this.ko()),r=Math.max(0,Date.now()-this.Co),s=Math.max(0,n-r);s>0&&k("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.So} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.Do=this.ii.enqueueAfterDelay(this.timerId,s,()=>(this.Co=Date.now(),e())),this.So*=this.bo,this.So<this.Po&&(this.So=this.Po),this.So>this.Vo&&(this.So=this.Vo)}Mo(){this.Do!==null&&(this.Do.skipDelay(),this.Do=null)}cancel(){this.Do!==null&&(this.Do.cancel(),this.Do=null)}ko(){return(Math.random()-.5)*this.So}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bf{constructor(e,n,r,s,i,o,a,u){this.ii=e,this.$o=r,this.Oo=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=u,this.state=0,this.Fo=0,this.Bo=null,this.Lo=null,this.stream=null,this.qo=new Uf(e,n)}Uo(){return this.state===1||this.state===5||this.Ko()}Ko(){return this.state===2||this.state===3}start(){this.state!==4?this.auth():this.Go()}async stop(){this.Uo()&&await this.close(0)}Qo(){this.state=0,this.qo.reset()}jo(){this.Ko()&&this.Bo===null&&(this.Bo=this.ii.enqueueAfterDelay(this.$o,6e4,()=>this.zo()))}Wo(e){this.Ho(),this.stream.send(e)}async zo(){if(this.Ko())return this.close(0)}Ho(){this.Bo&&(this.Bo.cancel(),this.Bo=null)}Jo(){this.Lo&&(this.Lo.cancel(),this.Lo=null)}async close(e,n){this.Ho(),this.Jo(),this.qo.cancel(),this.Fo++,e!==4?this.qo.reset():n&&n.code===E.RESOURCE_EXHAUSTED?(ft(n.toString()),ft("Using maximum backoff delay to prevent overloading the backend."),this.qo.xo()):n&&n.code===E.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.Yo(),this.stream.close(),this.stream=null),this.state=e,await this.listener.ao(n)}Yo(){}auth(){this.state=1;const e=this.Xo(this.Fo),n=this.Fo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.Fo===n&&this.Zo(r,s)},r=>{e(()=>{const s=new C(E.UNKNOWN,"Fetching auth token failed: "+r.message);return this.tu(s)})})}Zo(e,n){const r=this.Xo(this.Fo);this.stream=this.eu(e,n),this.stream.uo(()=>{r(()=>(this.state=2,this.Lo=this.ii.enqueueAfterDelay(this.Oo,1e4,()=>(this.Ko()&&(this.state=3),Promise.resolve())),this.listener.uo()))}),this.stream.ao(s=>{r(()=>this.tu(s))}),this.stream.onMessage(s=>{r(()=>this.onMessage(s))})}Go(){this.state=5,this.qo.No(async()=>{this.state=0,this.start()})}tu(e){return k("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}Xo(e){return n=>{this.ii.enqueueAndForget(()=>this.Fo===e?n():(k("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class EI extends Bf{constructor(e,n,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}eu(e,n){return this.connection.Ro("Listen",e,n)}onMessage(e){this.qo.reset();const n=ME(this.serializer,e),r=function(s){if(!("targetChange"in s))return M.min();const i=s.targetChange;return i.targetIds&&i.targetIds.length?M.min():i.readTime?tt(i.readTime):M.min()}(e);return this.listener.nu(n,r)}su(e){const n={};n.database=Uo(this.serializer),n.addTarget=function(s,i){let o;const a=i.target;if(o=Lo(a)?{documents:UE(s,a)}:{query:BE(s,a)},o.targetId=i.targetId,i.resumeToken.approximateByteSize()>0){o.resumeToken=kf(s,i.resumeToken);const u=Mo(s,i.expectedCount);u!==null&&(o.expectedCount=u)}else if(i.snapshotVersion.compareTo(M.min())>0){o.readTime=js(s,i.snapshotVersion.toTimestamp());const u=Mo(s,i.expectedCount);u!==null&&(o.expectedCount=u)}return o}(this.serializer,e);const r=$E(this.serializer,e);r&&(n.labels=r),this.Wo(n)}iu(e){const n={};n.database=Uo(this.serializer),n.removeTarget=e,this.Wo(n)}}class II extends Bf{constructor(e,n,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i,this.ru=!1}get ou(){return this.ru}start(){this.ru=!1,this.lastStreamToken=void 0,super.start()}Yo(){this.ru&&this.uu([])}eu(e,n){return this.connection.Ro("Write",e,n)}onMessage(e){if(J(!!e.streamToken),this.lastStreamToken=e.streamToken,this.ru){this.qo.reset();const n=xE(e.writeResults,e.commitTime),r=tt(e.commitTime);return this.listener.cu(r,n)}return J(!e.writeResults||e.writeResults.length===0),this.ru=!0,this.listener.au()}hu(){const e={};e.database=Uo(this.serializer),this.Wo(e)}uu(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>PE(this.serializer,r))};this.Wo(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _I extends class{}{constructor(e,n,r,s){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=s,this.lu=!1}fu(){if(this.lu)throw new C(E.FAILED_PRECONDITION,"The client has already been terminated.")}Io(e,n,r){return this.fu(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,i])=>this.connection.Io(e,n,r,s,i)).catch(s=>{throw s.name==="FirebaseError"?(s.code===E.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new C(E.UNKNOWN,s.toString())})}vo(e,n,r,s){return this.fu(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.vo(e,n,r,i,o,s)).catch(i=>{throw i.name==="FirebaseError"?(i.code===E.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new C(E.UNKNOWN,i.toString())})}terminate(){this.lu=!0}}class TI{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.wu=0,this._u=null,this.mu=!0}gu(){this.wu===0&&(this.yu("Unknown"),this._u=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._u=null,this.pu("Backend didn't respond within 10 seconds."),this.yu("Offline"),Promise.resolve())))}Iu(e){this.state==="Online"?this.yu("Unknown"):(this.wu++,this.wu>=1&&(this.Tu(),this.pu(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.yu("Offline")))}set(e){this.Tu(),this.wu=0,e==="Online"&&(this.mu=!1),this.yu(e)}yu(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}pu(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.mu?(ft(n),this.mu=!1):k("OnlineStateTracker",n)}Tu(){this._u!==null&&(this._u.cancel(),this._u=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SI{constructor(e,n,r,s,i){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.Eu=[],this.Au=new Map,this.vu=new Set,this.Ru=[],this.Pu=i,this.Pu.Yr(o=>{r.enqueueAndForget(async()=>{an(this)&&(k("RemoteStore","Restarting streams for network reachability change."),await async function(a){const u=x(a);u.vu.add(4),await Gr(u),u.bu.set("Unknown"),u.vu.delete(4),await Ii(u)}(this))})}),this.bu=new TI(r,s)}}async function Ii(t){if(an(t))for(const e of t.Ru)await e(!0)}async function Gr(t){for(const e of t.Ru)await e(!1)}function Ff(t,e){const n=x(t);n.Au.has(e.targetId)||(n.Au.set(e.targetId,e),Ga(n)?Ha(n):Vn(n).Ko()&&za(n,e))}function $f(t,e){const n=x(t),r=Vn(n);n.Au.delete(e),r.Ko()&&Vf(n,e),n.Au.size===0&&(r.Ko()?r.jo():an(n)&&n.bu.set("Unknown"))}function za(t,e){if(t.Vu.qt(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(M.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}Vn(t).su(e)}function Vf(t,e){t.Vu.qt(e),Vn(t).iu(e)}function Ha(t){t.Vu=new bE({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),le:e=>t.Au.get(e)||null,ue:()=>t.datastore.serializer.databaseId}),Vn(t).start(),t.bu.gu()}function Ga(t){return an(t)&&!Vn(t).Uo()&&t.Au.size>0}function an(t){return x(t).vu.size===0}function jf(t){t.Vu=void 0}async function AI(t){t.Au.forEach((e,n)=>{za(t,e)})}async function CI(t,e){jf(t),Ga(t)?(t.bu.Iu(e),Ha(t)):t.bu.set("Unknown")}async function bI(t,e,n){if(t.bu.set("Online"),e instanceof Rf&&e.state===2&&e.cause)try{await async function(r,s){const i=s.cause;for(const o of s.targetIds)r.Au.has(o)&&(await r.remoteSyncer.rejectListen(o,i),r.Au.delete(o),r.Vu.removeTarget(o))}(t,e)}catch(r){k("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await qs(t,r)}else if(e instanceof vs?t.Vu.Ht(e):e instanceof bf?t.Vu.ne(e):t.Vu.Xt(e),!n.isEqual(M.min()))try{const r=await xf(t.localStore);n.compareTo(r)>=0&&await function(s,i){const o=s.Vu.ce(i);return o.targetChanges.forEach((a,u)=>{if(a.resumeToken.approximateByteSize()>0){const d=s.Au.get(u);d&&s.Au.set(u,d.withResumeToken(a.resumeToken,i))}}),o.targetMismatches.forEach((a,u)=>{const d=s.Au.get(a);if(!d)return;s.Au.set(a,d.withResumeToken(be.EMPTY_BYTE_STRING,d.snapshotVersion)),Vf(s,a);const f=new bt(d.target,a,u,d.sequenceNumber);za(s,f)}),s.remoteSyncer.applyRemoteEvent(o)}(t,n)}catch(r){k("RemoteStore","Failed to raise snapshot:",r),await qs(t,r)}}async function qs(t,e,n){if(!qr(e))throw e;t.vu.add(1),await Gr(t),t.bu.set("Offline"),n||(n=()=>xf(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{k("RemoteStore","Retrying IndexedDB access"),await n(),t.vu.delete(1),await Ii(t)})}function qf(t,e){return e().catch(n=>qs(t,n,e))}async function _i(t){const e=x(t),n=Pt(e);let r=e.Eu.length>0?e.Eu[e.Eu.length-1].batchId:-1;for(;RI(e);)try{const s=await dI(e.localStore,r);if(s===null){e.Eu.length===0&&n.jo();break}r=s.batchId,kI(e,s)}catch(s){await qs(e,s)}zf(e)&&Hf(e)}function RI(t){return an(t)&&t.Eu.length<10}function kI(t,e){t.Eu.push(e);const n=Pt(t);n.Ko()&&n.ou&&n.uu(e.mutations)}function zf(t){return an(t)&&!Pt(t).Uo()&&t.Eu.length>0}function Hf(t){Pt(t).start()}async function NI(t){Pt(t).hu()}async function LI(t){const e=Pt(t);for(const n of t.Eu)e.uu(n.mutations)}async function OI(t,e,n){const r=t.Eu.shift(),s=Ua.from(r,e,n);await qf(t,()=>t.remoteSyncer.applySuccessfulWrite(s)),await _i(t)}async function DI(t,e){e&&Pt(t).ou&&await async function(n,r){if(s=r.code,SE(s)&&s!==E.ABORTED){const i=n.Eu.shift();Pt(n).Qo(),await qf(n,()=>n.remoteSyncer.rejectFailedWrite(i.batchId,r)),await _i(n)}var s}(t,e),zf(t)&&Hf(t)}async function Ju(t,e){const n=x(t);n.asyncQueue.verifyOperationInProgress(),k("RemoteStore","RemoteStore received new credentials");const r=an(n);n.vu.add(3),await Gr(n),r&&n.bu.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.vu.delete(3),await Ii(n)}async function MI(t,e){const n=x(t);e?(n.vu.delete(2),await Ii(n)):e||(n.vu.add(2),await Gr(n),n.bu.set("Unknown"))}function Vn(t){return t.Su||(t.Su=function(e,n,r){const s=x(e);return s.fu(),new EI(n,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,r)}(t.datastore,t.asyncQueue,{uo:AI.bind(null,t),ao:CI.bind(null,t),nu:bI.bind(null,t)}),t.Ru.push(async e=>{e?(t.Su.Qo(),Ga(t)?Ha(t):t.bu.set("Unknown")):(await t.Su.stop(),jf(t))})),t.Su}function Pt(t){return t.Du||(t.Du=function(e,n,r){const s=x(e);return s.fu(),new II(n,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,r)}(t.datastore,t.asyncQueue,{uo:NI.bind(null,t),ao:DI.bind(null,t),au:LI.bind(null,t),cu:OI.bind(null,t)}),t.Ru.push(async e=>{e?(t.Du.Qo(),await _i(t)):(await t.Du.stop(),t.Eu.length>0&&(k("RemoteStore",`Stopping write stream with ${t.Eu.length} pending writes`),t.Eu=[]))})),t.Du}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wa{constructor(e,n,r,s,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new lt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}static createAndSchedule(e,n,r,s,i){const o=Date.now()+r,a=new Wa(e,n,o,s,i);return a.start(r),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new C(E.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ka(t,e){if(ft("AsyncQueue",`${e}: ${t}`),qr(t))return new C(E.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _n{constructor(e){this.comparator=e?(n,r)=>e(n,r)||N.comparator(n.key,r.key):(n,r)=>N.comparator(n.key,r.key),this.keyedMap=Xn(),this.sortedSet=new ee(this.comparator)}static emptySet(e){return new _n(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof _n)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new _n;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zu{constructor(){this.Cu=new ee(N.comparator)}track(e){const n=e.doc.key,r=this.Cu.get(n);r?e.type!==0&&r.type===3?this.Cu=this.Cu.insert(n,e):e.type===3&&r.type!==1?this.Cu=this.Cu.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.Cu=this.Cu.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.Cu=this.Cu.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.Cu=this.Cu.remove(n):e.type===1&&r.type===2?this.Cu=this.Cu.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.Cu=this.Cu.insert(n,{type:2,doc:e.doc}):L():this.Cu=this.Cu.insert(n,e)}xu(){const e=[];return this.Cu.inorderTraversal((n,r)=>{e.push(r)}),e}}class On{constructor(e,n,r,s,i,o,a,u,d){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=u,this.hasCachedResults=d}static fromInitialDocuments(e,n,r,s,i){const o=[];return n.forEach(a=>{o.push({type:0,doc:a})}),new On(e,n,_n.emptySet(n),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&gi(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==r[s].type||!n[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PI{constructor(){this.Nu=void 0,this.listeners=[]}}class xI{constructor(){this.queries=new $n(e=>df(e),gi),this.onlineState="Unknown",this.ku=new Set}}async function Gf(t,e){const n=x(t),r=e.query;let s=!1,i=n.queries.get(r);if(i||(s=!0,i=new PI),s)try{i.Nu=await n.onListen(r)}catch(o){const a=Ka(o,`Initialization of query '${Do(e.query)}' failed`);return void e.onError(a)}n.queries.set(r,i),i.listeners.push(e),e.Mu(n.onlineState),i.Nu&&e.$u(i.Nu)&&Qa(n)}async function Wf(t,e){const n=x(t),r=e.query;let s=!1;const i=n.queries.get(r);if(i){const o=i.listeners.indexOf(e);o>=0&&(i.listeners.splice(o,1),s=i.listeners.length===0)}if(s)return n.queries.delete(r),n.onUnlisten(r)}function UI(t,e){const n=x(t);let r=!1;for(const s of e){const i=s.query,o=n.queries.get(i);if(o){for(const a of o.listeners)a.$u(s)&&(r=!0);o.Nu=s}}r&&Qa(n)}function BI(t,e,n){const r=x(t),s=r.queries.get(e);if(s)for(const i of s.listeners)i.onError(n);r.queries.delete(e)}function Qa(t){t.ku.forEach(e=>{e.next()})}class Kf{constructor(e,n,r){this.query=e,this.Ou=n,this.Fu=!1,this.Bu=null,this.onlineState="Unknown",this.options=r||{}}$u(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new On(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.Fu?this.Lu(e)&&(this.Ou.next(e),n=!0):this.qu(e,this.onlineState)&&(this.Uu(e),n=!0),this.Bu=e,n}onError(e){this.Ou.error(e)}Mu(e){this.onlineState=e;let n=!1;return this.Bu&&!this.Fu&&this.qu(this.Bu,e)&&(this.Uu(this.Bu),n=!0),n}qu(e,n){if(!e.fromCache)return!0;const r=n!=="Offline";return(!this.options.Ku||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}Lu(e){if(e.docChanges.length>0)return!0;const n=this.Bu&&this.Bu.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}Uu(e){e=On.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Fu=!0,this.Ou.next(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qf{constructor(e){this.key=e}}class Yf{constructor(e){this.key=e}}class FI{constructor(e,n){this.query=e,this.Yu=n,this.Xu=null,this.hasCachedResults=!1,this.current=!1,this.Zu=$(),this.mutatedKeys=$(),this.tc=ff(e),this.ec=new _n(this.tc)}get nc(){return this.Yu}sc(e,n){const r=n?n.ic:new Zu,s=n?n.ec:this.ec;let i=n?n.mutatedKeys:this.mutatedKeys,o=s,a=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((f,g)=>{const y=s.get(f),v=mi(this.query,g)?g:null,T=!!y&&this.mutatedKeys.has(y.key),b=!!v&&(v.hasLocalMutations||this.mutatedKeys.has(v.key)&&v.hasCommittedMutations);let R=!1;y&&v?y.data.isEqual(v.data)?T!==b&&(r.track({type:3,doc:v}),R=!0):this.rc(y,v)||(r.track({type:2,doc:v}),R=!0,(u&&this.tc(v,u)>0||d&&this.tc(v,d)<0)&&(a=!0)):!y&&v?(r.track({type:0,doc:v}),R=!0):y&&!v&&(r.track({type:1,doc:y}),R=!0,(u||d)&&(a=!0)),R&&(v?(o=o.add(v),i=b?i.add(f):i.delete(f)):(o=o.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{ec:o,ic:r,zi:a,mutatedKeys:i}}rc(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r){const s=this.ec;this.ec=e.ec,this.mutatedKeys=e.mutatedKeys;const i=e.ic.xu();i.sort((d,f)=>function(g,y){const v=T=>{switch(T){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return L()}};return v(g)-v(y)}(d.type,f.type)||this.tc(d.doc,f.doc)),this.oc(r);const o=n?this.uc():[],a=this.Zu.size===0&&this.current?1:0,u=a!==this.Xu;return this.Xu=a,i.length!==0||u?{snapshot:new On(this.query,e.ec,s,i,e.mutatedKeys,a===0,u,!1,!!r&&r.resumeToken.approximateByteSize()>0),cc:o}:{cc:o}}Mu(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({ec:this.ec,ic:new Zu,mutatedKeys:this.mutatedKeys,zi:!1},!1)):{cc:[]}}ac(e){return!this.Yu.has(e)&&!!this.ec.has(e)&&!this.ec.get(e).hasLocalMutations}oc(e){e&&(e.addedDocuments.forEach(n=>this.Yu=this.Yu.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Yu=this.Yu.delete(n)),this.current=e.current)}uc(){if(!this.current)return[];const e=this.Zu;this.Zu=$(),this.ec.forEach(r=>{this.ac(r.key)&&(this.Zu=this.Zu.add(r.key))});const n=[];return e.forEach(r=>{this.Zu.has(r)||n.push(new Yf(r))}),this.Zu.forEach(r=>{e.has(r)||n.push(new Qf(r))}),n}hc(e){this.Yu=e.ir,this.Zu=$();const n=this.sc(e.documents);return this.applyChanges(n,!0)}lc(){return On.fromInitialDocuments(this.query,this.ec,this.mutatedKeys,this.Xu===0,this.hasCachedResults)}}class $I{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class VI{constructor(e){this.key=e,this.fc=!1}}class jI{constructor(e,n,r,s,i,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.dc={},this.wc=new $n(a=>df(a),gi),this._c=new Map,this.mc=new Set,this.gc=new ee(N.comparator),this.yc=new Map,this.Ic=new Va,this.Tc={},this.Ec=new Map,this.Ac=Ln.Mn(),this.onlineState="Unknown",this.vc=void 0}get isPrimaryClient(){return this.vc===!0}}async function qI(t,e){const n=ZI(t);let r,s;const i=n.wc.get(e);if(i)r=i.targetId,n.sharedClientState.addLocalQueryTarget(r),s=i.view.lc();else{const o=await fI(n.localStore,pt(e)),a=n.sharedClientState.addLocalQueryTarget(o.targetId);r=o.targetId,s=await zI(n,e,r,a==="current",o.resumeToken),n.isPrimaryClient&&Ff(n.remoteStore,o)}return s}async function zI(t,e,n,r,s){t.Rc=(g,y,v)=>async function(T,b,R,B){let F=b.view.sc(R);F.zi&&(F=await Qu(T.localStore,b.query,!1).then(({documents:ue})=>b.view.sc(ue,F)));const q=B&&B.targetChanges.get(b.targetId),ne=b.view.applyChanges(F,T.isPrimaryClient,q);return tl(T,b.targetId,ne.cc),ne.snapshot}(t,g,y,v);const i=await Qu(t.localStore,e,!0),o=new FI(e,i.ir),a=o.sc(i.documents),u=Hr.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",s),d=o.applyChanges(a,t.isPrimaryClient,u);tl(t,n,d.cc);const f=new $I(e,n,o);return t.wc.set(e,f),t._c.has(n)?t._c.get(n).push(e):t._c.set(n,[e]),d.snapshot}async function HI(t,e){const n=x(t),r=n.wc.get(e),s=n._c.get(r.targetId);if(s.length>1)return n._c.set(r.targetId,s.filter(i=>!gi(i,e))),void n.wc.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(r.targetId),n.sharedClientState.isActiveQueryTarget(r.targetId)||await Bo(n.localStore,r.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(r.targetId),$f(n.remoteStore,r.targetId),Fo(n,r.targetId)}).catch(jr)):(Fo(n,r.targetId),await Bo(n.localStore,r.targetId,!0))}async function GI(t,e,n){const r=e_(t);try{const s=await function(i,o){const a=x(i),u=ae.now(),d=o.reduce((y,v)=>y.add(v.key),$());let f,g;return a.persistence.runTransaction("Locally write mutations","readwrite",y=>{let v=gt(),T=$();return a.Zi.getEntries(y,d).next(b=>{v=b,v.forEach((R,B)=>{B.isValidDocument()||(T=T.add(R))})}).next(()=>a.localDocuments.getOverlayedDocuments(y,v)).next(b=>{f=b;const R=[];for(const B of o){const F=wE(B,f.get(B.key).overlayedDocument);F!=null&&R.push(new Bt(B.key,F,rf(F.value.mapValue),et.exists(!0)))}return a.mutationQueue.addMutationBatch(y,u,R,o)}).next(b=>{g=b;const R=b.applyToLocalDocumentSet(f,T);return a.documentOverlayCache.saveOverlays(y,b.batchId,R)})}).then(()=>({batchId:g.batchId,changes:gf(f)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(i,o,a){let u=i.Tc[i.currentUser.toKey()];u||(u=new ee(z)),u=u.insert(o,a),i.Tc[i.currentUser.toKey()]=u}(r,s.batchId,n),await Wr(r,s.changes),await _i(r.remoteStore)}catch(s){const i=Ka(s,"Failed to persist write");n.reject(i)}}async function Xf(t,e){const n=x(t);try{const r=await lI(n.localStore,e);e.targetChanges.forEach((s,i)=>{const o=n.yc.get(i);o&&(J(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.fc=!0:s.modifiedDocuments.size>0?J(o.fc):s.removedDocuments.size>0&&(J(o.fc),o.fc=!1))}),await Wr(n,r,e)}catch(r){await jr(r)}}function el(t,e,n){const r=x(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const s=[];r.wc.forEach((i,o)=>{const a=o.view.Mu(e);a.snapshot&&s.push(a.snapshot)}),function(i,o){const a=x(i);a.onlineState=o;let u=!1;a.queries.forEach((d,f)=>{for(const g of f.listeners)g.Mu(o)&&(u=!0)}),u&&Qa(a)}(r.eventManager,e),s.length&&r.dc.nu(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function WI(t,e,n){const r=x(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.yc.get(e),i=s&&s.key;if(i){let o=new ee(N.comparator);o=o.insert(i,Ie.newNoDocument(i,M.min()));const a=$().add(i),u=new wi(M.min(),new Map,new ee(z),o,a);await Xf(r,u),r.gc=r.gc.remove(i),r.yc.delete(e),Ya(r)}else await Bo(r.localStore,e,!1).then(()=>Fo(r,e,n)).catch(jr)}async function KI(t,e){const n=x(t),r=e.batch.batchId;try{const s=await uI(n.localStore,e);Zf(n,r,null),Jf(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Wr(n,s)}catch(s){await jr(s)}}async function QI(t,e,n){const r=x(t);try{const s=await function(i,o){const a=x(i);return a.persistence.runTransaction("Reject batch","readwrite-primary",u=>{let d;return a.mutationQueue.lookupMutationBatch(u,o).next(f=>(J(f!==null),d=f.keys(),a.mutationQueue.removeMutationBatch(u,f))).next(()=>a.mutationQueue.performConsistencyCheck(u)).next(()=>a.documentOverlayCache.removeOverlaysForBatchId(u,d,o)).next(()=>a.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(u,d)).next(()=>a.localDocuments.getDocuments(u,d))})}(r.localStore,e);Zf(r,e,n),Jf(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Wr(r,s)}catch(s){await jr(s)}}function Jf(t,e){(t.Ec.get(e)||[]).forEach(n=>{n.resolve()}),t.Ec.delete(e)}function Zf(t,e,n){const r=x(t);let s=r.Tc[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(n?i.reject(n):i.resolve(),s=s.remove(e)),r.Tc[r.currentUser.toKey()]=s}}function Fo(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t._c.get(e))t.wc.delete(r),n&&t.dc.Pc(r,n);t._c.delete(e),t.isPrimaryClient&&t.Ic.Is(e).forEach(r=>{t.Ic.containsKey(r)||ep(t,r)})}function ep(t,e){t.mc.delete(e.path.canonicalString());const n=t.gc.get(e);n!==null&&($f(t.remoteStore,n),t.gc=t.gc.remove(e),t.yc.delete(n),Ya(t))}function tl(t,e,n){for(const r of n)r instanceof Qf?(t.Ic.addReference(r.key,e),YI(t,r)):r instanceof Yf?(k("SyncEngine","Document no longer in limbo: "+r.key),t.Ic.removeReference(r.key,e),t.Ic.containsKey(r.key)||ep(t,r.key)):L()}function YI(t,e){const n=e.key,r=n.path.canonicalString();t.gc.get(n)||t.mc.has(r)||(k("SyncEngine","New document in limbo: "+n),t.mc.add(r),Ya(t))}function Ya(t){for(;t.mc.size>0&&t.gc.size<t.maxConcurrentLimboResolutions;){const e=t.mc.values().next().value;t.mc.delete(e);const n=new N(Y.fromString(e)),r=t.Ac.next();t.yc.set(r,new VI(n)),t.gc=t.gc.insert(n,r),Ff(t.remoteStore,new bt(pt(Pa(n.path)),r,"TargetPurposeLimboResolution",ka.ct))}}async function Wr(t,e,n){const r=x(t),s=[],i=[],o=[];r.wc.isEmpty()||(r.wc.forEach((a,u)=>{o.push(r.Rc(u,e,n).then(d=>{if((d||n)&&r.isPrimaryClient&&r.sharedClientState.updateQueryState(u.targetId,d!=null&&d.fromCache?"not-current":"current"),d){s.push(d);const f=qa.Li(u.targetId,d);i.push(f)}}))}),await Promise.all(o),r.dc.nu(s),await async function(a,u){const d=x(a);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",f=>I.forEach(u,g=>I.forEach(g.Fi,y=>d.persistence.referenceDelegate.addReference(f,g.targetId,y)).next(()=>I.forEach(g.Bi,y=>d.persistence.referenceDelegate.removeReference(f,g.targetId,y)))))}catch(f){if(!qr(f))throw f;k("LocalStore","Failed to update sequence numbers: "+f)}for(const f of u){const g=f.targetId;if(!f.fromCache){const y=d.Ji.get(g),v=y.snapshotVersion,T=y.withLastLimboFreeSnapshotVersion(v);d.Ji=d.Ji.insert(g,T)}}}(r.localStore,i))}async function XI(t,e){const n=x(t);if(!n.currentUser.isEqual(e)){k("SyncEngine","User change. New user:",e.toKey());const r=await Pf(n.localStore,e);n.currentUser=e,function(s,i){s.Ec.forEach(o=>{o.forEach(a=>{a.reject(new C(E.CANCELLED,i))})}),s.Ec.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Wr(n,r.er)}}function JI(t,e){const n=x(t),r=n.yc.get(e);if(r&&r.fc)return $().add(r.key);{let s=$();const i=n._c.get(e);if(!i)return s;for(const o of i){const a=n.wc.get(o);s=s.unionWith(a.view.nc)}return s}}function ZI(t){const e=x(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=Xf.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=JI.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=WI.bind(null,e),e.dc.nu=UI.bind(null,e.eventManager),e.dc.Pc=BI.bind(null,e.eventManager),e}function e_(t){const e=x(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=KI.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=QI.bind(null,e),e}class nl{constructor(){this.synchronizeTabs=!1}async initialize(e){this.serializer=Ei(e.databaseInfo.databaseId),this.sharedClientState=this.createSharedClientState(e),this.persistence=this.createPersistence(e),await this.persistence.start(),this.localStore=this.createLocalStore(e),this.gcScheduler=this.createGarbageCollectionScheduler(e,this.localStore),this.indexBackfillerScheduler=this.createIndexBackfillerScheduler(e,this.localStore)}createGarbageCollectionScheduler(e,n){return null}createIndexBackfillerScheduler(e,n){return null}createLocalStore(e){return cI(this.persistence,new oI,e.initialUser,this.serializer)}createPersistence(e){return new sI(ja.zs,this.serializer)}createSharedClientState(e){return new gI}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class t_{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>el(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=XI.bind(null,this.syncEngine),await MI(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new xI}createDatastore(e){const n=Ei(e.databaseInfo.databaseId),r=(s=e.databaseInfo,new wI(s));var s;return function(i,o,a,u){return new _I(i,o,a,u)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return n=this.localStore,r=this.datastore,s=e.asyncQueue,i=a=>el(this.syncEngine,a,0),o=Xu.D()?new Xu:new mI,new SI(n,r,s,i,o);var n,r,s,i,o}createSyncEngine(e,n){return function(r,s,i,o,a,u,d){const f=new jI(r,s,i,o,a,u);return d&&(f.vc=!0),f}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}terminate(){return async function(e){const n=x(e);k("RemoteStore","RemoteStore shutting down."),n.vu.add(5),await Gr(n),n.Pu.shutdown(),n.bu.set("Unknown")}(this.remoteStore)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tp{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.Sc(this.observer.next,e)}error(e){this.observer.error?this.Sc(this.observer.error,e):ft("Uncaught Error in snapshot listener:",e.toString())}Dc(){this.muted=!0}Sc(e,n){this.muted||setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n_{constructor(e,n,r,s){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=s,this.user=Ee.UNAUTHENTICATED,this.clientId=ef.A(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(r,async i=>{k("FirestoreClient","Received user=",i.uid),await this.authCredentialListener(i),this.user=i}),this.appCheckCredentials.start(r,i=>(k("FirestoreClient","Received new app check token=",i),this.appCheckCredentialListener(i,this.user)))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new C(E.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const e=new lt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=Ka(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Zi(t,e){t.asyncQueue.verifyOperationInProgress(),k("FirestoreClient","Initializing OfflineComponentProvider");const n=await t.getConfiguration();await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async s=>{r.isEqual(s)||(await Pf(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function rl(t,e){t.asyncQueue.verifyOperationInProgress();const n=await s_(t);k("FirestoreClient","Initializing OnlineComponentProvider");const r=await t.getConfiguration();await e.initialize(n,r),t.setCredentialChangeListener(s=>Ju(e.remoteStore,s)),t.setAppCheckTokenChangeListener((s,i)=>Ju(e.remoteStore,i)),t._onlineComponents=e}function r_(t){return t.name==="FirebaseError"?t.code===E.FAILED_PRECONDITION||t.code===E.UNIMPLEMENTED:!(typeof DOMException<"u"&&t instanceof DOMException)||t.code===22||t.code===20||t.code===11}async function s_(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){k("FirestoreClient","Using user provided OfflineComponentProvider");try{await Zi(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!r_(n))throw n;bn("Error using user provided cache. Falling back to memory cache: "+n),await Zi(t,new nl)}}else k("FirestoreClient","Using default OfflineComponentProvider"),await Zi(t,new nl);return t._offlineComponents}async function np(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(k("FirestoreClient","Using user provided OnlineComponentProvider"),await rl(t,t._uninitializedComponentsProvider._online)):(k("FirestoreClient","Using default OnlineComponentProvider"),await rl(t,new t_))),t._onlineComponents}function i_(t){return np(t).then(e=>e.syncEngine)}async function rp(t){const e=await np(t),n=e.eventManager;return n.onListen=qI.bind(null,e.syncEngine),n.onUnlisten=HI.bind(null,e.syncEngine),n}function o_(t,e,n={}){const r=new lt;return t.asyncQueue.enqueueAndForget(async()=>function(s,i,o,a,u){const d=new tp({next:g=>{i.enqueueAndForget(()=>Wf(s,f));const y=g.docs.has(o);!y&&g.fromCache?u.reject(new C(E.UNAVAILABLE,"Failed to get document because the client is offline.")):y&&g.fromCache&&a&&a.source==="server"?u.reject(new C(E.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):u.resolve(g)},error:g=>u.reject(g)}),f=new Kf(Pa(o.path),d,{includeMetadataChanges:!0,Ku:!0});return Gf(s,f)}(await rp(t),t.asyncQueue,e,n,r)),r.promise}function a_(t,e,n={}){const r=new lt;return t.asyncQueue.enqueueAndForget(async()=>function(s,i,o,a,u){const d=new tp({next:g=>{i.enqueueAndForget(()=>Wf(s,f)),g.fromCache&&a.source==="server"?u.reject(new C(E.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):u.resolve(g)},error:g=>u.reject(g)}),f=new Kf(o,d,{includeMetadataChanges:!0,Ku:!0});return Gf(s,f)}(await rp(t),t.asyncQueue,e,n,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sp(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sl=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ip(t,e,n){if(!n)throw new C(E.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function c_(t,e,n,r){if(e===!0&&r===!0)throw new C(E.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function il(t){if(!N.isDocumentKey(t))throw new C(E.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function ol(t){if(N.isDocumentKey(t))throw new C(E.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function Ti(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(n){return n.constructor?n.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":L()}function mt(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new C(E.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Ti(t);throw new C(E.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}function u_(t,e){if(e<=0)throw new C(E.INVALID_ARGUMENT,`Function ${t}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class al{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new C(E.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.cache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new C(E.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}c_("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=sp((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new C(E.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new C(E.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new C(E.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(n=this.experimentalLongPollingOptions,r=e.experimentalLongPollingOptions,n.timeoutSeconds===r.timeoutSeconds)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams;var n,r}}class Si{constructor(e,n,r,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new al({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new C(E.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(e){if(this._settingsFrozen)throw new C(E.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new al(e),e.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new L0;switch(n.type){case"firstParty":return new P0(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new C(E.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const n=sl.get(e);n&&(k("ComponentProvider","Removing Datastore"),sl.delete(e),n.terminate())}(this),Promise.resolve()}}function l_(t,e,n,r={}){var s;const i=(t=mt(t,Si))._getSettings(),o=`${e}:${n}`;if(i.host!=="firestore.googleapis.com"&&i.host!==o&&bn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},i),{host:o,ssl:!1})),r.mockUserToken){let a,u;if(typeof r.mockUserToken=="string")a=r.mockUserToken,u=Ee.MOCK_USER;else{a=tm(r.mockUserToken,(s=t._app)===null||s===void 0?void 0:s.options.projectId);const d=r.mockUserToken.sub||r.mockUserToken.user_id;if(!d)throw new C(E.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");u=new Ee(d)}t._authCredentials=new O0(new Zd(a,u))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Lt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Oe(this.firestore,e,this._key)}}class Ft{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Ft(this.firestore,e,this._query)}}class Lt extends Ft{constructor(e,n,r){super(e,n,Pa(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Oe(this.firestore,null,new N(e))}withConverter(e){return new Lt(this.firestore,e,this._path)}}function h_(t,e,...n){if(t=De(t),ip("collection","path",e),t instanceof Si){const r=Y.fromString(e,...n);return ol(r),new Lt(t,null,r)}{if(!(t instanceof Oe||t instanceof Lt))throw new C(E.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Y.fromString(e,...n));return ol(r),new Lt(t.firestore,null,r)}}function d_(t,e,...n){if(t=De(t),arguments.length===1&&(e=ef.A()),ip("doc","path",e),t instanceof Si){const r=Y.fromString(e,...n);return il(r),new Oe(t,null,new N(r))}{if(!(t instanceof Oe||t instanceof Lt))throw new C(E.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Y.fromString(e,...n));return il(r),new Oe(t.firestore,t instanceof Lt?t.converter:null,new N(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class f_{constructor(){this.Gc=Promise.resolve(),this.Qc=[],this.jc=!1,this.zc=[],this.Wc=null,this.Hc=!1,this.Jc=!1,this.Yc=[],this.qo=new Uf(this,"async_queue_retry"),this.Xc=()=>{const n=Ji();n&&k("AsyncQueue","Visibility state changed to "+n.visibilityState),this.qo.Mo()};const e=Ji();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.Xc)}get isShuttingDown(){return this.jc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Zc(),this.ta(e)}enterRestrictedMode(e){if(!this.jc){this.jc=!0,this.Jc=e||!1;const n=Ji();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Xc)}}enqueue(e){if(this.Zc(),this.jc)return new Promise(()=>{});const n=new lt;return this.ta(()=>this.jc&&this.Jc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Qc.push(e),this.ea()))}async ea(){if(this.Qc.length!==0){try{await this.Qc[0](),this.Qc.shift(),this.qo.reset()}catch(e){if(!qr(e))throw e;k("AsyncQueue","Operation failed with retryable error: "+e)}this.Qc.length>0&&this.qo.No(()=>this.ea())}}ta(e){const n=this.Gc.then(()=>(this.Hc=!0,e().catch(r=>{this.Wc=r,this.Hc=!1;const s=function(i){let o=i.message||"";return i.stack&&(o=i.stack.includes(i.message)?i.stack:i.message+`
`+i.stack),o}(r);throw ft("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.Hc=!1,r))));return this.Gc=n,n}enqueueAfterDelay(e,n,r){this.Zc(),this.Yc.indexOf(e)>-1&&(n=0);const s=Wa.createAndSchedule(this,e,n,r,i=>this.na(i));return this.zc.push(s),s}Zc(){this.Wc&&L()}verifyOperationInProgress(){}async sa(){let e;do e=this.Gc,await e;while(e!==this.Gc)}ia(e){for(const n of this.zc)if(n.timerId===e)return!0;return!1}ra(e){return this.sa().then(()=>{this.zc.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.zc)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.sa()})}oa(e){this.Yc.push(e)}na(e){const n=this.zc.indexOf(e);this.zc.splice(n,1)}}class Kr extends Si{constructor(e,n,r,s){super(e,n,r,s),this.type="firestore",this._queue=new f_,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||op(this),this._firestoreClient.terminate()}}function p_(t,e){const n=typeof t=="object"?t:ph(),r=typeof t=="string"?t:e||"(default)",s=Yo(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Zg("firestore");i&&l_(s,...i)}return s}function Xa(t){return t._firestoreClient||op(t),t._firestoreClient.verifyNotTerminated(),t._firestoreClient}function op(t){var e,n,r;const s=t._freezeSettings(),i=function(o,a,u,d){return new W0(o,a,u,d.host,d.ssl,d.experimentalForceLongPolling,d.experimentalAutoDetectLongPolling,sp(d.experimentalLongPollingOptions),d.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,s);t._firestoreClient=new n_(t._authCredentials,t._appCheckCredentials,t._queue,i),((n=s.cache)===null||n===void 0?void 0:n._offlineComponentProvider)&&((r=s.cache)===null||r===void 0?void 0:r._onlineComponentProvider)&&(t._firestoreClient._uninitializedComponentsProvider={_offlineKind:s.cache.kind,_offline:s.cache._offlineComponentProvider,_online:s.cache._onlineComponentProvider})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dn{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Dn(be.fromBase64String(e))}catch(n){throw new C(E.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new Dn(be.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ai{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new C(E.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new _e(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ja{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Za{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new C(E.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new C(E.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return z(this._lat,e._lat)||z(this._long,e._long)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const g_=/^__.*__$/;class m_{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new Bt(e,this.data,this.fieldMask,n,this.fieldTransforms):new zr(e,this.data,n,this.fieldTransforms)}}class ap{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return new Bt(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function cp(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw L()}}class ec{constructor(e,n,r,s,i,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.ua(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get ca(){return this.settings.ca}aa(e){return new ec(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}ha(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.aa({path:r,la:!1});return s.fa(e),s}da(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.aa({path:r,la:!1});return s.ua(),s}wa(e){return this.aa({path:void 0,la:!0})}_a(e){return zs(e,this.settings.methodName,this.settings.ma||!1,this.path,this.settings.ga)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}ua(){if(this.path)for(let e=0;e<this.path.length;e++)this.fa(this.path.get(e))}fa(e){if(e.length===0)throw this._a("Document fields must not be empty");if(cp(this.ca)&&g_.test(e))throw this._a('Document fields cannot begin and end with "__"')}}class y_{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||Ei(e)}ya(e,n,r,s=!1){return new ec({ca:e,methodName:n,ga:r,path:_e.emptyPath(),la:!1,ma:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function tc(t){const e=t._freezeSettings(),n=Ei(t._databaseId);return new y_(t._databaseId,!!e.ignoreUndefinedProperties,n)}function v_(t,e,n,r,s,i={}){const o=t.ya(i.merge||i.mergeFields?2:0,e,n,s);nc("Data must be an object, but it was:",o,r);const a=up(r,o);let u,d;if(i.merge)u=new Be(o.fieldMask),d=o.fieldTransforms;else if(i.mergeFields){const f=[];for(const g of i.mergeFields){const y=$o(e,g,n);if(!o.contains(y))throw new C(E.INVALID_ARGUMENT,`Field '${y}' is specified in your field mask but missing from your input data.`);hp(f,y)||f.push(y)}u=new Be(f),d=o.fieldTransforms.filter(g=>u.covers(g.field))}else u=null,d=o.fieldTransforms;return new m_(new xe(a),u,d)}class Ci extends Ja{_toFieldTransform(e){if(e.ca!==2)throw e.ca===1?e._a(`${this._methodName}() can only appear at the top level of your update data`):e._a(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Ci}}function w_(t,e,n,r){const s=t.ya(1,e,n);nc("Data must be an object, but it was:",s,r);const i=[],o=xe.empty();on(r,(u,d)=>{const f=rc(e,u,n);d=De(d);const g=s.da(f);if(d instanceof Ci)i.push(f);else{const y=Qr(d,g);y!=null&&(i.push(f),o.set(f,y))}});const a=new Be(i);return new ap(o,a,s.fieldTransforms)}function E_(t,e,n,r,s,i){const o=t.ya(1,e,n),a=[$o(e,r,n)],u=[s];if(i.length%2!=0)throw new C(E.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let y=0;y<i.length;y+=2)a.push($o(e,i[y])),u.push(i[y+1]);const d=[],f=xe.empty();for(let y=a.length-1;y>=0;--y)if(!hp(d,a[y])){const v=a[y];let T=u[y];T=De(T);const b=o.da(v);if(T instanceof Ci)d.push(v);else{const R=Qr(T,b);R!=null&&(d.push(v),f.set(v,R))}}const g=new Be(d);return new ap(f,g,o.fieldTransforms)}function I_(t,e,n,r=!1){return Qr(n,t.ya(r?4:3,e))}function Qr(t,e){if(lp(t=De(t)))return nc("Unsupported field value:",e,t),up(t,e);if(t instanceof Ja)return function(n,r){if(!cp(r.ca))throw r._a(`${n._methodName}() can only be used with update() and set()`);if(!r.path)throw r._a(`${n._methodName}() is not currently supported inside arrays`);const s=n._toFieldTransform(r);s&&r.fieldTransforms.push(s)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.la&&e.ca!==4)throw e._a("Nested arrays are not supported");return function(n,r){const s=[];let i=0;for(const o of n){let a=Qr(o,r.wa(i));a==null&&(a={nullValue:"NULL_VALUE"}),s.push(a),i++}return{arrayValue:{values:s}}}(t,e)}return function(n,r){if((n=De(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return fE(r.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const s=ae.fromDate(n);return{timestampValue:js(r.serializer,s)}}if(n instanceof ae){const s=new ae(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:js(r.serializer,s)}}if(n instanceof Za)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof Dn)return{bytesValue:kf(r.serializer,n._byteString)};if(n instanceof Oe){const s=r.databaseId,i=n.firestore._databaseId;if(!i.isEqual(s))throw r._a(`Document reference is for database ${i.projectId}/${i.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:$a(n.firestore._databaseId||r.databaseId,n._key.path)}}throw r._a(`Unsupported field value: ${Ti(n)}`)}(t,e)}function up(t,e){const n={};return tf(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):on(t,(r,s)=>{const i=Qr(s,e.ha(r));i!=null&&(n[r]=i)}),{mapValue:{fields:n}}}function lp(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof ae||t instanceof Za||t instanceof Dn||t instanceof Oe||t instanceof Ja)}function nc(t,e,n){if(!lp(n)||!function(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}(n)){const r=Ti(n);throw r==="an object"?e._a(t+" a custom object"):e._a(t+" "+r)}}function $o(t,e,n){if((e=De(e))instanceof Ai)return e._internalPath;if(typeof e=="string")return rc(t,e);throw zs("Field path arguments must be of type string or ",t,!1,void 0,n)}const __=new RegExp("[~\\*/\\[\\]]");function rc(t,e,n){if(e.search(__)>=0)throw zs(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new Ai(...e.split("."))._internalPath}catch{throw zs(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function zs(t,e,n,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${r}`),o&&(u+=` in document ${s}`),u+=")"),new C(E.INVALID_ARGUMENT,a+t+u)}function hp(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dp{constructor(e,n,r,s,i){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Oe(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new T_(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(sc("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class T_ extends dp{data(){return super.data()}}function sc(t,e){return typeof e=="string"?rc(t,e):e instanceof Ai?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function S_(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new C(E.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class ic{}class oc extends ic{}function A_(t,e,...n){let r=[];e instanceof ic&&r.push(e),r=r.concat(n),function(s){const i=s.filter(a=>a instanceof cc).length,o=s.filter(a=>a instanceof ac).length;if(i>1||i>0&&o>0)throw new C(E.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)t=s._apply(t);return t}class ac extends oc{constructor(e,n,r){super(),this._field=e,this._op=n,this._value=r,this.type="where"}static _create(e,n,r){return new ac(e,n,r)}_apply(e){const n=this._parse(e);return fp(e._query,n),new Ft(e.firestore,e.converter,Oo(e._query,n))}_parse(e){const n=tc(e.firestore);return function(s,i,o,a,u,d,f){let g;if(u.isKeyField()){if(d==="array-contains"||d==="array-contains-any")throw new C(E.INVALID_ARGUMENT,`Invalid Query. You can't perform '${d}' queries on documentId().`);if(d==="in"||d==="not-in"){ul(f,d);const y=[];for(const v of f)y.push(cl(a,s,v));g={arrayValue:{values:y}}}else g=cl(a,s,f)}else d!=="in"&&d!=="not-in"&&d!=="array-contains-any"||ul(f,d),g=I_(o,i,f,d==="in"||d==="not-in");return oe.create(u,d,g)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}class cc extends ic{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new cc(e,n)}_parse(e){const n=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return n.length===1?n[0]:ze.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:(function(r,s){let i=r;const o=s.getFlattenedFilters();for(const a of o)fp(i,a),i=Oo(i,a)}(e._query,n),new Ft(e.firestore,e.converter,Oo(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class uc extends oc{constructor(e,n){super(),this._field=e,this._direction=n,this.type="orderBy"}static _create(e,n){return new uc(e,n)}_apply(e){const n=function(r,s,i){if(r.startAt!==null)throw new C(E.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(r.endAt!==null)throw new C(E.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");const o=new En(s,i);return function(a,u){if(xa(a)===null){const d=pi(a);d!==null&&pp(a,d,u.field)}}(r,o),o}(e._query,this._field,this._direction);return new Ft(e.firestore,e.converter,function(r,s){const i=r.explicitOrderBy.concat([s]);return new Fn(r.path,r.collectionGroup,i,r.filters.slice(),r.limit,r.limitType,r.startAt,r.endAt)}(e._query,n))}}function C_(t,e="asc"){const n=e,r=sc("orderBy",t);return uc._create(r,n)}class lc extends oc{constructor(e,n,r){super(),this.type=e,this._limit=n,this._limitType=r}static _create(e,n,r){return new lc(e,n,r)}_apply(e){return new Ft(e.firestore,e.converter,Fs(e._query,this._limit,this._limitType))}}function b_(t){return u_("limit",t),lc._create("limit",t,"F")}function cl(t,e,n){if(typeof(n=De(n))=="string"){if(n==="")throw new C(E.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!hf(e)&&n.indexOf("/")!==-1)throw new C(E.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(Y.fromString(n));if(!N.isDocumentKey(r))throw new C(E.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Ou(t,new N(r))}if(n instanceof Oe)return Ou(t,n._key);throw new C(E.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Ti(n)}.`)}function ul(t,e){if(!Array.isArray(t)||t.length===0)throw new C(E.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function fp(t,e){if(e.isInequality()){const r=pi(t),s=e.field;if(r!==null&&!r.isEqual(s))throw new C(E.INVALID_ARGUMENT,`Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${r.toString()}' and '${s.toString()}'`);const i=xa(t);i!==null&&pp(t,s,i)}const n=function(r,s){for(const i of r)for(const o of i.getFlattenedFilters())if(s.indexOf(o.op)>=0)return o.op;return null}(t.filters,function(r){switch(r){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new C(E.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new C(E.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}function pp(t,e,n){if(!n.isEqual(e))throw new C(E.INVALID_ARGUMENT,`Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${e.toString()}' and so you must also use '${e.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${n.toString()}' instead.`)}class R_{convertValue(e,n="none"){switch(nn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ie(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(tn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 10:return this.convertObject(e.mapValue,n);default:throw L()}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return on(e,(s,i)=>{r[s]=this.convertValue(i,n)}),r}convertGeoPoint(e){return new Za(ie(e.latitude),ie(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=La(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(vr(e));default:return null}}convertTimestamp(e){const n=Mt(e);return new ae(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=Y.fromString(e);J(Mf(r));const s=new wr(r.get(1),r.get(3)),i=new N(r.popFirst(5));return s.isEqual(n)||ft(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k_(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zn{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class gp extends dp{constructor(e,n,r,s,i,o){super(e,n,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new ws(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(sc("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class ws extends gp{data(e={}){return super.data(e)}}class N_{constructor(e,n,r,s){this._firestore=e,this._userDataWriter=n,this._snapshot=s,this.metadata=new Zn(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new ws(this._firestore,this._userDataWriter,r.key,r,new Zn(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new C(E.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(r,s){if(r._snapshot.oldDocs.isEmpty()){let i=0;return r._snapshot.docChanges.map(o=>{const a=new ws(r._firestore,r._userDataWriter,o.doc.key,o.doc,new Zn(r._snapshot.mutatedKeys.has(o.doc.key),r._snapshot.fromCache),r.query.converter);return o.doc,{type:"added",doc:a,oldIndex:-1,newIndex:i++}})}{let i=r._snapshot.oldDocs;return r._snapshot.docChanges.filter(o=>s||o.type!==3).map(o=>{const a=new ws(r._firestore,r._userDataWriter,o.doc.key,o.doc,new Zn(r._snapshot.mutatedKeys.has(o.doc.key),r._snapshot.fromCache),r.query.converter);let u=-1,d=-1;return o.type!==0&&(u=i.indexOf(o.doc.key),i=i.delete(o.doc.key)),o.type!==1&&(i=i.add(o.doc),d=i.indexOf(o.doc.key)),{type:L_(o.type),doc:a,oldIndex:u,newIndex:d}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function L_(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return L()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function O_(t){t=mt(t,Oe);const e=mt(t.firestore,Kr);return o_(Xa(e),t._key).then(n=>x_(e,t,n))}class mp extends R_{constructor(e){super(),this.firestore=e}convertBytes(e){return new Dn(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new Oe(this.firestore,null,n)}}function D_(t){t=mt(t,Ft);const e=mt(t.firestore,Kr),n=Xa(e),r=new mp(e);return S_(t._query),a_(n,t._query).then(s=>new N_(e,r,t,s))}function M_(t,e,n){t=mt(t,Oe);const r=mt(t.firestore,Kr),s=k_(t.converter,e,n);return yp(r,[v_(tc(r),"setDoc",t._key,s,t.converter!==null,n).toMutation(t._key,et.none())])}function P_(t,e,n,...r){t=mt(t,Oe);const s=mt(t.firestore,Kr),i=tc(s);let o;return o=typeof(e=De(e))=="string"||e instanceof Ai?E_(i,"updateDoc",t._key,e,n,r):w_(i,"updateDoc",t._key,e),yp(s,[o.toMutation(t._key,et.exists(!0))])}function yp(t,e){return function(n,r){const s=new lt;return n.asyncQueue.enqueueAndForget(async()=>GI(await i_(n),r,s)),s.promise}(Xa(t),e)}function x_(t,e,n){const r=n.docs.get(e._key),s=new mp(t);return new gp(t,s,e._key,r,new Zn(n.hasPendingWrites,n.fromCache),e.converter)}(function(t,e=!0){(function(n){Bn=n})(Pn),Sn(new Xt("firestore",(n,{instanceIdentifier:r,options:s})=>{const i=n.getProvider("app").getImmediate(),o=new Kr(new D0(n.getProvider("auth-internal")),new U0(n.getProvider("app-check-internal")),function(a,u){if(!Object.prototype.hasOwnProperty.apply(a.options,["projectId"]))throw new C(E.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new wr(a.options.projectId,u)}(i,r),i);return s=Object.assign({useFetchStreams:e},s),o._setSettings(s),o},"PUBLIC").setMultipleInstances(!0)),Nt(bu,"3.13.0",t),Nt(bu,"3.13.0","esm2017")})();const U_=({app:t})=>p_(t);function Yr(){const t=Tw(),e=B_({app:t}),n=U_({app:t});return{authentication:e,database:n}}const B_=({app:t})=>ww(t),F_=t=>{const{user:e,_tokenResponse:n}=t,r=(n==null?void 0:n.isNewUser)||!1,{displayName:s,photoURL:i,uid:o}=e;return{displayName:s,photoURL:i,uid:o,isNewUser:r}},$_=()=>{const{authentication:t}=Yr();return new Promise((e,n)=>{const r=new ot;Rv(t,r).then(s=>{const i=F_(s);e(tr(i))}).catch(s=>{console.error(s),n(ia(s))})})},V_=()=>{const{authentication:t}=Yr();return new Promise((e,n)=>{t.signOut().then(()=>{e(tr())}).catch(r=>{console.error(r),n(ia(r))})})},j_=({onChange:t})=>{const{authentication:e}=Yr();e.onAuthStateChanged(n=>{t({user:n})})},ll=$e(U),q_={button:ll("logout-info-modal"),successMessage:ll("logout-success-info-modal")},bi=()=>({...q_});function z_(){const{button:t,successMessage:e}=bi();V_().then(()=>{ce(D.USER_NOT_LOGGED),A.add(t,G),A.remove(e,G)})}function H_(){const{button:t}=bi();t.addEventListener("click",z_)}const G_=({displayName:t})=>`
  LOGOUT <span class='user'>(
    <span>${t}</span>
  )</span>
`,hl=()=>{const{button:t}=bi();A.remove(t,G);const{user:e}=de.auth;t.innerHTML=G_(e),H_()},W_=()=>{const{button:t}=bi();A.add(t,G)};function K_(){const{isLogged:t}=de.auth;t?hl():W_(),X(D.USER_LOGGED,hl)}const dl="heartbeat";function Q_(){const t=U("spider-wrapper");A.add(t,dl),X(D.FIRST_CLICK,()=>{A.remove(t,dl)})}const Y_=["2d","webgl","experimental-webgl","webgl2","webgl2-compute","bitmaprenderer","gpupresent","webgpu"];function X_(t="2d",e={}){const{width:n,height:r,offscreen:s=!1,worker:i=!1,contextAttributes:o={}}={...e};if(!i&&!Y_.includes(t))throw new TypeError(`Unknown contextType: "${t}"`);if(typeof window>"u"&&!e.canvas)return null;const a=e.canvas||document.createElement("canvas"),u=(s||i)&&"OffscreenCanvas"in window?a.transferControlToOffscreen():a;if(Number.isInteger(n)&&n>=0&&(u.width=n),Number.isInteger(r)&&r>=0&&(u.height=r),i)return{canvas:u};let d;try{d=u.getContext(t,o)||(t==="webgl"?u.getContext("experimental-webgl",o):null)}catch{d=null}return{canvas:u,context:d}}let ke;function vp(t,e,n=.5){if(ke)ke.canvas.width=t.width,ke.canvas.height=t.height;else{const{context:r}=X_("2d",{width:t.width,height:t.height});ke=r}return ke.save(),ke.fillStyle=e,ke.globalAlpha=n,ke.fillRect(0,0,ke.canvas.width,ke.canvas.height),ke.globalCompositeOperation="destination-atop",ke.globalAlpha=1,ke.drawImage(t,0,0),ke.restore(),ke.canvas}var J_=Z_;function Z_(t,e){if(typeof t!="string")throw new TypeError("must specify type string");if(e=e||{},typeof document>"u"&&!e.canvas)return null;var n=e.canvas||document.createElement("canvas");typeof e.width=="number"&&(n.width=e.width),typeof e.height=="number"&&(n.height=e.height);var r=e,s;try{var i=[t];t.indexOf("webgl")===0&&i.push("experimental-"+t);for(var o=0;o<i.length;o++)if(s=n.getContext(i[o],r),s)return s}catch{s=null}return s||null}const fl=27,pl=["app","main","fix"],gl=["before","after"],ml=["active","disabled","hidden","checked","empty"],yl=["header","button","form","my-element","app-class"],vl=[" > "," + "," "],Hs=["h1","h2","p","a","button","form","input","div","span","img","nav","section","header","footer"],eT={id:.9,classname:.2,attribute:.6,pseudoclass:.4,pseudoElement:.7},tT=()=>`#${pl[Math.floor(Math.random()*pl.length)]}`,nT=()=>`::${gl[Math.floor(Math.random()*gl.length)]}`,rT=()=>`[${ml[Math.floor(Math.random()*ml.length)]}]`,sT=()=>`.${yl[Math.floor(Math.random()*yl.length)]}`;function iT(t){let e=fl-t.length;for(;Math.random()<.6&&e>3;){let n=vl[Math.floor(Math.random()*vl.length)];t.length>0&&t.length+n.length+7<fl&&(t+=n,t+=Hs[Math.floor(Math.random()*Hs.length)],e-=n.length+7)}return t}function oT(){return[{name:"id",generator:tT},{name:"classname",generator:sT},{name:"attribute",generator:rT},{name:"pseudoElement",generator:nT}]}function aT(){let t="";return t+=Hs[Math.floor(Math.random()*Hs.length)],oT().forEach(({name:e,generator:n})=>{Math.random()<eT[e]||(t+=n())}),t=iT(t),t.trim()}const cT=function(t){let e,n,r,s,i=[];for(e=t.split(","),r=0,s=e.length;r<s;r+=1)n=e[r],n.length>0&&i.push(uT(n));const a=i.map(u=>u.specificity).reduce((u,d)=>u+d,"").toString().replace(/,/g,"");return{selector:t,specificity:a}},uT=function(t){let e=t,n,r={a:0,b:0,c:0},s=[],i=/(\[[^\]]+\])/g,o=/(#[^\#\s\+>~\.\[:\)]+)/g,a=/(\.[^\s\+>~\.\[:\)]+)/g,u=/(::[^\s\+>~\.\[:]+|:first-line|:first-letter|:before|:after)/gi,d=/(:(?!not|global|local)[\w-]+\([^\)]*\))/gi,f=/(:(?!not|global|local)[^\s\+>~\.\[:]+)/g,g=/([^\s\+>~\.\[:]+)/g;return n=function(y,v){let T,b,R,B,F,q;if(y.test(e))for(T=e.match(y),b=0,R=T.length;b<R;b+=1)r[v]+=1,B=T[b],F=e.indexOf(B),q=B.length,s.push({selector:t.substr(F,q),type:v,index:F,length:q}),e=e.replace(B,Array(q+1).join(" "))},function(){const y=function(R){let B,F,q,ne;if(R.test(e))for(B=e.match(R),F=0,q=B.length;F<q;F+=1)ne=B[F],e=e.replace(ne,Array(ne.length+1).join("A"))},v=/\\[0-9A-Fa-f]{6}\s?/g,T=/\\[0-9A-Fa-f]{1,5}\s/g,b=/\\./g;y(v),y(T),y(b)}(),function(){let y=/{[^]*/gm,v,T,b,R;if(y.test(e))for(v=e.match(y),T=0,b=v.length;T<b;T+=1)R=v[T],e=e.replace(R,Array(R.length+1).join(" "))}(),n(i,"b"),n(o,"a"),n(a,"b"),n(u,"c"),n(d,"b"),n(f,"b"),e=e.replace(/[\*\s\+>~]/g," "),e=e.replace(/[#\.]/g," "),e=e.replace(/:not/g,"    "),e=e.replace(/:local/g,"      "),e=e.replace(/:global/g,"       "),e=e.replace(/[\(\)]/g," "),n(g,"c"),s.sort(function(y,v){return y.index-v.index}),{selector:t,specificity:"0,"+r.a.toString()+","+r.b.toString()+","+r.c.toString(),specificityArray:[0,r.a,r.b,r.c],parts:s}};function lT(t){const e=t.split("").map(Number),n=new Set(e);for(let r=0;r<3;r++){let s;do s=Math.floor(Math.random()*9)+1;while(n.has(s));n.add(s),e.push(s)}return[`0${e[0]}${e[1]}${e[2]}`,`0${e[3]}${e[0]}${e[2]}`,`0${e[2]}${e[1]}${e[0]}`].sort(()=>Math.random()-.5)}const hT=4;function dT(t){return t.sort(()=>Math.random()-.5)}function fT(t){const e=t.toString(),n=lT(e);return dT(n.concat([e]))}function pT(t){return[t&&t.length,Array.isArray(t),t.length===hT].every(Boolean)}function gT(t){if(!t)throw new Error("Props are required");const{value:e,answer:n,options:r}=t;if(!e)throw new Error("Value is required");if(!n)throw new Error("Answer is required");if(!pT(r))throw new Error("Options are invalid");return{value:e,answer:n,options:r}}function mT(){const t=aT(),{specificity:e}=cT(t),n=fT(e);return gT({value:t,answer:e,options:n})}const Tr=Object.freeze({SPECIFICITY:"SPECIFICITY",MULTICHOICE:"MULTICHOICE"}),gn="40",yT=.7,wp=1e3,vT=20;const wT=250,eo="surprise",Ep=2e3;class ET{constructor({sprite:e,context:n,canvas:r,eyes:s,frame:i,x:o,y:a}){this.position=new zl(o,a,e),this.context=n,this.canvas=r,this.frame=new Gl(this,i,e),this.sprite=e,this.direction=1,this.state=Ue.IDDLE,this.wrapper=U("spider-wrapper"),this.shakeWrapper=Ws(),this.contextTint=J_("2d",{width:e.width,height:e.height}),this.hateLevel=0,this.opacityOffset=gn/4,this.eyes=s,this.readjustPupils()}readjustPupils(){const e=U("new-pupils"),n=U("spider");rn(1e3).then(()=>{n.appendChild(e),e.style.visibility="visible"})}tintImage(e){const n=this.hateLevel/gn;return vp(e,"red",n)}draw(e,n){const{x:r,y:s}=this.position,{width:i,height:o}=this.frame;this.context.clearRect(r,s,this.canvas.width,this.canvas.height);const{image:a}=this.sprite,u=e*i,d=n*o,f=i*2,g=o*2,y=this.tintImage(a);this.context.drawImage(y,u,d,i,o,r,s,f,g),this.updateHateLevelOnEyes()}updateHateLevelOnEyes(){this.eyes.forEach(e=>{e.setHateLevel(this.hateLevel)})}doStep(){this.isPaused||(this.frame.value+=this.direction,this.frame.isLimitPingPong({direction:this.state})&&(this.direction=this.state===Ue.FORWARD?-1:1,this.state=this.state===Ue.FORWARD?Ue.BACKWARD:Ue.FORWARD))}play(){return this.state=Ue.FORWARD,this.timer=setInterval(()=>{this.doStep();const{column:e,row:n}=this.sprite.getSlide(this.frame.value);this.draw(e,n)},wT),this}stopIddleAnimation(){return this.frame.drawFrame(this.frame.value),this.isPaused=!0,this}resumeIddleAnimation(){this.isPaused=!1}closeEyes(e){e.forEach(n=>n.close())}openEyes(e){e.forEach(n=>n.open())}searchOpenEyes(e){let n=!1;for(const r of e)if(!!r.isOpen()){n=!0;break}return n}addSurpriseClassname(){this.wrapper.classList.contains(eo)||this.wrapper.classList.add(eo)}removeSurpriseClassname(){this.wrapper.classList.remove(eo)}toBeSurprised(e){this.addSurpriseClassname(),this.openEyes(e),this.stopIddleAnimation()}incrementHateLevel(e=1){this.hateLevel>=gn-this.opacityOffset||(this.hateLevel>gn/1.5&&this.shakeWrapper.classList.add("headShakeHard"),this.hateLevel+=e)}resetHateLevel(){this.hateLevel=0,this.shakeWrapper.classList.remove("headShake","headShakeHard")}relax(e){this.removeSurpriseClassname(),this.resumeIddleAnimation(),setTimeout(()=>{this.closeEyes(e)},Ep)}}const IT=""+new URL("sound.d252dec7.mp3",import.meta.url).href,_T=""+new URL("sound2.8e41be2f.mp3",import.meta.url).href,TT=new Audio(IT),ST=new Audio(_T),Ip=t=>{(t.isBigEye?TT:ST).play()},AT=[0,50,100,150,200,300,400,500],_p=t=>{setTimeout(()=>{t.close()},Ep)},CT=(t,e,n,{sound:r})=>{t.forEach(s=>{if(!s.isAroundToTheMouse(e,n)){s.close();return}r&&!s.isOpen()&&Ip(s),s.open(),_p(s)})},bT=(t,e,n,{sound:r})=>{const s=AT;t.forEach(i=>{let o=0,a=!1;for(const u of s)!i.isAroundToTheMouse(e,n,u)||(a=!0,o=Math.floor(u/60),r&&!i.isOpen()&&Ip(i),i.openSemi({limit:o}));a||_p(i)})},wl=(t,e,n,r)=>{(r.wave?bT:CT)(t,e,n,r)},Vo=(t,e,n)=>{const r=t.clientX-e.left,s=t.clientY-e.top,i=r*n,o=s*n;return{x:i,y:o}},RT=({eyes:t,canvas:e,params:n})=>{const r=e.getBoundingClientRect(),s=e.width/r.width;e.onmousemove=o=>{const{x:a,y:u}=Vo(o,r,s);wl(t,a,u,n)};const i=o=>{const{x:a,y:u}=Vo(o,r,s);wl(t,a,u,n)};e.addEventListener("click",i),e.onmouseleave=()=>{t.forEach(o=>{o.close()})}};let hc=0,dc=0,fc=0;function kT(){hc+=1}function NT(){dc=0,hc=0}function LT(t){return fc>t}function OT(t,e){setInterval(()=>{LT(t)&&(e(fc),NT()),dc+=1},1e3)}function DT(){const t=Math.floor(hc/dc);return isNaN(t)||t===1/0?0:t}function MT(){fc=DT()}function PT(t){const{onAction:e=()=>null,minToAction:n=1}=t;return OT(n,e),setInterval(MT,100),kT}const xT=1,UT=2,El=3,Il=7,BT=100,FT="Combo X",$T="SUPER!",pc="MONSTER",Tp={MINI:{classname:"mini",getText:()=>"+1",condition:t=>t===xT},SMALL:{classname:"small",getText:()=>"DOUBLE!",condition:t=>t===UT},NORMAL:{classname:"normal",getText:()=>"TRIPLE!",condition:t=>t===El},HUGE:{classname:"huge",getText:t=>`${FT}${t}`,condition:t=>t>El&&t<Il},[pc]:{classname:"monster",getText:()=>$T,condition:t=>t>=Il}},VT=t=>t.localeCompare(pc)===0,jT=t=>Tp[pc].condition(t);function qT(t){const e=Object.entries(Tp),[n,r]=e.find(s=>s[1].condition(t));if(!n||!r)throw new Error("[Combo] Error with value: ",t);return{id:n,...r}}const zT=t=>t*=BT/t,HT=1e3,_l="big-surprise";function GT(){const t=U("spider-wrapper");A.add(t,_l),setTimeout(()=>{A.remove(t,_l)},HT)}const WT="span",Tl="combo",KT=2e3,Sp=U("combos"),QT=t=>({setRandomPosition(){return t.style.left=`${oo(45,60)}%`,t.style.top=`${oo(40,35)}%`,this},applyStyle(e){return t.classList.add(Tl,`--${Tl}-${e}`),this},setMessage(e){return t.innerText=e,this}});function YT({text:t,classname:e}){const n=document.createElement(WT);return QT(n).applyStyle(e).setMessage(t).setRandomPosition(),Sp.appendChild(n),n}function XT(t){setTimeout(()=>{Sp.removeChild(t)},KT)}function Ap(t){const{id:e,classname:n,getText:r}=qT(t),s=r(t),i=YT({text:s,classname:n});VT(e)&&GT(),XT(i)}const JT=1;function ZT(t,e){let n=t;Ap(t),jT(t)&&(n=zT(t)),e(n)}function eS({onCombo:t=()=>null}){return PT({onAction:n=>ZT(n,t),minToAction:JT})}const tS=3e3;class nS{constructor({canvasWidth:e,canvasHeight:n}){return this.maxLifeTime=Math.min(tS,n/(1.5*60)*1e3),this.x=e/2,this.y=n-10,this.size=1,this.startSize=32,this.endSize=40,this.angle=Math.random()*359,this.startLife=new Date().getTime(),this.lifeTime=0,this.velY=-1-Math.random()*.5,this.velX=Math.floor(Math.random()*-6+3)/10,this}update(){this.lifeTime=new Date().getTime()-this.startLife,this.angle+=.2;const e=this.lifeTime/this.maxLifeTime*100;this.size=this.startSize+(this.endSize-this.startSize)*e*.1,this.alpha=1-e*.01,this.alpha=Math.max(this.alpha,0),this.x+=this.velX,this.y+=this.velY}}const Sl=300,to={FAMILY:"30px Secular One",COLOR:"black",SYMBOL:"Z"},rS=440;let Ot,Pe,jo=!0;function sS(t,e,n,r){Pe.lineWidth=2,Pe.setLineDash([5,5]),Pe.strokeStyle="#fff",Pe.strokeRect(t,e,n/2,r/2)}function iS({part:t}){t.update();const{x:e,y:n,size:r,alpha:s}=t;Pe.save();const i=-r/2,o=i;Pe.translate(e-i,n-o),Pe.globalAlpha=s,Pe.font=to.FAMILY,Pe.fillStyle=to.COLOR,Pe.fillText(to.SYMBOL,0,0),Pe.restore(),window.isDebugMode&&sS(e-i/1.2,n-o/3,r,r)}function oS(){jo=!0,Ot.width=Sl,Ot.height=Sl;const{width:t,height:e}=Ot,n=[];let r=new Date().getTime();function s(){new Date().getTime()<=r+rS||(r=new Date().getTime(),n.push(new nS({canvasWidth:t,canvasHeight:e})))}function i(){Pe.clearRect(0,0,t,e);let o=n.length;for(;o--;){const a=n[o];a.y<0||a.lifeTime>a.maxLifeTime?n.splice(o,1):iS({part:a})}jo&&s(),requestAnimationFrame(i)}i()}function gc(){jo=!1,Pe.clearRect(0,0,Ot.width,Ot.height)}function aS(){if(Ot=U("sleep"),!Ot)throw new Error("Dream canvas is not found.");Pe=Ot.getContext("2d"),X(D.END_TIMER,()=>{gc()})}const cS=100;let ls=!1,no=!1,Cp;const uS=({...t})=>{const{eyes:e,body:n}=t;if(!e||!n)throw new Error("Error with the eyes or body of spider");if(n.searchOpenEyes(e)){if(!ls)return;ls=!1,gc(),n.resumeIddleAnimation();return}ls||(ls=!0,oS(),n.stopIddleAnimation())},lS=({...t})=>{setInterval(()=>{uS({...t})},cS)},bp=({onInterruptedSleep:t,...e})=>{const{eyes:n,body:r}=e;r.relax(n),Cp(),r.toBeSurprised(n),!no&&(no=!0,t==null||t(1),Ap(1),gc(),setTimeout(()=>{r.relax(n),no=!1},100))},Rp=({onInterruptedSleep:t,...e})=>{const{eyesCanvas:n,eyes:r}=e,s=n.getBoundingClientRect(),i=n.width/s.width,o=360,a=u=>{u.preventDefault();let d=!1;const{x:f,y:g}=Vo(u,s,i);for(const y of r){const v=y.isAroundToTheMouse(f,g,o);if(!v)return;d=v;break}d&&bp({onInterruptedSleep:t,...e})};n.addEventListener("click",a)},hS=({onInterruptedSleep:t,...e})=>{const n=()=>{bp({onInterruptedSleep:t,...e})};Array.from(Tn("collider")).forEach(s=>s.addEventListener("click",n))},dS=t=>{const{onInterruptedSleep:e,...n}=t;aS(),lS(n),hS(t),Rp(t),Cp=eS({onCombo:e})},ro={intervalInMS:50,scale:{max:.9,min:1}},$t=80;function fS(){const t=U("new-pupils"),e=Ne({tag:"div",classNames:["pupil-wrapper"],target:t}),n=Ne({tag:"canvas",target:e});n.width=80,n.height=80;const r=n.getContext("2d"),s=n.getBoundingClientRect();return{context:r,rect:s,canvas:n}}function pS(){const{context:t,rect:e,canvas:n}=fS();document.addEventListener("mousemove",r);function r(i){const o=i.clientX-e.left,a=i.clientY-e.top;t.clearRect(0,0,$t*2,$t),s(o,a,$t/2,$t/2)}function s(i,o,a,u){const d=i-a,f=o-u,g=Math.atan2(f,d);t.save(),t.translate(a,u),t.rotate(g),t.beginPath(),t.fillStyle="white",t.arc(0,0,$t/2,0,Math.PI*2),t.fill(),t.beginPath(),t.arc($t*.3,0,$t*.15,0,Math.PI*2),t.fillStyle="#b95377",t.fill(),t.restore()}return n}const gS=8;class mc{constructor({sprite:e,context:n,x:r,y:s,scale:i,hateLevel:o,pupilScale:a,isBigEye:u,...d}){this.position=new zl(r,s,e);const f={...this.position,...d,context:n};this.sprite=e,this.context=n,this.frame=new Gl(this,0,this.sprite),this.params=f.params,this.isBigEye=u||!1,this.hateLevel=o||0,this.state=Ue.IDDLE,this.scale=i||oo(ro.scale.min,ro.scale.max),this.pupil=pS()}setHateLevel(e){this.hateLevel=e}isAroundToTheMouse(e,n,r=0){const s=this.frame.width*this.scale;this.offsetBoundaries=s*(this.params.sizeColision+.5);const{x:i,y:o}=this.position,{width:a,height:u}=this.frame,d=i-a/2-this.offsetBoundaries,f=o-u/2-this.offsetBoundaries,g=i+a+this.offsetBoundaries+r,y=o+u+this.offsetBoundaries+r,v=e>=d&&e<=g,T=n>=f&&n<=y;return v&&T}debug(e,n,r,s){this.context.lineWidth=4,this.context.setLineDash([5,5]),this.context.strokeStyle="#fff",this.context.strokeRect(e,n,r/2,s/2)}tintImage(e){const n=this.hateLevel/gn;return vp(e,"red",n)}draw(e,n){const{x:r,y:s}=this.position,{width:i,height:o}=this.frame;this.context.clearRect(r,s,i*this.scale,o*this.scale);const{image:a}=this.sprite,u=e*i,d=n*o,f=i*this.scale,g=o*this.scale,y=this.tintImage(a);this.context.drawImage(y,u,d,i,o,r,s,f,g),window.isDebugMode&&this.debug(r,s,i,o)}doStep({isReverse:e,limit:n}){const r=e?-1:1;if(this.frame.value+=r,!this.frame.isLimit({isReverse:e,limit:n}))return;const s=this.state===Ue.BACKWARD?this.sprite.length:n||0;this.stop(s)}isIddle(){return this.state===Ue.IDDLE}play({isReverse:e,limit:n}){if(!!this.isIddle())return this.state=e?Ue.FORWARD:Ue.BACKWARD,this.timer=setInterval(()=>{this.doStep({isReverse:e,limit:n});const{column:r,row:s}=this.sprite.getSlide(this.frame.value);this.draw(r,s)},ro.intervalInMS),this}stop(e){return this.frame.drawFrame(e),this.state=Ue.IDDLE,clearInterval(this.timer),this}open(){return this.play({isReverse:!0}),this}openSemi({limit:e}){return this.play({isReverse:!0,limit:e}),this}close(){return this.play({isReverse:!1}),this}isOpen(){return this.frame.value<gS}}const mS=(t,e,n)=>{const{sprite:s}=t,i=s.length,o=1,a=e-s.frameWidth*o/2+80/2,u=n-s.frameHeight*o/2+80/2,d={x:a,y:u},f=new mc({sprite:s,...t,...d,scale:o,pupilScale:1,isBigEye:!1});return f.stop(i),f},yS=t=>{const{context:e,canvas:n,params:r,sprite:s}=t,i=n.width*.5,o=n.height*.5;let a=[];e.clearRect(0,0,n.width,n.height);const u=r.totalEyesInCircle,d=190,f=s.length;for(let y=0;y<u;y++){const T=gg(360/u)*y+180,b=i+d*Math.sin(T),R=o+d*Math.cos(T);e.save(),e.translate(b,R),e.rotate(-T);const B={x:b,y:R},F=new mc({sprite:s,...t,...B,scale:.45});F.stop(f),a.push(F),e.restore()}const g=mS(t,i,o);return a.push(g),a},vS=t=>{const{context:e,canvas:n,params:r,sprite:s}=t,i=s.frameWidth,o=s.frameHeight,a=-70,u=0,d=0;let f,g,y=[];e.clearRect(0,0,n.width,n.height);for(let v=0;v<r.columns;v++)for(let T=0;T<r.rows;T++){f=u+(i+a)*v,g=d+(o+a)*T;const b=r.columns*i,R=r.rows*o,B=f+i*.5+(n.width-b)/2,F=g+o*.5+(n.height-R)/2,q=s.length,ne={x:B,y:F},ue=new mc({sprite:s,...t,...ne,scale:.6});ue.stop(q),y.push(ue)}return y},wS=new URL(""+new URL("../sprites/eye/eye-spritesheet2.webp",import.meta.url).href,self.location).href,ES=10,Al=3e3;let We=U("eyes"),Cl=We.getContext("2d");const IS=async t=>new Promise((e,n)=>{const{params:r}=t,{shape:s}=r,i=new Image;i.src=wS;try{const o=()=>{const a=new Hl(ES,1,i);let u;s===ao.SQUARE?u=vS({...t,sprite:a}):s===ao.CIRCLE&&(u=yS({...t,sprite:a})),e(u)};i.onload=o}catch(o){console.error(o),n(new Error("Error loading the image",o))}}),_S=()=>{We.remove()},TS=()=>{_S();const t=U("spider");return We=document.createElement("canvas"),We.width=Al,We.height=Al,We.id="eyes",We.className="eyes",t.append(We),Cl=We.getContext("2d"),{canvas:We,context:Cl}},SS=5,AS=async t=>new Promise((e,n)=>{const{context:r,canvas:s}=t,{image:i,eyes:o}=t;try{const a=new Hl(SS,1,i),{frameWidth:u,frameHeight:d}=a,f=s.width/2-u/2,g=s.height/2-d/2;r.clearRect(0,0,s.width,s.height);const y=new ET({sprite:a,eyes:o,context:r,canvas:s,frame:0,x:f,y:g});y.play(),e(y)}catch(a){console.error(a),n(new Error("Error loading the image",a))}});let yc,Qt=[],Yt,Gs;const kp=async t=>{Qt=await IS({context:Gs,canvas:Yt,params:t}),RT({eyes:Qt,context:Gs,canvas:Yt,sprite:Qt[0].sprite,params:t})},CS=async t=>{Qt.forEach(({pupil:r})=>{r.disable()});const{context:e,canvas:n}=TS();Yt=n,Gs=e,await kp(t),Rp({eyesCanvas:Yt,eyes:Qt,body:yc,onInterruptedSleep:()=>{}})},bS=async({image:t,params:e})=>{const n=U("body"),r=n.getContext("2d");yc=await AS({image:t,context:r,canvas:n,eyes:Qt,params:e})},RS=async({image:t,params:e,onInterruptedSleep:n})=>{Yt=U("eyes"),Gs=Yt.getContext("2d"),await kp(e),await bS({image:t,params:e});const r={eyes:Qt,eyesCanvas:Yt,body:yc,onInterruptedSleep:n};return dS(r),r},kS="bounceInDown",bl=({elements:t,classname:e,onToggle:n})=>{if(!t||(t==null?void 0:t.length)===0)throw new Error("Zero elements to be toggled");Array.from(t).forEach(s=>{A.toggle(s,e),n==null||n(s)})},NS=()=>{const t=U("loader");if(!t)throw new Error("Loader component is not found");A.add(t,Es)},LS=()=>{function t(){const e=Tn(Es),n=Tn($c);bl({elements:e,classname:Es}),bl({elements:n,classname:$c,onToggle:r=>{A.add(r,kS)}})}t(),NS()},OS="title",DS="user-title",Rl="title-hidden",MS="hide-auto",PS=3e3,xS=()=>{const t=U(OS),e=U(DS),n=Tn(MS),r=U("user-counter"),s=U("info-icon"),i=U("clock");X(D.FIRST_CLICK,async()=>{if(A.remove(r,G),A.add(s,G),A.remove(i,G),!!Wl()){await rn(PS),A.add(t,Rl),A.add(e,Rl);for(var o=0;o<n.length;o++)A.add(n[o],Es)}})},US=()=>{X(D.CHANGES_IN_SETTINGS,()=>{CS(nh)})},BS=()=>{Vg(),K_(),Hg(),LS(),xS(),Dg(),US(),Q_()},FS={fullScreen:{zIndex:1},particles:{number:{value:0},color:{value:["#00FFFC","#FC00FF","#fffc00"]},shape:{type:["circle","square"],options:{}},opacity:{value:1,animation:{enable:!0,minimumValue:0,speed:2,startValue:"max",destroy:"min"}},size:{value:4,random:{enable:!0,minimumValue:2}},links:{enable:!1},life:{duration:{sync:!0,value:5},count:1},move:{enable:!0,gravity:{enable:!0,acceleration:10},speed:{min:10,max:20},decay:.1,direction:"none",straight:!1,outModes:{default:"destroy",top:"none"}},rotate:{value:{min:0,max:360},direction:"random",move:!0,animation:{enable:!0,speed:60}},tilt:{direction:"random",enable:!0,move:!0,value:{min:0,max:360},animation:{enable:!0,speed:60}},roll:{darken:{enable:!0,value:25},enable:!0,speed:{min:15,max:25}},wobble:{distance:30,enable:!0,move:!0,speed:{min:-15,max:15}}},emitters:{life:{count:0,duration:.1,delay:.4},rate:{delay:.1,quantity:150},size:{width:0,height:0}}},kl={startVelocity:30,spread:360,ticks:20,zIndex:0,...FS};function Nl(t,e){return Math.random()*(e-t)+t}function $S({durationInSecs:t}={durationInSecs:3}){const e=t*1e3,n=Date.now()+e,r=setInterval(function(){const s=n-Date.now();if(s<=0)return clearInterval(r);const i=20*(s/e);confetti(Object.assign({},kl,{particleCount:i,origin:{x:Nl(.1,.3),y:Math.random()-.2}})),confetti(Object.assign({},kl,{particleCount:i,origin:{x:Nl(.7,.9),y:Math.random()-.2}}))},250)}const VS="https://www.buymeacoffee.com/zeneke",jS=1;let so=0;const Np=()=>{window.open(VS)},qS=()=>{so===jS&&(Np(),so=0),so++},zS=()=>{if(Wl()){qS();return}Np()},HS=()=>{U("final-screen-avatar").addEventListener("click",zS)},GS=t=>({name:t.displayName,score:t.value,photoURL:t.photoURL}),Lp=t=>({...GS(t),position:t.position,isUser:t.isUser||!1}),WS=t=>{const{user:e}=de.auth;return e!=null&&e.uid?e.uid===t.userUid:!1},KS=(t,e)=>Lp({...t,isUser:!0,score:e});function QS(t){const e=[];return t.forEach(n=>{e.push(n.data())}),e}const YS=async t=>{const{database:e}=Yr(),n=h_(e,"awakenings"),r=A_(n,C_("value","desc"),b_(t));return await D_(r)},XS=t=>e=>e.slice(0,t),JS=t=>t.sort((e,n)=>n.score-e.score),ZS=t=>t.map((e,n)=>({...e,position:n+1})),e1=t=>{const{value:e}=de.awakening;return(WS(t)?KS:Lp)(t,e)},t1=t=>t.map(e1),vc=({limit:t=5})=>YS(t).then(QS).then(XS(t)).then(ZS).then(t1).then(JS);function Op(t,e,n,r){const s=Ne({tag:"section",classNames:`${n}__avatar`,target:r});Ne({tag:"div",classNames:`${n}__avatar-skeleton`,target:s});const i=pg({src:t,alt:e,classNames:`${n}__image`,target:s});i.onerror=()=>{const o=e.charAt(0);Ne({tag:"span",classNames:`${n}__image-fallback`,target:s,text:o})}}const Dp="ranking",n1="--current",Mp=({name:t,score:e,photoURL:n,position:r,isUser:s,wrapper:i,classname:o,insertMode:a})=>{const u=Ne({tag:"li",classNames:`${o}__item`,target:i,insertMode:a});Ne({tag:"span",classNames:`${o}__position`,target:u,text:r}),Op(n,t,o,u),Ne({tag:"span",classNames:`${o}__name`,target:u,text:t}),s&&(A.add(u,n1),Ne({tag:"span",classNames:`${o}__your-best`,target:u,text:"Your best: "})),Ne({tag:"span",classNames:`${o}__score`,target:u,text:e})},Pp=({players:t,wrapper:e})=>{e.innerHTML="",t.map(n=>Mp({...n,wrapper:e,classname:Dp}))},r1=({players:t,wrapper:e})=>{[...t].reverse().map(r=>Mp({...r,wrapper:e,classname:Dp,insertMode:"prepend"}))},s1=$e(U),i1=()=>({leaderboardPreview:s1("leaderboard-preview")}),o1=()=>Jl(".--current").querySelector(".ranking__score");const xp=async t=>{const{leaderboardPreview:e}=i1(),n=await vc({user:t,limit:5});Pp({players:n,wrapper:e})},a1=t=>{o1().textContent=t},c1=$e(U),u1=()=>({leaderboardPreview:c1("leaderboard-preview")}),l1=()=>Jl(".--current").querySelector(".ranking__score"),h1=async()=>{const{leaderboardPreview:t}=u1(),e=await vc({user:null,limit:3});r1({players:e,wrapper:t})},Up=t=>{l1().textContent=t},_t=$e(U,!1),Xr=()=>({finalScreen:_t("final-screen"),spider:_t("spider-wrapper"),elementsToHide:Mn(".hide-on-final-screen"),score:_t("final-score"),playAgainButton:_t("play-again"),goToLeaderboardButton:_t("go-leaderboard"),previewRanking:_t("leaderboard-preview"),recordMessage:_t("record-message"),newRecordMessage:_t("new-record-message")});function Sr(t){A.add(t,G)}function wc(t){A.remove(t,G)}function d1(){const{elementsToHide:t,spider:e}=Xr();t.forEach(n=>{Sr(n)}),Sr(e)}function f1(){const{isLogged:t}=de.auth,{goToLeaderboardButton:e,recordMessage:n}=Xr();(t?wc:Sr)(e),!t&&Sr(n)}function p1(){window.location.reload()}function g1(){const{playAgainButton:t}=Xr();t.addEventListener("click",p1)}function m1(){A.add(Ws(),"no-pointer")}function y1(){A.remove(Ws(),"no-pointer")}function v1(){const t=de.awakening,{finalScreen:e,score:n,avatar:r}=Xr();wc(e),m1(),d1(),n.textContent=t.value,f1(),g1(),HS(),rn(2e3).then(()=>{y1()})}const w1=()=>{const{newRecordMessage:t,recordMessage:e}=Xr();wc(t),Sr(e),$S()},E1=()=>{if(v1(),A.remove(Ws(),"headShakeHard"),de.auth.isLogged)xp(de.auth.user);else{h1();return}};function I1(){X(D.END_TIMER,E1),X(D.NEW_RECORD,w1)}class _1{constructor(){xc(this,"isLimitReachedByValue",e=>{this.increment(e);const n=this.isLimitReached();return this.isLimitReached()&&this.reset(),n});this.value=0}increment(e){this.value+=e}reset(){this.value=0}isLimitReached(){const e=this.value>=gn;return e&&this.reset(),e}}const T1=new _1;async function S1({documentId:t,userUid:e}){if(!e)throw new Error("Unknown userUid");const{database:n}=Yr(),r=d_(n,t,e),s=await O_(r);return{data:s.data(),existsDocument:s.exists(),documentSnap:s,documentRef:r}}async function A1({existsDocument:t,documentRef:e,field:n="value",value:r,user:s}){const{displayName:i,photoURL:o,email:a}=s;await(t?P_:M_)(e,{userUid:s.uid,[n]:r,displayName:i,photoURL:o,email:a})}const Ec=de.awakening;async function C1(t,e,n){Ec.increment(t),e(t),T1.isLimitReachedByValue(t)&&n()}async function Ic(){var s;const{isLogged:t,user:e}=de.auth;if(!t)return Promise.reject("User not logged");const n=await S1({documentId:"awakenings",userUid:e.uid}),r=((s=n.data)==null?void 0:s.value)||0;return{...n,awakenings:r}}function b1(t){A1({...t,value:Ec.value})}async function R1(){const{isLogged:t,user:e}=de.auth;if(!t)return;const{existsDocument:n,documentRef:r,awakenings:s}=await Ic();n&&s>=Ec.value||b1({user:e,existsDocument:n,documentRef:r})}function k1(t){if(!(t!=null&&t.onChange))throw new Error("Error with unknown callback onChange.");if(!(t!=null&&t.onShowQuestion))throw new Error("Error with unknown callback onShowQuestion.");return X(D.END_TIMER,R1),(e=1)=>C1(e,t.onChange,t.onShowQuestion)}const _c={twitter:t=>`https://twitter.com/intent/tweet?text=I've%20woken%20Sleepy%20up%20${t}%20times.%20Can%20you%20beat%20my%20record?%20https://sleepy.zenekezene.com`,whatsapp:t=>`https://wa.me/?text=I've%20woken%20Sleepy%20up%20${t}%20times.%20Can%20you%20beat%20my%20record?%20https://sleepy.zenekezene.com`,linkedin:()=>"https://www.linkedin.com/sharing/share-offsite/?url=https://sleepy.zenekezene.com",metaDescription:t=>`I've woken Sleepy up ${t} times. Can you beat my record?`};function N1(t){const e=U("twitter-share-link");e.href=_c.twitter(t)}function L1(t){const e=U("whatsapp-share-link");e.href=_c.whatsapp(t)}function O1(){const t=U("linkedin-share-link");t.href=_c.linkedin()}function Bp(t){N1(t),L1(t),O1()}function D1(t){const e=localStorage.getItem(t);return e?JSON.parse(e):null}function M1(t,e){if(!t)throw new Error("key is required");if(!e)throw new Error("value is required");localStorage.setItem(t,JSON.stringify(e))}function P1(t){if(!t)throw new Error("key is required");localStorage.removeItem(t)}const Tc="record",x1="record-message",U1="record-counter";function B1(t,e){t<=e||(M1(Tc,t),e&&ce(D.NEW_RECORD))}function F1(t){const e=U(x1),n=Tn(U1);!e||!n.length||(A.add(e,st),Array.from(n).forEach(r=>{r.textContent=Number(t).toLocaleString()}))}function $1(t){const e=D1(Tc);F1(t),B1(t,e)}function V1(){P1(Tc)}function Fp(t){$1(t),Up(t),a1(t)}function j1(){const t=de.awakening;Ic().then(({awakenings:e})=>{const n=Math.max(e,t.value);Fp(n),Bp(n)})}function q1(){const{isLogged:t}=de.auth,e=de.awakening;t?j1():(Up(e.value),Bp(e.value))}function z1(){const t=de.awakening;V1(),Ic().then(({existsDocument:e,awakenings:n})=>{!e||t.value>n||Fp(n)})}function H1(){X(D.END_TIMER,q1),X(D.USER_LOGGED,z1)}const G1=`
  <svg viewBox="0 0 140 140">
    <path fill="gold">
      <animate attributeName="d" dur="1440ms" repeatCount="indefinite"
        values="M 10,110 L 10,10 L 40,50 L 70,10 L 100,50 L 130,10 L 130,110 z;M 30,110 L 0,0 L 50,50 L 70,0 L 90,50 L 140,0 L 110,110 z;M 10,110 L 10,10 L 40,50 L 70,10 L 100,50 L 130,10 L 130,110 z;"
      ></animate>
    </path>
  </svg>
`,W1="podium",K1="--current",Q1=({name:t,score:e,photoURL:n,position:r,isUser:s,wrapper:i,classname:o,insertMode:a})=>{const u=Ne({tag:"li",classNames:`${o}__item`,target:i,insertMode:a});s&&(A.add(u,K1),Ne({tag:"span",classNames:`${o}__you`,target:u,text:"You"}));const d=Ne({tag:"span",classNames:`${o}__position`,target:u,text:r});r===1&&(d.innerHTML=G1),Op(n,t,o,u),Ne({tag:"span",classNames:`${o}__name`,target:u,text:t}),Ne({tag:"span",classNames:`${o}__score`,target:u,text:e})},Y1=({players:t,wrapper:e})=>{e.innerHTML="",t.map(n=>Q1({...n,wrapper:e,classname:W1}))},hs=$e(U),Ri=()=>({leaderboardScreen:hs("leaderboard-screen"),ranking:hs("leaderboard-ranking"),podium:hs("leaderboard-podium"),closeButton:hs("leaderboard-close-button")});const X1=t=>{const{podium:e}=Ri();Y1({players:t,wrapper:e})},J1=t=>{const{ranking:e}=Ri();Pp({players:t,wrapper:e})},Z1=async({user:t,limit:e})=>{const n=await vc({user:t,limit:e});X1(n.slice(0,3)),J1(n.slice(3))},eA=()=>{const{leaderboardScreen:t}=Ri();A.add(t,G)},tA=async t=>{const{leaderboardScreen:e,closeButton:n}=Ri(),{user:r}=t;await Z1({user:r,limit:10}),A.remove(e,G),n.addEventListener("click",eA)},nA=()=>{X(D.GO_TO_LEADERBOARD,async({detail:t})=>{await tA(t)})},rA=()=>{nA()},$p=1e3,Sc="60",sA=Sc*$p,iA=10;const Ll="--alert";let qo=null;function oA(){const t=U("clock"),e=U("lazy");e.textContent=Sc,qo=vg({duration:sA,callback:s=>{s<iA&&A.add(t,Ll),s>0?e.textContent=s:(e.textContent=0,ce(D.END_TIMER),ce(D.MODAL_OPEN),A.remove(t,Ll))},countdownToZero:!0,interval:$p})}function Ol(){if(!qo)throw new Error("Countdown not initialized");qo.pause()}function aA(){const t=U("lazy");t.textContent=Sc,X(D.INACTIVE_TAB,Ol),X(D.NO_INTERNET,Ol),X(D.FIRST_CLICK,oA)}const Tt=$e(U),Re=()=>({title:Tt("title"),userTitle:Tt("user-title"),finalScreen:Tt("final-screen"),leaderboardPreview:Tt("leaderboard-preview"),signInButton:Tt("leaderboard-preview-signup"),goToLeaderboardButton:Tt("go-leaderboard"),leaderboardScreen:Tt("leaderboard-screen"),errorWithSignIn:Tt("error-with-sign-in-modal"),errorWithSignInTriggers:Mn(".error-with-sign-in-trigger")});const cA="Welcome, ",uA=()=>{A.remove(Re().goToLeaderboardButton,G)},lA=()=>{A.add(Re().goToLeaderboardButton,G)},hA=({displayName:t})=>{A.remove(Re().userTitle,G),Re().userTitle.textContent=`${cA}${t}`},dA=()=>{A.add(Re().userTitle,G)},fA=()=>{A.remove(Re().title,G)},pA=()=>{A.add(Re().title,G)},gA=()=>{A.remove(Re().signInButton,G),A.remove(Re().signInButton,G)},mA=()=>{A.add(Re().signInButton,G)},Vp=()=>{A.add(Re().errorWithSignIn,G),A.remove(Re().errorWithSignIn,st)},yA=()=>{const{errorWithSignIn:t,errorWithSignInTriggers:e}=Re();e.forEach(n=>{n.addEventListener("click",Vp)}),A.add(t,st)},Jr={title:fA,userTitle:hA,leaderboardButton:uA,signInButton:gA,errorWithSignIn:yA},Ac={title:pA,userTitle:dA,leaderboardButton:lA,signInButton:mA,errorWithSignIn:Vp},vA=t=>{ce(D.USER_LOGGED,{user:t})},wA=()=>{ce(D.USER_NOT_LOGGED)},jp=t=>{ce(D.GO_TO_LEADERBOARD,{user:t})},EA=t=>{ce(D.MODAL_OPEN),ce(D.ERROR_WITH_SIGN_IN,{error:t})},IA=()=>{$_().catch(t=>{t.mapErr(e=>{EA(e)})})},_A=()=>{const{signInButton:t}=Re();Jr.signInButton(),t.addEventListener("click",IA)},TA=()=>{const{finalScreen:t}=Re();return!A.contains(t,G)},SA=t=>{TA()&&(Jr.leaderboardButton(),jp(t),xp(t))},AA=async t=>{Ac.signInButton(),vA(t),SA(t)},CA=()=>{_A(),wA()},bA=async t=>{const{user:e}=t;e?AA(e):CA();const{goToLeaderboardButton:n,leaderboardScreen:r}=Re();n.addEventListener("click",()=>{!e||(A.remove(r,G),jp(e))})};function RA(){j_({onChange:bA})}const kA=async()=>{const{user:t}=de.auth;Ac.title(),Jr.userTitle(t)},NA=()=>{Jr.title(),Ac.userTitle()},LA=()=>{Jr.errorWithSignIn()},OA=()=>{RA(),X(D.ERROR_WITH_SIGN_IN,LA),X(D.USER_LOGGED,kA),X(D.USER_NOT_LOGGED,NA)},io=$e(U),DA=$e(Mn),MA=()=>({spider:io("spider-wrapper"),inactiveTabModal:io("inactive-tab-modal"),playAgainButton:io("ups-play-again"),triggers:DA(".inactive-tab-modal-trigger")});let zo=!1;function Dl(){window.location.reload()}const PA=t=>A.add(t,st);function xA(){if(!zo)return;const{spider:t,inactiveTabModal:e,playAgainButton:n,triggers:r}=MA();n.addEventListener("click",Dl),r.forEach(s=>s.addEventListener("click",Dl)),document.visibilityState!=="visible"&&(A.add(t,G),ce(D.INACTIVE_TAB),ce(D.MODAL_OPEN),PA(e))}function UA(){X(D.END_TIMER,()=>{zo=!1}),X(D.FIRST_CLICK,()=>{zo=!0}),document.addEventListener("visibilitychange",xA)}const Ml=$e(U),BA=$e(Mn),FA=()=>({noInternetModal:Ml("no-internet-modal"),playAgainButton:Ml("no-internet-play-again"),triggers:BA(".no-internet-modal-trigger")});function Pl(){window.location.reload()}const $A=t=>A.add(t,st);function xl(){const{noInternetModal:t,playAgainButton:e,triggers:n}=FA();e.addEventListener("click",Pl),n.forEach(r=>r.addEventListener("click",Pl)),ce(D.NO_INTERNET),ce(D.MODAL_OPEN),$A(t)}function VA(){window.navigator.onLine||xl(),window.addEventListener("offline",xl)}const jA=[BS,I1,H1,aA,OA,rA,UA,VA],qA=()=>{jA.forEach(t=>t())},zA=()=>new Promise((t,e)=>{const n=new URL(""+new URL("../sprites/spider/spider-spritesheet.webp",import.meta.url).href,self.location).href,r=new Image;r.src=n,r.addEventListener("load",()=>t(r)),r.addEventListener("error",s=>e(s))}),HA=t=>{const e={};for(const n in t)e[Uc(n)]=Uc(t[n]);return e},GA=t=>t.map(HA),WA=t=>t.sort(()=>Math.random()-.5);function KA(t){return[t.option1,t.option2,t.option3,t.option4]}function QA(t){const e=t["question-en"],n=KA(t),r=WA(n),s=t.correct;return{type:Tr.MULTICHOICE,question:{title:e,answer:s,options:r}}}function YA(t){return t?{type:Tr.SPECIFICITY,question:t}:null}function XA(t){const e=[];return t.forEach(n=>{e.push(QA(n))}),e}const JA=40,Ul="Error recovering the questions",ZA="https://bilbostack-api.up.railway.app/api/v1",eC="/questions",tC=t=>e=>e.splice(0,t);function nC(t){const{size:e}=t||{size:JA},n=`${ZA}${eC}`;return fetch(n).then(r=>r.json()).then(GA).then(XA).then(mg).then(tC(e)).catch(r=>{console.error(Ul,r),Promise.reject(new Error(Ul))})}const rC="counter",Bl="counter-effect",qp=()=>{const{value:t}=de.awakening,e=Tn(rC);Array.from(e).forEach(async n=>{A.toggle(n,Bl),await rn(250),A.toggle(n,Bl),n.textContent=Number(t).toLocaleString()})},sC=()=>{const t=de.awakening;X(D.ANSWERED_CORRECT,e=>{const{value:n}=e.detail;t.increment(n),qp()})};async function iC(t,e){let n=null;try{const r=await nC({size:vT}),i=k1({onChange:o=>{qp(o),n.body.incrementHateLevel(o)},onShowQuestion:()=>{n.body.resetHateLevel(),e(r)}});sC(),n=await RS({image:t,params:nh,onInterruptedSleep:i})}catch(r){console.error(r),alert("Sorry, Sleepy is sleeping deeply. Please try again later."),U("spider-wrapper").innerHTML=""}}const oC="answeredCorrect",aC={value:wp};function cC(){ce(oC,{...aC})}function Kn(t,e){const n=jn();if(n[t]){if(!n[t]instanceof Element)throw new Error(`Invalid element: ${n[t]}`)}else throw new Error(`Invalid key: ${t}`);n[t].innerHTML=e}const it=$e(U,!1),jn=()=>{const t=it("question-options"),e=()=>t.querySelectorAll("li");return{options:t,getPossibleAnswers:e,modal:it("question-modal"),inner:it("question-modal__inner"),shake:it("question-modal__shake"),title:it("question-title"),value:it("question-value"),code:it("question-pre"),eachAnswer:n=>{e().forEach(n)},examScore:{correct:it("question-exam-score-correct"),incorrect:it("question-exam-score-incorrect")}}},uC="question-bonus",lC=2e3;function hC(t){t.textContent=`+${wp}`}function Fl(t){A.toggle(t,st)}async function dC(){const t=U(uC);!t||(hC(t),Fl(t),await rn(lC),Fl(t))}const Gt={CORRECT:"correct",INCORRECT:"incorrect",SHAKE_CORRECT:"shakeY",SHAKE_INCORRECT:"shakeX",VISIBLE:"visible",DISABLED:"disabled",get all(){return[this.CORRECT,this.INCORRECT,this.VISIBLE]},get(t){return t?this.CORRECT:this.INCORRECT},getShake(t){return t?this.SHAKE_CORRECT:this.SHAKE_INCORRECT}};const zp=1e3,$l="--vertical",Vl="--specificity",jl=t=>t.map(n=>`<li>${Eg(n)}</li>`).join(""),ql=t=>t.map(n=>`<li>${n}</li>`).join(""),fC=async t=>{const e=Gt.getShake(t);A.add($el.shake,e),await rn(zp),A.remove($el.shake,e)},Hp=()=>{const t=jn(),{code:e,modal:n,examScore:r,inner:s,options:i}=t;return{answersSpecificity:jl,answers:ql,shake:fC,specificityQuestion:({question:o})=>{const{title:a,value:u,options:d}=o;A.remove(n,$l),A.add(i,Vl),Kn("title",a),e.style.display="block",Kn("value",wg(u)),Kn("options",jl(d))},multiChoiceQuestion:({question:o})=>{const{title:a,options:u}=o;A.add(n,$l),A.remove(i,Vl),Kn("title",a),e.style.display="none",Kn("options",ql(u))},result:async(o,a)=>{const u=Gt.get(o);A.forEach(r,Gt.all,A.remove),A.forEach(t.getPossibleAnswers(),Gt.DISABLED,A.add),A.addAll([a.target,r[u]],[Gt.VISIBLE,u]),A.toggle(s,u)}}};async function pC({target:t}){const{inner:e,examScore:n,modal:r}=jn();await rn(zp),A.removeAll([t,e],Gt.all),A.forEach(n,Gt.VISIBLE,A.remove),Ho(r)}const gC="Calculate the CSS specificity!";function mC(){const t=mT();return{title:gC,...t}}function yC(t){if(Math.random()>yT){const n=mC();return YA(n)}return t}function vC(t){const{type:e}=t,{specificityQuestion:n,multiChoiceQuestion:r}=Hp();e===Tr.SPECIFICITY?n(t):e===Tr.MULTICHOICE&&r(t)}function wC(t){const e=yC(t);return vC(e),e}const EC=1e3,IC=[D.END_TIMER,D.NO_INTERNET,D.INACTIVE_TAB];function _C(t,e){const{type:n}=t,{answer:r}=t.question;let s=e.target.textContent;n===Tr.SPECIFICITY&&(s=Ig(s));const i=r===s;Hp().result(i,e),i&&(dC(),cC())}function TC(t){let e=!1;const n=(i=!0)=>{const o=i?"addEventListener":"removeEventListener";jn().eachAnswer(a=>{a[o]("click",s)})},r=()=>n(!1),s=i=>{e||(_C(t,i),e=!0,r(),pC(i).then(()=>{ce(D.MODAL_CLOSE)}))};setTimeout(()=>{n()},EC)}function SC(t){const e=wC(t);TC(e)}function AC(t){const{modal:e}=jn();!e||(Ho(e),ce(D.MODAL_OPEN),SC(t))}function CC(t){if(!t||t.length===0)throw new Error("No questions to show");const e=t.pop();AC(e);const{modal:n}=jn();IC.forEach(r=>{X(r,()=>{Ho(n)})})}const bC=!1;window.isDebugMode=bC;zA().then(t=>{iC(t,CC),qA()}).catch(t=>console.error(t));
