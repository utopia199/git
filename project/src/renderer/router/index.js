import Vue from "vue"
import Router from "vue-router"

let files = require.context('../view', false, /\.vue$/);// 路径 是否遍历子文件夹  正则

let index = [
  { path:'/', component:resolve=>require(['@/view/index.vue'],resolve), children:[
    {path: '/', redirect: '/temp'}
  ]}
];

files.keys().forEach(key => {
  let path = key.split('.')[1];
  if(path !== '/index') {
   index[0].children.unshift({ path: path, component:resolve=>require(['@/view'+path],resolve)})
  }
})
Vue.use(Router)
export default new Router({
  routes: index
})