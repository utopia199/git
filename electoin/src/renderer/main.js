import Vue from 'vue'
import App from './App.vue';

import api from "./util/api.js"
Vue.prototype.$api = api

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client';
Vue.use(new VueSocketIO({
 debug: false,
 connection: SocketIO('http://192.168.0.113:9528')
}))


import router from './router'
import store from './store'
Vue.prototype.$store = store

import "../../static/css/reset"


window.vm = Vue.prototype

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false



new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')