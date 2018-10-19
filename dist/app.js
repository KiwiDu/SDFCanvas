!function(t){var e={};function r(s){if(e[s])return e[s].exports;var i=e[s]={i:s,l:!1,exports:{}};return t[s].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=t,r.c=e,r.d=function(t,e,s){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(s,i,function(e){return t[e]}.bind(null,i));return s},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";r.r(e);class s{constructor(t,e,r,s,i,n,o,a,h){this.data=new Float64Array(9);for(let t=0;t<9;t++)this.data[t]=arguments[t]}static make(t){const e=new Float64Array(9);for(let r=0;r<9;r++)e[r]=r<t.length?t[r]:0;return new s(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8])}static translate(t,e){return new s(1,0,0,0,1,0,t,e,1)}static rotate(t){return new s(Math.cos(t),-Math.sin(t),0,Math.sin(t),Math.cos(t),0,0,0,1)}static zoom(t){return new s(t,0,0,0,t,0,0,0,1)}det(){return this.pos(0,0)*this.pos(1,1)*this.pos(2,2)+this.pos(0,1)*this.pos(1,2)*this.pos(2,0)+this.pos(0,2)*this.pos(1,0)*this.pos(2,1)-this.pos(0,2)*this.pos(1,1)*this.pos(2,0)-this.pos(0,0)*this.pos(1,2)*this.pos(2,1)-this.pos(0,1)*this.pos(1,0)*this.pos(2,2)}inverseMatrix(){return console.log("det : "+this.det()),this.adjugateMatrix().divideByNumber(this.det())}transposeMatrix(){return new s(this.pos(0,0),this.pos(1,0),this.pos(2,0),this.pos(0,1),this.pos(1,1),this.pos(2,1),this.pos(0,2),this.pos(1,2),this.pos(2,2))}minor(t,e){let r=new Float64Array(4),s=0;for(let i=0;i<3;i++)if(i!=t)for(let t=0;t<3;t++)t!=e&&(r[s]=this.pos(i,t),s++);return console.log("minor :  [ "+r.toString()+" ] "),r[0]*r[3]-r[1]*r[2]}cofactor(t,e){let r=t+e;return this.minor(t,e)*(r%2==1?-1:1)}adjugateMatrix(){return new s(this.cofactor(0,0),this.cofactor(1,0),this.cofactor(2,0),this.cofactor(0,1),this.cofactor(1,1),this.cofactor(2,1),this.cofactor(0,2),this.cofactor(1,2),this.cofactor(2,2))}add(t){let e=new Float64Array(9);for(let r=0;r<9;r++)e[r]=this.data[r]+t.data[r]}multiplyMatrix(t){let e=new Float64Array(9);for(let r=0;r<3;r++)for(let i=0;i<3;i++)e[3*r+i]=s.dotProduct(this.row(r),t.col(i));return s.make(e)}multiplyNumber(t){return s.make(this.data.map(e=>e*t))}divideByNumber(t){return s.make(this.data.map(e=>e/t))}row(t){return[this.data[3*t],this.data[3*t+1],this.data[3*t+2]]}col(t){return[this.data[t],this.data[3+t],this.data[6+t]]}pos(t,e){return this.data[3*t+e]}static dotProduct(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]}toString(){return"["+this.row(0)+"\n"+this.row(1)+"\n"+this.row(2)+"]"}}s.Unit=new s(1,0,0,0,1,0,0,0,1);class i{constructor(t,e){this.min=t,this.max=e,t[0]=Math.max(t[0],-1),t[1]=Math.max(t[1],-1),e[0]=Math.min(e[0],1),e[1]=Math.min(e[1],1)}expand(t){return new i([this.min[0]-t,this.min[1]-t],[this.max[0]+t,this.max[1]+t])}static form(t,e){let[r,s,n,o]=[t.x,e.x,t.y,e.y];return r>s&&([r,s]=[s,r]),n>o&&([n,o]=[o,n]),new i([r-1,n-1],[s+1,o+1])}}function n(t){return Math.sqrt(t.x*t.x+t.y*t.y)}function o(t,e){return t.x*e.x+t.y*e.y}function a(t,e){let r=t.x-e.x,s=t.y-e.y;return r*r+s*s}function h(t,e){return Math.sqrt(a(t,e))}class c{constructor(t){this.id=t}asdf(t){return this.sdf(new u(t[0],t[1]))}aabb(){return new i([-1,-1],[1,1])}}class u extends c{constructor(t,e){super("Dot"),this.x=t,this.y=e}sdf(t){return h(this,t)}center(){return this}static toDot(t){return new u(t.x,t.y)}aabb(){return new i([this.x-1,this.y-1],[this.x+1,this.y+1])}}u.origin=new u(0,0);class l{constructor(t,e){this.x=t,this.y=e}static form(t,e){let r=e.x-t.x,s=e.y-t.y;return new l(r,s)}length(){return n(this)}static toVector(t){return new l(t.x,t.y)}}class d extends c{constructor(t,e){super("Segment"),this.a=t,this.b=e}form(t,e){return new d(t,u.toDot(function(t,e,r){return{x:r(t.x,e.x),y:r(t.y,e.y)}}(t,e,(t,e)=>t+e)))}length(){return h(this.a,this.b)}aabb(){return i.form(this.a,this.b)}sdf(t){let e=a(t,this.a),r=a(t,this.b),s=a(this.a,this.b);return(e-r+s)*(r-e+s)<=0?Math.sqrt(Math.min(e,r)):Math.abs(f._dd(this.a,this.b).sdf(t))}}class f extends c{constructor(t,e,r){super("Line"),this.A=t,this.B=e,this.C=r}sdf(t){return this.takein(t)/n({x:this.A,y:this.B})}takein(t){return this.A*t.x+this.B*t.y+this.C}static _dn(t,e){return new f(e.x,e.y,-o(t,e))}static _da(t,e){return new f(-e.y,e.x,-o(t,e))}static _dd(t,e){return this._da(t,l.form(t,e))}static _dk(t,e){return this._kb(e,-e*t.y+t.x)}static _kb(t,e){return new f(1,-t,e)}}class p extends c{constructor(t,e){super("Capsule"),this.segment=t,this.radius=e}sdf(t){return this.segment.sdf(t)-this.radius}aabb(){return this.segment.aabb().expand(this.radius)}}let m=(t,e)=>{if("number"==typeof e)return"number"==typeof t?new u(t,e):new class extends c{constructor(t,e){super("Circle"),this.center=t,this.radius=e}sdf(t){return this.center.sdf(t)-this.radius}aabb(){return this.center.aabb().expand(this.radius)}}(t,e);if(t instanceof u)return new d(t,e);throw"helper function _() cannot call upon (a : number, b: Dot)"},x=(t,e)=>m(t,e);function y(t,e,r){return Math.max(t,Math.min(r,e))}function b(t,e,r){return r=y(0,1,r=(r-t)/(e-t))}class w{constructor(t,e,r){this.R=t,this.G=e,this.B=r}}class M{static Normal(t,e){return e}static Multiply(t,e){return t*e/255}static Screen(t,e){return 255-(255-t)*(255-e)/255}static Overlay(t,e){return t<127.5?2*t*e/255:255-2*(255-t)*(255-e)/255}}function g(t,e,r,s,i){let n=(t,e)=>y(0,255,i(t,e)),o=[r.R,r.G,r.B];for(let r=0;r<3;r++){let i=n(t[4*e],o[r]);t[4*e+r]*=1-s,t[4*e+r]+=i*s}t[4*e+3]=255}class v{constructor(t,e,r){this.ctx=t,this.width=e,this.height=r,this.axison=!0}axis(){const[t,e]=[this.width,this.height];this.ctx.fillStyle="#e51c23",this.ctx.fillRect(Math.floor(.5*t)-1,0,2,e),this.ctx.fillRect(0,Math.floor(.5*e)-1,t,2);const[r,s,i]=[1,.005,20];for(let n=0;n<=i;n++)this.ctx.fillRect(Math.floor(t*(.5-s)),Math.floor(n*(e/i)-r/2),Math.floor(2*t*s),r),this.ctx.fillRect(Math.floor(n*(t/i)-r/2),Math.floor(e*(.5-s)),r,Math.floor(2*e*s))}toRelXY(t){const[e,r]=t;return[this.toRelX(e),this.toRelY(r)]}toRelX(t){const e=.5*this.width;return(t-e)/e}toRelY(t){const e=.5*this.height;return(e-t)/e}toAbsXY(t){const[e,r]=t,[s,i]=[.5*this.width,.5*this.height];return[e*s+s,i-i*r]}renderSDF(t){const[e,r]=[this.width,this.height];let s=this.ctx.getImageData(0,0,e,r),i=s.data;i.fill(255);for(let r of t){console.log(r);let t,s,[n,o]=this.toAbsXY(r.aabb().min),[a,h]=this.toAbsXY(r.aabb().max);n=Math.floor(n),o=Math.floor(o),a=Math.ceil(a),h=Math.ceil(h);let c=new w(255*Math.random(),255*Math.random(),255*Math.random());for(let u=h;u<o;u++){s=this.toRelY(u);for(let o=n;o<a;o++){t=this.toRelX(o);let n=r.sdf(x(t,s));g(i,u*e+o,c,n=1-b(-.001,.001,n),M.Multiply)}}}this.ctx.putImageData(s,0,0),this.axison&&this.axis()}}!function(){console.log("main loaded");let t=function(t){return document.getElementById(t)}("cvs"),e=function(t){const e=t.width,r=t.height;let s=t.getContext("2d");return s.imageSmoothingEnabled=!1,new v(s,e,r)}(t),r=[];r.push(new p(x(x(0,0),x(.2,.1)),.12)),r.push(x(x(-.5,0),.12)),r.push(x(x(-.25,.1),.25)),document.getElementById("save").addEventListener("click",()=>{!function(t){let e=t.toDataURL();console.log(e)}(t)}),document.getElementById("do").addEventListener("click",()=>{e.renderSDF(r)});let s=document.getElementById("axis");s.addEventListener("change",t=>e.axison=s.checked),e.renderSDF(r)}()}]);
//# sourceMappingURL=app.js.map