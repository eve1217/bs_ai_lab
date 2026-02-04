import"./modulepreload-polyfill.js";import{d as c}from"./dataList.js";import{g as o,S as a,a as d,M as n}from"./Mouse.js";class m{constructor({...t}){this.data=t.data,this.target=document.querySelector(t.target),this.setImgUrl=t.setImgUrl,this.renderHtml=t.renderHtml,this.id=o("id"),this.afterInit=t.afterInit,this.init(),this.afterInit&&typeof this.afterInit=="function"&&setTimeout(()=>{this.afterInit()},300)}setImgData(){const t=this.setImgUrl(this.selectedProject.id);this.selectedProject.imgUrl={},Object.keys(t).forEach(s=>{this.selectedProject.imgUrl[s]=t[s]})}init(){this.id?([this.selectedProject]=this.data.filter(t=>t.id===this.id),this.setImgData(),this.target.insertAdjacentHTML("beforeend",this.renderHtml(this.selectedProject))):window.location=window.location.href.replace("detail/","")}}window.addEventListener("load",()=>{new a,new m({data:c.result,target:"main",setImgUrl(e){var s,i,l,r;const t={};return{pc01:`../../images/detail_${e}_01_pc${(s=t[e])!=null&&s.pc01?t[e].pc01:""}.jpg`,mo01:`../../images/detail_${e}_01_mo${(i=t[e])!=null&&i.mo01?t[e].mo01:""}.jpg`,pc02:`../../images/detail_${e}_02_pc${(l=t[e])!=null&&l.pc02?t[e].pc02:""}.jpg`,mo02:`../../images/detail_${e}_02_mo${(r=t[e])!=null&&r.mo02?t[e].mo02:""}.jpg`}},renderHtml(e){return`<section class="width-full">
      <div class="detail pc-pb-160 mo-pb-120">
        <div class="inner-1240">
          <div class="js-scroll">
            <div class="detail__txt-box pc-pb-60 mo-pb-55">
              <h2 class="detail__title pc-pt-85 pc-pb-105 mo-pt-70 mo-pb-90 scroll-inner scroll-inner--fade">${e.title}</h2>
              <dl class="detail__info scroll-inner scroll-inner--fade scroll-inner--step01">
                <dt>Date.</dt>
                <dd>${e.date}</dd>
                <dt>Brand.</dt>
                <dd class="detail__info--space">${e.brand}</dd>
                <dt>Type.</dt>
                <dd>${e.category}</dd>
              </dl>
            </div>
          </div>
        </div>
        <!--// 상단 타이틀 -->
    
        <div class="detail__contents">
          <div class="js-scroll">
            <div class="img-box detail__img-box scroll-inner scroll-inner--fade scroll-inner--step01">
              <img src="${e.imgUrl.pc01}" alt="" class="m-hide">
              <img src="${e.imgUrl.mo01}" alt="" class="m-show">
            </div>
          </div>
          <!-- overview -->
          <div class="inner-1240 js-scroll">
            <div class="detail__overview pc-pt-120 pc-pb-100 mo-pt-100 mo-pb-90 scroll-inner scroll-inner--fade">
              <h3 class="detail__sub pc-pb-45 mo-pb-50">OVERVIEW</h3>
              <p class="detail_desc">${e.overview}</p>
            </div>
          </div>
          <!--// overview -->
          <div class="js-scroll">
            <div class="img-box detail__img-box scroll-inner scroll-inner--fade">
              <img src="${e.imgUrl.pc02}" alt="" class="m-hide">
              <img src="${e.imgUrl.mo02}" alt="" class="m-show">
            </div>
          </div>
        </div>
      </div>
    </section>`},afterInit(){const e=document.querySelectorAll(".js-scroll");Array.from(e).forEach(t=>{new d({target:t})})}}),new n});
