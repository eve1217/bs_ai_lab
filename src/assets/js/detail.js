import dataList from './module/dataList';
import Project from './module/Project';
import StickyHeader from './module/StickyHeader';
import Scroll from './module/Scroll';
import Mouse from './module/Mouse';

window.addEventListener('load', () => {
  const header = new StickyHeader();

  const project = new Project({
    data: dataList.result,
    target: 'main',
    setImgUrl(id) {
      const imgVer = {
        // 2402: {
        //   pc01: '_v1',
        //   mo01: '_v2',
        //   pc02: '_v1',
        //   mo02: '_v2',
        // },
      };

      return {
        pc01: `../../assets/images/detail_${id}_01_pc${imgVer[id]?.pc01 ? imgVer[id].pc01 : ''}.jpg`,
        mo01: `../../assets/images/detail_${id}_01_mo${imgVer[id]?.mo01 ? imgVer[id].mo01 : ''}.jpg`,
        pc02: `../../assets/images/detail_${id}_02_pc${imgVer[id]?.pc02 ? imgVer[id].pc02 : ''}.jpg`,
        mo02: `../../assets/images/detail_${id}_02_mo${imgVer[id]?.mo02 ? imgVer[id].mo02 : ''}.jpg`,
      };
    },
    renderHtml(data) {
      return `<section class="width-full">
      <div class="detail pc-pb-160 mo-pb-120">
        <div class="inner-1240">
          <div class="js-scroll">
            <div class="detail__txt-box pc-pb-60 mo-pb-55">
              <h2 class="detail__title pc-pt-85 pc-pb-105 mo-pt-70 mo-pb-90 scroll-inner scroll-inner--fade">${data.title}</h2>
              <dl class="detail__info scroll-inner scroll-inner--fade scroll-inner--step01">
                <dt>Date.</dt>
                <dd>${data.date}</dd>
                <dt>Brand.</dt>
                <dd class="detail__info--space">${data.brand}</dd>
                <dt>Type.</dt>
                <dd>${data.category}</dd>
              </dl>
            </div>
          </div>
        </div>
        <!--// 상단 타이틀 -->
    
        <div class="detail__contents">
          <div class="js-scroll">
            <div class="img-box detail__img-box scroll-inner scroll-inner--fade scroll-inner--step01">
              <img src="${data.imgUrl.pc01}" alt="" class="m-hide">
              <img src="${data.imgUrl.mo01}" alt="" class="m-show">
            </div>
          </div>
          <!-- overview -->
          <div class="inner-1240 js-scroll">
            <div class="detail__overview pc-pt-120 pc-pb-100 mo-pt-100 mo-pb-90 scroll-inner scroll-inner--fade">
              <h3 class="detail__sub pc-pb-45 mo-pb-50">OVERVIEW</h3>
              <p class="detail_desc">${data.overview}</p>
            </div>
          </div>
          <!--// overview -->
          <div class="js-scroll">
            <div class="img-box detail__img-box scroll-inner scroll-inner--fade">
              <img src="${data.imgUrl.pc02}" alt="" class="m-hide">
              <img src="${data.imgUrl.mo02}" alt="" class="m-show">
            </div>
          </div>
        </div>
      </div>
    </section>`;
    },
    afterInit() {
      const $scrollBox = document.querySelectorAll('.js-scroll');

      Array.from($scrollBox).forEach((item) => {
        const scroll = new Scroll({
          target: item,
        });
      });
    },
  });

  const mouse = new Mouse();
});
