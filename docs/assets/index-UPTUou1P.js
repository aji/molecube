var Kt=Object.defineProperty;var Yt=(t,n,e)=>n in t?Kt(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e;var x=(t,n,e)=>(Yt(t,typeof n!="symbol"?n+"":n,e),e);(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}})();const g=Math.PI,H=2*Math.PI;class Gt extends Error{}function Qt(t,n="assertion failed"){if(!t)throw new Gt(n)}function kt(t,n="expected a defined value"){return Qt(t!=null,n),t}function Xt(t,n,e){return Math.min(Math.max(t,e),n)}function S(t){return[...Array(t).keys()]}function Jt(t){return t.filter((n,e)=>e%2===0)}function Vt(t){return t.filter((n,e)=>e%2!==0)}const Et=t=>`${t}`;function Tt(t,n=Et){return t.map(e=>"("+e.map(n).join(" ")+")").join("")}function Zt(t,n=Et){const e=[],r=new Set;for(const s of t){if(s.length<2)continue;const i=Math.min(...s),o=s.indexOf(i),l=s.length,a=[];for(let c=0;c<l;c++){const u=s[(o+c)%l];if(r.has(u))throw new Error(`${n(u)} appears multiple times in ${Tt(t,n)}`);r.add(u),a.push(s[(o+c)%l])}e.push(a)}return e.sort((s,i)=>s[0]-i[0]),e}function C(t){return t.map(n=>[...n].reverse()).reverse()}function qt(t){const n=t.length;return n<=2?[]:n%2===0?[Jt(t),Vt(t)]:[t.map((e,r)=>t[r*2%n])]}function R(t){return t.flatMap(qt)}function _t(t){return S(t.length).map(n=>t.indexOf(n))}function jt(...t){const n=t[0].length;let e=S(n);for(const r of t){const s=S(n);r.forEach((i,o)=>s[i]=e[o]),e=s}return e}function O(t){const n=t.length,e=[],r=new Set;for(let s=0;s<n;s++){if(t[s]===s||r.has(s))continue;let i=s;const o=[];do r.add(i),o.push(i),i=t[i];while(i!==s);e.push(o)}return e}function te(t){return st(O(t))}function ee(t,n){const e=S(n);for(const r of t){const s=r.length;for(let i=0;i<s;i++)e[r[i]]=r[(i+1)%s]}return e}function st(t){const n=[];for(const e of t)for(let r=e.length-1;r>0;r--)n.push([e[0],e[r]]);return n}function Bt(t,n){const e=S(n);for(const[r,s]of t){const i=e[r];e[r]=e[s],e[s]=i}return e}function ne(t){return O(Bt(t,Math.max(...t.flat())+1))}const se=[3,2,0,1],re=[3,0,1,2],ie=[1,3,0,2];function oe(t){if(t.length!==4)throw new Error("not an element of S4");const n=st(O(t)).reverse(),e=[];for(const[r,s]of n){const i=Math.min(r,s),o=Math.max(r,s);if(i===0&&o===1)e.push(0);else if(i===0&&o===2)e.push(1);else if(i===0&&o===3)e.push(2);else if(i===1&&o===2)e.push(3);else if(i===1&&o===3)e.push(4);else if(i===2&&o===3)e.push(5);else throw new Error(`bad transposition: (${r} ${s})`)}return e}const ce=[[2,3,0,1,5,4],[4,5,3,2,0,1],[1,0,4,5,2,3],[1,0,5,4,3,2],[5,4,3,2,1,0],[3,2,1,0,5,4]];function ae(t){const n="FBUDLR";return O(t).map(e=>"("+e.map(r=>n.charAt(r)).join(" ")+")").join("")}const h=-1,D=0,d=1,M=2,A=3,E=4,b=5,T=6,F=7,q=8,Q=0,X=2,J=6,V=8,Z=18,_=20,j=24,tt=26,rt=1,it=3,ot=5,ct=7,at=9,ut=11,lt=15,ht=17,ft=19,dt=21,mt=23,pt=25,wt=[[Q,X,V,J],[rt,ot,ct,it]],xt=[[Z,j,tt,_],[ft,dt,pt,mt]],yt=[[Q,Z,_,X],[rt,at,ft,ut]],vt=[[J,V,tt,j],[ct,ht,pt,lt]],zt=[[Q,J,j,Z],[at,it,lt,dt]],gt=[[X,_,tt,V],[ut,mt,ht,ot]],ue=C(wt),le=C(xt),he=C(yt),fe=C(vt),de=C(zt),me=C(gt),pe=R(wt),we=R(xt),xe=R(yt),ye=R(vt),ve=R(zt),ze=R(gt),Dt=[A,E,D,F,b,d,T,q,M,q,M,T,E,h,A,b,d,F,d,F,b,M,T,q,D,A,E],I={[b]:"#00c",[T]:"#0cf",[D]:"#080",[d]:"#000",[E]:"#f70",[q]:"#90f",[F]:"#f00",[M]:"#fff",[A]:"#fc0",[h]:"#888"};class et{constructor(n){this.data=n}static initial(){return new et([...Dt])}}const ge=Object.freeze(Object.defineProperty({__proto__:null,B:xt,B2:we,BD:pt,BDL:j,BDR:tt,BL:dt,BR:mt,BU:ft,BUL:Z,BUR:_,Bi:le,Cb:b,Cc:T,Cg:D,Ck:d,Co:E,Cp:q,Cr:F,Cw:M,Cy:A,D:vt,D2:ye,DL:lt,DR:ht,Di:fe,F:wt,F2:pe,FD:ct,FDL:J,FDR:V,FL:it,FR:ot,FU:rt,FUL:Q,FUR:X,Fi:ue,L:zt,L2:ve,Li:de,Molecube:et,R:gt,R2:ze,Ri:me,S4x:se,S4y:re,S4z:ie,S6:ce,U:yt,U2:xe,UL:at,UR:ut,Ui:he,catperm:jt,dblcycle:qt,dblmove:R,fmtmove:Tt,formatS6:ae,initial:Dt,invmove:C,invperm:_t,move2perm:ee,move2tr:st,normmove:Zt,palette:I,perm2S4Flips:oe,perm2move:O,perm2tr:te,tr2move:ne,tr2perm:Bt,xx:h},Symbol.toStringTag,{value:"Module"})),Mt={x:1,y:0,z:0,w:0},At={x:0,y:1,z:0,w:0},Ut={x:0,y:0,z:1,w:0},L={x:0,y:0,z:0,w:1},N={x:0,y:0,z:0,w:0},Rt={x:0,y:0,z:0,w:1};function k(t,n,e){return{x:t,y:n,z:e,w:1}}function v(...t){return t.reduce((n,e)=>({x:n.x+e.x,y:n.y+e.y,z:n.z+e.z,w:n.w+e.w}),N)}function W(t,n){return{x:t.x-n.x,y:t.y-n.y,z:t.z-n.z,w:t.w-n.w}}function p({x:t,y:n,z:e,w:r},s){return{x:t*s,y:n*s,z:e*s,w:r*s}}function It({x:t,y:n,z:e,w:r},s){return{x:t/s,y:n/s,z:e/s,w:r/s}}function B(t,n){return t.x*n.x+t.y*n.y+t.z*n.z+t.w*n.w}function Me(t){return Math.sqrt(B(t,t))}function K(t){return It(t,Me(t))}function Ae(t,n){return p(n,B(t,n)/B(n,n))}function be(t,n){return W(t,Ae(t,n))}const bt={x:Mt,y:At,z:Ut,w:L};function Fe(t,n,e){return{x:{x:1,y:0,z:0,w:0},y:{x:0,y:1,z:0,w:0},z:{x:0,y:0,z:1,w:0},w:{x:t,y:n,z:e,w:1}}}function Wt(t){return{x:Mt,y:{x:0,y:Math.cos(t),z:Math.sin(t),w:0},z:{x:0,y:-Math.sin(t),z:Math.cos(t),w:0},w:L}}function Ot(t){return{x:{x:Math.cos(t),y:0,z:-Math.sin(t),w:0},y:At,z:{x:Math.sin(t),y:0,z:Math.cos(t),w:0},w:L}}function Ft(t){return{x:{x:Math.cos(t),y:Math.sin(t),z:0,w:0},y:{x:-Math.sin(t),y:Math.cos(t),z:0,w:0},z:Ut,w:L}}function Se(t,n,e){return{x:{x:t,y:0,z:0,w:0},y:{x:0,y:n,z:0,w:0},z:{x:0,y:0,z:e,w:0},w:L}}function Ce({x:t,y:n,z:e}){return{x:{x:0,y:e,z:-n,w:0},y:{x:-e,y:0,z:t,w:0},z:{x:n,y:-t,z:0,w:0},w:L}}function Re(t){return{x:{x:t.x.x,y:t.y.x,z:t.z.x,w:t.w.x},y:{x:t.x.y,y:t.y.y,z:t.z.y,w:t.w.y},z:{x:t.x.z,y:t.y.z,z:t.z.z,w:t.w.z},w:{x:t.x.w,y:t.y.w,z:t.z.w,w:t.w.w}}}function m(t,{x:n,y:e,z:r,w:s}){return v(p(t.x,n),p(t.y,e),p(t.z,r),p(t.w,s))}function $t(...t){return t.reduce((n,e)=>({x:m(n,e.x),y:m(n,e.y),z:m(n,e.z),w:m(n,e.w)}),bt)}function Nt(t){return t===null?null:parseFloat(t)}function Lt(t){return t===null?null:parseFloat(t)*g/180}function Ht(t){if(t===null)return null;const n=t.match(/^ *([-0-9.]+) +([-0-9.]+) +([-0-9.]+) *$/);return n===null?null:{x:Number.parseFloat(n[1]),y:Number.parseFloat(n[2]),z:Number.parseFloat(n[3]),w:0}}const Le={B:b,C:T,G:D,K:d,O:E,P:q,R:F,W:M,Y:A,x:h};function U(t){if(t===null)return null;const n=[];for(let e=0;e<t.length;e++){const r=Le[t.charAt(e)];r!==void 0&&n.push(r)}return n}const Pe=Ft(.75*g),ke=Ft(-.75*g),z=S(6).map(t=>m(Ft((1-t)*H/6),At)),Ee=[[0,-1],[5,4],[1,2],[-1,3],[0,5],[-1,4],[1,-1],[2,3],[0,1],[-1,2],[5,-1],[4,3]];class Te extends HTMLElement{constructor(){super();x(this,"canvas");this.canvas=document.createElement("canvas"),this.canvas.setAttribute("width","1"),this.canvas.setAttribute("height","1"),this.appendChild(this.canvas)}connectedCallback(){const e=this.canvas.getBoundingClientRect();this.canvas.setAttribute("width",`${e.width}`),this.canvas.setAttribute("height",`${e.height}`),this.requestAnimationFrame()}frame(){const e=kt(this.canvas.getContext("2d",{alpha:!1})),{width:r,height:s}=this.canvas.getBoundingClientRect();e.resetTransform(),e.fillStyle="#fff",e.fillRect(0,0,r,s),e.translate(r/2,s/2),e.scale(s*.4,-s*.4);const i=U(this.getAttribute("edges"));for(let a=0;a<12;a++){const[c,u]=Ee[a],f=z[c]??N,P=z[u]??N,w=(i==null?void 0:i[a])??h;e.lineCap="round",e.beginPath(),e.moveTo(f.x,f.y),e.lineTo(P.x,P.y),w!==h?(w===M&&(e.lineWidth=.13,e.strokeStyle="#000",e.stroke()),e.lineWidth=.1,e.strokeStyle=I[w],e.stroke()):(e.lineWidth=.03,e.strokeStyle="#888",e.stroke())}const o=qe(this.getAttribute("arrows"))??[];for(let a=0;a<6;a++){const c=o[a]??-1;if(c===-1)continue;const u=c===0?z[(a+1)%6]:c===1?N:c===2?z[(a+5)%6]:null;if(u===null)continue;const f=z[a],P=K(W(u,f)),w=v(f,p(P,.7)),St=v(w,p(m(Pe,P),.2)),Ct=v(w,p(m(ke,P),.2));e.strokeStyle="#000",e.lineWidth=.1,e.beginPath(),e.moveTo(f.x,f.y),e.lineTo(w.x,w.y),e.moveTo(St.x,St.y),e.lineTo(w.x,w.y),e.lineTo(Ct.x,Ct.y),e.stroke()}const l=U(this.getAttribute("vertices"));e.strokeStyle="#000",e.lineWidth=.03;for(let a=0;a<6;a++){const c=(l==null?void 0:l[a])??h;c!==h&&(e.beginPath(),e.fillStyle=I[c],e.ellipse(z[a].x,z[a].y,.15,.15,0,0,H),e.fill(),e.stroke())}}requestAnimationFrame(){window.requestAnimationFrame(this.frame.bind(this))}}function qe(t){if(t===null)return null;const n=[];for(let e=0;e<6;e++){const r=t.charAt(e);n.push(r===""||r==="x"?-1:parseInt(r))}return n}function Be(){customElements.define("hexagon-canvas",Te)}function De(t){const n=[],e=[],r=[];for(const s of t)switch(s.t){case"sphere":n.push(s),e.push(s);break;case"line":r.push(s);break}for(const s of r){let i=[s];for(const o of e)i=i.flatMap(l=>Ue(l,o));n.push(...i)}return n}function Ue(t,n){const e=[],[r,s]=Ie(t,n)??[-1,-1];return 0<r&&e.push(Pt(t,0,Math.min(1,r))),s<1&&e.push(Pt(t,Math.max(0,s),1)),e}function Ie(t,n){const e=W(t.end,t.start),r=W(t.start,n.at),s=n.radius,i=B(e,e),o=2*B(e,r),l=B(r,r)-s*s,a=o*o-4*i*l;if(a<=0)return;const c=(-o+Math.sqrt(a))/(2*i),u=(-o-Math.sqrt(a))/(2*i);return[Math.min(c,u),Math.max(c,u)]}function Pt(t,n,e){const{start:r,end:s}=t,i=W(s,r);return{...t,start:v(r,p(i,n)),end:v(r,p(i,e))}}function We(t,n){switch(n.t){case"line":return{...n,start:m(t,n.start),end:m(t,n.end)};case"sphere":return{...n,at:m(t,n.at)}}}function Oe(t){switch(t.t){case"line":return It(v(t.start,t.end),2).z;case"sphere":return t.at.z}}function $e(t,n){switch(n.t){case"line":t.strokeStyle=I[n.color??d],t.lineWidth=.02,t.lineCap="round",t.beginPath(),t.moveTo(-n.start.x/n.start.z,-n.start.y/n.start.z),t.lineTo(-n.end.x/n.end.z,-n.end.y/n.end.z),t.stroke();break;case"sphere":{const e=n.color??h,r=-1/n.at.z,s=r*n.at.x,i=r*n.at.y,o=r*n.radius;if(t.fillStyle=I[e],t.beginPath(),t.ellipse(s,i,o,o,0,0,H),t.fill(),e!==h){const l=-g/4;t.fillStyle="#ffffff66",t.beginPath(),t.ellipse(s-o*.45,i+o*.45,o*.2,o*.3,l,0,H),t.fill(),t.fillStyle="#00000044",t.beginPath();const a=-g/2,c=g/2;t.ellipse(s,i,o,o,l,a,c,!1),t.ellipse(s,i,o*.5,o,l+g,a,c,!0),t.fill()}t.strokeStyle="#000",t.beginPath(),t.ellipse(r*n.at.x,r*n.at.y,r*n.radius,r*n.radius,0,0,2*Math.PI),t.stroke();break}}}function Ne(t){const n=K(t),e=K(be(Mt,t)),r=m(Ce(e),n);return Re({x:e,y:n,z:r,w:L})}const y=class y extends HTMLElement{constructor(){super();x(this,"camera");x(this,"canvas");x(this,"animationFrameRequested");this.camera={dist:10,az:Math.PI/4,alt:Math.PI/5},this.canvas=document.createElement("canvas"),this.canvas.setAttribute("width","1"),this.canvas.setAttribute("height","1"),this.appendChild(this.canvas),this.animationFrameRequested=!1,this.addEventListener("mousedown",this.onMouseDown.bind(this)),document.addEventListener("mousemove",this.onMouseMove.bind(this)),document.addEventListener("mouseup",this.onMouseUp.bind(this))}connectedCallback(){const e=this.canvas.getBoundingClientRect();this.canvas.setAttribute("width",`${e.width}`),this.canvas.setAttribute("height",`${e.height}`),this.camera.az=Lt(this.getAttribute("az"))??this.camera.az,this.camera.alt=Lt(this.getAttribute("alt"))??this.camera.alt,this.requestAnimationFrame()}frame(){this.animationFrameRequested=!1;const e=kt(this.canvas.getContext("2d",{alpha:!1})),{width:r,height:s}=this.canvas.getBoundingClientRect();e.resetTransform(),e.fillStyle="#fff",e.fillRect(0,0,r,s),e.lineWidth=.005,e.translate(r/2,s/2),e.scale(s*2,-s*2);const i=Ht(this.getAttribute("up")),o=i!==null?Ne(i):bt,l=$t(Fe(0,0,-this.camera.dist),Wt(this.camera.alt),Ot(-this.camera.az),o),a=[];for(const u of this.children)u instanceof $&&a.push(...u.render().map(f=>We(l,f)));const c=[];for(const u of De(a))c.push([Oe(u),u]);c.sort((u,f)=>u[0]-f[0]);for(const[,u]of c)e.save(),$e(e,u),e.restore()}requestAnimationFrame(){this.animationFrameRequested||(this.animationFrameRequested=!0,window.requestAnimationFrame(this.frame.bind(this)))}onMouseDown(e){y.activeWidget===void 0&&(y.activeWidget=this,e.preventDefault())}onMouseMove(e){if(y.activeWidget===this){const{width:r,height:s}=this.canvas.getBoundingClientRect();e.buttons&1?(this.camera.az-=Math.PI*e.movementX/r,this.camera.alt+=Math.PI*e.movementY/s,this.camera.alt=Xt(-Math.PI/2,Math.PI/2,this.camera.alt),this.requestAnimationFrame()):y.activeWidget=void 0}}onMouseUp(){y.activeWidget===this&&(y.activeWidget=void 0,this.requestAnimationFrame())}};x(y,"activeWidget");let Y=y;class $ extends HTMLElement{connectedCallback(){this.parentElement instanceof Y&&this.parentElement.requestAnimationFrame()}}class He extends ${constructor(){super();x(this,"cube");this.cube=et.initial()}connectedCallback(){super.connectedCallback();const e=U(this.getAttribute("init"));if(e!==null)for(let r=0;r<27;r++)this.cube.data[r]=e[r]??h}render(){const e=[];for(let r=0;r<3;r++)for(let s=0;s<3;s++)for(let i=0;i<3;i++)r===1&&s===1&&i===1||e.push({t:"sphere",at:k(-1+i,1-s,1-r),radius:.5,color:this.cube.data[r*9+s*3+i]});return e}}class Ke extends ${render(){var i;const n=Nt(this.getAttribute("len"))??1,e=Ht(this.getAttribute("dir"));if(e===null)return[];const r=p(K(e),n*3);return[{t:"line",start:v(Rt,r),end:v(Rt,p(r,-1)),color:((i=U(this.getAttribute("color")))==null?void 0:i[0])??h}]}}const G=class G extends ${constructor(){super();x(this,"points");this.points=S(8).map(e=>k(e&1?1:-1,e&2?-1:1,e&4?-1:1))}render(){const e=Nt(this.getAttribute("scale")),r=e===null?bt:Se(e,e,e),s=this.points.map(c=>m(r,c)),i=U(this.getAttribute("edges"))??[],o=U(this.getAttribute("vertices"))??[],l=[],a=[];for(let c=0;c<8;c++){const u=o[c]??h;u!==h&&l.push({t:"sphere",color:u,at:s[c],radius:.3})}for(let c=0;c<12;c++){const[u,f]=G.edges[c];a.push({t:"line",color:i[c]??h,start:s[u],end:s[f]})}return[...l,...a]}};x(G,"edges",[[0,1],[2,3],[4,5],[6,7],[0,2],[1,3],[4,6],[5,7],[0,4],[1,5],[2,6],[3,7]]);let nt=G;class Ye extends ${constructor(){super();x(this,"points");const e=[k(-1,-1,-1),k(1,-1,1),k(-1,1,1),k(1,1,-1)],r=$t(Wt(Math.atan(Math.SQRT2)),Ot(Math.PI/4));this.points=e.map(s=>m(r,s))}render(){const[e,r,s,i]=this.points;return[{t:"sphere",color:F,at:e,radius:.2},{t:"sphere",color:A,at:r,radius:.2},{t:"sphere",color:D,at:s,radius:.2},{t:"sphere",color:b,at:i,radius:.2},{t:"line",color:d,start:e,end:r},{t:"line",color:d,start:e,end:s},{t:"line",color:d,start:e,end:i},{t:"line",color:d,start:r,end:s},{t:"line",color:d,start:r,end:i},{t:"line",color:d,start:s,end:i}]}}function Ge(){customElements.define("widget-cube",He),customElements.define("widget-axis",Ke),customElements.define("widget-tetrahedron",Ye),customElements.define("widget-box",nt),customElements.define("widget-canvas",Y)}window.m=ge;Be();Ge();