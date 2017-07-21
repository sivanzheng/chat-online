import Vue from 'vue'
import Vuex from 'vuex'
import dialog from './modules/dialog.js'//登陆注册弹窗
import user from './modules/user.js'//处理用户相关状态
import robot from './modules/robot.js'//机器人消息
import chat from './modules/chat.js'//处理消息

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
      dialog,
      user,
      robot,
      chat
  }
});

export default store
