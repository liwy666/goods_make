import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'

Vue.config.productionTip = false;

/*Vant*/
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

//主题颜色
import './my-scss.scss'

//引入axios
import {post, fetch, patch, put} from './http'
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;

//lazyload
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload);

new Vue({
    store,
    router,
  render: h => h(App)
}).$mount('#app');
