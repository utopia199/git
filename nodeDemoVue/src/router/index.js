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
  routes
})
// 路由拦截
router.beforeEach((to,from,next)=>{
  console.log(to,'beforeEach')
  from
  next()
})

router.beforeResolve((to, from, next) => {
  console.log(to,'beforeResolve')
  from
  next()
  /* 必须调用 `next` */
})

export default router
