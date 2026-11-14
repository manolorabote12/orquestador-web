import{J as y,h as a,K as f,L as b,n as h}from"./index-DRqo79Gm.js";const v="https://manolorabote12.github.io/orquestador-web".replace(/\/$/,"");function w(e,o){return`<!doctype html><html lang="es"><head><meta charset="utf-8">
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
<\/script></body></html>`}function E(e){if(y.isNativePlatform()&&e.motor&&e.pck&&v)return x(e);const o=document.activeElement;let r=!1;const n=()=>{r||(r=!0,window.removeEventListener("message",m),document.removeEventListener("keydown",p),d.remove(),f(!1),o?.focus(),e.alCerrar?.())},i=a("button",{class:"player-close","aria-label":"Cerrar el juego",onclick:()=>n()},"✕"),s=a("span",{class:"player-state"},""),g=e.siguiente?a("button",{class:"player-next",type:"button",onclick:()=>{const t=e.siguiente;n(),t()}},"Siguiente ▸"):null,c=a("div",{class:"player-bar"},a("strong",{},e.titulo),s,g,i);let u;if(e.motor&&e.pck){const t=a("iframe",{class:"player-frame",title:`Jugar a ${e.titulo}`,allow:"autoplay; fullscreen; gamepad"});t.srcdoc=w(e.motor,e.pck),t.addEventListener("load",()=>t.contentWindow?.focus()),u=t}else u=a("div",{class:"player-demo"},e.portada?a("img",{src:e.portada,alt:""}):null,a("p",{},"Aquí se abre tu juego al instante, sin instalar nada."),a("p",{class:"muted"},e.motor?"Esta versión aún no tiene paquete web. El próximo cambio lo creará.":"En la demostración no hay motor conectado: con tu servidor se juega de verdad."));const d=a("div",{class:"player",role:"dialog","aria-modal":"true","aria-label":`Jugando a ${e.titulo}`},c,u);function m(t){const l=t.data;!l||l.orq!=="jugador"||(s.textContent=l.estado==="error"||l.estado==="lento"?"error":"",d.dataset.estado=l.estado??"",(l.estado==="error"||l.estado==="lento")&&e.web&&!d.querySelector(".player-web")&&c.insertBefore(a("button",{class:"btn btn-brass btn-small player-web",type:"button",onclick:()=>{h(e.web)}},"Abrir en el navegador"),i))}function p(t){t.key==="Escape"&&n()}return window.addEventListener("message",m),document.addEventListener("keydown",p),document.body.append(d),f(!0),i.focus(),n}function x(e){let o=!1,r=null;const n=()=>{o||(o=!0,r?.(),e.alCerrar?.())};b.addListener("browserFinished",n).then(s=>{r=()=>void s.remove(),o&&r()});const i=encodeURIComponent(JSON.stringify({p:e.pck,t:e.titulo}));return b.open({url:`${v}/juego.html#${i}`,toolbarColor:"#0b0f1a"}).catch(()=>n()),()=>{b.close().catch(()=>{}),n()}}function C(e,o,r){const n=document.activeElement,i=()=>{document.removeEventListener("keydown",p),m.remove(),n?.focus()},s=a("button",{class:"player-close","aria-label":"Cerrar el clip",onclick:()=>i()},"✕"),g=a("div",{class:"player-bar"},a("strong",{},`Clip de ${o}`),s),c=a("video",{class:"clip-video",src:e,controls:"",autoplay:"",loop:"",playsinline:""});c.muted=!0,r&&(c.poster=r);const u=o.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"_")+"_clip.mp4",d=a("div",{class:"clip-foot"},a("p",{class:"muted small"},"15 s en vertical 1080×1920. Listo para TikTok, YouTube Shorts e Instagram Reels."),a("a",{class:"btn btn-brass",href:e,download:u,target:"_blank",rel:"noopener"},"Descargar el clip")),m=a("div",{class:"player",role:"dialog","aria-modal":"true","aria-label":`Clip de ${o}`},g,a("div",{class:"clip-stage"},c),d);function p(t){t.key==="Escape"&&i()}return document.addEventListener("keydown",p),document.body.append(m),s.focus(),i}export{E as a,C as b};
