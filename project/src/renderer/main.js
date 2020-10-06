import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

import "../../static/css/reset.css"
require("../../static/icon/iconfont.js") 

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false


new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
