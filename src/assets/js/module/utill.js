export function isMobile() {
  return window.innerWidth <= 768 ? 'mo' : 'pc';
}

export function getUrlParams(param) {
  return new URL(window.location.href).searchParams.get(param);
}
