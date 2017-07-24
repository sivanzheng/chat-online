<template>
    <div class="register">
        <div class="header">
            <mu-appbar title="Title">
                <mu-flat-button label="注册" slot="default"/>
            </mu-appbar>
        </div>
        <div class="content">
            <form action="" name="form1">
                <mu-text-field label="帐号" labelFloat name="username" v-model="username"/><br/>
                <mu-text-field label="密码" type="password" labelFloat v-model="password"/><br/>
                <mu-raised-button label="注册" fullWidth @click="submit" primary />
            </form>
            <router-link :to="{path:'/login'}" tag="div">我已有帐号</router-link>
        </div>
        <mydialog :dialogMsg="msg" :status="status"></mydialog>
    </div>
</template>

<script>
import mydialog from '../components/dialog.vue'
export default {
  data(){
    return {
      username: '',
      password: '',
      msg: '',
      status: 0,
      show: true
    }
  },
  methods: {
      submit() {
          let name = this.username.trim()
          let password = this.password.trim()
          let src = './static/img/' + Math.ceil(Math.random() * 10) + '.jpg'
          if (name !== '' && password !== '') {
              let data = {
                  name: name,
                  password: password,
                  src: src
              }
              this.$http.post('/api/user/signup', data)
                .then( (res) => {
                  let data = res.data
                  if (data.res_code === 0) {
                    this.msg = data.res_msg
                    this.$store.dispatch('showDialog')
                  } else if(data.res_code === 1){
                    this.msg = data.res_msg
                    this.$store.dispatch('showDialog')
                    this.status = 1
                  }
                })
                .catch(function (err) {
                  console.log(err)
                })
          } else {
              this.msg = '账号密码不能为空啦！'
              this.$store.dispatch('showDialog')
          }
      }
  },
  components:{
    mydialog
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.register
    position: absolute
    left:0
    right:0
    top:0
    bottom:0
    background:#fff
    .mu-appbar
        text-align: center
        .mu-flat-button-label
            font-size: 20px
    .content
        width:80%
        margin:20px auto
        .mu-text-field
            width:100%
</style>