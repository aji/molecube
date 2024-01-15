var Kt=Object.defineProperty;var Yt=(t,e,n)=>e in t?Kt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var x=(t,e,n)=>(Yt(t,typeof e!="symbol"?e+"":e,n),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();const g=Math.PI,H=2*Math.PI;class Gt extends Error{}function Qt(t,e="assertion failed"){if(!t)throw new Gt(e)}function kt(t,e="expected a defined value"){return Qt(t!=null,e),t}function Xt(t,e,n){return Math.min(Math.max(t,n),e)}function S(t){return[...Array(t).keys()]}function Jt(t){return t.filter((e,n)=>n%2===0)}function Vt(t){return t.filter((e,n)=>n%2!==0)}const Et=t=>`${t}`;function Tt(t,e=Et){return t.map(n=>"("+n.map(e).join(" ")+")").join("")}function Zt(t,e=Et){const n=[],r=new Set;for(const s of t){if(s.length<2)continue;const i=Math.min(...s),o=s.indexOf(i),l=s.length,a=[];for(let c=0;c<l;c++){const u=s[(o+c)%l];if(r.has(u))throw new Error(`${e(u)} appears multiple times in ${Tt(t,e)}`);r.add(u),a.push(s[(o+c)%l])}n.push(a)}return n.sort((s,i)=>s[0]-i[0]),n}function C(t){return t.map(e=>[...e].reverse()).reverse()}function qt(t){const e=t.length;return e<=2?[]:e%2===0?[Jt(t),Vt(t)]:[t.map((n,r)=>t[r*2%e])]}function R(t){return t.flatMap(qt)}function _t(t){return S(t.length).map(e=>t.indexOf(e))}function jt(...t){const e=t[0].length;let n=S(e);for(const r of t){const s=S(e);r.forEach((i,o)=>s[i]=n[o]),n=s}return n}function W(t){const e=t.length,n=[],r=new Set;for(let s=0;s<e;s++){if(t[s]===s||r.has(s))continue;let i=s;const o=[];do r.add(i),o.push(i),i=t[i];while(i!==s);n.push(o)}return n}function te(t){return st(W(t))}function ee(t,e){const n=S(e);for(const r of t){const s=r.length;for(let i=0;i<s;i++)n[r[i]]=r[(i+1)%s]}return n}function st(t){const e=[];for(const n of t)for(let r=n.length-1;r>0;r--)e.push([n[0],n[r]]);return e}function Bt(t,e){const n=S(e);for(const[r,s]of t){const i=n[r];n[r]=n[s],n[s]=i}return n}function ne(t){return W(Bt(t,Math.max(...t.flat())+1))}const se=[3,2,0,1],re=[3,0,1,2],ie=[1,3,0,2];function oe(t){if(t.length!==4)throw new Error("not an element of S4");const e=st(W(t)).reverse(),n=[];for(const[r,s]of e){const i=Math.min(r,s),o=Math.max(r,s);if(i===0&&o===1)n.push(0);else if(i===0&&o===2)n.push(1);else if(i===0&&o===3)n.push(2);else if(i===1&&o===2)n.push(3);else if(i===1&&o===3)n.push(4);else if(i===2&&o===3)n.push(5);else throw new Error(`bad transposition: (${r} ${s})`)}return n}const ce=[[2,3,0,1,5,4],[4,5,3,2,0,1],[1,0,4,5,2,3],[1,0,5,4,3,2],[5,4,3,2,1,0],[3,2,1,0,5,4]];function ae(t){const e="FBUDLR";return W(t).map(n=>"("+n.map(r=>e.charAt(r)).join(" ")+")").join("")}const h=-1,D=0,d=1,M=2,A=3,E=4,b=5,T=6,F=7,q=8,Q=0,X=2,J=6,V=8,Z=18,_=20,j=24,tt=26,rt=1,it=3,ot=5,ct=7,at=9,ut=11,lt=15,ht=17,ft=19,dt=21,mt=23,pt=25,wt=[[Q,X,V,J],[rt,ot,ct,it]],xt=[[Z,j,tt,_],[ft,dt,pt,mt]],yt=[[Q,Z,_,X],[rt,at,ft,ut]],vt=[[J,V,tt,j],[ct,ht,pt,lt]],zt=[[Q,J,j,Z],[at,it,lt,dt]],gt=[[X,_,tt,V],[ut,mt,ht,ot]],ue=C(wt),le=C(xt),he=C(yt),fe=C(vt),de=C(zt),me=C(gt),pe=R(wt),we=R(xt),xe=R(yt),ye=R(vt),ve=R(zt),ze=R(gt),Dt=[A,E,D,F,b,d,T,q,M,q,M,T,E,h,A,b,d,F,d,F,b,M,T,q,D,A,E],$={[b]:"#00c",[T]:"#0cf",[D]:"#080",[d]:"#000",[E]:"#f70",[q]:"#90f",[F]:"#f00",[M]:"#fff",[A]:"#fc0",[h]:"#888"};class et{constructor(e){this.data=e}static initial(){return new et([...Dt])}}const ge=Object.freeze(Object.defineProperty({__proto__:null,B:xt,B2:we,BD:pt,BDL:j,BDR:tt,BL:dt,BR:mt,BU:ft,BUL:Z,BUR:_,Bi:le,Cb:b,Cc:T,Cg:D,Ck:d,Co:E,Cp:q,Cr:F,Cw:M,Cy:A,D:vt,D2:ye,DL:lt,DR:ht,Di:fe,F:wt,F2:pe,FD:ct,FDL:J,FDR:V,FL:it,FR:ot,FU:rt,FUL:Q,FUR:X,Fi:ue,L:zt,L2:ve,Li:de,Molecube:et,R:gt,R2:ze,Ri:me,S4x:se,S4y:re,S4z:ie,S6:ce,U:yt,U2:xe,UL:at,UR:ut,Ui:he,catperm:jt,dblcycle:qt,dblmove:R,fmtmove:Tt,formatS6:ae,initial:Dt,invmove:C,invperm:_t,move2perm:ee,move2tr:st,normmove:Zt,palette:$,perm2S4Flips:oe,perm2move:W,perm2tr:te,tr2move:ne,tr2perm:Bt,xx:h},Symbol.toStringTag,{value:"Module"})),Mt={x:1,y:0,z:0,w:0},At={x:0,y:1,z:0,w:0},Ut={x:0,y:0,z:1,w:0},L={x:0,y:0,z:0,w:1},N={x:0,y:0,z:0,w:0},Rt={x:0,y:0,z:0,w:1};function k(t,e,n){return{x:t,y:e,z:n,w:1}}function v(...t){return t.reduce((e,n)=>({x:e.x+n.x,y:e.y+n.y,z:e.z+n.z,w:e.w+n.w}),N)}function I(t,e){return{x:t.x-e.x,y:t.y-e.y,z:t.z-e.z,w:t.w-e.w}}function p({x:t,y:e,z:n,w:r},s){return{x:t*s,y:e*s,z:n*s,w:r*s}}function $t({x:t,y:e,z:n,w:r},s){return{x:t/s,y:e/s,z:n/s,w:r/s}}function B(t,e){return t.x*e.x+t.y*e.y+t.z*e.z+t.w*e.w}function Me(t){return Math.sqrt(B(t,t))}function K(t){return $t(t,Me(t))}function Ae(t,e){return p(e,B(t,e)/B(e,e))}function be(t,e){return I(t,Ae(t,e))}const bt={x:Mt,y:At,z:Ut,w:L};function Fe(t,e,n){return{x:{x:1,y:0,z:0,w:0},y:{x:0,y:1,z:0,w:0},z:{x:0,y:0,z:1,w:0},w:{x:t,y:e,z:n,w:1}}}function It(t){return{x:Mt,y:{x:0,y:Math.cos(t),z:Math.sin(t),w:0},z:{x:0,y:-Math.sin(t),z:Math.cos(t),w:0},w:L}}function Wt(t){return{x:{x:Math.cos(t),y:0,z:-Math.sin(t),w:0},y:At,z:{x:Math.sin(t),y:0,z:Math.cos(t),w:0},w:L}}function Ft(t){return{x:{x:Math.cos(t),y:Math.sin(t),z:0,w:0},y:{x:-Math.sin(t),y:Math.cos(t),z:0,w:0},z:Ut,w:L}}function Se(t,e,n){return{x:{x:t,y:0,z:0,w:0},y:{x:0,y:e,z:0,w:0},z:{x:0,y:0,z:n,w:0},w:L}}function Ce({x:t,y:e,z:n}){return{x:{x:0,y:n,z:-e,w:0},y:{x:-n,y:0,z:t,w:0},z:{x:e,y:-t,z:0,w:0},w:L}}function Re(t){return{x:{x:t.x.x,y:t.y.x,z:t.z.x,w:t.w.x},y:{x:t.x.y,y:t.y.y,z:t.z.y,w:t.w.y},z:{x:t.x.z,y:t.y.z,z:t.z.z,w:t.w.z},w:{x:t.x.w,y:t.y.w,z:t.z.w,w:t.w.w}}}function m(t,{x:e,y:n,z:r,w:s}){return v(p(t.x,e),p(t.y,n),p(t.z,r),p(t.w,s))}function Ot(...t){return t.reduce((e,n)=>({x:m(e,n.x),y:m(e,n.y),z:m(e,n.z),w:m(e,n.w)}),bt)}function Nt(t){return t===null?null:parseFloat(t)}function Lt(t){return t===null?null:parseFloat(t)*g/180}function Ht(t){if(t===null)return null;const e=t.match(/^ *([-0-9.]+) +([-0-9.]+) +([-0-9.]+) *$/);return e===null?null:{x:Number.parseFloat(e[1]),y:Number.parseFloat(e[2]),z:Number.parseFloat(e[3]),w:0}}const Le={B:b,C:T,G:D,K:d,O:E,P:q,R:F,W:M,Y:A,x:h};function U(t){if(t===null)return null;const e=[];for(let n=0;n<t.length;n++){const r=Le[t.charAt(n)];r!==void 0&&e.push(r)}return e}const Pe=Ft(.75*g),ke=Ft(-.75*g),z=S(6).map(t=>m(Ft((1-t)*H/6),At)),Ee=[[0,-1],[5,4],[1,2],[-1,3],[0,5],[-1,4],[1,-1],[2,3],[0,1],[-1,2],[5,-1],[4,3]];class Te extends HTMLElement{constructor(){super();x(this,"canvas");this.canvas=document.createElement("canvas"),this.canvas.setAttribute("width","1"),this.canvas.setAttribute("height","1"),this.appendChild(this.canvas)}connectedCallback(){const n=this.canvas.getBoundingClientRect();this.canvas.setAttribute("width",`${n.width}`),this.canvas.setAttribute("height",`${n.height}`),this.requestAnimationFrame(),setTimeout(()=>{this.requestAnimationFrame()},100+Math.random()*100)}frame(){const{width:n,height:r}=this.canvas.getBoundingClientRect();this.canvas.setAttribute("width",`${n}`),this.canvas.setAttribute("height",`${r}`);const s=kt(this.canvas.getContext("2d",{alpha:!1}));s.resetTransform(),s.fillStyle="#fff",s.fillRect(0,0,n,r),s.translate(n/2,r/2),s.scale(r*.4,-r*.4);const i=U(this.getAttribute("edges"));for(let a=0;a<12;a++){const[c,u]=Ee[a],f=z[c]??N,P=z[u]??N,w=(i==null?void 0:i[a])??h;s.lineCap="round",s.beginPath(),s.moveTo(f.x,f.y),s.lineTo(P.x,P.y),w!==h?(w===M&&(s.lineWidth=.13,s.strokeStyle="#000",s.stroke()),s.lineWidth=.1,s.strokeStyle=$[w],s.stroke()):(s.lineWidth=.03,s.strokeStyle="#888",s.stroke())}const o=qe(this.getAttribute("arrows"))??[];for(let a=0;a<6;a++){const c=o[a]??-1;if(c===-1)continue;const u=c===0?z[(a+1)%6]:c===1?N:c===2?z[(a+5)%6]:null;if(u===null)continue;const f=z[a],P=K(I(u,f)),w=v(f,p(P,.7)),St=v(w,p(m(Pe,P),.2)),Ct=v(w,p(m(ke,P),.2));s.strokeStyle="#000",s.lineWidth=.1,s.beginPath(),s.moveTo(f.x,f.y),s.lineTo(w.x,w.y),s.moveTo(St.x,St.y),s.lineTo(w.x,w.y),s.lineTo(Ct.x,Ct.y),s.stroke()}const l=U(this.getAttribute("vertices"));s.strokeStyle="#000",s.lineWidth=.03;for(let a=0;a<6;a++){const c=(l==null?void 0:l[a])??h;c!==h&&(s.beginPath(),s.fillStyle=$[c],s.ellipse(z[a].x,z[a].y,.15,.15,0,0,H),s.fill(),s.stroke())}}requestAnimationFrame(){window.requestAnimationFrame(this.frame.bind(this))}}function qe(t){if(t===null)return null;const e=[];for(let n=0;n<6;n++){const r=t.charAt(n);e.push(r===""||r==="x"?-1:parseInt(r))}return e}function Be(){customElements.define("hexagon-canvas",Te)}function De(t){const e=[],n=[],r=[];for(const s of t)switch(s.t){case"sphere":e.push(s),n.push(s);break;case"line":r.push(s);break}for(const s of r){let i=[s];for(const o of n)i=i.flatMap(l=>Ue(l,o));e.push(...i)}return e}function Ue(t,e){const n=[],[r,s]=$e(t,e)??[-1,-1];return 0<r&&n.push(Pt(t,0,Math.min(1,r))),s<1&&n.push(Pt(t,Math.max(0,s),1)),n}function $e(t,e){const n=I(t.end,t.start),r=I(t.start,e.at),s=e.radius,i=B(n,n),o=2*B(n,r),l=B(r,r)-s*s,a=o*o-4*i*l;if(a<=0)return;const c=(-o+Math.sqrt(a))/(2*i),u=(-o-Math.sqrt(a))/(2*i);return[Math.min(c,u),Math.max(c,u)]}function Pt(t,e,n){const{start:r,end:s}=t,i=I(s,r);return{...t,start:v(r,p(i,e)),end:v(r,p(i,n))}}function Ie(t,e){switch(e.t){case"line":return{...e,start:m(t,e.start),end:m(t,e.end)};case"sphere":return{...e,at:m(t,e.at)}}}function We(t){switch(t.t){case"line":return $t(v(t.start,t.end),2).z;case"sphere":return t.at.z}}function Oe(t,e){switch(e.t){case"line":t.strokeStyle=$[e.color??d],t.lineWidth=.02,t.lineCap="round",t.beginPath(),t.moveTo(-e.start.x/e.start.z,-e.start.y/e.start.z),t.lineTo(-e.end.x/e.end.z,-e.end.y/e.end.z),t.stroke();break;case"sphere":{const n=e.color??h,r=-1/e.at.z,s=r*e.at.x,i=r*e.at.y,o=r*e.radius;if(t.fillStyle=$[n],t.beginPath(),t.ellipse(s,i,o,o,0,0,H),t.fill(),n!==h){const l=-g/4;t.fillStyle="#ffffff66",t.beginPath(),t.ellipse(s-o*.45,i+o*.45,o*.2,o*.3,l,0,H),t.fill(),t.fillStyle="#00000044",t.beginPath();const a=-g/2,c=g/2;t.ellipse(s,i,o,o,l,a,c,!1),t.ellipse(s,i,o*.5,o,l+g,a,c,!0),t.fill()}t.strokeStyle="#000",t.beginPath(),t.ellipse(r*e.at.x,r*e.at.y,r*e.radius,r*e.radius,0,0,2*Math.PI),t.stroke();break}}}function Ne(t){const e=K(t),n=K(be(Mt,t)),r=m(Ce(n),e);return Re({x:n,y:e,z:r,w:L})}const y=class y extends HTMLElement{constructor(){super();x(this,"camera");x(this,"canvas");x(this,"animationFrameRequested");this.camera={dist:10,az:Math.PI/4,alt:Math.PI/5},this.canvas=document.createElement("canvas"),this.canvas.setAttribute("width","1"),this.canvas.setAttribute("height","1"),this.appendChild(this.canvas),this.animationFrameRequested=!1,this.addEventListener("mousedown",this.onMouseDown.bind(this)),document.addEventListener("mousemove",this.onMouseMove.bind(this)),document.addEventListener("mouseup",this.onMouseUp.bind(this))}connectedCallback(){const n=this.canvas.getBoundingClientRect();this.canvas.setAttribute("width",`${n.width}`),this.canvas.setAttribute("height",`${n.height}`),this.camera.az=Lt(this.getAttribute("az"))??this.camera.az,this.camera.alt=Lt(this.getAttribute("alt"))??this.camera.alt,this.requestAnimationFrame(),setTimeout(()=>{this.requestAnimationFrame()},100+Math.random()*100)}frame(){this.animationFrameRequested=!1;const{width:n,height:r}=this.canvas.getBoundingClientRect();this.canvas.setAttribute("width",`${n}`),this.canvas.setAttribute("height",`${r}`);const s=kt(this.canvas.getContext("2d",{alpha:!1}));s.resetTransform(),s.fillStyle="#fff",s.fillRect(0,0,n,r),s.lineWidth=.005,s.translate(n/2,r/2),s.scale(r*2,-r*2);const i=Ht(this.getAttribute("up")),o=i!==null?Ne(i):bt,l=Ot(Fe(0,0,-this.camera.dist),It(this.camera.alt),Wt(-this.camera.az),o),a=[];for(const u of this.children)u instanceof O&&a.push(...u.render().map(f=>Ie(l,f)));const c=[];for(const u of De(a))c.push([We(u),u]);c.sort((u,f)=>u[0]-f[0]);for(const[,u]of c)s.save(),Oe(s,u),s.restore()}requestAnimationFrame(){this.animationFrameRequested||(this.animationFrameRequested=!0,window.requestAnimationFrame(this.frame.bind(this)))}onMouseDown(n){y.activeWidget===void 0&&(y.activeWidget=this,n.preventDefault())}onMouseMove(n){if(y.activeWidget===this){const{width:r,height:s}=this.canvas.getBoundingClientRect();n.buttons&1?(this.camera.az-=Math.PI*n.movementX/r,this.camera.alt+=Math.PI*n.movementY/s,this.camera.alt=Xt(-Math.PI/2,Math.PI/2,this.camera.alt),this.requestAnimationFrame()):y.activeWidget=void 0}}onMouseUp(){y.activeWidget===this&&(y.activeWidget=void 0,this.requestAnimationFrame())}};x(y,"activeWidget");let Y=y;class O extends HTMLElement{connectedCallback(){this.parentElement instanceof Y&&this.parentElement.requestAnimationFrame()}}class He extends O{constructor(){super();x(this,"cube");this.cube=et.initial()}connectedCallback(){super.connectedCallback();const n=U(this.getAttribute("init"));if(n!==null)for(let r=0;r<27;r++)this.cube.data[r]=n[r]??h}render(){const n=[];for(let r=0;r<3;r++)for(let s=0;s<3;s++)for(let i=0;i<3;i++)r===1&&s===1&&i===1||n.push({t:"sphere",at:k(-1+i,1-s,1-r),radius:.5,color:this.cube.data[r*9+s*3+i]});return n}}class Ke extends O{render(){var i;const e=Nt(this.getAttribute("len"))??1,n=Ht(this.getAttribute("dir"));if(n===null)return[];const r=p(K(n),e*3);return[{t:"line",start:v(Rt,r),end:v(Rt,p(r,-1)),color:((i=U(this.getAttribute("color")))==null?void 0:i[0])??h}]}}const G=class G extends O{constructor(){super();x(this,"points");this.points=S(8).map(n=>k(n&1?1:-1,n&2?-1:1,n&4?-1:1))}render(){const n=Nt(this.getAttribute("scale")),r=n===null?bt:Se(n,n,n),s=this.points.map(c=>m(r,c)),i=U(this.getAttribute("edges"))??[],o=U(this.getAttribute("vertices"))??[],l=[],a=[];for(let c=0;c<8;c++){const u=o[c]??h;u!==h&&l.push({t:"sphere",color:u,at:s[c],radius:.3})}for(let c=0;c<12;c++){const[u,f]=G.edges[c];a.push({t:"line",color:i[c]??h,start:s[u],end:s[f]})}return[...l,...a]}};x(G,"edges",[[0,1],[2,3],[4,5],[6,7],[0,2],[1,3],[4,6],[5,7],[0,4],[1,5],[2,6],[3,7]]);let nt=G;class Ye extends O{constructor(){super();x(this,"points");const n=[k(-1,-1,-1),k(1,-1,1),k(-1,1,1),k(1,1,-1)],r=Ot(It(Math.atan(Math.SQRT2)),Wt(Math.PI/4));this.points=n.map(s=>m(r,s))}render(){const[n,r,s,i]=this.points;return[{t:"sphere",color:F,at:n,radius:.2},{t:"sphere",color:A,at:r,radius:.2},{t:"sphere",color:D,at:s,radius:.2},{t:"sphere",color:b,at:i,radius:.2},{t:"line",color:d,start:n,end:r},{t:"line",color:d,start:n,end:s},{t:"line",color:d,start:n,end:i},{t:"line",color:d,start:r,end:s},{t:"line",color:d,start:r,end:i},{t:"line",color:d,start:s,end:i}]}}function Ge(){customElements.define("widget-cube",He),customElements.define("widget-axis",Ke),customElements.define("widget-tetrahedron",Ye),customElements.define("widget-box",nt),customElements.define("widget-canvas",Y)}window.m=ge;Be();Ge();
