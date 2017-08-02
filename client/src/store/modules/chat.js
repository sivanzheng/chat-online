import Vue from 'vue'
import axios from 'axios'
import router from 'vue-router'
import {getUrl} from '../../../static/js/common.js'
const HOST = process.env.NODE_ENV === 'development' ? '/api' : ''

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
      let id = getUrl(location.href)
      axios.get(HOST+'/message/'+id)
        .then(function (data) {
          commit('setHistoryInfos', data.data.infos)
        })
        .catch(function (err) {
          console.log(err)
        })
    },
  }
}

