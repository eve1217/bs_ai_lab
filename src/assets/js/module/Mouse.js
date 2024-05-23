import MouseFollower from 'mouse-follower';
import gsap from 'gsap';

export default class Mouse {
  constructor() {
    this.targetClassName = {
      active: '.js-hover-active',
      img: '.js-hover-img',
      play: '.js-hover-play',
      view: '.js-hover-view',
      see: '.js-hover-see',
      disable: '.js-hover-disable',
    };
    this.init();
  }

  init() {
    MouseFollower.registerGSAP(gsap);

    const cursor = new MouseFollower({
      className: 'js-mouse',
      innerClassName: 'js-mouse__inner',
      mediaClassName: 'js-mouse__cursor',
      mediaBoxClassName: 'js-mouse__img',
      textClassName: 'js-mouse__txt',
      speed: 0.5,
      skewing: 0.8,
      visible: true,
      stateDetection: {
        '-click': 'a, .portfolio-swiper__navi',
        '-spotlight': this.targetClassName.active,
        '-media': this.targetClassName.img,
        '-play': this.targetClassName.play,
        '-disable': this.targetClassName.disable,
      },
    });

    if ('ontouchstart' in window) {
      const $wrapper = document.querySelector('.wrapper');

      $wrapper.classList.add('touchmode');
    }

    window.addEventListener('touchstart', () => {
      cursor.addState('-touched');
    });
  }
}
