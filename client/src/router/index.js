import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home'
import login from '@/page/login'
import reg from '@/page/reg'
import robot from '@/page/robot'
import chat from '@/page/chat'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: home
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
      component: robot
    },
    {
      path: '/chat',
      name: 'chat',
      component: chat
    }
  ]
})

/*router.beforeEach((to, from, next) => {
    let ibody = document.getElementsByTagName('body')[0];
    let inotify = document.getElementsByClassName('el-notification')[0];
    !!inotify ? ibody.removeChild(inotify) : '';
    if (to.meta.requireAuth) {
        if (store.state.user.oauth_token) {
            next();
        } else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})*/

export default router