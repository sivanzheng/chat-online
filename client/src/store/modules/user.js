import Vue from 'vue'

export default {
  state: JSON.parse(sessionStorage.getItem('user')) || '',
  mutations: {
    login (state, user) {
      sessionStorage.setItem('user', JSON.stringify(user))//把前端传过来的值存进sessionStorage的user下
      Object.assign(state, user)//把user这个存储用户数据的对象添加到state里
    },
    logout (state) {
      sessionStorage.removeItem('user')
      state = ''
    }
  },
  getters: {
    getUser: state => {
      return state
    }
  },
  actions: {
    login ({commit},user) {
      commit('login', user);
      return user;
    },
    logout ({commit}) {
      commit('logout')
    }
  }
}


