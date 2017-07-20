import Vue from 'vue'

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
      state.getHistoryInfos.infos = data
    }
  },
  actions: {
    getHistory({commit}) {
      axios.get('/api/message')
        .then(function (data) {
          commit('setHistoryInfos', data.data.data)
        })
        .catch(function (err) {
          console.log(err)
        })
    },
  }
}

