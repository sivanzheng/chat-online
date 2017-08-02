import Vue from 'vue'

export default {
  state: JSON.parse(sessionStorage.getItem('num')) || '',
  mutations: {
    join (state, num) {
      sessionStorage.setItem('num', JSON.stringify(num))//把前端传过来的值存进sessionStorage的num下
      Object.assign(state, num)//把num这个存储用户数据的对象添加到state里
    },
    leave (state) {
      sessionStorage.removeItem('num')
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
