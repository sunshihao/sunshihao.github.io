(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[594],{7541:function(e,t,n){"use strict";n.d(t,{f:function(){return a}});var i=n(8949),o=n(6575),l=n(8392),r=i.forwardRef((e,t)=>{let{ratio:n=1,style:i,...r}=e;return(0,l.jsx)("div",{style:{position:"relative",width:"100%",paddingBottom:`${100/n}%`},"data-radix-aspect-ratio-wrapper":"",children:(0,l.jsx)(o.WV.div,{...r,ref:t,style:{...i,position:"absolute",top:0,right:0,bottom:0,left:0}})})});r.displayName="AspectRatio";var a=r},1577:function(e,t,n){"use strict";n.d(t,{F:function(){return l},e:function(){return r}});var i=n(8949);function o(e,t){if("function"==typeof e)return e(t);null!=e&&(e.current=t)}function l(...e){return t=>{let n=!1,i=e.map(e=>{let i=o(e,t);return n||"function"!=typeof i||(n=!0),i});if(n)return()=>{for(let t=0;t<i.length;t++){let n=i[t];"function"==typeof n?n():o(e[t],null)}}}}function r(...e){return i.useCallback(l(...e),e)}},6575:function(e,t,n){"use strict";n.d(t,{WV:function(){return a},jH:function(){return s}});var i=n(8949),o=n(6086),l=n(1815),r=n(8392),a=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"].reduce((e,t)=>{let n=i.forwardRef((e,n)=>{let{asChild:i,...o}=e,a=i?l.g7:t;return"undefined"!=typeof window&&(window[Symbol.for("radix-ui")]=!0),(0,r.jsx)(a,{...o,ref:n})});return n.displayName=`Primitive.${t}`,{...e,[t]:n}},{});function s(e,t){e&&o.flushSync(()=>e.dispatchEvent(t))}},4167:function(e,t,n){"use strict";n.d(t,{f:function(){return c}});var i=n(8949),o=n(6575),l=n(8392),r="horizontal",a=["horizontal","vertical"],s=i.forwardRef((e,t)=>{let{decorative:n,orientation:i=r,...s}=e,c=a.includes(i)?i:r;return(0,l.jsx)(o.WV.div,{"data-orientation":c,...n?{role:"none"}:{"aria-orientation":"vertical"===c?c:void 0,role:"separator"},...s,ref:t})});s.displayName="Separator";var c=s},1815:function(e,t,n){"use strict";n.d(t,{A4:function(){return s},g7:function(){return r}});var i=n(8949),o=n(1577),l=n(8392),r=i.forwardRef((e,t)=>{let{children:n,...o}=e,r=i.Children.toArray(n),s=r.find(c);if(s){let e=s.props.children,n=r.map(t=>t!==s?t:i.Children.count(e)>1?i.Children.only(null):i.isValidElement(e)?e.props.children:null);return(0,l.jsx)(a,{...o,ref:t,children:i.isValidElement(e)?i.cloneElement(e,void 0,n):null})}return(0,l.jsx)(a,{...o,ref:t,children:n})});r.displayName="Slot";var a=i.forwardRef((e,t)=>{let{children:n,...l}=e;if(i.isValidElement(n)){let e,r;let a=(e=Object.getOwnPropertyDescriptor(n.props,"ref")?.get)&&"isReactWarning"in e&&e.isReactWarning?n.ref:(e=Object.getOwnPropertyDescriptor(n,"ref")?.get)&&"isReactWarning"in e&&e.isReactWarning?n.props.ref:n.props.ref||n.ref,s=function(e,t){let n={...t};for(let i in t){let o=e[i],l=t[i];/^on[A-Z]/.test(i)?o&&l?n[i]=(...e)=>{l(...e),o(...e)}:o&&(n[i]=o):"style"===i?n[i]={...o,...l}:"className"===i&&(n[i]=[o,l].filter(Boolean).join(" "))}return{...e,...n}}(l,n.props);return n.type!==i.Fragment&&(s.ref=t?(0,o.F)(t,a):a),i.cloneElement(n,s)}return i.Children.count(n)>1?i.Children.only(null):null});a.displayName="SlotClone";var s=({children:e})=>(0,l.jsx)(l.Fragment,{children:e});function c(e){return i.isValidElement(e)&&e.type===s}},5430:function(e,t,n){"use strict";let i,o;n.d(t,{v:function(){return $}});var l=n(981),r=n(7047),a=n(8949),s=n(7416),c=n(9675),d=n(5611),h=n(2898);function u(e,t){let n;let i=()=>{let{currentTime:i}=t,o=(null===i?0:i.value)/100;n!==o&&e(o),n=o};return h.Wi.update(i,!0),()=>(0,h.Pn)(i)}let f=new WeakMap;function m({target:e,contentRect:t,borderBoxSize:n}){var i;null===(i=f.get(e))||void 0===i||i.forEach(i=>{i({target:e,contentSize:t,get size(){return function(e,t){if(t){let{inlineSize:e,blockSize:n}=t[0];return{width:e,height:n}}return e instanceof SVGElement&&"getBBox"in e?e.getBBox():{width:e.offsetWidth,height:e.offsetHeight}}(e,n)}})})}function g(e){e.forEach(m)}let p=new Set;var v=n(718),w=n(2486);let E=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),y=()=>({time:0,x:E(),y:E()}),C={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function S(e,t,n,i){let o=n[t],{length:l,position:r}=C[t],a=o.current,s=n.time;o.current=e[`scroll${r}`],o.scrollLength=e[`scroll${l}`]-e[`client${l}`],o.offset.length=0,o.offset[0]=0,o.offset[1]=o.scrollLength,o.progress=(0,v.Y)(0,o.scrollLength,o.current);let c=i-s;o.velocity=c>50?0:(0,w.R)(o.current-a,c)}var b=n(7131),L=n(9831),N=n(1911);let T={start:0,center:.5,end:1};function x(e,t,n=0){let i=0;if(e in T&&(e=T[e]),"string"==typeof e){let t=parseFloat(e);e.endsWith("px")?i=t:e.endsWith("%")?e=t/100:e.endsWith("vw")?i=t/100*document.documentElement.clientWidth:e.endsWith("vh")?i=t/100*document.documentElement.clientHeight:e=t}return"number"==typeof e&&(i=t*e),n+i}let O=[0,0],z=[[0,0],[1,1]],k={x:0,y:0},I=new WeakMap,A=new WeakMap,D=new WeakMap,H=e=>e===document.documentElement?window:e;function W(e,{container:t=document.documentElement,...n}={}){let l=D.get(t);l||(l=new Set,D.set(t,l));let r=function(e,t,n,i={}){return{measure:()=>(function(e,t=e,n){if(n.x.targetOffset=0,n.y.targetOffset=0,t!==e){let i=t;for(;i&&i!==e;)n.x.targetOffset+=i.offsetLeft,n.y.targetOffset+=i.offsetTop,i=i.offsetParent}n.x.targetLength=t===e?t.scrollWidth:t.clientWidth,n.y.targetLength=t===e?t.scrollHeight:t.clientHeight,n.x.containerLength=e.clientWidth,n.y.containerLength=e.clientHeight})(e,i.target,n),update:t=>{S(e,"x",n,t),S(e,"y",n,t),n.time=t,(i.offset||i.target)&&function(e,t,n){let{offset:i=z}=n,{target:o=e,axis:l="y"}=n,r="y"===l?"height":"width",a=o!==e?function(e,t){let n={x:0,y:0},i=e;for(;i&&i!==t;)if(i instanceof HTMLElement)n.x+=i.offsetLeft,n.y+=i.offsetTop,i=i.offsetParent;else if("svg"===i.tagName){let e=i.getBoundingClientRect(),t=(i=i.parentElement).getBoundingClientRect();n.x+=e.left-t.left,n.y+=e.top-t.top}else if(i instanceof SVGGraphicsElement){let{x:e,y:t}=i.getBBox();n.x+=e,n.y+=t;let o=null,l=i.parentNode;for(;!o;)"svg"===l.tagName&&(o=l),l=i.parentNode;i=o}else break;return n}(o,e):k,s=o===e?{width:e.scrollWidth,height:e.scrollHeight}:"getBBox"in o&&"svg"!==o.tagName?o.getBBox():{width:o.clientWidth,height:o.clientHeight},c={width:e.clientWidth,height:e.clientHeight};t[l].offset.length=0;let d=!t[l].interpolate,h=i.length;for(let e=0;e<h;e++){let n=function(e,t,n,i){let o=Array.isArray(e)?e:O,l=0;return"number"==typeof e?o=[e,e]:"string"==typeof e&&(o=(e=e.trim()).includes(" ")?e.split(" "):[e,T[e]?e:"0"]),x(o[0],n,i)-x(o[1],t)}(i[e],c[r],s[r],a[l]);d||n===t[l].interpolatorOffsets[e]||(d=!0),t[l].offset[e]=n}d&&(t[l].interpolate=(0,L.s)(t[l].offset,(0,N.Y)(i),{clamp:!1}),t[l].interpolatorOffsets=[...t[l].offset]),t[l].progress=(0,b.u)(0,1,t[l].interpolate(t[l].current))}(e,n,i)},notify:()=>t(n)}}(t,e,y(),n);if(l.add(r),!I.has(t)){let e=()=>{for(let e of l)e.measure()},n=()=>{for(let e of l)e.update(h.frameData.timestamp)},r=()=>{for(let e of l)e.notify()},a=()=>{h.Wi.read(e,!1,!0),h.Wi.read(n,!1,!0),h.Wi.update(r,!1,!0)};I.set(t,a);let s=H(t);window.addEventListener("resize",a,{passive:!0}),t!==document.documentElement&&A.set(t,"function"==typeof t?(p.add(t),o||(o=()=>{let e={width:window.innerWidth,height:window.innerHeight},t={target:window,size:e,contentSize:e};p.forEach(e=>e(t))},window.addEventListener("resize",o)),()=>{p.delete(t),!p.size&&o&&(o=void 0)}):function(e,t){i||"undefined"==typeof ResizeObserver||(i=new ResizeObserver(g));let n=(0,c.IG)(e);return n.forEach(e=>{let n=f.get(e);n||(n=new Set,f.set(e,n)),n.add(t),null==i||i.observe(e)}),()=>{n.forEach(e=>{let n=f.get(e);null==n||n.delete(t),(null==n?void 0:n.size)||null==i||i.unobserve(e)})}}(t,a)),s.addEventListener("scroll",a,{passive:!0})}let a=I.get(t);return h.Wi.read(a,!1,!0),()=>{var e;(0,h.Pn)(a);let n=D.get(t);if(!n||(n.delete(r),n.size))return;let i=I.get(t);I.delete(t),i&&(H(t).removeEventListener("scroll",i),null===(e=A.get(t))||void 0===e||e(),window.removeEventListener("resize",i))}}let M=new Map;function U({source:e,container:t=document.documentElement,axis:n="y"}={}){e&&(t=e),M.has(t)||M.set(t,{});let i=M.get(t);return i[n]||(i[n]=(0,c.tn)()?new ScrollTimeline({source:t,axis:n}):function({source:e,container:t,axis:n="y"}){e&&(t=e);let i={value:0},o=W(e=>{i.value=100*e[n].progress},{container:t,axis:n});return{currentTime:i,cancel:o}}({source:t,axis:n})),i[n]}function R(e){return e&&(e.target||e.offset)}var q=n(740);function B(e,t){(0,s.K)(!!(!t||t.current),`You have defined a ${e} options but the provided ref is not yet hydrated, probably because it's defined higher up the tree. Try calling useScroll() in the same component as the ref, or setting its \`layoutEffect: false\` option.`)}let F=()=>({scrollX:(0,l.BX)(0),scrollY:(0,l.BX)(0),scrollXProgress:(0,l.BX)(0),scrollYProgress:(0,l.BX)(0)});function $({container:e,target:t,layoutEffect:n=!0,...i}={}){let o=(0,r.h)(F);return(n?q.L:a.useEffect)(()=>(B("target",t),B("container",e),function(e,{axis:t="y",...n}={}){let i={axis:t,...n};return"function"==typeof e?2===e.length||R(i)?W(t=>{e(t[i.axis].progress,t)},i):u(e,U(i)):function(e,t){if(e.flatten(),R(t))return e.pause(),W(n=>{e.time=e.duration*n[t.axis].progress},t);{let n=U(t);return e.attachTimeline?e.attachTimeline(n,e=>(e.pause(),u(t=>{e.time=e.duration*t},n))):d.Z}}(e,i)}((e,{x:t,y:n})=>{o.scrollX.set(t.current),o.scrollXProgress.set(t.progress),o.scrollY.set(n.current),o.scrollYProgress.set(n.progress)},{...i,container:(null==e?void 0:e.current)||void 0,target:(null==t?void 0:t.current)||void 0})),[e,t,JSON.stringify(i.offset)]),o}},3203:function(e,t,n){"use strict";n.d(t,{Z:function(){return O}});var i=n(8949),o=n(6086);let l=(e,t)=>{var n,i;return e===(null==t?void 0:null===(i=t.tagName)||void 0===i?void 0:null===(n=i.toUpperCase)||void 0===n?void 0:n.call(i))},r=e=>l("DIV",e)||l("SPAN",e),a=e=>l("IMG",e),s=e=>e.complete&&0!==e.naturalHeight,c=e=>l("SVG",e),d=e=>{let{height:t,offset:n,width:i}=e;return Math.min((window.innerWidth-2*n)/i,(window.innerHeight-2*n)/t)},h=e=>{let{containerHeight:t,containerWidth:n,offset:i,targetHeight:o,targetWidth:l}=e,r=d({height:o,offset:i,width:l}),a=l>o?l/n:o/t;return r>1?a:r*a},u=e=>{let{containerHeight:t,containerWidth:n,hasScalableSrc:i,offset:o,targetHeight:l,targetWidth:r}=e;return t&&n?!i&&l&&r?h({containerHeight:t,containerWidth:n,offset:o,targetHeight:l,targetWidth:r}):d({height:t,offset:o,width:n}):1},f=/url(?:\(['"]?)(.*?)(?:['"]?\))/,m=e=>{if(e){if(a(e))return e.currentSrc;if(r(e)){let n=window.getComputedStyle(e).backgroundImage;if(n){var t;return null===(t=f.exec(n))||void 0===t?void 0:t[1]}}}},g=e=>{if(e){var t,n;return a(e)?null!==(t=e.alt)&&void 0!==t?t:void 0:null!==(n=e.getAttribute("aria-label"))&&void 0!==n?n:void 0}},p=e=>{let{containerHeight:t,containerLeft:n,containerTop:i,containerWidth:o,hasScalableSrc:l,offset:r,targetHeight:a,targetWidth:s}=e,c=u({containerHeight:t,containerWidth:o,hasScalableSrc:l,offset:r,targetHeight:a,targetWidth:s});return{top:i,left:n,width:o*c,height:t*c,transform:"translate(0,0) scale(".concat(1/c,")")}},v=e=>{let{position:t,relativeNum:n}=e,i=parseFloat(t);return t.endsWith("%")?n*i/100:i},w=e=>{let{containerHeight:t,containerLeft:n,containerTop:i,containerWidth:o,hasScalableSrc:l,objectFit:r,objectPosition:a,offset:s,targetHeight:c,targetWidth:d}=e;if("scale-down"===r&&(r=d<=o&&c<=t?"none":"contain"),"cover"===r||"contain"===r){let e=o/d,h=t/c,f="cover"===r?Math.max(e,h):Math.min(e,h),[m="50%",g="50%"]=a.split(" "),p=v({position:m,relativeNum:o-d*f}),w=v({position:g,relativeNum:t-c*f}),E=u({containerHeight:c*f,containerWidth:d*f,hasScalableSrc:l,offset:s,targetHeight:c,targetWidth:d});return{top:i+w,left:n+p,width:d*f*E,height:c*f*E,transform:"translate(0,0) scale(".concat(1/E,")")}}if("none"===r){let[e="50%",r="50%"]=a.split(" "),h=v({position:e,relativeNum:o-d}),f=v({position:r,relativeNum:t-c}),m=u({containerHeight:c,containerWidth:d,hasScalableSrc:l,offset:s,targetHeight:c,targetWidth:d});return{top:i+f,left:n+h,width:d*m,height:c*m,transform:"translate(0,0) scale(".concat(1/m,")")}}if("fill"!==r)return{};{let e=Math.max(o/d,t/c),n=u({containerHeight:c*e,containerWidth:d*e,hasScalableSrc:l,offset:s,targetHeight:c,targetWidth:d});return{width:o*n,height:t*n,transform:"translate(0,0) scale(".concat(1/n,")")}}},E=e=>{let{backgroundPosition:t,backgroundSize:n,containerHeight:i,containerLeft:o,containerTop:l,containerWidth:r,hasScalableSrc:a,offset:s,targetHeight:c,targetWidth:d}=e;if("cover"===n||"contain"===n){let e=r/d,h=i/c,f="cover"===n?Math.max(e,h):Math.min(e,h),[m="50%",g="50%"]=t.split(" "),p=v({position:m,relativeNum:r-d*f}),w=v({position:g,relativeNum:i-c*f}),E=u({containerHeight:c*f,containerWidth:d*f,hasScalableSrc:a,offset:s,targetHeight:c,targetWidth:d});return{top:l+w,left:o+p,width:d*f*E,height:c*f*E,transform:"translate(0,0) scale(".concat(1/E,")")}}if("auto"===n){let[e="50%",n="50%"]=t.split(" "),h=v({position:e,relativeNum:r-d}),f=v({position:n,relativeNum:i-c}),m=u({containerHeight:c,containerWidth:d,hasScalableSrc:a,offset:s,targetHeight:c,targetWidth:d});return{top:l+f,left:o+h,width:d*m,height:c*m,transform:"translate(0,0) scale(".concat(1/m,")")}}{let[e="50%",h="50%"]=n.split(" "),f=Math.min(v({position:e,relativeNum:r})/d,v({position:h,relativeNum:i})/c),[m="50%",g="50%"]=t.split(" "),p=v({position:m,relativeNum:r-d*f}),w=v({position:g,relativeNum:i-c*f}),E=u({containerHeight:c*f,containerWidth:d*f,hasScalableSrc:a,offset:s,targetHeight:c,targetWidth:d});return{top:l+w,left:o+p,width:d*f*E,height:c*f*E,transform:"translate(0,0) scale(".concat(1/E,")")}}},y=/\.svg$/i,C=e=>{var t;let{hasZoomImg:n,imgSrc:i,isSvg:o,isZoomed:l,loadedImgEl:a,offset:s,shouldRefresh:c,targetEl:d}=e,h=o||(null==i?void 0:null===(t=i.slice)||void 0===t?void 0:t.call(i,0,18))==="data:image/svg+xml"||n||!!(i&&y.test(i)),u=d.getBoundingClientRect(),f=window.getComputedStyle(d),m=null!=a&&r(d),g=Object.assign({},p({containerHeight:u.height,containerLeft:u.left,containerTop:u.top,containerWidth:u.width,hasScalableSrc:h,offset:s,targetHeight:(null==a?void 0:a.naturalHeight)||u.height,targetWidth:(null==a?void 0:a.naturalWidth)||u.width}),null==a||m?void 0:w({containerHeight:u.height,containerLeft:u.left,containerTop:u.top,containerWidth:u.width,hasScalableSrc:h,objectFit:f.objectFit,objectPosition:f.objectPosition,offset:s,targetHeight:(null==a?void 0:a.naturalHeight)||u.height,targetWidth:(null==a?void 0:a.naturalWidth)||u.width}),m?E({backgroundPosition:f.backgroundPosition,backgroundSize:f.backgroundSize,containerHeight:u.height,containerLeft:u.left,containerTop:u.top,containerWidth:u.width,hasScalableSrc:h,offset:s,targetHeight:(null==a?void 0:a.naturalHeight)||u.height,targetWidth:(null==a?void 0:a.naturalWidth)||u.width}):void 0);if(l){let e=window.innerWidth/2,t=window.innerHeight/2,n=parseFloat(String(g.left||0))+parseFloat(String(g.width||0))/2,i=parseFloat(String(g.top||0))+parseFloat(String(g.height||0))/2;c&&(g.transitionDuration="0.01ms"),g.transform="translate(".concat(e-n,"px,").concat(t-i,"px) scale(1)")}return g},S=e=>{if(!e)return{};if(!c(e))return{height:e.offsetHeight,left:e.offsetLeft,width:e.offsetWidth,top:e.offsetTop};{let t=e.parentElement,n=e.getBoundingClientRect();if(!t)return{height:n.height,left:n.left,width:n.width,top:n.top};{let e=t.getBoundingClientRect();return{height:n.height,left:e.left-n.left,top:e.top-n.top,width:n.width}}}},b=e=>{let t="-zoom",n=["clip-path","fill","mask","marker-start","marker-mid","marker-end"],i=new Map;if(e.hasAttribute("id")){let n=e.id,o=n+t;i.set(n,o),e.id=o}e.querySelectorAll("[id]").forEach(e=>{let n=e.id,o=n+t;i.set(n,o),e.id=o}),i.forEach((t,i)=>{let o="url(#".concat(i,")"),l="url(#".concat(t,")"),r=n.map(e=>"[".concat(e,'="').concat(o,'"]')).join(", ");e.querySelectorAll(r).forEach(e=>{n.forEach(t=>{e.getAttribute(t)===o&&e.setAttribute(t,l)})})}),e.querySelectorAll("style").forEach(e=>{i.forEach((t,n)=>{e.textContent&&(e.textContent=e.textContent.replaceAll("#".concat(n),"#".concat(t)))})})},L=["img","svg",'[role="img"]',"[data-zoom]"].map(e=>"".concat(e,':not([aria-hidden="true"])')).join(","),N={overflow:"",width:""};function T(e){return i.createElement(x,{...e})}class x extends i.Component{render(){let{handleBtnUnzoomClick:e,handleDialogCancel:t,handleDialogClick:n,handleDialogClose:l,handleUnzoom:s,handleZoom:d,imgEl:h,props:{a11yNameButtonUnzoom:u,a11yNameButtonZoom:f,children:p,classDialog:v,IconUnzoom:w,IconZoom:E,isZoomed:y,wrapElement:S,ZoomContent:b,zoomImg:L,zoomMargin:N},refContent:T,refDialog:x,refModalContent:O,refModalImg:z,refWrap:k,state:{id:I,isZoomImgLoaded:A,loadedImgEl:D,modalState:H,shouldRefresh:W,styleGhost:M}}=this,U="rmiz-modal-".concat(I),R="rmiz-modal-img-".concat(I),q=r(h),B=a(h),F=c(h),$=g(h),P=m(h),j=B?h.sizes:void 0,Y=B?h.srcset:void 0,Z=!!(null==L?void 0:L.src),G=this.hasImage(),V=$?"".concat(f,": ").concat($):f,X="LOADING"===H||"LOADED"===H,_=G?"found":"not-found",K="UNLOADED"===H||"UNLOADING"===H?"hidden":"visible";this.styleModalImg=G?C({hasZoomImg:Z,imgSrc:P,isSvg:F,isZoomed:y&&X,loadedImgEl:D,offset:N,shouldRefresh:W,targetEl:h}):{};let J=null;if(G){let t=B||q?i.createElement("img",{alt:$,sizes:j,src:P,srcSet:Y,...A&&"LOADED"===H?L:{},"data-rmiz-modal-img":"",height:this.styleModalImg.height||void 0,id:R,ref:z,style:this.styleModalImg,width:this.styleModalImg.width||void 0}):F?i.createElement("div",{"data-rmiz-modal-img":!0,ref:z,style:this.styleModalImg}):null,n=i.createElement("button",{"aria-label":u,"data-rmiz-btn-unzoom":"",onClick:e,type:"button"},i.createElement(w,null));J=b?i.createElement(b,{buttonUnzoom:n,modalState:H,img:t,onUnzoom:s}):i.createElement(i.Fragment,null,t,n)}return i.createElement(S,{"aria-owns":U,"data-rmiz":"",ref:k},i.createElement(S,{"data-rmiz-content":_,ref:T,style:{visibility:"UNLOADED"===H?"visible":"hidden"}},p),G&&i.createElement(S,{"data-rmiz-ghost":"",style:M},i.createElement("button",{"aria-label":V,"data-rmiz-btn-zoom":"",onClick:d,type:"button"},i.createElement(E,null))),G&&o.createPortal(i.createElement("dialog",{"aria-labelledby":R,"aria-modal":"true",className:v,"data-rmiz-modal":"",id:U,onClick:n,onClose:l,onCancel:t,ref:x,role:"dialog"},i.createElement("div",{"data-rmiz-modal-overlay":K}),i.createElement("div",{"data-rmiz-modal-content":"",ref:O},J)),this.getDialogContainer()))}componentDidMount(){this.setId(),this.setAndTrackImg(),this.handleImgLoad(),this.UNSAFE_handleSvg()}componentWillUnmount(){var e,t,n,i,o,l,r,a,s,c,d,h;"UNLOADED"!==this.state.modalState&&this.bodyScrollEnable(),null===(t=this.contentChangeObserver)||void 0===t||null===(e=t.disconnect)||void 0===e||e.call(t),null===(i=this.contentNotFoundChangeObserver)||void 0===i||null===(n=i.disconnect)||void 0===n||n.call(i),null===(l=this.imgElResizeObserver)||void 0===l||null===(o=l.disconnect)||void 0===o||o.call(l),null===(a=this.imgEl)||void 0===a||null===(r=a.removeEventListener)||void 0===r||r.call(a,"load",this.handleImgLoad),null===(c=this.imgEl)||void 0===c||null===(s=c.removeEventListener)||void 0===s||s.call(c,"click",this.handleZoom),null===(h=this.refModalImg.current)||void 0===h||null===(d=h.removeEventListener)||void 0===d||d.call(h,"transitionend",this.handleImgTransitionEnd),window.removeEventListener("wheel",this.handleWheel),window.removeEventListener("touchstart",this.handleTouchStart),window.removeEventListener("touchmove",this.handleTouchMove),window.removeEventListener("touchend",this.handleTouchEnd),window.removeEventListener("touchcancel",this.handleTouchCancel),window.removeEventListener("resize",this.handleResize),document.removeEventListener("keydown",this.handleKeyDown,!0)}componentDidUpdate(e,t){this.handleModalStateChange(t.modalState),this.UNSAFE_handleSvg(),this.handleIfZoomChanged(e.isZoomed)}constructor(){super(...arguments),this.state={id:"",isZoomImgLoaded:!1,loadedImgEl:void 0,modalState:"UNLOADED",shouldRefresh:!1,styleGhost:{}},this.refContent=i.createRef(),this.refDialog=i.createRef(),this.refModalContent=i.createRef(),this.refModalImg=i.createRef(),this.refWrap=i.createRef(),this.imgEl=null,this.isScaling=!1,this.prevBodyAttrs=N,this.styleModalImg={},this.handleModalStateChange=e=>{let{modalState:t}=this.state;if("LOADING"!==e&&"LOADING"===t)this.loadZoomImg(),window.addEventListener("resize",this.handleResize,{passive:!0}),window.addEventListener("touchstart",this.handleTouchStart,{passive:!0}),window.addEventListener("touchmove",this.handleTouchMove,{passive:!0}),window.addEventListener("touchend",this.handleTouchEnd,{passive:!0}),window.addEventListener("touchcancel",this.handleTouchCancel,{passive:!0}),document.addEventListener("keydown",this.handleKeyDown,!0);else if("LOADED"!==e&&"LOADED"===t)window.addEventListener("wheel",this.handleWheel,{passive:!0});else if("UNLOADING"!==e&&"UNLOADING"===t)this.ensureImgTransitionEnd(),window.removeEventListener("wheel",this.handleWheel),window.removeEventListener("touchstart",this.handleTouchStart),window.removeEventListener("touchmove",this.handleTouchMove),window.removeEventListener("touchend",this.handleTouchEnd),window.removeEventListener("touchcancel",this.handleTouchCancel),document.removeEventListener("keydown",this.handleKeyDown,!0);else if("UNLOADED"!==e&&"UNLOADED"===t){var n,i,o,l;this.bodyScrollEnable(),window.removeEventListener("resize",this.handleResize),null===(i=this.refModalImg.current)||void 0===i||null===(n=i.removeEventListener)||void 0===n||n.call(i,"transitionend",this.handleImgTransitionEnd),null===(l=this.refDialog.current)||void 0===l||null===(o=l.close)||void 0===o||o.call(l)}},this.getDialogContainer=()=>{let e=document.querySelector("[data-rmiz-portal]");return null==e&&((e=document.createElement("div")).setAttribute("data-rmiz-portal",""),document.body.appendChild(e)),e},this.setId=()=>{let e=()=>Math.random().toString(16).slice(-4);this.setState({id:e()+e()+e()})},this.setAndTrackImg=()=>{let e=this.refContent.current;if(e){if(this.imgEl=e.querySelector(L),this.imgEl){var t,n;null===(n=this.contentNotFoundChangeObserver)||void 0===n||null===(t=n.disconnect)||void 0===t||t.call(n),this.imgEl.addEventListener("load",this.handleImgLoad),this.imgEl.addEventListener("click",this.handleZoom),this.state.loadedImgEl||this.handleImgLoad(),this.imgElResizeObserver=new ResizeObserver(e=>{let t=e[0];(null==t?void 0:t.target)&&(this.imgEl=t.target,this.setState({styleGhost:S(this.imgEl)}))}),this.imgElResizeObserver.observe(this.imgEl),this.contentChangeObserver||(this.contentChangeObserver=new MutationObserver(()=>{this.setState({styleGhost:S(this.imgEl)})}),this.contentChangeObserver.observe(e,{attributes:!0,childList:!0,subtree:!0}))}else this.contentNotFoundChangeObserver||(this.contentNotFoundChangeObserver=new MutationObserver(this.setAndTrackImg),this.contentNotFoundChangeObserver.observe(e,{childList:!0,subtree:!0}))}},this.handleIfZoomChanged=e=>{let{isZoomed:t}=this.props;!e&&t?this.zoom():e&&!t&&this.unzoom()},this.handleImgLoad=()=>{let e=m(this.imgEl);if(!e)return;let t=new Image;a(this.imgEl)&&(t.sizes=this.imgEl.sizes,t.srcset=this.imgEl.srcset),t.src=e;let n=()=>{this.setState({loadedImgEl:t,styleGhost:S(this.imgEl)})};t.decode().then(n).catch(()=>{if(s(t)){n();return}t.onload=n})},this.handleZoom=()=>{if(this.hasImage()){var e,t;null===(e=(t=this.props).onZoomChange)||void 0===e||e.call(t,!0)}},this.handleUnzoom=()=>{var e,t;null===(e=(t=this.props).onZoomChange)||void 0===e||e.call(t,!1)},this.handleBtnUnzoomClick=e=>{e.preventDefault(),e.stopPropagation(),this.handleUnzoom()},this.handleDialogCancel=e=>{e.preventDefault()},this.handleDialogClick=e=>{(e.target===this.refModalContent.current||e.target===this.refModalImg.current)&&(e.stopPropagation(),this.handleUnzoom())},this.handleDialogClose=e=>{e.stopPropagation(),this.handleUnzoom()},this.handleKeyDown=e=>{("Escape"===e.key||27===e.keyCode)&&(e.preventDefault(),e.stopPropagation(),this.handleUnzoom())},this.handleWheel=e=>{e.ctrlKey||(e.stopPropagation(),queueMicrotask(()=>{this.handleUnzoom()}))},this.handleTouchStart=e=>{if(e.touches.length>1){this.isScaling=!0;return}1===e.changedTouches.length&&e.changedTouches[0]&&(this.touchYStart=e.changedTouches[0].screenY)},this.handleTouchMove=e=>{var t,n;let i=null!==(n=null===(t=window.visualViewport)||void 0===t?void 0:t.scale)&&void 0!==n?n:1;this.props.canSwipeToUnzoom&&!this.isScaling&&i<=1&&null!=this.touchYStart&&e.changedTouches[0]&&(this.touchYEnd=e.changedTouches[0].screenY,Math.abs(Math.max(this.touchYStart,this.touchYEnd)-Math.min(this.touchYStart,this.touchYEnd))>this.props.swipeToUnzoomThreshold&&(this.touchYStart=void 0,this.touchYEnd=void 0,this.handleUnzoom()))},this.handleTouchEnd=()=>{this.isScaling=!1,this.touchYStart=void 0,this.touchYEnd=void 0},this.handleTouchCancel=()=>{this.isScaling=!1,this.touchYStart=void 0,this.touchYEnd=void 0},this.handleResize=()=>{this.setState({shouldRefresh:!0})},this.hasImage=()=>this.imgEl&&(this.state.loadedImgEl||c(this.imgEl))&&"none"!==window.getComputedStyle(this.imgEl).display,this.zoom=()=>{var e,t,n,i;this.bodyScrollDisable(),null===(t=this.refDialog.current)||void 0===t||null===(e=t.showModal)||void 0===e||e.call(t),null===(i=this.refModalImg.current)||void 0===i||null===(n=i.addEventListener)||void 0===n||n.call(i,"transitionend",this.handleImgTransitionEnd),this.setState({modalState:"LOADING"})},this.unzoom=()=>{this.setState({modalState:"UNLOADING"})},this.handleImgTransitionEnd=()=>{clearTimeout(this.timeoutTransitionEnd),"LOADING"===this.state.modalState?this.setState({modalState:"LOADED"}):"UNLOADING"===this.state.modalState&&this.setState({shouldRefresh:!1,modalState:"UNLOADED"})},this.ensureImgTransitionEnd=()=>{if(this.refModalImg.current){let e=window.getComputedStyle(this.refModalImg.current).transitionDuration,t=parseFloat(e);if(t){let n=t*(e.endsWith("ms")?1:1e3)+50;this.timeoutTransitionEnd=setTimeout(this.handleImgTransitionEnd,n)}}},this.bodyScrollDisable=()=>{this.prevBodyAttrs={overflow:document.body.style.overflow,width:document.body.style.width};let e=document.body.clientWidth;document.body.style.overflow="hidden",document.body.style.width="".concat(e,"px")},this.bodyScrollEnable=()=>{document.body.style.width=this.prevBodyAttrs.width,document.body.style.overflow=this.prevBodyAttrs.overflow,this.prevBodyAttrs=N},this.loadZoomImg=()=>{let{props:{zoomImg:e}}=this,t=null==e?void 0:e.src;if(t){var n,i;let o=new Image;o.sizes=null!==(n=null==e?void 0:e.sizes)&&void 0!==n?n:"",o.srcset=null!==(i=null==e?void 0:e.srcSet)&&void 0!==i?i:"",o.src=t;let l=()=>{this.setState({isZoomImgLoaded:!0})};o.decode().then(l).catch(()=>{if(s(o)){l();return}o.onload=l})}},this.UNSAFE_handleSvg=()=>{let{imgEl:e,refModalImg:t,styleModalImg:n}=this;if(c(e)){var i,o,l,r,a;let s=e.cloneNode(!0);b(s),s.style.width="".concat(n.width||0,"px"),s.style.height="".concat(n.height||0,"px"),s.addEventListener("click",this.handleUnzoom),null===(l=t.current)||void 0===l||null===(o=l.firstChild)||void 0===o||null===(i=o.remove)||void 0===i||i.call(o),null===(a=t.current)||void 0===a||null===(r=a.appendChild)||void 0===r||r.call(a,s)}}}}function O(e){let[t,n]=i.useState(!1);return i.createElement(T,{...e,isZoomed:t,onZoomChange:n})}x.defaultProps={a11yNameButtonUnzoom:"Minimize image",a11yNameButtonZoom:"Expand image",canSwipeToUnzoom:!0,IconUnzoom:function(){return i.createElement("svg",{"aria-hidden":"true","data-rmiz-btn-unzoom-icon":!0,fill:"currentColor",focusable:"false",viewBox:"0 0 16 16",xmlns:"http://www.w3.org/2000/svg"},i.createElement("path",{d:"M 14.144531 1.148438 L 9 6.292969 L 9 3 L 8 3 L 8 8 L 13 8 L 13 7 L 9.707031 7 L 14.855469 1.851563 Z M 8 8 L 3 8 L 3 9 L 6.292969 9 L 1.148438 14.144531 L 1.851563 14.855469 L 7 9.707031 L 7 13 L 8 13 Z"}))},IconZoom:function(){return i.createElement("svg",{"aria-hidden":"true","data-rmiz-btn-zoom-icon":!0,fill:"currentColor",focusable:"false",viewBox:"0 0 16 16",xmlns:"http://www.w3.org/2000/svg"},i.createElement("path",{d:"M 9 1 L 9 2 L 12.292969 2 L 2 12.292969 L 2 9 L 1 9 L 1 14 L 6 14 L 6 13 L 2.707031 13 L 13 2.707031 L 13 6 L 14 6 L 14 1 Z"}))},swipeToUnzoomThreshold:10,wrapElement:"div",zoomMargin:0}},2650:function(e,t,n){"use strict";let i,o,l,r,a;n.d(t,{ob:function(){return h},S1:function(){return d}});var s={tocSelector:".js-toc",tocElement:null,contentSelector:".js-toc-content",contentElement:null,headingSelector:"h1, h2, h3",ignoreSelector:".js-toc-ignore",hasInnerContainers:!1,linkClass:"toc-link",extraLinkClasses:"",activeLinkClass:"is-active-link",listClass:"toc-list",extraListClasses:"",isCollapsedClass:"is-collapsed",collapsibleClass:"is-collapsible",listItemClass:"toc-list-item",activeListItemClass:"is-active-li",collapseDepth:0,scrollSmooth:!0,scrollSmoothDuration:420,scrollSmoothOffset:0,scrollEndCallback:function(e){},headingsOffset:1,throttleTimeout:50,positionFixedSelector:null,positionFixedClass:"is-position-fixed",fixedSidebarOffset:"auto",includeHtml:!1,includeTitleTags:!1,onClick:function(e){},orderedList:!0,scrollContainer:null,skipRendering:!1,headingLabelCallback:!1,ignoreHiddenElements:!1,headingObjectCallback:null,basePath:"",disableTocScrollSync:!1,tocScrollingWrapper:null,tocScrollOffset:30,enableUrlHashUpdateOnScroll:!1,bottomModeThreshold:30};let c={};function d(e){(c=function(...e){let t={};for(let n=0;n<e.length;n++){let i=e[n];for(let e in i)u.call(i,e)&&(t[e]=i[e])}return t}(s,e||{})).scrollSmooth&&(c.duration=c.scrollSmoothDuration,c.offset=c.scrollSmoothOffset,function(e){var t=e.duration,n=e.offset;if("undefined"!=typeof window&&"undefined"!=typeof location){var i=location.hash?o(location.href):location.href;document.body.addEventListener("click",function(l){var r,a,s,c,d,h,u,f,m;!(!("a"===(r=l.target).tagName.toLowerCase()&&(r.hash.length>0||"#"===r.href.charAt(r.href.length-1))&&(o(r.href)===i||o(r.href)+"#"===i))||l.target.className.indexOf("no-smooth-scroll")>-1)&&("#"!==l.target.href.charAt(l.target.href.length-2)||"!"!==l.target.href.charAt(l.target.href.length-1))&&-1!==l.target.className.indexOf(e.linkClass)&&(a=l.target.hash,s={duration:t,offset:n,callback:function(){var e,t;e=l.target.hash,(t=document.getElementById(e.substring(1)))&&(/^(?:a|select|input|button|textarea)$/i.test(t.tagName)||(t.tabIndex=-1),t.focus())}},d=window.pageYOffset,h={duration:s.duration,offset:s.offset||0,callback:s.callback,easing:s.easing||function(e,t,n,i){return(e/=i/2)<1?n/2*e*e+t:-n/2*(--e*(e-2)-1)+t}},u=document.querySelector('[id="'+decodeURI(a).split("#").join("")+'"]')||document.querySelector('[id="'+a.split("#").join("")+'"]'),f="string"==typeof a?h.offset+(a?u&&u.getBoundingClientRect().top||0:-(document.documentElement.scrollTop||document.body.scrollTop)):a,m="function"==typeof h.duration?h.duration(f):h.duration,requestAnimationFrame(function(e){(function t(n){c=n-e,window.scrollTo(0,h.easing(c,d,f,m)),c<m?requestAnimationFrame(t):(window.scrollTo(0,d+f),"function"==typeof h.callback&&h.callback())})(e)}))},!1)}function o(e){return e.slice(0,e.lastIndexOf("#"))}}(c)),i=function(e){let t;let n=[].forEach,i=[].some,o="undefined"!=typeof window&&document.body,l=!0;function r(t){let n=e.orderedList?"ol":"ul",i=document.createElement(n),o=e.listClass+" "+e.extraListClasses;return t&&(o=(o=o+" "+e.collapsibleClass)+" "+e.isCollapsedClass),i.setAttribute("class",o),i}function a(e,t){return e&&e.className!==t&&(e.className=t),e}function s(){let t;return e.scrollContainer&&document.querySelector(e.scrollContainer)?t=document.querySelector(e.scrollContainer):t=document.documentElement||o,t}function c(){let e=s();return e?.scrollTop||0}function d(t,n=c()){let o;return i.call(t,(i,l)=>(function t(n){let i=0;return null!==n&&(i=n.offsetTop,e.hasInnerContainers&&(i+=t(n.offsetParent))),i})(i)>n+e.headingsOffset+10?(o=t[0===l?l:l-1],!0):l===t.length-1?(o=t[t.length-1],!0):void 0),o}return{enableTocAnimation:function(){l=!0},disableTocAnimation:function(t){let n=t.target||t.srcElement;"string"==typeof n.className&&-1!==n.className.indexOf(e.linkClass)&&(l=!1)},render:function(i,o){let l=r(!1);return(o.forEach(t=>{!function t(i,o){let l=o.appendChild(function(t){let i=document.createElement("li"),o=document.createElement("a");return e.listItemClass&&i.setAttribute("class",e.listItemClass),e.onClick&&(o.onclick=e.onClick),e.includeTitleTags&&o.setAttribute("title",t.textContent),e.includeHtml&&t.childNodes.length?n.call(t.childNodes,e=>{o.appendChild(e.cloneNode(!0))}):o.textContent=t.textContent,o.setAttribute("href",`${e.basePath}#${t.id}`),o.setAttribute("class",`${e.linkClass+" "}node-name--${t.nodeName} ${e.extraLinkClasses}`),i.appendChild(o),i}(i));if(i.children.length){let e=r(i.isCollapsed);i.children.forEach(n=>{t(n,e)}),l.appendChild(e)}}(t,l)}),null===(t=i||t))?void 0:(t.firstChild&&t.removeChild(t.firstChild),0===o.length)?t:t.appendChild(l)},updateToc:function(i,o){e.positionFixedSelector&&function(){let n=c(),i=document.querySelector(e.positionFixedSelector);"auto"===e.fixedSidebarOffset&&(e.fixedSidebarOffset=t.offsetTop),n>e.fixedSidebarOffset?-1===i.className.indexOf(e.positionFixedClass)&&(i.className+=" "+e.positionFixedClass):i.className=i.className.replace(" "+e.positionFixedClass,"")}();let r=o?.target?.getAttribute("href")||null,h=!!r&&"#"===r.charAt(0)&&function(t){let n=s();return(n?.querySelector(`#${t}`)).offsetTop>n.offsetHeight-1.4*n.clientHeight-e.bottomModeThreshold}(r.replace("#",""));if((l||h)&&t&&i.length>0){let o=d(i),l=t.querySelector(`.${e.activeLinkClass}`),s=o.id.replace(/([ #;&,.+*~':"!^$[\]()=>|/\\@])/g,"\\$1"),c=window.location.hash.replace("#",""),u=s;r&&h?u=r.replace("#",""):c&&c!==s&&(u=c);let f=t.querySelector(`.${e.linkClass}[href="${e.basePath}#${u}"]`);if(l===f)return;let m=t.querySelectorAll(`.${e.linkClass}`);n.call(m,t=>{a(t,t.className.replace(" "+e.activeLinkClass,""))});let g=t.querySelectorAll(`.${e.listItemClass}`);n.call(g,t=>{a(t,t.className.replace(" "+e.activeListItemClass,""))}),f&&-1===f.className.indexOf(e.activeLinkClass)&&(f.className+=" "+e.activeLinkClass);let p=f?.parentNode;p&&-1===p.className.indexOf(e.activeListItemClass)&&(p.className+=" "+e.activeListItemClass);let v=t.querySelectorAll(`.${e.listClass}.${e.collapsibleClass}`);n.call(v,t=>{-1===t.className.indexOf(e.isCollapsedClass)&&(t.className+=" "+e.isCollapsedClass)}),f?.nextSibling&&-1!==f.nextSibling.className.indexOf(e.isCollapsedClass)&&a(f.nextSibling,f.nextSibling.className.replace(" "+e.isCollapsedClass,"")),function t(n){return n&&-1!==n.className.indexOf(e.collapsibleClass)&&-1!==n.className.indexOf(e.isCollapsedClass)?(a(n,n.className.replace(" "+e.isCollapsedClass,"")),t(n.parentNode.parentNode)):n}(f?.parentNode.parentNode)}},getCurrentlyHighlighting:function(){return l},getTopHeader:d,getScrollTop:c,updateUrlHashForHeader:function(t){let n=c(),i=d(t,n);if(!i||n<5)"#"===window.location.hash||""===window.location.hash||window.history.pushState(null,null,"#");else if(i&&!function(){let t=s();return c()+t.clientHeight>t.offsetHeight-e.bottomModeThreshold}()){let e=`#${i.id}`;window.location.hash!==e&&window.history.pushState(null,null,e)}}}}(c),o=function(e){let t=[].reduce;function n(e){return e[e.length-1]}function i(t){if(!function(e){try{return e instanceof window.HTMLElement||e instanceof window.parent.HTMLElement}catch(t){return e instanceof window.HTMLElement}}(t))return t;if(e.ignoreHiddenElements&&(!t.offsetHeight||!t.offsetParent))return null;let n=t.getAttribute("data-heading-label")||(e.headingLabelCallback?String(e.headingLabelCallback(t.innerText)):(t.innerText||t.textContent).trim()),i={id:t.id,children:[],nodeName:t.nodeName,headingLevel:+t.nodeName.toUpperCase().replace("H",""),textContent:n};return(e.includeHtml&&(i.childNodes=t.childNodes),e.headingObjectCallback)?e.headingObjectCallback(i,t):i}return{nestHeadingsArray:function(o){return t.call(o,function(t,o){let l=i(o);return l&&function(t,o){let l=i(t),r=l.headingLevel,a=o,s=n(a),c=r-(s?s.headingLevel:0);for(;c>0&&(!(s=n(a))||r!==s.headingLevel);)s&&void 0!==s.children&&(a=s.children),c--;r>=e.collapseDepth&&(l.isCollapsed=!0),a.push(l)}(l,t.nest),t},{nest:[]})},selectHeadings:function(t,n){let i=n;e.ignoreSelector&&(i=n.split(",").map(function(t){return`${t.trim()}:not(${e.ignoreSelector})`}));try{return t.querySelectorAll(i)}catch(e){return console.warn(`Headers not found with selector: ${i}`),null}}}}(c),h();let t=function(e){try{return e.contentElement||document.querySelector(e.contentSelector)}catch(t){return console.warn(`Contents element not found: ${e.contentSelector}`),null}}(c);if(null===t)return;let n=m(c);if(null===n||null===(l=o.selectHeadings(t,c.headingSelector)))return;let d=o.nestHeadingsArray(l).nest;if(c.skipRendering)return this;i.render(n,d);let g=!1;(r=f(e=>{i.updateToc(l),c.disableTocScrollSync||g||function(e){let t=e.tocScrollingWrapper||e.tocElement||document.querySelector(e.tocSelector);if(t&&t.scrollHeight>t.clientHeight){let n=t.querySelector(`.${e.activeListItemClass}`);if(n){let i=n.offsetTop-e.tocScrollOffset;t.scrollTop=i>0?i:0}}}(c),c.enableUrlHashUpdateOnScroll&&i.getCurrentlyHighlighting()&&i.updateUrlHashForHeader(l);let t=e?.target?.scrollingElement&&0===e.target.scrollingElement.scrollTop;(e&&(0===e.eventPhase||null===e.currentTarget)||t)&&(i.updateToc(l),c.scrollEndCallback&&c.scrollEndCallback(e))},c.throttleTimeout))(),window.onhashchange=window.onscrollend=e=>{r()},c.scrollContainer&&document.querySelector(c.scrollContainer)?(document.querySelector(c.scrollContainer).addEventListener("scroll",r,!1),document.querySelector(c.scrollContainer).addEventListener("resize",r,!1)):(document.addEventListener("scroll",r,!1),document.addEventListener("resize",r,!1));let p=null;a=f(e=>{g=!0,c.scrollSmooth&&i.disableTocAnimation(e),i.updateToc(l,e),p&&clearTimeout(p),p=setTimeout(()=>{i.enableTocAnimation()},c.scrollSmoothDuration),setTimeout(()=>{g=!1},c.scrollSmoothDuration+100)},c.throttleTimeout),c.scrollContainer&&document.querySelector(c.scrollContainer)?document.querySelector(c.scrollContainer).addEventListener("click",a,!1):document.addEventListener("click",a,!1)}function h(){let e=m(c);null!==e&&(!c.skipRendering&&e&&(e.innerHTML=""),c.scrollContainer&&document.querySelector(c.scrollContainer)?(document.querySelector(c.scrollContainer).removeEventListener("scroll",r,!1),document.querySelector(c.scrollContainer).removeEventListener("resize",r,!1),i&&document.querySelector(c.scrollContainer).removeEventListener("click",a,!1)):(document.removeEventListener("scroll",r,!1),document.removeEventListener("resize",r,!1),i&&document.removeEventListener("click",a,!1)))}let u=Object.prototype.hasOwnProperty;function f(e,t,n){let i,o;return t||(t=250),function(...l){let r=n||this,a=+new Date;i&&a<i+t?(clearTimeout(o),o=setTimeout(()=>{i=a,e.apply(r,l)},t)):(i=a,e.apply(r,l))}}function m(e){try{return e.tocElement||document.querySelector(e.tocSelector)}catch(t){return console.warn(`TOC element not found: ${e.tocSelector}`),null}}},5177:function(){}}]);