import { removeChildNode } from '../utils/index.js'

export default class Router {
  constructor(routes) {
    if (!routes) {
      alert('Can not initialize routes, need routes!');
      return;
    }
    this.routes = routes;
    this.bindEvents()
  }
  init(rootElementId) {
    this.rootElement = document.querySelector(rootElementId);
    this.routing(location.pathname)
  }
  bindEvents() {
    window.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.closest('a')) {
        this.routePush(e.target.closest('a').href);
      }
    })
    window.onpopstate = () => this.routing(location.pathname)
  }
  routePush(origin) {
    window.history.pushState({}, null, origin);
    this.routing(location.pathname)
  }
  routing(pathname) {
    let page = '';
    if (this.routes[pathname]) {
      page = new this.routes[pathname]()
    } else {
      const [ _, num] = pathname;
      if (typeof +num === 'number') {
        page = new this.routes['/:id'](parseInt(num));
      }
    }
    if (page) {
      this.render(page)
    }
  }
  async render(page) {
    removeChildNode(this.rootElement)
    this.rootElement.append(await page.render())
  }
}