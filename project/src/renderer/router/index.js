import Vue from "vue"
import Router from "vue-router"
import store from "../store/index"
let files = require.context('../view', false, /\.vue$/);// 路径 是否遍历子文件夹  正则

let index = [
  { path:'/', component:resolve=>require(['@/view/index.vue'],resolve), children:[
    {path: '/', redirect: '/temp'}
  ]},
  { path:'/login', component:resolve=>require(['@/components/login.vue'],resolve)}
];

files.keys().forEach(key => {
  let path = key.split('.')[1];
  if(path !== '/index') {
   index[0].children.unshift({ path: path, component:resolve=>require(['@/view'+path],resolve)})
  }
})

Vue.use(Router)

const router = new Router({
  routes: index
})

router.beforeEach((to,from,next)=>{
  if(!store.state.data.key && to.path != "/login"){
   
    return  next({path:"/login"})

  } else if(store.state.data.key && to.path === "/login"){
    
    return  next({path: "/temp"})

  }
  next()
  
})
export default router