import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import dataList from './module/dataList';
import StickyHeader from './module/StickyHeader';
import List from './module/List';
import Scroll from './module/Scroll';
import Mouse from './module/Mouse';
import { isMobile } from './module/utill';

window.addEventListener('load', () => {
  const header = new StickyHeader();

  const portfolioList = new List({
    data: dataList.result.slice(0, 12),
    id: 'portfolioList',
    setImgUrl(id) {
      const imgVer = {};

      return {
        pc: `./images/main_thumb_${id}_pc${imgVer[id]?.pc ? imgVer[id].pc : ''}.jpg`,
        mo: `./images/main_thumb_${id}_mo${imgVer[id]?.mo ? imgVer[id].mo : ''}.jpg`,
      };
    },
    renderHtml(data) {
      const { category } = data;

      return `<div class="swiper-slide portfolio-swiper__item">
        <a href="./portfolio/detail/?id=${data.id}" class="img-box portfolio-swiper__img" data-cursor-text="Click Here">
          <img src="${data.imgUrl.pc}" alt="" class="m-hide" draggable="false">
          <img src="${data.imgUrl.mo}" alt="" class="m-show" draggable="false">
        </a>
  
        <div class="portfolio-swiper__txt" draggable="false">
          <p class="portfolio-swiper__title pc-mb-25 mo-mb-35 fade-in-up fade-in-up--01">${data.title.replace('<br>', '')}</p>
          <dl class="portfolio-swiper__desc en">
            <div class="portfolio-swiper__cont fade-in-up fade-in-up--02">
              <dt class="portfolio-swiper__info">Date :&nbsp;</dt>
              <dd class="portfolio-swiper__info">${data.date}</dd>
            </div>
            <div class="portfolio-swiper__cont fade-in-up fade-in-up--03">
              <dt class="portfolio-swiper__info">Brand :&nbsp;</dt>
              <dd class="portfolio-swiper__info">${data.brand}</dd>
            </div>
            <div class="portfolio-swiper__cont fade-in-up fade-in-up--04">
              <dt class="portfolio-swiper__info">Type :&nbsp;</dt>
              <dd class="portfolio-swiper__info">${category.replace(/^[a-z]/, (char) => char.toUpperCase())}</dd>
            </div>
          </dl>
        </div>
      </div>
      `;
    },
  });

  // kv 영역 스와이퍼
  // 슬라이드 선택
  function selectSlide(swiper) {
    const { activeIndex } = swiper;
    const { slides } = swiper;
    const currentSlide = slides[activeIndex];
    const prevSlide =
      slides[activeIndex === 0 ? slides.length - 1 : activeIndex - 1];
    const nextSlide =
      slides[activeIndex === slides.length - 1 ? 0 : activeIndex + 1];
    return { currentSlide, prevSlide, nextSlide };
  }

  // 슬라이드 스케일
  function setSlideStyle(swiper, scale) {
    const { currentSlide, prevSlide, nextSlide } = selectSlide(swiper);
    currentSlide.style.transform = `scale(${scale})`;
    prevSlide.style.transform = `scale(${scale})`;
    nextSlide.style.transform = `scale(${scale})`;
  }

  // 슬라이드에 비디오 있음?
  function isVideoSlide(slide) {
    return slide.querySelector('video') !== null;
  }

  // 비디오 끝나면 이동
  function videoEnd(swiper, video) {
    video.addEventListener('ended', () => {
      swiper.slideNext();
    });
  }

  // 슬라이드 업뎃
  function updateSlide(swiper) {
    const { activeIndex, slides } = swiper;
    const currentSlide = slides[activeIndex];

    if (isVideoSlide(currentSlide)) {
      const video = currentSlide.querySelector('video');
      if (video && video.paused) {
        video.muted = true;
        video.currentTime = 0;
        video.play();
      }
    }
  }

  // 비디오 아닐때 멈춰줌(모바일은 왜 안멈춰줌?)
  function pauseNotVisible(swiper) {
    const { activeIndex, slides } = swiper;
    slides.forEach((slide, index) => {
      if (index !== activeIndex) {
        const video = slide.querySelector('video');
        if (video && !video.paused) {
          video.pause();
        }
      }
    });
  }

  // kv 프로젝트명 바꿈
  function changeTitle(swiper) {
    const currentSlideIndex = swiper.realIndex;
    const textTitleEl = document.querySelector('.text-title');

    const slideTitles = [
      '',
      '삼성닷컴 글로벌 <br class="m-show" />사운드바 시뮬레이션',
      'AhnLab Mall <br class="m-show" />사이트 리뉴얼',
      '삼성닷컴 <br class="m-show" />가전 PDP 운영',
      'KTB 투자증권 <br class="m-show" />웹 사이트 리뉴얼',
      '삼성전자 <br class="m-show" />갤럭시 스튜디오',
    ];

    textTitleEl.innerHTML = slideTitles[currentSlideIndex] || '';
  }

  // 클래스 opacity 스타일 바꿈
  function changeOpacity(className, opacityValue) {
    const el = document.querySelector(`.${className}`);
    el.style.opacity = opacityValue;
  }

  const kvSwiper = new Swiper('.swiper-container#kvSwiper', {
    slidesPerView: 'auto',
    speed: 800,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next-kv',
      prevEl: '.swiper-button-prev-kv',
    },
    autoplay: {
      delay: 4000,
      pauseOnMouseEnter: false,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination.kv-swiper__pagination',
      type: 'bullets',
      clickable: true,
    },
    resizeObserver: true,
    on: {
      slideChangeTransitionStart() {
        setSlideStyle(kvSwiper, 0.8);
        pauseNotVisible(kvSwiper);
        updateSlide(this);
        changeOpacity('text-title', 0);

        const slideIndex = this.realIndex;
        if (slideIndex === 0) {
          changeOpacity('kv__text', 0);
        }
      },
      slideChangeTransitionEnd() {
        setSlideStyle(kvSwiper, 1);
        updateSlide(this);
        changeTitle(this);
        changeOpacity('text-title', 1);

        const slideIndex = this.realIndex;
        if (slideIndex !== 0) {
          changeOpacity('kv__text', 1);
        }
      },
    },
  });

  // main 포트폴리오 영역 스와이퍼
  const updateProgressBar = (swiper) => {
    const slideLen = swiper.slides.length;
    const currentIndex = swiper.realIndex;
    const proBar = document.querySelector('.portfolio-swiper__progressbar');
    const proBarCurr = document.querySelector(
      '.portfolio-swiper__progressbar-current',
    );
    const progressPer = (currentIndex / slideLen) * 100;
    proBar.style.width = `${progressPer}%`;
    proBarCurr.style.width = `${100 / slideLen}%`;
  };

  const swiper = new Swiper('#mainPortfolio', {
    slidesPerView: 'auto',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 2500,
      pauseOnMouseEnter: true,
      // disableOnInteraction: true,
    },
    scrollbar: {
      el: '.swiper-scrollbar.portfolio-swiper__pagination',
      draggable: true,
    },
    // observer: true,
    // observeParents: true,
    resizeObserver: true,
    on: {
      slideChange() {
        updateProgressBar(this);
      },
    },
  });

  // scroll 애니메이션
  const $scrollBox = document.querySelectorAll('.js-scroll');
  Array.from($scrollBox).forEach((item) => {
    const scroll = new Scroll({
      target: item,
    });
  });

  // youtube 영상
  // const player = new YT.Player('ytPlayer', {
  //   // rel: 1,
  //   // controls: 0,
  //   modestbranding: 1,
  //   height: '990',
  //   width: '1760',
  //   videoId: '01jT6CvmxXM',
  // });

  // const $player = document.getElementById('mainVideo');
  // const $playBtn = document.querySelector('#btnPlay');
  // const localVideo = document.getElementById('localVideo');
  // $playBtn.addEventListener('click', (e) => {
  //   $player.classList.add('active');
  //   // player.playVideo();
  //   localVideo.play();
  // });

  // Client
  let opacityInterval;
  let blinkArr = []; // 깜빡이 넣을 친구

  function client() {
    const clientContainer = document.querySelector('.client__img-container');
    const clientBox = 4; // pc버전 박스 수
    const clientItem = 5; // 각 박스에 넣을 이미지 수

    // 이미지 데이터 배열 (이미지경로는 어떻게 들어가는거임?)
    const imgData = [
      { src: 'images/client_hyundai.png', alt: '현대 로고' },
      { src: 'images/client_samsung.png', alt: '삼성 로고' },
      { src: 'images/client_kia.png', alt: '기아 로고' },
      { src: 'images/client_cheil.png', alt: '제일 로고' },
      { src: 'images/client_amore.png', alt: '아모레퍼시픽 로고' },
      { src: 'images/client_ahnlab.png', alt: '안랩 로고' },
      { src: 'images/client_sm.png', alt: 'sm 로고' },
      { src: 'images/client_canon.png', alt: '캐논 로고' },
      { src: 'images/client_skt.png', alt: 'skt 로고' },
      { src: 'images/client_ptk.png', alt: 'ptk 로고' },
      { src: 'images/client_skp.png', alt: 'skp 로고' },
      { src: 'images/client_samyang.png', alt: '삼양 로고' },
      { src: 'images/client_yuhan.png', alt: '유한킴벌리 로고' },
      { src: 'images/client_hanwha.png', alt: '한화 로고' },
      { src: 'images/client_redbull.png', alt: '레드불 로고' },
      { src: 'images/client_cj.png', alt: 'cj푸드빌 로고' },
      { src: 'images/client_dongsuh.png', alt: '동서식품 로고' },
      { src: 'images/client_donga.png', alt: '동아제약 로고' },
      { src: 'images/client_bc.png', alt: 'bc카드 로고' },
      { src: 'images/client_converse.png', alt: '컨버스 로고' },
    ];

    // 기존 초기화함
    clientContainer.innerHTML = '';

    // pc는 박스생성하고 클래스 추가
    if (isMobile() === 'pc') {
      for (let i = 0; i < clientBox; i += 1) {
        const box = document.createElement('div');
        box.classList.add('client__box');

        // 특정박스에 추가클래스 넣음
        if (i === 0 || i === 3) {
          box.classList.add('gap20');
        } else if (i === 1 || i === 2) {
          box.classList.add('gap40');
        }

        clientContainer.appendChild(box);
      }
    }

    // 생성된 박스 배열로 저장함
    const boxes = Array.from(document.querySelectorAll('.client__box'));

    // 이미지 생성 및 박스에 넣음
    imgData.forEach((arr, index) => {
      const imgEl = document.createElement('img');
      imgEl.src = window.location.pathname + arr.src;
      imgEl.setAttribute('alt', arr.alt);
      imgEl.classList.add('client__img');

      // 모바일은 이미지를 컨테이너에 바로 넣음
      if (isMobile() === 'mo') {
        clientContainer.appendChild(imgEl);
      } else {
        // pc는 각 박스에 이미지를 나눠서 넣음
        const boxIndex = Math.floor(index / clientItem);
        boxes[boxIndex].appendChild(imgEl);
      }
    });

    // 기존 깜빡이 제거(리사이즈)
    if (opacityInterval) {
      clearInterval(opacityInterval);
    }

    // 리사이즈 후 이전 깜빡이 상태로
    setTimeout(() => {
      const allImages = Array.from(document.querySelectorAll('.client__img'));
      blinkArr.forEach((index) => {
        if (allImages[index]) {
          allImages[index].classList.add('blink');
        }
      });
    }, 0);

    // 깜빡이
    const toggleOpacity = () => {
      const allImages = Array.from(document.querySelectorAll('.client__img'));
      allImages.forEach((image) => image.classList.remove('blink'));

      // 깜빡이 초기화
      blinkArr = [];

      // 5개 랜덤으로 클래스추가
      const selectBlink = Array.from(
        { length: allImages.length },
        (_, index) => index,
      )
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);

      selectBlink.forEach((index) => {
        allImages[index].classList.add('blink');
        blinkArr.push(index); // 깜빡이 저장
      });
    };

    opacityInterval = setInterval(toggleOpacity, 1000);
  }

  function addResizeEvt() {
    let timer;

    window.addEventListener('resize', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        client();
      }, 100);
    });
  }
  // Client

  updateSlide(kvSwiper);
  updateProgressBar(swiper);
  client();
  addResizeEvt();

  const mouse = new Mouse();
});
