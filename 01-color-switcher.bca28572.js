const e=document.querySelector("body"),t=document.querySelector("[data-start]"),a=document.querySelector("[data-stop]");let d=null;a.disabled=!0,t.addEventListener("click",(t=>{t.target.disabled=!0,a.disabled=!1,d=setInterval((()=>{e.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3)})),a.addEventListener("click",(e=>{e.target.disabled=!0,t.disabled=!1,clearInterval(d)}));
//# sourceMappingURL=01-color-switcher.bca28572.js.map
