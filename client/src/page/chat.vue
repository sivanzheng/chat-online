<template>
  <transition name="fade">
    <div class="container" id="container">

      <div class="title">
        <mu-appbar title="Title">
            <mu-icon-button icon="chevron_left" slot="left" @click="getOut"/>
            <div class="center">
                聊天
            </div>
            <mu-icon-button icon="expand_more" slot="right" @click="infoShow = !infoShow"/>
        </mu-appbar>
      </div>

      <div class="chat">
        <div style="height:70px"></div>
        <transition name="infoBox">
          <div class="info" v-show="infoShow">
            <div class="infoInner">
              <div class="onlineNum">在线人数:{{roomInfo.length}}</div>
              <mu-chip class="demo-chip" v-for="item in roomInfo">
                <mu-avatar :size="32" :src="item.src"/>{{item.username}}
              </mu-chip> 
            </div>
          </div>
        </transition>
        
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
        infoShow: false,
        status: 0,
        socket: '',
        roomID: '',
        roomInfo:[]
      }
    },
    created() {
      // 连接websocket地址
      const SOCKET_HOST = process.env.NODE_ENV === 'development' ? 'localhost:3001' : 'http://113.209.100.33'
      this.socket = io.connect(SOCKET_HOST)

      this.socket.on('message', (obj) => {
          this.$store.dispatch('getHistory')
      })

      this.roomID = this.$route.params.id
    },
    mounted() {
      this.height = document.body.scrollHeight - 220
      this.title = this.getUser.name

      let obj = {
          username: this.getUser.name,
          src: this.getUser.src,
          roomId: this.roomID
        }

      this.socket.emit('join', obj);

      this.socket.on('sys', (sysMsg, users) => {
        this.roomInfo = users
      });

      this.$store.dispatch('getHistory')
      window.scrollTo(0, this.height)
    },
    /* beforeRouteUpdate (to, from, next) {
      alert('1111111111111')
    },
   beforeRouteUpdate (to, from, next) {
        console.log('component beforeRouteUpdate');
        this.socket.emit('leave','1111111')
        next();
    },
    beforeRouteLeave(to,from,next){
        console.log(to,from)
        console.log('component beforeRouteLeave');
        this.socket.emit('leave','2222222')
        next();
    },*/
    methods: {

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
                
            } else {
                this.msg = '写点啥再发送呗~'
                this.$store.dispatch('showDialog')
            }
        },
        getOut(){
          let user = JSON.parse(sessionStorage.getItem('user'))
          let obj = {
              username: this.getUser.name,
              src: this.getUser.src
          }
          this.socket.emit('leave',obj,this.roomID)
          this.$router.push({path:'/index'})
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

    @keyframes bounce-in {
      0% {
        opacity: 0;
      }
      20% {
        opacity: 0.2;
      }
      40% {
        opacity: 0.4;
      }
      60% {
        opacity: 0.6;
      }
      80% {
        opacity: 0.8;
      }
      100% {
        opacity: 1;
      }
    }
    
    &.infoBox-enter-active, &.infoBox-leave-active 
      animation: bounce-in 0.2s linear;
    &.infoBox-enter, &.infoBox-leave-to
      animation: bounce-in 0.2s linear reverse;
      
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
          .info
            background: rgba(0, 0, 0, 0.4)
            position: fixed
            top: 56px
            border-radius: 0 0 10px 10px
            width: 100%
            z-index: 99999
            .infoInner
              text-align:center
              margin 0 auto
              .onlineNum
                color: #fff
                font-size: 15px
            .demo-chip-container
              display: flex
              flex-wrap: wrap
            .demo-chip
              margin: 4px
              background-color: rgba(255, 255, 255, 0.5);
              color: rgba(71, 74, 79, 0.87);
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