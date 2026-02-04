import"./modulepreload-polyfill.js";import{L as s,S as l}from"./List.js";import{d as o}from"./dataList.js";import{S as a,a as c,M as d}from"./Mouse.js";window.addEventListener("load",()=>{new a,new s({data:o.result,id:"portfolioList",setImgUrl(t){var i;const e={};return{pc:`../images/portfolio_thumb_${t}${(i=e[t])!=null&&i.pc?e[t].pc:""}.png`}},renderHtml(t){return`<li class="list__item">
        <a href="./detail/?id=${t.id}" class="list__link" data-cursor-text="View">
          <div class="img-box list__img">
            <img src="${t.imgUrl.pc}" alt="">
          </div>
          <div class="list__text">
            <p class="list__title">${t.title.replace("<br>","")}</p>
            <p class="list__data">${t.date}_${t.brand}</p>
          </div>
        </a>
      </li>`},useCategory:{id:"portfolioTab",default:"all"},usePaging:{id:"btnMore",increase:6}}),new l("#portfolioTab",{slidesPerView:"auto"});const r=document.querySelectorAll(".js-scroll");Array.from(r).forEach(t=>{new c({target:t})}),new d});
