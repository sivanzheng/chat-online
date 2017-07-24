import Vue from 'vue'
import axios from 'axios'

export default {
  state: {
    history: {
      infos: []
    }
  },
  getters: {
    getHistoryInfos: state => {
      return state.history.infos
    }
  },
  mutations: {
    setHistoryInfos(state, data) {
      state.history.infos = data
    }
  },
  actions: {
    getHistory({commit}) {
      axios.get('/api/message')
        .then(function (data) {
          commit('setHistoryInfos', data.data.infos)
        })
        .catch(function (err) {
          console.log(err)
        })
    },
  }
}

