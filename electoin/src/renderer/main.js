import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import api from "./util/api.js"
Vue.prototype.$api = api
Vue.use(ElementUI);
window.vm = Vue.prototype
import router from './router'
import store from './store'
import "../../static/css/reset"

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false


import db from './datastore'

/* 其它代码 */

Vue.prototype.$db = db


new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')