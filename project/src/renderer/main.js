import Vue from 'vue'

import App from './App'
import router from './router'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

import "../../static/css/reset.css"
require("../../static/icon/iconfont.js") 

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import store from './store'
Vue.prototype.$store = store

import api from "./util/api.js"
Vue.prototype.$api = api


Vue.config.productionTip = false
window.vm = Vue.prototype

// 获取初始配置
store.dispatch("GET_STATE").then(res=>{
  new Vue({
    components: { App },
    router,
    store,
    template: '<App/>'
  }).$mount('#app')
})


