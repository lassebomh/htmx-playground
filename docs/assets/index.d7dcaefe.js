(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const o of l)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function n(l){const o={};return l.integrity&&(o.integrity=l.integrity),l.referrerpolicy&&(o.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?o.credentials="include":l.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(l){if(l.ep)return;l.ep=!0;const o=n(l);fetch(l.href,o)}})();function $(){}function pe(e){return e()}function re(){return Object.create(null)}function T(e){e.forEach(pe)}function Q(e){return typeof e=="function"}function te(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function ke(e){return Object.keys(e).length===0}function ne(e,...t){if(e==null)return $;const n=e.subscribe(...t);return n.unsubscribe?()=>n.unsubscribe():n}function R(e){let t;return ne(e,n=>t=n)(),t}function W(e,t,n){e.$$.on_destroy.push(ne(t,n))}function q(e,t,n){return e.set(n),t}function je(e){return e&&Q(e.destroy)?e.destroy:$}function w(e,t){e.appendChild(t)}function M(e,t,n){e.insertBefore(t,n||null)}function A(e){e.parentNode&&e.parentNode.removeChild(e)}function Se(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function S(e){return document.createElement(e)}function le(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function me(e){return document.createTextNode(e)}function O(){return me(" ")}function $e(){return me("")}function P(e,t,n,r){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)}function p(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function Le(e){return Array.from(e.childNodes)}function z(e,t,n){e.classList[n?"add":"remove"](t)}let V;function H(e){V=e}function Ae(){if(!V)throw new Error("Function called outside component initialization");return V}function be(e){Ae().$$.on_mount.push(e)}const x=[],G=[],B=[],se=[],Ee=Promise.resolve();let Y=!1;function Oe(){Y||(Y=!0,Ee.then(ge))}function Z(e){B.push(e)}const X=new Set;let U=0;function ge(){const e=V;do{for(;U<x.length;){const t=x[U];U++,H(t),Me(t.$$)}for(H(null),x.length=0,U=0;G.length;)G.pop()();for(let t=0;t<B.length;t+=1){const n=B[t];X.has(n)||(X.add(n),n())}B.length=0}while(x.length);for(;se.length;)se.pop()();Y=!1,X.clear(),H(e)}function Me(e){if(e.fragment!==null){e.update(),T(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(Z)}}const J=new Set;let N;function Te(){N={r:0,c:[],p:N}}function Ie(){N.r||T(N.c),N=N.p}function D(e,t){e&&e.i&&(J.delete(e),e.i(t))}function ee(e,t,n,r){if(e&&e.o){if(J.has(e))return;J.add(e),N.c.push(()=>{J.delete(e),r&&(n&&e.d(1),r())}),e.o(t)}else r&&r()}function qe(e){e&&e.c()}function _e(e,t,n,r){const{fragment:l,after_update:o}=e.$$;l&&l.m(t,n),r||Z(()=>{const u=e.$$.on_mount.map(pe).filter(Q);e.$$.on_destroy?e.$$.on_destroy.push(...u):T(u),e.$$.on_mount=[]}),o.forEach(Z)}function ve(e,t){const n=e.$$;n.fragment!==null&&(T(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function Ne(e,t){e.$$.dirty[0]===-1&&(x.push(e),Oe(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function we(e,t,n,r,l,o,u,i=[-1]){const a=V;H(e);const s=e.$$={fragment:null,ctx:[],props:o,update:$,not_equal:l,bound:re(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(a?a.$$.context:[])),callbacks:re(),dirty:i,skip_bound:!1,root:t.target||a.$$.root};u&&u(s.root);let d=!1;if(s.ctx=n?n(e,t.props||{},(_,k,...h)=>{const m=h.length?h[0]:k;return s.ctx&&l(s.ctx[_],s.ctx[_]=m)&&(!s.skip_bound&&s.bound[_]&&s.bound[_](m),d&&Ne(e,_)),k}):[],s.update(),d=!0,T(s.before_update),s.fragment=r?r(s.ctx):!1,t.target){if(t.hydrate){const _=Le(t.target);s.fragment&&s.fragment.l(_),_.forEach(A)}else s.fragment&&s.fragment.c();t.intro&&D(e.$$.fragment),_e(e,t.target,t.anchor,t.customElement),ge()}H(a)}class ye{$destroy(){ve(this,1),this.$destroy=$}$on(t,n){if(!Q(n))return $;const r=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return r.push(n),()=>{const l=r.indexOf(n);l!==-1&&r.splice(l,1)}}$set(t){this.$$set&&!ke(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const C=[];function Pe(e,t){return{subscribe:K(e,t).subscribe}}function K(e,t=$){let n;const r=new Set;function l(i){if(te(e,i)&&(e=i,n)){const a=!C.length;for(const s of r)s[1](),C.push(s,e);if(a){for(let s=0;s<C.length;s+=2)C[s][0](C[s+1]);C.length=0}}}function o(i){l(i(e))}function u(i,a=$){const s=[i,a];return r.add(s),r.size===1&&(n=t(l)||$),i(e),()=>{r.delete(s),r.size===0&&(n(),n=null)}}return{set:l,update:o,subscribe:u}}function Ce(e,t,n){const r=!Array.isArray(e),l=r?[e]:e,o=t.length<2;return Pe(n,u=>{let i=!1;const a=[];let s=0,d=$;const _=()=>{if(s)return;d();const h=t(r?a[0]:a,u);o?u(h):d=Q(h)?h:$},k=l.map((h,m)=>ne(h,j=>{a[m]=j,s&=~(1<<m),i&&_()},()=>{s|=1<<m}));return i=!0,_(),function(){T(k),d()}})}const Fe=`<script src="./js/nunjucks.js"><\/script>
<script src="./js/pollyjs-core.js"><\/script>
<script src="./js/pollyjs-adapter-fetch.js"><\/script>
<script src="./js/pollyjs-adapter-xhr.js"><\/script>
<script>
    const fileContents = {};
    files.forEach(file => fileContents[file.filename] = file.contents);

    function readFile(filename) {
        return fileContents[filename]
    }

    let TemplateLoader = {
        getSource: (name) => ({
            src: readFile(name),
            path: name
        })
    }
    var templates = new nunjucks.Environment(TemplateLoader, {
        autoescape: false
    })

    function render(request, template, context) {
        let out = templates.render(template, {...context, request})
        return new Response(out)
    }

    const { Polly } = window['@pollyjs/core'];

    Polly.register(window['@pollyjs/adapter-fetch']);
    Polly.register(window['@pollyjs/adapter-xhr']);

    const polly = new Polly('sandbox-server', {
        adapters: ['fetch', 'xhr'],
        mode: "passthrough",
        logging: true,
    });

    const server = polly.server;
    
    const on = {};

    ['get','put','post','patch','delete','merge','head','options'].forEach((method) => {
        on[method] = (route, handler) => {
            let parsedRoute = route.replaceAll(/\\/<([^>]+)>/gm, (_, m) => "/:"+m)
            server[method](parsedRoute).intercept(async (req, res) => {
                // var request = new Request(req.url, {})
                var response = await handler(req, ...Object.values(req.params))

                if (!response) throw new Error("Handler returned no response!")

                for (const [k,v] of response.headers.entries()) {
                    res.setHeader(k,v);
                }
                
                res.status(response.status)
                   .send(await response.text());
            });
        }
    })
        
    eval(readFile('server.js'))
<\/script>`,xe=`
const movies = [
    "The Shawshank Redemption",
    "The Godfather",
    "The Dark Knight",
    "The Godfather Part II",
    "12 Angry Men",
    "Schindler's List",
    "The Lord of the Rings: The Return of the King",
    "Pulp Fiction",
];

let i = 0

on.post("/movie", (request) => {
    i = (i+1) % movies.length
    return new Response(movies[i])
})
`,Re=`<html lang="en">
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css">
    <script src="https://unpkg.com/htmx.org@1.8.4"><\/script>
</head>
<body>
    <h1>Basic example</h1>
    <button hx-post="/movie" hx-swap="innerHTML">
        Get Movie
    </button>
</body>
</html>`;function ie(e,t,n,r){var l,o,u=!1,i="withOld"in n,a=(b,v)=>{if(l=v,i&&(o=b),!u){let L=t(b,v);if(t.length<2)v(L);else return L}u=!1},s=Ce(e,a,r),d=!Array.isArray(e),_=b=>{d?(u=!0,e.set(b)):b.forEach((v,L)=>{u=!0,e[L].set(v)}),u=!1};i&&(n=n.withOld);var k=n.length>=(i?3:2),h=null;function m(b){if(h&&(h(),h=null),i)var v=n(b,o,_);else var v=n(b,_);k?typeof v=="function"&&(h=v):_(v)}var j=!1;function E(b){var v,L,I,g;if(j){g=b(R(s)),l(g);return}var c=s.subscribe(f=>{j?v?L=!0:v=!0:I=f});g=b(I),j=!0,l(g),c(),j=!1,L&&(g=R(s)),v&&m(g)}return{subscribe:s.subscribe,set(b){E(()=>b)},update:E}}function oe(e,t){if(Array.isArray(t)){let n=t.concat();return ie(e,r=>{for(let l=0;l<n.length;++l)r=r[n[l]];return r},{withOld(r,l){let o=l;for(let u=0;u<n.length-1;++u)o=o[n[u]];return o[n[n.length-1]]=r,l}})}else return ie(e,n=>n[t],{withOld(n,r){return r[t]=n,r}})}function He(e){let t;return{c(){t=S("div"),p(t,"class","svelte-x08koq")},m(n,r){M(n,t,r),e[2](t)},p:$,i:$,o:$,d(n){n&&A(t),e[2](null)}}}function De(e,t,n){let{file:r}=t,l=oe(r,"filename"),o=oe(r,"contents"),u,i;be(()=>{i=ace.edit(u),i.setOptions({fontSize:"12pt",indentedSoftWrap:!0,theme:"ace/theme/monokai"}),i.session.on("change",()=>{o.set(i.session.getValue())}),i.session.on("changeMode",function(s,d){d.getMode().$id==="ace/mode/javascript"&&d.$worker&&d.$worker.send("setOptions",[{esversion:9,esnext:!1}])}),i.session.setValue(R(o)),l.subscribe(s=>{if(i&&l){const d={js:"ace/mode/javascript",html:"ace/mode/nunjucks"};i.session.setMode(d[R(l).split(".").pop()]),i.session.setValue(R(o))}})});function a(s){G[s?"unshift":"push"](()=>{u=s,n(0,u)})}return e.$$set=s=>{"file"in s&&n(1,r=s.file)},[u,r,a]}class Ve extends ye{constructor(t){super(),we(this,t,De,He,te,{file:1})}}function ue(e,t,n){const r=e.slice();return r[11]=t[n],r[20]=t,r[21]=n,r}function ce(e){let t,n,r,l,o=e[0],u=[];for(let i=0;i<o.length;i+=1)u[i]=fe(ue(e,o,i));return{c(){for(let i=0;i<u.length;i+=1)u[i].c();t=O(),n=S("button"),n.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg svelte-bdhumh" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"></path></svg>',p(n,"class","new-file-button svelte-bdhumh")},m(i,a){for(let s=0;s<u.length;s+=1)u[s].m(i,a);M(i,t,a),M(i,n,a),r||(l=P(n,"click",e[8]),r=!0)},p(i,a){if(a&519){o=i[0];let s;for(s=0;s<o.length;s+=1){const d=ue(i,o,s);u[s]?u[s].p(d,a):(u[s]=fe(d),u[s].c(),u[s].m(t.parentNode,t))}for(;s<u.length;s+=1)u[s].d(1);u.length=o.length}},d(i){Se(u,i),i&&A(t),i&&A(n),r=!1,l()}}}function ae(e){let t,n,r,l,o,u,i,a,s;function d(){e[12].call(n,e[20],e[21])}function _(...h){return e[13](e[21],...h)}function k(...h){return e[14](e[21],...h)}return{c(){t=S("button"),n=S("div"),r=O(),l=S("button"),o=le("svg"),u=le("path"),p(n,"spellcheck","false"),p(n,"class","filename-input svelte-bdhumh"),p(n,"type","text"),p(n,"contenteditable","true"),e[11].filename===void 0&&Z(d),p(u,"d","M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"),p(o,"xmlns","http://www.w3.org/2000/svg"),p(o,"width","20"),p(o,"height","20"),p(o,"fill","currentColor"),p(o,"class","bi bi-x svelte-bdhumh"),p(o,"viewBox","0 0 16 16"),p(l,"class","delete-file-button svelte-bdhumh"),l.disabled=i=e[11].builtin,p(t,"class","tab svelte-bdhumh"),z(t,"builtin",e[11].builtin),z(t,"active",e[21]==e[1])},m(h,m){M(h,t,m),w(t,n),e[11].filename!==void 0&&(n.innerHTML=e[11].filename),w(t,r),w(t,l),w(l,o),w(o,u),a||(s=[P(n,"input",d),je(e[4].call(null,n)),P(l,"click",_),P(t,"click",k)],a=!0)},p(h,m){e=h,m&1&&e[11].filename!==n.innerHTML&&(n.innerHTML=e[11].filename),m&1&&i!==(i=e[11].builtin)&&(l.disabled=i),m&1&&z(t,"builtin",e[11].builtin),m&2&&z(t,"active",e[21]==e[1])},d(h){h&&A(t),a=!1,T(s)}}}function fe(e){let t,n=(e[2]||e[11].filename[0]!=".")&&ae(e);return{c(){n&&n.c(),t=$e()},m(r,l){n&&n.m(r,l),M(r,t,l)},p(r,l){r[2]||r[11].filename[0]!="."?n?n.p(r,l):(n=ae(r),n.c(),n.m(t.parentNode,t)):n&&(n.d(1),n=null)},d(r){n&&n.d(r),r&&A(t)}}}function de(e){let t,n;return t=new Ve({props:{file:e[11]}}),{c(){qe(t.$$.fragment)},m(r,l){_e(t,r,l),n=!0},p:$,i(r){n||(D(t.$$.fragment,r),n=!0)},o(r){ee(t.$$.fragment,r),n=!1},d(r){ve(t,r)}}}function ze(e){let t,n,r,l,o,u,i,a,s,d,_,k,h,m,j,E,b,v,L,I,g=e[0]&&ce(e),c=e[0]&&de(e);return{c(){t=S("div"),n=S("div"),g&&g.c(),r=O(),l=S("div"),o=S("div"),u=S("label"),u.textContent="Show hidden files",i=O(),a=S("input"),s=O(),d=S("button"),d.textContent="Reload",_=O(),k=S("button"),k.textContent="Save",h=O(),m=S("main"),j=S("div"),c&&c.c(),E=O(),b=S("iframe"),p(n,"class","tabs svelte-bdhumh"),p(u,"for","show-hidden-files-checkbox"),p(a,"id","show-hidden-files-checkbox"),p(a,"type","checkbox"),p(o,"class","show-hidden-files svelte-bdhumh"),p(d,"class","reload-button svelte-bdhumh"),p(k,"class","save-button svelte-bdhumh"),p(l,"class","utilities svelte-bdhumh"),p(t,"class","editor-topbar svelte-bdhumh"),p(j,"class","editor-container svelte-bdhumh"),p(b,"title","Sandbox"),p(b,"frameborder","0"),p(b,"sandbox","allow-scripts"),p(b,"class","svelte-bdhumh"),p(m,"class","svelte-bdhumh")},m(f,y){M(f,t,y),w(t,n),g&&g.m(n,null),w(t,r),w(t,l),w(l,o),w(o,u),w(o,i),w(o,a),a.checked=e[2],w(l,s),w(l,d),w(l,_),w(l,k),M(f,h,y),M(f,m,y),w(m,j),c&&c.m(j,null),w(m,E),w(m,b),e[16](b),v=!0,L||(I=[P(a,"change",e[15]),P(d,"click",e[10]),P(k,"click",e[7])],L=!0)},p(f,[y]){f[0]?g?g.p(f,y):(g=ce(f),g.c(),g.m(n,null)):g&&(g.d(1),g=null),y&4&&(a.checked=f[2]),f[0]?c?(c.p(f,y),y&1&&D(c,1)):(c=de(f),c.c(),D(c,1),c.m(j,null)):c&&(Te(),ee(c,1,1,()=>{c=null}),Ie())},i(f){v||(D(c),v=!0)},o(f){ee(c),v=!1},d(f){f&&A(t),g&&g.d(),f&&A(h),f&&A(m),c&&c.d(),e[16](null),L=!1,T(I)}}}function he(){const e=window.location.hash.substring(1).split(":");if(e.length!=2)throw new Error("No playground id");return{schema:e[0],id:atob(e[1])}}function Ue(e,t){window.location.hash="#"+e+":"+btoa(t)}function Be(e,t,n){let r,l,o,u=!1,i,a=K(null);W(e,a,c=>n(1,l=c));let s=K(null);W(e,s,c=>n(0,r=c));let d=K(null);W(e,d,c=>n(17,o=c));function _(){let c,f;try{let y=he();c=y.schema,f=y.id}catch{c="local",f=crypto.randomUUID().replaceAll("-",""),Ue(c,f)}switch(c){case"local":localStorage.setItem(f,JSON.stringify(r));break;default:throw new Error("Unknown save schema")}}function k(){const{schema:c,id:f}=he();switch(c){case"local":q(s,r=JSON.parse(localStorage.getItem(f)),r);break;case"url":q(s,r=JSON.parse(localStorage.getItem(f)),r);break;default:throw new Error("Unknown load schema")}if(r==null)throw new Error("Failed to load playground");q(a,l=r.findIndex(y=>y.filename=="server.js"),l)}document.addEventListener("keypress",c=>{c.ctrlKey&&c.key==="z"&&(c.stopPropagation(),c.preventDefault(),j())});function h(){s.set([...r,{filename:"partial.html",contents:"",builtin:!1}]),a.set(r.length-1)}function m(c){let f=c;for(console.log(r[f]);!r[f]||f==c||!u&&r[f].filename[0]==".";)f--;a.set(f),s.set(r.filter((y,F)=>F!==c))}function j(){n(3,i.srcdoc="",i);let c=r.find(F=>F.filename==".loader.html").contents,f=r.find(F=>F.filename=="index.html").contents,y="<script> const files = "+JSON.stringify(r).replaceAll("/","\\/")+`<\/script>
`;n(3,i.srcdoc=y+c+f,i)}let E=c=>{};be(async()=>{setTimeout(()=>{n(4,E=c=>{c.focus(),document.execCommand("selectAll",!1,null)})},500);try{k()}catch{q(a,l=0,l),q(s,r=[{filename:"server.js",contents:xe,builtin:!0},{filename:"index.html",contents:Re,builtin:!0},{filename:".loader.html",contents:Fe,builtin:!0}],r)}j()});function b(c,f){c[f].filename=this.innerHTML,s.set(r)}const v=(c,f)=>m(c),L=(c,f)=>q(a,l=c,l);function I(){u=this.checked,n(2,u)}function g(c){G[c?"unshift":"push"](()=>{i=c,n(3,i)})}return e.$$.update=()=>{e.$$.dirty&3&&r!=null&&l!=null&&q(d,o=r[l],o)},[r,l,u,i,E,a,s,_,h,m,j,d,b,v,L,I,g]}class Je extends ye{constructor(t){super(),we(this,t,Be,ze,te,{})}}nunjucks.configure("views",{autoescape:!1});new Je({target:document.body});
