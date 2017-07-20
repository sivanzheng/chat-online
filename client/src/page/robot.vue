<template>
    <div>
        <div v-for="obj in $store.getters.getrobotmsg">
            <get-msg v-if="obj.user!=getUser.name" :name="obj.user" img="./static/img/robot.jpg" :msg="obj.message"></get-msg>
            <send-msg v-if="obj.user==getUser.name" :name="$store.getters.getUser.name" :img="$store.getters.getUser.src" :msg="obj.message"></send-msg>
        </div>
        <div style="height:250px"></div>
        <div class="con-input">
            <div class="input">
                <input type="text" v-model="text">
            </div>
            <mu-raised-button label="发送" class="demo-raised-button" primary @click="sendmessage"/>
        </div>
        <mydialog :msg="msg" :status="status"></mydialog>
    </div>

</template>

<script>
    import { mapGetters } from 'vuex'
    import sendMsg from '../components/sendMsg.vue'
    import getMsg from '../components/getMsg.vue'
    import mydialog from '../components/dialog.vue'
    export default{
        data() {
          return {
            msg: '',
            status: 0,
            text: ''
          }
        },
        methods: {
            sendmessage() {
                var info = this.text
                if (info != '') {
                  var id = this.getUser.name
                  var data = {
                      'info': info,
                      'id': id
                  }
                  this.$store.commit('setrobotmsg', {
                      message: info, 
                      user: this.getUser.name
                  })
                  this.$store.dispatch('robotMsg', data)
                  this.text = ''
                  window.scrollTo(0, 10000)
                }else {
                  this.msg = '不能发空消息哦'
                  console.log(this.$store)
                  this.$store.dispatch('showDialog')
                }
                
            }
        },
        computed: {
            ...mapGetters([
                'getUser',
                'getrobotmsg'
            ])
        },
        components: {
            sendMsg,
            getMsg,
            mydialog
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .con-input
        width: 100%
        position: fixed
        height: 50px
        bottom: 55px
        display: flex
        .input
            flex: 1
            background #ddd
            padding: 4px
            input
                width: 100%
                height: 42px
                box-sizing: border-box
                border: 1px solid #ddd
                color: #333333
                font-size: 18px
                padding-left: 5px
            .mu-text-field
                width: 100%
        .demo-raised-button
            height: 50px
            background: #ddd
</style>