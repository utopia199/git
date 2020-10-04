import Vue from 'vue'
import Router from 'vue-router'
import fs from "fs"

Vue.use(Router)

let router =  new Router({
  routes: [
    {
      path: '/landing-page',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/login',
      name: 'login',
      component: require('@/view/login').default
    },
    {
      path: '/home',
      name: 'home',
      component: require('@/view/home').default
    },
    {
      path: '/',
      redirect: '/login'
    }
  ]
})

router.beforeEach((to,from,next)=>{
  if(to.name === "login") {// 判断是否有登陆过
    fs.readFile('./login.json', 'utf-8', function(err, data) {
      if (err) {
        throw err;
      }
      if(data && data !== "undefined") {
        return next({path:"/home"})
      }
    });
  }
  next()
})
export default router
