import Vue from 'vue'
import Router from 'vue-router'
import index from '@/page/index'
import home from '@/page/home'
import login from '@/page/login'
import reg from '@/page/reg'
import robot from '@/page/robot'
import chat from '@/page/chat'

Vue.use(Router)

const router =  new Router({
  routes: [
    { 
      path: '/', 
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'Index',
      component: index,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: home,
      meta: {
              requireAuth: true
            }
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/reg',
      name: 'register',
      component: reg
    },
    {
      path: '/robot',
      name: 'robot',
      component: robot,
      meta: {
              requireAuth: true
            }
    },
    {
      path: '/chat/:id',
      name: 'chat',
      component: chat,
      meta: {
              requireAuth: true
            }
    }
  ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (sessionStorage.getItem('user')) {
            next();
        } else {
            next({
                path: '/login'/*,
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由*/
            })
        }
    }
    else {
        next();
    }
})

export default router