import Vue from 'vue'
import App from './App.vue'
import router from './router'


import "../public/data/reset.css"


Vue.config.productionTip = false

import http from '@/util/api.js'
Vue.prototype.$http = http

import store from './store'
Vue.prototype.$store = store

import add from '@/components/add'
Vue.prototype.$Add = function(item) {
  let Add = Vue.extend(add)
  let AddMent = new Add({
    data: {
      title: item.title,
      type: item.type,
			listName: item.listName ? item.listName : '',
			id: item.id ? item.id : '',
    }
  }).$mount()
  document.body.appendChild(AddMent.$el)
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
