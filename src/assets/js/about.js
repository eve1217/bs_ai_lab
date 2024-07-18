import Scroll from './module/Scroll';
import StickyHeader from './module/StickyHeader';
import Mouse from './module/Mouse';

window.addEventListener('load', () => {
  const header = new StickyHeader();

  const $scrollBox = document.querySelectorAll('.js-scroll');

  Array.from($scrollBox).forEach((item) => {
    const scroll = new Scroll({
      target: item,
    });
  });

  const mouse = new Mouse();
});
