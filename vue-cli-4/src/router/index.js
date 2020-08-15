import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

  const routes = [
    { path: "/home", name: "Home", component: resolve=>require(["@/views/Home.vue"], resolve) ,children:[
      { path: "/help", name: "Help", component: resolve=>require(["@/views/Help.vue"], resolve) },
      { path: "/aboutUs", name: "AboutUs", component: resolve=>require(["@/views/AboutUs.vue"], resolve) },
      { path: "/list", name: "List", component: resolve=>require(["@/views/List.vue"], resolve) },
      { path: "/product", name: "Product", component: resolve=>require(["@/views/Product.vue"], resolve) },
    ]},
    
    { path: "/test", name: "Test", component: resolve=>require(["@/views/test.vue"], resolve) },
    { path: "/", redirect: "/product" },
  ]
  
const router = new VueRouter({
  routes
})
// 路由拦截
// router.beforeEach((to,from,next)=>{
//   next()
// })

export default router
