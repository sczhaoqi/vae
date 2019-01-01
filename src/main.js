import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/*引入公共样式*/
import './assets/styles/common.css';

import api from './servers/api.js';
import './plugins/element.js';


//定义全局变量
Vue.prototype.$api=api;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
