import Swiper from 'swiper';
import 'swiper/css';
import dataList from './module/dataList';
import StickyHeader from './module/StickyHeader';
import List from './module/List';
import Scroll from './module/Scroll';
import Mouse from './module/Mouse';

window.addEventListener('load', () => {
  const header = new StickyHeader();

  const portfolioList = new List({
    data: dataList.result,
    id: 'portfolioList',
    setImgUrl(id) {
      const imgVer = {
        // 2402: {
        //   pc: '_v1',
        //   mo: '_v2',
        // },
      };

      return {
        pc: `../assets/images/portfolio_thumb_${id}${imgVer[id]?.pc ? imgVer[id].pc : ''}.jpg`,
        // mo: `../assets/images/portfolio_thumb_${id}${imgVer[id]?.mo ? imgVer[id].mo : ''}.jpg`,
      };
    },
    renderHtml(data) {
      return `<li class="list__item">
        <a href="./detail/?id=${data.id}" class="list__link" data-cursor-text="View">
          <div class="img-box list__img">
            <img src="${data.imgUrl.pc}" alt="">
          </div>
          <div class="list__text">
            <p class="list__title">${data.title.replace('<br>', '')}</p>
            <p class="list__data">${data.date}_${data.brand}</p>
          </div>
        </a>
      </li>`;
    },
    useCategory: {
      id: 'portfolioTab',
      default: 'all',
    },
    usePaging: {
      id: 'btnMore',
      increase: 6,
    },
  });

  const tabSwiper = new Swiper('#portfolioTab', {
    slidesPerView: 'auto',
  });

  const $scrollBox = document.querySelectorAll('.js-scroll');

  Array.from($scrollBox).forEach((item) => {
    const scroll = new Scroll({
      target: item,
    });
  });

  const mouse = new Mouse();
});
