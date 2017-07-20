import Vue from 'vue'

export default {
  state: {
    show: false
  },
  mutations: {
    showDialog (state) {
      state.show = true
    },
    hideDialog (state) {
      state.show = false
    }
  },
  getters: {
    dialog: state => {return state}
  },
  actions: {
    showDialog ({commit}) {
      commit('showDialog')
    },
    hideDialog ({commit}) {
      commit('hideDialog')
    }
  }
}

