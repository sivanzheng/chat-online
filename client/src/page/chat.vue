<template>
  <transition name="fade">
    <div class="container" id="container">

      <div class="title">
        <mu-appbar title="Title">
            <mu-icon-button icon="chevron_left" slot="left"/>
            <div class="center">
                聊天
            </div>
            <mu-icon-button icon="expand_more" slot="right"/>
        </mu-appbar>
      </div>

      <div class="chat">
        <div style="height:70px"></div>
        <div>在线人员</div>
        <div class="online">
            <img src="" alt="">
        </div>
        <div  v-for="obj in getHistoryInfos">

          <get-msg v-if="obj.username != getUser.name" 
            :name="obj.username" 
            :img="obj.src" 
            :msg="obj.msg">
          </get-msg>

          <send-msg
           v-if="obj.username == getUser.name" 
           :name="obj.username" 
           :img="obj.src" 
           :msg="obj.msg">
          </send-msg>

        </div>
        <div>

        </div>
        <div style="height:9rem"></div>
      </div>

      <div class="bottom" ref="bottom">
        <div class="input">
            <input type="text" v-model="txt">
        </div>
        <mu-raised-button label="发送" class="demo-raised-button" primary @click="submit"/>
      </div>
      <mydialog :dialogMsg="msg" :status="status" :title="title"></mydialog>
    </div>
  </transition>
</template>

<script>
  import sendMsg from '../components/sendMsg.vue'
  import getMsg from '../components/getMsg.vue'
  import mydialog from '../components/dialog.vue'
  import { mapGetters } from 'vuex'
  import io from 'socket.io-client'
  export default{
    data(){
      return {
        title: '',
        txt:'',
        msg:'',
        status: 0,
        socket: '',
        roomID: ''
      }
    },
    mounted() {
      this.roomID = this.$route.params.id

      var  date = new Date()
      console.log(date) 
      var d2 = Date()
      console.log(d2)
      console.log(date === d2)
      console.log(typeof(date))
      console.log(typeof(d2))
      this.height = document.body.scrollHeight - 220
      this.title = this.getUser.name
      this.$store.dispatch('getHistory')
      window.scrollTo(0, this.height)
    },
    created() {
        // 连接websocket地址
        const SOCKET_HOST = process.env.NODE_ENV === 'development' ? 'localhost:3001' : 'http://113.209.100.33'
        this.socket = io.connect(SOCKET_HOST)
        
         this.socket.on('message', (obj) => {
          console.log(obj)
            this.$store.dispatch('getHistory')
            /*that.$store.commit('addroomdetailinfos', obj)*/
            
        })
    },
    methods: {
        /*closechat() {
            this.$store.commit('changechattoggle')
            this.socket.emit('logout', this.getUser.name)
        },*/
        submit() {
            // 判断发送信息是否为空
            if (this.txt != '') {
                let obj = {
                    username: this.getUser.name,
                    src: this.getUser.src,
                    msg: this.txt,
                    roomId: this.roomID
                }
                // 传递消息信息
                console.log('我发送消息啦')
                this.socket.emit('message', obj)
                this.txt = ''
                this.$nextTick(()=>{
                  setTimeout(function(){
                    window.scrollTo(0, (document.getElementById('container').scrollHeight + 200))
                  },400)
                })
                
               /* window.scrollTo(0, document.body.scrollHeight + 200)*/
                
            } else {
                this.msg = '写点啥再发送呗~'
                this.$store.dispatch('showDialog')
            }
        }
    },
    computed: {
      ...mapGetters([
          'getUser',
          'getHistoryInfos'
      ])
    },
    components: {
        sendMsg,
        getMsg,
        mydialog
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    &.fade-enter-active, &.fade-leave-active
        transition: all 0.2s linear
        transform translate3d(0, 0, 0)
    &.fade-enter, &.fade-leave-active
        opacity: 0
        transform translate3d(100%, 0, 0)
    .container
        position: absolute
        left:0
        top:0
        width:100%
        min-height:100%
        background: #ffffff
        .title
            position:fixed
            height:50px
            top:0
            width:100%
            z-index:1
            .center
                -webkit-box-flex: 1
                -webkit-flex: 1
                -ms-flex: 1
                flex: 1
                padding-left: 8px
                padding-right: 8px
                white-space: nowrap
                text-overflow: ellipsis
                overflow: hidden
                font-size: 20px
                font-weight: 400
                line-height: 56px
                text-align:center
        .chat
            .online
                display:inline-block
                margin:5px
                img
                    width: 40px
                    height: 40px
                    border-radius:100%
        .bottom
            position:fixed
            height:50px
            bottom:55px
            width:100%
            display: flex
            .input
                flex:1
                background #ddd
                padding:4px
                input
                    width: 100%
                    height: 42px
                    box-sizing: border-box
                    border: 1px solid #ddd
                    color: #333333
                    font-size: 18px
                    padding-left: 5px
                .mu-text-field
                    width:100%
            .demo-raised-button
                height:50px
                background:#ddd
</style>