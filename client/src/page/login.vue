<template>
    <div class="login">
        <div class="header">
            <mu-appbar title="Title">
                <mu-flat-button label="登录" slot="default"/>
            </mu-appbar>
        </div>
        <div class="content">
            <form action="" name="form2">
                <input style="display:none" name="username">
                <input type="password" style="display:none" name="password">
                <mu-text-field label="帐号" labelFloat name="username" v-model="account"/><br/>
                <mu-text-field label="密码" type="password" labelFloat name="password" v-model="password"/><br/>
                <mu-raised-button label="登录"  fullWidth @click="submit" primary />
            </form>
            <router-link :to="{path:'/reg'}" tag="div">注册帐号</router-link>
        </div>
        <mydialog :dialogMsg="msg" :status="status" :title="title" @fromChild="go"></mydialog>
    </div>
</template>

<script>
import mydialog from '../components/dialog.vue'
export default{
    data() {
        return {
            title: '',
            msg: '',
            status: 0,
            loading: '',
            account: '',
            password: ''
        }
    },
    methods: {
        submit() {
            let name = this.account
            let password = this.password
            if (name !== '' && password !== '') {
                let data = {
                  name: name,
                  password: password
                }
                this.$http.post(this.HOST+'/user/login', data)
                    .then( (res) => {
                        let data = res.data
                        if(data.res_code === 0) {
                            this.msg = 'data.res_msg'
                            this.$store.dispatch('showDialog')
                        } else if(data.res_code === 1){
                            this.msg = data.res_msg
                            this.$store.dispatch('showDialog')
                            this.$store.dispatch('login',data.info)
                        }
                    }).catch(function (err) {
                      console.log(err)
                    })

            }else{
                this.msg = '账号密码不能为空啦！'
                this.$store.dispatch('showDialog')
            }
           
        },
        go(data){
            if(data){
                this.$router.push('/index')
            }
        }
    },
    components:{
      mydialog
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .login
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
            .mu-raised-button
                min-width:80px
                display:block
                width:100%
                margin: 0 auto
                transition: all 0.375s
                &.loading
                    width: 80px
                    height: 80px
                    border-radius: 50%
</style>