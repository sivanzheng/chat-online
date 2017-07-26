import Vue from 'vue'

export default {
  state: {},
  getters: {
    getNav: state => {
      return state
    }
  },
  mutations: {
    setNav (state, data) {
      state = data
    }
  }
}

  