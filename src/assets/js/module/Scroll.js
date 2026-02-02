export default class Scroll {
  constructor({ ...prop }) {
    this.target = prop.target;

    this.init();
  }

  reset() {
    this.offsetTop = window.scrollY + this.target.getBoundingClientRect().top;
    this.buffer = (window.innerHeight / 5) * 3;
  }

  addClassActive() {
    const scrollAmount = window.scrollY;

    if (
      this.offsetTop < this.buffer ||
      (scrollAmount >= document.body.scrollHeight - window.innerHeight - 10 &&
        document.body.scrollHeight <= this.offsetTop + this.buffer) ||
      scrollAmount > this.offsetTop - this.buffer
    ) {
      this.target.classList.add('js-active');
      window.removeEventListener('scroll', this.handleScrollEvt);
    }
  }

  addScrollEvt() {
    this.handleScrollEvt = this.addClassActive.bind(this);
    window.addEventListener('scroll', this.handleScrollEvt);
  }

  addResizeEvt() {
    window.addEventListener('resize', this.reset.bind(this));
  }

  init() {
    this.reset();
    this.addScrollEvt();
    this.addResizeEvt();
    this.addClassActive();
  }
}
