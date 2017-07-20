import Vue from 'vue'
import axios from 'axios'

export default {
  state: [{
      message: '这里有一朵小蘑菇~', 
      user: 'robot'
    }],
  mutations: {
    setrobotmsg(state, data) {
      state.push(data)
    }
  },
  getters: {
    getrobotmsg: state => {return state}
  },
  actions: {
    robotMsg({commit}, data) {
      var robotdata = ''
      axios.get('/api/robotapi', {
        params: data
      })
        .then(function (data) {
          robotdata = JSON.parse(data.data.data)
          // 分类信息
          if (robotdata.code === 100000) {
            commit('setrobotmsg', {message: robotdata.text, user: 'robot'})
          } else if (robotdata.code === 200000) {
            let data = robotdata.text + robotdata.url
            commit('setrobotmsg', {message: data, user: 'robot'})
          } else if (robotdata.code === 302000) {
            commit('setrobotmsg', {message: '暂不支持此类对话', user: 'robot'})
          } else {
            commit('setrobotmsg', {message: '暂不支持此类对话', user: 'robot'})
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  }
}

