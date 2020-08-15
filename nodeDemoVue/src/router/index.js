import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

  const routes = [
    { path: "/home", name: "Home", component: resolve=>require(["@/views/Home.vue"], resolve) },
    { path: "/test", name: "Test", component: resolve=>require(["@/views/test.vue"], resolve) },
    { path: "*", redirect: "/home" },
  ]
  
const router = new VueRouter({
  routes
})
// 路由拦截
// router.beforeEach((to,from,next)=>{
//   next()
// })

export default router
