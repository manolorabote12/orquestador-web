import{N as C,h as a,Q as y,R as f,n as k}from"./index-D6Md88pq.js";const x="https://manolorabote12.github.io/orquestador-web".replace(/\/$/,""),E=["Más fácil al principio","Más rápido","Más enemigos","Otro color de fondo","Música más épica","Más premios"];function h(e,o,n){const t=a("textarea",{rows:"3",maxlength:"400",placeholder:"¿Qué cambiarías? Ej.: el salto es muy corto","aria-label":"Qué cambiarías del juego"}),i=a("div",{class:"chips desliza",role:"list"},...E.map(l=>a("button",{class:"chip",type:"button",onclick:()=>{t.value=t.value?`${t.value}. ${l}`:l,t.focus()}},l))),s=()=>u.remove(),p=a("button",{class:"btn btn-brass",type:"button",onclick:()=>{const l=t.value.trim();if(!l){t.focus();return}const b=Math.floor(o/60),m=o>5?` (lo he visto jugando, al minuto ${b}:${String(Math.floor(o%60)).padStart(2,"0")})`:"";s(),n(),e.pedirCambio?.(l+m)}},"Enviar a Chispa"),u=a("div",{class:"player-cambio",role:"dialog","aria-label":"Pedir un cambio"},a("strong",{},"Pedir un cambio"),a("p",{class:"muted small"},"Chispa te dirá lo que cuesta antes de hacer nada."),t,i,a("div",{class:"btn-row"},a("button",{class:"btn btn-line",type:"button",onclick:s},"Seguir jugando"),p));return setTimeout(()=>t.focus(),30),u}function j(e,o){return`<!doctype html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
<style>
html,body{margin:0;height:100%;background:#0b0f1a;overflow:hidden;touch-action:none}
#canvas{display:block;width:100%;height:100%;outline:none}
#carga{position:fixed;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;color:#e8f0fa;font:600 15px system-ui,sans-serif}
#barra{width:min(260px,70vw);height:10px;border-radius:6px;background:#16233a;overflow:hidden}
#barra i{display:block;height:100%;width:0;background:#e8b04b;transition:width .2s}
#error{color:#ff8a7a;max-width:80vw;text-align:center;display:none}
</style></head><body>
<canvas id="canvas" tabindex="0">Tu dispositivo no puede mostrar el juego.</canvas>
<div id="carga"><span id="txt">Cargando el motor...</span><div id="barra"><i></i></div><span id="error"></span></div>
<script>
(function(){
var D=${JSON.stringify({motor:e.replace(/\/+$/,""),pck:o}).replace(/</g,"\\u003c")};
var carga=document.getElementById("carga"),txt=document.getElementById("txt"),barra=document.querySelector("#barra i"),err=document.getElementById("error");
function avisar(m){parent.postMessage({orq:"jugador",estado:m},"*");}
function fallo(m){err.style.display="block";err.textContent=m;txt.textContent="No se pudo abrir";avisar("error");}
var s=document.createElement("script");
s.src=D.motor+"/index.js";
s.onerror=function(){fallo("No se pudo descargar el motor del juego. Revisa tu conexión.");};
s.onload=function(){
  if(typeof Engine==="undefined"){fallo("Motor no valido.");return;}
  if(!Engine.isWebGLAvailable(2)){fallo("Tu dispositivo no tiene WebGL 2.");return;}
  var e=new Engine({executable:D.motor+"/index",mainPack:D.pck,canvasResizePolicy:2,args:[],
    ensureCrossOriginIsolationHeaders:false,focusCanvas:true,experimentalVK:false});
  txt.textContent="Cargando tu juego...";
  // Sin tamaño conocido (descarga comprimida) la barra no se movía y parecía colgado: se enseñan los MB.
  var ultimo="",mb=0,listo=false;
  var vigia=setTimeout(function(){if(!listo){fallo("El juego no ha arrancado en 45 s"+(mb?" ("+mb+" MB descargados)":" (no ha descargado nada)")+(ultimo?": "+ultimo:"."));avisar("lento");}},45000);
  e.startGame({onProgress:function(a,t){mb=Math.round(a/1048576);if(t>0)barra.style.width=Math.round(100*a/t)+"%";else txt.textContent="Cargando tu juego... "+mb+" MB";},
    onPrintError:function(){ultimo=Array.prototype.join.call(arguments," ").slice(0,160);}})
   .then(function(){listo=true;clearTimeout(vigia);carga.style.display="none";avisar("listo");})
   .catch(function(x){listo=true;clearTimeout(vigia);fallo(String(x&&x.message||x)+(ultimo?" — "+ultimo:""));});
};
document.head.appendChild(s);
})();
<\/script></body></html>`}function S(e){if(C.isNativePlatform()&&e.motor&&e.pck&&x){if(!e.pedirCambio)return w(e);const r=Date.now(),d=e.alCerrar;return w({...e,alCerrar:()=>{d?.(),Date.now()-r>8e3&&document.body.append(h(e,(Date.now()-r)/1e3,()=>{}))}})}const o=document.activeElement;let n=!1;const t=()=>{n||(n=!0,window.removeEventListener("message",g),document.removeEventListener("keydown",v),c.remove(),y(!1),o?.focus(),e.alCerrar?.())},i=a("button",{class:"player-close","aria-label":"Cerrar el juego",onclick:()=>t()},"✕"),s=a("span",{class:"player-state"},""),p=e.siguiente?a("button",{class:"player-next",type:"button",onclick:()=>{const r=e.siguiente;t(),r()}},"Siguiente ▸"):null,u=Date.now(),l=e.pedirCambio?a("button",{class:"player-next",type:"button","aria-label":"Pedir un cambio del juego",onclick:()=>{c.querySelector(".player-cambio")||c.append(h(e,(Date.now()-u)/1e3,t))}},"✎ Pedir un cambio"):null,b=a("div",{class:"player-bar"},a("strong",{},e.titulo),s,l,p,i);let m;if(e.motor&&e.pck){const r=a("iframe",{class:"player-frame",title:`Jugar a ${e.titulo}`,allow:"autoplay; fullscreen; gamepad"});r.srcdoc=j(e.motor,e.pck),r.addEventListener("load",()=>r.contentWindow?.focus()),m=r}else m=a("div",{class:"player-demo"},e.portada?a("img",{src:e.portada,alt:""}):null,a("p",{},"Aquí se abre tu juego al instante, sin instalar nada."),a("p",{class:"muted"},e.motor?"Esta versión aún no tiene paquete web. El próximo cambio lo creará.":"En la demostración no hay motor conectado: con tu servidor se juega de verdad."));const c=a("div",{class:"player",role:"dialog","aria-modal":"true","aria-label":`Jugando a ${e.titulo}`},b,m);function g(r){const d=r.data;!d||d.orq!=="jugador"||(s.textContent=d.estado==="error"||d.estado==="lento"?"error":"",c.dataset.estado=d.estado??"",(d.estado==="error"||d.estado==="lento")&&e.web&&!c.querySelector(".player-web")&&b.insertBefore(a("button",{class:"btn btn-brass btn-small player-web",type:"button",onclick:()=>{k(e.web)}},"Abrir en el navegador"),i))}function v(r){r.key==="Escape"&&t()}return window.addEventListener("message",g),document.addEventListener("keydown",v),document.body.append(c),y(!0),i.focus(),t}function w(e){let o=!1,n=null;const t=()=>{o||(o=!0,n?.(),e.alCerrar?.())};f.addListener("browserFinished",t).then(s=>{n=()=>void s.remove(),o&&n()});const i=encodeURIComponent(JSON.stringify({p:e.pck,t:e.titulo}));return f.open({url:`${x}/juego.html#${i}`,toolbarColor:"#0b0f1a"}).catch(()=>t()),()=>{f.close().catch(()=>{}),t()}}function $(e,o,n){const t=document.activeElement,i=()=>{document.removeEventListener("keydown",c),m.remove(),t?.focus()},s=a("button",{class:"player-close","aria-label":"Cerrar el clip",onclick:()=>i()},"✕"),p=a("div",{class:"player-bar"},a("strong",{},`Clip de ${o}`),s),u=a("video",{class:"clip-video",src:e,controls:"",autoplay:"",loop:"",playsinline:""});u.muted=!0,n&&(u.poster=n);const l=o.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"_")+"_clip.mp4",b=a("div",{class:"clip-foot"},a("p",{class:"muted small"},"15 s en vertical 1080×1920. Listo para TikTok, YouTube Shorts e Instagram Reels."),a("a",{class:"btn btn-brass",href:e,download:l,target:"_blank",rel:"noopener"},"Descargar el clip")),m=a("div",{class:"player",role:"dialog","aria-modal":"true","aria-label":`Clip de ${o}`},p,a("div",{class:"clip-stage"},u),b);function c(g){g.key==="Escape"&&i()}return document.addEventListener("keydown",c),document.body.append(m),s.focus(),i}export{S as a,$ as b};
