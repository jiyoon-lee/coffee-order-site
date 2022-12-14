import { Cart, ProductDetail, ProductList } from './components/index.js';
import { Router } from './utils/index.js'

export default class App {
  constructor(props) {
    const { el } = props;
    this.rootElementId = el;
  }
  setup() {
    const routes = {
      '/': ProductList,
      '/:id': ProductDetail,
      '/cart': Cart
    }
    const router = new Router(routes)
    router.init(this.rootElementId)
  }
}