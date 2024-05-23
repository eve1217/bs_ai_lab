import { isMobile } from './utill';

export default class List {
  constructor({ ...prop }) {
    this.currentDevice = isMobile();
    this.originData = prop.data;
    this.target = document.getElementById(prop.id);
    this.setImgUrl = prop.setImgUrl;
    this.renderHtml = prop.renderHtml;
    this.useCategory = { default: 'all', ...prop.useCategory };
    this.currentCategory = this.useCategory.default;
    this.categoryData =
      this.currentCategory === 'all'
        ? this.originData
        : this.originData.filter(
            (item) => item.category === this.useCategory.default,
          );
    this.usePaging = {
      id: false,
      increase: 6,
      initNum: {
        pc: 6,
        mo: 6,
      },
      currentPage: 0,
      ...prop.usePaging,
    };

    if (this.usePaging.id) {
      this.usePaging.target = document.getElementById(this.usePaging.id);
      this.usePaging.maxPage = this.getMaxPage();
    }

    this.init();
  }

  setImgData() {
    for (let i = 0; i < this.originData.length; i += 1) {
      const imgUrl = this.setImgUrl(this.originData[i].id);
      this.originData[i].imgUrl = {};

      Object.keys(imgUrl).forEach((key) => {
        this.originData[i].imgUrl[key] = imgUrl[key];

        // return new URL(`/assets/images/${imgUrl[key]}`, import.meta.url);
      });
    }
  }

  getMaxPage() {
    const listLength = this.categoryData.length;
    const initLength = this.usePaging.initNum[isMobile()];

    return listLength > initLength
      ? Math.ceil((listLength - initLength) / this.usePaging.increase)
      : 0;
  }

  findCategoryList(category) {
    this.categoryData = this.originData.filter(
      (item) => item.category === category,
    );
  }

  findPagingList() {
    let result = this.categoryData;
    const initEndIdx = this.usePaging.initNum[isMobile()];
    let startIdx = 0;
    let endIdx = 0;

    if (this.usePaging.currentPage === 0) {
      endIdx = initEndIdx;
    } else {
      startIdx =
        initEndIdx + (this.usePaging.currentPage - 1) * this.usePaging.increase;
      endIdx = startIdx + this.usePaging.increase;

      if (this.usePaging.currentPage === this.usePaging.maxPage) {
        endIdx = result.length;
      }
    }

    result = result.slice(startIdx, endIdx);

    return result;
  }

  printList(listArr) {
    let result = '';
    const arrlength = listArr.length;

    for (let i = 0; i < arrlength; i += 1) {
      result += this.renderHtml(listArr[i]);

      this.target.insertAdjacentHTML('beforeend', this.renderHtml(listArr[i]));
    }

    if (
      this.usePaging.id &&
      this.usePaging.currentPage === this.usePaging.maxPage
    )
      this.usePaging.target.classList.add('blind');

    return result;
  }

  addList() {
    this.usePaging.currentPage += 1;

    this.printList(this.findPagingList());
  }

  initList() {
    let listArr = this.categoryData;

    if (this.usePaging.id) {
      listArr = this.findPagingList();
      this.usePaging.target.classList.remove('blind');
    }

    this.target.innerHTML = '';
    this.printList(listArr);
  }

  reset() {
    this.usePaging.currentPage = 0;
    this.usePaging.maxPage = this.getMaxPage();
  }

  handleResize() {
    const nowDevice = isMobile();

    if (this.currentDevice !== nowDevice) {
      this.reset();
      this.initList();
      this.currentDevice = nowDevice;
    }
  }

  addResizeEvt() {
    let timer;

    window.addEventListener('resize', () => {
      clearTimeout(timer);
      timer = setTimeout(() => this.handleResize(), 300);
    });
  }

  addCategoryEvt() {
    const $categoryTab = document.getElementById(this.useCategory.id);

    $categoryTab.addEventListener('click', (e) => {
      const $this = e.target;
      const category = $this.getAttribute('data-category');

      if (category && category !== this.currentCategory) {
        const $active = $categoryTab.querySelector('.active');

        $active.classList.remove('active');
        $this.classList.add('active');

        this.currentCategory = category;
        if (category === 'all') {
          this.categoryData = this.originData;
        } else {
          this.findCategoryList(category);
        }

        this.reset();
        this.initList();
      }
    });
  }

  addMoreEvt() {
    const $btnMore = this.usePaging.target;

    $btnMore.addEventListener('click', (e) => {
      this.addList();
    });
  }

  init() {
    this.setImgData();
    this.initList();
    // this.addResizeEvt();
    if (this.useCategory.id) this.addCategoryEvt();
    if (this.usePaging.id) this.addMoreEvt();
  }
}
