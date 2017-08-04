import Vue from 'vue'
import Router from 'vue-router'
import index from '@/page/index'
import home from '@/page/home'
import login from '@/page/login'
import reg from '@/page/reg'
import robot from '@/page/robot'
import chat from '@/page/chat'
import io from 'socket.io-client'

// 连接websocket地址
const SOCKET_HOST = process.env.NODE_ENV === 'development' ? 'localhost:3001' : 'http://113.209.100.33'
var socket = io.connect(SOCKET_HOST)

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
      let user = JSON.parse(sessionStorage.getItem('user'))
        if (user) {
            let obj = {
              username: user.name,
              src: user.src
            }
            if(to.name == 'chat' && from.name == null){
              let id = to.params.id
              socket.emit('leave',obj,id)
              next()
            }else if(from.name == 'chat'){
              let id = from.params.id
              socket.emit('leave',obj,id)
              next()
            }else{
              next()
            }
        } else {
            next({
                path: '/login'
            })
        }
      
    }
    else {
        next();
    }
})

export default router