import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

  const routes = [
    { path: "/home", name: "Home", component: resolve=>require(["@/views/Home.vue"], resolve) },
    { path: "/test", name: "Test", component: resolve=>require(["@/views/test.vue"], resolve) },
    { path: "/test1", name: "Test1", component: resolve=>require(["@/views/test1.vue"], resolve) },
    { path: "*", redirect: "/home" },
  ]
  
const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    to
    from
    // `to` 和 `from` 都是路由对象
    if (savedPosition) {// 是否是浏览器的前进后退，或者router.go(-1)
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})
// 路由拦截
// router.beforeEach((to,from,next)=>{
//   next()
// })
export default router
