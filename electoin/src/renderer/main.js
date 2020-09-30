import Vue from 'vue'
import axios from 'axios'
import App from './App.vue';

import api from "./util/api.js"
Vue.prototype.$api = api

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);






import router from './router'
import store from './store'
import "../../static/css/reset"

window.vm = Vue.prototype

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false



new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')