import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/*引入公共样式*/
import './assets/styles/common.css';

import {server} from './servers/http.js';
import './plugins/element.js';


//定义全局变量
Vue.prototype.$server=server;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
